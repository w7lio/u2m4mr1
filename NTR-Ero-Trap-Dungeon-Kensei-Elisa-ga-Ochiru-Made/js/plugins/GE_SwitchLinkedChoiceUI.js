//=============================================================================
// GE_SwitchLinkedChoiceUI.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc スイッチON中のみ、選択肢と同様のウィンドウで複数ボタンを表示しコモンを実行します。
 * @author Good Emotion (NTRETD)
 * @url
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param maxRows
 * @text 最大表示行数
 * @desc ボタンが多いときの上限（デフォルトの選択肢に近い挙動）。
 * @type number
 * @default 8
 * @min 1
 * @max 20
 *
 * @param positionOffsetX
 * @text 位置調整・横（ピクセル）
 * @desc 水平位置（左／中央／右）の計算後に加算します。正で右、負で左。中央基準の微調整に使えます。
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param positionOffsetY
 * @text 位置調整・縦（ピクセル）
 * @desc 垂直位置（上／中央／下）の計算後に加算します。正で下、負で上。中央基準の微調整に使えます。
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param buttonListBackgroundType
 * @text ボタン一覧の背景
 * @desc タイトル画面の「コマンドウィンドウの背景」と同じ区分です。透明のメニュー風にしたい場合は「透明」を選びます。
 * @type select
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default 0
 *
 * @param muteCursorSoundOnShow
 * @text 一覧表示直後のカーソル音を鳴らさない
 * @desc 表示スイッチONで一覧が出た直後、または行の表示／活性スイッチの変化で一覧が再構築された直後（数フレーム）だけカーソル移動音を抑止します。ボタン決定時のOK音・バッザーは変えません。
 * @type boolean
 * @default true
 *
 * @param layoutSoundSuppressFrames
 * @text カーソル抑止フレーム数
 * @desc 一覧の生成・再構築の直後、このフレーム数だけカーソルSEを抑止します。ウィンドウ内だけでなく SoundManager.playCursor 全体に効きます（他UIから鳴るカーソルも止める用途）。0で無効。
 * @type number
 * @default 60
 * @min 0
 * @max 180
 *
 * @param suppressEventSeAfterLayoutFrames
 * @text レイアウト直後のイベントSE抑止フレーム
 * @desc 一覧の生成・再構築の直後、このフレーム数だけ AudioManager.playSe（コモン「SEの演奏」等）を無視します。システム音だけでは消えないときに試す。0で無効。
 * @type number
 * @default 0
 * @min 0
 * @max 180
 *
 * @param suppressPlaySeMatchingSystemSoundsWhileSwitchUiVisible
 * @text 一覧表示中・システム音と同名のSE演奏を無視
 * @desc ONのとき、表示スイッチONのあいだ、コモン「SEの演奏」でシステムのカーソル／決定と同じファイル名のSEのみ鳴らさないようにします（キャンセル・バッザーは対象外。戻り操作の音を止めないため）。
 * @type boolean
 * @default true
 *
 * @param suppressBgsWhileSwitchChoiceDisplayOn
 * @text 表示スイッチON中はBGS演奏を無視
 * @desc ONのとき、登録の表示スイッチがONのあいだ AudioManager.playBgs を無視します。一覧表示と同タイミングのコモン「BGSの演奏」対策。意図したBGSまで止めるため本番はOFF推奨。
 * @type boolean
 * @default false
 *
 * @help
 * プラグインコマンドで「登録」すると、指定スイッチがONのあいだ
 * マップ／戦闘画面に Window_Command ベースの選択肢風ウィンドウが表示されます。
 *
 * 各ボタンにコモンイベントを割り当てられます。決定時は
 * PluginCommonBase の動的コモン（$gameMap / $gameTroop の setupDynamicCommon）で実行します。
 *
 * ■ボタン行の扱い
 * - 表示文言が空で、コモン番号が設定されている場合はコモン名を表示します。
 * - 表示文言が空で、コモン番号も0の場合は表示されません。
 *
 * ■ボタンの表示／活性条件
 * - 表示スイッチ（choiceNSwitchId）: 0（未設定）なら常に表示、設定した場合はONのときだけ表示。
 * - 活性スイッチ（choiceNEnableSwitchId）: 0（未設定）なら常に押せる、設定した場合はONのときだけ押せる。
 *   ※活性スイッチOFFでもボタンは表示され、非活性（グレー）になります。
 *
 * ■ウィンドウ位置
 * プラグインパラメータ「位置調整・横／縦」で、コマンドの水平・垂直位置に加えてピクセル単位でずらせます。
 * 中央に寄せたうえで左右・上下に微調整する用途を想定しています（左／右などでも同じ値が加算されます）。
 * 登録コマンドの「位置オフセット・X／Y」は、そのあとにさらに加算されます（登録ごとに指定可能）。
 *
 * ■ボタン一覧の見た目
 * 「ボタン一覧の背景」は、RPGツクールMZの Window#setBackgroundType にそのまま渡します（標準の選択肢と同じ 0/1/2）。
 * 登録コマンドで「一覧の背景」を選ぶとその登録だけ上書きし、「プラグイン設定に従う」のときは本パラメータの値を使います。
 * タイトルと揃えるなら、データベース「システム2」→ タイトルコマンドウィンドウの「背景」と同じ値にすると近い見え方になります。
 *
 * ■一覧表示時の音
 * 「一覧表示直後のカーソル音を鳴らさない」がONのとき、システムのカーソル／決定は AudioManager.playStaticSe 経由で抑止します。
 * 抑止の基準は「ウィンドウを新規作成したあとの最初のレイアウト」のみです。行の再表示で refresh が何度も走っても基準を更新しないため、一覧が出続ける場面で抑止が延び続けません。
 * ボタン決定音は onChoiceOk 内のみ許可します。
 * イベントSE抑止は「レイアウト直後のイベントSE抑止フレーム」を 0 より大きくしたとき同じ基準で効きます。
 *
 * ■補足（音まわり）
 * - 並列コモンが先に「SEの演奏」すると、表示スイッチONのあいだ「システム音と同名のSE演奏を無視」でカーソル／決定ファイルの二重を防げます。
 * - 「表示スイッチON中はBGS演奏を無視」は任意。意図したBGSまで止まる場合はOFFのままコモンを調整してください。
 *
 * @command REGISTER_SWITCH_CHOICE_UI
 * @text 登録：スイッチ連動選択肢UI
 * @desc 表示条件スイッチとボタン一覧を登録します。
 *
 * @arg entryId
 * @text 登録ID
 * @desc このUIの識別番号。解除や上書きに使います。
 * @type number
 * @default 1
 * @min 1
 *
 * @arg switchId
 * @text 表示スイッチ
 * @desc ONの間だけウィンドウを表示します。
 * @type switch
 * @default 0
 *
 * @arg horizontalAlign
 * @text 水平位置
 * @type select
 * @option 左
 * @value left
 * @option 中央
 * @value center
 * @option 右
 * @value right
 * @default center
 *
 * @arg verticalAlign
 * @text 垂直位置
 * @type select
 * @option 上
 * @value top
 * @option 中央
 * @value center
 * @option 下
 * @value bottom
 * @default center
 *
 * @arg listBackgroundType
 * @text 一覧の背景（ウィンドウ種類）
 * @desc 標準イベント「選択肢の表示」と同じ区分（Window#setBackgroundType）。プラグイン設定に従う＝パラメータ「ボタン一覧の背景」と同じ。
 * @type select
 * @option プラグイン設定に従う
 * @value -1
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default -1
 *
 * @arg windowOffsetX
 * @text 位置オフセット・X（ピクセル）
 * @desc 水平配置とプラグイン「位置調整・横」のあとに加算。正で右、負で左。
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg windowOffsetY
 * @text 位置オフセット・Y（ピクセル）
 * @desc 垂直配置とプラグイン「位置調整・縦」のあとに加算。正で下、負で上。
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg choice1Text
 * @text ボタン1・表示文言
 * @type string
 * @default
 *
 * @arg choice1SwitchId
 * @text ボタン1・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice1EnableSwitchId
 * @text ボタン1・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice1ShowTextWhenDisabledSwitchId
 * @text ボタン1・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice1Order
 * @text ボタン1・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（1）扱いです。
 * @type number
 * @default 1
 *
 * @arg choice1Common
 * @text ボタン1・コモン番号
 * @desc F9のコモン番号。0＝この行は出しません。
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice2Text
 * @text ボタン2・表示文言
 * @type string
 * @default
 *
 * @arg choice2SwitchId
 * @text ボタン2・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice2EnableSwitchId
 * @text ボタン2・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice2ShowTextWhenDisabledSwitchId
 * @text ボタン2・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice2Order
 * @text ボタン2・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（2）扱いです。
 * @type number
 * @default 2
 *
 * @arg choice2Common
 * @text ボタン2・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice3Text
 * @text ボタン3・表示文言
 * @type string
 * @default
 *
 * @arg choice3SwitchId
 * @text ボタン3・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice3EnableSwitchId
 * @text ボタン3・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice3ShowTextWhenDisabledSwitchId
 * @text ボタン3・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice3Order
 * @text ボタン3・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（3）扱いです。
 * @type number
 * @default 3
 *
 * @arg choice3Common
 * @text ボタン3・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice4Text
 * @text ボタン4・表示文言
 * @type string
 * @default
 *
 * @arg choice4SwitchId
 * @text ボタン4・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice4EnableSwitchId
 * @text ボタン4・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice4ShowTextWhenDisabledSwitchId
 * @text ボタン4・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice4Order
 * @text ボタン4・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（4）扱いです。
 * @type number
 * @default 4
 *
 * @arg choice4Common
 * @text ボタン4・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice5Text
 * @text ボタン5・表示文言
 * @type string
 * @default
 *
 * @arg choice5SwitchId
 * @text ボタン5・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice5EnableSwitchId
 * @text ボタン5・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice5ShowTextWhenDisabledSwitchId
 * @text ボタン5・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice5Order
 * @text ボタン5・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（5）扱いです。
 * @type number
 * @default 5
 *
 * @arg choice5Common
 * @text ボタン5・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice6Text
 * @text ボタン6・表示文言
 * @type string
 * @default
 *
 * @arg choice6SwitchId
 * @text ボタン6・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice6EnableSwitchId
 * @text ボタン6・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice6ShowTextWhenDisabledSwitchId
 * @text ボタン6・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice6Order
 * @text ボタン6・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（6）扱いです。
 * @type number
 * @default 6
 *
 * @arg choice6Common
 * @text ボタン6・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice7Text
 * @text ボタン7・表示文言
 * @type string
 * @default
 *
 * @arg choice7SwitchId
 * @text ボタン7・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice7EnableSwitchId
 * @text ボタン7・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice7ShowTextWhenDisabledSwitchId
 * @text ボタン7・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice7Order
 * @text ボタン7・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（7）扱いです。
 * @type number
 * @default 7
 *
 * @arg choice7Common
 * @text ボタン7・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice8Text
 * @text ボタン8・表示文言
 * @type string
 * @default
 *
 * @arg choice8SwitchId
 * @text ボタン8・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice8EnableSwitchId
 * @text ボタン8・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice8ShowTextWhenDisabledSwitchId
 * @text ボタン8・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice8Order
 * @text ボタン8・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（8）扱いです。
 * @type number
 * @default 8
 *
 * @arg choice8Common
 * @text ボタン8・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice9Text
 * @text ボタン9・表示文言
 * @type string
 * @default
 *
 * @arg choice9SwitchId
 * @text ボタン9・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice9EnableSwitchId
 * @text ボタン9・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice9ShowTextWhenDisabledSwitchId
 * @text ボタン9・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice9Order
 * @text ボタン9・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（9）扱いです。
 * @type number
 * @default 9
 *
 * @arg choice9Common
 * @text ボタン9・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice10Text
 * @text ボタン10・表示文言
 * @type string
 * @default
 *
 * @arg choice10SwitchId
 * @text ボタン10・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice10EnableSwitchId
 * @text ボタン10・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice10ShowTextWhenDisabledSwitchId
 * @text ボタン10・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice10Order
 * @text ボタン10・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（10）扱いです。
 * @type number
 * @default 10
 *
 * @arg choice10Common
 * @text ボタン10・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg choice11Text
 * @text ボタン11・表示文言
 * @type string
 * @default
 *
 * @arg choice11SwitchId
 * @text ボタン11・表示スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice11EnableSwitchId
 * @text ボタン11・活性スイッチ（任意）
 * @type switch
 * @default 0
 *
 * @arg choice11ShowTextWhenDisabledSwitchId
 * @text ボタン11・非活性時 文言表示スイッチ（任意）
 * @desc 非活性（グレー）になっている間、ONなら元の文言のまま表示、OFFならマスク文言を表示します。0（未設定）はON扱い（=元の文言を表示）です。maskTextWhenDisabled が false の場合は常に元の文言を表示します。
 * @type switch
 * @default 0
 *
 * @arg choice11Order
 * @text ボタン11・表示順（任意）
 * @desc 数値が小さいほど上に表示します。同値の場合はボタン番号順です。未設定はボタン番号（11）扱いです。
 * @type number
 * @default 11
 *
 * @arg choice11Common
 * @text ボタン11・コモン番号
 * @type number
 * @default 0
 * @min 0
 *
 * @arg maskTextWhenDisabled
 * @text 無効時は文言をマスクする
 * @desc 活性スイッチOFFなどで非活性（グレー）になる行の表示文言を、指定のマスク文言に置き換えます（押せない挙動はそのまま）。
 * @type boolean
 * @default false
 *
 * @arg maskedText
 * @text マスク文言
 * @desc 無効時に表示する文言です。空の場合は「？？？」になります。
 * @type string
 * @default ？？？
 *
 * @command REMOVE_SWITCH_CHOICE_UI
 * @text 解除：スイッチ連動選択肢UI
 * @desc 指定した登録IDを削除します。
 *
 * @arg entryId
 * @text 登録ID
 * @type number
 * @default 1
 * @min 1
 *
 * @command CLEAR_SWITCH_CHOICE_UI
 * @text 全解除：スイッチ連動選択肢UI
 * @desc すべての登録を削除します。
 */

