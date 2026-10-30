/*:
 * @target MZ
 * @plugindesc ショップで購入した際の実際の支払額を指定変数に累積します（差分方式）.
 * @author Okeyu
 *
 * @param Accumulation Variable ID
 * @text 累積先変数ID
 * @type variable
 * @desc 購入金額を加算する変数IDを指定してください
 * @default 1
 *
 * @help
 * 購入直前の所持金を記録して購入後の差分を累積変数に加算します。
 */

(() => {
    const PLUGIN_NAME = "Okeyu_ShopTotal";

    const params = PluginManager.parameters(PLUGIN_NAME);
    const ACCUM_VAR_ID = Number(params['Accumulation Variable ID'] || 1);

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        const beforeGold = $gameParty.gold();
        // 元の処理を実行（購入処理）
        _Scene_Shop_doBuy.apply(this, arguments);
        // doBuy 実行後に差分を計算
        const afterGold = $gameParty.gold();
        const spent = Math.max(0, beforeGold - afterGold);
        if (spent > 0) {
            const prev = Number($gameVariables.value(ACCUM_VAR_ID) || 0);
            $gameVariables.setValue(ACCUM_VAR_ID, prev + spent);
        }
    };
})();
