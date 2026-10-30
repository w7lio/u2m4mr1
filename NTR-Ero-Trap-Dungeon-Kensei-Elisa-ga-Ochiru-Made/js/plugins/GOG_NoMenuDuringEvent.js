/*:
 * @target MZ
 * @plugindesc イベント実行中はメニューを開けないようにします
 * @author -
 * @help
 * マップ上でイベント（マップインタープリタ）が動作している間、
 * プレイヤー操作によるメニュー（キャンセル／メニューキー等）を開けないようにします。
 *
 * ツクールMZ本体も同様の判定を行いますが、一部プラグインがメニュー表示処理を
 * 迂回している場合に備え、Scene_Map.prototype.callMenu を保護します。
 *
 * ■ メッセージウィンドウが閉じる瞬間の ESC 問題
 * メッセージの表示データが先に消えて（isBusy が false）、ウィンドウの閉じ演出が
 * まだ終わっていない間、本体の isSceneChangeOk が true になり updateScene が動く
 * ため、ESC がメニュー／コモン呼び出しに取られることがあります。
 * 本プラグインは isSceneChangeOk に「メッセージウィンドウが閉じ中でない」を加え、
 * Scene_Map.isBusy と整合させます。
 *
 * オプションで「並列処理」イベントの実行中もメニューを禁止できます。
 * （マップ上の並列処理は本体の isEventRunning に含まれないため）
 *
 * 場所移動の予約からマップ読み込み完了まで（$gamePlayer.isTransferring() が true の間）は
 * メニューを開けません。
 *
 * イベントコマンド「メニュー画面を開く」やプラグインからの意図的なメニュー呼び出しは、
 * 通常どおり動作します（callMenu 経由でない場合）。
 *
 * @param includeParallelProcess
 * @text 並列処理中も禁止
 * @desc ONにすると、マップイベント／コモンイベントの並列処理が命令実行中のときもメニューを開けません。
 * @type boolean
 * @default false
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const params = PluginManager.parameters(pluginName);
    const includeParallelProcess = params["includeParallelProcess"] === "true";

    function isParallelInterpreterRunning() {
        const map = $gameMap;
        if (!map) {
            return false;
        }
        for (const event of map.events()) {
            if (event._interpreter && event._interpreter.isRunning()) {
                return true;
            }
        }
        for (const commonEvent of map._commonEvents) {
            if (commonEvent._interpreter && commonEvent._interpreter.isRunning()) {
                return true;
            }
        }
        return false;
    }

    const _Scene_Map_isSceneChangeOk = Scene_Map.prototype.isSceneChangeOk;
    Scene_Map.prototype.isSceneChangeOk = function () {
        return _Scene_Map_isSceneChangeOk.call(this) && !this.isMessageWindowClosing();
    };

    const _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function () {
        if (!_Scene_Map_isMenuEnabled.call(this)) {
            return false;
        }
        if ($gamePlayer.isTransferring()) {
            return false;
        }
        if (this.isMessageWindowClosing()) {
            return false;
        }
        if (includeParallelProcess && isParallelInterpreterRunning()) {
            return false;
        }
        return true;
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function () {
        if (!this.isMenuEnabled()) {
            this.menuCalling = false;
            return;
        }
        _Scene_Map_callMenu.call(this);
    };
})();
