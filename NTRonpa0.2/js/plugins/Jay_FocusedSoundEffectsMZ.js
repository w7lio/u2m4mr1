//=============================================================================
// Focused Sound Effects
// Jay_FocusedSoundEffectsMZ.js
// Version 1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.Jay_FocusedSoundEffects = true;

var Jay = Jay || {};
Jay.FocusedSoundEffects = Jay.FocusedSoundEffects || {};

//=============================================================================
 /*:
 * @plugindesc Play back sound effects coming from a specific spot on the map.
 *
 * @author Jason R. Godding
 * @target MZ
 *
 * @command PlayFocusedSEHere
 * @text Play Focused SE Here
 * @desc Plays a SE from this event's location.
 *
 * @arg se
 * @type file
 * @dir audio/se
 * @text SE file
 * @desc The SE to play.
 *
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Volume
 * @desc The maximum volume setting for the SE (0-100).
 *
 * @arg pitch
 * @type number
 * @min -50
 * @max 150
 * @default 100
 * @text Pitch
 * @desc The pitch setting for the SE (50-150).
 *
 * @arg pan
 * @type number
 * @min -100
 * @max 100
 * @text Pan override
 * @desc Overrides the pan setting for the SE (-100-100). (This plugin automatically sets the pan based on location.)
 *
 * @arg fadeDistance
 * @type number
 * @min 0
 * @default 99999
 * @text Fade distance
 * @desc While the player is within the fade distance from this SE's source, it will play at full volume.
 *
 * @arg fadeRate
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Fade rate
 * @desc The higher the number, the quicker the SE will fade when the player is outside the fade distance (0-100).
 *
 *
 * @command PlayFocusedSEAtEvent
 * @text Play Focused SE at Event
 * @desc Plays a SE from another event's location, referring to event by name or ID number.
 *
 * @arg se
 * @type file
 * @dir audio/se
 * @text SE file
 * @desc The SE to play.
 *
 * @arg eventId
 * @type text
 * @text Event
 * @desc The name or event ID of the target event. If multiple events have the same name, picks the first.
 *
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Volume
 * @desc The maximum volume setting for the SE (0-100).
 *
 * @arg pitch
 * @type number
 * @min -50
 * @max 150
 * @default 100
 * @text Pitch
 * @desc The pitch setting for the SE (50-150).
 *
 * @arg pan
 * @type number
 * @min -100
 * @max 100
 * @text Pan override
 * @desc Overrides the pan setting for the SE (-100-100). (This plugin automatically sets the pan based on location.)
 *
 * @arg fadeDistance
 * @type number
 * @min 0
 * @default 99999
 * @text Fade distance
 * @desc While the player is within the fade distance from this SE's source, it will play at full volume.
 *
 * @arg fadeRate
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Fade rate
 * @desc The higher the number, the quicker the SE will fade when the player is outside the fade distance (0-100).
 *
 *
 * @command PlayFocusedSEAtLocation
 * @text Play Focused SE at Location
 * @desc Plays a SE from a location on the map.
 *
 * @arg se
 * @type file
 * @dir audio/se
 * @text SE file
 * @desc The SE to play.
 *
 * @arg location
 * @type location
 * @text Location
 * @desc The location of the tile on the map the SE will play from.
 *
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Volume
 * @desc The maximum volume setting for the SE (0-100).
 *
 * @arg pitch
 * @type number
 * @min -50
 * @max 150
 * @default 100
 * @text Pitch
 * @desc The pitch setting for the SE (50-150).
 *
 * @arg pan
 * @type number
 * @min -100
 * @max 100
 * @text Pan override
 * @desc Overrides the pan setting for the SE (-100-100). (This plugin automatically sets the pan based on location.)
 *
 * @arg fadeDistance
 * @type number
 * @min 0
 * @default 99999
 * @text Fade distance
 * @desc While the player is within the fade distance from this SE's source, it will play at full volume.
 *
 * @arg fadeRate
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Fade rate
 * @desc The higher the number, the quicker the SE will fade when the player is outside the fade distance (0-100).
 *
 * @help This plugin allows you to play sound effects that originate from a specific
 * spot on the map. Not recommended for in-battle use.
 *
 * Call one of the Plugin commands to play an SE file from a particular
 * location. They will have their volume and pan settings adjusted based
 * on context. The commands are:
 *
 * Play Focused SE Here
 * Plays the SE at the location of the current event.
 *
 * Play Focused SE at Event
 * Plays the SE at the location of a given event on the current map.
 * Events can be referred to by event ID number or by event name.
 *
 * Play Focused SE at Location
 * Plays the SE at the X,Y coordinates of the map. (Though the UI
 * lets you choose another map, it will always play on the current
 * map.
 *
 * Other parameters (all commands):
 *
 * SE
 * Choose the SE file that will play.
 *
 * Volume
 * Sets the volume of the sound effect.
 *
 * Pitch
 * Sets the pitch of the sound effect.
 *
 * Pan override
 * Sets the pan of the sound effect. 
 * If not set, then it will determine the pan value based on its position on
 * the screen (with it being -100 or 100 if it's offscreen to the left or
 * right.) Setting the pan manually completely overrides this behavior.
 * Only the X-coordinate of the event matters for the pan value.
 *
 * Fade distance
 * When set, if the player is within the defined distance from the sound's
 * source, it will play at the defined base volume (or volume 100 if it wasn't
 * defined.) If not set, it will play at the base volume no matter what.
 *
 * Fade rate
 * As a percentage, how fast does the sound fade away?
 * So if it's 20, then if you're one step outside the fadeDistance range, the
 * sound effect will play at 80% volume (20% of the volume faded away.)
 * If you're two steps away, it will play at 64% volume (80% of 80%.)
 * Default is 100, which means the sound effect simply won't play outside
 * the fadeDistance range; I recommend you change this if you are using
 * fadeDistance.
 *
 * Example:
 * Play Focused SE at event
 * SE: Frog
 * Event: Lillypad
 * Volume: 80
 * Fade distance: 5
 * Fade rate: 10
 *
 * With this example, when the player is within 5 tiles of the lillypad, the
 * "Frog" SE will play at 80 volume. At 6 tiles away, it will be 72%, at 
 * 7 it will be 64.8%, etc.
 *
 * To use this in a custom move route, use the following Script:
 *
 * this.playFocusedSE("nameOfSEFile parameter=X parameter=Y...");
 *
 * For sake of this feature, the valid parameters are "volume", "pitch", "pan",
 * "fadeDistance", and "fadeRate".
 *
 * For the frog example:
 *
 * this.playFocusedSE("Frog volume=80 fadeDistance=5 fadeRate=10");
 *
 * There is a "Pro" version of this plugin in HeroicJay's itch.io shop!
 * It allows Focused BGS effects, and changes the volume and pan settings of
 * Focused effects on the fly as you or attached events move! (In this version,
 * all effects will keep the same pan and volume settings they had at the moment
 * they start playing.)
 *
 * ====================================
 *
 * Version 1.0.1 - Fixed error in auto-pan settings.
 *
 * Version 1.0 - First version.
 *
 * ==== LEGAL STUFF ====
 * 
 * This plugin is free for non-commercial and commercial use, but please credit
 * Jason R. Godding if you use it. Thank you.
 * © Jason R. Godding, 2025
 */

