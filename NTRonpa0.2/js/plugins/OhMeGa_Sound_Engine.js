//=============================================================================
// RPG Maker MZ - OhMeGa Sound Engine
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.2] Sound Engine that does not suck
 * @author OhMeGa Game Studio
 *
 * @help OhMeGa_Image_Engine.js
 *
 * Create proximity based sounds without having to remind yourself how much you already forgot from high school maths.
 * 
 * This code is free to use for anyone for commercial or non-commercial projects. Credit is appreciated.
 * If you have paid any amount of money for this plugin to anyone you have been scammed. This is a free project with optional donations.
 * 
 *
 * @command ProximitySound
 * @text Sound with Proximity based volume 
 * @desc Sound with volume based on player/event Proximity
 * 
 * @arg SoundType
 * @type text
 * @default Se
 * @text Se / Me / Bgs / Bgm
 * @desc Type of sound (folder name)
 *
 * @arg PlayerX
 * @type number
 * @min 0
 * @max 9999
 * @default auto
 * @text Player X
 * @desc Overwrite Player X
 *
 * @arg PlayerY
 * @type number
 * @min 0
 * @max 9999
 * @default auto
 * @text Player Y
 * @desc Overwrite Player Y
 *
 * @arg EventID
 * @type number
 * @default auto
 * @min 0
 * @max 9999
 * @text Event ID 
 * @desc auto = this event, 0 = set source XY via override, otherwise input source event ID (for EV001 id = 1 etc.)
 * 
 * @arg SourceX
 * @type number
 * @min 0
 * @max 9999
 * @default auto
 * @text Sound Source X
 * @desc Overwrite Sound Source X (only replace for manual override), "PlayerX" in order to have this event follow PlayerX coordinate
 *
 * @arg SourceY
 * @type number
 * @min 0
 * @max 9999
 * @default auto
 * @text Sound Source Y
 * @desc Overwrite Sound Source Y (only replace for manual override), "PlayerY" in order to have this event follow PlayerY coordinate
 * 
 * @arg SoundName
 * @type text
 * @default Absorb1
 * @text File name
 * @decsc Input file name
 * 
 * @arg MaxDistance
 * @type number
 * @min 0
 * @max 9999
 * @default 15
 * @text Max Distance
 * @desc Maximum distance at which sound is audible
 * 
 * @arg MaxVolume
 * @type number
 * @min 0
 * @max 100
 * @default 70
 * @text Max Volume
 * @desc Maximum Volume the sound can reach
 * 
 * @arg MinVolume
 * @type number
 * @min 0
 * @max 100
 * @default 10
 * @text Min Volume
 * @desc Minimum Volume the sound can reach
 * 
 * @arg Pitch
 * @type number
 * @min 0
 * @max 200
 * @default 100
 * @text Pitch
 * @desc Pitch
 * 
 * @arg Pan
 * @type number
 * @min -100
 * @max 100
 * @default auto
 * @text Pan 
 * @desc Pan (auto for automatic)
 */

