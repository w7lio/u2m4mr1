/*:
 * @target MZ
 * @plugindesc 選択中の黒背景を透明にします
 * @author Z
 *
 * @help
 * ショップを含め、全ウィンドウの選択時に描画される
 * 背景色をなくして完全に透明にするプラグインです。
 *
 * 使用方法:
 *  プラグイン管理でこのプラグインをONにするだけです。
 */

(() => {
  // Window_Selectable を継承している各ウィンドウ（例: ショップの買い物リストなど）の
  // 選択時背景を描画するメソッドを丸ごと上書き。
  Window_Selectable.prototype.drawItemBackground = function(index) {
    // 背景色をなくして完全に透明にする
  };
})();

/**
 * ショップ画面だけ透明にしたい場合
 */
// (() => {
//   const _drawItemBackground = Window_ShopBuy.prototype.drawItemBackground;
//   Window_ShopBuy.prototype.drawItemBackground = function(index) {
//
//   };
// })();