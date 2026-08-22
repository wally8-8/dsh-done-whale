window.__ModuleLoader__.load({
	id: "dsh-done-whale",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/favicon.ts
		function whaleSvg(color) {
			return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\"><path d=\"M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z\" fill=\"" + color + "\" fill-opacity=\"1\" fill-rule=\"nonzero\"/></svg>";
		}
		//#endregion
		//#region src/shared.ts
		/**
		* 宿主/浏览器共享的常量与类型（纯值，不引入任何 @deepseek-ai 运行时依赖，
		* 保证浏览器 bundle 只 import 类型）。
		*/
		const SETTINGS_NAMESPACE = "done-whale";
		/** 官方侧边栏状态点颜色（静态色板，明暗主题同值）。 */
		const DEFAULT_GREEN = "#22C55E";
		const DEFAULT_AMBER = "#F59E0B";
		/** 6 位 hex 校验（ColorPicker 输出与手输均为此格式）。 */
		const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;
		//#endregion
		//#region src/settings-section.tsx
		/**
		* 设置页组件 —— 注册进官方设置面板的 `settings.section` 槽。
		*
		* 三行颜色（完成/待处理/默认），每行原生 ColorPicker + hex 文本框（约 1/3 宽）
		* + 行内「恢复默认颜色」按钮（unset 该字段）：
		* - 输入合法（#RRGGBB）即写入 settings（live 生效，宿主 schema 校验兜底）；
		* - 输入非法时提示错误、不写入（拒绝写入并提示）。
		* 每行恢复按钮只清对应字段：绿/琥珀回官方默认，黑 → 官方原版。
		*
		* ⚠️ this 绑定：SettingsScopeController 的方法是类方法（依赖 this.store），
		* 直接传裸引用给 useSyncExternalStore 会丢 this 导致渲染崩溃，必须箭头包装。
		*/
		function WhaleSettingsSection({ scope, t }) {
			if (scope === void 0 || t === void 0) return null;
			const value = (0, react.useSyncExternalStore)((listener) => scope.subscribe(listener), () => scope.getSnapshot(), () => scope.getSnapshot()).value ?? {};
			const [rows, setRows] = (0, react.useState)({});
			const current = (key, fallback) => {
				const draft = rows[key]?.draft;
				return draft !== void 0 ? draft : value[key] ?? fallback;
			};
			const write = (key, hex) => {
				const ok = HEX_PATTERN.test(hex);
				setRows((prev) => ({
					...prev,
					[key]: {
						draft: hex,
						error: ok ? null : t("invalidHex")
					}
				}));
				if (ok) scope.set(key, hex);
			};
			const reset = (key) => {
				setRows((prev) => {
					const { [key]: _drop, ...rest } = prev;
					return rest;
				});
				scope.unset(key);
			};
			const rowsDef = [
				{
					key: "green",
					label: t("greenLabel"),
					fallback: DEFAULT_GREEN
				},
				{
					key: "amber",
					label: t("amberLabel"),
					fallback: DEFAULT_AMBER
				},
				{
					key: "black",
					label: t("blackLabel"),
					fallback: "#000000"
				}
			];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 16,
					padding: "16px 0"
				},
				children: rowsDef.map(({ key, label, fallback }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 6
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							style: {
								fontSize: 14,
								color: "var(--dsw-alias-label-primary)"
							},
							children: label
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									type: "color",
									value: current(key, fallback),
									onChange: (e) => write(key, e.target.value),
									style: {
										width: 40,
										height: 32,
										padding: 0,
										border: "1px solid var(--dsw-alias-border-l2)",
										borderRadius: 6,
										background: "transparent"
									}
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									type: "text",
									value: current(key, fallback),
									onChange: (e) => write(key, e.target.value),
									placeholder: key === "black" ? t("blackHint") : fallback,
									spellCheck: false,
									style: {
										flex: "0 1 33%",
										font: "inherit",
										padding: "6px 10px",
										borderRadius: 6,
										border: "1px solid var(--dsw-alias-border-l2)",
										background: "var(--dsw-alias-bg-input)",
										color: "var(--dsw-alias-label-primary)"
									}
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => reset(key),
									style: {
										font: "inherit",
										padding: "6px 12px",
										borderRadius: 6,
										border: "1px solid var(--dsw-alias-border-l2)",
										background: "transparent",
										color: "var(--dsw-alias-label-secondary)",
										cursor: "pointer",
										whiteSpace: "nowrap"
									},
									children: t("reset")
								})
							]
						}),
						rows[key]?.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 12,
								color: "var(--dsw-alias-state-danger-primary)"
							},
							children: rows[key].error
						}),
						key === "black" && !value.black && !rows[key]?.draft && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 12,
								color: "var(--dsw-alias-label-secondary)"
							},
							children: t("blackHint")
						})
					]
				}, key))
			});
		}
		//#endregion
		//#region src/client.ts
		const DEFAULT_HREF = "/favicon.svg";
		const inject = [
			"sessions",
			"slots",
			"locale",
			"settingsScope"
		];
		function apply(ctx) {
			const list = ctx.sessions.list;
			/** 绑定 `done-whale` 命名空间：读快照 + 写用户配置（宿主 schema 校验）。 */
			const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
			const iconLink = () => document.head.querySelector("link[rel~=\"icon\"]");
			const setHref = (href) => {
				const link = iconLink();
				if (link) link.href = href;
			};
			/** 应用瞬间的原始 href —— 还原目标（比硬编码路径更稳，前端改路径也能正确还原）。 */
			const originalHref = iconLink()?.href ?? DEFAULT_HREF;
			/** 我们最后一次设置的 href；null = 官方原样。 */
			let applied = null;
			/** 自跟踪：每会话最后观察到的 running 位（镜像官方 prevRunning 语义）。 */
			const prevRunning = /* @__PURE__ */ new Map();
			/** 完成时恰好被选中、且当时标签页不在台前的主会话（官方不报的空缺）。 */
			const finishedWhileHidden = /* @__PURE__ */ new Set();
			const restore = () => {
				if (applied !== null) {
					setHref(originalHref);
					applied = null;
				}
			};
			/** 当前生效的配置色（未配置回官方默认）。 */
			function colors() {
				const value = scope.getSnapshot().value ?? {};
				return {
					green: value.green ?? "#22C55E",
					amber: value.amber ?? "#F59E0B",
					black: value.black
				};
			}
			const uri = (hex) => `data:image/svg+xml,${encodeURIComponent(whaleSvg(hex))}`;
			/** running true→false 边沿跟踪：完成时恰好被选中且标签页不在台前 →
			*  记入 finishedWhileHidden。官方 syncCompletedNotifications 只报"未选中时
			*  完成"（`sessionId !== selected` 才 arm），选中的空缺在这里补齐。
			*  台前完成不记（V0-02）；重新运行、会话移除均清除；只跟踪主会话。 */
			function trackEdges(state) {
				for (const row of Object.values(state.byId)) {
					if (row.origin === "subagent") continue;
					const prev = prevRunning.get(row.id);
					if (prev === void 0) {
						prevRunning.set(row.id, row.running);
						continue;
					}
					if (prev && !row.running) {
						if (row.id === state.current && document.visibilityState === "hidden") finishedWhileHidden.add(row.id);
					} else if (row.running) finishedWhileHidden.delete(row.id);
					prevRunning.set(row.id, row.running);
				}
				for (const id of [...prevRunning.keys()]) if (!(id in state.byId)) {
					prevRunning.delete(id);
					finishedWhileHidden.delete(id);
				}
			}
			/** 切回本标签页 → 选中会话的绿灯熄灭（V0-02）。 */
			const onVisibility = () => {
				if (document.visibilityState !== "visible") return;
				if (finishedWhileHidden.size > 0) {
					finishedWhileHidden.clear();
					sync();
				}
			};
			document.addEventListener("visibilitychange", onVisibility);
			/** 绿/琥珀判定：主会话 only；绿优先。返回目标 href；null = 官方原版。 */
			function targetOf(state) {
				const c = colors();
				let amber = false;
				for (const row of Object.values(state.byId)) {
					if (row.origin === "subagent") continue;
					if (row.completed === true || finishedWhileHidden.has(row.id)) return uri(c.green);
					if (row.pendingInteraction !== void 0) amber = true;
				}
				if (amber) return uri(c.amber);
				return c.black ? uri(c.black) : null;
			}
			function sync() {
				const state = list.getSnapshot();
				trackEdges(state);
				const next = targetOf(state);
				if (next === null) restore();
				else if (applied !== next) {
					setHref(next);
					applied = next;
				}
			}
			const unsubscribeList = list.subscribe(sync);
			const unsubscribeScope = scope.subscribe(sync);
			sync();
			ctx.effect(() => ctx.locale.register(SETTINGS_NAMESPACE, {
				zh: {
					nav: "鲸鱼状态灯",
					greenLabel: "完成色",
					amberLabel: "待处理色",
					blackLabel: "默认色",
					blackHint: "不设置时使用官方图标",
					reset: "恢复默认颜色",
					invalidHex: "颜色格式应为 #RRGGBB"
				},
				en: {
					nav: "Whale status",
					greenLabel: "Done color",
					amberLabel: "Pending color",
					blackLabel: "Default color",
					blackHint: "Uses the official icon when unset",
					reset: "Reset colors",
					invalidHex: "Color must be #RRGGBB"
				}
			}));
			ctx.slots.inject("settings.section", () => {
				const t = ctx.locale.bind(SETTINGS_NAMESPACE);
				const injected = { scope };
				return ctx.slots.register({
					name: "settings.section",
					id: SETTINGS_NAMESPACE,
					order: 100,
					label: () => t("nav"),
					locale: SETTINGS_NAMESPACE,
					inject: () => injected
				}, WhaleSettingsSection);
			});
			ctx.effect(() => () => {
				unsubscribeList();
				unsubscribeScope();
				document.removeEventListener("visibilitychange", onVisibility);
				restore();
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
