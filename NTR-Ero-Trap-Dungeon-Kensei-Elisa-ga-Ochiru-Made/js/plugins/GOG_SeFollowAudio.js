//=============================================================================
// GOG_SeFollowAudio.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc SEの自然終了（または停止）後に、BGS・別のSE・追加BGSを再生します。
 * @author Good Emotion
 *
 * @help
 * 先頭のSEは WebAudio の終了処理に同期してコールバックが走るため、
 * ファイルの実長さ・ピッチに応じた終了タイミングで次の音を鳴らせます。
 *
 * ■ 注意
 * - 「SEの停止」コマンドや AudioManager.stopSe により先頭SEが切られた場合も、
 *   停止処理でコールバックが呼ばれるため、そのタイミングで次の音が鳴ります。
 * - 先頭SEは通常の SE リスト（_seBuffers）に積まないため、エンジン標準の
 *   「同一フレーム・同一ファイルのSE二重再生防止」は適用されません。
 *
 * ■ スクリプト
 *   GOG_SeFollowAudio.playSeThen({name:"Intro", volume:90, pitch:100, pan:0}, () => {
 *     AudioManager.playBgs({name:"Wind", volume:50, pitch:100, pan:0}, 0);
 *   });
 *   GOG_SeFollowAudio.playSeThenBgs(
 *     {name:"Intro", volume:90, pitch:100, pan:0},
 *     {name:"Wind", volume:50, pitch:100, pan:0},
 *     0
 *   );
 *   GOG_SeFollowAudio.playSeThenSe(se1, se2);
 *   GOG_SeFollowAudio.playSeThenExtraBgs(se, "layer1", bgs, 0); // GOG_MultiBgsLayer 利用時
 *
 * @param defaultExtraSlot
 * @text 既定の追加BGSスロット
 * @desc playSeThenExtraBgs でスロット空欄のとき
 * @default layer1
 *
 * @command playSeThenBgs
 * @text SEの後にBGS
 * @desc 先頭SE終了後に標準のBGS演奏を行います（AudioManager.playBgs）
 *
 * @arg seFile
 * @text 先頭SE
 * @type file
 * @dir audio/se
 * @default
 *
 * @arg seVolume
 * @text SE音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg sePitch
 * @text SEピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg sePan
 * @text SEパン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg bgsFile
 * @text BGS
 * @type file
 * @dir audio/bgs
 * @default
 *
 * @arg bgsVolume
 * @text BGS音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg bgsPitch
 * @text BGSピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg bgsPan
 * @text BGSパン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg bgsPos
 * @text BGS開始位置（秒）
 * @type number
 * @decimals 2
 * @min 0
 * @default 0
 *
 * @command playSeThenSe
 * @text SEの後にSE
 * @desc 先頭SE終了後に、もう1つSEを通常の playSe で再生します
 *
 * @arg seFile
 * @text 先頭SE
 * @type file
 * @dir audio/se
 * @default
 *
 * @arg seVolume
 * @text 先頭SE音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg sePitch
 * @text 先頭SEピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg sePan
 * @text 先頭SEパン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg se2File
 * @text 次のSE
 * @type file
 * @dir audio/se
 * @default
 *
 * @arg se2Volume
 * @text 次のSE音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg se2Pitch
 * @text 次のSEピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg se2Pan
 * @text 次のSEパン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @command playSeThenExtraBgs
 * @text SEの後に追加BGS
 * @desc GOG_MultiBgsLayer が有効なら playExtraBgs。無ければ標準 playBgs にフォールバック
 *
 * @arg seFile
 * @text 先頭SE
 * @type file
 * @dir audio/se
 * @default
 *
 * @arg seVolume
 * @text SE音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg sePitch
 * @text SEピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg sePan
 * @text SEパン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg slotId
 * @text 追加BGSスロットID
 * @desc 空欄でプラグインパラメータの既定値
 * @default
 *
 * @arg bgsFile
 * @text BGS
 * @type file
 * @dir audio/bgs
 * @default
 *
 * @arg bgsVolume
 * @text BGS音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg bgsPitch
 * @text BGSピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg bgsPan
 * @text BGSパン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg bgsPos
 * @text BGS開始位置（秒）
 * @type number
 * @decimals 2
 * @min 0
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const defaultExtraSlot = String(parameters.defaultExtraSlot || "layer1");

    let gogSeFollowBgsStopGeneration = 0;
    let gogSeFollowAllExtraBgsStopGeneration = 0;
    const gogSeFollowExtraBgsStopGenerations = new Map();

    const advanceBgsStopGeneration = function() {
        gogSeFollowBgsStopGeneration++;
    };

    const normalizeExtraBgsSlot = function(slotId) {
        return String(slotId != null && slotId !== "" ? slotId : defaultExtraSlot);
    };

    const extraBgsStopGeneration = function(slotId) {
        return gogSeFollowExtraBgsStopGenerations.get(normalizeExtraBgsSlot(slotId)) || 0;
    };

    const advanceExtraBgsStopGeneration = function(slotId) {
        const slot = normalizeExtraBgsSlot(slotId);
        gogSeFollowExtraBgsStopGenerations.set(slot, extraBgsStopGeneration(slot) + 1);
    };

    const advanceAllExtraBgsStopGeneration = function() {
        gogSeFollowAllExtraBgsStopGeneration++;
    };

    const __gogSeFollowStopBgs = AudioManager.stopBgs;
    AudioManager.stopBgs = function() {
        advanceBgsStopGeneration();
        return __gogSeFollowStopBgs.call(this);
    };

    const __gogSeFollowFadeOutBgs = AudioManager.fadeOutBgs;
    AudioManager.fadeOutBgs = function(duration) {
        advanceBgsStopGeneration();
        return __gogSeFollowFadeOutBgs.call(this, duration);
    };

    const __gogSeFollowStopAll = AudioManager.stopAll;
    AudioManager.stopAll = function() {
        advanceBgsStopGeneration();
        advanceAllExtraBgsStopGeneration();
        return __gogSeFollowStopAll.call(this);
    };

    if (typeof AudioManager.stopExtraBgs === "function") {
        const __gogSeFollowStopExtraBgs = AudioManager.stopExtraBgs;
        AudioManager.stopExtraBgs = function(slotId) {
            advanceExtraBgsStopGeneration(slotId);
            return __gogSeFollowStopExtraBgs.call(this, slotId);
        };
    }

    if (typeof AudioManager.fadeOutExtraBgs === "function") {
        const __gogSeFollowFadeOutExtraBgs = AudioManager.fadeOutExtraBgs;
        AudioManager.fadeOutExtraBgs = function(slotId, duration) {
            advanceExtraBgsStopGeneration(slotId);
            return __gogSeFollowFadeOutExtraBgs.call(this, slotId, duration);
        };
    }

    if (typeof AudioManager.stopAllExtraBgs === "function") {
        const __gogSeFollowStopAllExtraBgs = AudioManager.stopAllExtraBgs;
        AudioManager.stopAllExtraBgs = function() {
            advanceAllExtraBgsStopGeneration();
            return __gogSeFollowStopAllExtraBgs.call(this);
        };
    }

    const stripAudioName = function(file) {
        if (!file) {
            return "";
        }
        const base = file.split(/[/\\]/).pop();
        return base.replace(/\.(ogg|m4a|opus|wav)$/i, "");
    };

    const num = function(v, fallback) {
        if (v === "" || v == null) {
            return fallback;
        }
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    const GOG_SeFollowAudio = {};

    /**
     * @param {{name:string,volume?:number,pitch?:number,pan?:number}} se
     * @param {() => void} onEnded
     */
    GOG_SeFollowAudio.playSeThen = function(se, onEnded) {
        if (!se || !se.name) {
            return;
        }
        if (typeof onEnded !== "function") {
            return;
        }
        const buf = AudioManager.createBuffer("se/", se.name);
        buf.frameCount = Graphics.frameCount;
        AudioManager.updateSeParameters(buf, se);
        buf.addStopListener(() => {
            try {
                onEnded();
            } catch (e) {
                if (Utils.isNwjs() && Utils.isOptionValid("test")) {
                    console.error(e);
                }
            }
            buf.destroy();
        });
        buf.play(false);
    };

    GOG_SeFollowAudio.playSeThenBgs = function(se, bgs, pos) {
        const bgsStopGeneration = gogSeFollowBgsStopGeneration;
        GOG_SeFollowAudio.playSeThen(se, () => {
            if (bgs && bgs.name) {
                if (bgsStopGeneration !== gogSeFollowBgsStopGeneration) {
                    return;
                }
                AudioManager.playBgs(bgs, pos || 0);
            }
        });
    };

    GOG_SeFollowAudio.playSeThenSe = function(se, se2) {
        GOG_SeFollowAudio.playSeThen(se, () => {
            if (se2 && se2.name) {
                AudioManager.playSe(se2);
            }
        });
    };

    GOG_SeFollowAudio.playSeThenExtraBgs = function(se, slotId, bgs, pos) {
        const slot = String(slotId != null && slotId !== "" ? slotId : defaultExtraSlot);
        const extraStopGeneration = extraBgsStopGeneration(slot);
        const allExtraStopGeneration = gogSeFollowAllExtraBgsStopGeneration;
        GOG_SeFollowAudio.playSeThen(se, () => {
            if (!bgs || !bgs.name) {
                return;
            }
            if (
                extraStopGeneration !== extraBgsStopGeneration(slot) ||
                allExtraStopGeneration !== gogSeFollowAllExtraBgsStopGeneration
            ) {
                return;
            }
            if (typeof AudioManager.playExtraBgs === "function") {
                AudioManager.playExtraBgs(slot, bgs, pos || 0, 0);
            } else {
                AudioManager.playBgs(bgs, pos || 0);
            }
        });
    };

    window.GOG_SeFollowAudio = GOG_SeFollowAudio;

    PluginManager.registerCommand(pluginName, "playSeThenBgs", args => {
        const seName = stripAudioName(args.seFile);
        const bgsName = stripAudioName(args.bgsFile);
        const se = {
            name: seName,
            volume: num(args.seVolume, 90),
            pitch: num(args.sePitch, 100),
            pan: num(args.sePan, 0)
        };
        const bgs = {
            name: bgsName,
            volume: num(args.bgsVolume, 90),
            pitch: num(args.bgsPitch, 100),
            pan: num(args.bgsPan, 0)
        };
        GOG_SeFollowAudio.playSeThenBgs(se, bgs, num(args.bgsPos, 0));
    });

    PluginManager.registerCommand(pluginName, "playSeThenSe", args => {
        const se = {
            name: stripAudioName(args.seFile),
            volume: num(args.seVolume, 90),
            pitch: num(args.sePitch, 100),
            pan: num(args.sePan, 0)
        };
        const se2 = {
            name: stripAudioName(args.se2File),
            volume: num(args.se2Volume, 90),
            pitch: num(args.se2Pitch, 100),
            pan: num(args.se2Pan, 0)
        };
        GOG_SeFollowAudio.playSeThenSe(se, se2);
    });

    PluginManager.registerCommand(pluginName, "playSeThenExtraBgs", args => {
        const se = {
            name: stripAudioName(args.seFile),
            volume: num(args.seVolume, 90),
            pitch: num(args.sePitch, 100),
            pan: num(args.sePan, 0)
        };
        const slot = args.slotId != null && String(args.slotId) !== "" ? args.slotId : defaultExtraSlot;
        const bgs = {
            name: stripAudioName(args.bgsFile),
            volume: num(args.bgsVolume, 90),
            pitch: num(args.bgsPitch, 100),
            pan: num(args.bgsPan, 0)
        };
        GOG_SeFollowAudio.playSeThenExtraBgs(se, slot, bgs, num(args.bgsPos, 0));
    });
})();
