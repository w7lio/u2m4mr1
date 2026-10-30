// BalloonPlus.js Ver.1.2.0
// MIT License (C) 2023 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc フキダシアイコンに欲しい機能をまとめました。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/495844048.html
* @help 初期パラメータはRPGツクールDS+素材集 for MVのフキダシ用です。
* それ以外の素材を使用する方は、パラメータの説明を読みつつ調整してください。
*
* イベントコマンド［フキダシアイコンの表示］にもパラメータは反映されますが、
* 全機能を活用するためにはプラグインコマンドを使用する必要があります。
*
* [スクリプト（移動ルートの設定）]
* 【フキダシアイコンの表示】
* this.showBalloon(balloonId, wait, loop, noSe);
*
* balloonId：フキダシIDを入力します。
* びっくり：1　はてな：2　音符：3…とBalloon.pngの上から連番になります。
* wait：ウェイトするかをtrue/falseで入力します。未入力だとウェイトしません。
* loop：ループするかをtrue/falseで入力します。未入力だとパラメータ設定を使用。
* noSe：効果音を再生しないかをtrue/falseで入力します。未入力だとfalse。
*
* 【フキダシアイコンのオフセット】
* this.setBalloonOffsets(x, y);
*
* 【フキダシアイコンの消去】
* this.removeBalloon();
*
* (入力例)
* this.showBalloon(4); //ハートを表示する。
* this.showBalloon(4, true); //ハートを表示し、終わるまで待つ。
* this.showBalloon(1, false, true); //びっくりをループする。
* this.showBalloon(2, false, false, true); //効果音を出さずにはてなを表示する。
* this.setBalloonOffsets(0, -24); //フキダシのオフセットを0、-24にする。
* this.removeBalloon(); //消す。
*
* [注釈]
* イベントの実行内容一行目に注釈を配置し、以下の形式で入力すると反映されます。
* 【シンボルフキダシ】
* <symbolBalloon:balloonId,keep>
*
* balloonId：フキダシIDを入力します。
* keep：イベント起動後も表示し続けるかをtrue/falseで入力します。未入力だとfalse。
*
* 【フキダシアイコンのオフセット】
* <balloonOffsets:x,y>
*
* (入力例)
* <symbolBalloon:1> //イベントの頭上に常時びっくりを表示します。
* イベントが実行中の時のみ消えます。
* <symbolBalloon:2,true> //イベントの頭上に常時はてなを表示します。
* イベントが実行中の時も表示され続けます。
* <balloonOffsets:0,-24> //フキダシのオフセットを0、-24にする。
*
* [名前リスト]
* フキダシIDだと把握しづらい為、これをIDの代わりに入力できます。
*
* (入力例)
* this.showBalloon("ハート");
* this.showBalloon("ハート", true);
* this.showBalloon("びっくり", false, true);
* this.showBalloon("はてな", false, false, true);
* <symbolBalloon:びっくり>
* <symbolBalloon:はてな,true>
*
* [更新履歴]
* 2023/01/02：Ver.1.0.0　公開。
* 2023/01/25：Ver.1.0.1　プラグインコマンドのウェイトを修正。
* 2023/01/25：Ver.1.1.0　IDだけでなく、文字列でも呼び出し可能に。
* 2024/01/10：Ver.1.1.1　キャラクター個別のオフセットを設定可能に。
* 2024/04/17：Ver.1.1.2　一時消去したイベントにシンボルフキダシが表示されないよう修正。
* 2024/05/25：Ver.1.2.0　実行内容が一瞬で終わるイベントのシンボルフキダシが復活しない問題を修正。
*
* @param offsetX
* @text オフセットX
* @desc フキダシをずらす距離です。
* @type number
* @default 16
*
* @param offsetY
* @text オフセットY
* @desc フキダシをずらす距離です。
* @type number
* @default 0
*
* @param speed
* @text 速度
* @desc フキダシが次のコマに移行するまでの時間です。
* MZ標準は８。
* @type number
* @default 6
*
* @param waitTime
* @text ウェイト時間
* @desc フキダシ再生終了後の残留時間です。
* MZ標準は12。
* @type number
* @default 0
*
* @param muteSwitchId
* @text ミュートスイッチ
* @desc このスイッチがオンになっている間はフキダシの効果音を再生しません。
* 未指定だと常時再生します。
* @type switch
*
* @param balloonSettings
* @text バルーン設定
* @type struct<balloonSetting>[]
* @default ["{\"id\":\"1\",\"se\":\"{\\\"name\\\":\\\"Balloon11\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"2\",\"se\":\"{\\\"name\\\":\\\"Balloon2\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"3\",\"se\":\"{\\\"name\\\":\\\"Balloon6\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"4\",\"se\":\"{\\\"name\\\":\\\"Balloon6\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"5\",\"se\":\"{\\\"name\\\":\\\"Balloon1\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"6\",\"se\":\"{\\\"name\\\":\\\"Balloon5\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"7\",\"se\":\"{\\\"name\\\":\\\"Balloon10\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"9\",\"se\":\"{\\\"name\\\":\\\"Balloon4\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"10\",\"se\":\"{\\\"name\\\":\\\"Sleep\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"startIndex\":\"0\",\"numFrames\":\"8\",\"loopEnabled\":\"false\"}","{\"id\":\"11\",\"se\":\"{\\\"name\\\":\\\"Balloon11\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"8\",\"startIndex\":\"1\",\"numFrames\":\"4\",\"loopEnabled\":\"false\"}","{\"id\":\"12\",\"se\":\"\",\"offsetX\":\"0\",\"offsetY\":\"8\",\"startIndex\":\"1\",\"numFrames\":\"3\",\"loopEnabled\":\"true\"}","{\"id\":\"13\",\"se\":\"\",\"offsetX\":\"0\",\"offsetY\":\"8\",\"startIndex\":\"1\",\"numFrames\":\"4\",\"loopEnabled\":\"true\"}","{\"id\":\"14\",\"se\":\"\",\"offsetX\":\"0\",\"offsetY\":\"8\",\"startIndex\":\"1\",\"numFrames\":\"5\",\"loopEnabled\":\"true\"}","{\"id\":\"15\",\"se\":\"\",\"offsetX\":\"0\",\"offsetY\":\"8\",\"startIndex\":\"1\",\"numFrames\":\"5\",\"loopEnabled\":\"false\"}","{\"id\":\"16\",\"se\":\"{\\\"name\\\":\\\"Balloon8\\\",\\\"volume\\\":\\\"90\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"offsetX\":\"0\",\"offsetY\":\"8\",\"startIndex\":\"1\",\"numFrames\":\"4\",\"loopEnabled\":\"true\"}"]
*
* @param nameList
* @text 名前リスト
* @desc それぞれのフキダシIDに対応した名前を設定します。
* これをフキダシIDの代わりにする事も可能です。
* @type string[]
* @default ["びっくり","はてな","音符","ハート","怒り","汗","くしゃくしゃ","沈黙","電球","Zzz","びっくり２","笑い","怒り２","汗２","気づく","ショック"]
*
* @command showBalloon
* @text フキダシアイコンの表示
* @desc フキダシアイコンを表示します。

