/*:
 * @target MZ
 * @plugindesc Scene_Map右上の標準タッチUIメニューボタンだけを非表示にします。
 * @author Original
 * @help
 * RPGツクールMZ用プラグインです。
 *
 * Scene_Map上に作成される標準のタッチUIメニューボタンのみを作成しません。
 * メニュー機能、右クリック、Escキー、キャンセル操作などは変更しません。
 *
 * プラグインコマンドはありません。
 */

(() => {
    "use strict";

    const _Scene_Map_createButtons = Scene_Map.prototype.createButtons;

    Scene_Map.prototype.createButtons = function() {
        _Scene_Map_createButtons.call(this);

        if (this._menuButton) {
            this.removeChild(this._menuButton);
            this._menuButton = null;
        }
    };
})();