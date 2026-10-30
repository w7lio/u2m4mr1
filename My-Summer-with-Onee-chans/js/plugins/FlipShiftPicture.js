/*:
 * @target MZ
 * @plugindesc ピクチャの水平スケールを任意で指定し、反転＆X座標補正を行うプラグインコマンドを追加します。
 * @author okeyu
 *
 * @command flipAndShift
 * @text ピクチャ反転＆補正
 * @desc 指定したピクチャIDを、指定のXスケール(%)(負の値で反転)に設定し、反転後に画像幅分だけX座標を補正します。
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @text ピクチャID
 * @desc 操作対象のピクチャIDを指定します。
 *
 * @arg flipScale
 * @type number
 * @text 反転後のXスケール(%)
 * @default -100
 * @min -1000
 * @max 1000
 * @desc 新しいXスケールをパーセントで指定します。負の値で左右反転、正の値で元の向きに戻します。
 *
 * @help
 * プラグインコマンド「ピクチャ反転＆補正」を実行すると、
 * 指定ピクチャの _scaleX を args.flipScale に書き換え、
 * 反転後の画像幅（ビットマップ幅×|flipScale|/100）分だけ _x をシフトします。
 *
 * 例:
 *   反転＆補正 (pictureId: 1, flipScale: -150)
 *   → ピクチャ1が1.5倍に拡大されつつ左右反転し、
 *     ビットマップ幅×1.5分だけX座標を右へずらします。
 *
 * 元に戻すには flipScale: 100 を指定してください。
 */
(() => {
  const PLUGIN_NAME = "FlipShiftPicture";

  PluginManager.registerCommand(PLUGIN_NAME, "flipAndShift", args => {
    const id = Number(args.pictureId);
    const target = $gameScreen.picture(id);
    if (!target) {
      console.warn(`[${PLUGIN_NAME}] ピクチャID ${id} が見つかりません。`);
      return;
    }

    // 新しいXスケール(%)を取得
    const newScaleX = Number(args.flipScale);
    // ビットマップをロードして幅を取得
    const bitmap = ImageManager.loadPicture(target._name);
    // シフト量 = ビットマップ幅 × (|newScaleX| / 100)
    const shiftX = bitmap.width * (Math.abs(newScaleX) / 100);

    // スケール適用
    target._scaleX = newScaleX;
    // 負のスケールなら右へ(+)、正のスケールなら左へ(-)シフト
    target._x += newScaleX < 0 ? shiftX : -shiftX;
  });
})();