* @arg characterId
* @text キャラクターID
* @desc プレイヤー：-1　このイベント：0
* @default -1
*
* @arg balloonId
* @text フキダシID
* @desc びっくり：1　はてな：2　音符：3　ハート：4　怒り：5
* 汗：6　くしゃくしゃ：7　沈黙：8　電球：9　Zzz：10
* @default びっくり
* @type combo
* @option びっくり
* @option はてな
* @option 音符
* @option ハート
* @option 怒り
* @option 汗
* @option くしゃくしゃ
* @option 沈黙
* @option 電球
* @option Zzz
* @option びっくり２
* @option 笑い
* @option 怒り２
* @option 汗２
* @option 気づく
* @option ショック
*
* @arg loopEnabled
* @text ループ有効化
* @desc 止めるまで表示し続けます。
* 空欄ならパラメータ設定を使用します。
* @type boolean
*
* @arg noSe
* @text 効果音なし
* @desc パラメータで設定した効果音を再生しません。
* @type boolean
* @default false
*
* @arg wait
* @text 完了までウェイト
* @desc エフェクトが終了するまで待ちます。
* @type boolean
* @default false
*
* @command removeBalloon
* @text フキダシアイコンの消去
* @desc フキダシアイコンを消去します。

* @arg characterId
* @text キャラクターID
* @desc プレイヤー：-1　このイベント：0
* ReplaceTargetEvent.js導入時は隊列メンバーも指定可能です。
* @default -1
*
* @command setBalloonOffsets
* @text フキダシアイコンのオフセット
* @desc フキダシアイコンのオフセットを設定します。

