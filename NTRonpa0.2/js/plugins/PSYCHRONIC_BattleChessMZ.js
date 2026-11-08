/*:
 * @plugindesc Battle Chess Plugin for RPG Maker MZ (with basic minimax AI + repeat-move avoidance) - Version 1.01
 * @author Psychronic
 * @url https://psychronic.itch.io
 * @target MZ
 * @help
 * This plugin creates a chess game within RPG Maker MZ, including a simple
 * minimax-based AI for stronger computer-controlled moves.
 *
 * Use "StartChessGame" plugin command to start a game.
 *
 * ============================================================================
 * CHANGE HIGHLIGHTS:
 *  - Minimax-based AI (alpha-beta) in updateAI().
 *  - Basic material count evaluation.
 *  - _lastMoves used to avoid repeating the same move consecutively.
 * ============================================================================
 *
 * @command StartChessGame
 * @text Start Chess Game
 * @desc Initiates the chess mini-game.
 *
 * @arg configNumber
 * @type number
 * @min 1
 * @desc The configuration number to use.
 *
 * @arg playerColor
 * @type select
 * @option white
 * @option black
 * @default white
 *
 * @arg gameMode
 * @type select
 * @option pvp
 * @option pvai
 * @option aivai
 * @default pvai
 *
 * @param Configurations
 * @type struct<Configuration>[]
 * @default []
 */

/*~struct~Configuration:
 * @param name
 * @type string
 * @default Default
 *
 * @param useSprites
 * @type boolean
 * @default true
 *
 * @param boardImage
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whitePawn
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackPawn
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteRook
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackRook
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteKnight
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackKnight
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteBishop
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackBishop
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteQueen
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackQueen
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteKing
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackKing
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whitePawnPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackPawnPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteRookPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackRookPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteKnightPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackKnightPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteBishopPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackBishopPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteQueenPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackQueenPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param whiteKingPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackKingPortrait
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param pieceOffsetX
 * @type number
 * @min -999
 * @max 999
 * @default -20
 *
 * @param pieceOffsetY
 * @type number
 * @min -999
 * @max 999
 * @default -40
 *
 * @param boardOffsetX
 * @type number
 * @min -999
 * @max 999
 * @default 300
 *
 * @param boardOffsetY
 * @type number
 * @min -999
 * @max 999
 * @default 40
 *
 * @param backgroundImage
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param backgroundOffsetX
 * @type number
 * @min -999
 * @max 999
 * @default 0
 *
 * @param backgroundOffsetY
 * @type number
 * @min -999
 * @max 999
 * @default 0
 *
 * @param highlightOffsetX
 * @type number
 * @min -999
 * @max 999
 * @default 0
 *
 * @param highlightOffsetY
 * @type number
 * @min -999
 * @max 999
 * @default 0
 *
 * @param captureAnimationId
 * @type animation
 * @default 0
 *
 * @param pawnCaptureAnimationId
 * @type animation
 * @default 0
 *
 * @param rookCaptureAnimationId
 * @type animation
 * @default 0
 *
 * @param knightCaptureAnimationId
 * @type animation
 * @default 0
 *
 * @param bishopCaptureAnimationId
 * @type animation
 * @default 0
 *
 * @param queenCaptureAnimationId
 * @type animation
 * @default 0
 *
 * @param kingCaptureAnimationId
 * @type animation
 * @default 0
 *
 * @param victoryMessageX
 * @type number
 * @default 500
 *
 * @param victoryMessageY
 * @type number
 * @default 360
 *
 * @param victoryMessageContent
 * @type string
 * @default {WINNER} wins!
 *
 * @param whiteVictoryImage
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param blackVictoryImage
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param portraitOffsetX
 * @type number
 * @min -999
 * @max 999
 * @default 40
 *
 * @param portraitOffsetY
 * @type number
 * @min -999
 * @max 999
 * @default 80
 *
 * @param portraitWindowSkin
 * @type file
 * @dir img/system/
 * @default Window
 *
 * @param whitePawnLabel
 * @type string
 * @default White Pawn
 *
 * @param blackPawnLabel
 * @type string
 * @default Black Pawn
 *
 * @param whiteRookLabel
 * @type string
 * @default White Rook
 *
 * @param blackRookLabel
 * @type string
 * @default Black Rook
 *
 * @param whiteKnightLabel
 * @type string
 * @default White Knight
 *
 * @param blackKnightLabel
 * @type string
 * @default Black Knight
 *
 * @param whiteBishopLabel
 * @type string
 * @default White Bishop
 *
 * @param blackBishopLabel
 * @type string
 * @default Black Bishop
 *
 * @param whiteQueenLabel
 * @type string
 * @default White Queen
 *
 * @param blackQueenLabel
 * @type string
 * @default Black Queen
 *
 * @param whiteKingLabel
 * @type string
 * @default White King
 *
 * @param blackKingLabel
 * @type string
 * @default Black King
 *
 * @param labelWindowWidth
 * @type number
 * @default 200
 *
 * @param labelWindowHeight
 * @type number
 * @default 36
 *
 * @param labelFontSize
 * @type number
 * @default 18
 *
 * @param moveSoundEffect
 * @type file
 * @dir audio/se/
 * @default
 *
 * @param moveSoundVolume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @param moveSoundPitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param cancelSoundEffect
 * @type file
 * @dir audio/se/
 * @default
 *
 * @param cancelSoundVolume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @param cancelSoundPitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param cursorSoundEffect
 * @type file
 * @dir audio/se/
 * @default
 *
 * @param cursorSoundVolume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @param cursorSoundPitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param victorySwitch
 * @type switch
 * @default 0
 *
 * @param whiteVictorySwitch
 * @type switch
 * @default 0
 *
 * @param blackVictorySwitch
 * @type switch
 * @default 0
 *
 * @param selectionBoxImage
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param selectionBoxOffsetX
 * @type number
 * @min -999
 * @max 999
 * @default 0
 *
 * @param selectionBoxOffsetY
 * @type number
 * @min -999
 * @max 999
 * @default 0
 */

