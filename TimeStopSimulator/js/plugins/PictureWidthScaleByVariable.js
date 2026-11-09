/*:
 * @target MZ
 * @plugindesc 変数の値を使って、指定ピクチャの横拡大率だけを変更します。
 * @author Original
 *
 * @command SetWidthScaleByVariable
 * @text 横拡大率を変数で変更
 * @desc 指定した変数の値を、ピクチャの横拡大率として反映します。
 *
 * @arg pictureId
 * @text ピクチャ番号
 * @type number
 * @min 1
 * @default 1
 *
 * @arg variableId
 * @text 変数番号
 * @type variable
 * @default 1
 *
 * @arg duration
 * @text フレーム数
 * @type number
 * @min 0
 * @default 1
 *
 * @help
 * ■機能
 * 指定した変数の値を使って、
 * ピクチャの横拡大率だけを変更します。
 *
 * 例：
 * 変数1 = 0   → 横0%
 * 変数1 = 50  → 横50%
 * 変数1 = 100 → 横100%
 *
 * ■維持されるもの
 * ・X座標
 * ・Y座標
 * ・縦拡大率
 * ・透明度
 *
 * ■使い方
 * プラグインコマンド：
 * 「横拡大率を変数で変更」
 *
 * ピクチャ番号：ゲージ中央のピクチャ番号
 * 変数番号：ゲージ値の変数
 * フレーム数：通常は1推奨
 */

(() => {
    "use strict";

    const pluginName = "PictureWidthScaleByVariable";

    PluginManager.registerCommand(pluginName, "SetWidthScaleByVariable", args => {

        const pictureId = Number(args.pictureId || 1);
        const variableId = Number(args.variableId || 1);
        const duration = Number(args.duration || 0);

        const picture = $gameScreen.picture(pictureId);

        if (!picture) return;

        const scaleX = $gameVariables.value(variableId);

        picture.move(
            picture.origin(),
            picture.x(),
            picture.y(),
            scaleX,
            picture.scaleY(),
            picture.opacity(),
            picture.blendMode(),
            duration,
            0
        );

    });

})();