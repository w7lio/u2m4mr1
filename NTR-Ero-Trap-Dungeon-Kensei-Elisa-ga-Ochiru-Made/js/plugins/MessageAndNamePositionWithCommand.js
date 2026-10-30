/*:
 * @plugindesc メッセージと名前ウィンドウの位置調整プラグイン（プラグインコマンド対応）
 * @target MZ
 * @author ChatGPT改変
 *
 * @command SetOffset
 * @text メッセージ/名前ウィンドウ位置オフセット設定
 * @desc メッセージと名前ウィンドウの表示位置のオフセットを設定します。
 *
 * @arg offsetX
 * @text X座標オフセット
 * @desc ウィンドウのX座標へのオフセット
 * @type number
 * @default 0
 *
 * @arg offsetY
 * @text Y座標オフセット
 * @desc ウィンドウのY座標へのオフセット
 * @type number
 * @default 0
 */

(() => {
    'use strict';

    const pluginName = 'MessageAndNamePositionWithCommand';

    let _customOffsetX = 0;
    let _customOffsetY = 0;

    PluginManager.registerCommand(pluginName, 'SetOffset', args => {
        _customOffsetX = Number(args.offsetX || 0);
        _customOffsetY = Number(args.offsetY || 0);
    });

    // メッセージウィンドウの位置調整
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.call(this);
        this.x += _customOffsetX;
        this.y += _customOffsetY;
    };

    // 名前ウィンドウの位置調整
    const _Window_NameBox_start = Window_NameBox.prototype.start;
    Window_NameBox.prototype.start = function() {
        _Window_NameBox_start.call(this);
        this.x += _customOffsetX;
        this.y += _customOffsetY;
    };

})();