(() => {
    const pluginName = "PSYCHRONIC_BattleChessMZ";

    Input.keyMapper[87] = 'w';  // W
    Input.keyMapper[65] = 'a';  // A
    Input.keyMapper[83] = 's';  // S
    Input.keyMapper[68] = 'd';  // D

    PluginManager.registerCommand(pluginName, "StartChessGame", args => {
        const configNumber = Number(args.configNumber);
        const gameMode = String(args.gameMode);
        const playerColor = gameMode === 'pvai' ? String(args.playerColor) : null;

        $gameVariables.setValue(3, configNumber);
        $gameVariables.setValue(4, gameMode);
        $gameVariables.setValue(5, playerColor);

        const victorySwitch = Number(PluginManager.parameters(pluginName).victorySwitch);
        if (victorySwitch) {
            $gameSwitches.setValue(victorySwitch, false); // Reset victory switch
        }

        const whiteVictorySwitch = Number(PluginManager.parameters(pluginName).whiteVictorySwitch);
        if (whiteVictorySwitch) {
            $gameSwitches.setValue(whiteVictorySwitch, false); // Reset white victory switch
        }

        const blackVictorySwitch = Number(PluginManager.parameters(pluginName).blackVictorySwitch);
        if (blackVictorySwitch) {
            $gameSwitches.setValue(blackVictorySwitch, false); // Reset black victory switch
        }

        SceneManager.push(Scene_Chess);
    });

    const parameters = PluginManager.parameters(pluginName);
    const configurations = JSON.parse(parameters.Configurations || "[]").map(config => JSON.parse(config));

    const getConfig = (configNumber) => {
        return configurations[configNumber - 1];
    };

    const setupGameConfig = (config) => {
        const configObject = {
            useSprites: config.useSprites === 'true',
            boardImage: config.boardImage,
            pieceImages: {
                'whitePawn': config.whitePawn,
                'blackPawn': config.blackPawn,
                'whiteRook': config.whiteRook,
                'blackRook': config.blackRook,
                'whiteKnight': config.whiteKnight,
                'blackKnight': config.blackKnight,
                'whiteBishop': config.whiteBishop,
                'blackBishop': config.blackBishop,
                'whiteQueen': config.whiteQueen,
                'blackQueen': config.blackQueen,
                'whiteKing': config.whiteKing,
                'blackKing': config.blackKing
            },
            piecePortraits: {
                'whitePawn': config.whitePawnPortrait,
                'blackPawn': config.blackPawnPortrait,
                'whiteRook': config.whiteRookPortrait,
                'blackRook': config.blackRookPortrait,
                'whiteKnight': config.whiteKnightPortrait,
                'blackKnight': config.blackKnightPortrait,
                'whiteBishop': config.whiteBishopPortrait,
                'blackBishop': config.blackBishopPortrait,
                'whiteQueen': config.whiteQueenPortrait,
                'blackQueen': config.blackQueenPortrait,
                'whiteKing': config.whiteKingPortrait,
                'blackKing': config.blackKingPortrait
            },
            pieceLabels: {
                'whitePawn': config.whitePawnLabel,
                'blackPawn': config.blackPawnLabel,
                'whiteRook': config.whiteRookLabel,
                'blackRook': config.blackRookLabel,
                'whiteKnight': config.whiteKnightLabel,
                'blackKnight': config.blackKnightLabel,
                'whiteBishop': config.whiteBishopLabel,
                'blackBishop': config.blackBishopLabel,
                'whiteQueen': config.whiteQueenLabel,
                'blackQueen': config.blackQueenLabel,
                'whiteKing': config.whiteKingLabel,
                'blackKing': config.blackKingLabel
            },
            pieceOffsetX: Number(config.pieceOffsetX),
            pieceOffsetY: Number(config.pieceOffsetY),
            boardOffsetX: Number(config.boardOffsetX),
            boardOffsetY: Number(config.boardOffsetY),
            backgroundImage: config.backgroundImage,
            backgroundOffsetX: Number(config.backgroundOffsetX),
            backgroundOffsetY: Number(config.backgroundOffsetY),
            highlightOffsetX: Number(config.highlightOffsetX),
            highlightOffsetY: Number(config.highlightOffsetY),
            captureAnimationId: Number(config.captureAnimationId),
            pawnCaptureAnimationId: Number(config.pawnCaptureAnimationId),
            rookCaptureAnimationId: Number(config.rookCaptureAnimationId),
            knightCaptureAnimationId: Number(config.knightCaptureAnimationId),
            bishopCaptureAnimationId: Number(config.bishopCaptureAnimationId),
            queenCaptureAnimationId: Number(config.queenCaptureAnimationId),
            kingCaptureAnimationId: Number(config.kingCaptureAnimationId),
            victoryMessageX: Number(config.victoryMessageX),
            victoryMessageY: Number(config.victoryMessageY),
            victoryMessageContent: config.victoryMessageContent,
            whiteVictoryImage: config.whiteVictoryImage,
            blackVictoryImage: config.blackVictoryImage,
            portraitOffsetX: Number(config.portraitOffsetX),
            portraitOffsetY: Number(config.portraitOffsetY),
            portraitWindowSkin: config.portraitWindowSkin,
            labelWindowWidth: Number(config.labelWindowWidth),
            labelWindowHeight: Number(config.labelWindowHeight),
            labelFontSize: Number(config.labelFontSize),
            moveSoundEffect: config.moveSoundEffect,
            moveSoundVolume: Number(config.moveSoundVolume),
            moveSoundPitch: Number(config.moveSoundPitch),
            cancelSoundEffect: config.cancelSoundEffect,
            cancelSoundVolume: Number(config.cancelSoundVolume),
            cancelSoundPitch: Number(config.cancelSoundPitch),
            cursorSoundEffect: config.cursorSoundEffect,
            cursorSoundVolume: Number(config.cursorSoundVolume),
            cursorSoundPitch: Number(config.cursorSoundPitch),
            victorySwitch: Number(config.victorySwitch),
            selectionBoxImage: config.selectionBoxImage,
            selectionBoxOffsetX: Number(config.selectionBoxOffsetX),
            selectionBoxOffsetY: Number(config.selectionBoxOffsetY)
        };

        // Preload portrait images
        for (const key in configObject.piecePortraits) {
            if (configObject.piecePortraits[key]) {
                ImageManager.loadPicture(configObject.piecePortraits[key]);
            }
        }

        return configObject;
    };

    // Utility to figure out sprite direction
    const getDirection = (startX, startY, endX, endY) => {
        if (endX > startX) return 'right';
        if (endX < startX) return 'left';
        if (endY > startY) return 'down';
        if (endY < startY) return 'up';
        return 'down';
    };
    const getOrientationIndex = (direction) => {
        switch (direction) {
            case 'down': return 0;
            case 'left': return 1;
            case 'right': return 2;
            case 'up': return 3;
            default: return 0;
        }
    };

    const playSoundEffect = (soundEffect, volume, pitch) => {
        if (soundEffect) {
            const se = {
                name: soundEffect,
                pan: 0,
                pitch: pitch,
                volume: volume
            };
            AudioManager.playSe(se);
        }
    };

    class Scene_Chess extends Scene_Base {
        constructor() {
            super();
            this._isProcessingMove = false;
            this._moveCompleted = true;
            this._updateDelay = 50; // ms
            this._lastKeyPressTime = 0;
            this._keyPressStates = { up: false, down: false, left: false, right: false };
            this._keyPressTimestamps = { up: 0, down: 0, left: 0, right: 0 };
            this._keyPressDelay = 150; // ms between directional repeats

            // == REPEAT MOVE AVOIDANCE ==
            // Track the last move done by white and black
            this._lastMoves = {
                white: null, // { pieceId, fromX, fromY, toX, toY }
                black: null
            };
        }

        create() {
            super.create();
            this.createBoardBackground();
            this.createBoard();
            this.createCursor();
            this.createHighlightBox();
            this._selectedPiece = null;
            this._highlights = [];
            this._gameOver = false;
            this._aiMoving = false;
            this._stepFrame = 0;
            this.setupGameMode();
            this.createTurnIndicator();
            this._cursorX = 0;
            this._cursorY = 0;
            this.updateCursorPosition(); 

            console.log("Scene_Chess initialized");
            this.createSelectionBox();
        }

        createBoardBackground() {
            const configNumber = $gameVariables.value(3);
            this._config = setupGameConfig(getConfig(configNumber));
            this._backgroundSprite = new Sprite(ImageManager.loadPicture(this._config.backgroundImage));
            this._backgroundSprite.x = this._config.backgroundOffsetX;
            this._backgroundSprite.y = this._config.backgroundOffsetY;
            this.addChild(this._backgroundSprite);
        }

        createBoard() {
            this._boardSprite = new Sprite(ImageManager.loadPicture(this._config.boardImage));
            this._boardSprite.x = this._config.boardOffsetX;
            this._boardSprite.y = this._config.boardOffsetY;
            this.addChild(this._boardSprite);
            this._boardSprite.bitmap.addLoadListener(() => {
                this._squareSize = this._boardSprite.bitmap.width / 8;
                this.setupTeams(this._config);
                this.updateCursorPosition();
            });
        }

        createCursor() {
            console.log("Creating cursor");
            this._cursorSprite = new Sprite();
            this._cursorSprite.bitmap = new Bitmap(this._squareSize, this._squareSize);
            this._cursorSprite.bitmap.fillAll('rgba(255, 255, 0, 0.5)');
            this._cursorSprite.z = 1000;
            this.addChild(this._cursorSprite);
        }

        createHighlightBox() {
            console.log("Creating highlight box");
            this._highlightBox = new Sprite();
            this._highlightBox.bitmap = new Bitmap(this._squareSize, this._squareSize);
            this._highlightBox.bitmap.fillAll('rgba(0, 255, 0, 0.3)');
            this._highlightBox.z = 1001;
            this.addChild(this._highlightBox);
        }

        createSelectionBox() {
            if ($gameVariables.value(4) !== 'aivai') {
                console.log("Creating selection box");
                if (this._config.selectionBoxImage) {
                    this._selectionBox = new Sprite(ImageManager.loadPicture(this._config.selectionBoxImage));
                    this._selectionBox.z = 1001;
                    this.addChild(this._selectionBox);
                    this.startHighlightPulsing(this._selectionBox);
                } else {
                    console.error("Selection box image is not defined.");
                }
            } else {
                console.log("Skipping selection box creation for AI vs AI mode");
            }
        }

        setupGameMode() {
            const gameMode = $gameVariables.value(4);
            this._gameMode = gameMode;

            if (gameMode === 'pvp') {
                this._playerColor = null;
                this._aiColor = null;
            } else if (gameMode === 'pvai') {
                const playerColor = $gameVariables.value(5);
                this._playerColor = playerColor;
                this._aiColor = playerColor === 'white' ? 'black' : 'white';
            } else if (gameMode === 'aivai') {
                this._playerColor = null;
                this._aiColor = ['white', 'black'];
            }

            this._currentTurn = 'white';
        }

        setupTeams(config) {
            this._pieces = [];

            // We'll give each piece a unique ID to help track repeated moves:
            let pieceCounter = 0;

const createPiece = (image, x, y, color, type, orientation) => {
    const piece = new Sprite();
    const bitmap = ImageManager.loadPicture(image);
    if (config.useSprites) {
        bitmap.addLoadListener(() => {
            piece.bitmap = bitmap;
            piece.setFrame(
                bitmap.width / 3,
                bitmap.height / 4 * getOrientationIndex(orientation),
                bitmap.width / 3,
                bitmap.height / 4
            );
        });
    } else {
        bitmap.addLoadListener(() => {
            piece.bitmap = bitmap;
        });
    }
    piece.x = this._boardSprite.x + x * this._squareSize + config.pieceOffsetX;
    piece.y = this._boardSprite.y + y * this._squareSize + config.pieceOffsetY;
    piece.z = piece.y;
    piece.color = color;
    piece.type = type;
    piece.gridX = x;
    piece.gridY = y;
    piece.orientation = orientation;
    piece._id = pieceCounter++;
    // For kings and rooks, track whether they’ve moved.
    if (type === 'king' || type === 'rook') {
        piece.hasMoved = false;
    }
    this._pieces.push(piece);
    this.addChild(piece);
};

            this.setupWhitePieces(createPiece, config);
            this.setupBlackPieces(createPiece, config);

            this._pieces.sort((a, b) => a.y - b.y);
            this._pieces.forEach(piece => this.addChild(piece));

            if (this._aiColor) {
                this._aiPieces = this._pieces.filter(piece => {
                    return Array.isArray(this._aiColor)
                        ? this._aiColor.includes(piece.color)
                        : piece.color === this._aiColor;
                });
            }
        }

        setupWhitePieces(createPiece, config) {
            for (let i = 0; i < 8; i++) {
                createPiece(config.pieceImages.whitePawn, i, 1, 'white', 'pawn', 'down');
            }
            createPiece(config.pieceImages.whiteRook, 0, 0, 'white', 'rook', 'down');
            createPiece(config.pieceImages.whiteRook, 7, 0, 'white', 'rook', 'down');
            createPiece(config.pieceImages.whiteKnight, 1, 0, 'white', 'knight', 'down');
            createPiece(config.pieceImages.whiteKnight, 6, 0, 'white', 'knight', 'down');
            createPiece(config.pieceImages.whiteBishop, 2, 0, 'white', 'bishop', 'down');
            createPiece(config.pieceImages.whiteBishop, 5, 0, 'white', 'bishop', 'down');
            createPiece(config.pieceImages.whiteQueen, 3, 0, 'white', 'queen', 'down');
            createPiece(config.pieceImages.whiteKing, 4, 0, 'white', 'king', 'down');
        }

        setupBlackPieces(createPiece, config) {
            for (let i = 0; i < 8; i++) {
                createPiece(config.pieceImages.blackPawn, i, 6, 'black', 'pawn', 'up');
            }
            createPiece(config.pieceImages.blackRook, 0, 7, 'black', 'rook', 'up');
            createPiece(config.pieceImages.blackRook, 7, 7, 'black', 'rook', 'up');
            createPiece(config.pieceImages.blackKnight, 1, 7, 'black', 'knight', 'up');
            createPiece(config.pieceImages.blackKnight, 6, 7, 'black', 'knight', 'up');
            createPiece(config.pieceImages.blackBishop, 2, 7, 'black', 'bishop', 'up');
            createPiece(config.pieceImages.blackBishop, 5, 7, 'black', 'bishop', 'up');
            createPiece(config.pieceImages.blackQueen, 3, 7, 'black', 'queen', 'up');
            createPiece(config.pieceImages.blackKing, 4, 7, 'black', 'king', 'up');
        }

        createTurnIndicator() {
            this._turnIndicator = new Sprite(new Bitmap(200, 50));
            this._turnIndicator.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
            this._turnIndicator.bitmap.fontSize = 20;
            this._turnIndicator.bitmap.drawText("Turn: White", 0, 0, 200, 50, 'center');
            this._turnIndicator.x = 10;
            this._turnIndicator.y = 10;
            this._turnIndicator.z = 1002;
            this.addChild(this._turnIndicator);
        }

        updateTurnIndicator() {
            const turnText = this._currentTurn === 'white' ? "Turn: White" : "Turn: Black";
            this._turnIndicator.bitmap.clear();
            this._turnIndicator.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
            this._turnIndicator.bitmap.drawText(turnText, 0, 0, 200, 50, 'center');
        }

        update() {
            super.update();
            if (!this._gameOver && !this._isProcessingMove) {
                if (this._gameMode === 'pvp' || this._currentTurn === this._playerColor) {
                    this.updatePlayerInput();
                } else if (this._gameMode === 'aivai' ||
                    (this._aiColor && this._aiColor.includes(this._currentTurn))) {
                    if (!this._aiMoving) {
                        this._aiMoving = true;
                        this.updateAI().then(() => {
                            this._aiMoving = false;
                        });
                    }
                }
                this.updateSteppingAnimation();
                this.updateHighlightBox();
            } else if (this._gameOver) {
                this.checkEndGameInput();
            }
            this.updateSelectionBox();
        }

        updatePlayerInput() {
            const currentTime = performance.now();
            if (TouchInput.isTriggered()) {
                const x = TouchInput.x;
                const y = TouchInput.y;
                this.handleMouseInput(x, y);
                return;
            }
            if (Input.isTriggered('ok')) {
                this.confirmMove();
                this._moveCompleted = false;
                this._lastKeyPressTime = currentTime;
            } else if (Input.isTriggered('cancel')) {
                this.deselectPiece();
                playSoundEffect(this._config.cancelSoundEffect, this._config.cancelSoundVolume, this._config.cancelSoundPitch);
                this._moveCompleted = false;
                this._lastKeyPressTime = currentTime;
            }
            this.handleDirectionalInput(currentTime);
        }

        handleDirectionalInput(currentTime) {
            const directions = [
                { keys: ['left', 'a'], dx: -1, dy: 0 },
                { keys: ['right', 'd'], dx: 1, dy: 0 },
                { keys: ['up', 'w'], dx: 0, dy: -1 },
                { keys: ['down', 's'], dx: 0, dy: 1 }
            ];
            for (const dir of directions) {
                if (dir.keys.some(key => Input.isPressed(key)) &&
                    currentTime - this._keyPressTimestamps[dir.keys[0]] >= this._keyPressDelay) {
                    this.moveCursor(dir.dx, dir.dy);
                    playSoundEffect(this._config.cursorSoundEffect, this._config.cursorSoundVolume, this._config.cursorSoundPitch);
                    this._keyPressTimestamps[dir.keys[0]] = currentTime;
                    return;
                }
            }
            this.updateKeyPressStates();
        }

        updateKeyPressStates() {
            const keyPairs = [
                ['left', 'a'],
                ['right', 'd'],
                ['up', 'w'],
                ['down', 's']
            ];
            for (const [arrowKey, wasdKey] of keyPairs) {
                if (this._keyPressStates[arrowKey] && !Input.isPressed(arrowKey) && !Input.isPressed(wasdKey)) {
                    this._keyPressStates[arrowKey] = false;
                    this._keyPressTimestamps[arrowKey] = 0;
                }
            }
        }

        handleMouseInput(x, y) {
            const boardX = Math.floor((x - this._boardSprite.x) / this._squareSize);
            const boardY = Math.floor((y - this._boardSprite.y) / this._squareSize);

            this._cursorX = boardX;
            this._cursorY = boardY;
            this.updateCursorPosition();

            if (this._selectedPiece) {
                const validMoves = this.getValidMoves(this._selectedPiece);
                const isValidMove = validMoves.some(move => move.x === boardX && move.y === boardY);
                if (isValidMove) {
                    this.handleMove(this._selectedPiece, boardX, boardY);
                } else {
                    this.deselectPiece();
                }
            } else {
                const piece = this.getPieceAt(boardX, boardY);
                if (piece && piece.color === this._currentTurn) {
                    this.selectPiece(piece);
                }
            }
        }

        moveCursor(dx, dy) {
            this._cursorX = Math.max(0, Math.min(7, this._cursorX + dx));
            this._cursorY = Math.max(0, Math.min(7, this._cursorY + dy));
            this.updateCursorPosition();
        }

        updateCursorPosition() {
            this._cursorSprite.x = this._boardSprite.x + this._cursorX * this._squareSize;
            this._cursorSprite.y = this._boardSprite.y + this._cursorY * this._squareSize;
            this.updateHighlightBox();
            this.updateSelectionBox();
        }

        onTileClicked(x, y) {
            console.log(`Tile clicked at (${x}, ${y})`);
            const boardX = Math.floor((x - this._boardSprite.x) / this._squareSize);
            const boardY = Math.floor((y - this._boardSprite.y) / this._squareSize);
            if (this._selectedPiece) {
                const validMoves = this.getValidMoves(this._selectedPiece);
                const isValidMove = validMoves.some(move => move.x === boardX && move.y === boardY);
                if (isValidMove) {
                    this.movePiece(this._selectedPiece, boardX, boardY).then(() => {
                        this.deselectPiece();
                        this.switchTurn();
                    });
                }
            } else {
                const piece = this.getPieceAt(boardX, boardY);
                if (piece && piece.color === this._currentTurn) {
                    this.selectPiece(piece);
                    this._cursorX = boardX;
                    this._cursorY = boardY;
                    this.updateCursorPosition();
                }
            }
        }

        updateHighlightBox() {
            const boardX = this._cursorX;
            const boardY = this._cursorY;
            if (boardX >= 0 && boardX < 8 && boardY >= 0 && boardY < 8) {
                this._highlightBox.x = this._boardSprite.x + boardX * this._squareSize + this._config.highlightOffsetX;
                this._highlightBox.y = this._boardSprite.y + boardY * this._squareSize + this._config.highlightOffsetY;
                this._highlightBox.visible = true;
            } else {
                this._highlightBox.visible = false;
            }
        }

        updateSelectionBox() {
            if ($gameVariables.value(4) !== 'aivai') {
                const boardX = this._cursorX;
                const boardY = this._cursorY;
                if (this._selectionBox && boardX >= 0 && boardX < 8 && boardY >= 0 && boardY < 8) {
                    this._selectionBox.x = this._boardSprite.x + boardX * this._squareSize + this._config.selectionBoxOffsetX;
                    this._selectionBox.y = this._boardSprite.y + boardY * this._squareSize + this._config.selectionBoxOffsetY;
                    this._selectionBox.visible = true;
                } else if (this._selectionBox) {
                    this._selectionBox.visible = false;
                }
            } else {
                if (this._selectionBox) {
                    this._selectionBox.visible = false;
                }
            }
        }

        updateSelectionBoxPosition(x, y) {
            const boardX = Math.floor((x - this._boardSprite.x) / this._squareSize);
            const boardY = Math.floor((y - this._boardSprite.y) / this._squareSize);
            if (boardX >= 0 && boardX < 8 && boardY >= 0 && boardY < 8) {
                this._cursorX = boardX;
                this._cursorY = boardY;
                this.updateCursorPosition();
                this.updateSelectionBox();
            }
        }

        selectPieceUnderCursor() {
            const piece = this.getPieceAt(this._cursorX, this._cursorY);
            if (piece && piece.color === this._currentTurn) {
                this.selectPiece(piece);
            } else {
                this.checkMoveSelection(this._cursorX, this._cursorY);
            }
        }

confirmMove() {
    if (this._selectedPiece) {
        // If the king is selected and castling moves exist, handle castling first.
        if (this._selectedPiece.type === 'king') {
            const validMoves = this.getValidMoves(this._selectedPiece);
            const castlingMoves = validMoves.filter(m => m.castling);
            if (castlingMoves.length > 0) {
                this.showCastlePrompt().then(response => {
                    if (response === 'yes') {
                        if (castlingMoves.length === 1) {
                            this.handleMove(this._selectedPiece, castlingMoves[0].x, castlingMoves[0].y);
                        } else {
                            this.showCastleSidePrompt(castlingMoves).then(side => {
                                const chosen = castlingMoves.find(m => m.castling === side);
                                if (chosen) {
                                    this.handleMove(this._selectedPiece, chosen.x, chosen.y);
                                }
                            });
                        }
                    }
                    // If 'no', do nothing (or you can allow the player to try another move)
                });
                return;
            }
        }
        // Normal move: check if the current cursor square is valid.
        const validMoves = this.getValidMoves(this._selectedPiece);
        const isValidMove = validMoves.some(m => m.x === this._cursorX && m.y === this._cursorY);
        if (isValidMove) {
            this.handleMove(this._selectedPiece, this._cursorX, this._cursorY);
        } else {
            // If the cursor is over another of your pieces, select that piece.
            const target = this.getPieceAt(this._cursorX, this._cursorY);
            if (target && target.color === this._currentTurn) {
                this.selectPiece(target);
            }
        }
    } else {
        this.selectPieceUnderCursor();
    }
}

        checkPieceSelection(x, y) {
            const boardX = Math.floor((x - this._boardSprite.x) / this._squareSize);
            const boardY = Math.floor((y - this._boardSprite.y) / this._squareSize);
            const piece = this.getPieceAt(boardX, boardY);
            if (piece && piece.color === this._currentTurn) {
                this.selectPiece(piece);
            }
        }

        checkMoveSelection(x, y) {
            const boardX = Math.floor((x - this._boardSprite.x) / this._squareSize);
            const boardY = Math.floor((y - this._boardSprite.y) / this._squareSize);
            if (this._selectedPiece) {
                const validMoves = this.getValidMoves(this._selectedPiece);
                const isValidMove = validMoves.some(move => move.x === boardX && move.y === boardY);
                if (isValidMove) {
                    this.handleMove(this._selectedPiece, boardX, boardY);
                }
            }
        }

        async onPieceClick(piece) {
            if (this._gameOver) return;
            if (this._selectedPiece) {
                if (this._selectedPiece === piece) {
                    this.deselectPiece();
                } else if (this._selectedPiece.color === this._currentTurn && piece.color !== this._currentTurn) {
                    const validMoves = this.getValidMoves(this._selectedPiece);
                    const isValidCapture = validMoves.some(move => move.x === piece.gridX && move.y === piece.gridY);
                    if (isValidCapture) {
                        await this.movePiece(this._selectedPiece, piece.gridX, piece.gridY);
                        await this.capturePiece(piece);
                    }
                }
            } else if (piece.color === this._currentTurn) {
                this.selectPiece(piece);
            }
        }

        selectPiece(piece) {
            console.log(`Piece selected: ${piece.type} at ${piece.gridX}, ${piece.gridY}`);
            this._selectedPiece = piece;
            this._cursorX = piece.gridX;
            this._cursorY = piece.gridY;
            this.updateCursorPosition();
            this.highlightValidMoves(piece);
            this.showPiecePortrait(piece);
            if (this._config.useSprites) {
                this.startSteppingAnimation(piece);
            }
        }

        showPiecePortrait(piece) {
            if (this._portraitWindow) {
                this.removeChild(this._portraitWindow);
                this._portraitWindow = null;
            }
            if (this._labelWindow) {
                this.removeChild(this._labelWindow);
                this._labelWindow = null;
            }

            const key = piece.color + piece.type.charAt(0).toUpperCase() + piece.type.slice(1);
            const portraitImage = this._config.piecePortraits[key];
            const label = this._config.pieceLabels[key];

            if (portraitImage) {
                const portraitBitmap = ImageManager.loadPicture(portraitImage);
                portraitBitmap.addLoadListener(() => {
                    const portraitRect = new Rectangle(
                        this._config.portraitOffsetX,
                        this._config.portraitOffsetY,
                        portraitBitmap.width,
                        portraitBitmap.height
                    );

                    const labelRect = new Rectangle(
                        this._config.portraitOffsetX,
                        this._config.portraitOffsetY + portraitBitmap.height + 10,
                        this._config.labelWindowWidth,
                        this._config.labelWindowHeight
                    );

                    this._portraitWindow = new Window_Base(portraitRect);
                    this._labelWindow = new Window_Base(labelRect);

                    if (this._config.portraitWindowSkin) {
                        this._portraitWindow.windowskin = ImageManager.loadSystem(this._config.portraitWindowSkin);
                        this._labelWindow.windowskin = ImageManager.loadSystem(this._config.portraitWindowSkin);
                    }

                    this._portraitWindow.contents.clear();
                    this._portraitWindow.contents.blt(
                        portraitBitmap,
                        0, 0,
                        portraitBitmap.width,
                        portraitBitmap.height,
                        0, 0
                    );

                    this._labelWindow.contents.clear();
                    this._labelWindow.contents.fontSize = this._config.labelFontSize;

                    const labelY = (this._config.labelWindowHeight - this._config.labelFontSize) / 8;
                    this._labelWindow.contents.drawText(
                        label,
                        0, labelY,
                        this._config.labelWindowWidth,
                        this._config.labelFontSize
                    );

                    this.addChild(this._portraitWindow);
                    this.addChild(this._labelWindow);
                });
            }
        }

        deselectPiece() {
            console.log("Piece deselected");
            if (this._config.useSprites && this._selectedPiece) {
                this.stopSteppingAnimation(this._selectedPiece);
            }
            this._selectedPiece = null;
            this.clearHighlights();
            this.clearPiecePortrait();
        }

        clearPiecePortrait() {
            if (this._portraitWindow) {
                this.removeChild(this._portraitWindow);
                this._portraitWindow = null;
            }
            if (this._labelWindow) {
                this.removeChild(this._labelWindow);
                this._labelWindow = null;
            }
        }

async movePiece(piece, x, y) {
    if (piece) {
        const startX = piece.x;
        const startY = piece.y;
        const endX = this._boardSprite.x + x * this._squareSize + this._config.pieceOffsetX;
        const endY = this._boardSprite.y + y * this._squareSize + this._config.pieceOffsetY;
        const duration = 60;
        const direction = getDirection(piece.gridX, piece.gridY, x, y);
        piece.orientation = direction;
        if (this._config.useSprites) {
            piece.setFrame(
                piece.bitmap.width / 3,
                piece.bitmap.height / 4 * getOrientationIndex(direction),
                piece.bitmap.width / 3,
                piece.bitmap.height / 4
            );
        }
        playSoundEffect(this._config.moveSoundEffect, this._config.moveSoundVolume, this._config.moveSoundPitch);
        await this.animateMovement(piece, startX, startY, endX, endY, duration);
        piece.gridX = x;
        piece.gridY = y;
        // Mark the piece as having moved.
        if (piece.type === 'king' || piece.type === 'rook') {
            piece.hasMoved = true;
        }
        this.updatePieceZIndex(piece);
        this.deselectPiece();
    }
}

// Returns an array of squares between the king and rook (assumes same row)
getSquaresBetween(kingX, rookX, row) {
    let squares = [];
    const start = Math.min(kingX, rookX) + 1;
    const end = Math.max(kingX, rookX) - 1;
    for (let x = start; x <= end; x++) {
        squares.push({ x: x, y: row });
    }
    return squares;
}

// Returns true if the square (x,y) is attacked by any piece of attackerColor.
isSquareAttacked(x, y, attackerColor) {
    const attackers = this._pieces.filter(p => p.color === attackerColor);
    for (const piece of attackers) {
        let moves = [];
        if (piece.type === 'king') {
            // Calculate the king's adjacent squares directly.
            moves = [
                { x: piece.gridX + 1, y: piece.gridY },
                { x: piece.gridX - 1, y: piece.gridY },
                { x: piece.gridX, y: piece.gridY + 1 },
                { x: piece.gridX, y: piece.gridY - 1 },
                { x: piece.gridX + 1, y: piece.gridY + 1 },
                { x: piece.gridX - 1, y: piece.gridY + 1 },
                { x: piece.gridX + 1, y: piece.gridY - 1 },
                { x: piece.gridX - 1, y: piece.gridY - 1 }
            ];
        } else {
            moves = this.getValidMoves(piece);
        }
        if (moves.some(m => m.x === x && m.y === y && !m.castling)) {
            return true;
        }
    }
    return false;
}

// Returns true if the given king is in check.
isKingInCheck(king) {
    const enemyColor = king.color === 'white' ? 'black' : 'white';
    return this.isSquareAttacked(king.gridX, king.gridY, enemyColor);
}

// Returns true if the king and given rook can castle.
canCastle(king, rook) {
    if (king.hasMoved || rook.hasMoved) return false;
    if (king.color !== rook.color) return false;
    if (king.gridY !== rook.gridY) return false;
    // All squares between must be empty.
    const squaresBetween = this.getSquaresBetween(king.gridX, rook.gridX, king.gridY);
    for (const pos of squaresBetween) {
        if (this.getPieceAt(pos.x, pos.y)) return false;
    }
    // The king’s starting square, the square it moves through, and its landing square must not be attacked.
    const enemyColor = king.color === 'white' ? 'black' : 'white';
    let direction = rook.gridX < king.gridX ? -1 : 1;
    let kingPath = [
        { x: king.gridX, y: king.gridY },
        { x: king.gridX + direction, y: king.gridY },
        { x: king.gridX + 2 * direction, y: king.gridY }
    ];
    for (const square of kingPath) {
        if (this.isSquareAttacked(square.x, square.y, enemyColor)) return false;
    }
    return true;
}


        updatePieceZIndex(piece) {
            piece.z = piece.y;
            this.sortPieces();
        }

        sortPieces() {
            this._pieces.sort((a, b) => a.y - b.y);
            this._pieces.forEach(piece => this.addChild(piece));
        }

        async animateMovement(sprite, startX, startY, endX, endY, duration) {
            return new Promise((resolve) => {
                let frame = 0;
                const move = () => {
                    frame++;
                    sprite.x = startX + (endX - startX) * (frame / duration);
                    sprite.y = startY + (endY - startY) * (frame / duration);

                    if (frame < duration) {
                        requestAnimationFrame(move);
                    } else {
                        sprite.x = endX;
                        sprite.y = endY;
                        resolve();
                    }
                };
                move();
            });
        }

        async capturePiece(piece) {
            if (piece.type === 'king') {
                const winningColor = piece.color === 'white' ? 'black' : 'white';
                await this.playCaptureAnimation(piece);
                this._pieces = this._pieces.filter(p => p !== piece);
                if (this._aiPieces) {
                    this._aiPieces = this._aiPieces.filter(p => p !== piece);
                }
                this.removeChild(piece);
                this.endGame(winningColor);
                return;
            }
            await this.playCaptureAnimation(piece);
            this._pieces = this._pieces.filter(p => p !== piece);
            if (this._aiPieces) {
                this._aiPieces = this._aiPieces.filter(p => p !== piece);
            }
            this.removeChild(piece);
        }

        async playCaptureAnimation(piece) {
            return new Promise((resolve) => {
                const animationId = this.getPieceCaptureAnimationId(piece);
                const animation = $dataAnimations[animationId];
                if (!animation) {
                    resolve();
                    return;
                }
                const placeholderSprite = new Sprite();
                placeholderSprite.x = piece.x;
                placeholderSprite.y = piece.y;
                this.addChild(placeholderSprite);

                let animationSprite;
                if (animation.frames && animation.frames.length > 0) {
                    animationSprite = new Sprite_AnimationMV();
                    animationSprite.setup([placeholderSprite], animation, false, 0);
                } else {
                    animationSprite = new Sprite_Animation();
                    animationSprite.setup([placeholderSprite], animation, false, 0);
                }
                this.addChild(animationSprite);
                animationSprite._loop = false;
                animationSprite._hideOnEnd = true;

                const checkAnimationEnd = () => {
                    if (!animationSprite.isPlaying()) {
                        this.removeChild(animationSprite);
                        this.removeChild(placeholderSprite);
                        resolve();
                    } else {
                        requestAnimationFrame(checkAnimationEnd);
                    }
                };
                checkAnimationEnd();
            });
        }

        getPieceCaptureAnimationId(piece) {
            switch (piece.type) {
                case 'pawn':   return this._config.pawnCaptureAnimationId   || this._config.captureAnimationId;
                case 'rook':   return this._config.rookCaptureAnimationId   || this._config.captureAnimationId;
                case 'knight': return this._config.knightCaptureAnimationId || this._config.captureAnimationId;
                case 'bishop': return this._config.bishopCaptureAnimationId || this._config.captureAnimationId;
                case 'queen':  return this._config.queenCaptureAnimationId  || this._config.captureAnimationId;
                case 'king':   return this._config.kingCaptureAnimationId   || this._config.captureAnimationId;
                default:       return this._config.captureAnimationId;
            }
        }

async handleMove(piece, x, y) {
    this._isProcessingMove = true;
    const validMoves = this.getValidMoves(piece);
    const chosenMove = validMoves.find(m => m.x === x && m.y === y);
    if (!chosenMove) {
        this._isProcessingMove = false;
        return;
    }
    if (chosenMove.castling) {
        await this.performCastling(piece, chosenMove);
        this.clearHighlights(); // ← Clear the green preview squares after castling.
    } else if (this.isValidCapture(piece, x, y)) {
        const target = this.getPieceAt(x, y);
        await this.movePiece(piece, x, y);
        await this.capturePiece(target);
    } else {
        await this.movePiece(piece, x, y);
    }
    if (piece.type === 'pawn' &&
        ((piece.color === 'white' && piece.gridY === 7) ||
         (piece.color === 'black' && piece.gridY === 0))) {
        await this.promotePawn(piece);
    }
    this.switchTurn();
    this.showPiecePortrait(piece);
    this._isProcessingMove = false;
    this._moveCompleted = true;
}

async performCastling(king, move) {
    const rook = this._pieces.find(p => p._id === move.rookId);
    if (!rook) return;
    const direction = move.castling === 'kingside' ? 1 : -1;
    const kingTargetX = king.gridX + 2 * direction;
    const kingTargetY = king.gridY;
    const rookTargetX = king.gridX + direction;
    const rookTargetY = king.gridY;
    
    // Animate the king’s move.
    const kingStartX = king.x, kingStartY = king.y;
    const kingEndX = this._boardSprite.x + kingTargetX * this._squareSize + this._config.pieceOffsetX;
    const kingEndY = this._boardSprite.y + kingTargetY * this._squareSize + this._config.pieceOffsetY;
    await this.animateMovement(king, kingStartX, kingStartY, kingEndX, kingEndY, 60);
    king.gridX = kingTargetX;
    king.gridY = kingTargetY;
    king.hasMoved = true;
    this.updatePieceZIndex(king);
    
    // Animate the rook’s move.
    const rookStartX = rook.x, rookStartY = rook.y;
    const rookEndX = this._boardSprite.x + rookTargetX * this._squareSize + this._config.pieceOffsetX;
    const rookEndY = this._boardSprite.y + rookTargetY * this._squareSize + this._config.pieceOffsetY;
    await this.animateMovement(rook, rookStartX, rookStartY, rookEndX, rookEndY, 60);
    rook.gridX = rookTargetX;
    rook.gridY = rookTargetY;
    rook.hasMoved = true;
    this.updatePieceZIndex(rook);
}

async promotePawn(piece) {
    // In PvP (or if the pawn is controlled by the player in PvAI) show a promotion menu.
    if (this._gameMode === 'pvp' || (this._gameMode === 'pvai' && piece.color === this._playerColor)) {
        await this.showPromotionMenu(piece);
    } else {
        // For AI, automatically promote to a queen.
        this.applyPromotion(piece, 'queen');
    }
}

async showPromotionMenu(piece) {
    return new Promise(resolve => {
        const options = ['queen', 'rook', 'bishop', 'knight'];
        // Set the vertical position (y). The width/height will be overridden in initialize.
        const rect = new Rectangle(0, 300, 0, 0);
        const promotionWindow = new Window_Promotion(rect, options, this._config, piece.color);
        promotionWindow.openness = 0;
        this.addChild(promotionWindow);
        
        // Animate the window opening.
        const openWindow = () => {
            promotionWindow.openness += 10;
            if (promotionWindow.openness < 255) {
                requestAnimationFrame(openWindow);
            }
        };
        openWindow();

        promotionWindow.setHandler('ok', () => {
            const selectedOption = promotionWindow.currentSymbol();
            this.applyPromotion(piece, selectedOption);
            this.removeChild(promotionWindow);
            resolve();
        });
        promotionWindow.setHandler('cancel', () => {
            this.applyPromotion(piece, 'queen');
            this.removeChild(promotionWindow);
            resolve();
        });
    });
}

applyPromotion(piece, promotionType) {
    // Change the piece type.
    piece.type = promotionType;
    // Build the key to look up images and labels (e.g., "whiteQueen")
    const key = piece.color + promotionType.charAt(0).toUpperCase() + promotionType.slice(1);
    const newImage = this._config.pieceImages[key];
    if (newImage) {
        const bitmap = ImageManager.loadPicture(newImage);
        bitmap.addLoadListener(() => {
            piece.bitmap = bitmap;
            // If using sprites, update the frame based on orientation.
            if (this._config.useSprites) {
                piece.setFrame(
                    bitmap.width / 3,
                    bitmap.height / 4 * getOrientationIndex(piece.orientation),
                    bitmap.width / 3,
                    bitmap.height / 4
                );
            }
        });
    }
    // (Optional) You could also update the piece’s value or play a sound.
}

        switchTurn() {
            this._currentTurn = this._currentTurn === 'white' ? 'black' : 'white';
            this.updateTurnIndicator();
            console.log(`Turn switched to ${this._currentTurn}`);
        }

        highlightValidMoves(piece) {
            this.clearHighlights();
            const validMoves = this.getValidMoves(piece);
            validMoves.forEach(move => {
                const highlight = new Sprite();
                highlight.bitmap = new Bitmap(this._squareSize, this._squareSize);
                highlight.bitmap.fillAll('rgba(0, 255, 0, 0.5)');
                highlight.x = this._boardSprite.x + move.x * this._squareSize + this._config.highlightOffsetX;
                highlight.y = this._boardSprite.y + move.y * this._squareSize + this._config.highlightOffsetY;
                highlight.z = 1003;
                highlight.moveX = move.x;
                highlight.moveY = move.y;
                this._highlights.push(highlight);
                this.addChild(highlight);
                this.startHighlightPulsing(highlight);
            });
        }

        startHighlightPulsing(highlight) {
            const pulsingSpeed = 20;
            const pulse = () => {
                if (highlight.pulsingUp) {
                    highlight.opacity += 10;
                    if (highlight.opacity >= 255) {
                        highlight.pulsingUp = false;
                    }
                } else {
                    highlight.opacity -= 10;
                    if (highlight.opacity <= 100) {
                        highlight.pulsingUp = true;
                    }
                }
                if (highlight.parent) {
                    setTimeout(pulse, pulsingSpeed);
                }
            };
            highlight.pulsingUp = true;
            pulse();
        }

        clearHighlights() {
            this._highlights.forEach(highlight => this.removeChild(highlight));
            this._highlights = [];
        }

        getValidMoves(piece) {
            const moves = [];
            switch (piece.type) {
                case 'pawn':
                    this.getPawnMoves(piece, moves);
                    break;
                case 'rook':
                    this.getRookMoves(piece, moves);
                    break;
                case 'knight':
                    this.getKnightMoves(piece, moves);
                    break;
                case 'bishop':
                    this.getBishopMoves(piece, moves);
                    break;
                case 'queen':
                    this.getQueenMoves(piece, moves);
                    break;
                case 'king':
                    this.getKingMoves(piece, moves);
                    break;
            }
            return moves;
        }

        getPawnMoves(piece, moves) {
            const direction = piece.color === 'white' ? 1 : -1;
            const startRow = piece.color === 'white' ? 1 : 6;

            // Forward
            if (this.isValidMove(piece, piece.gridX, piece.gridY + direction, false)) {
                moves.push({ x: piece.gridX, y: piece.gridY + direction });
                if (piece.gridY === startRow &&
                    this.isValidMove(piece, piece.gridX, piece.gridY + 2 * direction, false)) {
                    moves.push({ x: piece.gridX, y: piece.gridY + 2 * direction });
                }
            }
            // Diagonal captures
            if (this.isValidCapture(piece, piece.gridX - 1, piece.gridY + direction)) {
                moves.push({ x: piece.gridX - 1, y: piece.gridY + direction });
            }
            if (this.isValidCapture(piece, piece.gridX + 1, piece.gridY + direction)) {
                moves.push({ x: piece.gridX + 1, y: piece.gridY + direction });
            }
        }

        getRookMoves(piece, moves) {
            this.addLinearMoves(piece, moves, [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
            ]);
        }

        getKnightMoves(piece, moves) {
            const knightMoves = [
                { x: 1, y: 2 }, { x: 2, y: 1 },
                { x: -1, y: 2 }, { x: -2, y: 1 },
                { x: 1, y: -2 }, { x: 2, y: -1 },
                { x: -1, y: -2 }, { x: -2, y: -1 },
            ];
            knightMoves.forEach(move => {
                if (this.isValidMove(piece, piece.gridX + move.x, piece.gridY + move.y, true)) {
                    moves.push({ x: piece.gridX + move.x, y: piece.gridY + move.y });
                }
            });
        }

        getBishopMoves(piece, moves) {
            this.addLinearMoves(piece, moves, [
                { x: 1, y: 1 },
                { x: -1, y: 1 },
                { x: 1, y: -1 },
                { x: -1, y: -1 },
            ]);
        }

        getQueenMoves(piece, moves) {
            this.addLinearMoves(piece, moves, [
                { x: 1, y: 0 }, { x: -1, y: 0 },
                { x: 0, y: 1 }, { x: 0, y: -1 },
                { x: 1, y: 1 }, { x: -1, y: 1 },
                { x: 1, y: -1 }, { x: -1, y: -1 },
            ]);
        }

getKingMoves(piece, moves) {
    const kingMoves = [
        { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: -1 },
        { x: 1, y: 1 }, { x: -1, y: 1 },
        { x: 1, y: -1 }, { x: -1, y: -1 },
    ];
    kingMoves.forEach(move => {
        if (this.isValidMove(piece, piece.gridX + move.x, piece.gridY + move.y, true)) {
            moves.push({ x: piece.gridX + move.x, y: piece.gridY + move.y });
        }
    });
    // If the king hasn't moved and is not currently in check, add castling moves.
    if (!piece.hasMoved && !this.isKingInCheck(piece)) {
        const kingRow = piece.gridY;
        // Find rooks on the same row that haven’t moved.
        const rooks = this._pieces.filter(p => p.type === 'rook' && p.color === piece.color && p.gridY === kingRow && !p.hasMoved);
        rooks.forEach(rook => {
            if (this.canCastle(piece, rook)) {
                const direction = rook.gridX < piece.gridX ? -1 : 1;
                const targetX = piece.gridX + 2 * direction;
                // Mark this move as a castling move, and store the rook's id.
                moves.push({ x: targetX, y: piece.gridY, castling: direction === 1 ? 'kingside' : 'queenside', rookId: rook._id });
            }
        });
    }
}

        isValidMove(piece, x, y, canCapture) {
            if (x < 0 || x >= 8 || y < 0 || y >= 8) return false;
            const target = this.getPieceAt(x, y);
            if (target) {
                return canCapture && target.color !== piece.color;
            }
            return true;
        }

        isValidCapture(piece, x, y) {
            if (x < 0 || x >= 8 || y < 0 || y >= 8) return false;
            const target = this.getPieceAt(x, y);
            return target && target.color !== piece.color;
        }

        getPieceAt(x, y) {
            return this._pieces.find(piece => piece.gridX === x && piece.gridY === y);
        }

        addLinearMoves(piece, moves, directions) {
            directions.forEach(direction => {
                for (let i = 1; i < 8; i++) {
                    const x = piece.gridX + i * direction.x;
                    const y = piece.gridY + i * direction.y;
                    if (x < 0 || x >= 8 || y < 0 || y >= 8) break;
                    const blockingPiece = this.getPieceAt(x, y);
                    if (blockingPiece) {
                        if (blockingPiece.color !== piece.color) {
                            moves.push({ x, y });
                        }
                        break;
                    }
                    moves.push({ x, y });
                }
            });
        }
		
		showCastleSidePrompt(castlingMoves) {
    return new Promise(resolve => {
        const rect = new Rectangle(0, 300, 0, 0);
        const promptWindow = new Window_CastleSidePrompt(rect);
        promptWindow.x = (Graphics.boxWidth - promptWindow.windowWidth()) / 2;
        promptWindow.openness = 0;
        this.addChild(promptWindow);
        const openWindow = () => {
            promptWindow.openness += 10;
            if (promptWindow.openness < 255) {
                requestAnimationFrame(openWindow);
            }
        };
        openWindow();
        promptWindow.setHandler('ok', () => {
            const side = promptWindow.currentSymbol();
            this.removeChild(promptWindow);
            resolve(side);
        });
        promptWindow.setHandler('cancel', () => {
            this.removeChild(promptWindow);
            resolve('kingside'); // or choose a default
        });
    });
}

showCastlePrompt() {
    return new Promise(resolve => {
        const rect = new Rectangle(0, 300, 0, 0);
        const promptWindow = new Window_CastlePrompt(rect);
        promptWindow.x = (Graphics.boxWidth - promptWindow.windowWidth()) / 2;
        promptWindow.openness = 0;
        this.addChild(promptWindow);
        const openWindow = () => {
            promptWindow.openness += 10;
            if (promptWindow.openness < 255) {
                requestAnimationFrame(openWindow);
            }
        };
        openWindow();
        promptWindow.setHandler('ok', () => {
            const response = promptWindow.currentSymbol();
            this.removeChild(promptWindow);
            resolve(response);
        });
        promptWindow.setHandler('cancel', () => {
            this.removeChild(promptWindow);
            resolve('no');
        });
    });
}

        endGame(winningColor) {
            this._gameOver = true;
            this.clearPiecePortrait();

            if (winningColor === 'white' && this._config.whiteVictoryImage) {
                this.showVictoryMessageImage(this._config.whiteVictoryImage);
            } else if (winningColor === 'black' && this._config.blackVictoryImage) {
                this.showVictoryMessageImage(this._config.blackVictoryImage);
            } else {
                this.showVictoryMessageText(winningColor);
            }

            if (this._playerColor && winningColor === this._playerColor) {
                const switchId = this._config.victorySwitch;
                if (switchId) {
                    $gameSwitches.setValue(switchId, true);
                }
            }
            if (winningColor === 'white') {
                const whiteVictorySwitch = Number(this._config.whiteVictorySwitch);
                if (whiteVictorySwitch) {
                    $gameSwitches.setValue(whiteVictorySwitch, true);
                }
            } else if (winningColor === 'black') {
                const blackVictorySwitch = Number(this._config.blackVictorySwitch);
                if (blackVictorySwitch) {
                    $gameSwitches.setValue(blackVictorySwitch, true);
                }
            }
        }

        showVictoryMessageText(winningColor) {
            const victoryMessage = this._config.victoryMessageContent.replace('{WINNER}', winningColor.charAt(0).toUpperCase() + winningColor.slice(1));
            const victoryBitmap = new Bitmap(Graphics.width, Graphics.height);
            victoryBitmap.fontSize = 48;

            const textWidth = victoryBitmap.measureTextWidth(victoryMessage);
            const textHeight = victoryBitmap.fontSize + 8;
            const boxPadding = 16;

            const boxX = this._config.victoryMessageX - 100;
            const boxY = this._config.victoryMessageY - 15;

            victoryBitmap.fillRect(
                boxX,
                boxY,
                textWidth + boxPadding * 2 + 180,
                textHeight + boxPadding * 2,
                'rgba(0, 0, 0, 0.6)'
            );
            victoryBitmap.drawText(victoryMessage, this._config.victoryMessageX, this._config.victoryMessageY, textWidth, textHeight, 'center');

            const victorySprite = new Sprite(victoryBitmap);
            this.addChild(victorySprite);
            this._victorySprite = victorySprite;
        }

        showVictoryMessageImage(image) {
            const victorySprite = new Sprite(ImageManager.loadPicture(image));
            victorySprite.x = this._config.victoryMessageX;
            victorySprite.y = this._config.victoryMessageY;
            this.addChild(victorySprite);
            this._victorySprite = victorySprite;
        }

        startSteppingAnimation(piece) {
            piece._stepping = true;
            piece._stepFrame = 0;
        }

        stopSteppingAnimation(piece) {
            piece._stepping = false;
            const orientationIndex = getOrientationIndex(piece.orientation);
            piece.setFrame(
                piece.bitmap.width / 3,
                piece.bitmap.height / 4 * orientationIndex,
                piece.bitmap.width / 3,
                piece.bitmap.height / 4
            );
        }

        updateSteppingAnimation() {
            if (!this._config.useSprites) return;
            if (this._selectedPiece && this._selectedPiece._stepping) {
                this._stepFrame++;
                if (this._stepFrame % 10 === 0) {
                    const frame = this._stepFrame % 40 === 0 ? 0 :
                                  (this._stepFrame % 20 === 0 ? 2 : 1);
                    const orientationIndex = getOrientationIndex(this._selectedPiece.orientation);
                    this._selectedPiece.setFrame(
                        frame * this._selectedPiece.bitmap.width / 3,
                        orientationIndex * this._selectedPiece.bitmap.height / 4,
                        this._selectedPiece.bitmap.width / 3,
                        this._selectedPiece.bitmap.height / 4
                    );
                }
            }
        }

        checkEndGameInput() {
            if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered()) {
                if (this._victorySprite) {
                    this.removeChild(this._victorySprite);
                    SceneManager.goto(Scene_Map);
                }
            }
        }

        // =========================================================================
        // ==============         MINIMAX-BASED AI LOGIC BELOW         ==============
        // =========================================================================

        async updateAI() {
            const depth = 3;
            const aiColor = this._currentTurn;

            const bestMove = this.findBestMove(aiColor, depth);
            if (!bestMove) {
                console.log("AI has no moves! (Checkmate or stalemate)");
                this.switchTurn();
                return;
            }

            const { piece, toX, toY } = bestMove;
            this.showPiecePortrait(piece);
            this.updateSelectionBoxPosition(piece.gridX, piece.gridY);
            await this.handleMove(piece, toX, toY);
        }

        /**
         * findBestMove() now returns the *best move* that is NOT the same as last time.
         */
        findBestMove(color, depth) {
            // We'll gather all moves with their final scores, then pick best.
            let moveScores = [];
            const allPieces = this.getAllPieces(color);

            for (const p of allPieces) {
                const validMoves = this.getValidMoves(p);
                for (const m of validMoves) {
                    const oldX = p.gridX;
                    const oldY = p.gridY;
                    const capturedPiece = this.getPieceAt(m.x, m.y);

                    this.simulateMove(p, m.x, m.y, capturedPiece);
                    const score = this.minimax(depth - 1, this.switchColor(color), -Infinity, Infinity);
                    this.undoMove(p, oldX, oldY, capturedPiece);

                    // If color is black, invert sign so we effectively "minimize"
                    const finalScore = (color === 'white') ? score : -score;

                    moveScores.push({
                        piece: p,
                        fromX: oldX,
                        fromY: oldY,
                        toX: m.x,
                        toY: m.y,
                        finalScore
                    });
                }
            }

            if (moveScores.length === 0) {
                return null;
            }

            // Sort descending by finalScore
            moveScores.sort((a, b) => b.finalScore - a.finalScore);

            const lastMove = this._lastMoves[color];

            // Now pick the top move that isn't the same as last time
            let chosen = null;
            for (let i = 0; i < moveScores.length; i++) {
                const candidate = moveScores[i];
                if (!this.isSameAsLastMove(candidate, lastMove)) {
                    chosen = candidate;
                    break;
                }
            }

            // If all are the same as last move, we just pick the top anyway
            if (!chosen) {
                chosen = moveScores[0];
            }

            // Store this move as "last move" for color
            this._lastMoves[color] = {
                pieceId: chosen.piece._id,
                fromX: chosen.fromX,
                fromY: chosen.fromY,
                toX: chosen.toX,
                toY: chosen.toY
            };

            return chosen;
        }

        // Compare candidate vs stored last move
        isSameAsLastMove(candidate, lastMove) {
            if (!lastMove) return false;
            return (
                candidate.piece._id === lastMove.pieceId &&
                candidate.fromX === lastMove.fromX &&
                candidate.fromY === lastMove.fromY &&
                candidate.toX === lastMove.toX &&
                candidate.toY === lastMove.toY
            );
        }

        minimax(depth, currentColor, alpha, beta) {
            if (depth === 0 || this.isGameOver()) {
                return this.evaluateBoard();
            }

            const pieces = this.getAllPieces(currentColor);
            let movesFound = false;

            if (currentColor === 'white') {
                let maxEval = -Infinity;
                for (const p of pieces) {
                    const validMoves = this.getValidMoves(p);
                    for (const m of validMoves) {
                        movesFound = true;
                        const oldX = p.gridX;
                        const oldY = p.gridY;
                        const capturedPiece = this.getPieceAt(m.x, m.y);

                        this.simulateMove(p, m.x, m.y, capturedPiece);
                        const evalScore = this.minimax(depth - 1, 'black', alpha, beta);
                        this.undoMove(p, oldX, oldY, capturedPiece);

                        if (evalScore > maxEval) {
                            maxEval = evalScore;
                        }
                        if (evalScore > alpha) {
                            alpha = evalScore;
                        }
                        if (beta <= alpha) {
                            break;
                        }
                    }
                    if (beta <= alpha) {
                        break;
                    }
                }
                return movesFound ? maxEval : this.evaluateBoard();
            } else {
                let minEval = Infinity;
                for (const p of pieces) {
                    const validMoves = this.getValidMoves(p);
                    for (const m of validMoves) {
                        movesFound = true;
                        const oldX = p.gridX;
                        const oldY = p.gridY;
                        const capturedPiece = this.getPieceAt(m.x, m.y);

                        this.simulateMove(p, m.x, m.y, capturedPiece);
                        const evalScore = this.minimax(depth - 1, 'white', alpha, beta);
                        this.undoMove(p, oldX, oldY, capturedPiece);

                        if (evalScore < minEval) {
                            minEval = evalScore;
                        }
                        if (evalScore < beta) {
                            beta = evalScore;
                        }
                        if (beta <= alpha) {
                            break;
                        }
                    }
                    if (beta <= alpha) {
                        break;
                    }
                }
                return movesFound ? minEval : this.evaluateBoard();
            }
        }

        evaluateBoard() {
            let score = 0;
            for (const piece of this._pieces) {
                score += this.getPieceValue(piece);
            }
            return score;
        }

        getPieceValue(piece) {
            const baseValue = this.getBaseValue(piece.type);
            return piece.color === 'white' ? baseValue : -baseValue;
        }

        getBaseValue(type) {
            switch (type) {
                case 'pawn':   return 1;
                case 'knight': return 3;
                case 'bishop': return 3;
                case 'rook':   return 5;
                case 'queen':  return 9;
                case 'king':   return 100;
            }
            return 0;
        }

        switchColor(color) {
            return color === 'white' ? 'black' : 'white';
        }

        isGameOver() {
            const whiteKing = this._pieces.find(p => p.type === 'king' && p.color === 'white');
            const blackKing = this._pieces.find(p => p.type === 'king' && p.color === 'black');
            if (!whiteKing || !blackKing) {
                return true;
            }
            return false;
        }

        getAllPieces(color) {
            return this._pieces.filter(p => p.color === color);
        }

        simulateMove(piece, toX, toY, capturedPiece) {
            piece.gridX = toX;
            piece.gridY = toY;
            if (capturedPiece) {
                capturedPiece._capturedSim = true;
                this._pieces = this._pieces.filter(p => p !== capturedPiece);
            }
        }

        undoMove(piece, oldX, oldY, capturedPiece) {
            piece.gridX = oldX;
            piece.gridY = oldY;
            if (capturedPiece && capturedPiece._capturedSim) {
                capturedPiece._capturedSim = false;
                this._pieces.push(capturedPiece);
            }
        }
    }

    window.Scene_Chess = Scene_Chess;

    const _Scene_Chess_start = Scene_Chess.prototype.start;
    Scene_Chess.prototype.start = function() {
        _Scene_Chess_start.call(this);
    };

    const _Scene_Chess_terminate = Scene_Chess.prototype.terminate;
    Scene_Chess.prototype.terminate = function() {
        _Scene_Chess_terminate.call(this);
    };
	
class Window_Promotion extends Window_Command {
    initialize(rect, options, config, color) {
        this._options = options; // e.g., ['queen', 'rook', 'bishop', 'knight']
        this._config  = config;
        this._color   = color;
        // Calculate the window width (fixed) and height based on number of options.
        const width = this.windowWidth();
        const height = this.fittingHeight(this._options.length);
        // Center horizontally. (Use Graphics.boxWidth for screen width.)
        const x = (Graphics.boxWidth - width) / 2;
        // Use the passed rect's y or set your own vertical position.
        const y = rect.y;
        // Create a new rectangle using these dimensions.
        super.initialize(new Rectangle(x, y, width, height));
    }
    
    windowWidth() {
        return 300; // Set your desired width.
    }
    
    numVisibleRows() {
        return this._options.length; // Show all options.
    }
    
    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    }
    
    makeCommandList() {
        this._options.forEach(option => {
            const key = this._color + option.charAt(0).toUpperCase() + option.slice(1);
            const label = this._config.pieceLabels[key] || option;
            this.addCommand(label, option);
        });
    }
}

class Window_CastlePrompt extends Window_Command {
    initialize(rect) {
        super.initialize(rect);
    }
    windowWidth() {
        return 300;
    }
    numVisibleRows() {
        return 1;
    }
    makeCommandList() {
        this.addCommand("Yes", "yes");
        this.addCommand("No", "no");
    }
}

class Window_CastleSidePrompt extends Window_Command {
    initialize(rect) {
        super.initialize(rect);
    }
    windowWidth() {
        return 300;
    }
    numVisibleRows() {
        return 1;
    }
    makeCommandList() {
        this.addCommand("Kingside", "kingside");
        this.addCommand("Queenside", "queenside");
    }
}


	
})();