(() => {
    console.log("OhMeGa_Sound_Engine reporting for duty");
    function PlaySound({ SoundType, PlayerX, PlayerY, EventID, SourceX, SourceY, SoundName, MaxDistance, MaxVolume, MinVolume, Pitch, Pan }) {
        EventID = EventID || this._eventId  // if eventId is 0, null, or undefined assign event id from context

        // if PlayerX is 'auto', 0, null, or undefined assign player x from global
        if (PlayerX == "auto" || PlayerX == 0) PlayerX = $gamePlayer.x

        // if PlayeryY is auto', 0, null, or undefined assign player y from global
        if (PlayerY == "auto" || PlayerY == 0) PlayerY = $gamePlayer.y

        // if SourceX or SourceY override to PlayerX/PlayerX, follow these steps
        if (SourceX == "PlayerX" || SourceY == "PlayerY") {
            if (SourceX == "PlayerX") {
                SourceX = $gamePlayer.x;
                // if eventId is 0, null, or undefined assign event id from context
                if (EventID == "auto" || EventID) {
                    SourceY = $gameMap.event(this._eventId).y
                } else if (EventId >= 1) {
                    SourceY = $gameMap.event(EventID).y
                } else {
                    SourceY = SourceY
                }
            }
            if (SourceY == "PlayerY") {
                SourceY = $gamePlayer.y;
                // if eventId is 0, null, or undefined assign event id from context
                if (EventID == "auto" || EventID) {
                    SourceX = $gameMap.event(this._eventId).x
                } else if (EventId >= 1) {
                    SourceX = $gameMap.event(EventID).x
                } else {
                    SourceX = SourceX
                }
            }
        } else {
            // if eventId is 0, null, or undefined assign event id from context
            if (EventID == "0") {
                SourceX = SourceX
                SourceY = SourceY
            } else if (EventID >= 1) {
                SourceX = $gameMap.event(EventID).x
                SourceY = $gameMap.event(EventID).y
            } else if (EventID == "auto" || EventID) {
                SourceX = $gameMap.event(this._eventId).x
                SourceY = $gameMap.event(this._eventId).y
            }
        }

        let distance = Math.sqrt(
            Math.pow(SourceX - PlayerX, 2) + Math.pow(SourceY - PlayerY, 2)
        );

        if (Pan == "auto" && MaxDistance >= distance) {
            deltaX = SourceX - PlayerX
            deltaY = SourceY - PlayerY
            if (deltaX == 0) {
                Pan = 0
            } else if (deltaY == 0) {
                if (deltaX > 0) Pan = -100;
                else Pan = 100;
            } else {
                const deg = (Math.atan(deltaY / deltaX) * 180) / Math.PI - (deltaX < 0 ? 180 : 0) + 90;
                let calc = deg
                if (deg > 0) {
                    //player is on the left
                    if (deg > 90) {
                        // console.log("player is top left")
                        calc = deg - 90
                        Pan = (calc / 90 * 100 - 100)
                    } else {
                        // console.log("player is bottom left")
                        Pan = calc / 90 * 100 * -1
                    }
                } else {
                    //player is on the right
                    if (deg > -90) {
                        // console.log("player is bottom right")
                        calc = deg + 90
                        Pan = (calc / 90 * 100)
                    } else {
                        // console.log("player is top right")
                        Pan = (calc / 90 * 100 * -1) - 100

                    }
                }
            }
            Pan = Pan * -1 //accidentally completely flipped the pan calculations... oops. This is a quick fix.
            if (Pan == 100) Pan = 99;
            if (Pan == -100) Pan = -99;
        } else if (Pan = "auto") Pan = 0;

        let maxdistance = MaxDistance;
        let maxvol = MaxVolume;
        let minvol = MinVolume;
        let vol = 0;
        vol = Math.floor((1 - 1 / (maxdistance / distance)) * 100);
        if (vol <= minvol) vol = minvol;
        if (vol >= maxvol) vol = maxvol;

        if (SoundType == "Se" && distance <= maxdistance) {
            AudioManager.playSe({
                name: SoundName,
                volume: vol,
                pitch: Pitch,
                pan: Pan,
            });
        } else if (SoundType == "Me" && distance <= maxdistance) {
            AudioManager.playMe({
                name: SoundName,
                volume: vol,
                pitch: Pitch,
                pan: Pan,
            });
        } else if (SoundType == "Bgs") {
            if (distance > maxdistance) AudioManager.fadeOutBgs(1); // for some reason this does not work well, needs more investigation
            else {
                if (AudioManager.isCurrentBgs.name != SoundName) {
                    AudioManager.playBgs({
                        name: SoundName,
                        volume: vol,
                        pitch: Pitch,
                        pan: Pan,
                    })
                } else {
                    AudioManager.updateBgsParameters({
                        name: SoundName,
                        volume: vol,
                        pitch: Pitch,
                        pan: Pan,
                    })
                }
            }

        } else if (SoundType == "Bgm") {
            if (distance > maxdistance) AudioManager.fadeOutBgm(1);
            else {
                if (AudioManager.isCurrentBgm.name != SoundName) {
                    AudioManager.playBgm({
                        name: SoundName,
                        volume: vol,
                        pitch: Pitch,
                        pan: Pan,
                    })
                } else {
                    AudioManager.updateBgmParameters({
                        name: SoundName,
                        volume: vol,
                        pitch: Pitch,
                        pan: Pan,
                    })
                }
            }
        }
    }

    PluginManager.registerCommand("OhMeGa_Sound_Engine", "ProximitySound", PlaySound);



})();