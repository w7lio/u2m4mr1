/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Rosedale Popups : Version - 1.0.0 | This plugin allows you to use simple popup messages over characters heads
*
* @url http://rosedale-studios.com
*
* @help
* ╔════════════════════════════════════╗
* ║ ()()                                                              ()() ║
* ║ (^.^)                    - Rosedale Studios -                    (^.^) ║
* ║c(")(")                                                          (")(")ↄ║
* ╚════════════════════════════════════╝

*============================================================================
*  Requirements :
*============================================================================

*============================================================================
*  Instructions :
*============================================================================
*
*  This plugin is plug and play for the most part, whenever an item or gold
* is gained, a notification will appear abbove the players head to notify
* them of the item/items they  have recieved.
*
*  You can specify custom text to display as well via plugin commands! This
* will differ depending on whether you are using rpg maker MV or MZ as the
* plugin command functions differently in each engine. The MZ version will be
* pretty straight forward, however the MV version is a bit different, in order
* please look below for more info on MV plugin commands.
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ player_popup text MESSSAGE                 ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Display popup above player.                ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ MESSAGE: Whatever you want the popup to display.                     ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ player_popup text ~Hello World~                                      ║
*  ║ player_popup text This is an example                                 ║
*  ╚═══════════════════════════════════╝
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ follower_popup id INDEX text MESSSAGE      ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Display popup above a follower.            ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ INDEX: The index of the follower( 1 being the 1st follower ).        ║
*  ║                                                                      ║
*  ║ MESSAGE: Whatever you want the popup to display.                     ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ follower_popup id 1 text Hey!                                        ║
*  ║ follower_popup id 1 text Listen!                                     ║
*  ╚═══════════════════════════════════╝
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ event_popup id ID text MESSSAGE            ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Display popup above an event.              ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ ID: The index of the follower( 1 being the 1st follower ).        ║
*  ║                                                                      ║
*  ║ MESSAGE: Whatever you want the popup to display.                     ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ event_popup text Hello!                                              ║
*  ║ event_popup text This is another example!                            ║
*  ╚═══════════════════════════════════╝

*============================================================================
*  Terms Of Use :
*============================================================================

*  This Plugin may be used commercially, or non commercially. This plugin may
* be extended upon, and or shared freely as long as credit is given to it's
* author(s). This plugin may NOT be sold, or plagiarized.

*============================================================================
*  Version History :
*============================================================================

*  ● Version : 1.0.0
*  ● Date : 20/08/2023
*    ★ Release.

*============================================================================
*  Contact Me :
*============================================================================

*  If you have questions, about this plugin, or commissioning me, or have
*  a bug to report, please feel free to contact me by any of the below
*  methods.

*  website : https://www.rosedale-studios.com
*  rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
*  youtube : https://www.youtube.com/channel/UCYA4VU5izmbQvnjMINssshQ/videos
*  email : chaucer(at)rosedale-studios(dot)com
*  discord : https://discord.gg/nexQGb65uP

*============================================================================

* @command player_popup
* @text Player Popup
* @desc Create a popup over the player.

* @arg text
* @text Message
* @desc The message that will be displayed.
* @default
* @type note

* @command follower_popup
* @text Follower Popup
* @desc Create a popup over a follower.

* @arg id
* @text Follower Index
* @desc The index of the follower on the map( 1 being the frst follower ).
* @default 1
* @type number
* @min 1

* @arg text
* @text Message
* @desc The message that will be displayed.
* @default
* @type note

* @command event_popup
* @text Event Popup
* @desc Create a popup over an event.

* @arg id
* @text Event ID
* @desc The id of the event on the current map to display a popup above.
* @default 1
* @type number
* @min 1

* @arg text
* @text Message
* @desc The message that will be displayed.
* @default
* @type note

* @param showDuration
* @text Show Duration
* @desc How long will the popup be visible.
* @default 60
* @type text

* @param scrollSpeed
* @text Scroll Speed
* @desc How fast will the popup scroll up off the screen.
* @default 0.2
* @type number
* @min 0.00
* @max 10.00
* @decimals 2

* @param popupSe
* @text Popup Se
* @desc The sound effect played when a popup appears.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param backgroundType
* @text Background Type
* @desc The background type for the window.
* @default 0
* @type select

