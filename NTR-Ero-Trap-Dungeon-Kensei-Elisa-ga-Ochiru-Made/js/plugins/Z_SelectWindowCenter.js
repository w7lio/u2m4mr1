/*:
 * @target MZ
 * @plugindesc 選択肢ウィンドウを画面中央に固定表示するプラグイン
 * @author
 */

(() => {
  // Window_ChoiceListの表示位置決定を上書き
  const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
    // デフォルトの幅・高さを計算
    this.width = this.windowWidth();
    this.height = this.windowHeight();

    // ↓ここで「画面中央」に位置を固定
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
  };
})();