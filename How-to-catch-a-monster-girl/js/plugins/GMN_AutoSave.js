//=============================================================================
// GMN_AutoSave.js
// ----------------------------------------------------------------------------
// (C)2022 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @target MZ
 * @plugindesc Change when autosave is performed.
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_AutoSave.js
 * @author GEMINI
 *
 * @help Changes the timing at which autosave is performed.
 * By the switch specified in the plugin parameters.
 * You can toggle whether to autosave when switching maps or at the end of a battle.
 *
 * 2022/02/09 1.0.0 released
 *
 * @param shouldAutosaveOnMap
 * @text Whether to autosave when switching maps.
 * @desc Autosave on map switch if the specified switch is ON.
 * @type switch
 * @default 0
 *
 * @param shouldAutosaveOnBattle
 * @text Whether to autosave at the end of battle.
 * @desc Autosave at the end of battle if the specified switch is ON.
 * @type switch
 * @default 0
 *
 * @command AUTO_SAVE
 * @text execute autosave
 * @desc Execute autosave at the timing when the plugin command is executed.
 */
/*:ja
 * @target MZ
 * @plugindesc オートセーブが行われるタイミングを変更します。
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_AutoSave.js
 * @author ジェミニ
 *
 * @help オートセーブが行われるタイミングを変更します。
 * プラグインパラメータで指定したスイッチによって
 * マップ切り替え時・戦闘終了時にオートセーブするかを切り替えられます。
 *
 * 2022/02/09 1.0.0 公開
 *
 * @param shouldAutosaveOnMap
 * @text マップ切り替え時にオートセーブするか
 * @desc 指定したスイッチがONの場合マップ切り替え時にオートセーブします。
 * @type switch
 * @default 0
 *
 * @param shouldAutosaveOnBattle
 * @text 戦闘時終了にオートセーブするか
 * @desc 指定したスイッチがONの場合戦闘時終了時にオートセーブします。
 * @type switch
 * @default 0
 *
 * @command AUTO_SAVE
 * @text オートセーブ実行
 * @desc プラグインコマンドを実行したタイミングでオートセーブを行います。
 */
"use strict";
{
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);
  PluginManagerEx.registerCommand(script, "AUTO_SAVE", () => {
    SceneManager._scene.requestAutosave();
  });
  const _Scene_Map_shouldAutosave = Scene_Map.prototype.shouldAutosave;
  Scene_Map.prototype.shouldAutosave = function () {
    const shouldAutosave = param.shouldAutosaveOnMap;
    if (shouldAutosave > 0 && $gameSwitches.value(shouldAutosave)) {
      return _Scene_Map_shouldAutosave.call(this);
    }
    return false;
  };
  const _Scene_Battle_shouldAutosave = Scene_Battle.prototype.shouldAutosave;
  Scene_Battle.prototype.shouldAutosave = function () {
    const shouldAutosave = param.shouldAutosaveOnBattle;
    if (shouldAutosave > 0 && $gameSwitches.value(shouldAutosave)) {
      return _Scene_Battle_shouldAutosave.call(this);
    }
    return false;
  };
}