* @option show_background
* @value 0
* @option hide_window
* @value 2

*/

/*~struct~Audio:

* @param name
* @text Name
* @desc The name of the sound effect.
* @default
* @type file
* @dir audio/se/

* @param volume
* @text Volume
* @desc The volume of the sound effect.
* @default 90
* @type number
* @min 1
* @max 100

* @param pitch
* @text Pitch
* @desc The pitch of the sound effect.
* @default 100
* @type number
* @min 50
* @max 150

* @param pan
* @text Pan
* @desc The pan of the sound effect.
* @default 0
* @type number
* @min -100
* @max 100

*/

//=============================================================================
  var Imported = Imported || {};
  Imported['Rosedale Popups'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.simplePopup = {};
//=============================================================================

//=============================================================================
// Window_Popup :
//=============================================================================

//=============================================================================
class Window_Popup extends Window_Base
{ // Window_Popup

//=============================================================================
  constructor( text )
  { // Called on object creation.
//=============================================================================

    if ( Utils.RPGMAKER_NAME == 'MZ' ) {
      super( new Rectangle( 0, 0, 100, 100 ) );

    } else {
      super( 0, 0, 100, 100 );

    }

    AudioManager.playSe( Chaucer.simplePopup.params.popupSe );
    this.setBackgroundType( Chaucer.simplePopup.params.backgroundType );

    this._showDuration = Chaucer.simplePopup.params.showDuration;
    this._scrollSpeed = Chaucer.simplePopup.params.scrollSpeed;

    const height = this.fittingHeight( text.split( '\n' ).length );
    const width = this.drawTextEx( text, 0, 0 ) + this.padding * 2;

    this.contents.resize( width, height );

    this.height = height;
    this.width = width
    this._scrollY = 0;

    this.alpha = 0;

    this.drawTextEx( text, 0, 0, width );

  }

//=============================================================================
  update()
  { // update the window.
//=============================================================================

    super.update();
    if ( !this.updateDuration() ) {
      this.updateFadeOut();
    }

    this.updateScroll();
    this.updatePosition();

  }

//=============================================================================
  updateDuration()
  { // update the duration.
//=============================================================================

    if ( this._showDuration > 0 ) {
      if ( this.alpha < 1 ) return this.updateFadeIn();
      this._showDuration--;
      return true;
    }

    return false;

  }

//=============================================================================
  updateFadeIn()
  { // update the fade out of the sprite.
//=============================================================================

    this.alpha = ( this.alpha + 0.05 ).clamp( 0, 1 );

    if ( !this.alpha ) this.parent.removeChild( this );

    return true;

  }

//=============================================================================
  updateFadeOut()
  { // update the fade out of the sprite.
//=============================================================================

    this.alpha = ( this.alpha - 0.05 ).clamp( 0, 1 );

    if ( !this.alpha ) this.parent.removeChild( this );

  }

//=============================================================================
  updateScroll()
  { // update the scroll of the popup.
//=============================================================================

    this._scrollY -= this._scrollSpeed;

  }

//=============================================================================
  updatePosition()
  { // update the position based on the target.
//=============================================================================

    if ( this._target ) {
      this.x = this._target.x - this.width / 2;
      this.y = this._target.y - this._target.height - this.height + this._scrollY;

    } else {
      this.y -= this._scrollSpeed;

    }

  }

}

//=============================================================================
window.Window_Popup = Window_Popup;
//=============================================================================

( function ( $ ) { // CONFIG:


//=============================================================================
// Create functions specific for my code if it does not already exist!
// WARNING: DO NOT EDIT BELOW THIS LINE!!!
//=============================================================================

//-----------------------------------------------------------------------------
  $.parseArgs = function ( args )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    const obj = {};
    let processing = false;

    for ( var i = 0, l = args.length; i < l; i += 1 ) {

      if ( processing ) {
        obj.text += args[i] + ' ';
      }

      if ( args[i] == 'text' ) {
        processing = true;
        obj.text = '';
      }

    }

    return obj;

  };

//-----------------------------------------------------------------------------
    Chaucer.compareVersion = Chaucer.compareVersion || function ( current, target )
    { // compare the current version with the target version.
//-----------------------------------------------------------------------------

      const v1 = current.split( '.' );
      const v2 = target.split( '.' );
      for ( let i = 0, l = v1.length; i < l; i++ ) {
        if ( v1[i] < v2[i] ) return -1; // version is lower!
        if ( v1[i] > v2[i] ) return 1; // version is higher!
      }
      return 0; // same version!

    };

//-----------------------------------------------------------------------------
    Chaucer.parse = Chaucer.parse || function( data )
    { // recursively parse any data passed in.
//-----------------------------------------------------------------------------
      try {
        data = JSON.parse( data );

      } catch ( err ) {
        data = data;

      } finally {

        if ( typeof data === 'object' ) {

          for ( const key in data ) {
            data[key] = Chaucer.parse( data[key] );
          };

        };

      };

      return data;

    };

//-----------------------------------------------------------------------------
    Chaucer.makePluginInfo = Chaucer.makePluginInfo || function ( $, n )
    { // Create plugin info for the object provided.
//-----------------------------------------------------------------------------

      for ( var i = 0, l = $plugins.length; i < l; i++ ) {

        if ( !$plugins[i].description.match( n ) ) continue;

        $.author = 'Chaucer';
        $.name = RegExp.$1;
        $.version = RegExp.$2;
        $.pluginName = $plugins[i].name;
        $.params = Chaucer.parse( $plugins[i].parameters );
        $.commands = {};
        $.alias = {};

      };

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Rosedale Popups) : Version - (\d+.\d+.\d+)/;
    $._nameError = 'Rosedale Popups was unable to load! Please revert any changes back to normal!';


    Chaucer.makePluginInfo( $, identifier );

    if ( !$.name ) throw new Error( $._nameError );

//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand = function ( command, fn )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

  if ( Utils.RPGMAKER_NAME === 'MV' )
    $.commands[command] = fn;

  else if ( Utils.RPGMAKER_NAME === 'MZ' )
    PluginManager.registerCommand( $.pluginName, command, fn );

  };

 //-----------------------------------------------------------------------------
  $.alias = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    let key = `${className.name}.${( isStatic ? '' : 'prototype.' ) + method}`;
    let object = ( isStatic ? className : className.prototype );

    if ( $.alias[key] ) throw new Error( `${key} already aliased!` );

    $.alias[key] = object[method];

    let fnString = fn.toString();
    let instances = fnString.match( /\$.alias\((.*?)\)/g ) || [];

    for ( let i = 0, len = instances.length; i < len; i++ ) {

      let old = instances[i];
      let args = ['this'].concat( old.match( /\((.*?)\)/ )[1].split( ',' ) );
      args = args.filter( n => !!n );
      let next = `$.alias["${key}"].call(` + args.join( ',' ) + ')';

      fnString = fnString.replace( old, next );

    }

    eval( `${key} = ` + fnString );

  };