PluginManager.registerCommand("Jay_FocusedSoundEffectsMZ", "PlayFocusedSEHere", function(args) {
	var eventId = this.eventId();
    AudioManager.playFocusedSEAtEvent(eventId, args);
});

PluginManager.registerCommand("Jay_FocusedSoundEffectsMZ", "PlayFocusedSEAtEvent", function(args) {
	var eventId = args.eventId;
	var eventIdNum = parseInt(eventId);
	
	if(!eventIdNum) {
		var candidateEvents = $gameMap.events().filter(function(event) {
            return event.event().name === eventId;
        });
		
		if (candidateEvents.length === 0) {
			throw ("Can't find event " + eventId + ".");
		}
		
		eventIdNum = candidateEvents[0].eventId();
	}
	
	if (!$gameMap.event(eventIdNum)) {
        throw ("Can't find event " + eventIdNum + ".");
    }
	
    AudioManager.playFocusedSEAtEvent(eventIdNum, args);
});

PluginManager.registerCommand("Jay_FocusedSoundEffectsMZ", "PlayFocusedSEAtLocation", function(args) {
	var loc = JSON.parse(args.location);
	var xCoord = loc.x;
	var yCoord = loc.y;
    AudioManager.playFocusedSE(xCoord, yCoord, args);
});

