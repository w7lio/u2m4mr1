/*:
 * @target MZ
 * @plugindesc (Free version) A plugin for RPG Maker MZ to adjust keyboard and gamepad key
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io/
 * 
 * @help
 * Verion 1.0.5
 * ==============================================================================
 * This is a plugin for RPG Maker MZ that allow you to assign the default RPG Maker MZ 
 * buttons AND new buttons to Keyboard & Gamepad
 *==============================================================================
 * CHANGELOG
 * [1.0.5] - Added debug keycode F9
 *         - Fixed mouse click trigger common event multiple times
 * [ver 1.0.4] Added Mouse support for conditional branch
 * [ver 1.0.3] 
 * - Add support for left mouse click and right mouse click
 * - Now you can assign multiple buttons to a single function. 
 * Example: Ok: e, enter
 * [ver 1.0.2] Parallel common event bug fixes
 * [ver 1.0.1] Fixed an issue that made the keys didn't assign to your game
 *==============================================================================
* FEATURES
 * - Assign default RPG Maker MZ functional buttons to a new layout for both
 * Keyboard and Gamepad.
 * - Directly type in any letter on Keyboard. No more typing Javascript numbers,
 * ain't nobody got time for that.
 * - Run a common event with any keyboard/gamepad button that you wish.
 *==============================================================================
 * How to use:
 * Assign new button to default RPG Maker MZ buttons (ok, cancel, shift, etc) by
 * going to parameters Keyboard, Gamepad. Type in any letter you want to Keyboard
 * and the same letter to Gamepad. Your Gamepad will acknowledge your assigned letter.
 * For Example: You assign button f on keyboard for function Cancel. Now when you
 * press f, it'll trigger Cancel function.
 * In Gamepad, at button A, you also assign f to that, it'll automatically understand
 * it's Cancel due to what you assigned to parameter Keyboard.
 * 
 * If you want to create a newly button like pressing m to trigger a common event,
 * you can do so in Extra Buttons parameter. Then, in Gamepad parameter, assign the same
 * letter to any button you wish.
 * 
 * Some conditional branch command:
 * Input.isTriggered('x')
 * X can be leftclick, rightclick, m, n, s... depends on what you assigned.
 * ==============================================================================
 * For feedback or feature request, please dm me on X (Twitter):
 * https://x.com/sanghendrix96
 *
 * @param Keyboard
 * @type struct<Keyboard>
 * @default {"Tab":"tab","Ok/Confirm":"e","Control":"ctrl","Escape":"esc","Page Up":"pageup","Page Down":"pagedown","Left":"left","Up":"up","Right":"right","Down":"down","Shift":"shift"}
 *
 * @param Gamepad
 * @type struct<Gamepad>
 * @default {"A":"u","B":"i","X":"o","Y":"p","LB":"q","RB":"w","LT":"e","RT":"r","Back":"t","Start":"y","LS-Press":"a","RS-Press":"s"}
 * 
 * @param Extra Buttons
 * @type struct<ExtraButtons>[]
 * @default []
 * 
 */

/*~struct~Keyboard:
 * @param Tab
 * @desc Character key for the Tab
 * @default tab
 *
 * @param Ok
 * @desc Character key for the Ok/Confirm
 * @default e
 *
 * @param Control
 * @desc Character key for the Control
 * @default ctrl
 *
 * @param Escape
 * @desc Character key for the Escape
 * @default esc
 *
 * @param Page Up
 * @desc Character key for the Page Up
 * @default pageup
 *
 * @param Page Down
 * @desc Character key for the Page Down
 * @default pagedown
 *
 * @param Left
 * @desc Character key for the Left Arrow
 * @default left
 *
 * @param Up
 * @desc Character key for the Up Arrow
 * @default up
 *
 * @param Right
 * @desc Character key for the Right Arrow
 * @default right
 *
 * @param Down
 * @desc Character key for the Down Arrow
 * @default down
 *
 * @param Shift
 * @desc Character key for the Shift
 * @default shift
 */
/*~struct~Gamepad:
 * @param A
 * @desc Gamepad button A
 * @default u
 *
 * @param B
 * @desc Gamepad button B
 * @default i
 *
 * @param X
 * @desc Gamepad button X
 * @default o
 *
 * @param Y
 * @desc Gamepad button Y
 * @default p
 *
 * @param LB
 * @desc Gamepad button LB
 * @default q
 *
 * @param RB
 * @desc Gamepad button RB
 * @default w
 *
 * @param LT
 * @desc Gamepad button LT
 * @default e
 *
 * @param RT
 * @desc Gamepad button RT
 * @default r
 *
 * @param Back
 * @desc Gamepad button Back
 * @default t
 *
 * @param Start
 * @desc Gamepad button Start
 * @default y
 *
 * @param LS-Press
 * @desc Gamepad button LS-Press
 * @default a
 *
 * @param RS-Press
 * @desc Gamepad button RS-Press
 * @default s
 */