//-----------------------------------------------------------------------------
  $.expand = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    const obj = isStatic ? className : className.prototype;
    obj[method] = fn;

  };

//=============================================================================
  // MV SPECIFIC CODE :
//=============================================================================

    if ( Utils.RPGMAKER_NAME === 'MV' ) {

  //-----------------------------------------------------------------------------
    $.alias( Game_Interpreter, 'pluginCommand', function( command, args ) {
  //-----------------------------------------------------------------------------

        $.alias( command, args );

        command = command.toLowerCase();
        if ( $.commands[command] ) {
          $.commands[command].call( this, $.parseArgs( args ) );
        }
      } );

    }


//=============================================================================
// ALIASED CODE BELOW THIS LINE!
//=============================================================================

//=============================================================================
// Plugin Commands :
//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'player_popup', function( args )
  { // register command for popup.
//-----------------------------------------------------------------------------

    let character = $gamePlayer;

    if ( character ) {
      if ( Utils.RPGMAKER_NAME == 'MZ' ) {
        args.text = args.text.substr( 1, args.text.length - 2 );
      }

      character.requestPopup( args );

    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'follower_popup', function( args )
  { // register command for popup.
//-----------------------------------------------------------------------------

    let character = $gamePlayer._followers._data[args.targetIndex - 1];

    if ( character ) {
      if ( Utils.RPGMAKER_NAME == 'MZ' ) {
        args.text = args.text.substr( 1, args.text.length - 2 );
      }

      character.requestPopup( args );

    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'event_popup', function( args )
  { // register command for popup.
//-----------------------------------------------------------------------------

    let character = $gameMap.event( args.id )

    if ( character ) {
      if ( Utils.RPGMAKER_NAME == 'MZ' ) {
        args.text = args.text.substr( 1, args.text.length - 2 );
      }

      character.requestPopup( args );

    }

  } );

//=============================================================================
// Game_Party :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Party, 'gainItem', function( item, amount, includeEquip )
  { // Aliased gainItem of class Game_Party.
//-----------------------------------------------------------------------------

    $.alias( item, amount, includeEquip );
    if ( amount > 0 ) {
      const amountText = amount > 1 ? ` x ${amount}` : ``;
      const text = `\\I[${item.iconIndex}] ${item.name}` + amountText;

      if ( !SceneManager.isPreviousScene( Scene_Map ) ) {
        $gamePlayer.requestPopup( { text } )
      }
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Party, 'gainGold', function( gold )
  { // Aliased gainGold of class Game_Party.
//-----------------------------------------------------------------------------

    $.alias( gold );
    if ( gold > 0 ) {
      const text = `${gold} ${$dataSystem.currencyUnit}`;

      if ( !SceneManager.isPreviousScene( Scene_Map ) ) {
        $gamePlayer.requestPopup( { text } )
      }
    }

  }, false );

//=============================================================================
// Game_CharacterBase :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'initialize', function()
  { // Aliased initialize of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias();
    this._popups = [];

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'requestPopup', function( popup )
  { // request a popup message.
//-----------------------------------------------------------------------------

    popup.text = popup.text.replace( /\\\\/g, "\\" )
    this._popups.push( popup );

  }, false );

//=============================================================================
// Spriteset_Base :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Spriteset_Base, 'createLowerLayer', function()
  { // Aliased createLowerLayer of class Spriteset_Base.
//-----------------------------------------------------------------------------

    $.alias();
    this.createPopupContainer();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Spriteset_Base, 'createPopupContainer', function()
  { // create container for popups.
//-----------------------------------------------------------------------------

    this._popups = new Sprite();
    this.addChild( this._popups );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Spriteset_Base, 'addPopup', function( popup )
  { // add popup to the spriteset.
//-----------------------------------------------------------------------------

    this._popups.addChild( popup )

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Spriteset_Base, 'update', function()
  { // Aliased update of class Spriteset_Base.
//-----------------------------------------------------------------------------

    $.alias();
    this.updatePopupScroll();
    this.updatePopups();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Spriteset_Base, 'updatePopupScroll', function()
  { // update the scroll of the popups.
//-----------------------------------------------------------------------------

    this._popups.x = -$gameMap.displayX() * $gameMap.tileWidth();
    this._popups.y = -$gameMap.displayY() * $gameMap.tileHeight();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Spriteset_Base, 'updatePopups', function()
  { // update the popups.
//-----------------------------------------------------------------------------

  }, false );

//=============================================================================
// Spriteset_Map :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Spriteset_Map, 'updatePopups', function()
  { // Aliased addNewPopups of class Spriteset_Map.
//-----------------------------------------------------------------------------

    const events = $gameMap.events();
    const followers = $gamePlayer._followers._data;
    const characters = [$gamePlayer].concat( followers ).concat( events );
    let sprites = this._characterSprites;

    for ( let i = 0, l = characters.length; i < l; i++ ) {

      let target = sprites.find( spr => spr._character == characters[i] );

      while( characters[i]._popups.length > 0 ) {

        const { text } = characters[i]._popups[0]
        const popup = new Window_Popup( text );
        const oy = characters[i]._popups.length * popup.height;

        popup.x = -this._popups.x + target.x + -Math.round( popup.width / 2 );
        popup.y = -this._popups.y + target.y + -target.height - oy;

        characters[i]._popups.shift();
        this.addPopup( popup );

      }

    };

  }, false );

//=============================================================================
} )( Chaucer.simplePopup );
//=============================================================================
