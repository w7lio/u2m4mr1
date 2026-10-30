/*=============================================================================
 GE_LeaderHpZeroCommonEvent.js
 パーティ先頭アクターの HP が変化して 0 になったときだけコモンを実行し、
 終了後に HP を全快する。処理中は並び替えをブロックし隊列を維持する。
=============================================================================*/
/*:
 * @plugindesc 先頭のHPが0になったときコモン実行→全快（隊列固定オプション）
 * @target MZ
 * @author Good Emotion
 *
 * @param commonEventId
 * @text コモンイベントID
 * @desc 先頭のHPが0になったあと実行するコモンイベント（データベースの番号）です。
 * @default 1
 * @type common_event
 *
 * @param validSwitchId
 * @text 有効スイッチ
 * @desc 0 なら常に有効。指定したスイッチが ON のときだけ本プラグインの処理を行います。
 * @default 0
 * @type switch
 *
 * @param lockPartyOrder
 * @text 隊列（並び順）の固定
 * @desc HP0からコモン終了・全快まで「並び替え」を禁止し、開始時の並びをスナップショットで保持します。
 * @default true
 * @type boolean
 *
 * @param recoverMode
 * @text 全快の内容
 * @desc HPのみ最大にするか、コアの recoverAll（MP・ステート含む）にするか。
 * @default hpOnly
 * @type select
 * @option HPのみ最大
 * @value hpOnly
 * @option recoverAll（MP・ステ含む）
 * @value recoverAll
 *
 * @command forceFinishNow
 * @text 即座に全快・解除
 * @desc 予約／コモン待ちを中断し、先頭を全快して隊列ロックを解除します（救済用）。
 *
 * @command setCommonEventId
 * @text コモンIDを変更
 * @desc このセッション中だけ実行するコモンイベントIDを上書きします。
 *
 * @arg commonEventId
 * @text コモンイベント
 * @type common_event
 * @default 1
 *
 * @help
 * ■概要
 * - HP は「変化した結果」が 0 のときだけ判定します（毎フレームのポーリングはしません）。
 *   Game_BattlerBase.setHp のほか、die() による即死にも対応します。
 * - 指定のコモンイベントを予約実行し、マップ／戦闘のイベントがすべて空き、
 *   かつメッセージも閉じたあとで先頭の HP を全快します。
 * - 「隊列の固定」ON の間はメニューの並び替え（swapOrder）を無視します。
 *   全快後にスナップショットと異なる並びになっていた場合は並びを戻します。
 * - すでにコモン待ち～全快待ちの間に再度先頭が0になる場合は無視します（二重発火防止）。
 *
 * ■コモン側の注意
 * - コモン実行中は先頭はまだ HP0（戦闘不能）のままです。演出後にプラグインが全快します。
 * - 並び替えをイベントコマンドで行いたい場合は、パラメータ「隊列の固定」を OFF にするか、
 *   有効スイッチで一時的に本プラグインを無効化してください（forceFinishNow は全快まで行います）。
 *
 * ■プラグインコマンド
 * - forceFinishNow … 予約・コモン待ちを中断し、即座に全快＆隊列復帰（救済用）
 * - setCommonEventId … 実行するコモンIDを一時変更（引数で指定）
 *
 * ■セーブ
 * - 処理の途中でセーブした場合の状態は保証しません。コモン～全快の間はセーブ非推奨です。
 */

