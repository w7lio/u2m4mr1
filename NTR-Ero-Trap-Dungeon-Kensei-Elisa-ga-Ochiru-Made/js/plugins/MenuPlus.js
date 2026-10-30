// MenuPlus.js Ver.1.4.0
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc Spice up your menu a bit.
* @orderAfter FesCursor
* @orderAfter SelectableWindow
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/491067894.html
* @help Ver.1.4.0
*
* @param slideIn
* @text Slide In
* @desc Slide in at menu start.
* @default true
* @type boolean
*
* @param disableBlur
* @text Disable Blur
* @desc Remove blur from the menu background.
* @default true
* @type boolean
*
* @param facePadding
* @text Face Padding
* @desc Move the position of the face.
* @default 0
* @type number
*
* @param fesFormation
* @text Fes Style Formation
* @desc Makes the sorting of party members fes style.
* @default {"enabled":"true","pendingCursor":"false"}
* @type struct<fesFormation>
*
* @param iconTable
* @text Icon Table
* @desc Enter the ID of the icon to be displayed to the left of the command.
* @type struct<iconTable>
* @default {"enabled":"true","item":"208","skill":"76","equip":"137","status":"77","formation":"75","options":"242","save":"297","gameEnd":"229"}
*
* @param goldIcon
* @text Gold Icon
* @desc Enter the ID of the icon displayed on the left of the money window.
* @default 0
*
*/

/*:ja
* @target MZ
* @plugindesc メニューを若干豪華にします。
* @orderAfter FesCursor
* @orderAfter SelectableWindow
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/491067894.html
* @help 
*
* [更新履歴]
* 2022/08/28：Ver.1.0.0　公開。
* 2022/09/02：Ver.1.1.0　競合対策のパラメータ追加。
* 2022/09/30：Ver.1.1.1　シーン切り替え時にウィンドウが画面内で止まる不具合を修正。
* 2023/02/15：Ver.1.2.0　顔パディング機能を追加。
* 2023/04/03：Ver.1.2.1　ぼかし無効化有効時、メニュー以外からゲーム終了コマンドに遷移したときにフリーズするバグを修正。
* 2023/04/05：Ver.1.2.2　ぼかし無効化が適用されない不具合を修正。
* 2023/07/26：Ver.1.3.0　メニュー拡張系プラグインに対応。
* 2023/08/03：Ver.1.3.1　競合対策。
* 2023/12/27：Ver.1.3.2　スライドイン方向の選定基準を修正。
* 2024/08/24：Ver.1.3.3　競合対策。
* 2024/09/09：Ver.1.4.0　競合対策。
*
* @param slideIn
* @text スライドイン
* @desc メニュー開始時にスライドインします。
* @default true
* @type boolean
*
* @param disableBlur
* @text ぼかし無効化
* @desc メニュー背景のぼかしを消します。
* @default true
* @type boolean
*
* @param facePadding
* @text 顔パディング
* @desc 顔の位置をずらします。
* @default 0
* @type number
*
* @param fesFormation
* @text フェス形式の並べ替え
* @desc パーティメンバーの並べ替えをフェス風にします。
* @default {"enabled":"true","pendingCursor":"false"}
* @type struct<fesFormation>
*
* @param iconTable
* @text アイコン対応表
* @desc コマンドの左に表示するアイコンのIDを入力します。
* @type struct<iconTable>
* @default {"enabled":"true","item":"208","skill":"76","equip":"137","status":"77","formation":"75","options":"242","save":"297","gameEnd":"229"}
*
* @param goldIcon
* @text 所持金アイコン
* @desc 所持金ウィンドウの左に表示するアイコンのIDを入力します。
* @default 0
*
*/

/*~struct~fesFormation:
*
* @param enabled
* @text Enable
* @desc Allow fes style sorting.
* @type boolean
* @default true
*
* @param pendingCursor
* @text Show Pending Cursor
* @desc Highlights selected actors while sorting.
* If there is a conflict, please enable it.
* @type boolean
* @default false
*
*/