AudioManager.playFocusedSEAtEvent = function(eventId, args) {
	var xCoord = $gameMap.event(eventId).x;
	var yCoord = $gameMap.event(eventId).y;
	this.playFocusedSE(xCoord, yCoord, args);
};

// Plays a focused sound effect.
AudioManager.playFocusedSE = function(xCoord, yCoord, args) {
    var autoPan = args.pan == "";
    var pan = args.pan;
    var fadeDistance = args.fadeDistance;
    var fadeRate = args.fadeRate;
    var baseVolume = args.volume;
    var pitch = args.pitch;
	var seName = args.se;
    
    if (autoPan && xCoord >= 0 && yCoord >= 0) {
        pan = AudioManager.getAutoPan(xCoord);
    }
    
    var volume = baseVolume;
    
    if (fadeRate > 0 && xCoord >= 0 && yCoord >= 0) {
        var xDistance = Math.abs($gamePlayer.x - xCoord);
        var yDistance = Math.abs($gamePlayer.y - yCoord);
        var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance) - fadeDistance;
        if (distance > 0) {
            volume = AudioManager.getFadedVolume(distance, volume, fadeRate);
        }
    }
    
    var se = {
		name: seName,
		volume: volume,
		pitch: pitch,
		pan: pan
    }
    
    AudioManager.playSe(se);
}

// Calculates the pan value based on the locations of the player and the sound source.
AudioManager.getAutoPan = function(xCoord) {
    var playerX = $gamePlayer.x;
    
    var screenSize = Graphics.width;
    var tileSize = 48;
    var screenTileWidth = screenSize / tileSize;
    var maxTileWidth = $gameMap.width();
    
    // If the player is too close to the edge of the map, assume they're actually
    // half the screen length from it, since that's what the player will witness.
    if (playerX < screenTileWidth/2 - 1) {
        playerX = screenTileWidth/2 - 1;
    }
    if (playerX > maxTileWidth - screenTileWidth/2 - 1) {
        playerX = maxTileWidth - screenTileWidth/2 - 1;
    }
    
    if (xCoord < playerX - screenTileWidth/2) {
        return -100;
    }
    if (xCoord > playerX + screenTileWidth/2) {
        return 100;
    }
    
    if (maxTileWidth > screenTileWidth) {
        return (xCoord - playerX)/screenTileWidth * 200;
    }
    else {
        return (xCoord + .5)/maxTileWidth * 200 - 100;
    }
}

// Calculates the sound volume after fading from distance.
AudioManager.getFadedVolume = function(distance, volume, fadeRate) {
    return volume * (Math.pow((100 - fadeRate)/100, distance));
}

// Game_Character version for easy access in movement commands.
Game_Character.prototype.playFocusedSE = function(command) {
	var args = {};
    var cmdArgs = command.split(' ');
	
	if (cmdArgs.length < 1) {
		throw "No SE given in playFocusedSE command."
	}
	
	args.se = cmdArgs[0];
	args.volume = 100;
	args.pitch = 100;
	args.fadeDistance = 99999;
	args.fadeRate = 100;
	
	for (var i=1; i < cmdArgs.length; i++) {
		var arg = cmdArgs[i];
        if (arg.match(/pitch=(\d*)/gi)) {
            args.pitch = parseInt(RegExp.$1);
        }
        else if (arg.match(/volume=(\d*)/gi)) {
            args.volume = parseInt(RegExp.$1);
        }
        else if (arg.match(/pan=(\d*)/gi)) {
            args.pan = parseInt(RegExp.$1);
        }
        else if (arg.match(/fadeDistance=(\d*)/gi)) {
            args.fadeDistance = parseInt(RegExp.$1);
        }
        else if (arg.match(/fadeRate=(\d*)(?:%)?/gi)) {
            args.fadeRate = Number(RegExp.$1);
            if (args.fadeRate > 100) {
                args.fadeRate = 100;
            }
        }
	}
	
    AudioManager.playFocusedSE(this.x, this.y, args);
}
