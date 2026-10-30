// ReplaceTargetCharacter.js Ver.3.1.1
// MIT License (C) 2020 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:ja
* @target MV MZ
* @orderAfter PluginCommonBase
* @plugindesc イベントコマンドの対象キャラクターを上書き可能になります。
* フォロワーや乗り物にも移動ルートの設定を行えたりｱﾆﾒｰｼｮﾝを表示出来たりします。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/482179954.html
* @help 【プラグインコマンド】
* [対象キャラクター上書き]
* replaceCharacter キャラクターID
* このイベント:0  主人公:-1  フォロワー:～-2  乗り物:～-1000
* ここで指定したキャラクターが対象になります。
* （例）イベントID:002のセルフスイッチを操作したい場合
* ◆プラグインコマンド：replaceCharacter 2
* ◆セルフスイッチの操作：A = ON
*
* ※「条件分岐」で使用する場合は「キャラクター」を選択する必要があります。
* （例）フォロワー３の向きが下かを確認したい場合
* ◆プラグインコマンド：replaceCharacter -４
* ◆条件分岐：プレイヤーが下を向いている
* 　◆
* ：分岐終了
*
* ※「イベントの位置設定」で複数指定したい項目がある場合はコンマで区切ると2つ目も
* 指定できます（MZのプラグインコマンドも同様）。
* ただし、「他のイベントと交換」を選択する必要があります。
* （例）フォロワー２と主人公の位置を交換したい場合
* ◆プラグインコマンド：replaceCharacter -2,-1
* ◆イベントの位置設定：このイベント, このイベントと交換
*
* _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
* 【仕様】
* 目的のイベントコマンドより上にプラグインコマンドを配置する事で対象キャラクターを
* 上書きできます。
* PluginCommonBaseなど、プラグインコマンドに変数が利用可能になるプラグインと
* 併用すると変数も使用できるので便利です。
* イベントコマンドの以下の9つが上書き対象です。
*
* ・条件分岐
* ・セルフスイッチの操作
* ・イベントの位置設定
* ・移動ルートの設定
* ・透明状態の変更
* ・アニメーションの表示
* ・フキダシアイコンの表示
* ・イベントの一時消去（イベントのみ）
* ・コモンイベント（イベントのみ）
*
* 隊列歩行解除スイッチをONにするとフォロワーがプレイヤーに追従しなくなります。
* 隊列歩行解除スイッチをOFFにすると元に戻ります。
* 隊列歩行解除スイッチOFF時にもフォロワーの移動ルートの設定は可能ですが、
* 以下の状態がプレイヤーと同期する制約があります。
*
* ・移動速度
* ・不透明度
* ・合成方法
* ・歩行アニメON/OFF
* ・足踏みアニメON/OFF
* ・向き固定ON/OFF
* ・透明状態
* 
* ※[隊列メンバーの集合]を実行すると隊列歩行解除ｽｲｯﾁが強制的にOFFになります。
* 
* キャラクターをスクリプトで操作する際、
* フォロワーは
* フォロワー1：this.character(-2)
* フォロワー2：this.character(-3)
* フォロワー3：this.character(-4)
* で取得できます。
*
* 乗り物は
* 小型船:this.character(-1000)
* 大型船:this.character(-1001)
* 飛行船:this.character(-1002)
* で取得できます。
*
* 【このプラグインの活用例】
* このイベント以外のイベントを消去する
* イベントでフォロワーにアクションさせる。
* コモンイベントと組み合わせて、オリジナルのフォロワーの集合方法を作る。
*
* [更新履歴]
* 2020/11/27：Ver.0.9.0β　β版リリース。
* 2020/12/01：Ver.1.0.0　余計な機能を削除。リファクタリング。
* 2021/07/06：Ver.1.1.0　バグ修正。コモンイベントを追加。イベントの位置の交換に対応。MVとMZのイベントコマンドの関数を統合。
* 2021/07/09：Ver.1.1.1　乗り物を操作できる機能を追加。
* 2021/09/17：Ver.2.0.0　機能を簡素化。
* 2022/02/07：Ver.3.0.0　機能を最適化。ハッシュ値を使用。
* 2022/02/14：Ver.3.0.1　主人公のイベントの位置設定使用時にループ遠景がズレる問題を修正。
* 2022/02/15：Ver.3.0.2　修正による不具合を修正。
* 2023/02/14：Ver.3.1.0　飛行船の影を修正。
* 2024/06/09：Ver.3.1.1　競合対策。
*
* @command replaceCharacter
* @text 対象キャラクター上書き
* @desc ここで指定したキャラクターが対象になります。
*
* @arg characterId
* @text キャラクターID
* @desc ここで指定したIDのキャラクターが対象になります。
* このイベント:0  主人公:-1  フォロワー:～-2  乗り物:～-1000
* @default 0
* @type string
*
* @param scatterSwitch
* @text 隊列歩行解除スイッチ
* @desc 隊列歩行の可否を設定するスイッチ。
* OFFだと隊列歩行有効。ONだと隊列歩行無効。
* @default 1
* @type switch
*
* @param autoScatter
* @text 自動隊列解除
* @desc フォロワーを対象に[移動ルートの設定]をした時、
* 必ず隊列を解除させる。
* @default true
* @type boolean
*/
/*:
* @target MV MZ
* @orderAfter PluginCommonBase
* @plugindesc You can overwrite the target of the event command.
* Followers and vehicles can also set movement routes and display animations.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/482179954.html
* @help Ver.3.1.0
*【Script】
* this.character(-2) //Follower 1
* this.character(-3) //Follower 2
* this.character(-4) //Follower 3
*
* this.character(-1000) //Boat
* this.character(-1001) //Ship
* this.character(-1002) //Airship
*
* 【Plugin Command】
* [Target Override]
* replaceCharacter (Character ID)
* This Event:0  Player:-1  Follower:～-2  Vehicle:～-1000
* The character specified here will be the target.
* （例）If you want to operate the self switch of Event ID: 002
* ◆Plugin Command：replaceCharacter 2
* ◆Control Self Switch：A = ON
*
* ※When used together with "Conditional branch", "Character" must be selected.
* （例）If you want to check whether the direction of follower 3 is down
* ◆Plugin Command：replaceCharacter -４
* ◆If：Player is facing Down
*   ◆
* ：End
*
* ※If you want to specify multiple characters in "Set Event Location",
* you can specify the second one by separating them with a comma
* (the same applies to MZ plugin command).
* However, you must select "Exchange with another event".
* （例）If you want to swap the positions of follower 2 and player
* ◆Plugin Command：replaceCharacter -2,-1
* ◆Set Event Location：This Event, Exchange with This Event
*
* _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
* 【Specification】
* Place the plugin command above the event command to override the target.
* You can also use variables using "PluginCommonBase".
*
* You can override the target of nine event commands:
* ・Conditional Branch
* ・Control Self Switch
* ・Set Event Location
* ・Set Movement Route
* ・Change Transparency
* ・Show Animation
* ・Show Balloon Icon
* ・Erase Event (event only)
* ・Common Event (event only)
*
* When "Scatter Switch" is turned on, followers will not follow the player.
* Turn off "Scatter Switch" to restore.
* Even if the "scatter switch" is OFF, it is possible to set
* the movement route of the follower.
* However, there are restrictions on synchronizing with the player
* under the following conditions.
* ・Move Speed
* ・Opacity
* ・Blend Mode
* ・Walking Animation
* ・Stepping Animation
* ・Direction Fix
* ・Transparency
* 
* ※When you run [Gather Followers], the "Scatter Switch" is forcibly
* turned off.
*
* @command replaceCharacter
* @text Replace Character
* @desc The event specified here will be the target.
*
* @arg characterId
* @text Character ID
* @desc The event specified here will be the target.
* This Event:0  Player:-1  Follower:～-2  Vehicle:～-1000
* @default 0
* @type string
*
* @param scatterSwitch
* @text Scatter Switch
* @desc The switch that disables platoon walking.
* @default 1
* @type switch
*
* @param autoScatter
* @text Auto Scatter
* @desc Turn on "Scatter Switch" when doing "Set Movement Route" to the follower.
* @default true
* @type boolean
*/

