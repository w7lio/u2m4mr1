/*=============================================================================
 GE_DevOnlyMessageSkipKey.js
 開発ビルドでのみ MessageSkip の S/A キーを有効にする。
 本番デプロイ前クリーンアップ（tools/deploy）後のビルドでは無効。
=============================================================================*/
/*:
 * @plugindesc 開発専用 S/A キー メッセージスキップ・オート
 * @target MZ
 * @author Good Emotion (NTRETD)
 * @orderAfter MessageSkip
 *
 * @help MessageSkip プラグインの S キー（高速スキップ）と A キー（オート）を、
 * 開発用ワークツリー（tools/deploy/excludes.txt が存在するビルド）でのみ有効にします。
 *
 * 本番デプロイ前に clean-for-release.mjs を実行すると tools/ が削除され、
 * プレイヤー向けビルドでは S/A キーによるスキップ・オートは動作しません。
 */
(() => {
    "use strict";

    const SKIP_KEY_CODE = 83;
    const AUTO_KEY_CODE = 65;
    const DEV_MANIFEST_PATH = "tools/deploy/excludes.txt";

    function isDevelopmentBuild() {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", DEV_MANIFEST_PATH, false);
            xhr.send(null);
            return xhr.status >= 200 && xhr.status < 300;
        } catch (_e) {
            return false;
        }
    }

    if (isDevelopmentBuild()) {
        return;
    }

    if (Input.keyMapper[SKIP_KEY_CODE] === "messageSkip") {
        delete Input.keyMapper[SKIP_KEY_CODE];
    }
    if (Input.keyMapper[AUTO_KEY_CODE] === "messageAuto") {
        delete Input.keyMapper[AUTO_KEY_CODE];
    }
})();
