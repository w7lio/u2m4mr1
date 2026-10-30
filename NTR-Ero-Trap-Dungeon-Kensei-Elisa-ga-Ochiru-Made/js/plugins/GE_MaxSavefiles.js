/*=============================================================================
 GE_MaxSavefiles.js
 DataManager.maxSavefiles() を上書きし、セーブ／ロード画面の枠数を変更する。
 （スロット 0 はオートセーブ。手動セーブは 1 ～ maxSavefiles - 1）
=============================================================================*/
/*:
 * @plugindesc セーブデータの最大数（maxSavefiles）を指定値に変更します
 * @target MZ
 * @author Good Emotion
 *
 * @param maxSavefiles
 * @text 最大セーブファイル数（合計）
 * @desc オートセーブ（スロット0）を含む合計数。手動枠は「この値 - 1」。MZ 標準は 20（手動19）。本プロジェクト既定は 50（手動49）。
 * @default 50
 * @type number
 * @min 2
 * @max 999
 *
 * @command setMaxSavefiles
 * @text 最大セーブファイル数を変更
 * @desc 実行中のセッションだけ上書きします（次回起動はパラメータ値に戻ります）。
 *
 * @arg maxSavefiles
 * @text 最大セーブファイル数（合計）
 * @type number
 * @default 50
 * @min 2
 * @max 999
 *
 * @help
 * ■概要
 * - コアの DataManager.maxSavefiles を返す関数を差し替え、セーブ／ロードのリスト件数と
 *   空きスロット判定（emptySavefileId など）に反映されます。
 * - スロット 0 はオートセーブ、1 以上が手動セーブです。
 *   手動セーブの数 = 「最大セーブファイル数（合計）」− 1
 *
 * ■他プラグインとの併用
 * - 同じ関数を後から上書きするプラグインがある場合、プラグイン一覧で**下にある方**が
 *   有効になります。SaveFilePlus の「セーブファイル数」が -1 以外のときは、そちらが
 *   優先されます（本プラグインをその下に置けば本プラグインを優先できます）。
 *
 * ■注意
 * - 枠を減らしたあとも、減った番号より大きい番号のセーブファイルがディスクに残る
 *   ことはありますが、ゲーム内のリストからは選べなくなります。
 * - プラグインコマンドで変更した値はセーブデータには含まれません（再起動でパラメータに戻る）。
 */

(() => {
    'use strict';

    const pluginName = 'GE_MaxSavefiles';
    const params = PluginManager.parameters(pluginName);

    const clampMax = n => {
        const v = Math.floor(Number(n));
        if (!Number.isFinite(v)) {
            return 50;
        }
        return v.clamp(2, 999);
    };

    let currentMaxSavefiles = clampMax(params.maxSavefiles);

    DataManager.maxSavefiles = function() {
        return currentMaxSavefiles;
    };

    PluginManager.registerCommand(pluginName, 'setMaxSavefiles', args => {
        currentMaxSavefiles = clampMax(args.maxSavefiles);
    });
})();
