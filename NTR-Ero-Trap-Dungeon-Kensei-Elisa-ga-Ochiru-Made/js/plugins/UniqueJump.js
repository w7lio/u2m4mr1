// UniqueJump.js Ver.1.0.2
// MIT License (C) 2024 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @orderAfter PriorityFix
* @orderAfter OverpassTile
* @orderBefore AWY_MotionMaker
* @plugindesc 自由に動ける独自のジャンプを使用可能にします。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/502381176.html
* @help 
* 【基本】
* this.jump(距離X, 距離Y)     //ジャンプ（コアスクリプト）
* this.setThrough(真偽値)     //すり抜け（コアスクリプト）
* this.uniqueJump(頂点, 時間) //独自ジャンプ
* this.uniqueJump(頂点)
* this.uniqueJump()
* 頂点：未入力で50
* 時間：未入力で(頂点*2)^0.5 * 2
* 真偽値：trueまたはfalse
*
* 【昇降】
* this.uniqueLift(高さ)       //高さを指定
* this.uniqueLift(高さ, 時間) //フレーム数を指定して移動
* this.uniqueLift(高さ, -1)   //ジャンプの残り時間で移動
* this.uniqueLift(高さ, -2)   //独自ジャンプの残り時間で移動
* this.updateOverPathOnLocate() //強制的に立体交差の上に上げる（OverpassTile）
* this._higher = false;       //強制的に立体交差から降ろす（OverpassTile）
*
* 【データ取得】
* this.isJumping()           //ジャンプ中か（コアスクリプト）
* this.isThrough()           //すり抜け中か
* this.direction()           //現在の向き（コアスクリプト）
* this.canPass(X座標, Y座標, 向き) //その座標からその方向に移動可能か（コアスクリプト）
* [2,4,6,8].every(d=>!this.canPass(this.x, this.y, d)) //現座標は全方向移動不可能か
* this.isUniqueJumping()     //独自ジャンプ中か
* this.isUniqueLifting()     //高さ変化中か
* this.uniqueJumpHeight()    //現在のジャンプ高さ
* this.uniqueJumpLastSpeed() //最新のフレーム毎上昇速度（下降はマイナスで表現）
* this.uniqueLiftHeight()    //現在の高さ
* this.isHigherPriority()    //立体交差上にいるか（OverpassTile）
* $gamePlayer.canMove()      //プレイヤーが操作可能な状態か
* $gamePlayer.isTouchMoveSucceeded() //タッチ移動に成功したか
* TouchInput.isTriggered()   //タッチをトリガーしたか。
* 向き：テンキーの矢印の数字に対応。
* ※canPassはすり抜けているか否かで結果が変わるので扱いには注意。
*
* 移動コマンドで使う場合はそのまま、
* イベントコマンドで使う場合はthisを$gamePlayer、
* もしくはthis.character(キャラクターID)に置き換えて使ってください。
*
* [更新履歴]
* 2024/02/16：Ver.1.0.0　公開。
* 2024/02/17：Ver.1.0.1　OverpassTileが無くても動くように修正。
* 2024/02/17：Ver.1.0.2　茂み深さを高さに応じて変化するように修正。
*
* @command uniqueJump
* @text 独自ジャンプ
* @desc 移動の拘束されないジャンプです。
* @arg characterId
* @text キャラクターID
* @desc このイベント：0 プレイヤー：-1
* @default -1
* @arg peak
* @text 頂点
* @desc ジャンプの最高到達点です。
* @default 50
* @arg count
* @text 時間
* @desc 滞空時間です。0で自動算出。
* (時間) = (頂点*2)^0.5 * 2
* @default 0
* @arg wait
* @text 完了までウェイト
* @desc 完了するまで待ちます。
* @type boolean
* @default false
*
* @command uniqueLift
* @text 昇降
* @desc 高さを滑らかに変更します。
* @arg characterId
* @text キャラクターID
* @desc このイベント：0 プレイヤー：-1
* @default -1
* @arg height
* @text 高さ
* @desc 目標の高さです。
* @default 0
* @arg count
* @text 時間
* @desc 移動時間です。
* 瞬時に反映：0 ジャンプの時間：-1 独自ジャンプの時間：-2
* @default 0
* @arg wait
* @text 完了までウェイト
* @desc 完了するまで待ちます。
* @type boolean
* @default false
*
*/

