/*:
 * @target MZ
 * @plugindesc 初回起動時だけ全音量を50%に設定します。
 * @author Original
 *
 * @help
 * 初回起動時に、BGM / BGS / ME / SE の音量を50%にします。
 * すでに設定ファイルが存在する場合は、ユーザー設定を上書きしません。
 */

(() => {
    "use strict";

    const DEFAULT_VOLUME = 50;
    const FLAG_NAME = "DefaultVolume50_Applied";

    const _ConfigManager_load = ConfigManager.load;
    ConfigManager.load = function() {
        _ConfigManager_load.call(this);

        if (!this[FLAG_NAME]) {
            this.bgmVolume = DEFAULT_VOLUME;
            this.bgsVolume = DEFAULT_VOLUME;
            this.meVolume = DEFAULT_VOLUME;
            this.seVolume = DEFAULT_VOLUME;
            this[FLAG_NAME] = true;
            ConfigManager.save();
        }
    };

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config[FLAG_NAME] = this[FLAG_NAME];
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this[FLAG_NAME] = !!config[FLAG_NAME];
    };
})();