'use strict';
{
	//プラグイン名取得
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	//プラグインパラメーター取得
	const parameter = PluginManager.parameters(pluginName);
	const scatterSwitch = Number(parameter['scatterSwitch']);
	const autoScatter = parameter['autoScatter'] === 'true';
	
	//PluginCommonBaseが適用されているか。
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	//MZかどうか。
	const useMZ = Utils.RPGMAKER_NAME === 'MZ';

	//-----------------------------------------------------------------------------
	// Game_Player

	//イベントの位置設定使用時にループ遠景がズレる問題を修正。
	/*
	const _Game_Player_center = Game_Player.prototype.center;
	Game_Player.prototype.center = function(x, y) {
		if(!this.isTransferring()) return;
		return _Game_Player_center.call(this, x, y); 
	};
	*/

	const _Game_Player_locate = Game_Player.prototype.locate;
	Game_Player.prototype.locate = function(x, y) {
		const lx = this.scrolledX();
		const ly = this.scrolledY();
		_Game_Player_locate.call(this, x, y);
		if(!this.isTransferring()) this.updateScroll(lx, ly);
	};

	//-----------------------------------------------------------------------------
	// Game_Vehicle
	//影を修正

	const _Game_Vehicle_shadowOpacity = Game_Vehicle.prototype.shadowOpacity;
	Game_Vehicle.prototype.shadowOpacity = function() {
		const altitude = this._altitude;
		if (this.isJumping()) {
			this._altitude += this.jumpHeight();
		}
		const value = _Game_Vehicle_shadowOpacity.call(this);
		this._altitude = altitude;
		return value;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Map

	const _Spriteset_Map_updateShadow = Spriteset_Map.prototype.updateShadow;
	Spriteset_Map.prototype.updateShadow = function() {
		_Spriteset_Map_updateShadow.call(this);
		const airship = $gameMap.airship();
		if (airship.isJumping()) {
			this._shadowSprite.y += Math.ceil(airship.jumpHeight());
		}
	};

	//-----------------------------------------------------------------------------
	// PluginManager

	//プラグインコマンドの定義（MZ）
	//replaceCharacter
	if (useMZ) {
		const _PluginManager = hasPluginCommonBase ? PluginManagerEx : PluginManager;
		const script = hasPluginCommonBase ? document.currentScript : pluginName;
		_PluginManager.registerCommand(script, "replaceCharacter", function(args) {
			this.setReplaceCharacters(args.characterId);
		});
	}
	//プラグインコマンドの定義（MZ）ここまで

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//プラグインコマンドの定義（MV）
	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === "replaceCharacter") this.setReplaceCharacters(args[0]);
	};
	//プラグインコマンドの定義（MV）ここまで

	//イベントID置き換え用の変数
	const _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
	Game_Interpreter.prototype.clear = function() {
		_Game_Interpreter_clear.call(this);
		this._replaceIdList = [];
	};
	//イベントIDをセット
	Game_Interpreter.prototype.setReplaceCharacters = function(characters) {
		this._replaceIdList = String(characters).split(',').map(Number);
		const index = this.findReplaceCommandIndex();
		this.setReplaceCharacterId(this._list[index]);
	};
	//イベントIDの置換
	Game_Interpreter.prototype.setReplaceCharacterId = function(command) {
		const code = command.code;
		const params = command.parameters
		const idList = this._replaceIdList;
		switch (code) {
		case 111://条件分岐
			if (params[0] === 6) {
				params[1] = idList[0];
			}
			break;
		case 203://イベントの位置設定
			if (params[1] === 2 && idList.length > 1) {
				params[2] = idList[1];
			}
		case 205://移動ルートの設定
		case 212://アニメーションの表示
		case 213://フキダシアイコンの表示
			params[0] = idList[0];
			break;
		case 117://コモンイベント
		case 123://セルフスイッチの操作
		case 214://イベントの一時消去
			if (idList[0] < 0) break;
		case 211://透明状態の変更
			command._replaceCharacterId = idList[0];
			break;
		default:
			break;
		}
		idList.length = 0;
	};
	//置換するコマンドを検索。見つかったら登録、無かったらこのコマンドのインデックスを登録。
	const replaceCode = new Set([111, 117, 123, 203, 205, 211, 212, 213, 214]);
	Game_Interpreter.prototype.findReplaceCommandIndex = function() {
		const scanEnd = this._list.length-1;
		let commandIndex = this._index;
		for (let i = this._index + 1; i <= scanEnd; i++) {
			const command = this._list[i];
			if (replaceCode.has(command.code)) {
				commandIndex = i;
				break;
			}
		}
		return commandIndex;
	};
	//置換するイベントIDの取得（一部のコマンドのみ）
	Game_Interpreter.prototype.replaceCharacterId = function() {
		return this.currentCommand()._replaceCharacterId;
	}
	
	//this.character()でフォロワーを取得可能に。
	const _Game_Interpreter_character = Game_Interpreter.prototype.character;
	Game_Interpreter.prototype.character = function(param) {
		if (param < -1) {
			return $gameParty.inBattle() ? null : otherCharacter(-param);
		}
		return _Game_Interpreter_character.call(this, param);
	};
	//フォロワーや乗り物を取得する
	function otherCharacter(param) {
		return param < 1000 ? $gamePlayer.followers()._data[param-2] : $gameMap.vehicle(param-1000);
	};
	
	/////////////////////////////////////////////////////////////////////////////
	//イベントコマンドの変更
	/////////////////////////////////////////////////////////////////////////////
	//標準のイベントコマンドを保存
	const _Game_Interpreter_command117 = Game_Interpreter.prototype.command117;//コモンイベント
	const _Game_Interpreter_command123 = Game_Interpreter.prototype.command123;//セルフスイッチの操作
	const _Game_Interpreter_command214 = Game_Interpreter.prototype.command214;//イベントの一時消去
	const _Game_Interpreter_command217 = Game_Interpreter.prototype.command217;//隊列メンバーの集合

	//コモンイベント
	Game_Interpreter.prototype.command117 = function(params) {
		const dafaultEventId = this._eventId;
		this._eventId = this.replaceCharacterId() || dafaultEventId;
		const result = _Game_Interpreter_command117.call(this, params);
		this._eventId = dafaultEventId;
		return result;
	};
	//セルフスイッチの操作
	Game_Interpreter.prototype.command123 = function(params) {
		const dafaultEventId = this._eventId;
		this._eventId = this.replaceCharacterId() || dafaultEventId;
		const result = _Game_Interpreter_command123.call(this, params);
		this._eventId = dafaultEventId;
		return result;
	};
	//透明状態の変更
	Game_Interpreter.prototype.command211 = function(params = this._params) {
		const replaceId = this.replaceCharacterId();
		const eventId = replaceId === 0 ? 0 : replaceId || -1;
		this.character(eventId).setTransparent(params[0] === 0);
		return true;
	};
	//イベントの一時消去
	Game_Interpreter.prototype.command214 = function() {
		const dafaultEventId = this._eventId;
		this._eventId = this.replaceCharacterId() || dafaultEventId;
		const result = _Game_Interpreter_command214.call(this);
		this._eventId = dafaultEventId;
		return result;
	};
	if (scatterSwitch) {
		//隊列メンバーの集合
		Game_Interpreter.prototype.command217 = function() {
			if (!$gameParty.inBattle()) {
				$gameSwitches.setValue(scatterSwitch, false);
			}
			return _Game_Interpreter_command217.call(this);
		};
	}

	//-----------------------------------------------------------------------------
	// Game_Followers
	if (scatterSwitch) {
		//隊列移動無効
		const _Game_Followers_updateMove = Game_Followers.prototype.updateMove;
		Game_Followers.prototype.updateMove = function() {
			if(!$gameSwitches.value(scatterSwitch)){
				_Game_Followers_updateMove.call(this);
			}
		};
		//ジャンプ禁止
		const _Game_Followers_jumpAll = Game_Followers.prototype.jumpAll;
		Game_Followers.prototype.jumpAll = function() {
			if (!$gameSwitches.value(scatterSwitch)) {
				_Game_Followers_jumpAll.call(this);
			}
		};
		//位置設定禁止
		const _Game_Followers_synchronize = Game_Followers.prototype.synchronize;
		Game_Followers.prototype.synchronize = function(x, y, d) {
			if (!$gameSwitches.value(scatterSwitch)) {
				_Game_Followers_synchronize.call(this, x, y, d);
			}
		};
	}

	//-----------------------------------------------------------------------------
	// Game_Follower

	if (scatterSwitch) {
		//同期禁止
		const _Game_Follower_update = Game_Follower.prototype.update;
		Game_Follower.prototype.update = function() {
			if($gameSwitches.value(scatterSwitch)){
				Game_Character.prototype.update.call(this);
			}else{
				_Game_Follower_update.call(this);
			}
		};
		if (autoScatter) {
			//移動ルート
			const _Game_Follower_forceMoveRoute = Game_Follower.prototype.forceMoveRoute;
			Game_Follower.prototype.forceMoveRoute = function(moveRoute) {
				$gameSwitches.setValue(scatterSwitch, true);
				_Game_Follower_forceMoveRoute.call(this, moveRoute);
			};
		}
	}
}