/*~struct~fesFormation:ja
*
* @param enabled
* @text 有効化
* @desc フェス形式の並べ替えを許可する。
* @type boolean
* @default true
*
* @param pendingCursor
* @text 保留カーソル表示
* @desc 並び替え中に選択中のアクターを強調します。
* 競合する場合は有効化して下さい。
* @type boolean
* @default false
*
*/

/*~struct~iconTable:
*
* @param enabled
* @text Enable
* @desc Allow icon display for menu commands.
* @type boolean
* @default true
*
* @param item
* @text Item
* @type icon
* @default 208
*
* @param skill
* @text Skill
* @type icon
* @default 76
*
* @param equip
* @text Equip
* @type icon
* @default 137
*
* @param status
* @text Status
* @type icon
* @default 77
*
* @param formation
* @text Formation
* @type icon
* @default 75
*
* @param options
* @text Options
* @type icon
* @default 242
*
* @param save
* @text Save
* @type icon
* @default 297
*
* @param gameEnd
* @text Game End
* @type icon
* @default 229
*
* @param extra
* @text Extended setting
* @desc Set when an item is added by a plugin.
* First, open the plugin and search for addCommand.
* @type struct<iconTableEx>[]
* @default
*
*/

/*~struct~iconTable:ja
*
* @param enabled
* @text 有効化
* @desc メニューコマンドのアイコン表示を許可する。
* @type boolean
* @default true
*
* @param item
* @text アイテム
* @type icon
* @default 208
*
* @param skill
* @text スキル
* @type icon
* @default 76
*
* @param equip
* @text 装備
* @type icon
* @default 137
*
* @param status
* @text ステータス
* @type icon
* @default 77
*
* @param formation
* @text 並べ替え
* @type icon
* @default 75
*
* @param options
* @text オプション
* @type icon
* @default 242
*
* @param save
* @text セーブ
* @type icon
* @default 297
*
* @param gameEnd
* @text ゲーム終了
* @type icon
* @default 229
*
* @param extra
* @text 拡張設定
* @desc プラグインで項目を追加した場合に設定します。
* まずは当該プラグインを開き、addCommandを検索して下さい。
* @type struct<iconTableEx>[]
* @default
*
*/

/*~struct~iconTableEx:
*
* @param symbol
* @text Symbol
* @desc Usually, it is addCommand(item name, "identifier"……);,
* so copy and paste the identifier part without quotes.
* @default 
*
* @param iconIndex
* @text Icon Index
* @type icon
* @default 1
*
*/

/*~struct~iconTableEx:ja
*
* @param symbol
* @text 識別子
* @desc 大抵、addCommand(項目名, "識別子"……);
* となっているので識別子部分をクォーテーション抜きでコピペ。
* @default 
*
* @param iconIndex
* @text アイコン番号
* @type icon
* @default 1
*
*/

'use strict';

