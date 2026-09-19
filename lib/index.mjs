import z from "@deepseek-ai/schemastery";
import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { basename, delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";
//#region src/update-core.ts
/** 本插件包名（profile 清单 key / 自身 manifest name）。 */
const PLUGIN_NAME = "dsh-done-whale";
/**
* 选中要管理的 profile 名。
*
* `dsh web` 官方就是 `--profile web` 的硬别名，所以 **web 是默认值**；但用户完全可能
* 用自定义 profile（例如把 web app 装进 `--profile myweb`）——那种情况下写死 `web`
* 会让"检查/更新"看错清单、甚至去改另一个 profile 的依赖。所以：**只有一个 profile
* 装了本插件时就用它**（这是唯一能由事实确定的答案），否则退回官方默认的 `web`。
*
* @param candidates - 清单里确实依赖本插件的 profile 名（调用方负责去 `$DSH_HOME/profiles/` 扫）。
*/
function pickProfile(candidates) {
	const unique = [...new Set(candidates.filter((name) => name !== ""))];
	return unique.length === 1 ? unique[0] : "web";
}
const GITHUB_URL_RE = /^(?:git\+)?(?:https?|ssh|git):\/\/(?:www\.)?github\.com\/([^/#]+)\/([^/#]+?)(?:\.git)?(?:#.*)?$/i;
const GITHUB_SHORTHAND_RE = /^github:([^/#]+)\/([^/#]+?)(?:\.git)?(?:#.*)?$/i;
const GITHUB_SSH_RE = /^git@github\.com:([^/]+)\/(.+?)(?:\.git)?(?:#.*)?$/i;
const BARE_REPO_RE = /^([A-Za-z0-9._-]+)\/([A-Za-z0-9._-]+)$/;
const WINDOWS_PATH_RE = /^[A-Za-z]:[\\/]/;
/** 解析出 GitHub `owner/repo`；不是 github 形态时返回 null。 */
function parseGithubRepo(spec) {
	const value = spec.trim();
	for (const re of [
		GITHUB_SHORTHAND_RE,
		GITHUB_URL_RE,
		GITHUB_SSH_RE
	]) {
		const m = re.exec(value);
		if (m) return `${m[1]}/${m[2]}`;
	}
	const bare = value.split("#")[0];
	if (bare.includes(":") || bare.includes("\\") || /^[./~]/.test(bare)) return null;
	const m = BARE_REPO_RE.exec(bare);
	return m ? `${m[1]}/${m[2]}` : null;
}
/** 包内 `repository` 字段（字符串或 `{ url }` 两种官方写法）→ GitHub `owner/repo`。 */
function githubRepoFromRepository(repository) {
	const url = typeof repository === "string" ? repository : typeof repository === "object" && repository !== null && typeof repository.url === "string" ? repository.url : null;
	return url === null ? null : parseGithubRepo(url);
}
/** 识别已装 spec 的形状。 */
function classifySpec(spec) {
	const value = spec.trim();
	if (value === "") return "unknown";
	if (value.startsWith("link:")) return "link";
	if (value.startsWith("file:")) return "file";
	if (WINDOWS_PATH_RE.test(value) || value.startsWith(".") || value.startsWith("/") || value.startsWith("~")) return "file";
	if (parseGithubRepo(value) !== null) return "github";
	if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return "url";
	return "npm";
}
/** npm spec → 包名（剥掉版本范围；支持 `@scope/name@range`）。 */
function npmNameOf(spec) {
	const value = spec.trim();
	if (value.startsWith("@")) {
		const at = value.indexOf("@", 1);
		return at === -1 ? value : value.slice(0, at);
	}
	const at = value.indexOf("@");
	return at === -1 ? value : value.slice(0, at);
}
/**
* 由"已装 spec + 包内 repository"推出更新计划。
* @param spec - profile 清单里该插件的依赖 spec 原文。
* @param repository - 已装包 manifest 的 repository 字段（link/URL 形态下是唯一的来源线索）。
*/
function planUpdate(spec, repository) {
	const specKind = classifySpec(spec);
	const fromRepository = specKind === "url" || specKind === "link" || specKind === "file" ? githubRepoFromRepository(repository) : null;
	const repo = parseGithubRepo(spec) ?? fromRepository;
	const linkInstall = specKind === "link" || specKind === "file";
	if (specKind === "github" && repo !== null) return {
		specKind,
		linkInstall,
		latest: {
			kind: "github",
			repo
		},
		target: `github:${repo}`
	};
	if (specKind === "npm") {
		const name = npmNameOf(spec);
		return {
			specKind,
			linkInstall,
			latest: {
				kind: "npm",
				name
			},
			target: `${name}@latest`
		};
	}
	if (repo !== null) return {
		specKind,
		linkInstall,
		latest: {
			kind: "github",
			repo
		},
		target: `github:${repo}`
	};
	if (linkInstall) return {
		specKind,
		linkInstall,
		latest: { kind: "none" },
		error: "这是本地开发安装（link/file）且包内未声明 GitHub 仓库来源，无法自动更新；请在源码目录 git pull 后重新构建。"
	};
	if (specKind === "url") return {
		specKind,
		linkInstall,
		latest: { kind: "none" },
		error: "这是 URL 安装且包内未声明 GitHub 仓库来源，无法解析更新来源。"
	};
	return {
		specKind,
		linkInstall,
		latest: { kind: "none" },
		error: `无法识别的安装来源：${spec}`
	};
}
function parseVersion(input) {
	const [main, pre = ""] = input.trim().replace(/^v/i, "").split("+")[0].split("-", 2);
	const parts = main.split(".");
	if (parts.length === 0 || parts.length > 3) return null;
	const nums = [];
	for (const part of parts) {
		if (!/^\d+$/.test(part)) return null;
		nums.push(Number(part));
	}
	while (nums.length < 3) nums.push(0);
	return {
		main: [
			nums[0],
			nums[1],
			nums[2]
		],
		pre: pre === "" ? [] : pre.split(".")
	};
}
/** 比较两个版本：a > b 返回正数，a < b 返回负数，相等返回 0；无法解析时按字符串比较。 */
function compareVersions(a, b) {
	const va = parseVersion(a);
	const vb = parseVersion(b);
	if (va === null || vb === null) return a === b ? 0 : a < b ? -1 : 1;
	for (let i = 0; i < 3; i++) if (va.main[i] !== vb.main[i]) return va.main[i] < vb.main[i] ? -1 : 1;
	if (va.pre.length === 0 && vb.pre.length === 0) return 0;
	if (va.pre.length === 0) return 1;
	if (vb.pre.length === 0) return -1;
	const len = Math.max(va.pre.length, vb.pre.length);
	for (let i = 0; i < len; i++) {
		const x = va.pre[i];
		const y = vb.pre[i];
		if (x === void 0) return -1;
		if (y === void 0) return 1;
		const xn = /^\d+$/.test(x);
		const yn = /^\d+$/.test(y);
		if (xn && yn) {
			if (Number(x) !== Number(y)) return Number(x) < Number(y) ? -1 : 1;
		} else if (xn !== yn) return xn ? -1 : 1;
		else if (x !== y) return x < y ? -1 : 1;
	}
	return 0;
}
/** 远端版本是否高于当前版本。 */
function versionGt(latest, current) {
	return compareVersions(latest, current) > 0;
}
const PROGRESS_RE = /resolved (\d+), reused (\d+), downloaded (\d+), added (\d+)/;
/** 解析 pnpm 的进度行与阶段行（其余行返回 null，由调用方原样存日志）。 */
function parsePnpmLine(line) {
	const plain = line.replace(/\u001b\[[0-9;]*m/g, "").trim();
	if (plain === "") return null;
	const m = PROGRESS_RE.exec(plain);
	if (m) return {
		resolved: Number(m[1]),
		reused: Number(m[2]),
		downloaded: Number(m[3]),
		added: Number(m[4]),
		phase: "downloading"
	};
	if (/^Packages:\s*\+/.test(plain)) return { phase: "resolving" };
	if (/^Done in /.test(plain)) return { phase: "done" };
	if (/^Progress: resolved/.test(plain)) return { phase: "resolving" };
	if (/^(?:WARN|ERR_|ERROR)/.test(plain)) return null;
	if (/^(?:Downloading|Linking|Resolving|Fetching)/i.test(plain)) return { phase: "downloading" };
	return null;
}
/** 由包数估算百分比（单调由调用方保证）。 */
function estimatePercent(packages) {
	const total = Math.max(packages.resolved, 1);
	const processed = packages.reused + packages.downloaded + packages.added;
	return Math.min(99, Math.round(processed / total * 100));
}
/**
* 失败前的核对：命令没有正常收尾时，盘上是否其实已经是目标版本。
*
* 存在的意义（2026-09 实测踩到）：`github:` 依赖会让 pnpm 在包内做一次嵌套安装
* （发布件带 devDependencies 时会塞进 5374 个文件），期间数分钟不打印任何输出，
* 看门狗于是把**其实已经装完**的进程杀掉，界面报"更新失败"——用户看到的是失败，
* 盘上却是好的，而且 profile 依赖已经被改写。判据刻意保守：必须同时满足
* 「安装来源或版本较开始前发生变化」与「已装副本文件齐全」，才按成功处理。
*/
function installLooksComplete(evidence) {
	if (!evidence.complete) return false;
	return evidence.afterSpec !== evidence.beforeSpec || evidence.afterVersion !== evidence.beforeVersion;
}
//#endregion
//#region src/host-update.ts
/**
* dsh-done-whale — 宿主半的更新通路（Node 侧，只在宿主进程里跑）。
*
* 三块：
*   ① 检测：读 profile 清单里本插件的安装 spec + 自身 manifest 的 version /
*      repository → 推出更新计划（见 update-core.ts 的 planUpdate）→ 去 GitHub raw /
*      npm registry 取最新版 → semver 比较。
*   ② 执行：把 `dsh plugin --profile <本次运行的 profile> add -w <target>` 交给官方 CLI 跑（reconcile
*      会把它写回 dsh.profile.bundles），全程：profile 写入 FIFO 串行 + pnpm store
*      防漂移 + 10 分钟硬超时 + 300 秒 stall 看门狗 + Windows 进程树 taskkill +
*      可主动取消（浏览器半的「取消」按钮）；**判失败之前先核对盘上是否其实已装好**
*      （见 update-core 的 installLooksComplete）。
*   ③ 进度：解析 pnpm 输出行（阶段 / 包计数 / 百分比）。
*      ⚠️ **不做字节与速度**：那需要把子进程的 HTTP(S) 流量引到本地中继，而本机（以及
*      任何配置了上游代理的机器）经实测会出现"中继没进数据路径 / 被 NO_PROXY 绕过"，
*      结果是进度里字节恒为 0，且存在让 pnpm 绕过上游代理直连（泄漏真实 IP）的风险。
*      宁可没有字节，也不要一个不可靠又有隐私风险的功能。
*
* 形态对齐已实装的插件市场（dsh-plugin-marketplace@0.3.3，lib/index.js L341-508、
* L598-861、L1141-1257），按其裁剪：不做 workspace/monorepo 安装、不做依赖可用性
* 回滚；保留 FIFO / store 防漂移 / 超时 / 看门狗 / 杀进程树 / 取消 / 失败前核对。
*/
/** 硬超时：超过即杀整棵子进程树。 */
const INSTALL_TIMEOUT_MS = 6e5;
/**
* stall 看门狗：这么久没有任何输出进展就判死（弱网卡住的典型表现）。
* 300 秒而不是市场的 120 秒：实测 pnpm 解析 git 依赖（github: 目标要 git ls-remote + 克隆）
* 时会**静默两分多钟**，120 秒会在安装其实成功的情况下误杀（2026-09 端到端演练踩到）。
*/
const STALL_MS = 3e5;
/** 下发给浏览器的日志尾部行数。 */
const LOG_TAIL = 8;
/** pnpm 阶段 → 中文步骤文案。 */
const PHASE_STEP = {
	pending: "排队中",
	resolving: "正在解析依赖…",
	downloading: "正在下载…",
	installing: "正在安装…",
	done: "已完成",
	error: "失败"
};
function dshHome() {
	const fromEnv = (process.env.DSH_HOME ?? "").trim();
	return fromEnv === "" ? join(homedir(), ".dsh") : fromEnv;
}
/** 本插件包名：以自身 manifest 的 `name` 为准（改名的分支/私有再发布也能对上）。 */
function pluginName() {
	const name = readJsonObject(fileURLToPath(new URL("../package.json", import.meta.url)))?.["name"];
	return typeof name === "string" && name !== "" ? name : PLUGIN_NAME;
}
/**
* 当前进程正在跑的 profile 名 —— 官方启动器把它写在 argv 里
* （`dsh web` 就是 `--profile web` 的硬别名，见官方 `dsh/lib/bin.js`），
* 所以这是"我现在到底在哪个 profile 里"的第一手事实。
* 只有该 profile 目录确实存在时才采信，避免凭空造出一个新 profile。
*/
function bootedProfile(known) {
	const argv = process.argv;
	const at = argv.indexOf("--profile");
	let name = at === -1 ? "" : argv[at + 1] ?? "";
	if (name === "" && basename(argv[1] ?? "").toLowerCase() === "bin.js" && argv[2] === "web") name = "web";
	name = name.trim();
	return name !== "" && known.includes(name) ? name : "";
}
/**
* 要管理的 profile 名，按"事实强度"依次取：
*   ① 本次进程跑的 profile（argv，见 `bootedProfile`）——正在运行的副本就在它里面；
*   ② `$DSH_HOME/profiles/<profile>/package.json` 依赖里装了本插件的那个（唯一时即它）；
*   ③ 都定不下来时退回官方默认名（`pickProfile([])`，见 update-core.ts）。
* 源码里**不写死** profile 名：用户把 web app 装进自定义 profile（`dsh --profile myweb`）也认。
*/
function profileName() {
	const base = join(dshHome(), "profiles");
	let entries;
	try {
		entries = readdirSync(base, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
	} catch {
		return pickProfile([]);
	}
	const booted = bootedProfile(entries);
	if (booted !== "") return booted;
	const name = pluginName();
	return pickProfile(entries.filter((entry) => {
		const deps = readJsonObject(join(base, entry, "package.json"))?.["dependencies"];
		return typeof deps === "object" && deps !== null && name in deps;
	}));
}
function profileDir() {
	return join(dshHome(), "profiles", profileName());
}
function readJsonObject(path) {
	try {
		const parsed = JSON.parse(readFileSync(path, "utf8"));
		return typeof parsed === "object" && parsed !== null ? parsed : null;
	} catch {
		return null;
	}
}
function readText(path) {
	try {
		return readFileSync(path, "utf8");
	} catch {
		return null;
	}
}
/** profile 清单里记录的安装 spec（空串 = 清单里没有本插件）。 */
function installedSpec() {
	const deps = readJsonObject(join(profileDir(), "package.json"))?.["dependencies"];
	if (typeof deps !== "object" || deps === null) return "";
	const spec = deps[pluginName()];
	return typeof spec === "string" ? spec : "";
}
/** 自身 manifest（宿主半实际加载的那一份）。 */
function ownManifest() {
	const manifest = readJsonObject(fileURLToPath(new URL("../package.json", import.meta.url)));
	const version = manifest?.["version"];
	return {
		version: typeof version === "string" ? version : "0.0.0",
		repository: manifest?.["repository"]
	};
}
/**
* 模块加载时快照的自身 manifest —— 进程重启前恒等于"正在运行的版本"。
* ⚠️ 必须快照、不能每次现读：更新落盘会替换这份文件，现读会让 hostVersion 立刻变成
* 新版本号，`installedVersion !== hostVersion` 随即恒为 false，"待重启"态就永远出不来
* （2026-09 主人真机从 0.3.0 一键更新到 0.6.0 实测踩到：更新成功后只显示"已是最新
* 版本"，待重启提示被下一次检查抹掉）。
*/
const OWN = ownManifest();
/** 已装副本的版本（link 安装时即开发目录版本）；读不到则回退。 */
function installedVersion(fallback) {
	const version = readJsonObject(join(profileDir(), "node_modules", pluginName(), "package.json"))?.["version"];
	return typeof version === "string" ? version : fallback;
}
/**
* 给文案用的"事实"：插件名 / 要管理的 profile / 官方安装 spec 与仓库地址。
* 全部从自身 manifest 与 profile 清单推导 —— 源码里不写死任何具体仓库名或 profile 名，
* 换分支、改名、用自定义 profile 时文案自动跟上。
*/
function updateFacts() {
	const name = pluginName();
	const repo = githubRepoFromRepository(OWN.repository);
	return {
		name,
		profile: profileName(),
		spec: repo === null ? "github:<owner>/<repo>" : `github:${repo}`,
		repoUrl: repo === null ? null : `https://github.com/${repo}`
	};
}
function message(error) {
	return error instanceof Error ? error.message : String(error);
}
/** 取远端最新版本：GitHub raw `HEAD/package.json` → releases/latest 兜底；npm → dist-tag。 */
async function fetchLatest(latest) {
	const headers = { "user-agent": `${pluginName()}-updater` };
	try {
		if (latest.kind === "github") {
			const raw = await fetch(`https://raw.githubusercontent.com/${latest.repo}/HEAD/package.json`, {
				headers,
				signal: AbortSignal.timeout(2e4)
			});
			if (raw.ok) {
				const body = await raw.json();
				if (typeof body.version === "string") return { version: body.version };
			}
			const release = await fetch(`https://api.github.com/repos/${latest.repo}/releases/latest`, {
				headers,
				signal: AbortSignal.timeout(2e4)
			});
			if (release.ok) {
				const body = await release.json();
				if (typeof body.tag_name === "string") return { version: body.tag_name.replace(/^v/, "") };
			}
			return { error: `请求 GitHub 失败（HTTP ${raw.status}）` };
		}
		const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(latest.name)}/latest`, {
			headers,
			signal: AbortSignal.timeout(2e4)
		});
		if (!res.ok) return { error: `请求 npm registry 失败（HTTP ${res.status}）` };
		const body = await res.json();
		return typeof body.version === "string" ? { version: body.version } : { error: "npm registry 未返回版本号" };
	} catch (error) {
		return { error: `检查更新失败：${message(error)}` };
	}
}
/** 检测更新（用户点「检查更新」时调用；不做缓存——手动频率极低）。 */
async function checkUpdate() {
	const own = OWN;
	const spec = installedSpec();
	const plan = planUpdate(spec, own.repository);
	const base = {
		hostVersion: own.version,
		installedVersion: installedVersion(own.version),
		spec,
		specKind: plan.specKind,
		linkInstall: plan.linkInstall,
		updateTarget: plan.target,
		checkedAt: Date.now()
	};
	if (plan.error !== void 0) return {
		ok: false,
		updateAvailable: false,
		error: plan.error,
		...base
	};
	if (plan.latest.kind === "none") return {
		ok: false,
		updateAvailable: false,
		error: "没有可用的更新来源。",
		...base
	};
	const latest = await fetchLatest(plan.latest);
	if (latest.version === void 0) return {
		ok: false,
		updateAvailable: false,
		error: latest.error,
		...base
	};
	return {
		ok: true,
		latestVersion: latest.version,
		updateAvailable: versionGt(latest.version, installedVersion(own.version)),
		...base
	};
}
/** 跑一条命令：stdout/stderr 合流按行切（\n 与 \r 都认），返回结果与 kill 句柄。 */
function runProcess(commandLine, env, onLine) {
	let child = null;
	return {
		promise: new Promise((resolve) => {
			child = spawn(commandLine, [], {
				env: {
					...env,
					CI: "true"
				},
				shell: true,
				windowsHide: true,
				stdio: [
					"ignore",
					"pipe",
					"pipe"
				]
			});
			let output = "";
			let buf = "";
			const feed = (chunk) => {
				output += chunk;
				buf += chunk;
				let idx = buf.search(/\r?\n|\r/);
				while (idx !== -1) {
					const line = buf.slice(0, idx).trim();
					buf = buf.slice(idx + (buf[idx] === "\r" && buf[idx + 1] === "\n" ? 2 : 1));
					if (line !== "") try {
						onLine(line);
					} catch {}
					idx = buf.search(/\r?\n|\r/);
				}
			};
			child.stdout?.on("data", (chunk) => feed(chunk.toString("utf8")));
			child.stderr?.on("data", (chunk) => feed(chunk.toString("utf8")));
			child.on("error", (error) => resolve({
				ok: false,
				code: null,
				output: `${output}${message(error)}`
			}));
			child.on("close", (code) => {
				if (buf.trim() !== "") output += buf;
				resolve({
					ok: code === 0,
					code,
					output
				});
			});
		}),
		kill: () => killTree(child?.pid ?? null)
	};
}
/** Windows 下必须杀整棵进程树，否则 pnpm 的子进程会留着。 */
function killTree(pid) {
	if (pid === null) return;
	if (process.platform === "win32") {
		const killer = spawn("taskkill", [
			"/pid",
			String(pid),
			"/T",
			"/F"
		], {
			windowsHide: true,
			stdio: "ignore"
		});
		killer.on("error", () => void 0);
		killer.on("exit", () => void 0);
		return;
	}
	try {
		process.kill(-pid, "SIGKILL");
	} catch {
		try {
			process.kill(pid, "SIGKILL");
		} catch {}
	}
}
/** 定位本 harness 的 dsh CLI（web 是进程内起的，PATH 上未必有 dsh）。 */
function resolveDshCommand() {
	const argv1 = process.argv[1] ?? "";
	const match = /^(.*)[\\/]node_modules[\\/]@deepseek-ai[\\/]dsh[\\/]lib[\\/]bin\.js$/.exec(argv1);
	if (match !== null) {
		const shim = join(match[1], "node_modules", ".bin", process.platform === "win32" ? "dsh.cmd" : "dsh");
		if (existsSync(shim)) return [shim];
		return [process.execPath, argv1];
	}
	const exec = basename(process.execPath).toLowerCase();
	if (exec === "dsh" || exec === "dsh.exe") return [process.execPath];
	for (const dir of (process.env.PATH ?? "").split(delimiter)) {
		if (dir === "") continue;
		for (const ext of [
			"",
			".cmd",
			".exe",
			".bat"
		]) {
			const candidate = join(dir, `dsh${ext}`);
			if (existsSync(candidate)) return [candidate];
		}
	}
	return ["dsh"];
}
/**
* pnpm ≥10 在 store 路径与 node_modules 记录不一致时硬失败，所以每次 profile-pnpm
* 操作都把 store 固定到 `.modules.yaml` 记录的那条路径。记录里的版本目录后缀要去掉
* （Windows 是 `\v11`、POSIX 是 `/v3`）：pnpm 自己会在 base 后面拼 store 版本目录
* （市场同款处理，见其 lib/index.js L104-148）。
*/
function storeDirArg() {
	const yaml = readText(join(profileDir(), "node_modules", ".modules.yaml"));
	if (yaml === null) return null;
	const match = /^\s*storeDir:\s*(.+)$/m.exec(yaml);
	if (match === null) return null;
	const raw = match[1].trim().replace(/^["']|["']$/g, "").replace(/[\\/]v\d+$/, "");
	if (raw === "" || /[\s"&|<>^()%!]/.test(raw)) return null;
	return `--config.store-dir=${raw}`;
}
const JOBS = /* @__PURE__ */ new Map();
let jobSeq = 0;
/**
* 一切写 profile 的操作共用一条 FIFO：`dsh plugin add` 会读改写同一个
* `<profile>/package.json`，并发跑会出现"后写覆盖前写"（市场插件为此专门加了
* 同款队列，见其 lib/index.js L389-396 的注释）。
*/
let profileWriteQueue = Promise.resolve();
function onProfileWrite(task) {
	const run = profileWriteQueue.then(task, task);
	profileWriteQueue = run.catch(() => void 0);
	return run;
}
/**
* 一行输出喂进 job：阶段 + 包计数（正则与市场插件一致）。
*
* 日志尾部（下发给界面的那几行）会过滤掉**方括号开头的横幅**：启动器常用
* `NODE_OPTIONS=--import <preload>.mjs` 给整棵进程树打补丁（本机就是 `[force-tor] …`），
* 每个子进程都会往 stdout 打一行，几行就能把真正的 pnpm 输出挤出尾部。pnpm/git 自己的
* 输出不以 `[` 开头，所以这个过滤是安全的，而且不绑定任何具体启动器。完整输出仍全量
* 留在 `job.output`（模型工具与排错用）。
*/
function handleLine(job, line) {
	if (!/^\s*\[/.test(line)) {
		job.log.push(line);
		if (job.log.length > LOG_TAIL) job.log.splice(0, job.log.length - LOG_TAIL);
	}
	job.output += `${line}\n`;
	if (job.output.length > 2e4) job.output = job.output.slice(-16e3);
	const hit = parsePnpmLine(line);
	if (hit === null) return;
	if (hit.resolved !== void 0) job.packages = {
		resolved: hit.resolved,
		reused: hit.reused ?? 0,
		downloaded: hit.downloaded ?? 0,
		added: hit.added ?? 0
	};
	if (hit.phase !== void 0) {
		job.phase = hit.phase;
		job.step = PHASE_STEP[hit.phase] ?? hit.phase;
		if (hit.phase === "done") job.percent = 100;
	}
	job.percent = Math.max(job.percent, estimatePercent(job.packages));
}
function finishJob(job, result) {
	if (job.done) return;
	job.done = true;
	job.ok = result.ok;
	job.phase = result.ok ? "done" : "error";
	job.percent = result.ok ? 100 : Math.min(job.percent, 99);
	job.step = PHASE_STEP[job.phase] ?? job.step;
	if (!result.ok) job.error = result.error ?? "更新失败";
	job.output = job.output.trim();
	setTimeout(() => {
		if (JOBS.get(job.id) === job) JOBS.delete(job.id);
	}, 3e5).unref?.();
}
/**
* 失败前核对：读盘上证据（安装来源、已装版本、副本是否齐全）交给纯逻辑判定。
* 只读、绝不影响安装结果——判不出来就老老实实报失败。
*/
function verifyInstall(job) {
	const dir = join(profileDir(), "node_modules", pluginName());
	return installLooksComplete({
		beforeSpec: job.beforeSpec,
		beforeVersion: job.beforeVersion,
		afterSpec: installedSpec(),
		afterVersion: installedVersion(job.beforeVersion),
		complete: existsSync(join(dir, "package.json")) && existsSync(join(dir, "lib", "index.mjs")) && existsSync(join(dir, "lib", "client.cjs")) && existsSync(join(dir, "cordis.patch.yml"))
	});
}
async function executeJob(job) {
	let timeoutTimer;
	let stallTimer;
	try {
		if (job.cancelled) {
			finishJob(job, {
				ok: false,
				output: job.output,
				error: "更新已取消"
			});
			return;
		}
		job.phase = "resolving";
		job.step = PHASE_STEP["resolving"];
		const storeArg = storeDirArg();
		const command = [
			...resolveDshCommand(),
			"plugin",
			"--profile",
			profileName(),
			"add",
			"-w",
			job.target,
			...storeArg === null ? [] : [storeArg]
		].map((token) => `"${token}"`).join(" ");
		timeoutTimer = setTimeout(() => {
			if (job.done || job.cancelled) return;
			job.error = "更新超时（超过 10 分钟），已终止";
			job.childKill?.();
		}, INSTALL_TIMEOUT_MS);
		stallTimer = setInterval(() => {
			if (job.done || job.cancelled) return;
			if (job.childKill !== null && Date.now() - job.lastProgressAt > STALL_MS) {
				job.stalled = true;
				job.error = "长时间无进展（可能是网络下载卡住），已终止本次尝试";
				job.childKill();
			}
		}, 1e4);
		const onLine = (line) => {
			job.lastProgressAt = Date.now();
			handleLine(job, line);
		};
		const run = runProcess(command, { ...process.env }, onLine);
		job.childKill = run.kill;
		const result = await run.promise;
		let ok = result.ok && job.error === void 0;
		if (!ok && !job.cancelled && verifyInstall(job)) {
			ok = true;
			job.verified = true;
			job.error = void 0;
			const note = "命令未正常收尾，但已确认盘上就是目标版本，按成功处理";
			job.log.push(note);
			job.output += `${note}\n`;
		}
		finishJob(job, {
			ok,
			output: result.output,
			error: ok ? void 0 : job.error ?? `更新命令退出码 ${String(result.code)}`
		});
	} catch (error) {
		finishJob(job, {
			ok: false,
			output: job.output,
			error: message(error)
		});
	} finally {
		if (timeoutTimer !== void 0) clearTimeout(timeoutTimer);
		if (stallTimer !== void 0) clearInterval(stallTimer);
		job.resolveResult({
			ok: job.ok,
			output: job.output,
			error: job.error
		});
	}
}
/**
* 开始一次更新。link/file 安装会把 profile 依赖从本地链接切成 GitHub 安装，
* 必须先由调用方确认（UI 二次确认 / 工具显式 confirmLocal）。
*/
function startUpdate(confirmLocal) {
	const own = OWN;
	const spec = installedSpec();
	const plan = planUpdate(spec, own.repository);
	if (plan.target === void 0) return { error: plan.error ?? "无法解析更新来源。" };
	if (plan.linkInstall && !confirmLocal) return {
		error: `当前是本机开发安装（${spec}）。继续会把 profile 依赖切换成 GitHub 安装（${plan.target}），开发目录的热更循环会失效——确认后才会执行。`,
		needsConfirm: true
	};
	for (const job of JOBS.values()) if (!job.done) return { error: "已有更新任务在进行中，请等它结束。" };
	const id = `whale-${++jobSeq}-${Date.now().toString(36)}`;
	let resolveResult = () => void 0;
	const result = new Promise((resolve) => {
		resolveResult = resolve;
	});
	const job = {
		id,
		target: plan.target,
		phase: "pending",
		step: PHASE_STEP["pending"],
		percent: 0,
		packages: {
			resolved: 0,
			reused: 0,
			downloaded: 0,
			added: 0
		},
		log: [],
		output: "",
		startedAt: Date.now(),
		lastProgressAt: Date.now(),
		stalled: false,
		beforeSpec: spec,
		beforeVersion: installedVersion(own.version),
		cancelled: false,
		verified: false,
		done: false,
		ok: false,
		requiresRestart: true,
		childKill: null,
		result,
		resolveResult
	};
	JOBS.set(id, job);
	onProfileWrite(() => executeJob(job));
	return {
		jobId: id,
		target: plan.target
	};
}
/** 取消进行中的更新（浏览器半的「取消」按钮）。杀整棵子进程树，任务随即以失败收尾。 */
function cancelJob(id) {
	const job = JOBS.get(id);
	if (job === void 0) return {
		ok: false,
		error: "任务不存在或已过期"
	};
	if (job.done) return {
		ok: false,
		error: "任务已结束"
	};
	job.cancelled = true;
	job.error = "更新已取消";
	job.step = "已取消";
	job.childKill?.();
	return { ok: true };
}
/** 给模型工具用：跑完一次更新并等结果。 */
async function updateAndWait(confirmLocal) {
	const started = startUpdate(confirmLocal);
	if ("error" in started) return {
		ok: false,
		output: "",
		error: started.error,
		requiresRestart: false,
		needsConfirm: started.needsConfirm
	};
	const result = await JOBS.get(started.jobId).result;
	return {
		ok: result.ok,
		target: started.target,
		output: result.output,
		error: result.error,
		requiresRestart: true
	};
}
/** job 快照（`GET /api/whale/update/status?job=`）。 */
function jobSnapshot(id) {
	const job = JOBS.get(id);
	if (job === void 0) return null;
	return {
		id: job.id,
		phase: job.phase,
		step: job.step,
		percent: job.percent,
		packages: { ...job.packages },
		log: [...job.log],
		done: job.done,
		ok: job.ok,
		error: job.error,
		requiresRestart: job.requiresRestart,
		verified: job.verified,
		elapsedMs: Date.now() - job.startedAt
	};
}
//#endregion
//#region src/index.ts
/** 本插件拥有的设置命名空间（kebab-case）。 */
const SETTINGS_NAMESPACE = "done-whale";
/** 官方侧边栏状态点颜色（静态色板，明暗主题同值）。 */
const DEFAULT_GREEN = "#22C55E";
const DEFAULT_AMBER = "#F59E0B";
/** hex 色值校验：6 位 #RRGGBB（ColorPicker 输出与手输均为此格式）。 */
const HEX = /^#[0-9a-fA-F]{6}$/;
/** 命名空间 schema；也是浏览器侧 wire 校验依据。 */
const WhaleSettingsSchema = z.object({
	green: z.string().pattern(HEX).default(DEFAULT_GREEN),
	amber: z.string().pattern(HEX).default(DEFAULT_AMBER),
	/** 无默认：用户不配置时 black === undefined → 官方原版 favicon。 */
	black: z.string().pattern(HEX)
});
/** 按服务名取官方服务（结构面自行收窄；服务缺席返回 undefined）。 */
function serviceOf(ctx, name) {
	return ctx[name];
}
function json(res, status, data) {
	res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
	res.end(JSON.stringify(data));
}
async function readJsonBody(req) {
	let raw = "";
	for await (const chunk of req) raw += String(chunk);
	if (raw === "") return {};
	try {
		const parsed = JSON.parse(raw);
		return typeof parsed === "object" && parsed !== null ? parsed : {};
	} catch {
		return {};
	}
}
const UPDATE_CHECK_PATH = "/api/whale/update-check";
const UPDATE_START_PATH = "/api/whale/update";
const UPDATE_STATUS_PATH = "/api/whale/update/status";
const UPDATE_CANCEL_PATH = "/api/whale/update/cancel";
/** 检测：GET /api/whale/update-check */
async function checkHandler(req, res) {
	try {
		if ((req.method ?? "GET").toUpperCase() !== "GET") {
			json(res, 405, {
				ok: false,
				error: "method not allowed"
			});
			return;
		}
		json(res, 200, await checkUpdate());
	} catch (error) {
		json(res, 500, {
			ok: false,
			error: error instanceof Error ? error.message : String(error)
		});
	}
}
/** 执行：POST /api/whale/update { confirmLocal?: boolean } */
async function updateHandler(req, res) {
	try {
		if ((req.method ?? "GET").toUpperCase() !== "POST") {
			json(res, 405, {
				ok: false,
				error: "method not allowed"
			});
			return;
		}
		const started = startUpdate((await readJsonBody(req))["confirmLocal"] === true);
		if ("error" in started) {
			json(res, 400, {
				ok: false,
				error: started.error,
				needsConfirm: started.needsConfirm === true
			});
			return;
		}
		json(res, 202, {
			ok: true,
			jobId: started.jobId,
			target: started.target
		});
	} catch (error) {
		json(res, 500, {
			ok: false,
			error: error instanceof Error ? error.message : String(error)
		});
	}
}
/** 进度：GET /api/whale/update/status?job=<id> */
async function statusHandler(req, res) {
	try {
		if ((req.method ?? "GET").toUpperCase() !== "GET") {
			json(res, 405, {
				ok: false,
				error: "method not allowed"
			});
			return;
		}
		const job = jobSnapshot(new URL(req.url ?? "/", "http://localhost").searchParams.get("job") ?? "");
		if (job === null) {
			json(res, 404, {
				ok: false,
				error: "任务不存在或已过期",
				done: true
			});
			return;
		}
		json(res, 200, {
			ok: true,
			job
		});
	} catch (error) {
		json(res, 500, {
			ok: false,
			error: error instanceof Error ? error.message : String(error)
		});
	}
}
/** 取消：POST /api/whale/update/cancel { job } */
async function cancelHandler(req, res) {
	try {
		if ((req.method ?? "GET").toUpperCase() !== "POST") {
			json(res, 405, {
				ok: false,
				error: "method not allowed"
			});
			return;
		}
		const body = await readJsonBody(req);
		const result = cancelJob(String(body["job"] ?? ""));
		json(res, result.ok ? 200 : 404, {
			ok: result.ok,
			error: result.error
		});
	} catch (error) {
		json(res, 500, {
			ok: false,
			error: error instanceof Error ? error.message : String(error)
		});
	}
}
/** 构造模型工具：手写 JSON Schema（与市场插件同款；官方不要求 schemastery）。
*  文案里的插件名 / profile 名 / 安装 spec 与仓库地址一律**从自身 manifest 与 profile 清单推导**
*  （见 `updateFacts()`）—— 源码不写死具体仓库名，改名的分支、自定义 profile 也能给出正确指引。 */
function buildUpdateTool() {
	const facts = updateFacts();
	const guide = facts.repoUrl === null ? "If the plugin is missing entirely (e.g. the whole settings section disappeared after a breaking DeepSeek Harness update), read the 「给 AI 的更新指引」section of the package README and run the documented reinstall command instead. " : `If the plugin is missing entirely (e.g. the whole settings section disappeared after a breaking DeepSeek Harness update), read the 「给 AI 的更新指引」section of ${facts.repoUrl} and run the documented reinstall command instead. `;
	return {
		name: "whale_update",
		description: `Check for, or apply, a newer version of the ${facts.name} plugin (tab-whale status light) in the current \`${facts.profile}\` profile. Use action="check" first: it reports the installed version, the latest released version and whether an update is available. Use action="update" to actually run the official installer (\`dsh plugin --profile ${facts.profile} add -w ${facts.spec}\`); the new version takes effect only after the harness restarts. ` + guide + "Set confirmLocal=true only when the user explicitly agrees to replace a local `link:`/`file:` development install with the GitHub one.",
		parameters: {
			type: "object",
			properties: {
				action: {
					type: "string",
					enum: ["check", "update"],
					description: "check = only report versions; update = run the installer now (requires a harness restart to take effect). Defaults to check."
				},
				confirmLocal: {
					type: "boolean",
					description: "Allow replacing a local dev install (link:/file:) with the GitHub install. Defaults to false."
				}
			},
			required: []
		},
		output: {
			schema: {
				type: "object",
				properties: {
					ok: { type: "boolean" },
					action: { type: "string" },
					currentVersion: { type: "string" },
					latestVersion: { type: "string" },
					updateAvailable: { type: "boolean" },
					linkInstall: { type: "boolean" },
					requiresRestart: { type: "boolean" },
					output: { type: "string" },
					error: { type: "string" }
				},
				additionalProperties: true
			},
			render(_args, value) {
				const v = value;
				if (v["action"] === "update") {
					if (v["ok"] === true) return [{
						type: "text",
						text: `${facts.name} 已更新（宿主半 ${String(v["currentVersion"] ?? "")}）。新版本需要重启 harness 后才生效。\n${String(v["output"] ?? "")}`
					}];
					return [{
						type: "text",
						text: `${facts.name} 更新失败：${String(v["error"] ?? "未知原因")}\n${String(v["output"] ?? "")}`
					}];
				}
				if (v["ok"] !== true) return [{
					type: "text",
					text: `${facts.name} 检查更新失败：${String(v["error"] ?? "未知原因")}`
				}];
				return [{
					type: "text",
					text: (v["updateAvailable"] === true ? `可更新：v${String(v["currentVersion"])} → v${String(v["latestVersion"])}（用 action="update" 执行；重启 harness 后生效）` : `已是最新版本 v${String(v["currentVersion"])}`) + (v["linkInstall"] === true ? "\n注意：当前是本机开发安装（link/file），更新会把它切换成 GitHub 安装。" : "")
				}];
			}
		},
		async execute(args) {
			const params = typeof args === "object" && args !== null ? args : {};
			const action = params["action"] === "update" ? "update" : "check";
			if (action === "update") {
				const before = await checkUpdate();
				const result = await updateAndWait(params["confirmLocal"] === true);
				return {
					ok: result.ok,
					action,
					currentVersion: before.hostVersion,
					latestVersion: before.latestVersion ?? "",
					updateAvailable: false,
					linkInstall: before.linkInstall,
					requiresRestart: result.ok,
					output: result.output.slice(-2e3),
					error: result.error ?? ""
				};
			}
			const check = await checkUpdate();
			return {
				ok: check.ok,
				action,
				currentVersion: check.hostVersion,
				latestVersion: check.latestVersion ?? "",
				updateAvailable: check.updateAvailable,
				linkInstall: check.linkInstall,
				requiresRestart: false,
				output: "",
				error: check.error ?? ""
			};
		}
	};
}
/** 导出仅为可验证性（AGENTS.md §13.6：拿官方真实 ToolRuntime 注册一次来验收形状）。 */
const UPDATE_TOOL = buildUpdateTool();
var src_default = {
	name: "dsh-done-whale",
	apply(ctx) {
		ctx.inject(["settings"], (settingsCtx) => {
			settingsCtx.settings.register(SETTINGS_NAMESPACE, WhaleSettingsSchema);
		});
		ctx.inject(["webServer"], (webCtx) => {
			const webServer = serviceOf(webCtx, "webServer");
			if (webServer === void 0) return;
			webCtx.effect(() => webServer.register({
				kind: "exact",
				path: UPDATE_CHECK_PATH,
				handler: checkHandler
			}));
			webCtx.effect(() => webServer.register({
				kind: "exact",
				path: UPDATE_START_PATH,
				handler: updateHandler
			}));
			webCtx.effect(() => webServer.register({
				kind: "exact",
				path: UPDATE_STATUS_PATH,
				handler: statusHandler
			}));
			webCtx.effect(() => webServer.register({
				kind: "exact",
				path: UPDATE_CANCEL_PATH,
				handler: cancelHandler
			}));
		});
		ctx.inject(["tools"], (toolCtx) => {
			const tools = serviceOf(toolCtx, "tools");
			if (tools === void 0) return;
			toolCtx.effect(() => tools.register(UPDATE_TOOL));
		});
	}
};
//#endregion
export { DEFAULT_AMBER, DEFAULT_GREEN, SETTINGS_NAMESPACE, UPDATE_TOOL, WhaleSettingsSchema, cancelJob, src_default as default, jobSnapshot, startUpdate };
