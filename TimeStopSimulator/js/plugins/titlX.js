/*:
 * @target MZ
 * @plugindesc 標準メニューと標準オプションを完全に開けないようにします。
 * @author Original
 * @help
 * RPGツクールMZ用プラグインです。
 *
 * - Esc / 右クリック / X / Insert / テンキー0 などの標準メニュー呼び出しを無効化
 * - 画面右上の標準タッチUIメニューボタンを非表示
 * - Scene_Menu への遷移をブロック
 * - Scene_Options への遷移をブロック
 * - タイトル画面からのオプション呼び出しも無効化
 *
 * イベント、ピクチャ、独自UIには触れません。
 * プラグインコマンドはありません。
 */

(() => {
    "use strict";

    // ------------------------------------------------------------
    // ゲーム中の標準メニュー呼び出しを無効化
    // ------------------------------------------------------------

    Scene_Map.prototype.isMenuEnabled = function() {
        return false;
    };

    Scene_Map.prototype.isMenuCalled = function() {
        return false;
    };

    Scene_Map.prototype.callMenu = function() {
        // 何もしない
    };

    // ------------------------------------------------------------
    // 画面右上の標準タッチUIメニューボタンを非表示
    // ------------------------------------------------------------

    const _Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        _Scene_Map_createButtons.call(this);

        if (this._menuButton) {
            this.removeChild(this._menuButton);
            this._menuButton = null;
        }
    };

    // ------------------------------------------------------------
    // タイトル画面の標準オプション呼び出しを無効化
    // ------------------------------------------------------------

    Scene_Title.prototype.commandOptions = function() {
        // 何もしない
    };

    // ------------------------------------------------------------
    // SceneManager.push / goto による誤呼び出しもブロック
    // ------------------------------------------------------------

    const _SceneManager_push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if (sceneClass === Scene_Menu || sceneClass === Scene_Options) {
            return;
        }
        _SceneManager_push.call(this, sceneClass);
    };

    const _SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function(sceneClass) {
        if (sceneClass === Scene_Menu || sceneClass === Scene_Options) {
            return;
        }
        _SceneManager_goto.call(this, sceneClass);
    };

})();