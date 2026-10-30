//=============================================================================
// NAPI_LimitedOneShop.js (modified by 9716 / stabilized)
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 一点物ショッププラグイン（修正版） 
 * @author なぴぃ (modified by 9716)
 *
 * @command mzLimitedShopOpen
 * @text 限定ショップ オープン
 * @desc 次のショップを限定モードで開く
 * @arg shopName
 * @type string
 * @default
 *
 * @command mzLimitedShopAllReset
 * @text 限定ショップ 全リセット
 * @desc 全てのショップの在庫を復活させます
 *
 * @command mzLimitedShopReset
 * @text 限定ショップ リセット
 * @desc 特定のショップの在庫を復活させます
 * @arg shopName
 * @type string
 * @default
 *
 * @help
 * メモ欄タグ
 *  <LimitedOne>         一点限り（デフォルト在庫 NAPI.lsMax = 1）
 *  <Stock:n>            在庫n個（優先）
 *
 * プラグインコマンド（MZ）
 *  限定ショップ オープン    ：次のショップを限定モードで開く（shopNameを引数で指定可）
 *  限定ショップ 全リセット  ：全ショップの在庫をリセット
 *  限定ショップ リセット    ：個別リセット（shopNameを引数で指定）
 *
 * 既存の NAPI 挙動を拡張し、以下を実現しています：
 *  - セーブ/ロードで問題になる Infinity を排除し、セーブ互換な大きな定数を無限として使用
 *  - ロード後に配列長がずれても補正する（古いセーブ移行に安全）
 *  - 無限在庫扱いのアイテムは通常通り複数（例 99）まで購入可能
 *  - メモ欄 <Stock:n> を優先して在庫初期化
 */

// ---------------------------------------------------------------------------
// ユーティリティ
function isLimitedOneItem(item) {
    return item && item.meta && item.meta.LimitedOne !== undefined;
}
function getMetaStock(item) {
    if (!item || !item.meta) return null;
    if (item.meta.Stock !== undefined) return Number(item.meta.Stock);
    if (item.meta.LimitedCount !== undefined) return Number(item.meta.LimitedCount);
    return null;
}

// ---------------------------------------------------------------------------
var NAPI = NAPI || {};

(() => {
'use strict';

NAPI.lsReady = false;
NAPI.lsMax = 1;         // デフォルト限定在庫（通常は1）
NAPI.lsInfinite = 9999; // セーブ互換な「ほぼ無限」値

let mapId = 0;
let eventId = 0;
let shopName = "";
const pluginName = "NAPI_LimitedOneShop";

// セーブデータの互換と初期化サニタイズ
function sanitizeShopStockList() {
    if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};
    for (const key in $gameSystem._napiLsStockList) {
        let arr = $gameSystem._napiLsStockList[key];
        if (!Array.isArray(arr)) {
            $gameSystem._napiLsStockList[key] = [];
            continue;
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] !== 'number' || Number.isNaN(arr[i])) {
                arr[i] = 0;
            }
        }
    }
}

// Boot 後に一度サニタイズしておく（MZ/MV 両対応）
const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.apply(this, arguments);
    if ($gameSystem) sanitizeShopStockList();
};

// プラグインコマンド (MV 互換)
const _Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_prototype_pluginCommand.apply(this, arguments);
    if (command === "LimitedShop" || command === "限定ショップ") {
        mapId = this._mapId;
        eventId = this._eventId;
        if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};
        NAPI.LimitedShop(args);
    }
};

// MZ の PluginManager コマンド登録
if (Utils.RPGMAKER_NAME === "MZ") {
    PluginManager.registerCommand(pluginName, "mzLimitedShopOpen", args => {
        if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};
        shopName = "shop" + (mapId * 1000 + eventId);
        if (args.shopName && args.shopName !== "") shopName = args.shopName;
        NAPI.lsReady = true;
    });
    PluginManager.registerCommand(pluginName, "mzLimitedShopAllReset", args => {
        allReset();
    });
    PluginManager.registerCommand(pluginName, "mzLimitedShopReset", args => {
        reset(args.shopName);
    });
}

// プラグイン引数形式の処理（MV 互換）
NAPI.LimitedShop = function(argsArray) {
    const pluginArgs = (argsArray || []).map(e => (typeof e === 'string' ? e.split(":") : ["", ""]));
    pluginArgs.forEach(e => {
        if (!e[0]) return;
        const key = e[0].toLowerCase();
        const val = e[1];
        if (key === "max" || e[0] === "最大") NAPI.lsMax = Number(val);
        if (key === "open" || e[0] === "オープン") {
            shopName = "shop" + (mapId * 1000 + eventId);
            NAPI.lsReady = true;
        }
        if (key === "shopname" || e[0] === "ショップ名") shopName = val;
        if (key === "reset" || e[0] === "リセット") reset(val);
        if (key === "allreset" || e[0] === "全リセット") allReset();
    });
};

