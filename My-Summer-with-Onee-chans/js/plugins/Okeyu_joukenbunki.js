/*:
 * @target MZ
 * @plugindesc 条件分岐＋スイッチ・変数操作＋制御文字展開対応の完全拡張プラグイン 改良版
 * @author Okeyu 
 * 
 * @param debug
 * @text デバッグログ
 * @type boolean
 * @default false
 * @desc true にすると Console に詳細ログを出します
 *
 * @command CheckConditions
 * @text 条件分岐チェック（制御文字対応）
 *
 * @arg mapIds
 * @type string
 * @text マップID配列（例: 1,3,5） 空なら全マップ
 *
 * @arg switchId
 * @type switch
 * @text 判定対象スイッチID
 *
 * @arg variableId
 * @type variable
 * @text 判定対象変数ID
 *
 * @arg operator
 * @type select
 * @option ===
 * @option !==
 * @option >
 * @option <
 * @option >=
 * @option <=
 * @text 比較演算子
 *
 * @arg value
 * @type string
 * @text 判定値（制御文字可）
 *
 * @arg mode
 * @type select
 * @option AND
 * @option OR
 * @text 判定モード（AND / OR）
 *
 * @arg commonEventId
 * @type common_event
 * @text 条件成立時に呼び出すコモンイベント
 *
 * @arg setSwitchId
 * @type switch
 * @text 条件成立時に操作するスイッチID
 * @default 0
 *
 * @arg setSwitchValue
 * @type boolean
 * @text スイッチの値（true=ON / false=OFF）
 * @default true
 *
 * @arg setVariableId
 * @type variable
 * @text 条件成立時に操作する変数ID
 * @default 0
 *
 * @arg setVariableValue
 * @type string
 * @text 変数に代入する値（制御文字可）
 * @default 0
 *
 * @arg setVariableMode
 * @type select
 * @option set
 * @option add
 * @option sub
 * @text 変数操作モード（set=代入 / add=加算 / sub=減算）
 * @default set
 */

