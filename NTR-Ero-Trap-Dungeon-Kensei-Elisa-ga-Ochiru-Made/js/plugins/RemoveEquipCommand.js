/*:
 * @target MZ
 * @plugindesc メニューから「装備」を削除します。
 * @author YourName
 *
 * @help
 * メニューコマンドから「装備」を削除するプラグインです。
 */

(() => {
    const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function() {
        _Window_MenuCommand_addMainCommands.call(this);
        this._list = this._list.filter(command => command.symbol !== 'equip'); // 装備を削除
    };
})();
