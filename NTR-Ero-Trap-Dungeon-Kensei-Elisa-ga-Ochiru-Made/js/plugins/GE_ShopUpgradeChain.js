/*=============================================================================
 GE_ShopUpgradeChain.js
 ショップで特定アイテムを「強化段階」として1つだけ表示する
=============================================================================*/
/*:
 * @plugindesc ショップの同一強化チェーンを所持に応じて1段階だけ表示
 * @target MZ
 * @author Good Emotion
 *
 * @param itemIds
 * @text アイテムID（弱い順）
 * @desc カンマ区切り。例: 催眠のペンダント→強→極 なら 16,23,24
 * @default 16,23,24
 *
 * @param removeOtherTiersOnBuy
 * @text 購入時に他段階を破棄
 * @desc チェーン内のいずれかをショップで買った直後、同チェーンの他アイテムをすべて失います。
 * @type boolean
 * @default true
 *
 * @help
 * ショップ処理の「商品」に、上記IDのアイテムをすべて登録してください。
 * プレイ中は所持に応じて次の1段階だけが一覧に出ます。
 *
 * - いずれも未所持 … 先頭（最弱）のみ
 * - 先頭を所持 … 2番目のみ
 * - …最終を所持 … チェーンに属する行はすべて非表示
 *
 * 購入直後・ショップを開き直したときも同じルールが適用されます。
 *
 * 「購入時に他段階を破棄」が ON のとき、チェーンのどれかを買うと
 * 所持はそのアイテムだけになります（下位・上位の重複所持を解消）。
 *
 * チェーンに含まれる商品は、ショップで一度に買えるのは 1 個までです。
 */

(() => {
    'use strict';

    const params = PluginManager.parameters('GE_ShopUpgradeChain');
    const rawIds = String(params.itemIds || '')
        .split(',')
        .map(s => Number(s.trim()))
        .filter(id => id > 0);

    const chainSet = new Set(rawIds);
    const removeOtherTiersOnBuy = params.removeOtherTiersOnBuy !== 'false';

    function isChainItem(item) {
        return !!(item && DataManager.isItem(item) && chainSet.has(item.id));
    }

    function loseOtherChainItems(keptItem) {
        if (!removeOtherTiersOnBuy || rawIds.length === 0 || !keptItem) {
            return;
        }
        if (!isChainItem(keptItem)) {
            return;
        }
        for (const id of rawIds) {
            if (id === keptItem.id) {
                continue;
            }
            const other = $dataItems[id];
            if (!other) {
                continue;
            }
            const n = $gameParty.numItems(other);
            if (n > 0) {
                $gameParty.loseItem(other, n);
            }
        }
    }

    function offerItemIdInChain() {
        if (rawIds.length === 0) {
            return undefined;
        }
        const items = rawIds.map(id => $dataItems[id]);
        const n = rawIds.length;
        if ($gameParty.hasItem(items[n - 1])) {
            return null;
        }
        for (let i = n - 2; i >= 0; i--) {
            if ($gameParty.hasItem(items[i])) {
                return rawIds[i + 1];
            }
        }
        return rawIds[0];
    }

    const _Window_ShopBuy_makeItemList = Window_ShopBuy.prototype.makeItemList;
    Window_ShopBuy.prototype.makeItemList = function() {
        if (rawIds.length === 0) {
            _Window_ShopBuy_makeItemList.call(this);
            return;
        }
        const offerId = offerItemIdInChain();
        this._data = [];
        this._price = [];
        for (const goods of this._shopGoods) {
            if (goods[0] === 0 && chainSet.has(goods[1])) {
                if (offerId === null || goods[1] !== offerId) {
                    continue;
                }
            }
            const item = this.goodsToItem(goods);
            if (item) {
                this._data.push(item);
                this._price.push(goods[2] === 0 ? item.price : goods[3]);
            }
        }
    };

    const _Window_ShopBuy_refresh = Window_ShopBuy.prototype.refresh;
    Window_ShopBuy.prototype.refresh = function() {
        const prevIndex = this.index();
        _Window_ShopBuy_refresh.call(this);
        const max = this.maxItems();
        if (max <= 0) {
            this.select(0);
        } else if (prevIndex >= max) {
            this.select(max - 1);
        }
    };

    const _Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
    Scene_Shop.prototype.maxBuy = function() {
        const base = _Scene_Shop_maxBuy.call(this);
        if (rawIds.length === 0) {
            return base;
        }
        if (isChainItem(this._item)) {
            return Math.min(base, 1);
        }
        return base;
    };

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        let n = number;
        if (rawIds.length > 0 && isChainItem(this._item)) {
            n = Math.min(n, 1);
        }
        _Scene_Shop_doBuy.call(this, n);
        loseOtherChainItems(this._item);
    };
})();
