/*:
 * @target MZ
 * @plugindesc HP・MP・レベルをメニューなどから非表示にします v1.0
 * @author つくだに
 *
 * @help
 * メニュー画面・ステータスウィンドウなどに表示される
 * HP・MP・レベルをすべて非表示にします。
 *
 * 【適用範囲】
 * - メニュー画面（Window_MenuStatus）
 * - ステータス画面（Window_Status）
 * - バトルメンバー選択時の顔欄
 *
 * 
 */

(() => {
  //
  // ■ メニュー画面：HP/MP/レベルを非表示
  //
  const _Window_MenuStatus_drawItemStatus = Window_MenuStatus.prototype.drawItemStatus;
  Window_MenuStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    const lineHeight = this.lineHeight();

    // 顔グラ・名前のみ表示
    this.drawActorFace(actor, x + 0, y + 2, 144, 36);
    this.drawText(actor.name(), x + 160, y + lineHeight / 2, width);
    // HP/MP/Levelは描かない（完全削除）
  };

  //
  // ■ ステータス画面も非表示
  //
  const _Window_Status_drawBlock1 = Window_Status.prototype.drawBlock1;
  Window_Status.prototype.drawBlock1 = function(y) {
    // 顔と名前だけ
    const actor = this._actor;
    const width = this.innerWidth;
    const faceWidth = ImageManager.faceWidth;
    this.drawActorFace(actor, 0, y, faceWidth, ImageManager.faceHeight);
    this.drawText(actor.name(), faceWidth + 20, y + this.lineHeight(), width);
  };

  const _Window_Status_drawBlock2 = Window_Status.prototype.drawBlock2;
  Window_Status.prototype.drawBlock2 = function(y) {
    // レベル・HP・MPなどを描画しない
  };

  //
  // ■ バトル中のステータス（下部）も非表示
  //
  const _Window_BattleStatus_drawBasicArea =
    Window_BattleStatus.prototype.drawBasicArea;
  Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    // HP/MP/TP非表示 → 名前だけ
    this.drawText(actor.name(), rect.x + 8, rect.y, rect.width);
  };
})();