'use strict';
{
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameters = PluginManager.parameters(pluginName);
	const useShadow = parameters.useShadow === "true";

	PluginManager.registerCommand(pluginName, "uniqueJump", function(args) {
		const character = this.character(+args.characterId);
		if (character) {
			character.uniqueJump(+args.peak, +args.count);
			if (args.wait === "true") {
				this.wait(character._uniqueJumpCount);
			}
		}
	});

	PluginManager.registerCommand(pluginName, "uniqueLift", function(args) {
		const character = this.character(+args.characterId);
		if (character) {
			character.uniqueLift(+args.height, +args.count);
			if (args.wait === "true") {
				this.wait(character._uniqueLiftCount);
			}
		}
	});

	if (window.PluginManagerEx) {
		PluginManagerEx.registerCommand(document.currentScript, "uniqueJump", function(args) {
			const character = this.character(args.characterId);
			if (character) {
				character.uniqueJump(args.peak, args.count);
				if (args.wait) {
					this.wait(character._uniqueJumpCount);
				}
			}
		});

		PluginManagerEx.registerCommand(document.currentScript, "uniqueLift", function(args) {
			const character = this.character(args.characterId);
			if (character) {
				character.uniqueLift(args.height, args.count);
				if (args.wait) {
					this.wait(character._uniqueLiftCount);
				}
			}
		});
	}

	//-----------------------------------------------------------------------------
	// Game_CharacterBase

	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._uniqueJumpPeak = 0;
		this._uniqueJumpCount = 0;
		this._uniqueJumpWholeCount = 0;
		this._uniqueJumpLastSpeed = 0;
		this._uniqueJumpHeight = 0;
		this._uniqueLiftHeight = 0;
		this._uniqueLiftTargetHeight = 0;
		this._uniqueLiftCount = 0;
	};

	Game_CharacterBase.prototype.isUniqueJumping = function() {
		return this._uniqueJumpCount > 0;
	};

	Game_CharacterBase.prototype.uniqueJumpHeight = function() {
		return this._uniqueJumpHeight;
	};

	Game_CharacterBase.prototype.uniqueJumpLastSpeed = function() {
		return this._uniqueJumpLastSpeed;
	};

	Game_CharacterBase.prototype.isUniqueLifting = function() {
		return this._uniqueLiftCount > 0;
	};

	Game_CharacterBase.prototype.uniqueLiftHeight = function() {
		return this._uniqueLiftHeight || 0;
	};

	Game_CharacterBase.prototype.uniqueJump = function(peak, count) {
		this._uniqueJumpLastSpeed = 0;
		this._uniqueJumpHeight = 0;
		this._uniqueJumpPeak = peak ?? 50;
		this._uniqueJumpCount = this._uniqueJumpWholeCount = Math.floor(count || Math.pow(this._uniqueJumpPeak*2, 0.5)*2);
	};

	Game_CharacterBase.prototype.uniqueLift = function(height, count) {
		switch (count){
		case -1:
			count = this._jumpCount;
			break;
		case -2:
			count = this._uniqueJumpCount;
			break;
		default:
			count = count || 0;
		}
		this._uniqueLiftTargetHeight = height;
		this._uniqueLiftCount = count;
		if (count === 0) {
			this._uniqueLiftHeight = height;
		}
	};

	const _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function() {
		_Game_CharacterBase_update.call(this);
		if (this.isUniqueJumping()) {
			this.updateUniqueJump();
		}
		if (this.isUniqueLifting()) {
			this.updateUniqueLift();
		}
	};

	Game_CharacterBase.prototype.updateUniqueJump = function() {
		const lastHeight = this._uniqueJumpHeight;
		this._uniqueJumpCount--;
		this._uniqueJumpHeight = this.calcUniqueJumpHeight();
		this._uniqueJumpLastSpeed = this._uniqueJumpHeight - lastHeight;
	};

	Game_CharacterBase.prototype.calcUniqueJumpHeight = function() {
		const baseHeight = (
			(100 -
				Math.pow(Math.abs(20 * this._uniqueJumpCount / this._uniqueJumpWholeCount - 10), 2)) /
			2
		);
		return baseHeight * this._uniqueJumpPeak / 50;
	};

	Game_CharacterBase.prototype.updateUniqueLift = function() {
		this._uniqueLiftCount--;
		this._uniqueLiftHeight =
		(this._uniqueLiftHeight * this._uniqueLiftCount + this._uniqueLiftTargetHeight) / (this._uniqueLiftCount + 1.0);
		if (this._uniqueLiftCount === 0) {
			this._uniqueLiftHeight = this._uniqueLiftTargetHeight;
		}
	};

	const _Game_CharacterBase_isOnLadder = Game_CharacterBase.prototype.isOnLadder;
	Game_CharacterBase.prototype.isOnLadder = function() {
		return !this.isUniqueJumping() && _Game_CharacterBase_isOnLadder.call(this);
	};

	const _Game_CharacterBase_bushDepth = Game_CharacterBase.prototype.bushDepth;
	Game_CharacterBase.prototype.bushDepth = function() {
		let bushDepth = _Game_CharacterBase_bushDepth.call(this) - this.uniqueLiftHeight();
		if (this.isUniqueJumping()) {
			bushDepth -= this.uniqueJumpHeight();
		}
		return bushDepth;
	};

	const _Game_CharacterBase_isHigherPriority = Game_CharacterBase.prototype.isHigherPriority;
	if (_Game_CharacterBase_isHigherPriority) {
		const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
		Game_CharacterBase.prototype.initMembers = function() {
			_Game_CharacterBase_initMembers.call(this);
			this._wasHigher = false;
		};
		Game_CharacterBase.prototype.isHigherPriority = function() {
			return _Game_CharacterBase_isHigherPriority.call(this) || this._wasHigher;
		};
		const _Game_CharacterBase_uniqueJump = Game_CharacterBase.prototype.uniqueJump;
		Game_CharacterBase.prototype.uniqueJump = function(peak, count) {
			this._wasHigher = false;
			this._wasHigher = this.isHigherPriority();
			_Game_CharacterBase_uniqueJump.call(this, peak, count);
		};
		const _Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
		Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
			this._wasHigher = false;
			this._wasHigher = this.isHigherPriority();
			_Game_CharacterBase_jump.call(this, xPlus, yPlus);
		};
		const _Game_CharacterBase_updateUniqueJump = Game_CharacterBase.prototype.updateUniqueJump;
		Game_CharacterBase.prototype.updateUniqueJump = function() {
			_Game_CharacterBase_updateUniqueJump.call(this);
			if (this._uniqueJumpCount === 0) {
				if (this._wasHigher) {
					this.updateOverPathOnLocate();
				}
				this._wasHigher = false;
			}
		};
		const _Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
		Game_CharacterBase.prototype.updateJump = function() {
			_Game_CharacterBase_updateJump.call(this);
			if (this._jumpCount === 0) {
				if (this._wasHigher) {
					this.updateOverPathOnLocate();
				}
				this._wasHigher = false;
			}
		};
	}

	//-----------------------------------------------------------------------------
	// Game_Player

	const _Game_Player_initMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
		_Game_Player_initMembers.call(this);
		this._touchMoveSucceeded = true;
	};

	//タッチ移動に成功したか
	Game_Player.prototype.isTouchMoveSucceeded = function() {
		return this._touchMoveSucceeded
	};

	Game_CharacterBase.prototype.setTouchMoveSuccess = function(success) {
		this._touchMoveSucceeded = success;
	};

	//イベント起動時以外に判定
	const _Game_Player_executeMove = Game_Player.prototype.executeMove;
	Game_Player.prototype.executeMove = function(direction) {
		_Game_Player_executeMove.call(this, direction);
		this.setTouchMoveSuccess(this.isMovementSucceeded());
	};

	//-----------------------------------------------------------------------------
	// Window_Message

	//会話終了直後の暴発阻止
	const _Window_Message_updateInput = Window_Message.prototype.updateInput;
	Window_Message.prototype.updateInput = function() {
		const needsUpdate = !this.isAnySubWindowActive() && this.pause && this.isTriggered();
		const result = _Window_Message_updateInput.call(this);
		if (needsUpdate) {
			TouchInput.update();
		}
		return result;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Character

	const _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
	Sprite_Character.prototype.updatePosition = function() {
		_Sprite_Character_updatePosition.call(this);
		if (this._character.isUniqueJumping()) {
			this.y -= this._character.uniqueJumpHeight();
		}
		this.y -= this._character.uniqueLiftHeight();
	};

	//PriorityFix
	const _Sprite_Character_jumpHeight = Sprite_Character.prototype.jumpHeight;
	Sprite_Character.prototype.jumpHeight = function() {
		let y = _Sprite_Character_jumpHeight.call(this);
		if (this._character.isUniqueJumping()) {
			y += this._character.uniqueJumpHeight();
		}
		y += this._character.uniqueLiftHeight();
		return y;
	};
}