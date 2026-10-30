/*:
 * @target MZ
 * @plugindesc アイテム画面で武器と防具のカテゴリを非表示にし、2列表示にします。
 * @author Z
 *
 * @help
 * アイテム画面を開いたときに「武器」と「防具」を非表示にし、
 * カテゴリを2列表示（「アイテム」「大事なもの」を左右に均等配置）します。
 *
 * 特にプラグインコマンドはありません。
 */
(() => {
  // Window_ItemCategoryのmakeCommandListを上書き
  const _Window_ItemCategory_makeCommandList =
    Window_ItemCategory.prototype.makeCommandList;
  Window_ItemCategory.prototype.makeCommandList = function() {
    // デフォルトの処理を呼ばず、新しいコマンドリストを作成する
    this.addCommand(TextManager.item, 'item');
    // this.addCommand(TextManager.weapon, 'weapon'); // 非表示にしたいのでコメントアウト
    // this.addCommand(TextManager.armor, 'armor');   // 非表示にしたいのでコメントアウト
    this.addCommand(TextManager.keyItem, 'keyItem');
  };

  // Window_ItemCategory の maxCols を 2 にして、左右に2列で表示
  Window_ItemCategory.prototype.maxCols = function() {
    return 2;
  };
})();