{
	//プラグイン名取得。
	const script = document.currentScript;
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

	const parameters = PluginManager.parameters(pluginName);
	const menuBgmVolume = Number(parameters["menuBgmVolume"]);
	const menuBgsVolume = Number(parameters["menuBgsVolume"]);
	const slideIn = parameters["slideIn"] === "true";
	const fesFormation = JSON.parse(parameters["fesFormation"] || "{}");
	fesFormation["enabled"] = fesFormation["enabled"] === "true";
	fesFormation["pendingCursor"] = fesFormation["pendingCursor"] === "true";
	const disableBlur = parameters["disableBlur"] === "true";
	const iconTable = JSON.parse(parameters["iconTable"] || "{}");
	const enableMenuIcon = iconTable["enabled"] === "true";
	const iconTableEx = JSON.parse(iconTable["extra"] || "[]").map(JSON.parse);
	delete iconTable["enabled"];
	delete iconTable["extra"];
	for (const table of iconTableEx) {
		if (table.symbol) {
			iconTable[table.symbol] = table.iconIndex;
		}
	}
	for (const key in iconTable) {
		iconTable[key] = parseInt(iconTable[key] || 0);
	};
	const goldIcon = parseInt(parameters["goldIcon"] || 0);
	const facePadding = parseInt(parameters["facePadding"] || 0);

	//-----------------------------------------------------------------------------
	// Window_MenuCommand

	if (enableMenuIcon) {
		if (Window_MenuCommand.prototype.drawItem === Window_Command.prototype.drawItem) {
			Window_MenuCommand.prototype.drawItem = function(index) {
				Window_Command.prototype.drawItem.apply(this, arguments);
			};
		}
		if (Window_MenuCommand.prototype.drawText === Window_Command.prototype.drawText) {
			Window_MenuCommand.prototype.drawText = function(index) {
				Window_Command.prototype.drawText.apply(this, arguments);
			};
		}
		const _Window_MenuCommand_drawItem = Window_MenuCommand.prototype.drawItem;
		Window_MenuCommand.prototype.drawItem = function(index) {
			this._symbolIconIndex = iconTable[this.commandSymbol(index)] || 0;
			_Window_MenuCommand_drawItem.call(this, index);
		};

		const _Window_MenuCommand_drawText = Window_MenuCommand.prototype.drawText;
		Window_MenuCommand.prototype.drawText = function(text, x, y, maxWidth, align) {
			const iconIndex = this._symbolIconIndex || 0;
			this._symbolIconIndex = 0;
			if (iconIndex === 0) {
				_Window_MenuCommand_drawText.apply(this, arguments);
			} else {
				const item = { "name": text, "iconIndex": iconIndex };
				this.drawItemName(item, x, y, maxWidth);
			}
		};
	}

	//-----------------------------------------------------------------------------
	// Window_MenuStatus

	if (Window_MenuStatus.prototype.drawActorFace === Window_StatusBase.prototype.drawActorFace) {
		Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
			Window_StatusBase.prototype.drawActorFace.apply(this, arguments);
		};
	}

	const _Window_MenuStatus_drawActorFace = Window_MenuStatus.prototype.drawActorFace;
	Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
		const pad = facePadding;
		_Window_MenuStatus_drawActorFace.call(this, actor, x + pad, y, width - pad, height);
	};

	if (fesFormation.enabled) {

		if (Window_MenuStatus.prototype.select === Window_StatusBase.prototype.select) {
			Window_MenuStatus.prototype.select = function(index) {
				Window_StatusBase.prototype.select.apply(this, arguments);
			};
		}

		const _Window_MenuStatus_select = Window_MenuStatus.prototype.select;
		Window_MenuStatus.prototype.select = function(index) {
			const lastIndex = this.index();
			_Window_MenuStatus_select.call(this, index);
			const pendingIndex = this.pendingIndex();
			if (pendingIndex >= 0) {
				this.setPendingIndex(index);
				$gameParty.swapOrder(lastIndex, index);
				this.redrawItem(index);
				this.redrawItem(lastIndex);
			}
		};

		if (!fesFormation.pendingCursor) {
			// SelectableWindow
			const _Window_MenuStatus_selectableWindowCursorRectEnabled = Window_MenuStatus.prototype.selectableWindowCursorRectEnabled;
			Window_MenuStatus.prototype.selectableWindowCursorRectEnabled = function(index) {
				return (!this.arrowCursorVisible || !this._backCursorCanInvisible()) && _Window_MenuStatus_selectableWindowCursorRectEnabled.call(this, index);
			};

			// FesCursor
			const _Window_MenuStatus__backCursorCanInvisible = Window_MenuStatus.prototype._backCursorCanInvisible;
			Window_MenuStatus.prototype._backCursorCanInvisible = function() {
				const canInvisible = this._formationMode && this.pendingIndex() < 0;
				return canInvisible || _Window_MenuStatus__backCursorCanInvisible.call(this);
			};

			Window_MenuStatus.prototype.drawPendingItemBackground = function(index) {};

			if (Window_MenuStatus.prototype._makeCursorAlpha === Window_StatusBase.prototype._makeCursorAlpha) {
				Window_MenuStatus.prototype._makeCursorAlpha = function() {
					Window_StatusBase.prototype._makeCursorAlpha.apply(this, arguments);
				};
			}

			const _Window_MenuStatus__makeCursorAlpha = Window_MenuStatus.prototype._makeCursorAlpha;
			Window_MenuStatus.prototype._makeCursorAlpha = function() {
				const pendingEnabled = this._formationMode && this.pendingIndex() >= 0;
				return pendingEnabled ? this.contentsOpacity / 255 : _Window_MenuStatus__makeCursorAlpha.call(this);
			};
		}

		//-----------------------------------------------------------------------------
		// Scene_Menu

		Scene_Menu.prototype.onFormationOk = function() {
			const index = this._statusWindow.index();
			const pendingIndex = this._statusWindow.pendingIndex();
			if (pendingIndex >= 0) {
				this._statusWindow.setPendingIndex(-1);
			} else {
				this._statusWindow.setPendingIndex(index);
			}
			this._statusWindow.activate();
		};

		Scene_Menu.prototype.onFormationCancel = function() {
			if (this._statusWindow.pendingIndex() >= 0) {
				this._statusWindow.setPendingIndex(-1);
				this._statusWindow.activate();
			} else {
				this._statusWindow.deselect();
				this._commandWindow.activate();
			}
		};

	}

	if (disableBlur) {
		let menuBitmap = null;
		const exclutionList1 = new Set(["Scene_Save", "Scene_Load", "Scene_Remove", "Scene_GameEnd", "Scene_Options"]);

		const _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
		Scene_MenuBase.prototype.createBackground = function() {
			_Scene_MenuBase_createBackground.call(this);
			if (!exclutionList1.has(this.constructor.name)) {
				while (this._backgroundSprite.filters.length > 0) {
					const filter = this._backgroundSprite.filters.shift();
					if (filter.destroy) {
						filter.destroy();
					}
				}
				this.setBackgroundOpacity(255);
			}
		};

		if (Scene_Menu.prototype.terminate === Scene_MenuBase.prototype.terminate) {
			Scene_Menu.prototype.terminate = function() {
				Scene_MenuBase.prototype.terminate.apply(this, arguments);
			};
		}

		const _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
		Scene_Menu.prototype.terminate = function() {
			_Scene_Menu_terminate.call(this);
			if (menuBitmap) {
				menuBitmap.destroy();
				menuBitmap = null;
			}
			if (SceneManager.isNextScene(Scene_GameEnd)) {
				menuBitmap = SceneManager.snap();
			}
		};

		const _Scene_GameEnd_createBackground = Scene_GameEnd.prototype.createBackground;
		Scene_GameEnd.prototype.createBackground = function() {
			_Scene_GameEnd_createBackground.call(this);
			if (menuBitmap) {
				const defaultImage = this._backgroundSprite;
				const w = menuBitmap.width;
				const h = menuBitmap.height;
				
				this._backgroundSprite.bitmap = new Bitmap(w, h);
				defaultImage.bitmap.blt(this._backgroundSprite, 0, 0, w, h, 0, 0);
				this._backgroundSprite.bitmap.blt(menuBitmap, 0, 0, w, h, 0, 0);
				menuBitmap.destroy();
				menuBitmap = null;
			}
		};

		if (Scene_GameEnd.prototype.terminate === Scene_MenuBase.prototype.terminate) {
			Scene_GameEnd.prototype.terminate = function() {
				Scene_MenuBase.prototype.terminate.apply(this, arguments);
			};
		}

		const _Scene_GameEnd_terminate = Scene_GameEnd.prototype.terminate;
		Scene_GameEnd.prototype.terminate = function() {
			_Scene_GameEnd_terminate.call(this);
			if (SceneManager.backgroundBitmap() !== this._backgroundSprite.bitmap) {
				this._backgroundSprite.bitmap.destroy();
			}
		};
	}

	if (goldIcon) {
		//-----------------------------------------------------------------------------
		// Window_Gold

		if (Window_Gold.prototype.drawCurrencyValue === Window_Selectable.prototype.drawCurrencyValue) {
			Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
				Window_Selectable.prototype.drawCurrencyValue.apply(this, arguments);
			};
		}

		const _Window_Gold_drawCurrencyValue = Window_Gold.prototype.drawCurrencyValue;
		Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 4;
			const itemWidth = Math.max(0, width - textMargin);
			this.drawIcon(goldIcon, x, iconY);
			_Window_Gold_drawCurrencyValue.call(this, value, unit, x + textMargin, y, itemWidth);
		};
	}

	if (slideIn) {
		//-----------------------------------------------------------------------------
		// Scene_Menu

		const slideDuration = 5;
		const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
		Scene_Menu.prototype.initialize = function() {
			this._windowData = [];
			this._slideDuration = this._wholeSlideDuration = 0;
			this._slideoutRequest = false;
			_Scene_Menu_initialize.call(this);
		};

		if (Scene_Menu.prototype.isBusy === Scene_MenuBase.prototype.isBusy) {
			Scene_Menu.prototype.isBusy = function() {
				return Scene_MenuBase.prototype.isBusy.apply(this, arguments);
			};
		}

		const _Scene_Menu_isBusy = Scene_Menu.prototype.isBusy;
		Scene_Menu.prototype.isBusy = function() {
			return _Scene_Menu_isBusy.call(this) || (this._slideoutRequest && this._slideDuration > 0);
		};

		if (Scene_Menu.prototype.popScene === Scene_MenuBase.prototype.popScene) {
			Scene_Menu.prototype.popScene = function() {
				return Scene_MenuBase.prototype.popScene.apply(this, arguments);
			};
		}

		const _Scene_Menu_popScene = Scene_Menu.prototype.popScene;
		Scene_Menu.prototype.popScene = function() {
			_Scene_Menu_popScene.call(this);
			const duration = slideDuration - this._slideDuration;
			this._slideDuration = this._wholeSlideDuration = duration;
			this._slideoutRequest = true;
			this._windowData.forEach(data => {
				const window = data.window;
				const offsetX = Math.floor((Graphics.width - Graphics.boxWidth)/2);
				data.targetX = data.dir === 4 ? -window.width - offsetX : Graphics.boxWidth + offsetX;
			});
		};

		const _Scene_Menu_create = Scene_Menu.prototype.create;
		Scene_Menu.prototype.create = function() {
			_Scene_Menu_create.call(this);
			this.addWindowData();
		};

		Scene_Menu.prototype.addWindowData = function() {
			this._windowLayer.children.forEach(window => {
				if (!window._isWindow) return;
				const dir = Graphics.boxWidth/2 >= window.x + window.width/2 ? 4 : 6;
				const data = {
					"window": window,
					"targetX": window.x,
					"dir": dir,
					"originX": window.x
				};
				this._windowData.push(data);
			});
			if (SceneManager.isPreviousScene(Scene_Map)) {
				this._slideDuration = this._wholeSlideDuration = slideDuration;
				this._windowData.forEach(data => {
					const window = data.window;
					const offsetX = Math.floor((Graphics.width - Graphics.boxWidth)/2);
					window.x = data.dir === 4 ? -window.width - offsetX : Graphics.boxWidth + offsetX;
				});
			}
		};

		const _Scene_Menu_update = Scene_Menu.prototype.update;
		Scene_Menu.prototype.update = function() {
			_Scene_Menu_update.call(this);
			if (this._slideDuration > 0) {
				const d = this._slideDuration;
				const wd = this._wholeSlideDuration;
				const lt = (wd - d) / wd;
				const t = (wd - d + 1) / wd;
				this._windowData.forEach(data => {
					const window = data.window;
					const current = window.x;
					const target = data.targetX;
					const start = (current - target * lt) / (1 - lt);
					window.x = start + (target - start) * t;
				});
				this._slideDuration--;
			}
		};

		if (Scene_Menu.prototype.terminate === Scene_MenuBase.prototype.terminate) {
			Scene_Menu.prototype.terminate = function() {
				Scene_MenuBase.prototype.terminate.apply(this, arguments);
			};
		}

		const _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
		Scene_Menu.prototype.terminate = function() {
			if (this._slideDuration > 0) {
				this._windowData.forEach(data => {
					const window = data.window;
					window.x = data.targetX;
				});
			}
			_Scene_Menu_terminate.call(this);
		};

	}

}