/*:
 * @target MZ
 * @plugindesc メニュー画面に独自ゲージを追加（例：親密度ゲージ）v1.0
 * @author hank
 *
 * @param GaugeLabel
 * @text ゲージ名
 * @default 親密度
 *
 * @param VariableID
 * @text ゲージに使う変数ID
 * @type variable
 * @default 1
 *
 * @param GaugeColor1
 * @text ゲージ色1
 * @type number
 * @default 28
 *
 * @param GaugeColor2
 * @text ゲージ色2
 * @type number
 * @default 29
 *
 * @help
 * メニュー画面（アクターごとのステータス欄）に独自ゲージを表示します。
 * ゲージの値は指定した変数IDを参照します。
 * 
 * 例：
 *   変数1 = 50  →  ゲージが半分まで伸びる
 *
 * ※ ゲージ最大値は 100 固定（必要なら変更可）
 */

(() => {
  const params = PluginManager.parameters("CustomMenuGauge_MZ");
  const gaugeLabel = String(params["GaugeLabel"] || "親密度");
  const variableId = Number(params["VariableID"] || 1);
  const color1 = Number(params["GaugeColor1"] || 28);
  const color2 = Number(params["GaugeColor2"] || 29);

  // Window_MenuStatusの描画処理を拡張
  const _Window_MenuStatus_drawActorSimpleStatus =
    Window_MenuStatus.prototype.drawActorSimpleStatus;

  Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    _Window_MenuStatus_drawActorSimpleStatus.call(this, actor, x, y, width);

    // 独自ゲージの描画
    const gaugeY = y + this.lineHeight() * 3; // 位置調整
    const value = $gameVariables.value(variableId);
    const rate = Math.min(value / 100, 1.0); // 0〜100を0〜1に
    const label = gaugeLabel;

    this.drawGauge(x, gaugeY, width - 20, rate, this.textColor(color1), this.textColor(color2));
    this.changeTextColor(this.systemColor());
    this.drawText(label, x, gaugeY, 80);
    this.resetTextColor();
    this.drawText(`${value}%`, x + width - 90, gaugeY, 60, "right");
  };
})();
