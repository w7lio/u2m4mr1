/*:
 * @target MZ
 * @plugindesc メニュー画面に複数の変数を表示します（MZ対応・安定版）v1.4
 * @author つくだに
 *
 * @param Variables
 * @text 表示する変数リスト
 * @type struct<VariableDisplay>[]
 * @default []
 * @desc メニュー画面に表示する変数情報を設定します。
 *
 * @help
 * メニュー画面に指定した変数をラベル付きで表示します。
 * 例：信頼度・疲労度・進行度など。
 *
 * 【使い方】
 * 1. ファイル名を「ShowMenuVariables_MZ.js」にして保存
 * 2. プラグイン管理でON
 * 3. パラメータで表示したい変数を登録
 * 4. ゲーム中で変数を変更 → メニューに即反映されます
 */

/*~struct~VariableDisplay:
 * @param VariableID
 * @text 変数ID
 * @type variable
 * @default 1
 *
 * @param Label
 * @text 表示名
 * @default 変数
 *
 * @param X
 * @text X座標
 * @type number
 * @default 600
 *
 * @param Y
 * @text Y座標
 * @type number
 * @default 100
 *
 * @param Color
 * @text 文字色（システムカラー番号）
 * @type number
 * @default 0
 */

(() => {
  const pluginName = "ShowMenuVariables_MZ";
  const params = PluginManager.parameters(pluginName);
  const variableList = JSON.parse(params["Variables"] || "[]").map(v => JSON.parse(v));

  // ✅ MZでは Window_StatusBase を使う
  class Window_MenuVariables extends Window_StatusBase {
    initialize() {
      const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
      super.initialize(rect);
      this.opacity = 0;
      this._lastValues = [];
      this.refresh();
    }

    refresh() {
      this.contents.clear();
      for (const data of variableList) {
        const id = Number(data.VariableID);
        if (id <= 0) continue;
        const label = data.Label || "変数";
        const x = Number(data.X);
        const y = Number(data.Y);
        const color = Number(data.Color);
        const value = $gameVariables.value(id);

        // ✅ 修正版：ColorManager.textColor()
        this.changeTextColor(ColorManager.textColor(color));
        this.drawText(`${label}: ${value}`, x, y, 240);
        this.resetTextColor();
      }
    }

    update() {
      super.update();
      const newValues = variableList.map(v => $gameVariables.value(Number(v.VariableID)));
      if (JSON.stringify(newValues) !== JSON.stringify(this._lastValues)) {
        this._lastValues = newValues;
        this.refresh();
      }
    }
  }

  const _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    this.createVariableWindow();
  };

  Scene_Menu.prototype.createVariableWindow = function() {
    this._variableWindow = new Window_MenuVariables();
    this.addChild(this._variableWindow);
  };
})();
