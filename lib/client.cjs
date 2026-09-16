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
		* 两个块，各自独立降级（静默降级方案：官方哪个服务没了，就那一块不工作）：
		*   ① 配色：完成/待处理/默认三行，每行原生 ColorPicker + hex 文本框 + 「恢复默认颜色」。
		*      —— 依赖 settingsScope 服务；缺席时整块替换为一行说明，不影响下面的更新块。
		*   ② 版本与更新：当前版本 + 「检查更新」；有新版时出现「立即更新」；更新中显示进度；
		*      完成后提示「重启 harness 后生效」。—— 只依赖宿主半的 HTTP API，不依赖任何
		*      官方客户端服务，所以它是官方 API 变动后最可能活下来的那一块。
		*
		* 版本不匹配（V0-10）：本 bundle 版本 ≠ 宿主半版本（更新已写盘、还没重启）时，
		* 顶部给一条醒目提示——配色设置此刻可能不生效，但更新入口仍然可用。
		*
		* ⚠️ this 绑定：SettingsScopeController 的方法是类方法（依赖 this.store），
		* 直接传裸引用给 useSyncExternalStore 会丢 this 导致渲染崩溃，必须箭头包装。
		*/
		const LABEL_STYLE = {
			fontSize: 14,
			color: "var(--dsw-alias-label-primary)"
		};
		const MUTED_STYLE = {
			fontSize: 12,
			color: "var(--dsw-alias-label-secondary)"
		};
		const BUTTON_STYLE = {
			font: "inherit",
			padding: "6px 12px",
			borderRadius: 6,
			border: "1px solid var(--dsw-alias-border-l2)",
			background: "transparent",
			color: "var(--dsw-alias-label-primary)",
			cursor: "pointer",
			whiteSpace: "nowrap"
		};
		const PRIMARY_BUTTON_STYLE = {
			...BUTTON_STYLE,
			border: "1px solid var(--dsw-alias-state-business-primary, #3b82f6)",
			color: "var(--dsw-alias-state-business-primary, #3b82f6)"
		};
		/** 控制器缺席时的占位快照（保证 hooks 调用顺序恒定，见下方注释）。 */
		const EMPTY_UPDATE_STATE = {
			phase: "idle",
			clientVersion: "",
			updateAvailable: false,
			pendingRestart: false,
			linkInstall: false,
			needsConfirm: false,
			hostStale: false,
			hostMissing: false
		};
		/** 已用时 mm:ss（快照里的 elapsedMs 每次轮询都会更新）。 */
		function fmtElapsed(ms) {
			const total = Math.max(0, Math.floor(ms / 1e3));
			return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
		}
		function WhaleSettingsSection({ scope, t, update }) {
			const up = (0, react.useSyncExternalStore)((listener) => update?.subscribe(listener) ?? (() => void 0), () => update?.getSnapshot() ?? EMPTY_UPDATE_STATE, () => update?.getSnapshot() ?? EMPTY_UPDATE_STATE);
			(0, react.useEffect)(() => {
				update?.autoCheck();
			}, [update]);
			if (t === void 0 || update === void 0) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 16,
					padding: "16px 0"
				},
				children: [
					up.hostStale && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							gap: 8,
							padding: "8px 10px",
							borderRadius: 6,
							border: "1px solid var(--dsw-alias-state-warn-primary, #F59E0B)",
							color: "var(--dsw-alias-label-primary)",
							fontSize: 13
						},
						children: up.hostMissing ? t("staleHostMissing") : t("staleHost")
					}),
					scope === void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: MUTED_STYLE,
						children: t("colorsUnavailable")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorRows, {
						scope,
						t
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UpdateBlock, {
						up,
						t,
						update
					})
				]
			});
		}
		function ColorRows({ scope, t }) {
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
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: rowsDef.map(({ key, label, fallback }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 6
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						style: LABEL_STYLE,
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
								style: BUTTON_STYLE,
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
						style: MUTED_STYLE,
						children: t("blackHint")
					})
				]
			}, key)) });
		}
		function phaseLabel(t, phase) {
			switch (phase) {
				case "pending": return t("phasePending");
				case "resolving": return t("phaseResolving");
				case "downloading": return t("phaseDownloading");
				case "installing": return t("phaseInstalling");
				case "done": return t("phaseDone");
				case "error": return t("phaseError");
				default: return phase;
			}
		}
		function Progress({ job, t, onCancel }) {
			const stats = [];
			if (job.packages.resolved > 0) {
				const p = job.packages;
				stats.push(`${t("depsPrefix")}${p.resolved}${t("depsReused")}${p.reused}${t("depsDownload")}${p.downloaded}${t("depsAdded")}${p.added}${t("closeParen")}`);
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 6
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							fontSize: 12,
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: { fontWeight: 600 },
								children: phaseLabel(t, job.phase)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								style: { fontVariantNumeric: "tabular-nums" },
								children: [job.percent, "%"]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								style: {
									...MUTED_STYLE,
									fontSize: 11,
									fontVariantNumeric: "tabular-nums"
								},
								children: [
									t("elapsed"),
									" ",
									fmtElapsed(job.elapsedMs)
								]
							}),
							stats.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: {
									...MUTED_STYLE,
									fontSize: 11
								},
								children: stats.join(" · ")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: BUTTON_STYLE,
								onClick: onCancel,
								children: t("cancel")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							height: 6,
							borderRadius: 999,
							background: "rgba(128,128,128,0.25)",
							overflow: "hidden"
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: {
							height: "100%",
							borderRadius: 999,
							width: `${Math.max(2, job.percent)}%`,
							background: "var(--dsw-alias-state-business-primary, #3b82f6)",
							transition: "width .3s ease"
						} })
					}),
					job.log.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							...MUTED_STYLE,
							fontSize: 10,
							whiteSpace: "pre-wrap",
							wordBreak: "break-all",
							fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
							maxHeight: 60,
							overflow: "hidden"
						},
						children: job.log.slice(-2).join("\n")
					})
				]
			});
		}
		function UpdateBlock({ up, t, update }) {
			const busy = up.phase === "checking" || up.phase === "updating";
			const job = up.job;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 10,
					borderTop: "1px solid var(--dsw-alias-border-l2)",
					paddingTop: 14
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						style: LABEL_STYLE,
						children: t("updateSection")
					}),
					up.pendingRestart ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 4
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 13,
								color: "var(--dsw-alias-state-success-primary, #22C55E)"
							},
							children: t("updateDone")
						}), job?.verified === true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: MUTED_STYLE,
							children: t("updateVerified")
						})]
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									style: MUTED_STYLE,
									children: [
										t("currentVersion"),
										" v",
										up.clientVersion,
										up.linkInstall ? ` · ${t("linkInstall")}` : ""
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									style: BUTTON_STYLE,
									disabled: busy || up.hostMissing,
									onClick: () => update.check(),
									children: up.phase === "checking" ? t("checking") : up.checkedAt === void 0 ? t("checkUpdate") : t("recheck")
								})
							]
						}),
						!up.needsConfirm && up.updateAvailable && up.phase === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									style: {
										...MUTED_STYLE,
										color: "var(--dsw-alias-state-business-primary, #3b82f6)"
									},
									children: [
										t("newVersion"),
										" v",
										up.latestVersion
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									style: PRIMARY_BUTTON_STYLE,
									onClick: () => update.update(false),
									children: t("updateNow")
								})
							]
						}),
						!up.needsConfirm && !up.updateAvailable && up.phase === "ready" && job?.ok !== true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: MUTED_STYLE,
							children: t("upToDate")
						}),
						!up.needsConfirm && up.phase === "ready" && job?.done === true && job.ok && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 4
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 13,
									color: "var(--dsw-alias-state-success-primary, #22C55E)"
								},
								children: t("updateDone")
							}), job.verified === true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: MUTED_STYLE,
								children: t("updateVerified")
							})]
						})
					] }),
					up.phase === "updating" && job !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Progress, {
						job,
						t,
						onCancel: () => update.cancel()
					}),
					up.needsConfirm && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: {
									...MUTED_STYLE,
									flex: "1 1 60%"
								},
								children: t("linkConfirm")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: PRIMARY_BUTTON_STYLE,
								onClick: () => update.update(true),
								children: t("confirmUpdate")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: BUTTON_STYLE,
								onClick: () => update.dismissConfirm(),
								children: t("cancel")
							})
						]
					}),
					up.phase === "error" && !up.hostMissing && !up.pendingRestart && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: {
								...MUTED_STYLE,
								flex: "1 1 60%",
								color: "var(--dsw-alias-state-danger-primary)"
							},
							children: job !== void 0 ? `${t("updateFailed")}${up.error ?? ""}` : up.error ?? t("checkFailed")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							style: BUTTON_STYLE,
							onClick: () => job !== void 0 ? update.update(false) : update.check(),
							children: t("retry")
						})]
					}),
					up.phase === "idle" && !up.pendingRestart && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: MUTED_STYLE,
						children: t("checkHint")
					})
				]
			});
		}
		//#endregion
		//#region src/update-client.ts
		const CHECK_PATH = "/api/whale/update-check";
		const START_PATH = "/api/whale/update";
		const STATUS_PATH = "/api/whale/update/status";
		const CANCEL_PATH = "/api/whale/update/cancel";
		/** 轮询间隔与市场插件一致（服务端 500ms 采样）。 */
		const POLL_MS = 500;
		/** 检测请求自身超时。 */
		const CHECK_TIMEOUT_MS = 25e3;
		function message(error) {
			return error instanceof Error ? error.message : String(error);
		}
		function createUpdateController(clientVersion) {
			let state = {
				phase: "idle",
				clientVersion,
				updateAvailable: false,
				pendingRestart: false,
				linkInstall: false,
				needsConfirm: false,
				hostStale: false,
				hostMissing: false
			};
			const listeners = /* @__PURE__ */ new Set();
			let stopPoll = null;
			const set = (patch) => {
				state = {
					...state,
					...patch
				};
				for (const listener of [...listeners]) listener();
			};
			const stopPolling = () => {
				if (stopPoll !== null) {
					stopPoll();
					stopPoll = null;
				}
			};
			/** 轮询更新任务；job 结束或 404 即终止（404 = 任务过期，按失败呈现）。 */
			const poll = (jobId) => {
				stopPolling();
				let stopped = false;
				const timer = setInterval(() => {
					fetch(`${STATUS_PATH}?job=${encodeURIComponent(jobId)}`, { cache: "no-store" }).then(async (res) => res.ok ? await res.json() : null).then((data) => {
						if (stopped) return;
						const job = data?.job;
						if (job === void 0) {
							stopPolling();
							set({
								phase: "error",
								error: "更新任务已过期，请重新检查。",
								job: void 0
							});
							return;
						}
						if (job.done) {
							stopPolling();
							set({
								job,
								phase: job.ok ? "ready" : "error",
								error: job.ok ? void 0 : job.error,
								updateAvailable: job.ok ? false : state.updateAvailable,
								pendingRestart: job.ok ? true : state.pendingRestart
							});
							return;
						}
						set({ job });
					}).catch(() => {});
				}, POLL_MS);
				stopPoll = () => {
					stopped = true;
					clearInterval(timer);
				};
			};
			const check = () => {
				set({
					phase: "checking",
					error: void 0,
					needsConfirm: false
				});
				fetch(CHECK_PATH, {
					cache: "no-store",
					signal: AbortSignal.timeout(CHECK_TIMEOUT_MS)
				}).then(async (res) => {
					if (res.status === 404) {
						set({
							phase: "error",
							hostMissing: true,
							hostStale: true,
							error: void 0
						});
						return;
					}
					const data = await res.json();
					set({
						phase: data.ok ? "ready" : "error",
						hostVersion: data.hostVersion,
						installedVersion: data.installedVersion,
						latestVersion: data.latestVersion,
						updateAvailable: data.updateAvailable,
						pendingRestart: data.installedVersion === void 0 ? state.pendingRestart : data.installedVersion !== data.hostVersion,
						linkInstall: data.linkInstall,
						needsConfirm: false,
						checkedAt: data.checkedAt,
						error: data.ok ? void 0 : data.error ?? "检查更新失败",
						hostStale: data.hostVersion !== clientVersion,
						hostMissing: false
					});
				}).catch((error) => {
					set({
						phase: "error",
						error: `检查更新失败：${message(error)}（点重试）`
					});
				});
			};
			const update = (confirmLocal) => {
				set({
					phase: "updating",
					error: void 0,
					needsConfirm: false
				});
				fetch(START_PATH, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ confirmLocal })
				}).then(async (res) => {
					const data = await res.json();
					if (data.ok && data.jobId !== void 0) {
						set({
							phase: "updating",
							needsConfirm: false
						});
						poll(data.jobId);
						return;
					}
					if (data.needsConfirm === true) {
						set({
							phase: "ready",
							needsConfirm: true,
							error: data.error
						});
						return;
					}
					set({
						phase: "error",
						error: data.error ?? "更新启动失败"
					});
				}).catch((error) => {
					set({
						phase: "error",
						error: `更新启动失败：${message(error)}`
					});
				});
			};
			return {
				getSnapshot: () => state,
				subscribe(listener) {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				autoCheck: () => {
					if (state.phase === "checking" || state.phase === "updating" || state.pendingRestart) return;
					check();
				},
				check,
				update,
				cancel: () => {
					const jobId = state.job?.id;
					stopPolling();
					set({
						phase: "ready",
						job: void 0,
						error: void 0,
						needsConfirm: false
					});
					if (jobId === void 0) return;
					fetch(CANCEL_PATH, {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ job: jobId })
					}).catch(() => void 0);
				},
				dismissConfirm: () => set({
					needsConfirm: false,
					error: void 0
				}),
				dispose: stopPolling
			};
		}
		//#endregion
		//#region src/client.ts
		const DEFAULT_HREF = "/favicon.svg";
		/**
		* 顶层不要求任何官方服务（V0-11：官方改服务名时我们整块静默消失，但绝不影响
		* 用户使用——尤其不能让整个界面挂载失败）。各功能的依赖见 apply 里的子纤维。
		*/
		const inject = [];
		function apply(ctx) {
			/** 当前生效的配置色（未配置回官方默认）。 */
			function colors() {
				const value = scopeRef?.getSnapshot().value ?? {};
				return {
					green: value.green ?? "#22C55E",
					amber: value.amber ?? "#F59E0B",
					black: value.black
				};
			}
			/** 颜色配置 scope（settingsScope 服务缺席时保持 undefined）。 */
			let scopeRef;
			/** locale 可用时的绑定函数（供设置页标签使用）；缺席则回退字面标签。 */
			let localeRef;
			/** favicon 应用状态：应用瞬间的原始 href 与最后设置的 href。 */
			const iconLink = () => document.head.querySelector("link[rel~=\"icon\"]");
			const setHref = (href) => {
				const link = iconLink();
				if (link) link.href = href;
			};
			/** 还原目标（比硬编码路径更稳：前端改路径也能正确还原）。 */
			const originalHref = iconLink()?.href ?? DEFAULT_HREF;
			let applied = null;
			/** 自跟踪：每会话最后观察到的 running 位（镜像官方 prevRunning 语义）。 */
			const prevRunning = /* @__PURE__ */ new Map();
			/** 完成时恰好被选中、且当时标签页不在台前的主会话（官方不报的空缺）。 */
			const finishedWhileHidden = /* @__PURE__ */ new Set();
			/** 每次状态变化都重新计算的入口（由各子纤维订阅后调用）。 */
			let sync = () => void 0;
			const restore = () => {
				if (applied !== null) {
					setHref(originalHref);
					applied = null;
				}
			};
			const uri = (hex) => `data:image/svg+xml,${encodeURIComponent(whaleSvg(hex))}`;
			/**
			* ① favicon 状态机：依赖会话列表 + 待处理交互（这两个是"灯"的本体）。
			*    服务缺席 = 不亮灯，绝不报错。
			*/
			ctx.inject(["sessions", "uiSession"], (sessionCtx) => {
				const list = sessionCtx.sessions.list;
				const pending = sessionCtx.uiSession.pendingInteractions;
				/** running true→false 边沿跟踪：完成时恰好被选中且标签页不在台前 →
				*  记入 finishedWhileHidden。官方 syncCompletedNotifications 只报"未选中时
				*  完成"（`sessionId !== selected` 才 arm），选中的空缺在这里补齐。
				*  台前完成不记（V0-02）；重新运行、会话移除均清除；只跟踪主会话。 */
				const trackEdges = (state) => {
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
				};
				/** 切回本标签页 → 选中会话的绿灯熄灭（V0-02）。 */
				const onVisibility = () => {
					if (document.visibilityState !== "visible") return;
					if (finishedWhileHidden.size > 0) {
						finishedWhileHidden.clear();
						sync();
					}
				};
				document.addEventListener("visibilitychange", onVisibility);
				/** 主会话中是否存在待处理交互（提问/审批/计划审核）。
				*  0.1.5 起官方把它从 SessionSummary 字段挪到 uiSession.pendingInteractions
				*  的 observable Map；这里按会话 id 关联回列表行，语义与侧边栏琥珀点同源。 */
				const hasPendingInteraction = (byId, interactions) => {
					for (const row of Object.values(byId)) {
						if (row.origin === "subagent") continue;
						if (interactions.has(row.id)) return true;
					}
					return false;
				};
				/** 绿/琥珀判定：主会话 only；绿优先。返回目标 href；null = 官方原版。 */
				const targetOf = (state, interactions) => {
					const c = colors();
					for (const row of Object.values(state.byId)) {
						if (row.origin === "subagent") continue;
						if (row.completed === true || finishedWhileHidden.has(row.id)) return uri(c.green);
					}
					if (hasPendingInteraction(state.byId, interactions)) return uri(c.amber);
					return c.black ? uri(c.black) : null;
				};
				sync = () => {
					const state = list.getSnapshot();
					trackEdges(state);
					const next = targetOf(state, pending.getSnapshot());
					if (next === null) restore();
					else if (applied !== next) {
						setHref(next);
						applied = next;
					}
				};
				const unsubscribeList = list.subscribe(sync);
				const unsubscribePending = pending.subscribe(sync);
				sync();
				sessionCtx.effect(() => () => {
					unsubscribeList();
					unsubscribePending();
					document.removeEventListener("visibilitychange", onVisibility);
					restore();
				});
			});
			/**
			* ② 颜色配置：依赖 settingsScope。缺席（官方改了服务名）→ 配色块显示"暂时不可用"，
			*    状态机沿用默认色，其余功能不受影响。
			*/
			ctx.inject(["settingsScope"], (scopeCtx) => {
				const bound = scopeCtx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
				scopeRef = bound;
				const unsubscribe = bound.subscribe(() => sync());
				sync();
				scopeCtx.effect(() => () => {
					unsubscribe();
					if (scopeRef === bound) scopeRef = void 0;
				});
			});
			/** ③ 更新控制器：只依赖宿主半的 HTTP API，不依赖任何官方客户端服务。 */
			const update = createUpdateController("0.3.0");
			ctx.effect(() => () => update.dispose());
			ctx.inject(["locale"], (localeCtx) => {
				localeRef = (key) => localeCtx.locale.bind(SETTINGS_NAMESPACE)(key);
				localeCtx.effect(() => localeCtx.locale.register(SETTINGS_NAMESPACE, {
					zh: {
						nav: "鲸鱼状态灯",
						greenLabel: "完成色",
						amberLabel: "待处理色",
						blackLabel: "默认色",
						blackHint: "不设置时使用官方图标",
						reset: "恢复默认颜色",
						invalidHex: "颜色格式应为 #RRGGBB",
						colorsUnavailable: "配色设置暂时不可用（官方设置服务未就绪）；更新功能不受影响。",
						updateSection: "版本与更新",
						currentVersion: "当前版本",
						checkUpdate: "检查更新",
						recheck: "重新检查",
						checking: "检查中…",
						checkHint: "点「检查更新」查询是否有新版本。",
						checkFailed: "检查失败，点重试",
						retry: "重试",
						upToDate: "已是最新版本。",
						newVersion: "有新版本",
						updateNow: "立即更新",
						updateDone: "已更新到新版本，重启 harness 后生效。",
						updateVerified: "（安装命令未正常收尾，但已确认盘上就是目标版本。）",
						updateFailed: "更新失败：",
						elapsed: "已用时",
						linkInstall: "开发安装（link）",
						linkConfirm: "这会把本机开发安装（link）切换成 GitHub 安装，开发目录的热更循环会失效。确定继续吗？",
						confirmUpdate: "确定更新",
						cancel: "取消",
						staleHost: "插件客户端已是新版本，但正在运行的宿主半还是旧版：重启 harness 后生效；期间配色设置可能不生效。",
						staleHostMissing: "正在运行的宿主半还没有更新功能（它是旧版本）：重启 harness 后生效。",
						phasePending: "准备中…",
						phaseResolving: "正在解析依赖…",
						phaseDownloading: "正在下载…",
						phaseInstalling: "正在安装…",
						phaseDone: "已完成",
						phaseError: "失败",
						depsPrefix: "依赖：",
						depsReused: " 个（复用 ",
						depsDownload: "，下载 ",
						depsAdded: "，添加 ",
						closeParen: "）"
					},
					en: {
						nav: "Whale status",
						greenLabel: "Done color",
						amberLabel: "Pending color",
						blackLabel: "Default color",
						blackHint: "Uses the official icon when unset",
						reset: "Reset colors",
						invalidHex: "Color must be #RRGGBB",
						colorsUnavailable: "Color settings are unavailable (the official settings service is not ready). Updating still works.",
						updateSection: "Version & update",
						currentVersion: "Installed",
						checkUpdate: "Check for updates",
						recheck: "Check again",
						checking: "Checking…",
						checkHint: "Click \"Check for updates\" to look for a newer release.",
						checkFailed: "Check failed, click retry",
						retry: "Retry",
						upToDate: "Already up to date.",
						newVersion: "New version available",
						updateNow: "Update now",
						updateDone: "Updated. Restart the harness to take effect.",
						updateVerified: "(the installer did not exit cleanly, but the installed copy is confirmed to be the target version.)",
						updateFailed: "Update failed: ",
						elapsed: "Elapsed",
						linkInstall: "local dev install (link)",
						linkConfirm: "This replaces your local dev install (link) with the GitHub install, which breaks the hot-reload dev loop. Continue?",
						confirmUpdate: "Update anyway",
						cancel: "Cancel",
						staleHost: "The plugin client is already the new version, but the running host half is still the old one: restart the harness to take effect. Color settings may not work until then.",
						staleHostMissing: "The running host half has no update feature yet (it is an older version): restart the harness to take effect.",
						phasePending: "Preparing…",
						phaseResolving: "Resolving dependencies…",
						phaseDownloading: "Downloading…",
						phaseInstalling: "Installing…",
						phaseDone: "Done",
						phaseError: "Failed",
						depsPrefix: "Deps: ",
						depsReused: " (reused ",
						depsDownload: ", downloaded ",
						depsAdded: ", added ",
						closeParen: ")"
					}
				}));
			});
			ctx.inject(["slots"], (slotCtx) => {
				slotCtx.slots.inject("settings.section", () => slotCtx.slots.register({
					name: "settings.section",
					id: SETTINGS_NAMESPACE,
					order: 100,
					label: () => localeRef === void 0 ? "鲸鱼状态灯" : localeRef("nav"),
					locale: SETTINGS_NAMESPACE,
					inject: () => ({
						scope: scopeRef,
						update
					})
				}, WhaleSettingsSection));
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
