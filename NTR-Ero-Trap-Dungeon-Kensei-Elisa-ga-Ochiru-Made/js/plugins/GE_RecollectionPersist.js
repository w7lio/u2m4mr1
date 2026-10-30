/*=============================================================================
 GE_RecollectionPersist.js
 RecollectionModeMZ 用の回想解放フラグを save/ 専用ファイルに永続化する。
 スイッチ901（回想全開放）および個別回想スイッチ（902〜933）を
 セーブなしでもタイトル回想モードに反映する。
=============================================================================*/
/*:
 * @plugindesc RecollectionModeMZ 回想解放の永続化（save/ 専用ファイル）
 * @target MZ
 * @author Good Emotion
 * @orderAfter RecollectionModeMZ
 *
 * @param allUnlockSwitchId
 * @text 回想全開放スイッチID
 * @desc ON 時に回想一覧をすべて解放扱いにします（System.json: 回想全開放 = 901）
 * @type switch
 * @default 901
 *
 * @param switchMin
 * @text 個別回想スイッチ（最小ID）
 * @type number
 * @default 902
 *
 * @param switchMax
 * @text 個別回想スイッチ（最大ID）
 * @type number
 * @default 933
 *
 * @help
 * ■概要
 * RecollectionModeMZ はセーブデータ内のスイッチだけを参照するため、
 * エンディング後にセーブせずタイトルへ戻ると回想が未解放のままになります。
 * 本プラグインは回想関連スイッチの ON を save/ntretdRecoUnlock.rmmzsave に記録し、
 * タイトル回想モード起動時に RecollectionModeMZ へ反映します。
 * localStorage は使用しません。
 *
 * ■併用
 * - RecollectionModeMZ（rinne_grid / MIT）の直下に配置してください。
 *
 * ■イベント側
 * - エンディングでスイッチ901を ON にする既存処理のままで動作します。
 * - プレイ中に個別回想スイッチ（902〜933）が ON になった場合も永続化されます。
 *
 * ■リセット
 * - save/ntretdRecoUnlock.rmmzsave を削除するか save/ ごと削除してください。
 */

