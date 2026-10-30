// EventConditionsEx.js Ver.2.1.0
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ MV
* @plugindesc Event conditions can be set in more detail.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/493464265.html
* @help Ver.2.1.0
* [Conditions]
* (1) Enter the comment //Condition in the conditional branch script.
*     Don't forget the two slashes!
* (2) Enter the condition in the conditional branch in (1).
* (3) That conditional branch becomes the condition.
*
* The condition is met when "◆Comment：true" is reached.
* The condition is not met when "◆Comment：false" is reached.
* The condition is also not met if "◆Comment：true" is not reached.
* Can be used for map events and battle events.
*
* [Scripts]
* this.return(true/false); //It is treated the same as a comment.
* this._childResult //Get common event result.
*
* [Specifications]
* For now, This plugin have set an upper limit on the range in which
* appearance condition comments can be detected.
* Please adjust the detection range according to your application.
*
* In RPG Maker MZ, when you run the following command,
* the map will be updated and the appearance conditions will be verified.
* ・Control Switch
* ・Control Variable
* ・Control Self Switch
* ・Change Items/Weapons/Armor
* ・Change Party Member
*
* In addition to this, this plugin also updates the following:
* ・Control Timer
* ・Chage Gold
*
* @param commentOfConditions
* @text Comment of Conditions
* @desc This is a comment used for condition expansion.
* Use // before it.
* @default Condition
*
* @param detectionRange
* @text Detection Range
* @desc Search for a conditional comment in the specified number of lines.
* @type number
* @default 15
* @min 1
*
* @param enableTimerRefresh
* @text Refresh with Timer
* @desc Refresh the map when the timer value changes.
* @type boolean
* @default true
*
* @param enableGoldRefresh
* @text Refresh with Gold
* @desc Refresh the map when making gold changes.
* @type boolean
* @default true
*
*/

/*:ja
* @target MZ MV
* @plugindesc イベントの出現条件をより細かく設定可能になります。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/493464265.html
* @help [出現条件]
* (1) 条件分岐のスクリプトに //出現条件 とコメントを入力します。
* 　　必ず、スラッシュ２つを忘れないようにして下さい。
* (2) (1)の条件分岐内に出現条件を記入します。
* (3) その条件分岐が出現条件になります。
*
* ◆注釈：true に到達すると出現条件を満たします。
* ◆注釈：false に到達すると出現条件を満たしません。
* ◆注釈：true に到達しなかった場合も出現条件を満たしません。
* マップイベント、バトルイベントに使用できます。
*
* [スクリプト]
* this.return(true/false); //注釈と同じ扱いです。
* this._childResult //コモンイベントの結果を取得。
*
* [仕様]
* 一応、出現条件コメントを検出する範囲に上限を設けています。
* 自分の用途に合わせて検出範囲を調整して下さい。
*
* ツクールMZでは以下のコマンドを実行した時にマップが更新され、
* 出現条件が検証されます。
* ・スイッチの操作
* ・変数の操作
* ・セルフスイッチの操作
* ・アイテム/武器/防具の増減
* ・メンバーの入れ替え
*
* 本プラグインではそれに加え、以下でも更新されます。
* ・タイマーの操作
* ・所持金の増減
* 
*
* [更新履歴]
* 2022/11/13：Ver.1.0.0　公開
* 2022/11/21：Ver.1.0.1　メソッド名変更。
* 2023/07/20：Ver.2.0.0　機能一新。折り畳み機能に対応するなど全体的に合理化。
* 2023/12/15：Ver.2.1.0　シーン遷移と同時に出現条件を判定した時の不具合を修正。
*
* @param commentOfConditions
* @text 出現条件コメント
* @desc 出現条件拡張に利用するコメントです。
* コメントの前に//を入れて使用します。
* @default 出現条件
*
* @param detectionRange
* @text 検出範囲
* @desc 指定した行数ぶん、出現条件コメントを探します。
* それを超えた場合、出現条件は無いものとみなします。
* @type number
* @default 15
* @min 1
*
* @param enableTimerRefresh
* @text タイマーで更新
* @desc タイマーの数値が変化した時にマップを更新します。
* @type boolean
* @default true
*
* @param enableGoldRefresh
* @text 所持金で更新
* @desc 所持金の増減を行った時にマップを更新します。
* @type boolean
* @default true
*
*/

'use strict';

