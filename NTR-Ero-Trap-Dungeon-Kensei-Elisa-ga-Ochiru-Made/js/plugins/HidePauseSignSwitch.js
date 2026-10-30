/*:
 * @target MZ
 * @plugindesc ポーズサインの表示をスイッチで制御します。指定したスイッチがONのとき、ポーズサインが非表示になります。
 * @author ChatGPT
 * 
 * @param HideSwitchId
 * @text 非表示スイッチID
 * @desc このスイッチがONのとき、ポーズサインを非表示にします。
 * @default 10
 * @type switch
 * 
 * @help
 * ポーズサイン（メッセージウィンドウの入力待ちマーク）をゲーム内スイッチで
 * 表示/非表示を制御できるプラグインです。
 * 
 * ■使い方
 * プラグインパラメータでスイッチIDを指定してください。
 * スイッチがONの間はポーズサインが非表示になります。
 * スイッチがOFFの場合は通常通り表示されます。
 * 
 * ■ライセンス
 * 商用・非商用問わず利用可能です。
 */

(() => {
    const parameters = PluginManager.parameters("HidePauseSignSwitch");
    const hideSwitchId = Number(parameters["HideSwitchId"] || 10);

    // ポーズサインの表示をスイッチで制御
    Window_Message.prototype._updatePauseSign = function() {
        if (this._pauseSignSprite) {
            const shouldHide = $gameSwitches.value(hideSwitchId); // スイッチで制御
            this._pauseSignSprite.visible = !shouldHide && this.isOpen() && this.pause;
        }
    };
})();
