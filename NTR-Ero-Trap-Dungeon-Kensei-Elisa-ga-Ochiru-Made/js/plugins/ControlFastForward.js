// ControlFastForward.js Ver.1.1.0
// MIT License (C) 2023 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @orderBefore DevToolsManage
* @plugindesc Controls fast forwarding.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/501896630.html
* @help Ver.1.1.0
* This plugin disables the long press to cancel on some choices.
* Also, fast forwarding can be prohibited for each type using a plugin command.
*
* parameter [Unique Message Wait Disable]:
* A more versatile message wait disable that can be used for more than just maps is now available.
*
* @param allowLongPress
* @text Allow Long Press
* @desc If fast forwarding is disabled, long presses will not cause page breaks in messages.
* @type boolean
* @default false
*
* @command disableFastForward
* @text Disable Fast Forward
*
* @arg type
* @text Type
* @option Map
* @value map
* @option Message
* @value message
* @option Battle
* @value battle
* @default map
* @type select
*
* @command enableFastForward
* @text Enable Fast Forward
*
* @arg type
* @text Type
* @option Map
* @value map
* @option Message
* @value message
* @option Battle
* @value battle
* @default map
* @type select
*
* @param disableMessageWaitDisable
* @text Disable Message Wait Disable
* @desc Disable message wait disable in v1.8.0.
* @type boolean
* @default true
*
* @param uniqueMessageWaitDisable
* @text Unique Message Wait Disable
* @desc Do not use v1.8.0's crude message wait disable and apply a more reasonable message wait disable.
* @type boolean
* @default false
*
*/

/*:ja
* @target MZ
* @orderBefore DevToolsManage
* @plugindesc 早送りを制御します。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/501896630.html
* @help このプラグインは一部選択肢でのキャンセル長押しを無効化します。
* また、プラグインコマンドで早送りを種類ごとに禁止できます。
*
* パラメータ［独自のメッセージウェイト無効化］：
* マップ以外でも使える、より汎用性の高いメッセージウェイトのスキップが使用可能になります。
*
* [更新履歴]
* 2023/12/28：Ver.1.0.0　公開。
* 2024/01/17：Ver.1.1.0　v1.8.0対応。
*
* @command disableFastForward
* @text 早送り無効化
*
* @arg type
* @text 種類
* @option マップ
* @value map
* @option メッセージ
* @value message
* @option 戦闘
* @value battle
* @default map
* @type select
*
* @command enableFastForward
* @text 早送り有効化
*
* @arg type
* @text 種類
* @option マップ
* @value map
* @option メッセージ
* @value message
* @option 戦闘
* @value battle
* @default map
* @type select
*
* @param allowLongPress
* @text 長押しを許可
* @desc 早送り無効化中でも長押し時に文章の改ページを行います。
* @type boolean
* @default false
*
* @param disableMessageWaitDisable
* @text メッセージウェイトの無効化を無効化
* @desc v1.8.0のメッセージウェイトの無効化を無効化します。
* @type boolean
* @default true
*
* @param uniqueMessageWaitDisable
* @text 独自のメッセージウェイト無効化
* @desc v1.8.0の雑なメッセージウェイト無効化を使用せず、より合理的な文章ウェイト無効化を適用します。
* @type boolean
* @default false
*
*/

'use strict';
{
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameters = PluginManager.parameters(pluginName);
	const longPressAllowed = parameters.allowLongPress === "true";
	const uniqueMessageWaitDisable = parameters.uniqueMessageWaitDisable === "true";
	const disableMessageWaitDisable = uniqueMessageWaitDisable || (parameters.disableMessageWaitDisable === "true");

	//-----------------------------------------------------------------------------
	// PluginManager

	PluginManager.registerCommand(pluginName, "disableFastForward", function(args) {
		$gameSystem.disableFastForward(args.type);
	});

	PluginManager.registerCommand(pluginName, "enableFastForward", function(args) {
		$gameSystem.enableFastForward(args.type);
	});

	//-----------------------------------------------------------------------------
	// Game_System

	const _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this._mapFastForwardDisabled = false;
		this._messageFastForwardDisabled = false;
		this._battleFastForwardDisabled = false;
	};

	Game_System.prototype.enableFastForward = function(type) {
		this[`_${type}FastForwardDisabled`] = false;
	};

	Game_System.prototype.disableFastForward = function(type) {
		this[`_${type}FastForwardDisabled`] = true;
	};

	//-----------------------------------------------------------------------------
	// Scene_Message

	const _Scene_Message_cancelMessageWait = Scene_Message.prototype.cancelMessageWait;
	Scene_Message.prototype.cancelMessageWait = function() {
		if (!$gameSystem._messageFastForwardDisabled) {
			_Scene_Message_cancelMessageWait.call(this);
		}
	};

	if (disableMessageWaitDisable) {
		Scene_Message.prototype.cancelMessageWait = function() {};
	}

	//-----------------------------------------------------------------------------
	// Scene_Map

	const _Scene_Map_isFastForward = Scene_Map.prototype.isFastForward;
	Scene_Map.prototype.isFastForward = function() {
		return !$gameSystem._mapFastForwardDisabled && _Scene_Map_isFastForward.call(this);
	};

	//-----------------------------------------------------------------------------
	// Window_Selectable

	Window_Selectable.prototype.isCancelTriggered = function() {
		return this._canRepeat ? Input.isRepeated("cancel") : Input.isTriggered("cancel");
	};

	//-----------------------------------------------------------------------------
	// Window_Message

	if (uniqueMessageWaitDisable) {
		const _Window_Message_updateWait = Window_Message.prototype.updateWait;
		Window_Message.prototype.updateWait = function() {
			this.updateSkipWait();
			return _Window_Message_updateWait.call(this);
		};

		Window_Message.prototype.updateSkipWait = function() {
			if (this._textState && !this.pause) {
				this.updateShowFast();
				if (this._showFast) {
					this._waitCount = 0;
				}
			}
		};
	}

	if (!longPressAllowed) {
		const _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
		Window_Message.prototype.isTriggered = function() {
			if (!$gameSystem._messageFastForwardDisabled) return _Window_Message_isTriggered.call(this);
			return Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered();
		};
	}

	const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
	Window_Message.prototype.updateShowFast = function() {
		if (!$gameSystem._messageFastForwardDisabled) _Window_Message_updateShowFast.call(this);
	};

	//-----------------------------------------------------------------------------
	// Window_BattleLog

	const _Window_BattleLog_isFastForward = Window_BattleLog.prototype.isFastForward;
	Window_BattleLog.prototype.isFastForward = function() {
		return !$gameSystem._battleFastForwardDisabled && _Window_BattleLog_isFastForward.call(this);
	};
}