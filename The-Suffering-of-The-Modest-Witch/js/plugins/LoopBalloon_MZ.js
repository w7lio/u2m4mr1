/*:
 * @target MZ
 * @plugindesc 条件付きフキダシループ表示プラグイン（スイッチ・変数対応）
 * @author k
 *
 * @param BalloonInterval
 * @text 表示間隔（フレーム）
 * @type number
 * @min 1
 * @default 120
 *
 * @param BalloonId
 * @text フキダシID
 * @type number
 * @min 1
 * @default 1
 *
 * @param ConditionSwitch
 * @text 表示条件スイッチID
 * @type switch
 * @default 0
 * @desc このスイッチがONの時のみフキダシを表示します。0なら無条件。
 *
 * @param ConditionVariable
 * @text 表示条件変数ID
 * @type variable
 * @default 0
 * @desc この変数の値が閾値以上の時のみ表示します。0なら無視。
 *
 * @param ConditionValue
 * @text 変数条件の閾値
 * @type number
 * @default 0
 * @desc 変数がこの値以上の時のみ表示します。
 *
 * @help
 * イベントのメモ欄に <LoopBalloon> と書くと、
 * 指定した条件を満たした時だけ一定間隔でフキダシをループ表示します。
 *
 * 例：
 *   <LoopBalloon>
 *   スイッチID 5 がONのときのみ表示
 *   変数ID 3 が10以上のときのみ表示（スイッチが0なら無視）
 *
 * 優先順位：
 *   1. ConditionSwitch が指定されていればそれをチェック
 *   2. ConditionVariable が指定されていれば閾値と比較
 *   3. どちらも0なら常時表示
 */

(() => {
  const params = PluginManager.parameters("LoopBalloon_MZ");
  const interval = Number(params["BalloonInterval"] || 120);
  const balloonId = Number(params["BalloonId"] || 1);
  const conditionSwitch = Number(params["ConditionSwitch"] || 0);
  const conditionVariable = Number(params["ConditionVariable"] || 0);
  const conditionValue = Number(params["ConditionValue"] || 0);

  const _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    _Game_Event_update.call(this);
    if (this._erased) return;

    if (this.event().meta.LoopBalloon && this._meetsBalloonCondition()) {
      if (!this._loopBalloonCounter) this._loopBalloonCounter = 0;
      this._loopBalloonCounter++;

      if (!this.isBalloonPlaying() && this._loopBalloonCounter >= interval) {
        this._loopBalloonCounter = 0;
        $gameTemp.requestBalloon(this, balloonId);
      }
    }
  };

  Game_Event.prototype._meetsBalloonCondition = function() {
    // スイッチ条件
    if (conditionSwitch > 0 && !$gameSwitches.value(conditionSwitch)) {
      return false;
    }
    // 変数条件
    if (conditionVariable > 0 && $gameVariables.value(conditionVariable) < conditionValue) {
      return false;
    }
    return true;
  };
})();