// 個別リセット
const reset = function(shop) {
    if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};
    if (!$gameSystem._napiLsStockList.hasOwnProperty(shop)) return;
    $gameSystem._napiLsStockList[shop] = $gameSystem._napiLsStockList[shop].map(() => 1);
};

// 全リセット
const allReset = function() {
    if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};
    for (let key in $gameSystem._napiLsStockList) {
        $gameSystem._napiLsStockList[key] = $gameSystem._napiLsStockList[key].map(() => 1);
    }
};

// データから在庫初期値を作る（Stock:n を優先、LimitedOne 次、無限は lsInfinite）
function makeInitialStockArrayFromData(dataArray) {
    return dataArray.map(item => {
        const metaStock = getMetaStock(item);
        if (metaStock !== null && !Number.isNaN(metaStock)) {
            return Number(metaStock);
        }
        if (isLimitedOneItem(item)) return NAPI.lsMax;
        return NAPI.lsInfinite;
    });
}

// Window_ShopBuy: 現在アイテムが有効か（売切れチェック含む）
Window_ShopBuy.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()], this.index());
};

const _Window_ShopBuy_prototype_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item, index) {
    let result = _Window_ShopBuy_prototype_isEnabled.apply(this, arguments);
    if (NAPI.lsReady && shopName !== "") {
        // 安全に stock 値を取得（ロード不整合対策）
        const stockList = ($gameSystem._napiLsStockList && $gameSystem._napiLsStockList[shopName]) || null;
        let stockCount;
        if (stockList && typeof stockList[index] === 'number') {
            stockCount = stockList[index];
        } else {
            // fallback 初期値
            const fallbackItem = (this._data && this._data[index]) || item;
            const metaStock = getMetaStock(fallbackItem);
            if (metaStock !== null && !Number.isNaN(metaStock)) stockCount = Number(metaStock);
            else if (isLimitedOneItem(fallbackItem)) stockCount = NAPI.lsMax;
            else stockCount = NAPI.lsInfinite;
        }
        // 限定アイテムかつ在庫0以下なら選択不可
        const targetItem = (this._data && this._data[index]) || item;
        if (isLimitedOneItem(targetItem) && stockCount <= 0) {
            result = false;
        }
    }
    return result;
};

// Window_ShopBuy: 描画時に在庫配列を初期化または補正する（安全実装）
const _Window_ShopBuy_prototype_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index) {
    if (NAPI.lsReady && shopName !== "") {
        if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};

        // 初回未作成時は現在表示データ(this._data)に合わせて初期化
        if (!$gameSystem._napiLsStockList[shopName]) {
            $gameSystem._napiLsStockList[shopName] = makeInitialStockArrayFromData(this._data || []);
        } else {
            // 既存配列がある場合は長さ不整合や undefined を補正する
            const existing = $gameSystem._napiLsStockList[shopName];
            if (!Array.isArray(existing)) {
                $gameSystem._napiLsStockList[shopName] = makeInitialStockArrayFromData(this._data || []);
            } else {
                // 長さが異なれば新しい配列を作りつつ可能な限り既存値を保持
                if (existing.length !== (this._data ? this._data.length : 0)) {
                    const newArr = [];
                    for (let i = 0; i < (this._data ? this._data.length : 0); i++) {
                        const item = this._data[i];
                        if (i < existing.length && typeof existing[i] === 'number') {
                            newArr[i] = existing[i];
                        } else {
                            // 新規スロットは初期値を入れる
                            newArr[i] = (getMetaStock(item) !== null) ? Number(getMetaStock(item))
                                         : (isLimitedOneItem(item) ? NAPI.lsMax : NAPI.lsInfinite);
                        }
                    }
                    $gameSystem._napiLsStockList[shopName] = newArr;
                } else {
                    // 同長でも undefined 等を補正
                    for (let i = 0; i < existing.length; i++) {
                        if (typeof existing[i] !== 'number' || Number.isNaN(existing[i])) {
                            const item = (this._data && this._data[i]) || null;
                            existing[i] = (getMetaStock(item) !== null) ? Number(getMetaStock(item))
                                           : (isLimitedOneItem(item) ? NAPI.lsMax : NAPI.lsInfinite);
                        }
                    }
                }
            }
        }

        // 描画処理（MV / MZ 両対応）
        let item, price, rect, priceWidth, priceX, nameWidth;
        if (Utils.RPGMAKER_NAME === "MV") {
            item = this._data[index];
            rect = this.itemRect(index);
            priceWidth = 96;
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item, index) && ($gameSystem._napiLsStockList[shopName][index] >= 1));
            this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
            if ($gameSystem._napiLsStockList[shopName][index] >= 1) {
                this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
            } else {
                this.drawText("Sold Out", rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
            }
            this.changePaintOpacity(true);
        } else { // MZ
            item = this.itemAt(index);
            price = this.price(item);
            rect = this.itemLineRect(index);
            priceWidth = this.priceWidth();
            priceX = rect.x + rect.width - priceWidth;
            nameWidth = rect.width - priceWidth;
            this.changePaintOpacity(this.isEnabled(item, index) && ($gameSystem._napiLsStockList[shopName][index] >= 1));
            this.drawItemName(item, rect.x, rect.y, nameWidth);
            if ($gameSystem._napiLsStockList[shopName][index] >= 1) {
                this.drawText(price, priceX, rect.y, priceWidth, 'right');
            } else {
                this.drawText("Sold Out", priceX, rect.y, priceWidth, 'right');
            }
            this.changePaintOpacity(true);
        }
    } else {
        _Window_ShopBuy_prototype_drawItem.apply(this, arguments);
    }
};

