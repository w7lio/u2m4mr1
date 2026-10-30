//=============================================================================
// GOG_MultiBgsLayer.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 標準BGSと重ねて、スロット別に複数BGSを同時再生します。
 * @author Good Emotion
 *
 * @help
 * ツクール標準の「BGSの演奏」はそのまま使えます。その上に、レイヤーID（スロット）ごとに
 * 追加のBGSを重ねて鳴らせます。各スロットは独立して再生・停止・音量変更・フェードが可能です。
 *
 * ■ 仕様
 * - 追加BGSはオプションの「BGS音量」と、コマンドで指定する音量（0〜100相当）の積で決まります。
 * - セーブデータをロードすると追加BGSは自動停止します（標準BGSはセーブ内容に従います）。
 * - 「オーディオの全停止」相当（AudioManager.stopAll）でも追加BGSは停止します。
 *
 * ■ プラグインコマンド
 * 各コマンドの「スロットID」は文字列（例: wind, layer1）。同一スロットに再度再生すると差し替わります。
 *
 * ■ スクリプト（イベントコマンド「スクリプト」など）
 *   AudioManager.playExtraBgs("wind", {name:"River", volume:40, pitch:100, pan:0}, 0);
 *   AudioManager.fadeOutExtraBgs("wind", 1.5);
 *   AudioManager.stopExtraBgs("wind");
 *   AudioManager.stopAllExtraBgs();
 *   AudioManager.setExtraBgsParameters("wind", {volume:60});
 *   AudioManager.isExtraBgsPlaying("wind");
 *   AudioManager.extraBgsSlotIds();
 *
 * @param defaultSlot
 * @text 既定スロットID
 * @desc プラグインコマンドでスロットを空にしたときに使うID
 * @default layer1
 *
 * @command playExtraBgs
 * @text 追加BGS再生
 * @desc 指定スロットでBGSを再生（標準BGSと同時に鳴る）
 *
 * @arg slotId
 * @text スロットID
 * @desc 空欄のとき既定スロットを使用
 * @default
 *
 * @arg bgsFile
 * @text BGSファイル
 * @type file
 * @dir audio/bgs
 * @default
 *
 * @arg volume
 * @text 音量
 * @type number
 * @min 0
 * @max 400
 * @default 90
 *
 * @arg pitch
 * @text ピッチ
 * @type number
 * @min 10
 * @max 200
 * @default 100
 *
 * @arg pan
 * @text パン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg pos
 * @text 開始位置（秒）
 * @type number
 * @decimals 2
 * @min 0
 * @default 0
 *
 * @arg fadeIn
 * @text フェードイン（秒）
 * @desc 0で即時
 * @type number
 * @decimals 2
 * @min 0
 * @default 0
 *
 * @command stopExtraBgs
 * @text 追加BGS停止
 * @desc 指定スロットを即停止
 *
 * @arg slotId
 * @text スロットID
 * @default
 *
 * @command fadeOutExtraBgs
 * @text 追加BGSフェードアウト
 * @desc 指定スロットをフェードアウトして停止
 *
 * @arg slotId
 * @text スロットID
 * @default
 *
 * @arg duration
 * @text 時間（秒）
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1
 *
 * @command setExtraBgsParams
 * @text 追加BGSパラメータ変更
 * @desc 再生中の音量・ピッチ・パンを変更（未再生スロットは無視）
 *
 * @arg slotId
 * @text スロットID
 * @default
 *
 * @arg volume
 * @text 音量（未変更は空）
 * @type number
 * @min 0
 * @max 400
 * @default
 *
 * @arg pitch
 * @text ピッチ（未変更は空）
 * @type number
 * @min 10
 * @max 200
 * @default
 *
 * @arg pan
 * @text パン（未変更は空）
 * @type number
 * @min -100
 * @max 100
 * @default
 *
 * @command stopAllExtraBgs
 * @text 追加BGS全停止
 * @desc すべてのスロットを即停止
 *
 * @command fadeOutAllExtraBgs
 * @text 追加BGS全フェードアウト
 * @desc すべてのスロットをフェードアウト
 *
 * @arg duration
 * @text 時間（秒）
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const defaultSlot = String(parameters.defaultSlot || "layer1");

    //-------------------------------------------------------------------------
    // AudioManager — extra BGS layers
    //-------------------------------------------------------------------------

    if (!AudioManager._extraBgsMap) {
        AudioManager._extraBgsMap = new Map();
    }

    const disposeExtraEntry = function(entry) {
        if (!entry) {
            return;
        }
        if (entry._fadeTimer) {
            clearTimeout(entry._fadeTimer);
            entry._fadeTimer = null;
        }
        if (entry.buffer) {
            entry.buffer.destroy();
            entry.buffer = null;
        }
    };

    const normalizeSlotId = function(slotId) {
        const s = String(slotId != null && slotId !== "" ? slotId : defaultSlot);
        return s;
    };

    const stripBgsFileName = function(file) {
        if (!file) {
            return "";
        }
        const base = file.split(/[/\\]/).pop();
        return base.replace(/\.(ogg|m4a|opus|wav)$/i, "");
    };

    AudioManager.refreshExtraBgsVolume = function() {
        if (!this._extraBgsMap) {
            return;
        }
        for (const entry of this._extraBgsMap.values()) {
            if (entry.buffer && entry.audio) {
                this.updateBufferParameters(entry.buffer, this._bgsVolume, entry.audio);
            }
        }
    };

    (function wrapBgsVolumeSetter() {
        const desc = Object.getOwnPropertyDescriptor(AudioManager, "bgsVolume");
        if (!desc || typeof desc.set !== "function") {
            return;
        }
        const origSet = desc.set;
        desc.set = function(value) {
            origSet.call(this, value);
            this.refreshExtraBgsVolume();
        };
        Object.defineProperty(AudioManager, "bgsVolume", desc);
    })();

    AudioManager.playExtraBgs = function(slotId, bgs, pos, fadeInDuration) {
        const id = normalizeSlotId(slotId);
        if (!bgs || !bgs.name) {
            this.stopExtraBgs(id);
            return;
        }
        const prev = this._extraBgsMap.get(id);
        if (prev) {
            disposeExtraEntry(prev);
            this._extraBgsMap.delete(id);
        }
        const buffer = this.createBuffer("bgs/", bgs.name);
        const audio = {
            name: bgs.name,
            volume: bgs.volume != null ? Number(bgs.volume) : 90,
            pitch: bgs.pitch != null ? Number(bgs.pitch) : 100,
            pan: bgs.pan != null ? Number(bgs.pan) : 0
        };
        this.updateBufferParameters(buffer, this._bgsVolume, audio);
        buffer.play(true, pos || 0);
        const fd = fadeInDuration != null ? Number(fadeInDuration) : 0;
        if (fd > 0) {
            buffer.fadeIn(fd);
        }
        this._extraBgsMap.set(id, { buffer, audio });
    };

    AudioManager.stopExtraBgs = function(slotId) {
        const id = normalizeSlotId(slotId);
        const entry = this._extraBgsMap.get(id);
        if (!entry) {
            return;
        }
        disposeExtraEntry(entry);
        this._extraBgsMap.delete(id);
    };

    AudioManager.fadeOutExtraBgs = function(slotId, duration) {
        const id = normalizeSlotId(slotId);
        const entry = this._extraBgsMap.get(id);
        if (!entry || !entry.buffer) {
            return;
        }
        if (entry._fadeTimer) {
            clearTimeout(entry._fadeTimer);
            entry._fadeTimer = null;
        }
        const sec = Math.max(0.01, Number(duration) || 1);
        entry.buffer.fadeOut(sec);
        entry._fadeTimer = setTimeout(() => {
            entry._fadeTimer = null;
            if (this._extraBgsMap.get(id) === entry) {
                disposeExtraEntry(entry);
                this._extraBgsMap.delete(id);
            }
        }, sec * 1000 + 120);
    };

    AudioManager.fadeInExtraBgs = function(slotId, duration) {
        const id = normalizeSlotId(slotId);
        const entry = this._extraBgsMap.get(id);
        if (!entry || !entry.buffer) {
            return;
        }
        const sec = Math.max(0.01, Number(duration) || 1);
        entry.buffer.fadeIn(sec);
    };

    AudioManager.setExtraBgsParameters = function(slotId, partial) {
        const id = normalizeSlotId(slotId);
        const entry = this._extraBgsMap.get(id);
        if (!entry || !entry.buffer || !entry.audio || !partial) {
            return;
        }
        if (partial.volume != null) {
            entry.audio.volume = Number(partial.volume);
        }
        if (partial.pitch != null) {
            entry.audio.pitch = Number(partial.pitch);
        }
        if (partial.pan != null) {
            entry.audio.pan = Number(partial.pan);
        }
        this.updateBufferParameters(entry.buffer, this._bgsVolume, entry.audio);
    };

    AudioManager.isExtraBgsPlaying = function(slotId) {
        const id = normalizeSlotId(slotId);
        const entry = this._extraBgsMap.get(id);
        return !!(entry && entry.buffer && entry.buffer.isPlaying());
    };

    AudioManager.extraBgsSlotIds = function() {
        return Array.from(this._extraBgsMap.keys());
    };

    AudioManager.stopAllExtraBgs = function() {
        if (!this._extraBgsMap) {
            return;
        }
        for (const id of this._extraBgsMap.keys()) {
            this.stopExtraBgs(id);
        }
    };

    AudioManager.fadeOutAllExtraBgs = function(duration) {
        const sec = Math.max(0.01, Number(duration) || 1);
        for (const id of this._extraBgsMap.keys()) {
            this.fadeOutExtraBgs(id, sec);
        }
    };

    const _AudioManager_stopAll = AudioManager.stopAll;
    AudioManager.stopAll = function() {
        this.stopAllExtraBgs();
        _AudioManager_stopAll.call(this);
    };

    const _AudioManager_checkErrors = AudioManager.checkErrors;
    AudioManager.checkErrors = function() {
        _AudioManager_checkErrors.call(this);
        if (this._extraBgsMap) {
            for (const entry of this._extraBgsMap.values()) {
                const buffer = entry.buffer;
                if (buffer && buffer.isError()) {
                    this.throwLoadError(buffer);
                }
            }
        }
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        AudioManager.stopAllExtraBgs();
    };

    //-------------------------------------------------------------------------
    // Plugin commands
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "playExtraBgs", args => {
        const slot = normalizeSlotId(args.slotId);
        const name = stripBgsFileName(args.bgsFile);
        const volume = args.volume !== "" && args.volume != null ? Number(args.volume) : 90;
        const pitch = args.pitch !== "" && args.pitch != null ? Number(args.pitch) : 100;
        const pan = args.pan !== "" && args.pan != null ? Number(args.pan) : 0;
        const pos = args.pos !== "" && args.pos != null ? Number(args.pos) : 0;
        const fadeIn = args.fadeIn !== "" && args.fadeIn != null ? Number(args.fadeIn) : 0;
        AudioManager.playExtraBgs(
            slot,
            { name, volume, pitch, pan },
            pos,
            fadeIn
        );
    });

    PluginManager.registerCommand(pluginName, "stopExtraBgs", args => {
        AudioManager.stopExtraBgs(normalizeSlotId(args.slotId));
    });

    PluginManager.registerCommand(pluginName, "fadeOutExtraBgs", args => {
        const d = args.duration != null ? Number(args.duration) : 1;
        AudioManager.fadeOutExtraBgs(normalizeSlotId(args.slotId), d);
    });

    PluginManager.registerCommand(pluginName, "setExtraBgsParams", args => {
        const partial = {};
        if (args.volume !== "" && args.volume != null) {
            partial.volume = Number(args.volume);
        }
        if (args.pitch !== "" && args.pitch != null) {
            partial.pitch = Number(args.pitch);
        }
        if (args.pan !== "" && args.pan != null) {
            partial.pan = Number(args.pan);
        }
        AudioManager.setExtraBgsParameters(normalizeSlotId(args.slotId), partial);
    });

    PluginManager.registerCommand(pluginName, "stopAllExtraBgs", () => {
        AudioManager.stopAllExtraBgs();
    });

    PluginManager.registerCommand(pluginName, "fadeOutAllExtraBgs", args => {
        const d = args.duration != null ? Number(args.duration) : 1;
        AudioManager.fadeOutAllExtraBgs(d);
    });
})();
