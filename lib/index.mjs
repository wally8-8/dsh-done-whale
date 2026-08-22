import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region src/index.ts
/**
* dsh-done-whale — Host half.
*
* 宿主半的唯一职责：向官方 settings 服务（@deepseek-ai/dsh-settings，由
* dsh-settings-file 持久化到 settings.yaml）注册 `done-whale` 命名空间的
* schema。浏览器半（src/client.ts）通过 settingsScope 绑定同一命名空间，
* 读配置、写配置；favicon 状态机消费配置色。
*
* schema 语义（与主人确认的灰区决策一致）：
*   green/amber 有默认值（官方侧边栏色），用户未覆盖时回默认；
*   black 无默认值 —— 未配置 = 官方原版 /favicon.svg，配置了才替换。
* 非法 hex 由 schema pattern 在写入时拒绝（拒绝写入并提示）。
*/
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
var src_default = {
	name: "dsh-done-whale",
	apply(ctx) {
		ctx.inject(["settings"], (settingsCtx) => {
			settingsCtx.settings.register(settingsNamespace(SETTINGS_NAMESPACE), WhaleSettingsSchema);
		});
	}
};
//#endregion
export { DEFAULT_AMBER, DEFAULT_GREEN, SETTINGS_NAMESPACE, WhaleSettingsSchema, src_default as default };
