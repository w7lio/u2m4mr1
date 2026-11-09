/*:
 * @target MZ
 * @plugindesc ピクチャの透明度だけを変更する簡易プラグイン
 * @author Original
 *
 * @command ChangeOpacity
 * @text ピクチャ透明度変更
 *
 * @arg PictureId
 * @text ピクチャ番号
 * @type number
 * @min 1
 * @default 1
 *
 * @arg Opacity
 * @text 透明度
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @arg Duration
 * @text フレーム数
 * @type number
 * @min 1
 * @default 1
 */

(() => {
    "use strict";

    const pluginName = "PictureOpacityOnly";

    PluginManager.registerCommand(pluginName, "ChangeOpacity", args => {
        const pictureId = Number(args.PictureId || 1);
        const opacity = Number(args.Opacity || 255);
        const duration = Number(args.Duration || 1);

        const picture = $gameScreen.picture(pictureId);
        if (!picture) return;

        picture.move(
            picture.origin(),
            picture.x(),
            picture.y(),
            picture.scaleX(),
            picture.scaleY(),
            opacity,
            picture.blendMode(),
            duration,
            0
        );
    });
})();