// Scene_Shop: 購入処理（限定アイテムのみ在庫を減らす。Stock:n も対応）
const _Scene_Shop_prototype_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    _Scene_Shop_prototype_doBuy.apply(this, arguments);
    if (NAPI.lsReady && shopName !== "") {
        const index = this._buyWindow.index();
        const item = this._buyWindow.itemAt ? this._buyWindow.itemAt(index) : (this._buyWindow.item ? this._buyWindow.item() : null);
        if (!item) return;
        if (!$gameSystem._napiLsStockList) $gameSystem._napiLsStockList = {};
        if (!$gameSystem._napiLsStockList[shopName]) return;

        // Stock:n 優先。metaStock がある場合はその配列値を減らす
        const metaStock = getMetaStock(item);
        if (metaStock !== null && !Number.isNaN(metaStock)) {
            // find correct index and decrement
            if (typeof $gameSystem._napiLsStockList[shopName][index] === 'number') {
                $gameSystem._napiLsStockList[shopName][index] = Math.max(0, $gameSystem._napiLsStockList[shopName][index] - number);
            }
        } else if (isLimitedOneItem(item)) {
            // 限定アイテムのみ在庫減少（NAPI.lsMax の管理）
            if (typeof $gameSystem._napiLsStockList[shopName][index] === 'number') {
                $gameSystem._napiLsStockList[shopName][index] = Math.max(0, $gameSystem._napiLsStockList[shopName][index] - number);
            }
        } else {
            // 無限扱いアイテムはデクリメントしない（購入回数制限なし）
        }
    }
};

// Scene_Shop: 個別の最大購入数を決める（限定アイテムは NAPI.lsMax、通常はデフォルトを維持）
const _Scene_Shop_prototype_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
    const result = _Scene_Shop_prototype_maxBuy.apply(this, arguments);
    let max = result;
    if (!NAPI.lsReady || !this._buyWindow) return max;

    const buyWindow = this._buyWindow;
    const item = buyWindow.itemAt ? buyWindow.itemAt(buyWindow.index()) : (buyWindow.item ? buyWindow.item() : null);
    if (!item) return max;

    // metaStock 優先で、残在庫が少なければそれを上限にする
    const metaStock = getMetaStock(item);
    if (metaStock !== null && !Number.isNaN(metaStock)) {
        // 在庫情報を参照して上限を設定
        const stockList = ($gameSystem._napiLsStockList && $gameSystem._napiLsStockList[shopName]) || null;
        const stockCount = (stockList && typeof stockList[buyWindow.index()] === 'number') ? stockList[buyWindow.index()] : Number(metaStock);
        max = Math.min(result, stockCount);
    } else if (isLimitedOneItem(item)) {
        const stockList = ($gameSystem._napiLsStockList && $gameSystem._napiLsStockList[shopName]) || null;
        const stockCount = (stockList && typeof stockList[buyWindow.index()] === 'number') ? stockList[buyWindow.index()] : NAPI.lsMax;
        max = Math.min(result, stockCount);
    } else {
        // 無限扱いのアイテムは元の result（所持金/所持数/99など）を尊重
        max = result;
    }
    return max;
};

// Scene_Shop: 終了時にフラグを戻す
const _Scene_Shop_prototype_popScene = Scene_Shop.prototype.popScene;
Scene_Shop.prototype.popScene = function() {
    NAPI.lsReady = false;
    _Scene_Shop_prototype_popScene.apply(this, arguments);
};

// MZ 用: プラグインコマンドがイベント中に呼ばれたときに mapId/eventId を取得できるようにする
if (Utils.RPGMAKER_NAME === "MZ") {
    const _Game_Interpreter_prototype_command357 = Game_Interpreter.prototype.command357;
    Game_Interpreter.prototype.command357 = function(params) {
        const commandPluginName = Utils.extractFileName(params[0]);
        if (pluginName === commandPluginName) {
            mapId = this._mapId;
            eventId = this._eventId;
        }
        return _Game_Interpreter_prototype_command357.apply(this, arguments);
    };
}

})(); // IIFE end
