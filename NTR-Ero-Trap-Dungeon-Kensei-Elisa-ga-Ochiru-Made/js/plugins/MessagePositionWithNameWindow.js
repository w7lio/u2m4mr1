/*:
 * @plugindesc メッセージの位置調整プラグイン（プラグインコマンド対応版）
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/blob/mz_master/MessagePosition.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @orderBefore MessageWindowPopup
 * @author 改変：ChatGPT
 *
 * @command SetOffset
 * @text メッセージ位置オフセット設定
 * @desc メッセージウィンドウの表示位置のオフセットを設定します。
 *
 * @arg offsetX
 * @text X座標オフセット
 * @desc メッセージウィンドウのX座標へのオフセット
 * @type number
 * @default 0
 *
 * @arg offsetY
 * @text Y座標オフセット
 * @desc メッセージウィンドウのY座標へのオフセット
 * @type number
 * @default 0
 */

(() => {
    'use strict';

    const pluginName = 'MessagePositionWithCommand';

    let _customOffsetX = 0;
    let _customOffsetY = 0;

    // プラグインコマンドの登録
    PluginManager.registerCommand(pluginName, 'SetOffset', args => {
        _customOffsetX = Number(args.offsetX || 0);
        _customOffsetY = Number(args.offsetY || 0);
    });

    // メッセージウィンドウの位置にオフセットを適用
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.call(this);
        this.x += _customOffsetX;
        this.y += _customOffsetY;
    };

    // 名前ウィンドウの位置にオフセットを適用
    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        _Window_NameBox_updatePlacement.call(this);
        this.x += _customOffsetX;
        this.y += _customOffsetY;
    };

})();
