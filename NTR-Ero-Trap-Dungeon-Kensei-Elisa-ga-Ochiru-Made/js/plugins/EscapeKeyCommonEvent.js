/*:
 * @target MZ
 * @plugindesc ESCキー押下時に任意のコモンイベントを実行できるようにするプラグイン
 * @author -
 *
 * @param commonEventId
 * @text コモンイベント番号
 * @desc ESCキー押下時に実行するコモンイベント番号。
 * @type common_event
 * @default 0
 *
 * @param controlSwitchId
 * @text 制御スイッチ番号
 * @desc このスイッチがONの時のみESCでコモンイベントを呼ぶ。OFFの場合は通常メニューを表示。
 * @type switch
 * @default 0
 *
 * @help ESCキー押下時に、指定のスイッチがONの場合のみ
 * 指定のコモンイベントを実行します。
 *
 * 指定スイッチがOFFの場合は通常のメニュー表示になります。
 */

(() => {
    const params = PluginManager.parameters('EscapeKeyCommonEvent');
    const commonEventId = Number(params['commonEventId'] || 0);
    const controlSwitchId = Number(params['controlSwitchId'] || 0);

    // Scene_MapのupdateSceneを上書き
    // isMenuEnabled()（イベント実行中は false 等）を無視すると、ESC／右クリックで
    // callEscapeCommonEvent が走り、メニュー禁止中でもコモンが予約されてしまう。
    const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        if (!SceneManager.isSceneChanging() && this.isMenuCalled()) {
            if (this.isMenuEnabled()) {
                if (
                    $gameSystem.geShouldBlockEscapeFromSwitchUi &&
                    $gameSystem.geShouldBlockEscapeFromSwitchUi()
                ) {
                    this.menuCalling = false;
                    _Scene_Map_updateScene.call(this);
                } else if ($gameSwitches.value(controlSwitchId) && commonEventId > 0) {
                    this.callEscapeCommonEvent();
                } else {
                    this.callMenu();
                }
            } else {
                this.menuCalling = false;
                _Scene_Map_updateScene.call(this);
            }
        } else {
            _Scene_Map_updateScene.call(this);
        }
    };

    Scene_Map.prototype.callEscapeCommonEvent = function() {
        SoundManager.playOk(); // メニューと同じ音を鳴らす
        $gameTemp.reserveCommonEvent(commonEventId);
    };
})();
