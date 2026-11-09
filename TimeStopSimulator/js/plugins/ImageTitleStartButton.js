/*:
 * @target MZ
 * @plugindesc 標準タイトルコマンドを非表示にし、画像クリックでニューゲームを開始します。
 * @author Original
 *
 * @param ButtonImage
 * @text 開始ボタン画像
 * @type file
 * @dir img/system/
 * @desc タイトル画面に表示する画像です。
 * @default
 *
 * @param ButtonX
 * @text X座標
 * @type number
 * @desc 画像の中心X座標です。0なら画面中央。
 * @default 0
 *
 * @param ButtonY
 * @text Y座標
 * @type number
 * @desc 画像の中心Y座標です。0なら画面中央より少し下。
 * @default 0
 *
 * @help
 * 指定画像をクリック / タッチするとニューゲームを開始します。
 * 一度押した後はフェードアウト完了まで再クリックできません。
 */

(() => {
    "use strict";

    const pluginName = "ImageTitleStartButton";
    const params = PluginManager.parameters(pluginName);

    const buttonImage = String(params.ButtonImage || "");
    const paramX = Number(params.ButtonX || 0);
    const paramY = Number(params.ButtonY || 0);

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this._startingNewGame = false;
        this.hideDefaultTitleCommandWindow();
        this.createImageStartButton();
    };

    Scene_Title.prototype.hideDefaultTitleCommandWindow = function() {
        if (this._commandWindow) {
            this._commandWindow.visible = false;
            this._commandWindow.active = false;
            this._commandWindow.close();
            this._commandWindow.deactivate();

            this._commandWindow.setHandler("newGame", null);
            this._commandWindow.setHandler("continue", null);
            this._commandWindow.setHandler("options", null);
        }
    };

    Scene_Title.prototype.createImageStartButton = function() {
        if (!buttonImage) return;

        this._imageStartButton = new Sprite_Clickable();
        this._imageStartButton.bitmap = ImageManager.loadSystem(buttonImage);
        this._imageStartButton.anchor.x = 0.5;
        this._imageStartButton.anchor.y = 0.5;

        this._imageStartButton.bitmap.addLoadListener(() => {
            this._imageStartButton.x = paramX || Math.floor(Graphics.boxWidth / 2);
            this._imageStartButton.y = paramY || Math.floor(Graphics.boxHeight * 0.62);
        });

        this._imageStartButton.onClick = this.onImageStartButtonClick.bind(this);
        this.addChild(this._imageStartButton);
    };

    Scene_Title.prototype.onImageStartButtonClick = function() {
        if (this._startingNewGame) return;

        this._startingNewGame = true;

        SoundManager.playOk();
        this.commandNewGame();
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (this._commandWindow) {
            this._commandWindow.visible = false;
            this._commandWindow.active = false;
        }
    };

})();