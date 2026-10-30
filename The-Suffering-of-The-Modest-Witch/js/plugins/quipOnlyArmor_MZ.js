(() => {

  // 最強装備・装備を外すコマンドを削除
  const _Window_EquipCommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;
  Window_EquipCommand.prototype.makeCommandList = function() {
    _Window_EquipCommand_makeCommandList.call(this);
    this._list = this._list.filter(cmd => cmd.symbol !== "optimize" && cmd.symbol !== "clear");
  };

  // 装備を外せない仕様：null のみ除外
  const _Window_EquipItem_includes = Window_EquipItem.prototype.includes;
  Window_EquipItem.prototype.includes = function(item) {
    if (!item) return false; // 空装備は不可
    return _Window_EquipItem_includes.call(this,item); // 元の判定はそのまま
  };

  // 装備画面作成時
  const _Scene_Equip_create = Scene_Equip.prototype.create;
  Scene_Equip.prototype.create = function() {
    _Scene_Equip_create.call(this);
    // コマンドウィンドウはそのままでもOK
  };

  // 必要なら最初に装備スロット選択
  const _Scene_Equip_start = Scene_Equip.prototype.start;
  Scene_Equip.prototype.start = function() {
    _Scene_Equip_start.call(this);
    // 開いたときに最初のスロットを選択状態にする
    if (this._slotWindow) {
      this._slotWindow.activate();
      this._slotWindow.select(0);
    }
  };

  // キャンセルでメニューやマップに戻る
  const _Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
  Scene_Equip.prototype.onSlotCancel = function() {
    _Scene_Equip_onSlotCancel.call(this);
    // 通常は popScene() で戻る
  };

})();
