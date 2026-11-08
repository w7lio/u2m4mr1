// ADICIONAR UMA VARIÁVEL PARA CONTAR O TEMPO, EM FRAMES OU UNIDADES ESPECÍFICAS

//==========================================================================
// Eli_Timer.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_BitmapFont
@orderAfter EliMZ_BitmapFontPro
@orderAfter EliMZ_FontManager
@orderAfter EliMZ_FontManagerPro
@orderAfter VisuMZ_0_CoreEngine
@orderAfter VisuMZ_1_EventsMoveCore

@plugindesc ♦1.3.0♦ Add new mechanics to the default timer!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-timer-for-rpg-maker-mv/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

• Pause/Resume timer.
• Start timer paused.
• Add/Remove seconds and minutes.
• You can change it to count upwards(1, 2, 3, 4...) instead of default 
count down.
• Turn on a switch when timer is working.
• Change the text color and outline color of the timer.
• Add hours and milliseconds.
• Optionally change the format of the timer text to show:
00:00:00:00
(Hours:Minutes:Seconds:Milliseconds)

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1ADHZBvI2or26ZZuqyonkwUl3n9Cs33ZbrhOnZpbuMCA/edit?usp=sharing

============================================================================

@param startPaused
@text Start paused
@type boolean
@desc Start the timer paused.
@default false

@param workingSwitch
@text Working Switch
@desc Turn a switch on when the timer is working.
@type switch
@default 0

@param flow
@text Timer Flow
@desc Choose if you want the timer to count down or count up.
@type select
@option Up
@option Down
@default Down

@param textUnits
@text Format of the timer
@desc Choose the format of the timer to show only seconds and minutes or hours.
@type select[]
@option Hours
@option Minutes
@option Seconds
@option Milliseconds
@default ["Hours","Minutes","Seconds","Milliseconds"]

@param textColor
@text Text color
@type text
@desc Change the default text color. Can use hex, html rgb and rgba colors. Default is white.
@default white

@param outlineColor
@text Outline color
@type text
@desc Change the outline color. Can use hex, html rgb and rgba colors. Default is rgba(0, 0, 0, 0.6).
@default rgba(0, 0, 0, 0.6)

@param fixShaking
@text Fix Shaking
@type boolean
@desc If true, the timer text will reduce it's shaking when updating the current count.
@default true

@param hideOnEnd
@text Hide Timer On End
@type boolean
@desc If true, the timer will hide when it ends the count.
@default true

@param hideOnPause
@text Hide Timer On Pause
@type boolean
@desc If true, the timer will hide when it is paused.
@default true

@param --- Variables ---

@param varHour
@text Hour
@desc Stores Hour Variable
@type variable
@default 0
@parent --- Variables ---

@param varMinutes
@text Minutes
@desc Stores minutes on the variable
@type variable
@default 0
@parent --- Variables ---

@param varSeconds
@text Seconds
@desc Stores seconds on the variable
@type variable
@default 0
@parent --- Variables ---

@param varMilliseconds
@text Milliseconds
@desc Stores milliseconds on the variable
@type variable
@default 0
@parent --- Variables ---

@param varFrames
@text Frames
@desc Stores frames on the variable
@type variable
@default 0
@parent --- Variables ---

@param varText
@text Timer Text
@desc Stores the timer text on a variable.
@type variable
@default 0
@parent --- Variables ---

@command changeFlow
@text Timer Flow
@desc Change the timer flow

    @arg flow
    @text Flow Type
    @type select
    @option Down
    @option Up
    @desc Choose the flow type. Down is default.

@command start
@text Start / Add / Remove - Timer
@desc If the timer is already working, you can use this to add or remove from the timer.

    @arg minutes
    @text Minutes
    @type text
    @desc Just like the event command, but you can use variables \v[id]. Negative values will remove minutes.
    @default 0

    @arg seconds
    @text Seconds
    @type text
    @desc Just like the event command, but you can use variables \v[id]. Negative values will remove seconds.
    @default 0

@command pause
@text Pause
@desc Pause the timer.

@command resume
@text Resume
@desc Resume the timer

