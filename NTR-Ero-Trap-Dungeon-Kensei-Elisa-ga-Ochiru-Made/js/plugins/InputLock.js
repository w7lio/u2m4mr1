/*:
 * @target MZ
 * @plugindesc 任意のキー入力を一時的に無効化／解除できるプラグイン ver1.0.0
 * @author S
 *
 * @command lockKey
 * @text Lock Key
 * @desc 指定したキーを無効化します。
 *
 * @arg keyName
 * @type combo
 * @option ok
 * @option cancel
 * @option menu
 * @option pageup
 * @option pagedown
 * @option shift
 * @option control
 * @option tab
 * @option left
 * @option up
 * @option right
 * @option down
 * @default cancel
 * @desc InputMapper に登録されているキー名。複数指定する場合は半角カンマで区切る。
 *
 * @command unlockKey
 * @text Unlock Key
 * @desc 指定したキーを再び有効化します。
 *
 * @arg keyName
 * @type combo
 * @option ok
 * @option cancel
 * @option menu
 * @option pageup
 * @option pagedown
 * @option shift
 * @option control
 * @option tab
 * @option left
 * @option up
 * @option right
 * @option down
 * @default cancel
 *
 * @command unlockAll
 * @text Unlock All Keys
 * @desc すべてのキーのロックを解除します。
 *
 * @help
 * =============================
 *  InputLock.js
 * =============================
 * 任意のキーをロック（入力無効化）／アンロックできます。
 *
 *  ◇ 使い方
 *   プラグインコマンドで lockKey / unlockKey を呼ぶだけです。
 *   例)
 *     ・lockKey  keyName: cancel        # Esc/Menu キーを無効化
 *     ・unlockKey keyName: cancel       # Esc/Menu キーを解除
 *
 *   keyName には InputMapper に定義されている名前を使います。
 *   カンマ区切りで複数同時指定が可能です。
 *
 *  ◇ 注意
 *   - lockKey したままシーンを跨いでもロック状態は維持されます。
 *     必要に応じて unlockKey / unlockAll を呼んでください。
 *   - 他プラグインでキー入力を直接監視している場合、その処理
 *     まではブロックできないことがあります。
 *
 *   このプラグインは MIT ライセンスで公開します。
 */
(() => {
  'use strict';

  /**
   * 内部ロックテーブル
   * locked[name] === true ならそのキーは無効
   */
  const locked = new Set();

  /** 元メソッドバックアップ */
  const _isPressed = Input.isPressed;
  const _isTriggered = Input.isTriggered;
  const _isRepeated = Input.isRepeated;
  const _isLongPressed = Input.isLongPressed;
  const _isReleased = Input.isReleased;

  /** キー名がロックされているか */
  const isLocked = (name) => locked.has(name);

  /** ラップ関数 */
  function denyIfLocked(origFn) {
    return function (keyName) {
      if (isLocked(keyName)) return false;
      return origFn.call(this, keyName);
    };
  }

  Input.isPressed = denyIfLocked(_isPressed);
  Input.isTriggered = denyIfLocked(_isTriggered);
  Input.isRepeated = denyIfLocked(_isRepeated);
  Input.isLongPressed = denyIfLocked(_isLongPressed);
  Input.isReleased = denyIfLocked(_isReleased);

  /** CSV を配列へ */
  const parseKeys = str => str.split(',').map(s => s.trim()).filter(Boolean);

  /** lock / unlock core */
  const lockKeys = keys => keys.forEach(k => locked.add(k));
  const unlockKeys = keys => keys.forEach(k => locked.delete(k));

  /* プラグインコマンド登録 */
  const pluginName = document.currentScript.src.split('/').pop().replace(/\.js$/, '');

  PluginManager.registerCommand(pluginName, 'lockKey', args => {
    const keys = parseKeys(args.keyName || '');
    lockKeys(keys);
  });

  PluginManager.registerCommand(pluginName, 'unlockKey', args => {
    const keys = parseKeys(args.keyName || '');
    unlockKeys(keys);
  });

  PluginManager.registerCommand(pluginName, 'unlockAll', () => {
    locked.clear();
  });

  // 右クリック（キャンセル相当）は TouchInput.isCancelled() 経由のため、ここもロック対象にする
  const _touchIsCancelled = TouchInput.isCancelled;
  TouchInput.isCancelled = function () {
    const result = _touchIsCancelled.call(this);
    const cancelLocked = locked.has('cancel');
    const menuLocked = locked.has('menu');
    if (result && (cancelLocked || menuLocked)) {
      return false;
    }
    return result;
  };
})();