{
	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const parameters = PluginManager.parameters(pluginName);
	const commentOfConditions = "//" + parameters["commentOfConditions"];
	const enableTimerRefresh = parameters["enableTimerRefresh"] === "true";
	const enableGoldRefresh = parameters["enableGoldRefresh"] === "true";
	const detectionRange = Number(parameters["detectionRange"]);

	//-----------------------------------------------------------------------------
	// Game_Temp

	const _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_initialize.call(this);
		this._conditionsEx = new Game_EventConditionsEx();
	};

	//-----------------------------------------------------------------------------
	// Game_EventConditionsEx

	function Game_EventConditionsEx() {
	    this.initialize(...arguments);
	}

	Game_EventConditionsEx.prototype = Object.create(Game_Interpreter.prototype);
	Game_EventConditionsEx.prototype.constructor = Game_EventConditionsEx;

	Game_EventConditionsEx.prototype.clear = function() {
		Game_Interpreter.prototype.clear.call(this);
		this._result = false;
		this._childResult = false;
	};

	Game_EventConditionsEx.prototype.return = function(value) {
		this._result = value;
		return this.command115();
	};

	Game_EventConditionsEx.prototype.loadImages = function() {};

	Game_EventConditionsEx.prototype.update = function() {
		while (this.isRunning()) {
			this.executeCommand();
		}
	};

	Game_EventConditionsEx.prototype.executeCommand = function() {
		Game_Interpreter.prototype.executeCommand.call(this);
		return true;
	};

	Game_EventConditionsEx.prototype.updateWait = function() {
		return false;
	};

	Game_EventConditionsEx.prototype.command108 = function(params = this._params) {
		const bool = params[0];
		if (bool === "true" || bool === "false") {
			return this.return(bool === "true");
		}
		return Game_Interpreter.prototype.command108.call(this, params);
	};

	Game_EventConditionsEx.prototype.getResult = function(list, eventId) {
		this.setup(list, eventId);
		this.update();
		return !!this._result;
	};

	Game_EventConditionsEx.prototype.setupChild = function(list, eventId) {
		this._childInterpreter = new Game_EventConditionsEx(this._depth + 1);
		this._childResult = this._childInterpreter.getResult(list, eventId);
		this._childInterpreter = null;
	};

	Game_EventConditionsEx.prototype.updateChild = function() {
		return false;
	};

	Game_EventConditionsEx.prototype.checkFreeze = function() {
		return false;
	}

	window.Game_EventConditionsEx = Game_EventConditionsEx;

	//-----------------------------------------------------------------------------
	// Game_Event

	const _Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
	Game_Event.prototype.meetsConditions = function(page) {
		return _Game_Event_meetsConditions.call(this, page) && this.meetsConditionsEx(page);
	};

	Game_Event.prototype.meetsConditionsEx = function(page) {
		const list = page.conditions.conditionsEx;
		return !list || $gameTemp._conditionsEx.getResult(list, this._eventId);
	};

	//-----------------------------------------------------------------------------
	// Game_Troop

	const _Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
	Game_Troop.prototype.meetsConditions = function(page) {
		const c = page.conditions;
		if (c.turnEnding || c.turnValid || c.enemyValid || c.actorValid || c.switchValid) {
			return _Game_Troop_meetsConditions.call(this, page) && this.meetsConditionsEx(page);
		}
		return this.meetsConditionsEx(page, true);
	};

	Game_Troop.prototype.meetsConditionsEx = function(page, noCon) {
		const c = page.conditions;
		if (!("conditionsEx" in c)) {
			DataManager.extractConditionsEx(page);
		}
		const list = c.conditionsEx;
		if (noCon && !list) {
			return false;
		}
		return !list || $gameTemp._conditionsEx.getResult(list, this._eventId);
	};

	//-----------------------------------------------------------------------------
	// Game_Timer

	if (enableTimerRefresh) {

		const _Game_Timer_initialize = Game_Timer.prototype.initialize;
		Game_Timer.prototype.initialize = function() {
			_Game_Timer_initialize.call(this);
			this._lastSeconds = 0;
		};

		const _Game_Timer_start = Game_Timer.prototype.start;
		Game_Timer.prototype.start = function(count) {
			_Game_Timer_start.call(this, count);
			$gameMap.requestRefresh();
		};

		const _Game_Timer_stop = Game_Timer.prototype.stop;
		Game_Timer.prototype.stop = function() {
			_Game_Timer_stop.call(this);
			$gameMap.requestRefresh();
		};

		const _Game_Timer_update = Game_Timer.prototype.update;
		Game_Timer.prototype.update = function(sceneActive) {
			const lastFrames = this._frames;
			_Game_Timer_update.call(this, sceneActive);
			if (sceneActive && this._working) {
				const sec = $gameTimer.seconds();
				if (sec !== this._lastSeconds || lastFrames !== this._frames && this._frames === 0) {
					$gameMap.requestRefresh();
				}
				this._lastSeconds = sec;
			}
		};
	}

	if (enableGoldRefresh) {
		const _Game_Party_gainGold = Game_Party.prototype.gainGold;
		Game_Party.prototype.gainGold = function(amount) {
			_Game_Party_gainGold.call(this, amount);
			$gameMap.requestRefresh();
		};
	}

	//-----------------------------------------------------------------------------
	// DataManager

	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this, object);
		if (!!(object.data && object.events)) {
			this.extractArrayConditionsEx(object.events);
		}
	};

	DataManager.extractArrayConditionsEx = function(array) {
		if (Array.isArray(array)) {
			for (const data of array) {
				if (data && "pages" in data) {
					for (const page of data.pages) {
						this.extractConditionsEx(page);
					}
				}
			}
		}
	};

	DataManager.extractConditionsEx = function(page) {
		const list = page.list;
		const startIndex = this.findConditionsExStartIndex(list);
		const endIndex = this.findConditionsExEndIndex(list, startIndex);
		if (startIndex < endIndex) {
			page.conditions.conditionsEx = list.slice(startIndex + 1, endIndex);
		} else {
			page.conditions.conditionsEx = null;
		}
	};

	DataManager.findConditionsExStartIndex = function(list) {
		const len = Math.min(detectionRange, list.length);
		for (let i = 0; i < len; i++) {
			const command = list[i];
			if (command.code === 111 && command.parameters[1] === commentOfConditions) {
				command.parameters[0] = -1;
				return i;
			}
		}
		return -1
	};

	DataManager.findConditionsExEndIndex = function(list, startIndex) {
		if (startIndex === -1) return -1;
		const indent = list[startIndex].indent;
		for (let i = startIndex; i < list.length; i++) {
			const command = list[i];
			if (command.indent === indent && (command.code === 411 || command.code === 412)) {
				return i;
			}
		}
		return -1
	};

}