/*~struct~ExtraButtons:
 * @param Mouse Button
 * @desc The mouse button to trigger the common event.
 * @type select
 * @option None
 * @value none
 * @option Left Click
 * @value left
 * @option Right Click
 * @value right
 * @default none
 * 
 * @param Keyboard Button
 * @desc The keyboard button to trigger the common event.
 * @type string
 * @default
 *
 * @param Common Event ID
 * @desc The ID of the common event to be triggered.
 * @type common_event
 * @default
 *
 * @param Options
 * @desc Choose whether the common event is triggered on key press or key release.
 * @type select
 * @option Triggered
 * @value triggered
 * @option Pressed
 * @value pressed
 * @default triggered
 * 
 * @param AllowParallel
 * @text Allow to run in parallel mode
 * @type boolean
 * @default false
 * @desc If true, allows this common event to be triggered even if another is already running.
 */

var Imported = Imported || {};
Imported.Hendrix_Keyboard_Gamepad = true;

var GamepadButtons = {
    'A': 0,
    'B': 1,
    'X': 2,
    'Y': 3,
    'LB': 4,
    'RB': 5,
    'LT': 6,
    'RT': 7,
    'Back': 8,
    'Start': 9,
    'LS-Press': 10,
    'RS-Press': 11
};

(function () {
    var parameters = PluginManager.parameters('Hendrix_Keyboard_Gamepad');
    var keyboardMapping = JSON.parse(parameters['Keyboard']);
    var gamepadMapping = JSON.parse(parameters['Gamepad']);
    var extraButtons = JSON.parse(parameters['Extra Buttons'] || '[]').map(JSON.parse);

    const MOUSE_LEFT = 1000;
    const MOUSE_RIGHT = 1001;

    var charToKeyCode = {
        'backspace': 8, 'tab': 9, 'enter': 13, 'shift': 16, 'ctrl': 17, 'alt': 18, 'pause': 19, 'capslock': 20,
        'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38,
        'right': 39, 'down': 40, 'insert': 45, 'delete': 46, '0': 48, '1': 49, '2': 50, '3': 51, '4': 52,
        '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, 'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70,
        'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81,
        'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90, 'windows': 91,
        'numpad0': 96, 'numpad1': 97, 'numpad2': 98, 'numpad3': 99, 'numpad4': 100, 'numpad5': 101,
        'numpad6': 102, 'numpad7': 103, 'numpad8': 104, 'numpad9': 105, 'multiply': 106, 'add': 107,
        'subtract': 109, 'decimalpoint': 110, 'divide': 111, 'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115,
        'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119, 'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123,
        'numlock': 144, 'scrolllock': 145, 'semicolon': 186, 'equals': 187, 'comma': 188, 'dash': 189,
        'period': 190, 'forwardslash': 191, 'graveaccent': 192, 'openbracket': 219, 'backslash': 220,
        'closebracket': 221, 'singlequote': 222, 66: 'C', 'leftclick': MOUSE_LEFT, 'rightclick': MOUSE_RIGHT, 'debug': 120
    };

    var mouseStates = {
        left: false,
        right: false,
        previousLeft: false,
        previousRight: false
    };

    var isLeftMouseDown = false;
    var isRightMouseDown = false;
    var lastLeftMouseDownTime = 0;
    var lastRightMouseDownTime = 0;

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    document.addEventListener('mousedown', function (e) {
        if (e.button === 0) {
            isLeftMouseDown = true;
            mouseStates.left = true;
            lastLeftMouseDownTime = Date.now();
            Input._currentState[MOUSE_LEFT] = true;
        } else if (e.button === 2) {
            isRightMouseDown = true;
            mouseStates.right = true;
            lastRightMouseDownTime = Date.now();
            Input._currentState[MOUSE_RIGHT] = true;
        }
    });

    document.addEventListener('mouseup', function (e) {
        if (e.button === 0) {
            isLeftMouseDown = false;
            mouseStates.left = false;
            Input._currentState[MOUSE_LEFT] = false;
        } else if (e.button === 2) {
            isRightMouseDown = false;
            mouseStates.right = false;
            Input._currentState[MOUSE_RIGHT] = false;
        }
    });

    var _Input_clear = Input.clear;
    Input.clear = function () {
        _Input_clear.call(this);
        this._mousePressed = false;
        this._mouseTriggered = false;
    };

    var _Input_update = Input.update;
    Input.update = function () {
        _Input_update.call(this);

        // Update mouse states
        if (mouseStates.left && !mouseStates.previousLeft) {
            this._currentState['mouse_left'] = true;
        } else if (!mouseStates.left && mouseStates.previousLeft) {
            this._currentState['mouse_left'] = false;
        }

        if (mouseStates.right && !mouseStates.previousRight) {
            this._currentState['mouse_right'] = true;
        } else if (!mouseStates.right && mouseStates.previousRight) {
            this._currentState['mouse_right'] = false;
        }

        // Update previous states
        mouseStates.previousLeft = mouseStates.left;
        mouseStates.previousRight = mouseStates.right;
    };

    var _Input_isPressed = Input.isPressed;
    Input.isPressed = function (keyName) {
        if (keyName === 'leftclick') {
            return mouseStates.left;
        } else if (keyName === 'rightclick') {
            return mouseStates.right;
        }
        return _Input_isPressed.call(this, keyName);
    };

    var _Input_isTriggered = Input.isTriggered;
    Input.isTriggered = function (keyName) {
        if (keyName === 'leftclick') {
            return mouseStates.left && !mouseStates.previousLeft;
        } else if (keyName === 'rightclick') {
            return mouseStates.right && !mouseStates.previousRight;
        }
        return _Input_isTriggered.call(this, keyName);
    };

    function isMouseButtonTriggered(button) {
        var currentTime = Date.now();
        if (button === 'left') {
            return isLeftMouseDown && (currentTime - lastLeftMouseDownTime < 16);
        } else if (button === 'right') {
            return isRightMouseDown && (currentTime - lastRightMouseDownTime < 16);
        }
        return false;
    }

    function isMouseButtonPressed(button) {
        return button === 'left' ? isLeftMouseDown : isRightMouseDown;
    }

    function remapKeys() {
        Input.keyMapper = {};
        Input.gamepadMapper = { 12: 'up', 13: 'down', 14: 'left', 15: 'right' };

        Input.keyMapper[MOUSE_LEFT] = 'leftclick';
        Input.keyMapper[MOUSE_RIGHT] = 'rightclick';

        for (var char in charToKeyCode) {
            if (charToKeyCode.hasOwnProperty(char)) {
                var keyCode = charToKeyCode[char];
                if (typeof keyCode === 'number') {
                    Input.keyMapper[keyCode] = char;
                }
            }
        }

        // Handle keyboard mappings with multiple keys
        Object.keys(keyboardMapping).forEach(function (key) {
            var action = key.replace(/[^a-zA-Z]/g, '').toLowerCase();
            var charKeys = keyboardMapping[key].toLowerCase().split(',');

            charKeys.forEach(function (charKey) {
                charKey = charKey.trim();
                if (charToKeyCode[charKey]) {
                    Input.keyMapper[charToKeyCode[charKey]] = action;
                }
            });
        });

        // Handle gamepad mappings
        Object.keys(gamepadMapping).forEach(function (button) {
            var keyActions = gamepadMapping[button].toLowerCase().split(',');
            keyActions.forEach(function (keyAction) {
                keyAction = keyAction.trim();
                if (charToKeyCode[keyAction]) {
                    Input.gamepadMapper[GamepadButtons[button]] = Input.keyMapper[charToKeyCode[keyAction]];
                }
            });
        });
    }

    function triggerCommonEvent(option, key, mouseButton, commonEventId, allowParallel, sceneMap) {
        var triggered = (option === 'triggered' && (Input.isTriggered(key) ||
            (mouseButton === 'left' && isMouseButtonTriggered('left')) ||
            (mouseButton === 'right' && isMouseButtonTriggered('right'))));
        var pressed = (option === 'pressed' && (Input.isPressed(key) ||
            (mouseButton === 'left' && isMouseButtonPressed('left')) ||
            (mouseButton === 'right' && isMouseButtonPressed('right'))));

        if (triggered || pressed) {
            if (allowParallel) {
                executeCommonEvent(commonEventId);
            } else if (!sceneMap.isEventRunning()) {
                $gameTemp.reserveCommonEvent(commonEventId);
            }
        }
    }

    function checkExtraButtons() {
        extraButtons.forEach(function (button) {
            var keys = button['Keyboard Button'].toLowerCase().split(',');
            var mouseButton = button['Mouse Button'];
            var commonEventId = Number(button['Common Event ID']);
            var option = button['Options'];
            var allowParallel = button['AllowParallel'] === 'true';
            var sceneMap = SceneManager._scene;

            keys.forEach(function (key) {
                triggerCommonEvent(option, key.trim(), mouseButton, commonEventId, allowParallel, sceneMap);
            });
        });
    }

    function executeCommonEvent(eventId) {
        const commonEvent = $dataCommonEvents[eventId];
        if (commonEvent) {
            const interpreter = new Game_Interpreter();
            interpreter.setup(commonEvent.list);

            if (!$gameTemp._parallelInterpreters) {
                $gameTemp._parallelInterpreters = [];
            }

            $gameTemp._parallelInterpreters.push(interpreter);
        }
    }

    Scene_Map.prototype.isEventRunning = function () {
        return $gameMap.isEventRunning() || $gameMessage.isBusy();
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        if (this.isActive()) {
            checkExtraButtons();
            if ($gameTemp._parallelInterpreters) {
                $gameTemp._parallelInterpreters = $gameTemp._parallelInterpreters.filter(interpreter => {
                    if (interpreter.isRunning()) {
                        interpreter.update();
                        return true;
                    }
                    return false;
                });
            }
        }
    };

    remapKeys();
})();