* @arg characterId
* @text キャラクターID
* @desc プレイヤー：-1　このイベント：0
* ReplaceTargetEvent.js導入時は隊列メンバーも指定可能です。
* @default -1
*
* @arg offsetX
* @text オフセットX
* @desc フキダシをずらす距離です。
* @default 0
*
* @arg offsetY
* @text オフセットY
* @desc フキダシをずらす距離です。
* @default 0
*
*/

/*~struct~balloonSetting:
*
* @param id
* @text フキダシID
* @desc びっくり：1　はてな：2　音符：3　ハート：4　怒り：5
* 汗：6　くしゃくしゃ：7　沈黙：8　電球：9　Zzz：10
* @type number
* @default 1
* @min 1
*
* @param se
* @text 効果音
* @desc フキダシ表示時に鳴らす効果音です。
* シンボルでは鳴らしません。
* @type struct<audio>
*
* @param offsetX
* @text オフセットX
* @desc フキダシをずらす距離です。
* @type number
* @default 0
*
* @param offsetY
* @text オフセットY
* @desc フキダシをずらす距離です。
* @type number
* @default 0
*
* @param startIndex
* @text 開始インデックス
* @desc フキダシのアニメーション開始位置です。
* Balloon.pngの左端が0で右端が8です。
* @type number
* @default 0
* 
* @param numFrames
* @text コマ数
* @desc アニメーションに使われるコマ数です。
* @type number
* @default 8
*
* @param loopEnabled
* @text ループ有効化
* @desc 止めるまで表示し続けます。
* @type boolean
* @default false
*
*/

/*~struct~audio:
*
* @param name
* @text 名前
* @type file
* @dir audio/se
*
* @param volume
* @text 音量
* @type number
* @default 90
* @min 0
*
* @param pitch
* @text ピッチ
* @type number
* @default 100
*
* @param pan
* @text 位相
* @type number
* @default 0
* @min -100
*
*/

