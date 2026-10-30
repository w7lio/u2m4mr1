//=============================================================================
// MNKR_TMSoloMenuSimple Ver.0.0.2 (MZ-compatible)
// Copyright (c) 2020 Munokura
// Original TMPlugin - 一人旅メニュー (tomoaky) 改変: munokura
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 一人旅の時、アクター選択を省略します（MZ互換、未定義保護付き） 
 * @author tomoaky (改変 munokura)
 *
 * @param forceChangeSoloMenu
 * @text 一人旅機能
 * @type boolean
 * @on 常時ON
 * @off パーティの人数で変化
 * @desc 初期値: 常にアクター選択を省略 (true)
 * @default true
 *
 * @help
 * TMPlugin - 一人旅メニュー ver0.1.3b をMZ向けに互換化・安全化した改変版です。
 * 以下の改良点を含みます:
 *  - @target を MZ に変更
 *  - プラグイン名を固定文字列化し、document.currentScript 取得の失敗に備えます
 *  - 未定義の soloItemStatus を保護するデフォルト配列を用意
 *  - パラメータ読み取りのフォールバックを強化
 *
 * プラグインコマンドはありません。
 *
 * MITライセンスの下で配布されています。
 */

var Imported = Imported || {};
Imported.TMSoloMenu = true;

(() => {
  "use strict";

  // 安全なプラグイン名取得（document.currentScript が使えない環境を考慮）
  const pluginName = "MNKR_TMSoloMenuSimple";

  // パラメータ取得（存在しない場合に備えたフォールバック）
  let parameters = {};
  try {
    parameters = PluginManager.parameters(pluginName) || {};
  } catch (e) {
    parameters = {};
  }
  const forceChangeSoloMenu = (function () {
    try {
      const p = parameters['forceChangeSoloMenu'];
      if (p === undefined || p === null) return true;
      return JSON.parse(String(p));
    } catch (e) {
      return true;
    }
  })();

  // soloItemStatus が未定義の場合のデフォルト (幅: 名前, アイコン, HP, MP, TP)
  var soloItemStatus = (typeof soloItemStatus !== "undefined" && soloItemStatus) ? soloItemStatus : [0, 0, 0, 0, 0];

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  if (typeof Game_Party !== "undefined") {
    Game_Party.prototype.isSoloMenuValid = function () {
      return forceChangeSoloMenu || this.size() === 1;
    };
  }

  //-----------------------------------------------------------------------------
  // Window_SoloItemStatus
  //

  function Window_SoloItemStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_SoloItemStatus.prototype = Object.create(Window_Base.prototype);
  Window_SoloItemStatus.prototype.constructor = Window_SoloItemStatus;

  Window_SoloItemStatus.prototype.initialize = function (x, y, width) {
    Window_Base.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
    this.refresh();
  };

  Window_SoloItemStatus.prototype.refresh = function () {
    var x = 0;
    var actor = $gameParty.leader();
    this.contents.clear();
    if (!actor) return;
    if (soloItemStatus[0] > 0) {
      this.drawActorName(actor, x, 0, soloItemStatus[0]);
      x += soloItemStatus[0] + 16;
    }
    if (soloItemStatus[1] > 0) {
      this.drawActorIcons(actor, x, 0, soloItemStatus[1]);
      x += soloItemStatus[1] + 16;
    }
    if (soloItemStatus[2] > 0) {
      this.drawActorHp(actor, x, 0, soloItemStatus[2]);
      x += soloItemStatus[2] + 16;
    }
    if (soloItemStatus[3] > 0) {
      this.drawActorMp(actor, x, 0, soloItemStatus[3]);
      x += soloItemStatus[3] + 16;
    }
    if (soloItemStatus[4] > 0) {
      this.drawActorTp(actor, x, 0, soloItemStatus[4]);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  if (typeof Scene_Menu !== "undefined") {
    const _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function () {
      if ($gameParty && $gameParty.isSoloMenuValid && $gameParty.isSoloMenuValid()) {
        if ($gameParty.leader) $gameParty.setTargetActor($gameParty.leader());
        this.onPersonalOk();
      } else {
        _Scene_Menu_commandPersonal.apply(this, arguments);
      }
    };
  }

  //-----------------------------------------------------------------------------
  // Scene_ItemBase
  //

  if (typeof Scene_ItemBase !== "undefined") {
    const _Scene_ItemBase_itemTargetActors = Scene_ItemBase.prototype.itemTargetActors;
    Scene_ItemBase.prototype.itemTargetActors = function () {
      try {
        var action = new Game_Action(this.user());
        action.setItemObject(this.item());
        if ($gameParty && $gameParty.isSoloMenuValid && $gameParty.isSoloMenuValid() && action.isForFriend()) {
          return [$gameParty.leader()];
        } else {
          return _Scene_ItemBase_itemTargetActors.apply(this, arguments);
        }
      } catch (e) {
        return _Scene_ItemBase_itemTargetActors.apply(this, arguments);
      }
    };

    const _Scene_ItemBase_determineItem = Scene_ItemBase.prototype.determineItem;
    Scene_ItemBase.prototype.determineItem = function () {
      try {
        var action = new Game_Action(this.user());
        action.setItemObject(this.item());
        if ($gameParty && $gameParty.isSoloMenuValid && $gameParty.isSoloMenuValid() && action.isForFriend()) {
          if (this.canUse && this.canUse()) {
            this.useItem();
            if (this._itemWindow && this._itemWindow.refresh) this._itemWindow.refresh();
            if (this._soloStatusWindow && this._soloStatusWindow.refresh) this._soloStatusWindow.refresh();
          } else {
            if (SoundManager && SoundManager.playBuzzer) SoundManager.playBuzzer();
          }
          if (this._itemWindow && this._itemWindow.activate) this._itemWindow.activate();
        } else {
          _Scene_ItemBase_determineItem.apply(this, arguments);
        }
      } catch (e) {
        _Scene_ItemBase_determineItem.apply(this, arguments);
      }
    };
  }

})();
