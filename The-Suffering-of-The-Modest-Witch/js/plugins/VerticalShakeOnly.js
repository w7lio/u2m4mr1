/*:
 * @target MZ
 * @plugindesc 横方向のシェイクを縦方向に変換するプラグイン
 * @author GG
 * @help
 * VerticalShakeConverter.js
 * 
 * 通常の「画面のシェイク」イベントを縦方向の揺れに変換します。
 * 横方向のシェイクは行われません。
 * 
 * 使い方：
 * 1. このファイルを js/plugins フォルダに入れる
 * 2. プラグイン管理で有効化
 * 3. 通常の「画面のシェイク」イベントを使う（設定不要）
 * 
 * 互換性：
 * - RPGツクールMZ専用です。
 * - MVでは動作しません。
 */

(() => {
    'use strict';

    // オリジナルのシェイク更新関数を上書き
    const _Game_Screen_updateShake = Game_Screen.prototype.updateShake;
    Game_Screen.prototype.updateShake = function() {
        // 元の処理で shake 値を更新
        _Game_Screen_updateShake.call(this);

        // 横方向(X軸)の揺れを打ち消し
        this._shake = 0;

        // 縦方向(Y軸)用に代わりの値を保持
        if (this._shakeOffsetY === undefined) this._shakeOffsetY = 0;

        // shakePower, shakeSpeed, shakeDirection は内部変数
        if (this._shakeDuration > 0 || this._shakeOffsetY !== 0) {
            const delta = (this._shakePower * this._shakeDirection * this._shakeSpeed) / 10;
            this._shakeOffsetY += delta;
            if (this._shakeOffsetY > this._shakePower * 2 || this._shakeOffsetY < -this._shakePower * 2) {
                this._shakeDirection *= -1;
            }
            this._shakeDuration--;
            if (this._shakeDuration <= 0) {
                this._shakeOffsetY = 0;
            }
        }
    };

    // Spriteset_Base をフックして縦方向に揺らす
    const _Spriteset_Base_updatePosition = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function() {
        _Spriteset_Base_updatePosition.call(this);

        // Game_Screen の shakeOffsetY を反映
        if ($gameScreen._shakeOffsetY) {
            this.y += $gameScreen._shakeOffsetY;
        }
    };

})();