'use strict';
{
	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameters = PluginManager.parameters(pluginName);

	const considerScale = parameters["considerScale"] !== "false";
	const offsetX = Number(parameters["offsetX"]);
	const offsetY = Number(parameters["offsetY"]);
	const speed = Number(parameters["speed"]);
	const waitTime = Number(parameters["waitTime"]);
	const nameList = JSON.parse(parameters["nameList"] || "[]");
	const muteSwitchId = Number(parameters["muteSwitchId"] || 0);

	const balloonSettings = [];
	JSON.parse(parameters["balloonSettings"]).forEach(str => {
		const params = analyticsParameters(str);
		balloonSettings[params.id] = params;
	});

	function analyticsParameters(str) {
		const params = str ? JSON.parse(str) : {};
		for (const prop in params) {
			const param = params[prop];
			if (isFinite(param) || param === 'true' || param === 'false' || (typeof param === "string" && param.startsWith("{") && param.endsWith("}"))) {
				params[prop] = analyticsParameters(param);
			}
		}
		return params;
	}

	function findBalloonId(str) {
		const index = nameList.findIndex(n => n === str);
		if (index > -1) {
			return index + 1;
		}
		return Number(str);
	};

	//-----------------------------------------------------------------------------
	// _PluginManager

	const script = window.PluginManagerEx ? document.currentScript : pluginName; 
	const _PluginManager = window.PluginManagerEx || window.PluginManager;

	_PluginManager.registerCommand(script, "showBalloon", function(args) {
		this._characterId = +args.characterId;
		const character = this.character(this._characterId);
		if (character) {
			const balloonId = findBalloonId(args.balloonId);
			const loopEnabled = args.loopEnabled === "" ? null : String(args.loopEnabled) === "true";
			const noSe = String(args.noSe) === "true";
			character.showBalloon(balloonId, false, loopEnabled, noSe);
			if (String(args.wait) === "true") {
				this.setWaitMode("balloon");
			}
		}
	});

	_PluginManager.registerCommand(script, "removeBalloon", function(args) {
		const character = this.character(+args.characterId);
		if (character) {
			character.removeBalloon();
		}
	});

	_PluginManager.registerCommand(script, "setBalloonOffsets", function(args) {
		const character = this.character(+args.characterId);
		if (character) {
			character.setBalloonOffsets(+args.offsetX, +args.offsetY);
		}
	});

	//-----------------------------------------------------------------------------
	// Game_Temp

	const _Game_Temp_requestBalloon = Game_Temp.prototype.requestBalloon;
	Game_Temp.prototype.requestBalloon = function(target, balloonId) {
		_Game_Temp_requestBalloon.apply(this, arguments);
		const request = this._balloonQueue[this._balloonQueue.length - 1];
		if (target.setBalloonId) {
			target.setBalloonId(balloonId);
		}
		if (target.setLoopingBalloon) {
			const setting = balloonSettings[balloonId];
			const loopEnabled = !!setting && setting.loopEnabled;
			target.setLoopingBalloon(loopEnabled);
			request.loop = loopEnabled;
		}
	};

	Game_Temp.prototype.requestBalloonPlus = function(target, balloonId, loop = null, noSe) {
		Game_Temp.prototype.requestBalloon.call(this, target, balloonId);
		const request = this._balloonQueue[this._balloonQueue.length - 1];
		request.noSe = noSe;
		if (loop !== null && target.setLoopingBalloon) {
			target.setLoopingBalloon(loop);
			request.loop = loop;
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase

	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._balloonId = 0;
		this._loopingBalloon = false;
		this._balloonOffsetX = 0;
		this._balloonOffsetY = 0;
	};

	Game_CharacterBase.prototype.setBalloonId = function(balloonId) {
		this._balloonId = balloonId;
	};

	Game_CharacterBase.prototype.balloonId = function() {
		return this._balloonId;
	};

	Game_CharacterBase.prototype.setLoopingBalloon = function(loop) {
		this._loopingBalloon = loop;
	};

	Game_CharacterBase.prototype.loopingBalloon = function() {
		return this._loopingBalloon;
	};

	Game_CharacterBase.prototype.setBalloonOffsets = function(x, y) {
		this._balloonOffsetX = x;
		this._balloonOffsetY = y;
	};

	Game_CharacterBase.prototype.balloonOffsetX = function() {
		return this._balloonOffsetX;
	};

	Game_CharacterBase.prototype.balloonOffsetY = function() {
		return this._balloonOffsetY;
	};

	Game_CharacterBase.prototype.showBalloon = function(balloonId, wait, loop = null, noSe) {
		balloonId = findBalloonId(balloonId);
		$gameTemp.requestBalloonPlus(this, balloonId, loop, noSe);
		if (wait) {
			const setting = balloonSettings[balloonId] || {};
			const numFrames = setting.numFrames ?? 8;
			this._waitCount = numFrames * speed + waitTime;
		}
	};

	Game_CharacterBase.prototype.removeBalloon = function() {
		$gameTemp.requestBalloon(this, 0);
	};

	//-----------------------------------------------------------------------------
	// Game_Event

	const _Game_Event_initMembers = Game_Event.prototype.initMembers;
	Game_Event.prototype.initMembers = function() {
		_Game_Event_initMembers.call(this);
		this._symbolBalloonId = 0;
	};

	Game_Event.prototype.setSymbolBalloonId = function(balloonId) {
		this._symbolBalloonId = balloonId;
	};

	Game_Event.prototype.symbolBalloonId = function() {
		return this._symbolBalloonId;
	};

	const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
	Game_Event.prototype.clearPageSettings = function() {
		_Game_Event_clearPageSettings.call(this);
		this.setSymbolBalloonId(0);
		this.removeBalloon();
	};

	const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		_Game_Event_setupPageSettings.call(this);
		this.setupSettingsBalloonPlus();
	};

	Game_Event.prototype.setupSettingsBalloonPlus = function() {
		const page = this.page();
		const lastBalloonId = this.symbolBalloonId();
		const balloonId = page.symbolBalloonId;
		if (!this._locked && balloonId !== lastBalloonId) {
			this.showBalloon(balloonId, false, balloonId > 0, true);
		}
		this.setSymbolBalloonId(balloonId);
		this.setBalloonOffsets(page.balloonOffsetX || 0, page.balloonOffsetY || 0);
	};

	const _Game_Event_lock = Game_Event.prototype.lock;
	Game_Event.prototype.lock = function() {
		const page = this.page();
		const balloonId = this.symbolBalloonId();
		if (!this._locked && balloonId > 0 && !page.symbolBalloonKeeping) {
			this.removeBalloon();
		}
		_Game_Event_lock.call(this);
	};

	const _Game_Event_unlock = Game_Event.prototype.unlock;
	Game_Event.prototype.unlock = function() {
		const balloonId = this.symbolBalloonId();
		if (this._locked && balloonId > 0 && (this.balloonId() !== balloonId || !this.loopingBalloon())) {
			this.showBalloon(balloonId, false, true, true);
		}
		_Game_Event_unlock.call(this);
	};

	//-----------------------------------------------------------------------------
	// Sprite_Character

	const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
	Sprite_Character.prototype.initialize = function(character) {
		_Sprite_Character_initialize.call(this, character);
		this.restoreBalloon();
	};

	Sprite_Character.prototype.restoreBalloon = function() {
		const character = this._character;
		const balloonId = character.balloonId ? character.balloonId() : 0;
		const loopEnabled = character.loopingBalloon && character.loopingBalloon();
		if (balloonId > 0 && character.showBalloon) {
			character.showBalloon(balloonId, false, loopEnabled, true);
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_Balloon

	const _Sprite_Balloon_initMembers = Sprite_Balloon.prototype.initMembers;
	Sprite_Balloon.prototype.initMembers = function() {
		_Sprite_Balloon_initMembers.call(this);
		this._offsetX = 0;
		this._offsetY = 0;
		this._startIndex = 0;
		this._numFrames = 0;
		this._loopEnabled = false;
		this._request = null;
	}

	const _Sprite_Balloon_setup = Sprite_Balloon.prototype.setup;
	Sprite_Balloon.prototype.setup = function(targetSprite, balloonId) {
		_Sprite_Balloon_setup.apply(this, arguments);
		this._offsetX = 0;
		this._offsetY = 0;
		this._startIndex = 0;
		this._numFrames = 8;
		this._loopEnabled = false;
		this._request = null;
	};

	Sprite_Balloon.prototype.setupBalloonPlus = function(request) {
		const targetSprite = this._target;
		const balloonId = this._balloonId;
		const targetObject = this.targetObject;
		const setting = balloonSettings[balloonId] || {};
		const seParam = setting.se;
		this._request = request;
		this._offsetX = offsetX;
		this._offsetY = offsetY;
		this._offsetX += setting.offsetX ?? 0;
		this._offsetY += setting.offsetY ?? 0;
		this._startIndex = setting.startIndex ?? 0;
		this._numFrames = setting.numFrames ?? 8;
		this._loopEnabled = request.loop;
		if (!request.noSe && !$gameSwitches.value(muteSwitchId) && seParam) {
			AudioManager.playSe(seParam);
		}
		this.resetDuration();
	};

	Sprite_Balloon.prototype.resetDuration = function() {
		if (this._balloonId === 0) {
			this._duration = 0;
		} else {
			this._duration = this.numFrames() * this.speed() + this.waitTime();
		}
	};

	const _Sprite_Balloon_update = Sprite_Balloon.prototype.update;
	Sprite_Balloon.prototype.update = function() {
		_Sprite_Balloon_update.call(this);
		if (this.loopEnabled() && this._duration === this.waitTime()) {
			this.resetDuration();
			this.update();
		}
	};

	Sprite_Balloon.prototype.frameIndex = function() {
		const index = (this._duration - this.waitTime()) / this.speed();
		return (this.numFrames() - 1) - Math.max(Math.floor(index), 0) + this.startIndex();
	};

	Sprite_Balloon.prototype.startIndex = function() {
		return this._startIndex;
	};

	Sprite_Balloon.prototype.numFrames = function() {
		return this._numFrames;
	};

	Sprite_Balloon.prototype.loopEnabled = function() {
		return this._loopEnabled;
	};

	Sprite_Balloon.prototype.speed = function() {
		return speed;
	};

	Sprite_Balloon.prototype.waitTime = function() {
		return waitTime;
	};

	const _Sprite_Balloon_updatePosition = Sprite_Balloon.prototype.updatePosition;
	Sprite_Balloon.prototype.updatePosition = function() {
		_Sprite_Balloon_updatePosition.call(this);
		this.x += this._offsetX;
		this.y += this._offsetY;
		const character = this._target._character;
		if (character) {
			if (character.balloonOffsetX) {
				this.x += character.balloonOffsetX();
			}
			if (character.balloonOffsetY) {
				this.y += character.balloonOffsetY();
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Map

	let destroy = false;
	const _Spriteset_Map_destroy = Spriteset_Map.prototype.destroy;
	Spriteset_Map.prototype.destroy = function(options) {
		destroy = true;
		_Spriteset_Map_destroy.call(this, options);
		destroy = false;
	};

	const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
	Spriteset_Map.prototype.initialize = function() {
		_Spriteset_Map_initialize.call(this);
		this.updateBalloons();
	};

	const _Spriteset_Map_createBalloon = Spriteset_Map.prototype.createBalloon;
	Spriteset_Map.prototype.createBalloon = function(request) {
		const targetObject = request.target;
		const targetSprite = this.findTargetSprite(targetObject);
		//既存のスプライトを削除
		let sprite = targetSprite && this._balloonSprites.find(sprite => sprite && sprite._target === targetSprite);
		if (sprite) {
			this.removeBalloon(sprite);
		}
		//スプライトを新規作成
		_Spriteset_Map_createBalloon.call(this, request);
		sprite = targetSprite && this._balloonSprites.find(sprite => sprite && sprite._target === targetSprite);
		if (sprite && sprite.setupBalloonPlus) {
			//新規作成したスプライトの初期設定
			sprite.setupBalloonPlus(request);
			//改めて再設定
			if (targetObject && targetObject.setLoopingBalloon) {
				targetObject.setLoopingBalloon(request.loop || false);
				targetObject.setBalloonId(request.balloonId || 0);
				targetObject.startBalloon();
			}
		}
	};

	const _Spriteset_Map_removeBalloon = Spriteset_Map.prototype.removeBalloon;
	Spriteset_Map.prototype.removeBalloon = function(sprite) {
		_Spriteset_Map_removeBalloon.call(this, sprite);
		const targetObject = sprite.targetObject;
		//マップ破棄以外で削除された場合はループ設定を解除する。
		if (!destroy) {
			if (targetObject.setLoopingBalloon) {
				targetObject.setLoopingBalloon(false);
			}
		}
		if (targetObject.setBalloonId && !targetObject.loopingBalloon()) {
			targetObject.setBalloonId(0);
		}
	};

	//-----------------------------------------------------------------------------
	// DataManager

	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this, object);
		if (this.isMapObject(object) && Array.isArray(object.events)) {
			for (const event of object.events) {
				if (event && event.pages){
					extractMetadata(event);
				}
			}
		}
	};

	function extractMetadata(data) {
		for (const page of data.pages) {
			const comment = findComment(page);
			const commentData = {"note": comment};
			DataManager.extractMetadata(commentData);
			addPageSettings(page, commentData.meta);
		}
	}

	function findComment(page) {
		const list = page.list;
		if (!list[0] && list[0].code !== 108) {
			return "";
		}
		let comment = list[0].parameters[0];
		for (let i = 1; list[i] && list[i].code === 408; i++) {
			comment += list[i].parameters[0];
		}
		return comment;
	}

	function addPageSettings(page, meta) {
		const symbolBalloon = (meta['symbolBalloon'] || "").split(",");
		page.symbolBalloonId = findBalloonId(symbolBalloon[0] || 0);
		page.symbolBalloonKeeping = symbolBalloon[1] === 'true';
		const offsets = (meta['balloonOffsets'] || "").split(",");
		page.balloonOffsetX = Number(offsets[0] || 0);
		page.balloonOffsetY = Number(offsets[1] || 0);
	}

}