(() => {
    "use strict";

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);
    const maxRows = Math.max(1, Math.min(20, Number(param.maxRows || 8)));
    const positionOffsetX = Number(param.positionOffsetX || 0) || 0;
    const positionOffsetY = Number(param.positionOffsetY || 0) || 0;
    const rawButtonBg = Number(param.buttonListBackgroundType);
    const buttonListBackgroundType = [0, 1, 2].includes(rawButtonBg)
        ? rawButtonBg
        : 0;
    const muteCursorSoundOnShow = param.muteCursorSoundOnShow !== false;
    const layoutSoundSuppressFrames = Math.max(
        0,
        Math.min(180, Number(param.layoutSoundSuppressFrames ?? 60) || 0)
    );
    const suppressEventSeAfterLayoutFrames = Math.max(
        0,
        Math.min(180, Number(param.suppressEventSeAfterLayoutFrames ?? 0) || 0)
    );
    const suppressPlaySeMatchingSystemSoundsWhileSwitchUiVisible =
        param.suppressPlaySeMatchingSystemSoundsWhileSwitchUiVisible !== false;
    const suppressBgsWhileSwitchChoiceDisplayOn =
        param.suppressBgsWhileSwitchChoiceDisplayOn === true ||
        String(param.suppressBgsWhileSwitchChoiceDisplayOn) === "true";
    const FLAT_CHOICE_SLOTS = 11;
    let _geLastSwitchUiAdjustFrame = -9999999;
    /** onChoiceOk からの SoundManager.playOk のみ true（システム決定音の抑止を解除） */
    let _geAllowSwitchChoiceUiOkSound = false;

    /**
     * PluginCommonBase の setupDynamicCommon は _dynamicEvents 上で動くが、
     * 本体の Game_Map#isEventRunning / Game_Troop#isEventRunning はメインインタプリタのみ参照する。
     * そのため動的コモン実行中に isMenuEnabled 等が true になり、右クリックでメニューが開くことがある。
     */
    function geHasRunningDynamicEvents(unit) {
        const de = unit && unit._dynamicEvents;
        if (!de || !de.length) return false;
        for (let i = 0; i < de.length; i++) {
            if (de[i].isRunning()) return true;
        }
        return false;
    }

    const _Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
    Game_Map.prototype.isEventRunning = function() {
        return _Game_Map_isEventRunning.call(this) || geHasRunningDynamicEvents(this);
    };

    const _Game_Troop_isEventRunning = Game_Troop.prototype.isEventRunning;
    Game_Troop.prototype.isEventRunning = function() {
        return _Game_Troop_isEventRunning.call(this) || geHasRunningDynamicEvents(this);
    };

    function runChoiceCommon(commonEventId) {
        const id = Number(commonEventId);
        if (!id || id <= 0) return;
        if ($gameParty.inBattle()) {
            if ($gameTroop.setupDynamicCommon) $gameTroop.setupDynamicCommon(id);
            else $gameTemp.reserveCommonEvent(id);
        } else {
            if ($gameMap.setupDynamicCommon) $gameMap.setupDynamicCommon(id);
            else $gameTemp.reserveCommonEvent(id);
        }
    }

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._switchChoiceUiEntries = [];
        this._geSwitchChoiceUiEscapeLock = false;
        this._geSwitchChoiceUiEscapeLockMinFrame = 0;
    };

    const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function() {
        _Game_System_onAfterLoad.apply(this, arguments);
        if (!this._switchChoiceUiEntries) this._switchChoiceUiEntries = [];
        if (this._geSwitchChoiceUiEscapeLock == null) this._geSwitchChoiceUiEscapeLock = false;
        if (this._geSwitchChoiceUiEscapeLockMinFrame == null) this._geSwitchChoiceUiEscapeLockMinFrame = 0;
    };

    /**
     * EscapeKeyCommonEvent が isMenuEnabled のみ見て ESC コモンを呼ぶため、
     * 動的コモン終了直後などの隙を防ぐ。並列コモン／全マップイベントの interpreter は
     * 連鎖と無関係でも isRunning になり得るため含めない（終了後も数秒 ESC 不能になる）。
     * 動的コモンは Game_Map#isEventRunning 拡張で拾う。
     */
    Game_System.prototype.geShouldBlockEscapeFromSwitchUi = function() {
        if (!this._geSwitchChoiceUiEscapeLock) return false;
        const minF = Number(this._geSwitchChoiceUiEscapeLockMinFrame) || 0;
        if (Graphics.frameCount < minF) return true;
        if (!$gameMap) {
            this._geSwitchChoiceUiEscapeLock = false;
            return false;
        }
        if ($gameMessage.isBusy()) return true;
        if ($gameMap.isEventRunning()) return true;
        this._geSwitchChoiceUiEscapeLock = false;
        return false;
    };

    Game_System.prototype.switchChoiceUiEntries = function() {
        if (!this._switchChoiceUiEntries) this._switchChoiceUiEntries = [];
        return this._switchChoiceUiEntries;
    };

    function choiceLabelFromCommonId(commonEventId) {
        const ev = $dataCommonEvents && $dataCommonEvents[commonEventId];
        const name = ev && ev.name ? String(ev.name).trim() : "";
        return name.length > 0 ? name : "コモン " + commonEventId;
    }

    function choicesFromFlatArgs(args) {
        const choices = [];
        for (let i = 1; i <= FLAT_CHOICE_SLOTS; i++) {
            const textKey = `choice${i}Text`;
            const visibleSwitchKey = `choice${i}SwitchId`;
            const enableSwitchKey = `choice${i}EnableSwitchId`;
            const showTextWhenDisabledSwitchKey = `choice${i}ShowTextWhenDisabledSwitchId`;
            const orderKey = `choice${i}Order`;
            const commonKey = `choice${i}Common`;

            let text = String(args[textKey] != null ? args[textKey] : "").trim();
            const switchId = Number(args[visibleSwitchKey] || 0) || 0;
            const enableSwitchId = Number(args[enableSwitchKey] || 0) || 0;
            const showTextWhenDisabledSwitchId = Number(args[showTextWhenDisabledSwitchKey] || 0) || 0;
            const orderRaw = Number(args[orderKey]);
            const order = Number.isFinite(orderRaw) ? Math.round(orderRaw) : i;
            const commonEventId = Number(args[commonKey] || 0) || 0;

            if (!text && commonEventId > 0) text = choiceLabelFromCommonId(commonEventId);
            if (text.length > 0) {
                choices.push({
                    text,
                    commonEventId,
                    switchId,
                    enableSwitchId,
                    showTextWhenDisabledSwitchId,
                    order,
                    __flatIndex: i,
                });
            }
        }
        choices.sort((a, b) => {
            const ao = Number(a.order);
            const bo = Number(b.order);
            if (ao !== bo) return ao - bo;
            const ai = Number(a.__flatIndex);
            const bi = Number(b.__flatIndex);
            return ai - bi;
        });
        return choices;
    }

    function choicesFromLegacyChoicesArg(raw) {
        let parsed = raw;
        if (typeof parsed === "string") {
            try {
                parsed = JSON.parse(parsed);
            } catch (e) {
                parsed = [];
            }
        }
        parsed = Array.isArray(parsed) ? parsed : [];
        const choices = [];
        let idx = 0;
        for (const c of parsed) {
            idx++;
            if (c !== null && typeof c === "object" && !Array.isArray(c)) {
                let text = String(c.text != null ? c.text : "").trim();
                const rawId =
                    c.commonEventId != null ? c.commonEventId : c.commonEvent != null ? c.commonEvent : 0;
                const commonEventId = Number(rawId) || 0;
                const orderRaw = Number(c.order);
                const order = Number.isFinite(orderRaw) ? Math.round(orderRaw) : idx;
                if (!text && commonEventId > 0) text = choiceLabelFromCommonId(commonEventId);
                if (text.length > 0) {
                    choices.push({
                        text,
                        commonEventId,
                        switchId: 0,
                        enableSwitchId: 0,
                        showTextWhenDisabledSwitchId: 0,
                        order,
                        __flatIndex: idx,
                    });
                }
            } else if (c != null && c !== "") {
                const text = String(c).trim();
                if (text.length > 0) {
                    choices.push({
                        text,
                        commonEventId: 0,
                        switchId: 0,
                        enableSwitchId: 0,
                        showTextWhenDisabledSwitchId: 0,
                        order: idx,
                        __flatIndex: idx,
                    });
                }
            }
        }
        choices.sort((a, b) => {
            const ao = Number(a.order);
            const bo = Number(b.order);
            if (ao !== bo) return ao - bo;
            const ai = Number(a.__flatIndex);
            const bi = Number(b.__flatIndex);
            return ai - bi;
        });
        return choices;
    }

    function geEffectiveListBackgroundType(entry) {
        const t = entry && entry.listBackgroundType;
        if (t === 0 || t === 1 || t === 2) return t;
        return buttonListBackgroundType;
    }

    function parseOptionalListBackgroundType(args) {
        const raw = args.listBackgroundType;
        if (raw === undefined || raw === null || raw === "") return null;
        const n = Number(raw);
        if (Number.isNaN(n) || n < 0) return null;
        return [0, 1, 2].includes(n) ? n : null;
    }

    function parseWindowOffsetPx(raw) {
        const n = Number(raw);
        if (!Number.isFinite(n)) return 0;
        return Math.max(-9999, Math.min(9999, Math.round(n)));
    }

    function normalizeEntry(args) {
        const id = Number(args.entryId);
        const switchId = Number(args.switchId || 0);
        const hAlign = String(args.horizontalAlign || "center");
        const vAlign = String(args.verticalAlign || "center");
        const listBackgroundType = parseOptionalListBackgroundType(args);
        const windowOffsetX = parseWindowOffsetPx(args.windowOffsetX);
        const windowOffsetY = parseWindowOffsetPx(args.windowOffsetY);
        const maskTextWhenDisabled = String(args.maskTextWhenDisabled || "false") === "true";
        const maskedTextRaw = String(args.maskedText != null ? args.maskedText : "？？？").trim();
        const maskedText = maskedTextRaw.length > 0 ? maskedTextRaw : "？？？";
        let choices = choicesFromFlatArgs(args);
        if (choices.length === 0 && args.choices != null) choices = choicesFromLegacyChoicesArg(args.choices);
        return {
            id,
            switchId,
            hAlign,
            vAlign,
            listBackgroundType,
            windowOffsetX,
            windowOffsetY,
            maskTextWhenDisabled,
            maskedText,
            choices,
        };
    }

    function registerEntry(entry) {
        const list = $gameSystem.switchChoiceUiEntries();
        const idx = list.findIndex(e => e.id === entry.id);
        if (idx >= 0) list[idx] = entry;
        else list.push(entry);
    }

    PluginManagerEx.registerCommand(script, "REGISTER_SWITCH_CHOICE_UI", args => {
        const entry = normalizeEntry(args);
        if (entry.id <= 0 || entry.switchId <= 0) return;
        if (entry.choices.length === 0) return;
        registerEntry(entry);
    });

    PluginManagerEx.registerCommand(script, "REMOVE_SWITCH_CHOICE_UI", args => {
        const id = Number(args.entryId);
        if (id <= 0) return;
        const list = $gameSystem.switchChoiceUiEntries();
        $gameSystem._switchChoiceUiEntries = list.filter(e => e.id !== id);
    });

    PluginManagerEx.registerCommand(script, "CLEAR_SWITCH_CHOICE_UI", () => {
        $gameSystem._switchChoiceUiEntries = [];
    });

    function Window_SwitchChoiceUI(entry) {
        this._entry = entry;
        this._entryKey = JSON.stringify(entry);
        /** インスタンス生成後の最初の adjustFrame だけ true（グローバル抑止の基準フレームはここ一度だけ） */
        this._geFirstAdjustPending = true;
        /** 初回レイアウトのフレーム（ウィンドウ単位のカーソル抑止に使用。refresh では更新しない） */
        this._geWindowCreatedFrame = null;
        const rect = new Rectangle(0, 0, 96, 96);
        Window_Selectable.prototype.initialize.call(this, rect);
        this.setBackgroundType(geEffectiveListBackgroundType(entry));
        this.adjustFrame();
        this.openness = 255;
        this.select(0);
        this.activate();
        this.setHandler("choice", this.onChoiceOk.bind(this));
    }

    Window_SwitchChoiceUI.prototype = Object.create(Window_Command.prototype);
    Window_SwitchChoiceUI.prototype.constructor = Window_SwitchChoiceUI;

    Window_SwitchChoiceUI.prototype.entryKey = function() {
        return this._entryKey;
    };

    Window_SwitchChoiceUI.prototype.setEntry = function(entry) {
        this._entry = entry;
        this._entryKey = JSON.stringify(entry);
        this.setBackgroundType(geEffectiveListBackgroundType(entry));
        this.adjustFrame();
        this.select(Math.min(this.index(), this.maxItems() - 1));
        this.activate();
    };

    Window_SwitchChoiceUI.prototype.playCursorSound = function() {
        const fc = Graphics.frameCount;
        const born = this._geWindowCreatedFrame;
        if (
            muteCursorSoundOnShow &&
            layoutSoundSuppressFrames > 0 &&
            born != null &&
            fc <= born + layoutSoundSuppressFrames
        ) {
            return;
        }
        Window_Base.prototype.playCursorSound.call(this);
    };

    function geSwitchChoiceUiOnScene() {
        const sc = SceneManager._scene;
        if (!sc) return false;
        if (sc._geSwitchChoiceUiBuilding) return true;
        return !!(sc._geSwitchChoiceUiWindows && Object.keys(sc._geSwitchChoiceUiWindows).length > 0);
    }

    /** 登録された一覧の「表示スイッチ」がいずれかONか（ウィンドウ未生成のフレームでも真になり得る） */
    function geAnySwitchChoiceDisplaySwitchOn() {
        const list = $gameSystem && $gameSystem.switchChoiceUiEntries && $gameSystem.switchChoiceUiEntries();
        if (!list || !list.length) return false;
        for (let i = 0; i < list.length; i++) {
            const e = list[i];
            if (e && e.switchId > 0 && $gameSwitches.value(e.switchId)) return true;
        }
        return false;
    }

    /**
     * システム音／イベントSE 抑止の基準フレームは「ウィンドウ新規作成後の最初の adjustFrame」のみ。
     * 行の再表示で refresh→adjustFrame が繰り返されても基準を更新しない（抑止が延び続けない）。
     */
    function geInLayoutSoundSuppressWindow() {
        if (!muteCursorSoundOnShow || layoutSoundSuppressFrames <= 0) return false;
        const fc = Graphics.frameCount;
        const last = _geLastSwitchUiAdjustFrame;
        if (last < 0 || fc < last || fc - last > layoutSoundSuppressFrames) return false;
        return geSwitchChoiceUiOnScene();
    }

    /** コモン「SEの演奏」等の抑止（基準は新規ウィンドウ初回レイアウトのみ） */
    function geInEventSeSuppressWindow() {
        if (suppressEventSeAfterLayoutFrames <= 0) return false;
        const fc = Graphics.frameCount;
        const last = _geLastSwitchUiAdjustFrame;
        if (last < 0) return false;
        const d = fc - last;
        if (d < 0 || d > suppressEventSeAfterLayoutFrames) return false;
        return geSwitchChoiceUiOnScene();
    }

    /**
     * MZ のカーソル／決定は SoundManager → AudioManager.playStaticSe で鳴り、
     * SoundManager.playCursor をラップしても内部は playStaticSe に行くため、ここで抑止する。
     */
    function geShouldSuppressPlayStaticSeForLayout(se) {
        if (!geInLayoutSoundSuppressWindow() || !se || !se.name) return false;
        const sounds = $dataSystem && $dataSystem.sounds;
        if (!sounds) return false;
        const n = String(se.name);
        const cur = sounds[0] && sounds[0].name ? String(sounds[0].name) : "";
        const okn = sounds[1] && sounds[1].name ? String(sounds[1].name) : "";
        if (cur && n === cur) return true;
        if (okn && n === okn && !_geAllowSwitchChoiceUiOkSound) return true;
        return false;
    }

    /**
     * コモン command250 がカーソル／決定と同じファイルを playSe すると二重になる。
     * キャンセル・バッザーは playSe では抑止しない（右クリック戻りのキャンセル音がコモン経由の playSe だと止まるため）。
     */
    function geShouldSuppressPlaySeMatchingSystemSounds(se) {
        if (!suppressPlaySeMatchingSystemSoundsWhileSwitchUiVisible || !muteCursorSoundOnShow) {
            return false;
        }
        if (!se || !se.name) return false;
        if (!geSwitchChoiceUiOnScene() && !geAnySwitchChoiceDisplaySwitchOn()) return false;
        const sounds = $dataSystem && $dataSystem.sounds;
        if (!sounds) return false;
        const n = String(se.name);
        for (let i = 0; i <= 1; i++) {
            const sys = sounds[i];
            if (sys && sys.name && String(sys.name) === n) return true;
        }
        return false;
    }

    /**
     * Window_Selectable#processOk は成功時に playOkSound（= 決定SE）を鳴らしてから callOkHandler する。
     * 本ウィンドウは onChoiceOk 内で SoundManager.playOk() しており二重になるうえ、
     * 表示直後などに processOk だけが先に走ると不要な決定音が鳴ることがあるため、
     * ここでは playOkSound を呼ばず onChoiceOk 側の1回に任せる。
     */
    Window_SwitchChoiceUI.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_SwitchChoiceUI.prototype.maxCols = function() {
        return 1;
    };

    Window_SwitchChoiceUI.prototype.numVisibleRows = function() {
        return Math.min(this.maxItems(), maxRows);
    };

    /**
     * 行数が増えると Window_Scrollable の上下矢印（スクロール可能サイン）が出ることがあるため、
     * 本UIでは常に非表示にする（本プラグイン利用時のみ）。
     */
    Window_SwitchChoiceUI.prototype.updateArrows = function() {
        this.downArrowVisible = false;
        this.upArrowVisible = false;
    };

    Window_SwitchChoiceUI.prototype.makeCommandList = function() {
        for (const c of this._entry.choices) {
            const visSw = Number(c.switchId) || 0;
            const visible = visSw <= 0 || $gameSwitches.value(visSw);
            if (!visible) continue;
            const enSw = Number(c.enableSwitchId) || 0;
            // 未設定（0）は ON 扱い（= 元の文言を表示／通常の活性判定へ）
            const showTextSw = Number(c.showTextWhenDisabledSwitchId) || 0;
            const showText = showTextSw <= 0 || $gameSwitches.value(showTextSw);

            // showTextSw が OFF のときは、活性判定に関係なく強制で非活性＆マスク表示にする
            const enabledByMainRule =
                (Number(c.commonEventId) || 0) > 0 &&
                (enSw <= 0 || $gameSwitches.value(enSw));
            const enabled = enabledByMainRule && showText;

            // マスク機能が有効なときのみ、showTextSw OFF の行を「？？？」にする。
            // showTextSw ON（または未設定）なら、非活性でも元の文言を表示する。
            const shouldMask = !!this._entry.maskTextWhenDisabled && !showText;
            const name = !enabled && shouldMask ? this._entry.maskedText : c.text;
            this.addCommand(name, "choice", enabled, { commonEventId: c.commonEventId });
        }
    };

    Window_SwitchChoiceUI.prototype.maxChoiceWidth = function() {
        let maxWidth = 96;
        for (const c of this._entry.choices) {
            const visSw = Number(c.switchId) || 0;
            const visible = visSw <= 0 || $gameSwitches.value(visSw);
            if (!visible) continue;
            const enSw = Number(c.enableSwitchId) || 0;
            const showTextSw = Number(c.showTextWhenDisabledSwitchId) || 0;
            const showText = showTextSw <= 0 || $gameSwitches.value(showTextSw);

            const enabledByMainRule =
                (Number(c.commonEventId) || 0) > 0 &&
                (enSw <= 0 || $gameSwitches.value(enSw));
            const enabled = enabledByMainRule && showText;

            const shouldMask = !!this._entry.maskTextWhenDisabled && !showText;
            const text = !enabled && shouldMask ? this._entry.maskedText : c.text;
            const textWidth = this.textSizeEx(text).width;
            const choiceWidth = Math.ceil(textWidth) + this.itemPadding() * 2;
            if (maxWidth < choiceWidth) maxWidth = choiceWidth;
        }
        return maxWidth;
    };

    Window_SwitchChoiceUI.prototype.windowWidth = function() {
        const width = this.maxChoiceWidth() + this.colSpacing() + this.padding * 2;
        return Math.min(width, Graphics.boxWidth);
    };

    Window_SwitchChoiceUI.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };

    Window_SwitchChoiceUI.prototype.calcPosition = function(w, h) {
        const gw = Graphics.boxWidth;
        const gh = Graphics.boxHeight;
        let x = 0;
        let y = 0;
        const ha = this._entry.hAlign;
        const va = this._entry.vAlign;
        if (ha === "center") x = (gw - w) / 2;
        else if (ha === "right") x = gw - w;
        if (va === "center") y = (gh - h) / 2;
        else if (va === "bottom") y = gh - h;
        x += positionOffsetX + (Number(this._entry.windowOffsetX) || 0);
        y += positionOffsetY + (Number(this._entry.windowOffsetY) || 0);
        return { x: Math.round(x), y: Math.round(y) };
    };

    Window_SwitchChoiceUI.prototype.adjustFrame = function() {
        this.clearCommandList();
        this.makeCommandList();
        const w = this.windowWidth();
        const h = this.windowHeight();
        const pos = this.calcPosition(w, h);
        this.move(pos.x, pos.y, w, h);
        this.createContents();
        Window_Selectable.prototype.refresh.call(this);
        const fc = Graphics.frameCount;
        if (this._geFirstAdjustPending) {
            this._geWindowCreatedFrame = fc;
            _geLastSwitchUiAdjustFrame = fc;
            this._geFirstAdjustPending = false;
        }
    };

    Window_SwitchChoiceUI.prototype.refresh = function() {
        this.adjustFrame();
    };

    Window_SwitchChoiceUI.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawTextEx(this.commandName(index), rect.x, rect.y, rect.width);
    };

    Window_SwitchChoiceUI.prototype.isCancelEnabled = function() {
        return false;
    };

    Window_SwitchChoiceUI.prototype.onChoiceOk = function() {
        if (!this.isCurrentItemEnabled()) {
            SoundManager.playBuzzer();
            return;
        }
        const ext = this.currentExt();
        if (ext && ext.commonEventId > 0) {
            _geAllowSwitchChoiceUiOkSound = true;
            SoundManager.playOk();
            _geAllowSwitchChoiceUiOkSound = false;
            $gameSystem._geSwitchChoiceUiEscapeLock = true;
            $gameSystem._geSwitchChoiceUiEscapeLockMinFrame = Graphics.frameCount + 12;
            runChoiceCommon(ext.commonEventId);
        }
    };

    Window_SwitchChoiceUI.prototype.processCancel = function() {
        SoundManager.playBuzzer();
    };

    Window_SwitchChoiceUI.prototype.processCursorMove = function() {
        const scene = SceneManager._scene;
        if (scene && scene._geSwitchChoiceUiUseGlobalNav) return;
        const beforeIndex = this.index();
        Window_Command.prototype.processCursorMove.call(this);
        const afterIndex = this.index();

        // 一覧内で移動できたなら何もしない（ここが最優先）
        if (afterIndex !== beforeIndex) return;

        // 端で上下したときだけ、別一覧へフォーカス移動
        if (!scene || !scene._geSwitchChoiceUiWindows) return;
        if (beforeIndex < 0) return;
        const max = this.maxItems();
        if (max <= 0) return;

        if (Input.isRepeated("down") && beforeIndex >= max - 1) {
            geMoveSwitchChoiceUiFocus(scene, +1);
        } else if (Input.isRepeated("up") && beforeIndex <= 0) {
            geMoveSwitchChoiceUiFocus(scene, -1);
        }
    };

    /**
     * 非アクティブの Window_Selectable は processTouch が isOpenAndActive のため無視される。
     * 別一覧にフォーカスがあるときも、クリックされた一覧へフォーカスを移して選択・決定できるようにする。
     */
    Window_SwitchChoiceUI.prototype.processTouch = function() {
        if (!this.isOpen() || !this.visible) return;
        const hitIndex = this.hitIndex();
        const scene = SceneManager._scene;
        if (!this.active && hitIndex >= 0 && scene && this._entry) {
            const needFocus =
                TouchInput.isTriggered() ||
                TouchInput.isClicked() ||
                (this.isHoverEnabled() && TouchInput.isHovered());
            if (needFocus) {
                const prevIdx = this.index();
                scene._geSwitchChoiceUiFocusEntryId = this._entry.id;
                geApplySwitchChoiceUiFocus(scene);
                this.select(hitIndex);
                if (typeof geSyncSwitchChoiceUiFlatIndex === "function") {
                    geSyncSwitchChoiceUiFlatIndex(scene);
                }
                if (TouchInput.isTriggered() && prevIdx !== hitIndex && this.playCursorSound) {
                    this.playCursorSound();
                }
            }
            if (TouchInput.isClicked()) {
                this.processOk();
            }
            return;
        }
        Window_Selectable.prototype.processTouch.call(this);
    };

    function ensureMap(scene) {
        if (!scene._geSwitchChoiceUiWindows) scene._geSwitchChoiceUiWindows = {};
    }

    function removeWindow(scene, entryId) {
        ensureMap(scene);
        const win = scene._geSwitchChoiceUiWindows[entryId];
        if (!win) return;
        if (scene._windowLayer && scene._windowLayer.children.includes(win)) scene._windowLayer.removeChild(win);
        win.destroy();
        delete scene._geSwitchChoiceUiWindows[entryId];
    }

    /**
     * 登録内容は同じでも、表示／活性に効くスイッチのON/OFFで見た目と押下可否が変わる。
     * entry の JSON だけでは検知できないため、毎フレーム値を比較して変化時に refresh する。
     */
    function entrySwitchRuntimeSignature(entry) {
        if (!entry || !entry.choices) return "";
        const parts = [];
        for (const c of entry.choices) {
            const vis = Number(c.switchId) || 0;
            if (vis > 0) {
                parts.push(`v${vis}:${$gameSwitches.value(vis) ? 1 : 0}`);
            }
            const en = Number(c.enableSwitchId) || 0;
            if (en > 0) {
                parts.push(`e${en}:${$gameSwitches.value(en) ? 1 : 0}`);
            }
        }
        return parts.join("|");
    }

    function updateSwitchChoiceUi(scene) {
        ensureMap(scene);
        const entries = $gameSystem.switchChoiceUiEntries();
        const aliveIds = new Set(entries.map(e => e.id));
        for (const id of Object.keys(scene._geSwitchChoiceUiWindows)) {
            const numId = Number(id);
            if (!aliveIds.has(numId)) removeWindow(scene, numId);
        }
        for (const entry of entries) {
            const on = entry.switchId > 0 && $gameSwitches.value(entry.switchId);
            if (!on) {
                removeWindow(scene, entry.id);
                continue;
            }
            if (!entry.choices || entry.choices.length === 0) {
                removeWindow(scene, entry.id);
                continue;
            }
            let win = scene._geSwitchChoiceUiWindows[entry.id];
            const key = JSON.stringify(entry);
            const sig = entrySwitchRuntimeSignature(entry);
            if (!win) {
                scene._geSwitchChoiceUiBuilding = true;
                win = new Window_SwitchChoiceUI(entry);
                delete scene._geSwitchChoiceUiBuilding;
                scene.addWindow(win);
                scene._geSwitchChoiceUiWindows[entry.id] = win;
                win._geSwitchUiRuntimeSig = sig;
            } else if (win.entryKey() !== key) {
                win.setEntry(entry);
                win._geSwitchUiRuntimeSig = sig;
            } else if (win._geSwitchUiRuntimeSig !== sig) {
                win._geSwitchUiRuntimeSig = sig;
                win.refresh();
            }
        }
    }

    function geSwitchChoiceUiOrderedEntryIds(scene) {
        ensureMap(scene);
        const wins = Object.entries(scene._geSwitchChoiceUiWindows)
            .map(([id, w]) => ({ id: Number(id), w }))
            .filter(o => o.id > 0 && o.w && !o.w._destroyed && o.w.visible && o.w.openness > 0);
        wins.sort((a, b) => {
            const ay = Number(a.w.y) || 0;
            const by = Number(b.w.y) || 0;
            if (ay !== by) return ay - by;
            const ax = Number(a.w.x) || 0;
            const bx = Number(b.w.x) || 0;
            return ax - bx;
        });
        return wins.map(o => o.id);
    }

    function geSwitchChoiceUiGetWindow(scene, entryId) {
        ensureMap(scene);
        const w = scene._geSwitchChoiceUiWindows && scene._geSwitchChoiceUiWindows[entryId];
        return w && !w._destroyed ? w : null;
    }

    function geApplySwitchChoiceUiFocus(scene) {
        ensureMap(scene);
        const ordered = geSwitchChoiceUiOrderedEntryIds(scene);
        if (ordered.length === 0) {
            scene._geSwitchChoiceUiFocusEntryId = null;
            return;
        }
        let focusId = Number(scene._geSwitchChoiceUiFocusEntryId) || 0;
        if (!ordered.includes(focusId)) focusId = ordered[0];
        scene._geSwitchChoiceUiFocusEntryId = focusId;

        for (const id of ordered) {
            const w = geSwitchChoiceUiGetWindow(scene, id);
            if (!w) continue;
            if (id === focusId) {
                if (w.index() < 0) {
                    const last = Number(w._geLastValidIndex);
                    const restore = Number.isFinite(last) ? last : 0;
                    w.select(Math.max(0, Math.min(restore, w.maxItems() - 1)));
                }
                w.activate();
            } else {
                if (w.index() >= 0) w._geLastValidIndex = w.index();
                w.deactivate();
                w.select(-1);
            }
        }
    }

    function geMoveSwitchChoiceUiFocus(scene, delta) {
        const ordered = geSwitchChoiceUiOrderedEntryIds(scene);
        if (ordered.length <= 1) return;
        const cur = Number(scene._geSwitchChoiceUiFocusEntryId) || ordered[0];
        const idx = Math.max(0, ordered.indexOf(cur));
        const nextIdx = (idx + delta + ordered.length) % ordered.length;
        const nextId = ordered[nextIdx];
        if (nextId === cur) return;
        scene._geSwitchChoiceUiFocusEntryId = nextId;
        geApplySwitchChoiceUiFocus(scene);
    }

    function geSwitchChoiceUiFlatItems(scene) {
        const ordered = geSwitchChoiceUiOrderedEntryIds(scene);
        const flat = [];
        for (const id of ordered) {
            const w = geSwitchChoiceUiGetWindow(scene, id);
            if (!w) continue;
            const max = w.maxItems();
            for (let i = 0; i < max; i++) flat.push({ entryId: id, itemIndex: i });
        }
        return { ordered, flat };
    }

    function geSyncSwitchChoiceUiFlatIndex(scene) {
        ensureMap(scene);
        const { ordered, flat } = geSwitchChoiceUiFlatItems(scene);
        if (flat.length === 0) return;
        const focusId = Number(scene._geSwitchChoiceUiFocusEntryId) || ordered[0];
        const w = geSwitchChoiceUiGetWindow(scene, focusId);
        const curItemIndex = w ? w.index() : -1;
        let curFlatIndex = flat.findIndex(o => o.entryId === focusId && o.itemIndex === curItemIndex);
        if (curFlatIndex < 0) curFlatIndex = 0;
        scene._geSwitchChoiceUiFlatIndex = curFlatIndex;
    }

    function geSwitchChoiceUiApplyFlatFocus(scene, entryId, itemIndex) {
        ensureMap(scene);
        scene._geSwitchChoiceUiFocusEntryId = Number(entryId) || scene._geSwitchChoiceUiFocusEntryId;
        geApplySwitchChoiceUiFocus(scene);
        const w = geSwitchChoiceUiGetWindow(scene, scene._geSwitchChoiceUiFocusEntryId);
        if (!w) return null;
        const max = w.maxItems();
        if (max <= 0) return null;
        const idx = Math.max(0, Math.min(Number(itemIndex) || 0, max - 1));
        const before = w.index();
        w.select(idx);
        w.activate();
        return { w, beforeIndex: before, afterIndex: idx };
    }

    function geUpdateSwitchChoiceUiFocusInput(scene) {
        ensureMap(scene);
        if (!scene._geSwitchChoiceUiWindows) return;
        if ($gameMessage && $gameMessage.isBusy && $gameMessage.isBusy()) return;
        scene._geSwitchChoiceUiUseGlobalNav = true;
        const { ordered, flat } = geSwitchChoiceUiFlatItems(scene);
        if (flat.length === 0) return;
        geApplySwitchChoiceUiFocus(scene);
        geSyncSwitchChoiceUiFlatIndex(scene);
        const curFlatIndex = Number(scene._geSwitchChoiceUiFlatIndex) || 0;

        if (Input.isRepeated("down")) {
            const next = (curFlatIndex + 1) % flat.length; // 最下で下→先頭
            scene._geSwitchChoiceUiFlatIndex = next;
            const t = flat[next];
            const moved = geSwitchChoiceUiApplyFlatFocus(scene, t.entryId, t.itemIndex);
            if (moved && moved.beforeIndex !== moved.afterIndex && moved.w && moved.w.playCursorSound) {
                moved.w.playCursorSound();
            }
        } else if (Input.isRepeated("up")) {
            const next = (curFlatIndex - 1 + flat.length) % flat.length; // 最上で上→末尾
            scene._geSwitchChoiceUiFlatIndex = next;
            const t = flat[next];
            const moved = geSwitchChoiceUiApplyFlatFocus(scene, t.entryId, t.itemIndex);
            if (moved && moved.beforeIndex !== moved.afterIndex && moved.w && moved.w.playCursorSound) {
                moved.w.playCursorSound();
            }
        }
    }

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        updateSwitchChoiceUi(this);
        geUpdateSwitchChoiceUiFocusInput(this);
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        ensureMap(this);
        for (const id of Object.keys(this._geSwitchChoiceUiWindows)) removeWindow(this, Number(id));
        _Scene_Map_terminate.call(this);
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        updateSwitchChoiceUi(this);
        geUpdateSwitchChoiceUiFocusInput(this);
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        ensureMap(this);
        for (const id of Object.keys(this._geSwitchChoiceUiWindows)) removeWindow(this, Number(id));
        _Scene_Battle_terminate.call(this);
    };

    function geEscapeKeyCommonEventId() {
        try {
            return Number(PluginManager.parameters("EscapeKeyCommonEvent")["commonEventId"] || 0) || 0;
        } catch (e) {
            return 0;
        }
    }

    const _Game_Temp_reserveCommonEvent = Game_Temp.prototype.reserveCommonEvent;
    Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
        const escId = geEscapeKeyCommonEventId();
        const id = Number(commonEventId) || 0;
        if (
            escId > 0 &&
            id === escId &&
            $gameSystem &&
            typeof $gameSystem.geShouldBlockEscapeFromSwitchUi === "function" &&
            $gameSystem.geShouldBlockEscapeFromSwitchUi()
        ) {
            return;
        }
        _Game_Temp_reserveCommonEvent.call(this, commonEventId);
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (
            $gameSystem &&
            typeof $gameSystem.geShouldBlockEscapeFromSwitchUi === "function" &&
            $gameSystem.geShouldBlockEscapeFromSwitchUi()
        ) {
            this.menuCalling = false;
            return;
        }
        _Scene_Map_callMenu.call(this);
    };

    const _geMzAudioManager_playStaticSe = AudioManager.playStaticSe;
    AudioManager.playStaticSe = function(se) {
        if (geShouldSuppressPlayStaticSeForLayout(se)) {
            return;
        }
        _geMzAudioManager_playStaticSe.call(this, se);
    };

    const _geMzAudioManager_playSe = AudioManager.playSe;
    AudioManager.playSe = function(se) {
        const blockedEventWindow = !!(se && se.name && geInEventSeSuppressWindow());
        const blockedDupSystem = geShouldSuppressPlaySeMatchingSystemSounds(se);
        if (blockedEventWindow || blockedDupSystem) {
            return;
        }
        return _geMzAudioManager_playSe.call(this, se);
    };

    const _geMzAudioManager_playBgs = AudioManager.playBgs;
    AudioManager.playBgs = function(bgs, pos) {
        if (
            suppressBgsWhileSwitchChoiceDisplayOn &&
            geAnySwitchChoiceDisplaySwitchOn()
        ) {
            return;
        }
        return _geMzAudioManager_playBgs.call(this, bgs, pos);
    };
})();