@command changeColor
@text Change timer color
@desc Change the colors of the timer's text and outline.

    @arg text
    @text Text Color
    @type text
    @desc You can use rgb, hex or html color names.
    @default #ffffff

    @arg outline
    @text Outline Color
    @type text
    @desc You can use rgb, hex or html color names.
    @default 0, 0, 0, 0.6

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_Timer = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.Timer = {

    Parameters: class {
        constructor(parameters){
            this.flow = parameters.flow
            this.outlineColor = Eli.ColorManager.getHexOrName(parameters.outlineColor)
            this.startPaused = parameters.startPaused === "true"
            this.textUnits = JSON.parse(parameters.textUnits)
            this.textColor = Eli.ColorManager.getHexOrName(parameters.textColor)
            this.workingSwitch = Number(parameters.workingSwitch)
            this.fixShaking = parameters.fixShaking === "true"
            this.hideOnEnd = parameters.hideOnEnd === "true"
            this.hideOnPause = parameters.hideOnPause === "true"
            this.varHour = Number(parameters.varHour)
            this.varMinutes = Number(parameters.varMinutes)
            this.varSeconds = Number(parameters.varSeconds)
            this.varMilliseconds = Number(parameters.varMilliseconds)
            this.varFrames = Number(parameters.varFrames)
            this.varText = Number(parameters.varText)
        }
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_Timer")
        this.parameters = new this.Parameters(parameters)
    },

    initPluginCommands(){
        const commands = ['start', 'pause', 'resume', 'changeFlow', 'changeColor']
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

/* ----------------------------- PLUGIN COMMAND ----------------------------- */

    start(args) {
        const sec = Number(Eli.Utils.convertEscapeVariablesOnly(args.seconds))
        const min = Number(Eli.Utils.convertEscapeVariablesOnly(args.minutes))
        const timer = (sec*60) + (min*60**2)
    
        if($gameTimer.isWorking()){
            $gameTimer.changeFrames(timer)
        }else{
            $gameTimer.start(timer)
        }
    },
    
    pause() {
        $gameTimer.pause()
    },
    
    resume() {
        $gameTimer.resume()
    },
    
    changeFlow(args) {
        $gameTimer.setFlow(args.flow)
    },

    changeColor(args){
        const textColor = Eli.ColorManager.getHexOrName(args.text)
        const outlineColor = Eli.ColorManager.getHexOrName(args.outline)
        const timerSprite = SceneManager._scene._spriteset._timerSprite

        $gameTimer.changeTextColor(textColor)
        $gameTimer.changeOutlineColor(outlineColor)
        timerSprite.changeBitmapColors(textColor, outlineColor)
    },

}

{

const Plugin = Eli.Timer
const Alias = {}

Plugin.initialize()

/* ------------------------------- GAME TIMER ------------------------------- */
Alias.Game_Timer_initialize = Game_Timer.prototype.initialize
Game_Timer.prototype.initialize = function() {
    Alias.Game_Timer_initialize.call(this)
    this.initNewProperties()
}

Alias.Game_Timer_start = Game_Timer.prototype.start
Game_Timer.prototype.start = function(count) {
    this.beforeStart(count)
    Alias.Game_Timer_start.call(this, count)
    this.afterStart(count)
}

Alias.Game_Timer_stop = Game_Timer.prototype.stop
Game_Timer.prototype.stop = function() {
    Alias.Game_Timer_stop.call(this)
    this.clearFlags()
}

Alias.Game_Timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    if(!this.isPaused()){

        if(this.getFlow() === 'Up'){
            this.updateUpCount(sceneActive)
        }else{
            Alias.Game_Timer_update.call(this, sceneActive)
        }

        this.updateVariables()
    }
}

Game_Timer.prototype.updateVariables = function() {
    if(this._working){
        $gameVariables.setValue(Plugin.getParam().varHour, this.hours())
        $gameVariables.setValue(Plugin.getParam().varMinutes, this.minutes())
        $gameVariables.setValue(Plugin.getParam().varSeconds, this.seconds())
        $gameVariables.setValue(Plugin.getParam().varMilliseconds, this.milliseconds())
        $gameVariables.setValue(Plugin.getParam().varFrames, this._frames)
        $gameVariables.setValue(Plugin.getParam().varText, this.getText())
    }
}

Alias.Game_Timer_onExpire = Game_Timer.prototype.onExpire;
Game_Timer.prototype.onExpire = function() {
    Alias.Game_Timer_onExpire.call(this)
    this.clearFlags()

    if(Plugin.getParam().hideOnEnd){
        this.stop()
    }
}

Game_Timer.prototype.initNewProperties = function(){
    this._text = ""
    this._maxFrames = 0
    this._maxSeconds = 0
    this.applySettings(Plugin.getParam())
}

Game_Timer.prototype.applySettings = function(settings){
    this._maxUnitMembers = settings.textUnits.length
    this._countFlow = settings.flow
    this._pause = settings.startPaused
    this.changeTextColor(settings.textColor)
    this.changeOutlineColor(settings.outlineColor)
}

Game_Timer.prototype.changeTextColor = function(color){
    this._textColor = Eli.ColorManager.getHexOrName(color)
}

Game_Timer.prototype.changeOutlineColor = function(color){
    this._outlineColor = Eli.ColorManager.getHexOrName(color)
}

Game_Timer.prototype.beforeStart = function(count){
    this.setText("")
    this._maxUnitMembers = Plugin.getParam().textUnits.length
    this._maxFrames = count
    this._maxSeconds = count / 60
    this._pause = Plugin.getParam().startPaused
}

Game_Timer.prototype.setText = function(text){
    this._text = text
}

Game_Timer.prototype.afterStart = function(count){
    if(this.getFlow() === 'Up') {
        this._frames = 0
    }

    $gameSwitches.setValue(Plugin.getParam().workingSwitch, true)
}

Game_Timer.prototype.clearFlags = function() {
    this._pause = false
    $gameSwitches.setValue(Plugin.getParam().workingSwitch, false)
}

Game_Timer.prototype.isPaused = function() {
    return this._pause
}

Game_Timer.prototype.getFlow = function(){
    return this._countFlow
}

Game_Timer.prototype.updateUpCount = function(sceneActive){
    if (sceneActive && this._working && this._frames < this._maxFrames) {
        this._frames++

        if (this._frames === this._maxFrames) {
            this.onExpire()
        }
    }
}

Game_Timer.prototype.afterOnExpire = function(){
    this.clearFlags()

    if(Plugin.getParam().hideOnEnd){
        this.stop()
    }
}

Game_Timer.prototype.setFlow = function(direction){
    this._countFlow = direction
}

Game_Timer.prototype.changeFrames = function(value){
    this._frames += value
}

Game_Timer.prototype.pause = function() {
    this._pause = true
}

Game_Timer.prototype.resume = function() {
    this._pause = false
}

Game_Timer.prototype.milliseconds = function() {
    return Eli.Date.framesToMilliSeconds(this._frames)
}

Game_Timer.prototype.minutes = function() {
    return Math.floor(this.seconds() / 60)
}

Game_Timer.prototype.hours = function() {
    return Math.floor(this.minutes() / 60)
}

Game_Timer.prototype.getTextForMilliseconds = function(){
    const ms = Eli.Date.framesToMilliSeconds(this._frames % 60) / 10
    return Math.floor(ms).padZero(2)
}

Game_Timer.prototype.getTextForSeconds = function(){
    return (this.seconds() % 60).padZero(2)
}

Game_Timer.prototype.getTextForMinutes = function(){
    return (this.minutes() % 60).padZero(2)
}

Game_Timer.prototype.getTextForHours = function(){
    return this.hours().padZero(2)
}

Game_Timer.prototype.createText = function(){
    let text = ""

    for(let i = 0; i < this._maxUnitMembers; i++){
        const unit = Plugin.getParam().textUnits[i]
        const value = this[`getTextFor${unit}`]()
        text += `${value}:`
    }

    const finalText = text.substring(0, text.length-1)

    return finalText
}

Game_Timer.prototype.createBlankText = function(){
    let text = ""
    for(let i = 0; i < this._maxUnitMembers; i++){
        text += `00:`
        
    }
    const finalText = text.substring(0, text.length-1)

    return finalText
}

Game_Timer.prototype.getText = function(){
    return this._text
}

Game_Timer.prototype.getMaxMilliseconds = function() {
    return Eli.Date.framesToMilliSeconds(this._maxFrames)
}

Game_Timer.prototype.getMaxSeconds = function() {
    return Eli.Date.framesToSeconds(this._maxFrames)
}

Game_Timer.prototype.getMaxMinutes = function() {
    return Eli.Date.framesToMinutes(this._maxFrames)
}

Game_Timer.prototype.getMaxHours = function() {
    return Eli.Date.framesToHours(this._maxFrames)
}

Game_Timer.prototype.getMaxFrames = function() {
    return this._maxFrames
}

Game_Timer.prototype.textColor = function(){
    return this._textColor
}

Game_Timer.prototype.outlineColor = function(){
    return this._outlineColor
}

/* ------------------------------ SPRITE TIMER ------------------------------ */
Alias.Sprite_Timer_initialize = Sprite_Timer.prototype.initialize
Sprite_Timer.prototype.initialize = function() { 
    this.text = ""
    this.widthTable = {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 
        5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
        ":": 0
    }
    this.needRedrawOnInit = true
    Alias.Sprite_Timer_initialize.call(this)
    this.needRedrawOnInit = false
}

Alias.Sprite_Timer_redraw = Sprite_Timer.prototype.redraw
Sprite_Timer.prototype.redraw = function() {
    if(Plugin.getParam().fixShaking){
        this.redrawBitmapWithoutShake()
    }else{
        Alias.Sprite_Timer_redraw.call(this)
    }
}

Alias.Sprite_Timer_createBitmap = Sprite_Timer.prototype.createBitmap
Sprite_Timer.prototype.createBitmap = function() { 
    Alias.Sprite_Timer_createBitmap.call(this)
    this.recreateBitmap()
}

Sprite_Timer.prototype.recreateBitmap = function(){
    this.refreshWidthTable()
    this.bitmap = new Bitmap(this.calculateBitmapWidth(), 48)
    this.bitmap.fontFace = this.fontFace()
    this.bitmap.fontSize = this.fontSize()
    this.changeBitmapColors($gameTimer.textColor(), $gameTimer.outlineColor())

    if(Imported.Eli_BitmapFont && Eli.BitmapFont.pro){
        this.setBitmapFont()
    }
}

// Overwrite
Sprite_Timer.prototype.updateBitmap = function() {
    if($gameTimer.isWorking()){

        if(this.needRedrawOnInit){
            this.redraw()
        }else{
            const newtext = $gameTimer.createText()

            if($gameTimer.getText() !== newtext){
                $gameTimer.setText(newtext)
                this.redraw()
            }
        }
    }
}

// Overwrite
Sprite_Timer.prototype.timerText = function() {
    return $gameTimer.getText()
}

Sprite_Timer.prototype.refreshWidthTable = function() {
    const numberWidth = this.bitmap.measureTextWidth("0")
    const twoPointsWidth = this.bitmap.measureTextWidth(":")

    this.widthTable = {
        0: numberWidth, 1: numberWidth, 2: numberWidth, 3: numberWidth, 4: numberWidth, 
        5: numberWidth, 6: numberWidth, 7: numberWidth, 8: numberWidth, 9: numberWidth,
        ":": twoPointsWidth
    }
}

Sprite_Timer.prototype.redrawBitmapWithoutShake = function() {
    const text = this.timerText()
    const width = this.bitmap.width
    const height = this.bitmap.height
    let x = 0

    this.bitmap.clear()

    for(let i = 0; i < text.length; i++){
        const letter = text[i]
        const letterWidth = this.widthTable[letter]
        this.bitmap.drawText(letter, x, 0, width, height, "left")
        x += letterWidth
    }
}

Sprite_Timer.prototype.calculateBitmapWidth = function() {
    const text = $gameTimer.createBlankText() + "00"
    return this.bitmap.measureTextWidth(text)
}

Sprite_Timer.prototype.changeBitmapColors = function(textColor, outlineColor){
    this.bitmap.textColor = textColor || this.bitmap.textColor
    this.bitmap.outlineColor = outlineColor || this.bitmap.outlineColor
}

Sprite_Timer.prototype.updateVisibility = function(){
    this.visible = $gameTimer.isWorking() && !this.canHideOnPause()
}

Sprite_Timer.prototype.canHideOnPause = function(){
    return $gameTimer.isPaused() && Plugin.getParam().hideOnPause
}

Alias.Sprite_Timer_updatePosition = Sprite_Timer.prototype.updatePosition
Sprite_Timer.prototype.updatePosition = function() {
    Alias.Sprite_Timer_updatePosition.call(this)
    
    if(this.bitmap){
        this.x += this.bitmap.measureTextWidth("0")
    }
}

}