(() => {
    'use strict';

    const pluginName = 'GE_RecollectionPersist';
    const params = PluginManager.parameters(pluginName);

    const ALL_UNLOCK_SWITCH_ID = Number(params.allUnlockSwitchId || 901);
    const SWITCH_MIN = Number(params.switchMin || 902);
    const SWITCH_MAX = Number(params.switchMax || 933);
    const SAVE_NAME = 'ntretdRecoUnlock';
    const LEGACY_LOCAL_STORAGE_KEY = 'ntretd.recollectionUnlock.v1';

    const GE_RecollectionPersist = {
        _cache: null,
        _loadPromise: null,

        emptyData() {
            return { allUnlock: false, switches: {} };
        },

        normalizeData(raw) {
            if (!raw || typeof raw !== 'object') {
                return this.emptyData();
            }
            return {
                allUnlock: !!raw.allUnlock,
                switches:
                    raw.switches && typeof raw.switches === 'object' ? raw.switches : {}
            };
        },

        load() {
            if (!this._cache) {
                this._cache = this.emptyData();
            }
            return this._cache;
        },

        ensureLoaded() {
            if (this._loadPromise) {
                return this._loadPromise;
            }
            this._loadPromise = this._loadFromStorage().finally(() => {
                this._loadPromise = null;
            });
            return this._loadPromise;
        },

        _loadFromStorage() {
            return StorageManager.loadObject(SAVE_NAME)
                .then(contents => {
                    this._cache = this.normalizeData(contents);
                    return this._cache;
                })
                .catch(() => this._migrateFromLegacyLocalStorage());
        },

        _migrateFromLegacyLocalStorage() {
            const empty = this.emptyData();
            let legacy = null;
            try {
                if (typeof localStorage !== 'undefined') {
                    const raw = localStorage.getItem(LEGACY_LOCAL_STORAGE_KEY);
                    if (raw) {
                        legacy = this.normalizeData(JSON.parse(raw));
                    }
                }
            } catch (e) {
                legacy = null;
            }
            if (!legacy || (!legacy.allUnlock && Object.keys(legacy.switches).length === 0)) {
                this._cache = empty;
                return Promise.resolve(this._cache);
            }
            this._cache = legacy;
            return StorageManager.saveObject(SAVE_NAME, legacy)
                .then(() => {
                    try {
                        if (typeof localStorage !== 'undefined') {
                            localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
                        }
                    } catch (e) {
                        console.warn('[GE_RecollectionPersist] legacy localStorage remove failed:', e);
                    }
                    return this._cache;
                })
                .catch(e => {
                    console.warn('[GE_RecollectionPersist] migration save failed:', e);
                    return this._cache;
                });
        },

        save(data) {
            this._cache = this.normalizeData(data);
            return StorageManager.saveObject(SAVE_NAME, this._cache).catch(e => {
                console.warn('[GE_RecollectionPersist] save failed:', e);
            });
        },

        isRecoSwitchId(switchId) {
            return switchId >= SWITCH_MIN && switchId <= SWITCH_MAX;
        },

        isAllUnlock() {
            return this.load().allUnlock;
        },

        isSwitchUnlocked(switchId) {
            if (this.isAllUnlock()) {
                return true;
            }
            return !!this.load().switches[String(switchId)];
        },

        isRecoUnlocked(switchId) {
            if (this.isSwitchUnlocked(switchId)) {
                return true;
            }
            if (typeof rngdRecollectionGlobalContents !== 'undefined') {
                return !!rngdRecollectionGlobalContents.switches[switchId];
            }
            return false;
        },

        onSwitchChanged(switchId, value) {
            if (!value) {
                return;
            }
            const data = this.load();
            if (switchId === ALL_UNLOCK_SWITCH_ID) {
                data.allUnlock = true;
                this.save(data);
                this.applyToGlobalContents();
                return;
            }
            if (this.isRecoSwitchId(switchId)) {
                data.switches[String(switchId)] = true;
                this.save(data);
                this.applyToGlobalContents();
            }
        },

        recoCgSettingList() {
            if (typeof rngdRecollectionModeMZSettings === 'undefined') {
                return [];
            }
            const fileName = rngdRecollectionModeMZSettings.recoCgSettingList;
            return window[fileName] || [];
        },

        applyToGlobalContents() {
            if (typeof rngdRecollectionGlobalContents === 'undefined') {
                return;
            }
            const data = this.load();
            if (data.allUnlock) {
                for (const recoObj of this.recoCgSettingList()) {
                    rngdRecollectionGlobalContents.switches[recoObj.switch_id] = true;
                }
                return;
            }
            for (const key of Object.keys(data.switches)) {
                if (data.switches[key]) {
                    rngdRecollectionGlobalContents.switches[Number(key)] = true;
                }
            }
        }
    };

    window.GE_RecollectionPersist = GE_RecollectionPersist;

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        GE_RecollectionPersist.ensureLoaded();
        _Scene_Boot_start.call(this);
    };

    const _Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(switchId, value) {
        _Game_Switches_setValue.call(this, switchId, value);
        GE_RecollectionPersist.ensureLoaded().then(() => {
            GE_RecollectionPersist.onSwitchChanged(switchId, value);
        });
    };

    if (typeof Window_RecList !== 'undefined') {
        const _Window_RecList_getGlobalSwitches = Window_RecList.prototype.getGlobalSwitches;
        Window_RecList.prototype.getGlobalSwitches = function() {
            const applyAndRefresh = () => {
                GE_RecollectionPersist.applyToGlobalContents();
                if (this.refresh) {
                    this.refresh();
                }
            };
            return GE_RecollectionPersist.ensureLoaded()
                .then(() => {
                    GE_RecollectionPersist.applyToGlobalContents();
                    return _Window_RecList_getGlobalSwitches.call(this);
                })
                .then(failedCnt => {
                    applyAndRefresh();
                    return failedCnt;
                })
                .catch(failedCnt => {
                    applyAndRefresh();
                    return failedCnt;
                });
        };

        const _Window_RecList_initialize = Window_RecList.prototype.initialize;
        Window_RecList.prototype.initialize = function(rect) {
            // 必ず同期で完了させる。非同期だと new Window_RecList 直後の setHandler('ok') で
            // _handlers が未作成のまま TypeError: Cannot set property 'ok' of undefined になる。
            if (GE_RecollectionPersist._cache) {
                GE_RecollectionPersist.applyToGlobalContents();
            }
            _Window_RecList_initialize.call(this, rect);
        };

        Window_RecList.prototype.is_valid_picture = function(index) {
            const recoCgSettingList = window[rngdRecollectionModeMZSettings.recoCgSettingList];
            const recCgObj = recoCgSettingList[index];
            return GE_RecollectionPersist.isRecoUnlocked(recCgObj.switch_id);
        };

        Window_RecList.prototype.drawItem = function(index) {
            const recoCgSettingList = window[rngdRecollectionModeMZSettings.recoCgSettingList];
            const rec_cg = recoCgSettingList[index];
            const rect = this.itemRect(index);
            let text_height = 0;
            const unlocked = GE_RecollectionPersist.isRecoUnlocked(rec_cg.switch_id);
            if (rngdRecollectionModeMZSettings.recModeList.recModeListIsDisplayText) {
                if (unlocked) {
                    this.contents.drawText(
                        rec_cg.title,
                        rect.x + 4,
                        rect.y + 4,
                        this.itemWidth(),
                        32,
                        rngdRecollectionModeMZSettings.recModeList.recModeListDisplayPosition
                    );
                } else {
                    this.contents.drawText(
                        rngdRecollectionModeMZSettings.recModeList.recModeListNeverWatchTextName,
                        rect.x + 4,
                        rect.y + 4,
                        this.itemWidth(),
                        32,
                        rngdRecollectionModeMZSettings.recModeList.recModeListDisplayPosition
                    );
                }
                text_height = 32;
            }
            if (unlocked) {
                let thumbnail_file_name = rec_cg.pictures[0];
                if (rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
                    thumbnail_file_name = rec_cg.thumbnail;
                }
                this.recListDrawThumbnail(thumbnail_file_name, rect, text_height);
            } else {
                this.recListDrawThumbnail(
                    rngdRecollectionModeMZSettings.recModeList.recModeListNeverWatchPictureName,
                    rect,
                    text_height
                );
            }
        };
    }

    if (typeof Scene_Recollection !== 'undefined' && Scene_Recollection.setRecollectionSwitches) {
        const _setRecollectionSwitches = Scene_Recollection.setRecollectionSwitches;
        Scene_Recollection.setRecollectionSwitches = function() {
            return GE_RecollectionPersist.ensureLoaded().then(() => {
                GE_RecollectionPersist.applyToGlobalContents();
                return _setRecollectionSwitches.call(this);
            }).then(result => {
                GE_RecollectionPersist.applyToGlobalContents();
                return result;
            });
        };
    }

    if (typeof Scene_Title !== 'undefined') {
        const _Scene_Title_commandRecollection = Scene_Title.prototype.commandRecollection;
        Scene_Title.prototype.commandRecollection = function() {
            GE_RecollectionPersist.ensureLoaded().then(() => {
                GE_RecollectionPersist.applyToGlobalContents();
                _Scene_Title_commandRecollection.call(this);
            });
        };
    }
})();