(() => {
  const pluginName = "Okeyu_joukenbunki";
  const parameters = PluginManager.parameters(pluginName) || {};
  const DEBUG = String(parameters.debug || "false") === "true";

  function log(...args) {
    if (DEBUG) console.log("[CheckConditions]", ...args);
  }

  // 制御文字展開: 基本的なものを安全に展開する。未定義は空文字／0でガード
  function convertEscapeCharactersSafe(text) {
    if (text === null || text === undefined) return "";
    let t = String(text);

    // \V[n] \S[n] 等を段階的に置換（入れ子の簡易対応: 2パス）
    const replaceOnce = s => s
      .replace(/\\V\[(\d+)\]/gi, (_, n) => String($gameVariables.value(Number(n)) ?? ""))
      .replace(/\\S\[(\d+)\]/gi, (_, n) => String($gameSwitches.value(Number(n)) ? 1 : 0))
      .replace(/\\N\[(\d+)\]/gi, (_, n) => String($gameActors.actor(Number(n)) ? $gameActors.actor(Number(n)).name() : ""))
      .replace(/\\P\[(\d+)\]/gi, (_, n) => 
        {        const idx = Number(n);        return String($gameParty.members()[idx] ? $gameParty.members()[idx].name() : "");
      })
      .replace(/\\T\[(\d+)\]/gi, () => String(Math.floor($gameTimer ? ($gameTimer._frames / 60) : 0)))
      .replace(/\\G/gi, TextManager.currencyUnit)
      .replace(/\\C\[(\d+)\]/gi, "") // 色指定は表示系で意味を持つためここでは除去
      .replace(/\\./g, match => {        // 未知のエスケープはそのまま残す（安全上の措置）
        return match;
      });

    // 2パスで入れ子系の展開にある程度対応（必要なら回数増やす）
    t = replaceOnce(t);
    t = replaceOnce(t);

    return t;
  }

  // 数値判定ユーティリティ: 文字列が数値表現なら Number を返し、そうでなければ元文字列
  function parsePreferNumber(val) {
    if (val === null || val === undefined) return val;
    if (typeof val === "number") return val;
    const s = String(val).trim();
    if (s.length === 0) return s;
    // 整数・小数の判定 (先頭 +/− 許可)
    if (/^[+-]?\d+(\.\d+)?$/.test(s)) {
      const n = Number(s);
      if (!Number.isNaN(n)) return n;
    }
    return s;
  }

  // safe includes for map list: 空＝全マップ（true）
  function parseMapIds(text) {
    if (text === null || text === undefined) return null;
    const s = String(text).trim();
    if (s.length === 0) return null; // null = all maps
    return s.split(",").map(x => {
      const n = Number(x.trim());
      return Number.isInteger(n) ? n : NaN;
    }).filter(x => !Number.isNaN(x));
  }

  // operator 判定（厳密）
  function compareValues(lhs, rhs, operator) {
    // 同型数値なら数値比較、そうでなければ文字列比較（ただし >= <= は数値でないと真にしない）
    const a = parsePreferNumber(lhs);
    const b = parsePreferNumber(rhs);

    const bothNumber = (typeof a === "number" && typeof b === "number");

    switch (operator) {
      case "===": return a === b;
      case "!==": return a !== b;
      case ">":
        if (!bothNumber) return false;
        return a > b;
      case "<":
        if (!bothNumber) return false;
        return a < b;
      case ">=":
        if (!bothNumber) return false;
        return a >= b;
      case "<=":
        if (!bothNumber) return false;
        return a <= b;
      default:
        return false;
    }
  }

  PluginManager.registerCommand(pluginName, "CheckConditions", args => {
    try {
      log("Raw args:", args);

      // 安全に展開
      const rawMapIds = args.mapIds ?? "";
      const mapIds = parseMapIds(convertEscapeCharactersSafe(rawMapIds));
      log("Parsed mapIds:", mapIds === null ? "(all maps)" : mapIds);

      const switchId = Number(args.switchId || 0);
      const variableId = Number(args.variableId || 0);
      const operator = args.operator || "===";
      const rawValue = convertEscapeCharactersSafe(args.value ?? "");
      const mode = (args.mode || "AND").toUpperCase() === "OR" ? "OR" : "AND";
      const commonEventId = Number(args.commonEventId || 0);

      const setSwitchId = Number(args.setSwitchId || 0);
      const setSwitchValue = args.setSwitchValue === "true";
      const setVariableId = Number(args.setVariableId || 0);
      const rawSetValue = convertEscapeCharactersSafe(args.setVariableValue ?? "0");
      const setVariableMode = (args.setVariableMode || "set").toLowerCase();

      // 入力検証
      if (switchId < 0 || variableId < 0) {
        log("Invalid IDs: switchId or variableId negative.");
      }

      const currentMapId = $gameMap ? $gameMap.mapId() : 0;
      const mapMatch = (mapIds === null) ? true : mapIds.includes(currentMapId);
      log("CurrentMap:", currentMapId, "mapMatch:", mapMatch);

      // スイッチ・変数の取得（存在しないIDは安全に扱う）
      const switchOn = switchId > 0 ? !!$gameSwitches.value(switchId) : false;
      const variableVal = variableId > 0 ? $gameVariables.value(variableId) : undefined;

      // 比較値の型解釈
      const left = variableVal;
      const right = parsePreferNumber(rawValue);
      const variableMatch = (variableId > 0) ? compareValues(left, right, operator) : false;

      log("Switch:", switchId, "value:", switchOn);
      log("Variable:", variableId, "value:", variableVal, "compareTo:", right, "operator:", operator, "match:", variableMatch);

      // 結果評価（厳密）
      let result = false;
      if (mode === "AND") {
        // mapMatch と (switchId は指定されていなければ true) と (variableId 指定がなければ true)
        const switchCondition = (switchId > 0) ? switchOn : true;
        const variableCondition = (variableId > 0) ? variableMatch : true;
        result = mapMatch && switchCondition && variableCondition;
      } else { // OR
        const switchCondition = (switchId > 0) ? switchOn : false;
        const variableCondition = (variableId > 0) ? variableMatch : false;
        result = (mapMatch) || switchCondition || variableCondition;
      }

      log("Final result:", result);

      if (result) {
        if (commonEventId > 0 && $dataCommonEvents[commonEventId]) {
          $gameTemp.reserveCommonEvent(commonEventId);
          log("Reserved common event:", commonEventId);
        } else if (commonEventId > 0) {
          log("Common event id not found:", commonEventId);
        }

        if (setSwitchId > 0) {
          $gameSwitches.setValue(setSwitchId, !!setSwitchValue);
          log("Set switch:", setSwitchId, !!setSwitchValue);
        }

        if (setVariableId > 0) {
          const resolvedSetValue = parsePreferNumber(rawSetValue);
          if (setVariableMode === "set") {
            $gameVariables.setValue(setVariableId, resolvedSetValue);
            log("Set variable:", setVariableId, resolvedSetValue);
          } else if (setVariableMode === "add") {
            const before = Number($gameVariables.value(setVariableId) || 0);
            const addVal = Number(resolvedSetValue || 0);
            $gameVariables.setValue(setVariableId, before + addVal);
            log("Add variable:", setVariableId, before, "+", addVal, "=", $gameVariables.value(setVariableId));
          } else if (setVariableMode === "sub") {
            const before = Number($gameVariables.value(setVariableId) || 0);
            const subVal = Number(resolvedSetValue || 0);
            $gameVariables.setValue(setVariableId, before - subVal);
            log("Sub variable:", setVariableId, before, "-", subVal, "=", $gameVariables.value(setVariableId));
          } else {
            log("Unknown setVariableMode:", setVariableMode);
          }
        }
      }
    } catch (e) {
      console.error("[CheckConditions] Exception:", e && e.stack ? e.stack : e);
    }
  });
})();
