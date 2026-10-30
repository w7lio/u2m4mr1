//=============================================================================
// Plugin for RPG Maker MV and MZ
// InvokeCommonAtEquipChange.js
//=============================================================================
// [Update History]
// 2022.May.06 Ver1.0.0 first release

/*:
 * @target MV MZ
 * @plugindesc Invoke Common Event When player changes equipment
 * @author Sasuke KANNAZUKI
 *
 * @param commonId
 * @text Default Common Event ID
 * @desc deault commonID when user changes equip.
 * @type common_event
 * @min 0
 * @default 1
 *
 * @param timing
 * @text Event Invoke Timing
 * @desc The timing when it invokes common event
 * @option Just after equip changed
 * @value immediate
 * @option When player close menu
 * @value wait
 * @type select
 * @default wait
 *
 * @param doesInvokeAtNone
 * @text Does invoke when unequip?
 * @desc When player unequip item, invoke common event?
 * @type boolean
 * @on Yes
 * @off No. Only Equip Something
 * @default false
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MV(Ver1.6.0 or later) and MZ.
 * This plugin enables common event invocation at player changes any equipment.
 *
 * [Summary]
 * When player changes an actor's equipment, invoke specified common event.
 * If you need to change different common event at any equipment,
 * Write down following notation at weapon or armor note.
 * <invokeCommonEventId:12>
 * In this case, it'll invoke common event #12.
 * If you set 0, common event won't invoke.
 *
 * You can select the timing of common event invocation at parameter.
 * - When you select 'Just after equip changed', menu closed immediate and
 *   invoke specified common event.
 * - When you select 'When player close menu', wait until menu is closed.
 *   In this case, there is 2 notes.
 *  - When player change plural equipments, only invoke set last one.
 *  - If you change equip and save the game, common event won't invoke when
 *   load the game.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MV MZ
 * @plugindesc 装備変更時、コモンイベントを起動します
 * @author 神無月サスケ
 *
 * @param commonId
 * @text コモンイベントID
 * @desc 装備変更時に呼び出すデフォルトのコモンイベントID
 * @type common_event
 * @min 0
 * @default 1
 *
 * @param timing
 * @text 起動タイミング
 * @desc いつコモンイベントを起動するか
 * @option 装備変更後即座に
 * @value immediate
 * @option メニューを閉じた時
 * @value wait
 * @type select
 * @default wait
 *
 * @param doesInvokeAtNone
 * @text 装備を外した時も起動するか
 * @desc 装備を外した時もコモンイベントを起動するか
 * @type boolean
 * @on する
 * @off しない
 * @default false
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMV(Ver1.6.0以降)およびMZに対応しています。
 * このプラグインを導入することで、プレイヤーが装備変更時に
 * コモンイベントを呼び出すことが可能になります。
 *
 * ■概要
 * アクターが装備を変更した際にコモンイベントを起動します。
 * 特定の装備に特別なコモンイベントを割り当てたい場合、
 * <invokeCommonEventId:12>
 * というように装備のメモに書きます。この時は12番になります。
 * 0にすると、コモンイベントを起動しません。
 *
 * オプションによって、タイミングが設定可能です。
 * ・「装備変更後即座に」を選択すると、装備後、即座にマップ画面に切り替わり、
 * 　コモンイベントが実行されます。
 * ・「メニューを閉じた時」を選択すると、メニューが閉じるまで待ちます。
 * 　- 複数の装備を変更した場合、最後のコモンイベントだけが実行されます。
 *   - 装備変更後、セーブを行い、ロードした場合は、実行されません。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'invokeCommonAtEquipChange';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const defaultCommonId = Number(parameters['commonId'] || 0);
  const invokeTiming   = parameters['timing'] || 'wait';
  const doesInvokeAtNone = !!eval(parameters['doesInvokeAtNone']);

  //
  // determine common event id to invoke
  //
  const commonIdForTheEquip = item => {
    if (item) {
      let commonId;
      if (commonId = item.meta.invokeCommonEventId) {
        return commonId;
      }
    }
    return defaultCommonId;
  };

  const isConditionMet = item => doesInvokeAtNone || !!item;

  const isImmediate = () => invokeTiming === 'immediate';

  //
  // reserve common event
  //
  const _Scene_Equip_Scene_Equip = Scene_Equip.prototype.onItemOk;
  Scene_Equip.prototype.onItemOk = function() {
    const itemToEquip = this._itemWindow.item();
    _Scene_Equip_Scene_Equip.call(this);
    if (isConditionMet(itemToEquip)) {
      $gameTemp.reserveCommonEvent(commonIdForTheEquip(itemToEquip));
      if (isImmediate()) {
        Scene_ItemBase.prototype.checkCommonEvent.call(this);
      }
    }
  };

})();