(() => {
    'use strict';

    const pluginName = 'GE_LeaderHpZeroCommonEvent';
    const params = PluginManager.parameters(pluginName);

    let runtimeCommonEventId = Math.max(0, Number(params.commonEventId || 1));
    const validSwitchId = Math.max(0, Number(params.validSwitchId || 0));
    const lockPartyOrder = params.lockPartyOrder !== 'false';
    const recoverMode = params.recoverMode === 'recoverAll' ? 'recoverAll' : 'hpOnly';

    /** @type {{ commonEventId:number, snapshot:number[]|null, leaderActorId:number, eventDispatched:boolean } | null} */
    let pending = null;

    let suppressHpCheck = false;

    //-------------------------------------------------------------------------
    function pluginEnabled() {
        if (!$gameParty || !$gameParty._actors) {
            return false;
        }
        if (validSwitchId <= 0) {
            return true;
        }
        return $gameSwitches.value(validSwitchId);
    }

    function leadActorId() {
        const ids = $gameParty._actors;
        return ids && ids.length > 0 ? ids[0] : 0;
    }

    function isLeadActor(actor) {
        return (
            actor &&
            actor.isActor() &&
            actor.actorId() > 0 &&
            actor.actorId() === leadActorId()
        );
    }

    function commonEventIsValid(id) {
        return id > 0 && !!($dataCommonEvents && $dataCommonEvents[id]);
    }

    function eventsBusy() {
        const mapBusy = $gameMap && $gameMap.isEventRunning && $gameMap.isEventRunning();
        const troopBusy = $gameTroop && $gameTroop.isEventRunning && $gameTroop.isEventRunning();
        const msgBusy = $gameMessage && $gameMessage.isBusy();
        return !!(mapBusy || troopBusy || msgBusy);
    }

    function applyRecoveryToActor(actor) {
        if (!actor) {
            return;
        }
        suppressHpCheck = true;
        try {
            if (recoverMode === 'recoverAll') {
                actor.recoverAll();
            } else {
                actor.setHp(actor.mhp);
            }
        } finally {
            suppressHpCheck = false;
        }
    }

    function restorePartyOrder(snapshot) {
        if (!snapshot || !$gameParty || !$gameParty._actors) {
            return;
        }
        const cur = $gameParty._actors.join(',');
        const snap = snapshot.join(',');
        if (cur !== snap) {
            $gameParty._actors = snapshot.slice();
            if ($gamePlayer) {
                $gamePlayer.refresh();
            }
            if ($gameMap && $gameMap.requestRefresh) {
                $gameMap.requestRefresh();
            }
            if ($gameTemp && $gameTemp.requestBattleRefresh) {
                $gameTemp.requestBattleRefresh();
            }
        }
    }

    function clearPartyLock() {
        if ($gameParty) {
            $gameParty._geLeaderZeroLock = false;
        }
    }

    function finishPending() {
        const p = pending;
        pending = null;
        clearPartyLock();

        if (!p || !p.leaderActorId) {
            return;
        }
        const actor = $gameActors.actor(p.leaderActorId);
        applyRecoveryToActor(actor);

        if (lockPartyOrder && p.snapshot) {
            restorePartyOrder(p.snapshot);
        }
    }

    function tryPollComplete() {
        if (!pending) {
            return;
        }
        if (!pending.eventDispatched) {
            return;
        }
        if (eventsBusy()) {
            return;
        }
        finishPending();
    }

    function beginLeaderZeroFlow(actor) {
        if (!pluginEnabled()) {
            return;
        }
        if (suppressHpCheck) {
            return;
        }
        if (!commonEventIsValid(runtimeCommonEventId)) {
            return;
        }
        if (pending) {
            return;
        }

        const snapshot =
            lockPartyOrder && $gameParty._actors ? $gameParty._actors.slice() : null;

        if (lockPartyOrder) {
            $gameParty._geLeaderZeroLock = true;
        }

        pending = {
            commonEventId: runtimeCommonEventId,
            snapshot,
            leaderActorId: actor.actorId(),
            eventDispatched: false
        };

        $gameTemp.reserveCommonEvent(runtimeCommonEventId);
    }

    function onHpPossiblyZero(actor, oldHp, newHp) {
        if (!DataManager.isDatabaseLoaded()) {
            return;
        }
        if (suppressHpCheck) {
            return;
        }
        if (oldHp === newHp) {
            return;
        }
        if (newHp !== 0) {
            return;
        }
        if (oldHp <= 0) {
            return;
        }
        if (!isLeadActor(actor)) {
            return;
        }
        beginLeaderZeroFlow(actor);
    }

    //-------------------------------------------------------------------------
    const _Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
    Game_BattlerBase.prototype.setHp = function(hp) {
        const oldHp = this.hp;
        _Game_BattlerBase_setHp.call(this, hp);
        if (this.isActor()) {
            onHpPossiblyZero(this, oldHp, this.hp);
        }
    };

    const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        const oldHp = this.hp;
        _Game_BattlerBase_die.call(this);
        if (this.isActor()) {
            onHpPossiblyZero(this, oldHp, this.hp);
        }
    };

    const _Game_Temp_retrieveCommonEvent = Game_Temp.prototype.retrieveCommonEvent;
    Game_Temp.prototype.retrieveCommonEvent = function() {
        const ev = _Game_Temp_retrieveCommonEvent.call(this);
        if (pending && ev && ev.id === pending.commonEventId) {
            pending.eventDispatched = true;
        }
        return ev;
    };

    const _Game_Party_swapOrder = Game_Party.prototype.swapOrder;
    Game_Party.prototype.swapOrder = function(index1, index2) {
        if (lockPartyOrder && this._geLeaderZeroLock) {
            return;
        }
        _Game_Party_swapOrder.call(this, index1, index2);
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        tryPollComplete();
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        tryPollComplete();
    };

    //-------------------------------------------------------------------------
    PluginManager.registerCommand(pluginName, 'forceFinishNow', () => {
        if (pending) {
            finishPending();
        }
    });

    PluginManager.registerCommand(pluginName, 'setCommonEventId', args => {
        const id = Number(args.commonEventId || 0);
        if (id > 0) {
            runtimeCommonEventId = id;
        }
    });
})();
