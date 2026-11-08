//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.89;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.89] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x55ae0c=_0x1c19;(function(_0x1826d5,_0x59ce65){const _0x493466=_0x1c19,_0x242ab2=_0x1826d5();while(!![]){try{const _0x3563de=parseInt(_0x493466(0x5d9))/0x1*(parseInt(_0x493466(0x684))/0x2)+-parseInt(_0x493466(0x947))/0x3*(parseInt(_0x493466(0x791))/0x4)+parseInt(_0x493466(0x73e))/0x5*(-parseInt(_0x493466(0x754))/0x6)+parseInt(_0x493466(0x349))/0x7*(-parseInt(_0x493466(0x6cd))/0x8)+-parseInt(_0x493466(0x31b))/0x9*(parseInt(_0x493466(0x5ba))/0xa)+parseInt(_0x493466(0x614))/0xb+parseInt(_0x493466(0x6f9))/0xc*(parseInt(_0x493466(0x6ad))/0xd);if(_0x3563de===_0x59ce65)break;else _0x242ab2['push'](_0x242ab2['shift']());}catch(_0x3c61d1){_0x242ab2['push'](_0x242ab2['shift']());}}}(_0x2cd2,0x2a41f));var label=_0x55ae0c(0x3ae),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x228246){const _0x9aa08f=_0x55ae0c;return _0x228246[_0x9aa08f(0x5b2)]&&_0x228246[_0x9aa08f(0x8ec)][_0x9aa08f(0x80e)]('['+label+']');})[0x0];VisuMZ[label][_0x55ae0c(0x6c3)]=VisuMZ[label][_0x55ae0c(0x6c3)]||{},VisuMZ[_0x55ae0c(0x4a2)]=function(_0x41e01b,_0x48a553){const _0x899597=_0x55ae0c;for(const _0x3f5eb2 in _0x48a553){if(_0x3f5eb2['match'](/(.*):(.*)/i)){const _0x2e0eff=String(RegExp['$1']),_0x1cf5be=String(RegExp['$2'])[_0x899597(0x8d3)]()['trim']();let _0x4fee6e,_0x56811c,_0x283276;switch(_0x1cf5be){case _0x899597(0x8c8):_0x4fee6e=_0x48a553[_0x3f5eb2]!==''?Number(_0x48a553[_0x3f5eb2]):0x0;break;case _0x899597(0x848):_0x56811c=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):[],_0x4fee6e=_0x56811c[_0x899597(0x776)](_0x3d6d98=>Number(_0x3d6d98));break;case _0x899597(0x2b8):_0x4fee6e=_0x48a553[_0x3f5eb2]!==''?eval(_0x48a553[_0x3f5eb2]):null;break;case'ARRAYEVAL':_0x56811c=_0x48a553[_0x3f5eb2]!==''?JSON['parse'](_0x48a553[_0x3f5eb2]):[],_0x4fee6e=_0x56811c[_0x899597(0x776)](_0x45aaee=>eval(_0x45aaee));break;case _0x899597(0x41e):_0x4fee6e=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):'';break;case _0x899597(0x2ba):_0x56811c=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):[],_0x4fee6e=_0x56811c[_0x899597(0x776)](_0x61c452=>JSON[_0x899597(0x5fc)](_0x61c452));break;case'FUNC':_0x4fee6e=_0x48a553[_0x3f5eb2]!==''?new Function(JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2])):new Function(_0x899597(0x2bd));break;case _0x899597(0x586):_0x56811c=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):[],_0x4fee6e=_0x56811c['map'](_0x21a116=>new Function(JSON[_0x899597(0x5fc)](_0x21a116)));break;case _0x899597(0x628):_0x4fee6e=_0x48a553[_0x3f5eb2]!==''?String(_0x48a553[_0x3f5eb2]):'';break;case _0x899597(0x1ed):_0x56811c=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):[],_0x4fee6e=_0x56811c[_0x899597(0x776)](_0x484599=>String(_0x484599));break;case _0x899597(0x904):_0x283276=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):{},_0x41e01b[_0x2e0eff]={},VisuMZ[_0x899597(0x4a2)](_0x41e01b[_0x2e0eff],_0x283276);continue;case _0x899597(0x29f):_0x56811c=_0x48a553[_0x3f5eb2]!==''?JSON[_0x899597(0x5fc)](_0x48a553[_0x3f5eb2]):[],_0x4fee6e=_0x56811c[_0x899597(0x776)](_0x14949e=>VisuMZ['ConvertParams']({},JSON[_0x899597(0x5fc)](_0x14949e)));break;default:continue;}_0x41e01b[_0x2e0eff]=_0x4fee6e;}}return _0x41e01b;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x93c)]=SceneManager[_0x55ae0c(0x5d8)],SceneManager[_0x55ae0c(0x5d8)]=function(){const _0x486367=_0x55ae0c;VisuMZ[_0x486367(0x3ae)][_0x486367(0x93c)][_0x486367(0x67e)](this);if(Utils['RPGMAKER_VERSION']>=_0x486367(0x6c8)){if(typeof nw===_0x486367(0x38a))nw[_0x486367(0x744)]['quit']();}},(_0xbe199f=>{const _0x5466d8=_0x55ae0c,_0x2bd1ce=_0xbe199f[_0x5466d8(0x61b)];for(const _0x213796 of dependencies){if(!Imported[_0x213796]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x2bd1ce,_0x213796)),SceneManager['exit']();break;}}const _0x636c19=_0xbe199f[_0x5466d8(0x8ec)];if(_0x636c19['match'](/\[Version[ ](.*?)\]/i)){const _0x47c182=Number(RegExp['$1']);_0x47c182!==VisuMZ[label][_0x5466d8(0x8e9)]&&(alert(_0x5466d8(0x47e)[_0x5466d8(0x703)](_0x2bd1ce,_0x47c182)),SceneManager[_0x5466d8(0x5d8)]());}if(_0x636c19['match'](/\[Tier[ ](\d+)\]/i)){const _0x685691=Number(RegExp['$1']);_0x685691<tier?(alert(_0x5466d8(0x1f3)[_0x5466d8(0x703)](_0x2bd1ce,_0x685691,tier)),SceneManager[_0x5466d8(0x5d8)]()):tier=Math[_0x5466d8(0x391)](_0x685691,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0xbe199f[_0x5466d8(0x60e)]);})(pluginData),((()=>{const _0x1e08d6=_0x55ae0c;if(VisuMZ[_0x1e08d6(0x3ae)][_0x1e08d6(0x6c3)][_0x1e08d6(0x5fa)]['SubfolderParse']??!![])for(const _0x3c383b in $plugins){const _0x10a99e=$plugins[_0x3c383b];_0x10a99e['name']['match'](/(.*)\/(.*)/i)&&(_0x10a99e[_0x1e08d6(0x61b)]=String(RegExp['$2']['trim']()));}})()),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x6fb),_0xb22b52=>{const _0xcb65fd=_0x55ae0c;if(!SceneManager[_0xcb65fd(0x1a1)])return;if(!SceneManager[_0xcb65fd(0x1a1)]['_spriteset'])return;VisuMZ[_0xcb65fd(0x4a2)](_0xb22b52,_0xb22b52);const _0x4b89d9=Math[_0xcb65fd(0x41d)](_0xb22b52[_0xcb65fd(0x951)]),_0x343b89=Math[_0xcb65fd(0x41d)](_0xb22b52[_0xcb65fd(0x5a7)]);$gameTemp[_0xcb65fd(0x704)](_0x4b89d9,_0x343b89,_0xb22b52[_0xcb65fd(0x956)],_0xb22b52[_0xcb65fd(0x930)],_0xb22b52[_0xcb65fd(0x321)]);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x523),_0x51462a=>{const _0x20009e=_0x55ae0c;VisuMZ[_0x20009e(0x4a2)](_0x51462a,_0x51462a);const _0xece0a7=Math['round'](_0x51462a['volume'])[_0x20009e(0x621)](0x0,0x64),_0x11e3b0=AudioManager['_currentBgm'];_0x11e3b0&&(_0x11e3b0[_0x20009e(0x58b)]=_0xece0a7,_0x11e3b0[_0x20009e(0x19e)]=AudioManager[_0x20009e(0x3c9)][_0x20009e(0x262)](),AudioManager[_0x20009e(0x698)](_0x11e3b0),AudioManager['playBgm'](_0x11e3b0,_0x11e3b0['pos']),AudioManager['_bgmBuffer']['_startPlaying'](_0x11e3b0[_0x20009e(0x19e)]));}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x527),_0x5215f6=>{const _0x3fe35d=_0x55ae0c;VisuMZ[_0x3fe35d(0x4a2)](_0x5215f6,_0x5215f6);const _0x39a366=Math[_0x3fe35d(0x41d)](_0x5215f6[_0x3fe35d(0x5d1)])['clamp'](0x32,0x96),_0x52e825=AudioManager[_0x3fe35d(0x197)];_0x52e825&&(_0x52e825[_0x3fe35d(0x5d1)]=_0x39a366,_0x52e825[_0x3fe35d(0x19e)]=AudioManager['_bgmBuffer'][_0x3fe35d(0x262)](),AudioManager[_0x3fe35d(0x698)](_0x52e825),AudioManager['playBgm'](_0x52e825,_0x52e825['pos']),AudioManager[_0x3fe35d(0x3c9)][_0x3fe35d(0x89a)](_0x52e825[_0x3fe35d(0x19e)]));}),PluginManager[_0x55ae0c(0x4b4)](pluginData['name'],_0x55ae0c(0x3da),_0x1ff115=>{const _0x4abb81=_0x55ae0c;VisuMZ[_0x4abb81(0x4a2)](_0x1ff115,_0x1ff115);const _0x5caf58=Math[_0x4abb81(0x41d)](_0x1ff115[_0x4abb81(0x4aa)])[_0x4abb81(0x621)](-0x64,0x64),_0x7cc75e=AudioManager[_0x4abb81(0x197)];_0x7cc75e&&(_0x7cc75e[_0x4abb81(0x4aa)]=_0x5caf58,_0x7cc75e[_0x4abb81(0x19e)]=AudioManager[_0x4abb81(0x3c9)]['seek'](),AudioManager[_0x4abb81(0x698)](_0x7cc75e),AudioManager[_0x4abb81(0x732)](_0x7cc75e,_0x7cc75e[_0x4abb81(0x19e)]),AudioManager[_0x4abb81(0x3c9)][_0x4abb81(0x89a)](_0x7cc75e[_0x4abb81(0x19e)]));}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x6ae),_0x11ab6d=>{const _0x31af97=_0x55ae0c;VisuMZ['ConvertParams'](_0x11ab6d,_0x11ab6d);const _0x57cfc6=Math[_0x31af97(0x41d)](_0x11ab6d[_0x31af97(0x58b)])[_0x31af97(0x621)](0x0,0x64),_0x2e1e98=AudioManager[_0x31af97(0x484)];_0x2e1e98&&(_0x2e1e98[_0x31af97(0x58b)]=_0x57cfc6,_0x2e1e98[_0x31af97(0x19e)]=AudioManager[_0x31af97(0x4ee)][_0x31af97(0x262)](),AudioManager[_0x31af97(0x502)](_0x2e1e98),AudioManager[_0x31af97(0x1b2)](_0x2e1e98,_0x2e1e98[_0x31af97(0x19e)]),AudioManager[_0x31af97(0x4ee)][_0x31af97(0x89a)](_0x2e1e98[_0x31af97(0x19e)]));}),PluginManager[_0x55ae0c(0x4b4)](pluginData['name'],_0x55ae0c(0x40e),_0x26dc6b=>{const _0x519af6=_0x55ae0c;VisuMZ[_0x519af6(0x4a2)](_0x26dc6b,_0x26dc6b);const _0x58d1e9=Math['round'](_0x26dc6b[_0x519af6(0x5d1)])[_0x519af6(0x621)](0x32,0x96),_0x316874=AudioManager['_currentBgs'];_0x316874&&(_0x316874[_0x519af6(0x5d1)]=_0x58d1e9,_0x316874[_0x519af6(0x19e)]=AudioManager[_0x519af6(0x4ee)][_0x519af6(0x262)](),AudioManager['updateBgsParameters'](_0x316874),AudioManager[_0x519af6(0x1b2)](_0x316874,_0x316874[_0x519af6(0x19e)]),AudioManager[_0x519af6(0x4ee)][_0x519af6(0x89a)](_0x316874[_0x519af6(0x19e)]));}),PluginManager['registerCommand'](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x2d7),_0x3fc6c4=>{const _0x15506f=_0x55ae0c;VisuMZ[_0x15506f(0x4a2)](_0x3fc6c4,_0x3fc6c4);const _0xbcbc4e=Math['round'](_0x3fc6c4[_0x15506f(0x4aa)])['clamp'](-0x64,0x64),_0x87db8b=AudioManager[_0x15506f(0x484)];_0x87db8b&&(_0x87db8b[_0x15506f(0x4aa)]=_0xbcbc4e,_0x87db8b['pos']=AudioManager['_bgsBuffer'][_0x15506f(0x262)](),AudioManager[_0x15506f(0x502)](_0x87db8b),AudioManager[_0x15506f(0x1b2)](_0x87db8b,_0x87db8b[_0x15506f(0x19e)]),AudioManager['_bgsBuffer'][_0x15506f(0x89a)](_0x87db8b[_0x15506f(0x19e)]));}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x296),_0x9de73c=>{const _0x23d143=_0x55ae0c;if(!$gameTemp[_0x23d143(0x6fd)]())return;const _0xa24202=Input[_0x23d143(0x3a6)]();console[_0x23d143(0x405)](_0xa24202);}),PluginManager['registerCommand'](pluginData['name'],_0x55ae0c(0x692),_0x438bb7=>{const _0x2b0de0=_0x55ae0c;if(!$gameTemp[_0x2b0de0(0x6fd)]())return;if(!Utils['isNwjs']())return;SceneManager['_scene']['_active']=![],VisuMZ[_0x2b0de0(0x3ae)]['ExportStrFromAllMaps']();}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x225),_0x16e117=>{const _0x2e2ec4=_0x55ae0c;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager['_scene']['_active']=![],VisuMZ[_0x2e2ec4(0x3ae)]['ExportStrFromAllTroops']();}),PluginManager['registerCommand'](pluginData['name'],'ExportCurMapText',_0x16435e=>{const _0x56349a=_0x55ae0c;if(!$gameTemp[_0x56349a(0x6fd)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x56349a(0x258)]()<=0x0)return;VisuMZ[_0x56349a(0x4a2)](_0x16435e,_0x16435e);const _0x52e1e4='Map%1'[_0x56349a(0x703)]($gameMap[_0x56349a(0x258)]()['padZero'](0x3)),_0x4bea01=VisuMZ[_0x56349a(0x3ae)]['ExtractStrFromMap']($gameMap[_0x56349a(0x258)]());VisuMZ[_0x56349a(0x3ae)][_0x56349a(0x84f)](_0x4bea01,_0x52e1e4,!![]);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],'ExportCurTroopText',_0x5d811b=>{const _0x437948=_0x55ae0c;if(!$gameTemp[_0x437948(0x6fd)]())return;if(!Utils[_0x437948(0x618)]())return;if(!$gameParty[_0x437948(0x56e)]())return;VisuMZ[_0x437948(0x4a2)](_0x5d811b,_0x5d811b);const _0x3c5dd4=_0x437948(0x838)[_0x437948(0x703)]($gameTroop[_0x437948(0x1a7)][_0x437948(0x74c)](0x4)),_0x236bd7=VisuMZ['CoreEngine'][_0x437948(0x7e3)]($gameTroop['_troopId']);VisuMZ[_0x437948(0x3ae)][_0x437948(0x84f)](_0x236bd7,_0x3c5dd4,!![]);}),VisuMZ['CoreEngine'][_0x55ae0c(0x84f)]=function(_0x5e512b,_0x7809fe,_0x431579){const _0x318163=_0x55ae0c,_0x276501=require('fs');let _0x32229d='Exported_Script_%1.txt'[_0x318163(0x703)](_0x7809fe||'0');_0x276501['writeFile'](_0x32229d,_0x5e512b,_0x35ec93=>{const _0x3e3735=_0x318163;if(_0x35ec93)throw err;else _0x431579&&alert(_0x3e3735(0x759)[_0x3e3735(0x703)](_0x32229d));});},VisuMZ[_0x55ae0c(0x3ae)]['ExportStrFromAllMaps']=function(){const _0x415bc3=_0x55ae0c,_0x1ec270=[];for(const _0x3da693 of $dataMapInfos){if(!_0x3da693)continue;_0x1ec270['push'](_0x3da693['id']);}const _0x2b3e09=_0x1ec270['length']*0x64+Math[_0x415bc3(0x6f1)](0x64);alert(_0x415bc3(0x911)['format'](_0x2b3e09)),this['_storedMapText']=[],this[_0x415bc3(0x525)]=$dataMap;for(const _0x33b243 of _0x1ec270){VisuMZ[_0x415bc3(0x3ae)]['loadMapData'](_0x33b243);}setTimeout(VisuMZ[_0x415bc3(0x3ae)][_0x415bc3(0x4f3)]['bind'](this),_0x2b3e09);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x936)]=function(_0x1d0c8b){const _0x4f870b=_0x55ae0c,_0x3fe792=_0x4f870b(0x1c3)['format'](_0x1d0c8b['padZero'](0x3)),_0x5e024e=new XMLHttpRequest(),_0x271f57=_0x4f870b(0x99a)+_0x3fe792;_0x5e024e[_0x4f870b(0x20f)](_0x4f870b(0x6b1),_0x271f57),_0x5e024e[_0x4f870b(0x7ba)](_0x4f870b(0x1b8)),_0x5e024e[_0x4f870b(0x671)]=()=>this['storeMapData'](_0x5e024e,_0x1d0c8b,_0x3fe792,_0x271f57),_0x5e024e['onerror']=()=>DataManager[_0x4f870b(0x3d1)](_0x4f870b(0x626),_0x3fe792,_0x271f57),_0x5e024e[_0x4f870b(0x22c)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x67d)]=function(_0x5782d1,_0x17e163,_0x3e174f,_0x5ccb4c){const _0x7b50bb=_0x55ae0c;$dataMap=JSON[_0x7b50bb(0x5fc)](_0x5782d1[_0x7b50bb(0x53b)]),DataManager[_0x7b50bb(0x5de)]($dataMap),this[_0x7b50bb(0x3f0)][_0x17e163]=VisuMZ[_0x7b50bb(0x3ae)]['ExtractStrFromMap'](_0x17e163),$dataMap=this[_0x7b50bb(0x525)];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4f3)]=function(){const _0xc03ca4=_0x55ae0c,_0x5bfb62=_0xc03ca4(0x5df);this[_0xc03ca4(0x3f0)][_0xc03ca4(0x60f)](undefined)[_0xc03ca4(0x60f)]('')[_0xc03ca4(0x60f)](null);const _0x32b3f7=this[_0xc03ca4(0x3f0)][_0xc03ca4(0x3ad)](_0xc03ca4(0x1e4))[_0xc03ca4(0x371)]();VisuMZ['CoreEngine'][_0xc03ca4(0x84f)](_0x32b3f7,_0x5bfb62,!![]),SceneManager[_0xc03ca4(0x1a1)]['_active']=!![];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4eb)]=function(_0x4c68b3){const _0x10a049=_0x55ae0c;if(!$dataMap)return'';let _0x47a0f3='█'[_0x10a049(0x93f)](0x46)+'\x0a\x0a',_0x2fd457='═'[_0x10a049(0x93f)](0x46)+'\x0a\x0a',_0x4e0a94='';this[_0x10a049(0x632)]=0x0;for(const _0x51f46d of $dataMap[_0x10a049(0x5a5)]){if(!_0x51f46d)continue;let _0x5ccdd6=_0x51f46d['id'],_0x22e5eb=_0x51f46d[_0x10a049(0x61b)],_0xf3111b=_0x51f46d['pages'];for(const _0x3b0c39 of _0xf3111b){const _0x394cb0=_0xf3111b['indexOf'](_0x3b0c39)+0x1;let _0x4acec5=_0x2fd457+_0x10a049(0x340),_0x2fbd89=VisuMZ[_0x10a049(0x3ae)][_0x10a049(0x5af)](_0x3b0c39['list']);if(_0x2fbd89[_0x10a049(0x616)]>0x0){if(_0x4e0a94[_0x10a049(0x616)]>0x0)_0x4e0a94+=_0x2fd457+_0x10a049(0x1e4);else{const _0x5a1497=$dataMapInfos[_0x4c68b3][_0x10a049(0x61b)];_0x4e0a94+=_0x47a0f3+_0x10a049(0x7b0)[_0x10a049(0x703)](_0x4c68b3,_0x5a1497||'Unnamed')+_0x47a0f3;}_0x4e0a94+=_0x4acec5[_0x10a049(0x703)](_0x5ccdd6,_0x22e5eb,_0x394cb0,_0x2fbd89);}}}return _0x4e0a94[_0x10a049(0x616)]>0x0&&(_0x4e0a94+=_0x2fd457),_0x4e0a94;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x418)]=function(){const _0x35a036=_0x55ae0c,_0x4cca2a=$dataTroops[_0x35a036(0x616)]*0xa+Math['randomInt'](0xa);alert(_0x35a036(0x8af)['format'](_0x4cca2a));const _0x5c764b=[];for(const _0x4621a0 of $dataTroops){if(!_0x4621a0)continue;const _0x5bb75c=_0x4621a0['id'];_0x5c764b[_0x5bb75c]=VisuMZ[_0x35a036(0x3ae)]['ExtractStrFromTroop'](_0x5bb75c);}setTimeout(VisuMZ['CoreEngine'][_0x35a036(0x1ce)][_0x35a036(0x505)](this,_0x5c764b),_0x4cca2a);},VisuMZ[_0x55ae0c(0x3ae)]['ExtractStrFromTroop']=function(_0x9d883e){const _0x22ad41=_0x55ae0c;if(!$dataTroops[_0x9d883e])return'';let _0x9c61e3='█'[_0x22ad41(0x93f)](0x46)+'\x0a\x0a',_0x3001e9='═'[_0x22ad41(0x93f)](0x46)+'\x0a\x0a',_0x3a4deb='';this[_0x22ad41(0x632)]=0x0;const _0x5f5994=$dataTroops[_0x9d883e];let _0x3931d5=_0x5f5994[_0x22ad41(0x6a1)];for(const _0x303f7c of _0x3931d5){const _0x2fc0c8=_0x3931d5['indexOf'](_0x303f7c)+0x1;let _0x1f20cd=_0x3001e9+_0x22ad41(0x4c2),_0x4f69e1=VisuMZ[_0x22ad41(0x3ae)][_0x22ad41(0x5af)](_0x303f7c[_0x22ad41(0x784)]);_0x4f69e1[_0x22ad41(0x616)]>0x0&&(_0x3a4deb[_0x22ad41(0x616)]>0x0?_0x3a4deb+=_0x3001e9+_0x22ad41(0x1e4):_0x3a4deb+=_0x9c61e3+_0x22ad41(0x5bc)[_0x22ad41(0x703)](_0x9d883e,_0x5f5994['name']||_0x22ad41(0x84c))+_0x9c61e3,_0x3a4deb+=_0x1f20cd[_0x22ad41(0x703)](_0x2fc0c8,_0x4f69e1));}return _0x3a4deb[_0x22ad41(0x616)]>0x0&&(_0x3a4deb+=_0x3001e9),_0x3a4deb;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1ce)]=function(_0x2baaa0){const _0x12e62a=_0x55ae0c,_0x53b738='AllTroops';_0x2baaa0[_0x12e62a(0x60f)](undefined)[_0x12e62a(0x60f)]('')[_0x12e62a(0x60f)](null);const _0x3f2b72=_0x2baaa0['join'](_0x12e62a(0x1e4))[_0x12e62a(0x371)]();VisuMZ['CoreEngine'][_0x12e62a(0x84f)](_0x3f2b72,_0x53b738,!![]),SceneManager[_0x12e62a(0x1a1)][_0x12e62a(0x8b1)]=!![];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x5af)]=function(_0x33b1dd){const _0x4337d3=_0x55ae0c;let _0x1053ba='\x0a'+'─'[_0x4337d3(0x93f)](0x46)+'\x0a',_0x1652b9='\x0a'+'┄'[_0x4337d3(0x93f)](0x46)+'\x0a',_0x181149='';for(const _0x1b70a9 of _0x33b1dd){if(!_0x1b70a9)continue;if(_0x1b70a9[_0x4337d3(0x60c)]===0x65)_0x181149+=_0x1053ba+'\x0a',_0x181149+=_0x4337d3(0x3ed),_0x1b70a9[_0x4337d3(0x60e)][0x4]!==''&&_0x1b70a9[_0x4337d3(0x60e)][0x4]!==undefined&&(_0x181149+=_0x4337d3(0x7c1)[_0x4337d3(0x703)](_0x1b70a9[_0x4337d3(0x60e)][0x4]));else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x191)_0x181149+=_0x4337d3(0x3c3)[_0x4337d3(0x703)](_0x1b70a9['parameters'][0x0]);else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x192)_0x181149+=_0x1053ba,_0x181149+=_0x4337d3(0x672)[_0x4337d3(0x703)](_0x1652b9,_0x1b70a9[_0x4337d3(0x60e)][0x0]+0x1,_0x1b70a9[_0x4337d3(0x60e)][0x1]);else{if(_0x1b70a9['code']===0x193)_0x181149+=_0x1053ba,_0x181149+=_0x4337d3(0x739)[_0x4337d3(0x703)](_0x1652b9);else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x194)_0x181149+=_0x1053ba,_0x181149+='%1〘End\x20Choice\x20Selection〙%1'['format'](_0x1652b9);else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x69)_0x181149+=_0x1053ba+'\x0a',_0x181149+='〘Scrolling\x20Text〙\x0a';else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x6c)_0x181149+=_0x1053ba+'\x0a',_0x181149+=_0x4337d3(0x69d)[_0x4337d3(0x703)](_0x1b70a9['parameters'][0x0]);else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x198)_0x181149+=_0x4337d3(0x3c3)['format'](_0x1b70a9[_0x4337d3(0x60e)][0x0]);else{if(_0x1b70a9[_0x4337d3(0x60c)]===0x75){const _0x230d7c=$dataCommonEvents[_0x1b70a9[_0x4337d3(0x60e)][0x0]];if(_0x230d7c&&this[_0x4337d3(0x632)]<=0xa){this[_0x4337d3(0x632)]++;let _0x249b17=VisuMZ[_0x4337d3(0x3ae)][_0x4337d3(0x5af)](_0x230d7c[_0x4337d3(0x784)]);_0x249b17[_0x4337d3(0x616)]>0x0&&(_0x181149+=_0x1053ba,_0x181149+=_0x1652b9,_0x181149+=_0x4337d3(0x836)['format'](_0x230d7c['id'],_0x230d7c['name']),_0x181149+=_0x1652b9,_0x181149+=_0x249b17,_0x181149+=_0x1652b9,_0x181149+=_0x4337d3(0x971)[_0x4337d3(0x703)](_0x230d7c['id'],_0x230d7c['name']),_0x181149+=_0x1652b9),this['_commonEventLayers']--;}}}}}}}}}}}return _0x181149[_0x4337d3(0x616)]>0x0&&(_0x181149+=_0x1053ba),_0x181149;},PluginManager[_0x55ae0c(0x4b4)](pluginData['name'],_0x55ae0c(0x92c),_0x97caa6=>{const _0x257e02=_0x55ae0c;VisuMZ[_0x257e02(0x4a2)](_0x97caa6,_0x97caa6);const _0x4b0401=_0x97caa6['URL'];VisuMZ[_0x257e02(0x2c5)](_0x4b0401);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x43c),_0x418da0=>{const _0x224c6e=_0x55ae0c;VisuMZ[_0x224c6e(0x4a2)](_0x418da0,_0x418da0);const _0x5a7604=_0x418da0[_0x224c6e(0x80a)]||0x0;$gameParty[_0x224c6e(0x907)](_0x5a7604);}),PluginManager['registerCommand'](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x77b),_0x4c4d00=>{const _0x2c0ad2=_0x55ae0c;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x2c0ad2(0x4a2)](_0x4c4d00,_0x4c4d00);const _0xfcb519=_0x4c4d00[_0x2c0ad2(0x1ec)];SceneManager[_0x2c0ad2(0x1a1)][_0x2c0ad2(0x4cb)](_0xfcb519);}),PluginManager[_0x55ae0c(0x4b4)](pluginData['name'],'PictureCoordinatesMode',_0x55d296=>{const _0x426843=_0x55ae0c;if(!$gameTemp[_0x426843(0x6fd)]())return;if(!Utils['isNwjs']())return;VisuMZ['ConvertParams'](_0x55d296,_0x55d296);const _0x9c8e63=_0x55d296[_0x426843(0x245)]||0x1;$gameTemp[_0x426843(0x233)]=_0x9c8e63;}),PluginManager[_0x55ae0c(0x4b4)](pluginData['name'],_0x55ae0c(0x680),_0x47a065=>{const _0x19597c=_0x55ae0c;VisuMZ[_0x19597c(0x4a2)](_0x47a065,_0x47a065);const _0x4b94c0=_0x47a065[_0x19597c(0x4ac)]||0x1,_0x1849e8=_0x47a065[_0x19597c(0x7b2)]||_0x19597c(0x394),_0x118fa1=$gameScreen[_0x19597c(0x532)](_0x4b94c0);_0x118fa1&&_0x118fa1[_0x19597c(0x8dc)](_0x1849e8);}),PluginManager['registerCommand'](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x4e8),_0x539c72=>{const _0x5c190f=_0x55ae0c;for(let _0x55ea43=0x1;_0x55ea43<=$gameScreen[_0x5c190f(0x4ea)]();_0x55ea43++){$gameScreen['erasePicture'](_0x55ea43);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x87c),_0x5c212c=>{const _0x5e10ed=_0x55ae0c;VisuMZ[_0x5e10ed(0x4a2)](_0x5c212c,_0x5c212c);const _0x23e492=Math['min'](_0x5c212c['StartID'],_0x5c212c[_0x5e10ed(0x8cd)]),_0x5280cf=Math[_0x5e10ed(0x391)](_0x5c212c[_0x5e10ed(0x63a)],_0x5c212c[_0x5e10ed(0x8cd)]);for(let _0x4ce163=_0x23e492;_0x4ce163<=_0x5280cf;_0x4ce163++){$gameScreen[_0x5e10ed(0x8de)](_0x4ce163);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x464),_0x21b326=>{const _0x1064b4=_0x55ae0c;VisuMZ[_0x1064b4(0x4a2)](_0x21b326,_0x21b326);const _0x332412=Math[_0x1064b4(0x41d)](_0x21b326[_0x1064b4(0x245)])[_0x1064b4(0x621)](0x1,0x64),_0x57e486=-Number(_0x21b326['AdjustAngle']||0x0),_0x44281a=Math[_0x1064b4(0x391)](_0x21b326[_0x1064b4(0x208)]||0x0,0x0),_0x488b58=_0x21b326[_0x1064b4(0x7b2)]||'Linear',_0x93389b=_0x21b326['Wait'],_0x54e74e=$gameScreen['picture'](_0x332412);if(!_0x54e74e)return;_0x54e74e['changeAnglePlusData'](_0x57e486,_0x44281a,_0x488b58);if(_0x93389b){const _0x76f87=$gameTemp['getLastPluginCommandInterpreter']();if(_0x76f87)_0x76f87[_0x1064b4(0x854)](_0x44281a);}}),PluginManager['registerCommand'](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x615),_0x420d5a=>{const _0x2f5ae3=_0x55ae0c;VisuMZ[_0x2f5ae3(0x4a2)](_0x420d5a,_0x420d5a);const _0x151cb1=Math[_0x2f5ae3(0x41d)](_0x420d5a[_0x2f5ae3(0x245)])[_0x2f5ae3(0x621)](0x1,0x64),_0x136a3a=-Number(_0x420d5a['TargetAngle']||0x0),_0x33d396=Math[_0x2f5ae3(0x391)](_0x420d5a[_0x2f5ae3(0x208)]||0x0,0x0),_0x1e5136=_0x420d5a[_0x2f5ae3(0x7b2)]||_0x2f5ae3(0x394),_0x2ef097=_0x420d5a['Wait'],_0x20dd57=$gameScreen['picture'](_0x151cb1);if(!_0x20dd57)return;_0x20dd57[_0x2f5ae3(0x8a3)](_0x136a3a,_0x33d396,_0x1e5136);if(_0x2ef097){const _0x2441ad=$gameTemp[_0x2f5ae3(0x85f)]();if(_0x2441ad)_0x2441ad[_0x2f5ae3(0x854)](_0x33d396);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x871),_0x29e7b5=>{const _0x55d376=_0x55ae0c;VisuMZ[_0x55d376(0x4a2)](_0x29e7b5,_0x29e7b5);const _0x549310=Math[_0x55d376(0x41d)](_0x29e7b5['PictureID'])['clamp'](0x1,0x64),_0x53cf73=_0x29e7b5[_0x55d376(0x6c3)],_0x12fc87=_0x53cf73[_0x55d376(0x760)][_0x55d376(0x621)](0x0,0x1),_0xb51215=Math['round'](_0x53cf73[_0x55d376(0x2d1)]||0x0),_0x40c35c=Math['round'](_0x53cf73['PositionY']||0x0),_0x3a1439=Math[_0x55d376(0x41d)](_0x53cf73[_0x55d376(0x396)]||0x0),_0x2e5ef0=Math['round'](_0x53cf73[_0x55d376(0x1f6)]||0x0),_0x53e587=Math[_0x55d376(0x41d)](_0x53cf73[_0x55d376(0x5b3)])['clamp'](0x0,0xff),_0x500242=_0x53cf73[_0x55d376(0x515)],_0x80cf05=_0x55d376(0x2d4),_0xcc9935=_0x29e7b5[_0x55d376(0x932)]?_0x55d376(0x932):_0x55d376(0x2aa),_0x45d789=_0x80cf05[_0x55d376(0x703)](_0x29e7b5['IconIndex'],_0xcc9935);$gameScreen[_0x55d376(0x295)](_0x549310,_0x45d789,_0x12fc87,_0xb51215,_0x40c35c,_0x3a1439,_0x2e5ef0,_0x53e587,_0x500242);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x96d),_0x4d7de3=>{const _0x15fdd0=_0x55ae0c;VisuMZ[_0x15fdd0(0x4a2)](_0x4d7de3,_0x4d7de3);const _0x1ee972=_0x4d7de3[_0x15fdd0(0x715)]||'random',_0x408386=_0x4d7de3['Power'][_0x15fdd0(0x621)](0x1,0x9),_0x551232=_0x4d7de3[_0x15fdd0(0x728)][_0x15fdd0(0x621)](0x1,0x9),_0xd5b273=_0x4d7de3[_0x15fdd0(0x208)]||0x1,_0x409876=_0x4d7de3['Wait'];$gameScreen[_0x15fdd0(0x3b3)](_0x1ee972),$gameScreen[_0x15fdd0(0x307)](_0x408386,_0x551232,_0xd5b273);if(_0x409876){const _0x5deaa4=$gameTemp['getLastPluginCommandInterpreter']();if(_0x5deaa4)_0x5deaa4[_0x15fdd0(0x854)](_0xd5b273);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData['name'],_0x55ae0c(0x315),_0x5ba3cb=>{const _0x49a0cf=_0x55ae0c;if($gameParty[_0x49a0cf(0x56e)]())return;VisuMZ[_0x49a0cf(0x4a2)](_0x5ba3cb,_0x5ba3cb);const _0x329dd5=_0x5ba3cb[_0x49a0cf(0x3d6)],_0x43183b=(_0x5ba3cb[_0x49a0cf(0x8d7)]||0x0)/0x64;for(const _0x3be7ee of _0x329dd5){const _0x3821c0=Math[_0x49a0cf(0x538)]()<=_0x43183b;$gameSwitches[_0x49a0cf(0x236)](_0x3be7ee,_0x3821c0);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x387),_0x575d16=>{const _0x10f583=_0x55ae0c;if($gameParty[_0x10f583(0x56e)]())return;VisuMZ[_0x10f583(0x4a2)](_0x575d16,_0x575d16);const _0x748e3d=Math[_0x10f583(0x81a)](_0x575d16[_0x10f583(0x63a)],_0x575d16[_0x10f583(0x8cd)]),_0x2cc7d2=Math[_0x10f583(0x391)](_0x575d16[_0x10f583(0x63a)],_0x575d16[_0x10f583(0x8cd)]),_0x51d36a=(_0x575d16[_0x10f583(0x8d7)]||0x0)/0x64;for(let _0x38fee6=_0x748e3d;_0x38fee6<=_0x2cc7d2;_0x38fee6++){const _0x2e7c2d=Math[_0x10f583(0x538)]()<=_0x51d36a;$gameSwitches['setValue'](_0x38fee6,_0x2e7c2d);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x49f),_0x4504cf=>{const _0x87624c=_0x55ae0c;if($gameParty[_0x87624c(0x56e)]())return;VisuMZ[_0x87624c(0x4a2)](_0x4504cf,_0x4504cf);const _0x19291f=_0x4504cf['IDs'];for(const _0x310893 of _0x19291f){const _0x2c40e0=$gameSwitches[_0x87624c(0x80a)](_0x310893);$gameSwitches[_0x87624c(0x236)](_0x310893,!_0x2c40e0);}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x890),_0x392030=>{const _0x2fff2e=_0x55ae0c;if($gameParty[_0x2fff2e(0x56e)]())return;VisuMZ['ConvertParams'](_0x392030,_0x392030);const _0x3e0795=Math[_0x2fff2e(0x81a)](_0x392030[_0x2fff2e(0x63a)],_0x392030['EndingID']),_0x1dd376=Math[_0x2fff2e(0x391)](_0x392030[_0x2fff2e(0x63a)],_0x392030[_0x2fff2e(0x8cd)]);for(let _0x5dfcd6=_0x3e0795;_0x5dfcd6<=_0x1dd376;_0x5dfcd6++){const _0x43221c=$gameSwitches[_0x2fff2e(0x80a)](_0x5dfcd6);$gameSwitches[_0x2fff2e(0x236)](_0x5dfcd6,!_0x43221c);}}),PluginManager['registerCommand'](pluginData[_0x55ae0c(0x61b)],'SystemSetFontSize',_0x29b2dc=>{const _0x5c7421=_0x55ae0c;VisuMZ[_0x5c7421(0x4a2)](_0x29b2dc,_0x29b2dc);const _0x57c77d=_0x29b2dc[_0x5c7421(0x993)]||0x1;$gameSystem[_0x5c7421(0x38b)](_0x57c77d);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x47d),_0x236087=>{const _0x17b44c=_0x55ae0c;if($gameParty[_0x17b44c(0x56e)]())return;VisuMZ[_0x17b44c(0x4a2)](_0x236087,_0x236087);const _0x2684aa=_0x236087['option'];if(_0x2684aa[_0x17b44c(0x65b)](/Front/i))$gameSystem[_0x17b44c(0x6ed)](![]);else _0x2684aa[_0x17b44c(0x65b)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem['setSideView'](!$gameSystem['isSideView']());}),PluginManager['registerCommand'](pluginData[_0x55ae0c(0x61b)],'SystemLoadAudio',_0x30360=>{const _0x134eb3=_0x55ae0c;if($gameParty[_0x134eb3(0x56e)]())return;VisuMZ[_0x134eb3(0x4a2)](_0x30360,_0x30360);const _0x4ade7b=[_0x134eb3(0x88c),_0x134eb3(0x933),'me','se'];for(const _0x4221bc of _0x4ade7b){const _0x2067f4=_0x30360[_0x4221bc],_0x4e1091='%1/'[_0x134eb3(0x703)](_0x4221bc);for(const _0x3e3625 of _0x2067f4){AudioManager['createBuffer'](_0x4e1091,_0x3e3625);}}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x41f),_0xf1bff0=>{const _0x1b7ef7=_0x55ae0c;if($gameParty[_0x1b7ef7(0x56e)]())return;VisuMZ[_0x1b7ef7(0x4a2)](_0xf1bff0,_0xf1bff0);const _0x5b755e=['animations',_0x1b7ef7(0x7ae),_0x1b7ef7(0x716),_0x1b7ef7(0x2b4),'enemies',_0x1b7ef7(0x1bc),_0x1b7ef7(0x929),_0x1b7ef7(0x919),_0x1b7ef7(0x825),_0x1b7ef7(0x660),_0x1b7ef7(0x68a),'tilesets','titles1',_0x1b7ef7(0x65e)];for(const _0x23b8a4 of _0x5b755e){const _0xbc693b=_0xf1bff0[_0x23b8a4],_0x38634d=_0x1b7ef7(0x438)[_0x1b7ef7(0x703)](_0x23b8a4);for(const _0x5c64e4 of _0xbc693b){ImageManager[_0x1b7ef7(0x6d9)](_0x38634d,_0x5c64e4);}}}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x1d6),_0x352732=>{const _0x4373d6=_0x55ae0c;if($gameParty['inBattle']())return;VisuMZ[_0x4373d6(0x4a2)](_0x352732,_0x352732);const _0x21e0da=_0x352732[_0x4373d6(0x993)][_0x4373d6(0x8d3)]()[_0x4373d6(0x371)](),_0x3b1639=VisuMZ[_0x4373d6(0x3ae)]['CreateBattleSystemID'](_0x21e0da);$gameSystem[_0x4373d6(0x6df)](_0x3b1639);}),VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1dc)]=function(_0x2bab8c){const _0x148e72=_0x55ae0c;_0x2bab8c=_0x2bab8c||_0x148e72(0x92e),_0x2bab8c=String(_0x2bab8c)[_0x148e72(0x8d3)]()[_0x148e72(0x371)]();switch(_0x2bab8c){case _0x148e72(0x6e7):return 0x0;case _0x148e72(0x87a):Imported[_0x148e72(0x696)]&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x148e72(0x912):Imported[_0x148e72(0x696)]&&(ConfigManager[_0x148e72(0x724)]=![]);return 0x2;case _0x148e72(0x5fb):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x148e72(0x5fb);break;case _0x148e72(0x3f5):if(Imported[_0x148e72(0x239)])return _0x148e72(0x3f5);break;case _0x148e72(0x39a):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x148e72(0x39a);break;case _0x148e72(0x5a4):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x148e72(0x5a4);break;case _0x148e72(0x6ab):if(Imported[_0x148e72(0x1dd)])return'OTB';break;case _0x148e72(0x20a):if(Imported[_0x148e72(0x5a6)])return _0x148e72(0x20a);break;case _0x148e72(0x3af):if(Imported[_0x148e72(0x4fe)])return _0x148e72(0x3af);break;}return $dataSystem[_0x148e72(0x27b)];},PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x54e),_0x53dd39=>{const _0x382fc2=_0x55ae0c;VisuMZ[_0x382fc2(0x4a2)](_0x53dd39,_0x53dd39);const _0x398a6d=_0x53dd39[_0x382fc2(0x993)]||0x1;$gameSystem['setWindowPadding'](_0x398a6d);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],'TextPopupShow',_0x56c755=>{VisuMZ['ConvertParams'](_0x56c755,_0x56c755);const _0x2c31d0=_0x56c755['text']||'';$textPopup(_0x2c31d0);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x718),_0x5e2952=>{const _0x21cd01=_0x55ae0c;VisuMZ['ConvertParams'](_0x5e2952,_0x5e2952);const _0x212076=_0x5e2952['id']||0x1,_0x4083fe=_0x5e2952[_0x21cd01(0x4a9)],_0x22b576=_0x5e2952[_0x21cd01(0x26d)]||0x0;let _0x410756=$gameVariables['value'](_0x212076)||0x0;switch(_0x4083fe){case'=':_0x410756=_0x22b576;break;case'+':_0x410756+=_0x22b576;break;case'-':_0x410756-=_0x22b576;break;case'*':_0x410756*=_0x22b576;break;case'/':_0x410756/=_0x22b576;break;case'%':_0x410756%=_0x22b576;break;}_0x410756=_0x410756||0x0,$gameVariables[_0x21cd01(0x236)](_0x212076,_0x410756);}),PluginManager[_0x55ae0c(0x4b4)](pluginData[_0x55ae0c(0x61b)],_0x55ae0c(0x927),_0x53a3fd=>{const _0x4cc957=_0x55ae0c;VisuMZ['ConvertParams'](_0x53a3fd,_0x53a3fd);const _0x5e4829=_0x53a3fd['id']()||0x1,_0x49fbca=_0x53a3fd[_0x4cc957(0x4a9)],_0x2db68b=_0x53a3fd[_0x4cc957(0x26d)]()||0x0;let _0x456378=$gameVariables[_0x4cc957(0x80a)](_0x5e4829)||0x0;switch(_0x49fbca){case'=':_0x456378=_0x2db68b;break;case'+':_0x456378+=_0x2db68b;break;case'-':_0x456378-=_0x2db68b;break;case'*':_0x456378*=_0x2db68b;break;case'/':_0x456378/=_0x2db68b;break;case'%':_0x456378%=_0x2db68b;break;}_0x456378=_0x456378||0x0,$gameVariables[_0x4cc957(0x236)](_0x5e4829,_0x456378);}),VisuMZ[_0x55ae0c(0x3ae)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x55ae0c(0x985)],Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x985)]=function(){const _0x38cc90=_0x55ae0c;VisuMZ[_0x38cc90(0x3ae)][_0x38cc90(0x331)][_0x38cc90(0x67e)](this),this[_0x38cc90(0x816)](),this[_0x38cc90(0x23c)](),this[_0x38cc90(0x579)](),this[_0x38cc90(0x617)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x38cc90(0x3bc)](),VisuMZ[_0x38cc90(0x636)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x622)]={},Scene_Boot[_0x55ae0c(0x792)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x23dd8f=_0x55ae0c,_0x3f5123=['MAXHP','MAXMP',_0x23dd8f(0x335),_0x23dd8f(0x998),_0x23dd8f(0x6fe),_0x23dd8f(0x775),_0x23dd8f(0x6b7),_0x23dd8f(0x4a1)],_0x2e137d=[_0x23dd8f(0x7eb),_0x23dd8f(0x409),_0x23dd8f(0x483),'CEV','MEV',_0x23dd8f(0x302),_0x23dd8f(0x673),_0x23dd8f(0x5c7),'MRG',_0x23dd8f(0x62f)],_0x2b720a=[_0x23dd8f(0x506),'GRD',_0x23dd8f(0x473),_0x23dd8f(0x807),_0x23dd8f(0x427),_0x23dd8f(0x1d2),_0x23dd8f(0x6ac),_0x23dd8f(0x3df),_0x23dd8f(0x899),_0x23dd8f(0x877)],_0x8056c8=[_0x3f5123,_0x2e137d,_0x2b720a],_0x35dade=['Plus','Plus1',_0x23dd8f(0x5dc),_0x23dd8f(0x398),'Rate','Rate1',_0x23dd8f(0x994),_0x23dd8f(0x7cc),_0x23dd8f(0x57e),'Flat2'];for(const _0x4f6af6 of _0x8056c8){let _0x1fdfd9='';if(_0x4f6af6===_0x3f5123)_0x1fdfd9=_0x23dd8f(0x26b);if(_0x4f6af6===_0x2e137d)_0x1fdfd9=_0x23dd8f(0x442);if(_0x4f6af6===_0x2b720a)_0x1fdfd9=_0x23dd8f(0x559);for(const _0x1dadec of _0x35dade){let _0x723f9e='%1%2'[_0x23dd8f(0x703)](_0x1fdfd9,_0x1dadec);VisuMZ[_0x23dd8f(0x3ae)]['RegExp'][_0x723f9e]=[],VisuMZ[_0x23dd8f(0x3ae)][_0x23dd8f(0x622)][_0x723f9e+'JS']=[];let _0x205788=_0x23dd8f(0x3bd);if(['Plus',_0x23dd8f(0x7cc)][_0x23dd8f(0x80e)](_0x1dadec))_0x205788+=_0x23dd8f(0x37d);else{if([_0x23dd8f(0x503),'Flat1'][_0x23dd8f(0x80e)](_0x1dadec))_0x205788+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if(['Plus2',_0x23dd8f(0x4f7)][_0x23dd8f(0x80e)](_0x1dadec))_0x205788+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x1dadec===_0x23dd8f(0x398))_0x205788+=_0x23dd8f(0x644);else{if(_0x1dadec===_0x23dd8f(0x1cd))_0x205788+='(\x5cd+)([%％])>';else _0x1dadec===_0x23dd8f(0x994)&&(_0x205788+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x2a6259 of _0x4f6af6){let _0x55047d=_0x1dadec[_0x23dd8f(0x4ca)](/[\d+]/g,'')[_0x23dd8f(0x8d3)]();const _0x5e991c=_0x205788[_0x23dd8f(0x703)](_0x2a6259,_0x55047d);VisuMZ[_0x23dd8f(0x3ae)][_0x23dd8f(0x622)][_0x723f9e]['push'](new RegExp(_0x5e991c,'i'));const _0x39c3fe='<JS\x20%1\x20%2:[\x20](.*)>'['format'](_0x2a6259,_0x55047d);VisuMZ[_0x23dd8f(0x3ae)][_0x23dd8f(0x622)][_0x723f9e+'JS']['push'](new RegExp(_0x39c3fe,'i'));}}}},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x23c)]=function(){const _0x4aec84=_0x55ae0c;if(VisuMZ[_0x4aec84(0x636)])return;},Scene_Boot['prototype'][_0x55ae0c(0x579)]=function(){const _0x4ab84c=_0x55ae0c,_0x520110=VisuMZ[_0x4ab84c(0x3ae)][_0x4ab84c(0x6c3)];_0x520110[_0x4ab84c(0x5fa)][_0x4ab84c(0x414)]&&VisuMZ[_0x4ab84c(0x7ab)](!![]);_0x520110['QoL'][_0x4ab84c(0x21c)]&&(Input[_0x4ab84c(0x25b)][0x23]='end',Input[_0x4ab84c(0x25b)][0x24]=_0x4ab84c(0x8d2));if(_0x520110['ButtonAssist']){const _0x193733=_0x520110['ButtonAssist'];_0x193733[_0x4ab84c(0x219)]=_0x193733[_0x4ab84c(0x219)]||_0x4ab84c(0x946),_0x193733[_0x4ab84c(0x20c)]=_0x193733[_0x4ab84c(0x20c)]||_0x4ab84c(0x1a5);}_0x520110['KeyboardInput'][_0x4ab84c(0x7da)]&&(Input[_0x4ab84c(0x25b)][0x57]='up',Input[_0x4ab84c(0x25b)][0x41]=_0x4ab84c(0x3dc),Input['keyMapper'][0x53]='down',Input[_0x4ab84c(0x25b)][0x44]=_0x4ab84c(0x339),Input['keyMapper'][0x45]=_0x4ab84c(0x8aa)),_0x520110[_0x4ab84c(0x6a2)][_0x4ab84c(0x3a1)]&&(Input['keyMapper'][0x52]='dashToggle'),_0x520110['Param'][_0x4ab84c(0x963)]=_0x520110['Param'][_0x4ab84c(0x963)][_0x4ab84c(0x776)](_0x5e31ad=>_0x5e31ad['toUpperCase']()[_0x4ab84c(0x371)]()),_0x520110[_0x4ab84c(0x94d)][_0x4ab84c(0x881)]=_0x520110[_0x4ab84c(0x94d)][_0x4ab84c(0x881)]['map'](_0x468973=>_0x468973[_0x4ab84c(0x8d3)]()[_0x4ab84c(0x371)]()),_0x520110[_0x4ab84c(0x5fa)][_0x4ab84c(0x5b4)]=_0x520110[_0x4ab84c(0x5fa)][_0x4ab84c(0x5b4)]??!![],_0x520110[_0x4ab84c(0x5fa)][_0x4ab84c(0x8e6)]=_0x520110[_0x4ab84c(0x5fa)]['ShiftT_Toggle']??!![],_0x520110[_0x4ab84c(0x6a8)][_0x4ab84c(0x72f)]&&VisuMZ[_0x4ab84c(0x3ae)][_0x4ab84c(0x86e)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x86e)]=function(){const _0x4f5b20=_0x55ae0c;let _0x52faab=![],_0x1925a0=![];for(let _0x451fbe in Input[_0x4f5b20(0x25b)]){const _0x40ed19=Input[_0x4f5b20(0x25b)][_0x451fbe];if(_0x40ed19===_0x4f5b20(0x232))_0x52faab=!![];if(_0x40ed19===_0x4f5b20(0x55a))_0x1925a0=!![];if(_0x52faab&&_0x1925a0)return;}let _0x32518b=_0x4f5b20(0x246);_0x32518b+=_0x4f5b20(0x790),_0x32518b+=_0x4f5b20(0x900),_0x32518b+=_0x4f5b20(0x52f),_0x32518b+=_0x4f5b20(0x560),alert(_0x32518b),SceneManager[_0x4f5b20(0x5d8)]();},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x617)]=function(){const _0x5494ab=_0x55ae0c;this[_0x5494ab(0x5fe)]();},Scene_Boot[_0x55ae0c(0x792)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x58eada=_0x55ae0c,_0x2fd3b2=VisuMZ[_0x58eada(0x3ae)]['Settings'][_0x58eada(0x8a2)];for(const _0x160fa0 of _0x2fd3b2){const _0x3af06d=_0x160fa0[_0x58eada(0x3cd)][_0x58eada(0x4ca)](/[ ]/g,''),_0x1863cc=_0x160fa0[_0x58eada(0x82f)];VisuMZ[_0x58eada(0x3ae)][_0x58eada(0x67f)](_0x3af06d,_0x1863cc);}},VisuMZ[_0x55ae0c(0x3ae)]['createJsQuickFunction']=function(_0xf66f5b,_0x33e4ce){const _0x4dd511=_0x55ae0c;if(!!window[_0xf66f5b]){if($gameTemp['isPlaytest']())console[_0x4dd511(0x405)](_0x4dd511(0x32f)[_0x4dd511(0x703)](_0xf66f5b));}const _0x2b4230='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x4dd511(0x703)](_0xf66f5b,_0x33e4ce);window[_0xf66f5b]=new Function(_0x2b4230);},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x4a4)]=function(){const _0xc27af2=_0x55ae0c,_0xe237d=VisuMZ[_0xc27af2(0x3ae)][_0xc27af2(0x6c3)]['CustomParam'];if(!_0xe237d)return;for(const _0x53b993 of _0xe237d){if(!_0x53b993)continue;VisuMZ[_0xc27af2(0x3ae)][_0xc27af2(0x992)](_0x53b993);}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x3c2)]={},VisuMZ['CoreEngine'][_0x55ae0c(0x303)]={},VisuMZ['CoreEngine'][_0x55ae0c(0x3c8)]={},VisuMZ[_0x55ae0c(0x3ae)]['CustomParamAbb']={},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x992)]=function(_0xc8484){const _0x1fb985=_0x55ae0c,_0x27158d=_0xc8484[_0x1fb985(0x544)],_0x440b83=_0xc8484[_0x1fb985(0x461)],_0x45b03b=_0xc8484['Icon'],_0x943820=_0xc8484[_0x1fb985(0x715)],_0x193d29=new Function(_0xc8484[_0x1fb985(0x3cf)]);VisuMZ[_0x1fb985(0x3ae)][_0x1fb985(0x3c2)][_0x27158d[_0x1fb985(0x8d3)]()[_0x1fb985(0x371)]()]=_0x440b83,VisuMZ[_0x1fb985(0x3ae)]['CustomParamIcons'][_0x27158d[_0x1fb985(0x8d3)]()[_0x1fb985(0x371)]()]=_0x45b03b,VisuMZ[_0x1fb985(0x3ae)][_0x1fb985(0x3c8)][_0x27158d[_0x1fb985(0x8d3)]()[_0x1fb985(0x371)]()]=_0x943820,VisuMZ[_0x1fb985(0x3ae)][_0x1fb985(0x1de)][_0x27158d[_0x1fb985(0x8d3)]()[_0x1fb985(0x371)]()]=_0x27158d,Object['defineProperty'](Game_BattlerBase['prototype'],_0x27158d,{'get'(){const _0x3b1342=_0x1fb985,_0x294d68=_0x193d29[_0x3b1342(0x67e)](this);return _0x943820===_0x3b1342(0x1c2)?Math[_0x3b1342(0x41d)](_0x294d68):_0x294d68;}});},VisuMZ[_0x55ae0c(0x3ae)]['ControllerButtons']={},VisuMZ['CoreEngine'][_0x55ae0c(0x659)]={},Scene_Boot[_0x55ae0c(0x792)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x547616=_0x55ae0c,_0x92115d=VisuMZ[_0x547616(0x3ae)][_0x547616(0x6c3)][_0x547616(0x77e)];for(const _0x33a1f1 of _0x92115d){const _0x1da666=(_0x33a1f1[_0x547616(0x516)]||'')['toLowerCase']()[_0x547616(0x371)](),_0x37bfb8=(_0x33a1f1['Match']||'')[_0x547616(0x681)]()[_0x547616(0x371)]();VisuMZ[_0x547616(0x3ae)][_0x547616(0x77e)][_0x1da666]=_0x33a1f1,VisuMZ['CoreEngine'][_0x547616(0x659)][_0x37bfb8]=_0x1da666;}},VisuMZ[_0x55ae0c(0x636)]=function(){const _0x10d8c9=_0x55ae0c;for(const _0x3edda2 of $dataActors){if(_0x3edda2)VisuMZ[_0x10d8c9(0x741)](_0x3edda2);}for(const _0x2499ec of $dataClasses){if(_0x2499ec)VisuMZ[_0x10d8c9(0x265)](_0x2499ec);}for(const _0x471e3b of $dataSkills){if(_0x471e3b)VisuMZ[_0x10d8c9(0x801)](_0x471e3b);}for(const _0x3fc6d9 of $dataItems){if(_0x3fc6d9)VisuMZ[_0x10d8c9(0x8ac)](_0x3fc6d9);}for(const _0x474a01 of $dataWeapons){if(_0x474a01)VisuMZ['ParseWeaponNotetags'](_0x474a01);}for(const _0x4c65df of $dataArmors){if(_0x4c65df)VisuMZ[_0x10d8c9(0x28c)](_0x4c65df);}for(const _0x52801a of $dataEnemies){if(_0x52801a)VisuMZ['ParseEnemyNotetags'](_0x52801a);}for(const _0x39ac83 of $dataStates){if(_0x39ac83)VisuMZ[_0x10d8c9(0x6f8)](_0x39ac83);}for(const _0x41bf25 of $dataTilesets){if(_0x41bf25)VisuMZ[_0x10d8c9(0x6c4)](_0x41bf25);}},VisuMZ[_0x55ae0c(0x741)]=function(_0x5955b5){},VisuMZ[_0x55ae0c(0x265)]=function(_0x2a3bcd){},VisuMZ['ParseSkillNotetags']=function(_0x2ed4ec){},VisuMZ[_0x55ae0c(0x8ac)]=function(_0x2158a0){},VisuMZ[_0x55ae0c(0x575)]=function(_0x3beaad){},VisuMZ[_0x55ae0c(0x28c)]=function(_0x530c7b){},VisuMZ[_0x55ae0c(0x4d3)]=function(_0x5bfea6){},VisuMZ[_0x55ae0c(0x6f8)]=function(_0x2eddbf){},VisuMZ[_0x55ae0c(0x6c4)]=function(_0x27a177){},VisuMZ['CoreEngine'][_0x55ae0c(0x741)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x55ae0c(0x741)]=function(_0xf5b21f){const _0x352f32=_0x55ae0c;VisuMZ[_0x352f32(0x3ae)][_0x352f32(0x741)]['call'](this,_0xf5b21f);const _0xb75720=_0xf5b21f['note'];if(_0xb75720['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0xf5b21f['maxLevel']=Number(RegExp['$1']);if(_0xf5b21f['maxLevel']===0x0)_0xf5b21f[_0x352f32(0x578)]=Number[_0x352f32(0x7fd)];}_0xb75720[_0x352f32(0x65b)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xf5b21f[_0x352f32(0x2d0)]=Math[_0x352f32(0x81a)](Number(RegExp['$1']),_0xf5b21f[_0x352f32(0x578)]));},VisuMZ['CoreEngine'][_0x55ae0c(0x265)]=VisuMZ[_0x55ae0c(0x265)],VisuMZ[_0x55ae0c(0x265)]=function(_0x488217){const _0x20895c=_0x55ae0c;VisuMZ['CoreEngine']['ParseClassNotetags'][_0x20895c(0x67e)](this,_0x488217);if(_0x488217[_0x20895c(0x8c0)])for(const _0x2b1e06 of _0x488217['learnings']){_0x2b1e06[_0x20895c(0x526)][_0x20895c(0x65b)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2b1e06['level']=Math[_0x20895c(0x391)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4d3)]=VisuMZ[_0x55ae0c(0x4d3)],VisuMZ[_0x55ae0c(0x4d3)]=function(_0x2dbfc6){const _0x31f858=_0x55ae0c;VisuMZ['CoreEngine'][_0x31f858(0x4d3)]['call'](this,_0x2dbfc6),_0x2dbfc6['level']=0x1;const _0x50404e=_0x2dbfc6[_0x31f858(0x526)];if(_0x50404e[_0x31f858(0x65b)](/<LEVEL:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x26f)]=Number(RegExp['$1']);if(_0x50404e['match'](/<MAXHP:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x0]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<MAXMP:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x1]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<ATK:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x2]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<DEF:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x3]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<MAT:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x4]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<MDF:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x5]=Number(RegExp['$1']);if(_0x50404e['match'](/<AGI:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x6]=Number(RegExp['$1']);if(_0x50404e['match'](/<LUK:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x6f5)][0x7]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<EXP:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x5f8)]=Number(RegExp['$1']);if(_0x50404e[_0x31f858(0x65b)](/<GOLD:[ ](\d+)>/i))_0x2dbfc6[_0x31f858(0x638)]=Number(RegExp['$1']);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x3ef)]=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x1871ba=_0x55ae0c;switch(VisuMZ['CoreEngine'][_0x1871ba(0x6c3)][_0x1871ba(0x5fa)][_0x1871ba(0x2ed)]){case'stretch':return!![];case _0x1871ba(0x768):return![];default:return VisuMZ[_0x1871ba(0x3ae)]['Graphics_defaultStretchMode']['call'](this);}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x55c)]=Graphics[_0x55ae0c(0x783)],Graphics[_0x55ae0c(0x783)]=function(_0x2042df,_0x34d0b0,_0x504e40=null){const _0x4281dd=_0x55ae0c;VisuMZ[_0x4281dd(0x3ae)][_0x4281dd(0x55c)][_0x4281dd(0x67e)](this,_0x2042df,_0x34d0b0,_0x504e40),VisuMZ[_0x4281dd(0x7ab)](![]);},VisuMZ['CoreEngine'][_0x55ae0c(0x4b8)]=Graphics[_0x55ae0c(0x539)],Graphics['_centerElement']=function(_0x167281){const _0x424444=_0x55ae0c;VisuMZ[_0x424444(0x3ae)][_0x424444(0x4b8)][_0x424444(0x67e)](this,_0x167281),this['_centerElementCoreEngine'](_0x167281);},Graphics['_centerElementCoreEngine']=function(_0x1a5e73){const _0x3d3cff=_0x55ae0c;VisuMZ[_0x3d3cff(0x3ae)]['Settings'][_0x3d3cff(0x5fa)][_0x3d3cff(0x72e)]&&(_0x1a5e73[_0x3d3cff(0x36a)]['font-smooth']='none');VisuMZ[_0x3d3cff(0x3ae)][_0x3d3cff(0x6c3)][_0x3d3cff(0x5fa)][_0x3d3cff(0x7fc)]&&(_0x1a5e73[_0x3d3cff(0x36a)]['image-rendering']='pixelated');const _0x3c404c=Math['max'](0x0,Math['floor'](_0x1a5e73[_0x3d3cff(0x780)]*this[_0x3d3cff(0x8da)])),_0x1bcdca=Math['max'](0x0,Math[_0x3d3cff(0x49a)](_0x1a5e73[_0x3d3cff(0x555)]*this[_0x3d3cff(0x8da)]));_0x1a5e73['style'][_0x3d3cff(0x780)]=_0x3c404c+'px',_0x1a5e73['style'][_0x3d3cff(0x555)]=_0x1bcdca+'px';},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2ac)]=Bitmap[_0x55ae0c(0x792)]['initialize'],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x41fd80,_0x525678){const _0x43c377=_0x55ae0c;VisuMZ['CoreEngine'][_0x43c377(0x2ac)][_0x43c377(0x67e)](this,_0x41fd80,_0x525678),this[_0x43c377(0x537)]=!(VisuMZ[_0x43c377(0x3ae)][_0x43c377(0x6c3)][_0x43c377(0x5fa)]['PixelateImageRendering']??!![]);},Bitmap['prototype'][_0x55ae0c(0x987)]=function(){const _0x9ad297=_0x55ae0c;this[_0x9ad297(0x469)]=!![];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x42d)]=Sprite['prototype']['destroy'],Sprite[_0x55ae0c(0x792)][_0x55ae0c(0x297)]=function(){const _0x1e9ff6=_0x55ae0c;if(this[_0x1e9ff6(0x6a6)])VisuMZ[_0x1e9ff6(0x3ae)][_0x1e9ff6(0x42d)][_0x1e9ff6(0x67e)](this);this[_0x1e9ff6(0x2e2)]();},Sprite[_0x55ae0c(0x792)][_0x55ae0c(0x2e2)]=function(){const _0x428e31=_0x55ae0c;if(!this[_0x428e31(0x5ce)])return;if(!this['bitmap'][_0x428e31(0x469)])return;this[_0x428e31(0x5ce)][_0x428e31(0x939)]&&!this[_0x428e31(0x2cf)]['_baseTexture']['destroyed']&&this['bitmap'][_0x428e31(0x297)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x85e)]=Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x779)],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x779)]=function(_0x58c4d3,_0x518c07){const _0x3b3fa4=_0x55ae0c;VisuMZ['CoreEngine'][_0x3b3fa4(0x85e)][_0x3b3fa4(0x67e)](this,_0x58c4d3,_0x518c07),this[_0x3b3fa4(0x987)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x416)]=Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x685)],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x685)]=function(_0x38d959,_0x28b3db,_0x56c415,_0x15c2d5,_0x346d42,_0x2e4dbd,_0x3cdc96,_0x120c60,_0x71b950){const _0x594dc0=_0x55ae0c;_0x28b3db=Math[_0x594dc0(0x41d)](_0x28b3db),_0x56c415=Math[_0x594dc0(0x41d)](_0x56c415),_0x15c2d5=Math[_0x594dc0(0x41d)](_0x15c2d5),_0x346d42=Math[_0x594dc0(0x41d)](_0x346d42),_0x2e4dbd=Math[_0x594dc0(0x41d)](_0x2e4dbd),_0x3cdc96=Math[_0x594dc0(0x41d)](_0x3cdc96),VisuMZ['CoreEngine'][_0x594dc0(0x416)]['call'](this,_0x38d959,_0x28b3db,_0x56c415,_0x15c2d5,_0x346d42,_0x2e4dbd,_0x3cdc96,_0x120c60,_0x71b950),this[_0x594dc0(0x987)]();},VisuMZ['CoreEngine'][_0x55ae0c(0x8a7)]=Bitmap[_0x55ae0c(0x792)]['clearRect'],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x368)]=function(_0x3bd8d2,_0x1d0e9e,_0x4c33d6,_0x1df3cf){const _0x255c07=_0x55ae0c;VisuMZ[_0x255c07(0x3ae)][_0x255c07(0x8a7)][_0x255c07(0x67e)](this,_0x3bd8d2,_0x1d0e9e,_0x4c33d6,_0x1df3cf),this[_0x255c07(0x987)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x71d)]=Bitmap['prototype'][_0x55ae0c(0x5f6)],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x5f6)]=function(_0x56120c,_0x31a59b,_0xf6415e,_0x384313,_0x516c96){const _0x34a7c5=_0x55ae0c;VisuMZ[_0x34a7c5(0x3ae)][_0x34a7c5(0x71d)][_0x34a7c5(0x67e)](this,_0x56120c,_0x31a59b,_0xf6415e,_0x384313,_0x516c96),this[_0x34a7c5(0x987)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6bb)]=Bitmap['prototype'][_0x55ae0c(0x90d)],Bitmap[_0x55ae0c(0x792)]['strokeRect']=function(_0x188126,_0x20cb19,_0x2e2255,_0x3b2ba4,_0x971b8b){const _0x355c76=_0x55ae0c;VisuMZ[_0x355c76(0x3ae)][_0x355c76(0x6bb)][_0x355c76(0x67e)](this,_0x188126,_0x20cb19,_0x2e2255,_0x3b2ba4,_0x971b8b),this[_0x355c76(0x987)]();},VisuMZ[_0x55ae0c(0x3ae)]['Bitmap_gradientFillRect']=Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x558)],Bitmap['prototype'][_0x55ae0c(0x558)]=function(_0x28419e,_0x43a143,_0x56b914,_0x473319,_0x3e48af,_0x46cd33,_0x24e8d5){const _0x4e4731=_0x55ae0c;VisuMZ[_0x4e4731(0x3ae)][_0x4e4731(0x4fc)][_0x4e4731(0x67e)](this,_0x28419e,_0x43a143,_0x56b914,_0x473319,_0x3e48af,_0x46cd33,_0x24e8d5),this[_0x4e4731(0x987)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x44c)]=Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x5b8)],Bitmap['prototype']['drawCircle']=function(_0x3ca4e7,_0xba72a4,_0x508c5c,_0x3510a6){const _0x27ba4b=_0x55ae0c;_0x3ca4e7=Math[_0x27ba4b(0x41d)](_0x3ca4e7),_0xba72a4=Math[_0x27ba4b(0x41d)](_0xba72a4),_0x508c5c=Math[_0x27ba4b(0x41d)](_0x508c5c),VisuMZ[_0x27ba4b(0x3ae)][_0x27ba4b(0x44c)][_0x27ba4b(0x67e)](this,_0x3ca4e7,_0xba72a4,_0x508c5c,_0x3510a6),this[_0x27ba4b(0x987)]();},VisuMZ['CoreEngine'][_0x55ae0c(0x39d)]=Bitmap['prototype'][_0x55ae0c(0x7c4)],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x7c4)]=function(_0x5b1499){const _0x471420=_0x55ae0c;return Math[_0x471420(0x478)](VisuMZ['CoreEngine'][_0x471420(0x39d)][_0x471420(0x67e)](this,_0x5b1499));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2df)]=Bitmap[_0x55ae0c(0x792)]['drawText'],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x7d9)]=function(_0x5e2077,_0x1f720f,_0x201c1f,_0x3872b2,_0x3f3705,_0x1606c4){const _0x3009a2=_0x55ae0c;_0x1f720f=Math[_0x3009a2(0x41d)](_0x1f720f),_0x201c1f=Math['round'](_0x201c1f),_0x3872b2=Math['ceil'](_0x3872b2),_0x3f3705=Math[_0x3009a2(0x478)](_0x3f3705),VisuMZ['CoreEngine'][_0x3009a2(0x2df)][_0x3009a2(0x67e)](this,_0x5e2077,_0x1f720f,_0x201c1f,_0x3872b2,_0x3f3705,_0x1606c4),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x55ae0c(0x587)]=Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x585)],Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x585)]=function(_0x1c22df,_0x4770f2,_0x3e5c7e,_0x4c6f35){const _0x2eecd0=_0x55ae0c;VisuMZ[_0x2eecd0(0x3ae)][_0x2eecd0(0x6c3)][_0x2eecd0(0x5fa)][_0x2eecd0(0x654)]?this[_0x2eecd0(0x898)](_0x1c22df,_0x4770f2,_0x3e5c7e,_0x4c6f35):VisuMZ[_0x2eecd0(0x3ae)]['Bitmap_drawTextOutline'][_0x2eecd0(0x67e)](this,_0x1c22df,_0x4770f2,_0x3e5c7e,_0x4c6f35);},Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x898)]=function(_0x18ad74,_0x2d3312,_0x5737c7,_0x3dd5be){const _0x3241c9=_0x55ae0c,_0x968696=this['context'];_0x968696[_0x3241c9(0x6e9)]=this['outlineColor'],_0x968696[_0x3241c9(0x459)](_0x18ad74,_0x2d3312+0x2,_0x5737c7+0x2,_0x3dd5be);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7a5)]=Input[_0x55ae0c(0x3dd)],Input[_0x55ae0c(0x3dd)]=function(){const _0x530941=_0x55ae0c;VisuMZ[_0x530941(0x3ae)][_0x530941(0x7a5)][_0x530941(0x67e)](this),this['_inputString']=undefined,this[_0x530941(0x6c9)]=undefined,this[_0x530941(0x683)]=Input[_0x530941(0x5b6)];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x89c)]=Input['update'],Input[_0x55ae0c(0x4e1)]=function(){const _0x236294=_0x55ae0c;VisuMZ['CoreEngine'][_0x236294(0x89c)][_0x236294(0x67e)](this);if(this[_0x236294(0x683)])this[_0x236294(0x683)]--;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x37f)]=Input['_pollGamepads'],Input[_0x55ae0c(0x375)]=function(){const _0x561042=_0x55ae0c;if(this['_gamepadWait'])return;VisuMZ[_0x561042(0x3ae)]['Input_pollGamepads'][_0x561042(0x67e)](this);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x441)]=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x30d0d5=_0x55ae0c;VisuMZ['CoreEngine'][_0x30d0d5(0x441)]['call'](this),document[_0x30d0d5(0x230)](_0x30d0d5(0x24c),this[_0x30d0d5(0x9a0)][_0x30d0d5(0x505)](this));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x316)]=Input[_0x55ae0c(0x8e3)],Input['_onKeyDown']=function(_0x27dda8){const _0x100076=_0x55ae0c;this['_inputSpecialKeyCode']=_0x27dda8['keyCode'],VisuMZ['CoreEngine'][_0x100076(0x316)][_0x100076(0x67e)](this,_0x27dda8),this[_0x100076(0x373)](null);},Input[_0x55ae0c(0x9a0)]=function(_0x10d730){this['_registerKeyInput'](_0x10d730);},Input[_0x55ae0c(0x562)]=function(_0x4a2f3f){const _0x2edbb8=_0x55ae0c;this['_inputSpecialKeyCode']=_0x4a2f3f[_0x2edbb8(0x7a2)];let _0x4113a4=String['fromCharCode'](_0x4a2f3f['charCode']);this[_0x2edbb8(0x264)]===undefined?this['_inputString']=_0x4113a4:this[_0x2edbb8(0x264)]+=_0x4113a4;},VisuMZ[_0x55ae0c(0x3ae)]['Input_shouldPreventDefault']=Input['_shouldPreventDefault'],Input[_0x55ae0c(0x571)]=function(_0x3cd5f6){const _0x2e6fb0=_0x55ae0c;if(_0x3cd5f6===0x8)return![];return VisuMZ[_0x2e6fb0(0x3ae)][_0x2e6fb0(0x3b6)][_0x2e6fb0(0x67e)](this,_0x3cd5f6);},Input[_0x55ae0c(0x841)]=function(_0x1698d3){const _0x549184=_0x55ae0c;if(_0x1698d3[_0x549184(0x65b)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x1698d3[_0x549184(0x65b)](/enter/i))return this[_0x549184(0x6c9)]===0xd;if(_0x1698d3[_0x549184(0x65b)](/escape/i))return this[_0x549184(0x6c9)]===0x1b;},Input['isNumpadPressed']=function(){const _0x278737=_0x55ae0c;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x278737(0x369)](this[_0x278737(0x6c9)]);},Input['isArrowPressed']=function(){const _0x3bd243=_0x55ae0c;return[0x25,0x26,0x27,0x28][_0x3bd243(0x369)](this[_0x3bd243(0x6c9)]);},Input[_0x55ae0c(0x3bb)]=function(){const _0x574d45=_0x55ae0c;if(navigator[_0x574d45(0x35c)]){const _0x1808ab=navigator[_0x574d45(0x35c)]();if(_0x1808ab)for(const _0x13de84 of _0x1808ab){if(_0x13de84&&_0x13de84['connected'])return!![];}}return![];},Input[_0x55ae0c(0x378)]=function(){const _0x8406a3=_0x55ae0c;if(navigator[_0x8406a3(0x35c)]){const _0x155cc0=navigator[_0x8406a3(0x35c)]();if(_0x155cc0)for(const _0x3fb907 of _0x155cc0){if(_0x3fb907&&_0x3fb907[_0x8406a3(0x4ba)]){if(this[_0x8406a3(0x961)](_0x3fb907))return!![];if(this['isGamepadAxisMoved'](_0x3fb907))return!![];}}}return![];},Input[_0x55ae0c(0x961)]=function(_0x55bdfd){const _0x232371=_0x55ae0c,_0x154f6f=_0x55bdfd[_0x232371(0x341)];for(let _0x34b964=0x0;_0x34b964<_0x154f6f[_0x232371(0x616)];_0x34b964++){if(_0x154f6f[_0x34b964][_0x232371(0x8d9)])return!![];}return![];},Input[_0x55ae0c(0x63f)]=function(_0x159d69){const _0xbd6b7a=_0x55ae0c,_0xbb39bb=_0x159d69[_0xbd6b7a(0x4ce)],_0x3af114=0.5;if(_0xbb39bb[0x0]<-_0x3af114)return!![];if(_0xbb39bb[0x0]>_0x3af114)return!![];if(_0xbb39bb[0x1]<-_0x3af114)return!![];if(_0xbb39bb[0x1]>_0x3af114)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x4a1438=_0x55ae0c;return this[_0x4a1438(0x276)]||null;},Input['setLastGamepadUsed']=function(_0x5ef5f9){const _0x2d317f=_0x55ae0c;this[_0x2d317f(0x276)]=_0x5ef5f9;},VisuMZ['CoreEngine'][_0x55ae0c(0x937)]=Input[_0x55ae0c(0x708)],Input[_0x55ae0c(0x708)]=function(_0x4dda6c){const _0x2b0a85=_0x55ae0c;VisuMZ[_0x2b0a85(0x3ae)]['Input_updateGamepadState'][_0x2b0a85(0x67e)](this,_0x4dda6c),(this[_0x2b0a85(0x961)](_0x4dda6c)||this['isGamepadAxisMoved'](_0x4dda6c))&&this[_0x2b0a85(0x373)](_0x4dda6c);},Input[_0x55ae0c(0x3a6)]=function(){const _0x5b0d4b=_0x55ae0c;return this[_0x5b0d4b(0x276)]?this['_lastGamepad']['id']:_0x5b0d4b(0x3a5);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x3ff)]=Tilemap[_0x55ae0c(0x792)][_0x55ae0c(0x78e)],Tilemap[_0x55ae0c(0x792)][_0x55ae0c(0x78e)]=function(_0x2bc889,_0x194db5,_0x3dd292,_0x5b7603){const _0x375699=_0x55ae0c;if($gameMap&&$gameMap[_0x375699(0x7f8)]())return;VisuMZ[_0x375699(0x3ae)][_0x375699(0x3ff)]['call'](this,_0x2bc889,_0x194db5,_0x3dd292,_0x5b7603);},Tilemap[_0x55ae0c(0x962)][_0x55ae0c(0x792)][_0x55ae0c(0x372)]=function(){const _0x784c85=_0x55ae0c;this[_0x784c85(0x3e1)]();for(let _0x26854f=0x0;_0x26854f<Tilemap[_0x784c85(0x1d0)][_0x784c85(0x1ba)];_0x26854f++){const _0x599e0c=new PIXI[(_0x784c85(0x800))]();_0x599e0c['setSize'](0x800,0x800),VisuMZ[_0x784c85(0x3ae)][_0x784c85(0x6c3)][_0x784c85(0x5fa)][_0x784c85(0x7fc)]&&(_0x599e0c[_0x784c85(0x320)]=PIXI[_0x784c85(0x5ee)]['NEAREST']),this[_0x784c85(0x488)][_0x784c85(0x87e)](_0x599e0c);}},WindowLayer[_0x55ae0c(0x792)]['isMaskingEnabled']=function(){const _0x2fb49f=_0x55ae0c;return SceneManager&&SceneManager[_0x2fb49f(0x1a1)]?SceneManager[_0x2fb49f(0x1a1)][_0x2fb49f(0x31a)]():!![];},VisuMZ['CoreEngine'][_0x55ae0c(0x7ee)]=WindowLayer[_0x55ae0c(0x792)][_0x55ae0c(0x4fd)],WindowLayer[_0x55ae0c(0x792)]['render']=function render(_0x18474e){const _0x5aa062=_0x55ae0c;this[_0x5aa062(0x30e)]()?VisuMZ[_0x5aa062(0x3ae)][_0x5aa062(0x7ee)][_0x5aa062(0x67e)](this,_0x18474e):this[_0x5aa062(0x35e)](_0x18474e);},WindowLayer[_0x55ae0c(0x792)][_0x55ae0c(0x35e)]=function render(_0x572c29){const _0x447457=_0x55ae0c;if(!this[_0x447457(0x21e)])return;const _0x137b44=new PIXI[(_0x447457(0x884))](),_0x394244=_0x572c29['gl'],_0x17b47e=this[_0x447457(0x968)][_0x447457(0x43b)]();_0x572c29['framebuffer']['forceStencil'](),_0x137b44[_0x447457(0x4ff)]=this[_0x447457(0x4ff)],_0x572c29['batch'][_0x447457(0x756)](),_0x394244[_0x447457(0x218)](_0x394244[_0x447457(0x686)]);while(_0x17b47e['length']>0x0){const _0x3f8f5e=_0x17b47e['shift']();_0x3f8f5e[_0x447457(0x3b7)]&&_0x3f8f5e['visible']&&_0x3f8f5e[_0x447457(0x3e9)]>0x0&&(_0x394244[_0x447457(0x2f1)](_0x394244[_0x447457(0x22d)],0x0,~0x0),_0x394244[_0x447457(0x66a)](_0x394244[_0x447457(0x59e)],_0x394244[_0x447457(0x59e)],_0x394244[_0x447457(0x59e)]),_0x3f8f5e[_0x447457(0x4fd)](_0x572c29),_0x572c29[_0x447457(0x604)][_0x447457(0x756)](),_0x137b44[_0x447457(0x3dd)](),_0x394244[_0x447457(0x2f1)](_0x394244[_0x447457(0x859)],0x1,~0x0),_0x394244[_0x447457(0x66a)](_0x394244[_0x447457(0x4f0)],_0x394244[_0x447457(0x4f0)],_0x394244[_0x447457(0x4f0)]),_0x394244['blendFunc'](_0x394244['ZERO'],_0x394244[_0x447457(0x304)]),_0x137b44['render'](_0x572c29),_0x572c29[_0x447457(0x604)][_0x447457(0x756)](),_0x394244[_0x447457(0x5a3)](_0x394244[_0x447457(0x304)],_0x394244[_0x447457(0x99c)]));}_0x394244[_0x447457(0x777)](_0x394244['STENCIL_TEST']),_0x394244[_0x447457(0x3dd)](_0x394244['STENCIL_BUFFER_BIT']),_0x394244[_0x447457(0x564)](0x0),_0x572c29[_0x447457(0x604)]['flush']();for(const _0x268f4c of this[_0x447457(0x968)]){!_0x268f4c['_isWindow']&&_0x268f4c[_0x447457(0x21e)]&&_0x268f4c['render'](_0x572c29);}_0x572c29[_0x447457(0x604)][_0x447457(0x756)]();},DataManager[_0x55ae0c(0x91b)]=function(_0x3550dc){const _0x4e537d=_0x55ae0c;return this[_0x4e537d(0x92d)](_0x3550dc)&&_0x3550dc['itypeId']===0x2;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6de)]=DataManager[_0x55ae0c(0x88e)],DataManager[_0x55ae0c(0x88e)]=function(){const _0xf15d5d=_0x55ae0c;VisuMZ[_0xf15d5d(0x3ae)]['DataManager_setupNewGame'][_0xf15d5d(0x67e)](this),this[_0xf15d5d(0x23b)](),this[_0xf15d5d(0x205)]();},DataManager[_0x55ae0c(0x23b)]=function(){const _0x584399=_0x55ae0c;if($gameTemp[_0x584399(0x6fd)]()){const _0xf3bf3a=VisuMZ[_0x584399(0x3ae)][_0x584399(0x6c3)]['QoL'][_0x584399(0x7a4)];if(_0xf3bf3a>0x0)$gameTemp[_0x584399(0x814)](_0xf3bf3a);}},DataManager[_0x55ae0c(0x205)]=function(){const _0x10cd0b=_0x55ae0c,_0x4288d7=VisuMZ[_0x10cd0b(0x3ae)]['Settings'][_0x10cd0b(0x5fa)][_0x10cd0b(0x86b)]||0x0;if(_0x4288d7>0x0)$gameTemp['reserveCommonEvent'](_0x4288d7);},DataManager[_0x55ae0c(0x966)]=function(_0x1319f0){const _0x27e74a=_0x55ae0c,_0x1c6293=$dataTroops[_0x1319f0];if(!_0x1c6293)return'';let _0x494ea1='';_0x494ea1+=_0x1c6293['name'];for(const _0x414ea3 of _0x1c6293[_0x27e74a(0x6a1)]){for(const _0x47c504 of _0x414ea3['list']){[0x6c,0x198]['includes'](_0x47c504['code'])&&(_0x494ea1+='\x0a',_0x494ea1+=_0x47c504['parameters'][0x0]);}}return _0x494ea1;};(VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['QoL'][_0x55ae0c(0x6c6)]??!![])&&($scene=null,VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x511)]=Scene_Base['prototype'][_0x55ae0c(0x6b4)],Scene_Base['prototype'][_0x55ae0c(0x6b4)]=function(){const _0x58381b=_0x55ae0c;VisuMZ[_0x58381b(0x3ae)][_0x58381b(0x511)][_0x58381b(0x67e)](this),$scene=this;},$spriteset=null,VisuMZ[_0x55ae0c(0x3ae)]['Scene_Map_createSpriteset']=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x637)],Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x637)]=function(){const _0xf9b3f8=_0x55ae0c;VisuMZ['CoreEngine']['Scene_Map_createSpriteset']['call'](this),$spriteset=this[_0xf9b3f8(0x5d7)];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4b1)]=Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x637)],Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x637)]=function(){const _0xcb004e=_0x55ae0c;VisuMZ[_0xcb004e(0x3ae)]['Scene_Battle_createSpriteset'][_0xcb004e(0x67e)](this),$spriteset=this[_0xcb004e(0x5d7)];},VisuMZ['CoreEngine'][_0x55ae0c(0x491)]=Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x20b)],Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x20b)]=function(){const _0x5297b6=_0x55ae0c;VisuMZ[_0x5297b6(0x3ae)]['Scene_Base_terminate'][_0x5297b6(0x67e)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x460)]=BattleManager[_0x55ae0c(0x4e1)],BattleManager[_0x55ae0c(0x4e1)]=function(_0x396279){const _0x4aa9ff=_0x55ae0c;VisuMZ[_0x4aa9ff(0x3ae)][_0x4aa9ff(0x460)][_0x4aa9ff(0x67e)](this,_0x396279),this['updateBattleVariables']();},BattleManager[_0x55ae0c(0x533)]=function(){const _0x4f19cf=_0x55ae0c;$subject=this[_0x4f19cf(0x2b3)],$targets=this['_targets'],$target=this[_0x4f19cf(0x612)]||this[_0x4f19cf(0x379)][0x0];},$event=null,VisuMZ['CoreEngine']['Game_Event_start']=Game_Event[_0x55ae0c(0x792)][_0x55ae0c(0x60b)],Game_Event['prototype'][_0x55ae0c(0x60b)]=function(){const _0x5f031a=_0x55ae0c;VisuMZ['CoreEngine']['Game_Event_start'][_0x5f031a(0x67e)](this),$event=this;},VisuMZ['CoreEngine'][_0x55ae0c(0x5c5)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)],Scene_Map['prototype']['update']=function(){const _0x5cf057=_0x55ae0c;VisuMZ[_0x5cf057(0x3ae)][_0x5cf057(0x5c5)][_0x5cf057(0x67e)](this),$gameMap[_0x5cf057(0x2e0)]();},Game_Map['prototype'][_0x55ae0c(0x2e0)]=function(){const _0x80d085=_0x55ae0c;!this[_0x80d085(0x757)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x4cc90b){const _0x2a3f2a=_0x55ae0c;if($gameTemp)$gameTemp[_0x2a3f2a(0x814)](_0x4cc90b);});;function _0x1c19(_0x1b10c3,_0x36653d){const _0x2cd2b1=_0x2cd2();return _0x1c19=function(_0x1c198b,_0x1b7087){_0x1c198b=_0x1c198b-0x196;let _0x196788=_0x2cd2b1[_0x1c198b];return _0x196788;},_0x1c19(_0x1b10c3,_0x36653d);}$onceParallel=function(_0x1417ed,_0x4da207){const _0x1d5ff9=_0x55ae0c;if(SceneManager[_0x1d5ff9(0x2fd)]())SceneManager[_0x1d5ff9(0x1a1)]['playOnceParallelInterpreter'](_0x1417ed,_0x4da207);else{if(SceneManager['isSceneBattle']()){if(Imported['VisuMZ_1_BattleCore'])SceneManager[_0x1d5ff9(0x1a1)]['playOnceParallelInterpreter'](_0x1417ed);else $gameTemp&&$gameTemp[_0x1d5ff9(0x6fd)]()&&alert(_0x1d5ff9(0x2c3));}else $gameTemp&&$gameTemp[_0x1d5ff9(0x6fd)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}},StorageManager[_0x55ae0c(0x4c1)]=function(_0x3c115f){return new Promise((_0x209d47,_0x199df5)=>{const _0x1f11d3=_0x1c19;try{const _0x3ee0aa=pako[_0x1f11d3(0x95a)](_0x3c115f,{'to':'string','level':0x1});if(_0x3ee0aa[_0x1f11d3(0x616)]>=0xc350){}_0x209d47(_0x3ee0aa);}catch(_0x4f2133){_0x199df5(_0x4f2133);}});},TextManager['stringKeyMap']=['','','',_0x55ae0c(0x4e0),'','','HELP','','BACKSPACE',_0x55ae0c(0x541),'','',_0x55ae0c(0x337),_0x55ae0c(0x43a),_0x55ae0c(0x25f),'',_0x55ae0c(0x746),_0x55ae0c(0x1cc),_0x55ae0c(0x874),'PAUSE','CAPSLOCK',_0x55ae0c(0x450),_0x55ae0c(0x2f6),_0x55ae0c(0x995),_0x55ae0c(0x834),'HANJA','',_0x55ae0c(0x7fa),_0x55ae0c(0x34f),_0x55ae0c(0x938),_0x55ae0c(0x90e),_0x55ae0c(0x1c9),'SPACE',_0x55ae0c(0x4f2),_0x55ae0c(0x820),_0x55ae0c(0x694),_0x55ae0c(0x952),'LEFT','UP',_0x55ae0c(0x602),_0x55ae0c(0x3ba),_0x55ae0c(0x71f),'PRINT',_0x55ae0c(0x7c3),'PRINTSCREEN',_0x55ae0c(0x543),_0x55ae0c(0x6a7),'','0','1','2','3','4','5','6','7','8','9',_0x55ae0c(0x7ff),_0x55ae0c(0x635),'LESS_THAN',_0x55ae0c(0x9a4),_0x55ae0c(0x5f0),_0x55ae0c(0x58a),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x55ae0c(0x366),'',_0x55ae0c(0x74a),_0x55ae0c(0x64f),_0x55ae0c(0x82c),'NUMPAD2',_0x55ae0c(0x8a9),_0x55ae0c(0x89f),'NUMPAD5',_0x55ae0c(0x71b),_0x55ae0c(0x61c),'NUMPAD8',_0x55ae0c(0x440),_0x55ae0c(0x403),_0x55ae0c(0x8b6),_0x55ae0c(0x7ed),_0x55ae0c(0x2b2),_0x55ae0c(0x361),_0x55ae0c(0x6b6),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x55ae0c(0x7bd),'F11',_0x55ae0c(0x687),_0x55ae0c(0x714),_0x55ae0c(0x211),_0x55ae0c(0x50d),'F16',_0x55ae0c(0x4ae),_0x55ae0c(0x3b4),_0x55ae0c(0x94f),_0x55ae0c(0x4f1),_0x55ae0c(0x576),_0x55ae0c(0x702),_0x55ae0c(0x6c5),_0x55ae0c(0x393),'','','','','','','','',_0x55ae0c(0x338),_0x55ae0c(0x641),_0x55ae0c(0x2da),_0x55ae0c(0x40c),_0x55ae0c(0x6f7),_0x55ae0c(0x500),_0x55ae0c(0x4df),'','','','','','','','','','CIRCUMFLEX',_0x55ae0c(0x207),'DOUBLE_QUOTE',_0x55ae0c(0x53a),'DOLLAR',_0x55ae0c(0x7c9),'AMPERSAND','UNDERSCORE',_0x55ae0c(0x7f0),_0x55ae0c(0x3ce),'ASTERISK',_0x55ae0c(0x59c),_0x55ae0c(0x496),'HYPHEN_MINUS',_0x55ae0c(0x7cb),_0x55ae0c(0x435),'TILDE','','','','',_0x55ae0c(0x65a),'VOLUME_DOWN',_0x55ae0c(0x81b),'','',_0x55ae0c(0x635),_0x55ae0c(0x9a4),_0x55ae0c(0x48d),'MINUS','PERIOD','SLASH',_0x55ae0c(0x8b5),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x55ae0c(0x9a5),_0x55ae0c(0x1bf),_0x55ae0c(0x4d9),_0x55ae0c(0x36b),'','META','ALTGR','','WIN_ICO_HELP',_0x55ae0c(0x42c),'',_0x55ae0c(0x888),'','',_0x55ae0c(0x453),_0x55ae0c(0x944),_0x55ae0c(0x97f),_0x55ae0c(0x54b),_0x55ae0c(0x86d),_0x55ae0c(0x852),_0x55ae0c(0x981),'WIN_OEM_ATTN',_0x55ae0c(0x7a6),_0x55ae0c(0x480),_0x55ae0c(0x42e),_0x55ae0c(0x752),_0x55ae0c(0x655),'ATTN','CRSEL',_0x55ae0c(0x2ea),_0x55ae0c(0x5ae),_0x55ae0c(0x642),'ZOOM','',_0x55ae0c(0x222),_0x55ae0c(0x991),''],TextManager[_0x55ae0c(0x28b)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['ButtonAssist'][_0x55ae0c(0x32d)],TextManager[_0x55ae0c(0x8ad)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x6a8)][_0x55ae0c(0x54f)],TextManager[_0x55ae0c(0x862)]=VisuMZ['CoreEngine'][_0x55ae0c(0x6c3)]['ButtonAssist']['SwitchActorText'],VisuMZ[_0x55ae0c(0x3ae)]['TextManager_param']=TextManager[_0x55ae0c(0x26b)],TextManager['param']=function(_0x4097ca){const _0x7b42db=_0x55ae0c;return typeof _0x4097ca===_0x7b42db(0x24d)?VisuMZ[_0x7b42db(0x3ae)]['TextManager_param']['call'](this,_0x4097ca):this[_0x7b42db(0x6fa)](_0x4097ca);},TextManager[_0x55ae0c(0x6fa)]=function(_0x58e395){const _0x57c923=_0x55ae0c;_0x58e395=String(_0x58e395||'')['toUpperCase']();const _0x1509f0=VisuMZ['CoreEngine'][_0x57c923(0x6c3)][_0x57c923(0x94d)];if(_0x58e395===_0x57c923(0x866))return $dataSystem[_0x57c923(0x5c2)]['params'][0x0];if(_0x58e395==='MAXMP')return $dataSystem['terms']['params'][0x1];if(_0x58e395===_0x57c923(0x335))return $dataSystem[_0x57c923(0x5c2)][_0x57c923(0x6f5)][0x2];if(_0x58e395===_0x57c923(0x998))return $dataSystem['terms'][_0x57c923(0x6f5)][0x3];if(_0x58e395==='MAT')return $dataSystem[_0x57c923(0x5c2)]['params'][0x4];if(_0x58e395===_0x57c923(0x775))return $dataSystem[_0x57c923(0x5c2)][_0x57c923(0x6f5)][0x5];if(_0x58e395===_0x57c923(0x6b7))return $dataSystem[_0x57c923(0x5c2)][_0x57c923(0x6f5)][0x6];if(_0x58e395===_0x57c923(0x4a1))return $dataSystem[_0x57c923(0x5c2)][_0x57c923(0x6f5)][0x7];if(_0x58e395===_0x57c923(0x7eb))return _0x1509f0[_0x57c923(0x601)];if(_0x58e395===_0x57c923(0x409))return _0x1509f0[_0x57c923(0x49e)];if(_0x58e395===_0x57c923(0x483))return _0x1509f0[_0x57c923(0x444)];if(_0x58e395===_0x57c923(0x1b3))return _0x1509f0['XParamVocab3'];if(_0x58e395===_0x57c923(0x832))return _0x1509f0[_0x57c923(0x63e)];if(_0x58e395===_0x57c923(0x302))return _0x1509f0[_0x57c923(0x2f7)];if(_0x58e395===_0x57c923(0x673))return _0x1509f0['XParamVocab6'];if(_0x58e395==='HRG')return _0x1509f0[_0x57c923(0x7e2)];if(_0x58e395===_0x57c923(0x37c))return _0x1509f0['XParamVocab8'];if(_0x58e395===_0x57c923(0x62f))return _0x1509f0['XParamVocab9'];if(_0x58e395==='TGR')return _0x1509f0['SParamVocab0'];if(_0x58e395===_0x57c923(0x388))return _0x1509f0[_0x57c923(0x2ff)];if(_0x58e395===_0x57c923(0x473))return _0x1509f0[_0x57c923(0x821)];if(_0x58e395===_0x57c923(0x807))return _0x1509f0[_0x57c923(0x4cf)];if(_0x58e395==='MCR')return _0x1509f0[_0x57c923(0x346)];if(_0x58e395===_0x57c923(0x1d2))return _0x1509f0[_0x57c923(0x860)];if(_0x58e395===_0x57c923(0x6ac))return _0x1509f0[_0x57c923(0x74d)];if(_0x58e395===_0x57c923(0x3df))return _0x1509f0[_0x57c923(0x213)];if(_0x58e395==='FDR')return _0x1509f0[_0x57c923(0x613)];if(_0x58e395===_0x57c923(0x877))return _0x1509f0[_0x57c923(0x4b9)];if(VisuMZ[_0x57c923(0x3ae)][_0x57c923(0x3c2)][_0x58e395])return VisuMZ[_0x57c923(0x3ae)][_0x57c923(0x3c2)][_0x58e395];return'';},TextManager[_0x55ae0c(0x2b0)]=function(_0x4cba05){const _0x2c608b=_0x55ae0c,_0x3a7370=Input[_0x2c608b(0x3a6)]();return _0x3a7370===_0x2c608b(0x3a5)?this[_0x2c608b(0x5e5)](_0x4cba05):this[_0x2c608b(0x7e7)](_0x3a7370,_0x4cba05);},TextManager['getKeyboardInputButtonString']=function(_0x39d446){const _0x406a9c=_0x55ae0c;let _0x1058d8=VisuMZ[_0x406a9c(0x3ae)][_0x406a9c(0x6c3)]['ButtonAssist']['SplitEscape'];if(!_0x1058d8){if(_0x39d446==='cancel')_0x39d446=_0x406a9c(0x311);if(_0x39d446==='menu')_0x39d446=_0x406a9c(0x311);}let _0x5a1ad9=[];for(let _0x1ec380 in Input[_0x406a9c(0x25b)]){_0x1ec380=Number(_0x1ec380);if(_0x1ec380>=0x60&&_0x1ec380<=0x69)continue;if([0x12,0x20][_0x406a9c(0x80e)](_0x1ec380))continue;_0x39d446===Input[_0x406a9c(0x25b)][_0x1ec380]&&_0x5a1ad9['push'](_0x1ec380);}for(let _0x29dd97=0x0;_0x29dd97<_0x5a1ad9[_0x406a9c(0x616)];_0x29dd97++){_0x5a1ad9[_0x29dd97]=TextManager[_0x406a9c(0x2ab)][_0x5a1ad9[_0x29dd97]];}return this[_0x406a9c(0x3b0)](_0x5a1ad9);},TextManager[_0x55ae0c(0x3b0)]=function(_0x1eff8c){const _0x213e0d=_0x55ae0c,_0x49b24a=VisuMZ[_0x213e0d(0x3ae)]['Settings'][_0x213e0d(0x6a8)],_0x44da08=_0x49b24a[_0x213e0d(0x595)];let _0x2db411='';if(_0x1eff8c['includes']('UP'))_0x2db411='UP';else{if(_0x1eff8c[_0x213e0d(0x80e)](_0x213e0d(0x3ba)))_0x2db411='DOWN';else{if(_0x1eff8c[_0x213e0d(0x80e)](_0x213e0d(0x474)))_0x2db411='LEFT';else _0x1eff8c['includes']('RIGHT')?_0x2db411=_0x213e0d(0x602):_0x2db411=_0x1eff8c[_0x213e0d(0x275)]();}}const _0xccd294=_0x213e0d(0x3f3)[_0x213e0d(0x703)](_0x2db411);return _0x49b24a[_0xccd294]?_0x49b24a[_0xccd294]:_0x44da08['format'](_0x2db411);},TextManager['getInputMultiButtonStrings']=function(_0xb3964e,_0x2ee14d){const _0x1378c6=_0x55ae0c,_0x11b105=VisuMZ[_0x1378c6(0x3ae)][_0x1378c6(0x6c3)][_0x1378c6(0x6a8)],_0x11295a=_0x11b105[_0x1378c6(0x6b0)],_0x505a99=this['getInputButtonString'](_0xb3964e),_0x1dacbd=this['getInputButtonString'](_0x2ee14d);return _0x11295a[_0x1378c6(0x703)](_0x505a99,_0x1dacbd);},TextManager[_0x55ae0c(0x7e7)]=function(_0x1a9e1f,_0x922fbf){const _0x5aeb0c=_0x55ae0c,_0x10add5=_0x1a9e1f[_0x5aeb0c(0x681)]()[_0x5aeb0c(0x371)](),_0xf4c1bc=VisuMZ[_0x5aeb0c(0x3ae)][_0x5aeb0c(0x77e)][_0x10add5];if(!_0xf4c1bc)return this[_0x5aeb0c(0x2a4)](_0x1a9e1f,_0x922fbf);return _0xf4c1bc[_0x922fbf]||this[_0x5aeb0c(0x5e5)](_0x1a9e1f,_0x922fbf);},TextManager['getControllerInputButtonMatch']=function(_0x5d380f,_0x1e8ba0){const _0x4f675e=_0x55ae0c,_0x50f719=_0x5d380f[_0x4f675e(0x681)]()[_0x4f675e(0x371)]();for(const _0x567e91 in VisuMZ[_0x4f675e(0x3ae)][_0x4f675e(0x659)]){if(_0x50f719['includes'](_0x567e91)){const _0x4bd460=VisuMZ[_0x4f675e(0x3ae)]['ControllerMatches'][_0x567e91],_0x1f4a2d=VisuMZ['CoreEngine']['ControllerButtons'][_0x4bd460];return _0x1f4a2d[_0x1e8ba0]||this[_0x4f675e(0x5e5)](_0x1e8ba0);}}return this['getKeyboardInputButtonString'](_0x1e8ba0);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x955)]=ColorManager[_0x55ae0c(0x8cf)],ColorManager[_0x55ae0c(0x8cf)]=function(){const _0x448097=_0x55ae0c;VisuMZ['CoreEngine'][_0x448097(0x955)][_0x448097(0x67e)](this),this[_0x448097(0x47a)]=this['_colorCache']||{};},ColorManager[_0x55ae0c(0x66b)]=function(_0x584096,_0x428d8a){const _0x23c95e=_0x55ae0c;return _0x428d8a=String(_0x428d8a),this[_0x23c95e(0x47a)]=this[_0x23c95e(0x47a)]||{},_0x428d8a[_0x23c95e(0x65b)](/#(.*)/i)?this['_colorCache'][_0x584096]=_0x23c95e(0x1b6)[_0x23c95e(0x703)](String(RegExp['$1'])):this['_colorCache'][_0x584096]=this[_0x23c95e(0x2bc)](Number(_0x428d8a)),this['_colorCache'][_0x584096];},ColorManager[_0x55ae0c(0x21b)]=function(_0x1dc7be){const _0x5bdad5=_0x55ae0c;return _0x1dc7be=String(_0x1dc7be),_0x1dc7be['match'](/#(.*)/i)?_0x5bdad5(0x1b6)[_0x5bdad5(0x703)](String(RegExp['$1'])):this['textColor'](Number(_0x1dc7be));},ColorManager[_0x55ae0c(0x73c)]=function(){this['_colorCache']={};},ColorManager[_0x55ae0c(0x4a8)]=function(){const _0xf0c3ac=_0x55ae0c,_0x41a594=_0xf0c3ac(0x1aa);this[_0xf0c3ac(0x47a)]=this[_0xf0c3ac(0x47a)]||{};if(this['_colorCache'][_0x41a594])return this['_colorCache'][_0x41a594];const _0x28f85f=VisuMZ[_0xf0c3ac(0x3ae)][_0xf0c3ac(0x6c3)][_0xf0c3ac(0x6ef)][_0xf0c3ac(0x82b)];return this['getColorDataFromPluginParameters'](_0x41a594,_0x28f85f);},ColorManager['systemColor']=function(){const _0x29857f=_0x55ae0c,_0x573da9=_0x29857f(0x4ef);this['_colorCache']=this[_0x29857f(0x47a)]||{};if(this[_0x29857f(0x47a)][_0x573da9])return this[_0x29857f(0x47a)][_0x573da9];const _0x3bd590=VisuMZ[_0x29857f(0x3ae)][_0x29857f(0x6c3)]['Color']['ColorSystem'];return this[_0x29857f(0x66b)](_0x573da9,_0x3bd590);},ColorManager[_0x55ae0c(0x5bf)]=function(){const _0x30721f=_0x55ae0c,_0x2db1d9='_stored_crisisColor';this[_0x30721f(0x47a)]=this[_0x30721f(0x47a)]||{};if(this['_colorCache'][_0x2db1d9])return this[_0x30721f(0x47a)][_0x2db1d9];const _0x4eaa57=VisuMZ[_0x30721f(0x3ae)][_0x30721f(0x6c3)]['Color'][_0x30721f(0x40d)];return this['getColorDataFromPluginParameters'](_0x2db1d9,_0x4eaa57);},ColorManager[_0x55ae0c(0x2b1)]=function(){const _0x298fef=_0x55ae0c,_0x48f4d2='_stored_deathColor';this['_colorCache']=this[_0x298fef(0x47a)]||{};if(this[_0x298fef(0x47a)][_0x48f4d2])return this['_colorCache'][_0x48f4d2];const _0x366989=VisuMZ[_0x298fef(0x3ae)]['Settings'][_0x298fef(0x6ef)][_0x298fef(0x1fa)];return this[_0x298fef(0x66b)](_0x48f4d2,_0x366989);},ColorManager[_0x55ae0c(0x922)]=function(){const _0x2bc2e3=_0x55ae0c,_0x1d6f30=_0x2bc2e3(0x590);this['_colorCache']=this[_0x2bc2e3(0x47a)]||{};if(this[_0x2bc2e3(0x47a)][_0x1d6f30])return this[_0x2bc2e3(0x47a)][_0x1d6f30];const _0x4dca59=VisuMZ[_0x2bc2e3(0x3ae)][_0x2bc2e3(0x6c3)][_0x2bc2e3(0x6ef)][_0x2bc2e3(0x98b)];return this[_0x2bc2e3(0x66b)](_0x1d6f30,_0x4dca59);},ColorManager[_0x55ae0c(0x608)]=function(){const _0xfe1801=_0x55ae0c,_0x1ad262=_0xfe1801(0x485);this[_0xfe1801(0x47a)]=this[_0xfe1801(0x47a)]||{};if(this[_0xfe1801(0x47a)][_0x1ad262])return this[_0xfe1801(0x47a)][_0x1ad262];const _0x1509ca=VisuMZ[_0xfe1801(0x3ae)][_0xfe1801(0x6c3)][_0xfe1801(0x6ef)][_0xfe1801(0x89d)];return this[_0xfe1801(0x66b)](_0x1ad262,_0x1509ca);},ColorManager[_0x55ae0c(0x32b)]=function(){const _0x900e03=_0x55ae0c,_0x2d0bb1=_0x900e03(0x94a);this[_0x900e03(0x47a)]=this[_0x900e03(0x47a)]||{};if(this[_0x900e03(0x47a)][_0x2d0bb1])return this[_0x900e03(0x47a)][_0x2d0bb1];const _0x90239d=VisuMZ[_0x900e03(0x3ae)]['Settings'][_0x900e03(0x6ef)]['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x2d0bb1,_0x90239d);},ColorManager[_0x55ae0c(0x2b6)]=function(){const _0x319a86=_0x55ae0c,_0x288c9c=_0x319a86(0x400);this[_0x319a86(0x47a)]=this[_0x319a86(0x47a)]||{};if(this[_0x319a86(0x47a)][_0x288c9c])return this[_0x319a86(0x47a)][_0x288c9c];const _0x50c07a=VisuMZ[_0x319a86(0x3ae)][_0x319a86(0x6c3)]['Color'][_0x319a86(0x8d6)];return this['getColorDataFromPluginParameters'](_0x288c9c,_0x50c07a);},ColorManager[_0x55ae0c(0x950)]=function(){const _0x3b9513=_0x55ae0c,_0x115510='_stored_mpGaugeColor2';this[_0x3b9513(0x47a)]=this['_colorCache']||{};if(this[_0x3b9513(0x47a)][_0x115510])return this[_0x3b9513(0x47a)][_0x115510];const _0x4ba98b=VisuMZ[_0x3b9513(0x3ae)]['Settings'][_0x3b9513(0x6ef)][_0x3b9513(0x1c0)];return this[_0x3b9513(0x66b)](_0x115510,_0x4ba98b);},ColorManager[_0x55ae0c(0x383)]=function(){const _0x711ec=_0x55ae0c,_0x440a0c=_0x711ec(0x625);this[_0x711ec(0x47a)]=this[_0x711ec(0x47a)]||{};if(this[_0x711ec(0x47a)][_0x440a0c])return this[_0x711ec(0x47a)][_0x440a0c];const _0x32a7a7=VisuMZ[_0x711ec(0x3ae)][_0x711ec(0x6c3)][_0x711ec(0x6ef)][_0x711ec(0x2d6)];return this[_0x711ec(0x66b)](_0x440a0c,_0x32a7a7);},ColorManager[_0x55ae0c(0x1ff)]=function(){const _0x182bb5=_0x55ae0c,_0x1f1363=_0x182bb5(0x57d);this[_0x182bb5(0x47a)]=this[_0x182bb5(0x47a)]||{};if(this[_0x182bb5(0x47a)][_0x1f1363])return this[_0x182bb5(0x47a)][_0x1f1363];const _0x35d513=VisuMZ['CoreEngine'][_0x182bb5(0x6c3)]['Color'][_0x182bb5(0x8d8)];return this[_0x182bb5(0x66b)](_0x1f1363,_0x35d513);},ColorManager['powerDownColor']=function(){const _0x24d3ff=_0x55ae0c,_0x3b8650=_0x24d3ff(0x92f);this['_colorCache']=this[_0x24d3ff(0x47a)]||{};if(this[_0x24d3ff(0x47a)][_0x3b8650])return this[_0x24d3ff(0x47a)][_0x3b8650];const _0x4bdd62=VisuMZ[_0x24d3ff(0x3ae)]['Settings'][_0x24d3ff(0x6ef)][_0x24d3ff(0x65f)];return this[_0x24d3ff(0x66b)](_0x3b8650,_0x4bdd62);},ColorManager[_0x55ae0c(0x4bc)]=function(){const _0x260c95=_0x55ae0c,_0x20f0d7='_stored_ctGaugeColor1';this['_colorCache']=this[_0x260c95(0x47a)]||{};if(this[_0x260c95(0x47a)][_0x20f0d7])return this[_0x260c95(0x47a)][_0x20f0d7];const _0x3f2435=VisuMZ[_0x260c95(0x3ae)]['Settings'][_0x260c95(0x6ef)][_0x260c95(0x251)];return this[_0x260c95(0x66b)](_0x20f0d7,_0x3f2435);},ColorManager['ctGaugeColor2']=function(){const _0x1235f6=_0x55ae0c,_0x238bc3=_0x1235f6(0x4a6);this['_colorCache']=this['_colorCache']||{};if(this[_0x1235f6(0x47a)][_0x238bc3])return this[_0x1235f6(0x47a)][_0x238bc3];const _0x1442a7=VisuMZ['CoreEngine'][_0x1235f6(0x6c3)][_0x1235f6(0x6ef)][_0x1235f6(0x851)];return this[_0x1235f6(0x66b)](_0x238bc3,_0x1442a7);},ColorManager[_0x55ae0c(0x76b)]=function(){const _0x1444c5=_0x55ae0c,_0x332826=_0x1444c5(0x266);this['_colorCache']=this[_0x1444c5(0x47a)]||{};if(this['_colorCache'][_0x332826])return this[_0x1444c5(0x47a)][_0x332826];const _0x55c19a=VisuMZ[_0x1444c5(0x3ae)][_0x1444c5(0x6c3)][_0x1444c5(0x6ef)][_0x1444c5(0x1fb)];return this['getColorDataFromPluginParameters'](_0x332826,_0x55c19a);},ColorManager[_0x55ae0c(0x362)]=function(){const _0x1b607a=_0x55ae0c,_0x71724=_0x1b607a(0x8a4);this[_0x1b607a(0x47a)]=this[_0x1b607a(0x47a)]||{};if(this[_0x1b607a(0x47a)][_0x71724])return this[_0x1b607a(0x47a)][_0x71724];const _0xaa5767=VisuMZ[_0x1b607a(0x3ae)][_0x1b607a(0x6c3)][_0x1b607a(0x6ef)][_0x1b607a(0x7e9)];return this[_0x1b607a(0x66b)](_0x71724,_0xaa5767);},ColorManager['tpCostColor']=function(){const _0x5c9f10=_0x55ae0c,_0x4fd7ad=_0x5c9f10(0x5e0);this['_colorCache']=this[_0x5c9f10(0x47a)]||{};if(this[_0x5c9f10(0x47a)][_0x4fd7ad])return this[_0x5c9f10(0x47a)][_0x4fd7ad];const _0x2c8591=VisuMZ[_0x5c9f10(0x3ae)]['Settings'][_0x5c9f10(0x6ef)][_0x5c9f10(0x51c)];return this['getColorDataFromPluginParameters'](_0x4fd7ad,_0x2c8591);},ColorManager[_0x55ae0c(0x9a2)]=function(){const _0x564b36=_0x55ae0c,_0x2074f9=_0x564b36(0x329);this['_colorCache']=this[_0x564b36(0x47a)]||{};if(this[_0x564b36(0x47a)][_0x2074f9])return this[_0x564b36(0x47a)][_0x2074f9];const _0x405fe1=VisuMZ[_0x564b36(0x3ae)][_0x564b36(0x6c3)][_0x564b36(0x6ef)][_0x564b36(0x51c)];return this[_0x564b36(0x66b)](_0x2074f9,_0x405fe1);},ColorManager[_0x55ae0c(0x818)]=function(){const _0x20042b=_0x55ae0c,_0x243af9=_0x20042b(0x95b);this[_0x20042b(0x47a)]=this[_0x20042b(0x47a)]||{};if(this['_colorCache'][_0x243af9])return this[_0x20042b(0x47a)][_0x243af9];const _0x150eb8=VisuMZ[_0x20042b(0x3ae)][_0x20042b(0x6c3)][_0x20042b(0x6ef)][_0x20042b(0x498)];return this[_0x20042b(0x66b)](_0x243af9,_0x150eb8);},ColorManager[_0x55ae0c(0x465)]=function(){const _0x1fc615=_0x55ae0c,_0x4c4603=_0x1fc615(0x965);this['_colorCache']=this['_colorCache']||{};if(this[_0x1fc615(0x47a)][_0x4c4603])return this[_0x1fc615(0x47a)][_0x4c4603];const _0x12a3d2=VisuMZ['CoreEngine'][_0x1fc615(0x6c3)][_0x1fc615(0x6ef)][_0x1fc615(0x7f2)];return this[_0x1fc615(0x66b)](_0x4c4603,_0x12a3d2);},ColorManager[_0x55ae0c(0x679)]=function(){const _0x520a68=_0x55ae0c,_0x1b67d0='_stored_maxLvGaugeColor1';this['_colorCache']=this[_0x520a68(0x47a)]||{};if(this['_colorCache'][_0x1b67d0])return this[_0x520a68(0x47a)][_0x1b67d0];const _0x4eb448=VisuMZ[_0x520a68(0x3ae)][_0x520a68(0x6c3)][_0x520a68(0x6ef)]['ColorMaxLvGauge1'];return this[_0x520a68(0x66b)](_0x1b67d0,_0x4eb448);},ColorManager[_0x55ae0c(0x52e)]=function(){const _0x57ee86=_0x55ae0c,_0x3a921f=_0x57ee86(0x43f);this[_0x57ee86(0x47a)]=this[_0x57ee86(0x47a)]||{};if(this[_0x57ee86(0x47a)][_0x3a921f])return this[_0x57ee86(0x47a)][_0x3a921f];const _0x3a58b8=VisuMZ['CoreEngine']['Settings'][_0x57ee86(0x6ef)][_0x57ee86(0x66c)];return this[_0x57ee86(0x66b)](_0x3a921f,_0x3a58b8);},ColorManager[_0x55ae0c(0x1fe)]=function(_0x519a84){const _0x518321=_0x55ae0c;return VisuMZ[_0x518321(0x3ae)][_0x518321(0x6c3)][_0x518321(0x6ef)][_0x518321(0x872)][_0x518321(0x67e)](this,_0x519a84);},ColorManager[_0x55ae0c(0x401)]=function(_0x1db5d7){const _0x500b77=_0x55ae0c;return VisuMZ[_0x500b77(0x3ae)][_0x500b77(0x6c3)][_0x500b77(0x6ef)][_0x500b77(0x747)][_0x500b77(0x67e)](this,_0x1db5d7);},ColorManager[_0x55ae0c(0x62d)]=function(_0x34bd3e){const _0x5d264f=_0x55ae0c;return VisuMZ[_0x5d264f(0x3ae)][_0x5d264f(0x6c3)][_0x5d264f(0x6ef)]['ActorTPColor'][_0x5d264f(0x67e)](this,_0x34bd3e);},ColorManager['paramchangeTextColor']=function(_0xeb9aa2){const _0xa32721=_0x55ae0c;return VisuMZ[_0xa32721(0x3ae)][_0xa32721(0x6c3)][_0xa32721(0x6ef)][_0xa32721(0x6c2)]['call'](this,_0xeb9aa2);},ColorManager[_0x55ae0c(0x76e)]=function(_0x3b2e51){const _0x30939d=_0x55ae0c;return VisuMZ[_0x30939d(0x3ae)]['Settings'][_0x30939d(0x6ef)][_0x30939d(0x439)][_0x30939d(0x67e)](this,_0x3b2e51);},ColorManager[_0x55ae0c(0x668)]=function(){const _0x4432a2=_0x55ae0c;return VisuMZ[_0x4432a2(0x3ae)]['Settings'][_0x4432a2(0x6ef)][_0x4432a2(0x793)];},ColorManager['outlineColorDmg']=function(){const _0x5a606a=_0x55ae0c;return VisuMZ[_0x5a606a(0x3ae)][_0x5a606a(0x6c3)]['Color'][_0x5a606a(0x333)]||_0x5a606a(0x7e1);},ColorManager[_0x55ae0c(0x30a)]=function(){const _0x199775=_0x55ae0c;return VisuMZ['CoreEngine'][_0x199775(0x6c3)][_0x199775(0x6ef)][_0x199775(0x1c6)]||_0x199775(0x19d);},ColorManager[_0x55ae0c(0x5e2)]=function(){const _0x5521f5=_0x55ae0c;return VisuMZ[_0x5521f5(0x3ae)]['Settings'][_0x5521f5(0x6ef)][_0x5521f5(0x7a9)];},ColorManager[_0x55ae0c(0x89b)]=function(){const _0x1a798c=_0x55ae0c;return VisuMZ[_0x1a798c(0x3ae)][_0x1a798c(0x6c3)][_0x1a798c(0x6ef)][_0x1a798c(0x640)];},ColorManager['itemBackColor1']=function(){const _0x39af8b=_0x55ae0c;return VisuMZ['CoreEngine']['Settings'][_0x39af8b(0x6ef)][_0x39af8b(0x28a)];},ColorManager['itemBackColor2']=function(){const _0x237a55=_0x55ae0c;return VisuMZ['CoreEngine'][_0x237a55(0x6c3)][_0x237a55(0x6ef)][_0x237a55(0x95d)];},SceneManager[_0x55ae0c(0x4c0)]=[],SceneManager[_0x55ae0c(0x228)]=function(){const _0x3428f4=_0x55ae0c;return this['_scene']&&this[_0x3428f4(0x1a1)][_0x3428f4(0x68b)]===Scene_Battle;},SceneManager[_0x55ae0c(0x2fd)]=function(){const _0xc9bc3d=_0x55ae0c;return this[_0xc9bc3d(0x1a1)]&&this[_0xc9bc3d(0x1a1)][_0xc9bc3d(0x68b)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x587e12=_0x55ae0c;return this[_0x587e12(0x1a1)]&&this[_0x587e12(0x1a1)]instanceof Scene_Map;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x49b)]=SceneManager['initialize'],SceneManager[_0x55ae0c(0x6e5)]=function(){const _0x7d81c7=_0x55ae0c;VisuMZ[_0x7d81c7(0x3ae)][_0x7d81c7(0x49b)][_0x7d81c7(0x67e)](this),this[_0x7d81c7(0x48a)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6d3)]=SceneManager['onKeyDown'],SceneManager['onKeyDown']=function(_0x311044){const _0x4ee7bb=_0x55ae0c;if($gameTemp)this[_0x4ee7bb(0x6ba)](_0x311044);VisuMZ['CoreEngine'][_0x4ee7bb(0x6d3)][_0x4ee7bb(0x67e)](this,_0x311044);},SceneManager['onKeyDownKeysF6F7']=function(_0x4684e0){const _0x5283a8=_0x55ae0c;if(!_0x4684e0[_0x5283a8(0x417)]&&!_0x4684e0[_0x5283a8(0x404)])switch(_0x4684e0['keyCode']){case 0x52:this['playTestShiftR']();break;case 0x54:this['playTestShiftT']();break;case 0x75:this[_0x5283a8(0x42a)]();break;case 0x76:if(Input[_0x5283a8(0x607)](_0x5283a8(0x770))||Input['isPressed']('ctrl'))return;this['playTestF7']();break;}else{if(_0x4684e0['ctrlKey']){let _0x276b21=_0x4684e0[_0x5283a8(0x7a2)];if(_0x276b21>=0x31&&_0x276b21<=0x39){const _0x4d7a63=_0x276b21-0x30;return SceneManager[_0x5283a8(0x34a)](_0x4d7a63);}else{if(_0x276b21>=0x61&&_0x276b21<=0x69){const _0x12be70=_0x276b21-0x60;return SceneManager['playtestQuickLoad'](_0x12be70);}}}}},SceneManager['playTestF6']=function(){const _0x24727d=_0x55ae0c;if($gameTemp[_0x24727d(0x6fd)]()&&VisuMZ[_0x24727d(0x3ae)][_0x24727d(0x6c3)][_0x24727d(0x5fa)][_0x24727d(0x82a)]){ConfigManager[_0x24727d(0x91d)]!==0x0?(ConfigManager[_0x24727d(0x7c6)]=0x0,ConfigManager[_0x24727d(0x382)]=0x0,ConfigManager[_0x24727d(0x903)]=0x0,ConfigManager[_0x24727d(0x91d)]=0x0):(ConfigManager[_0x24727d(0x7c6)]=0x64,ConfigManager[_0x24727d(0x382)]=0x64,ConfigManager[_0x24727d(0x903)]=0x64,ConfigManager[_0x24727d(0x91d)]=0x64);ConfigManager[_0x24727d(0x3fc)]();if(this['_scene'][_0x24727d(0x68b)]===Scene_Options){if(this[_0x24727d(0x1a1)][_0x24727d(0x706)])this[_0x24727d(0x1a1)][_0x24727d(0x706)]['refresh']();if(this[_0x24727d(0x1a1)][_0x24727d(0x748)])this['_scene'][_0x24727d(0x748)]['refresh']();}}},SceneManager[_0x55ae0c(0x8fe)]=function(){const _0xfa9b20=_0x55ae0c;$gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0xfa9b20(0x6c3)][_0xfa9b20(0x5fa)][_0xfa9b20(0x98d)]&&($gameTemp[_0xfa9b20(0x7cf)]=!$gameTemp[_0xfa9b20(0x7cf)]);},SceneManager[_0x55ae0c(0x2ae)]=function(){const _0x4b15ad=_0x55ae0c;if(!VisuMZ[_0x4b15ad(0x3ae)][_0x4b15ad(0x6c3)][_0x4b15ad(0x5fa)][_0x4b15ad(0x5b4)])return;if(!$gameTemp[_0x4b15ad(0x6fd)]())return;if(!SceneManager[_0x4b15ad(0x228)]())return;if(!Input[_0x4b15ad(0x607)]('shift'))return;for(const _0x5d3cbd of $gameParty['members']()){if(!_0x5d3cbd)continue;_0x5d3cbd['recoverAll']();}},SceneManager[_0x55ae0c(0x4b5)]=function(){const _0x543f64=_0x55ae0c;if(!VisuMZ[_0x543f64(0x3ae)][_0x543f64(0x6c3)][_0x543f64(0x5fa)]['ShiftT_Toggle'])return;if(!$gameTemp[_0x543f64(0x6fd)]())return;if(!SceneManager[_0x543f64(0x228)]())return;if(!Input[_0x543f64(0x607)]('shift'))return;for(const _0x208318 of $gameParty[_0x543f64(0x63b)]()){if(!_0x208318)continue;_0x208318['gainSilentTp'](_0x208318[_0x543f64(0x55f)]());}},SceneManager['playtestQuickLoad']=function(_0x6292d0){const _0x46d254=_0x55ae0c;if(!$gameTemp['isPlaytest']())return;if(!DataManager[_0x46d254(0x75d)](_0x6292d0))return;if(!(VisuMZ[_0x46d254(0x3ae)][_0x46d254(0x6c3)][_0x46d254(0x5fa)][_0x46d254(0x83a)]??!![]))return;this[_0x46d254(0x87e)](Scene_QuickLoad),this[_0x46d254(0x8db)](_0x6292d0);},SceneManager[_0x55ae0c(0x48a)]=function(){const _0x2078ad=_0x55ae0c;this['_sideButtonLayout']=![],this[_0x2078ad(0x6e8)]=!VisuMZ[_0x2078ad(0x3ae)][_0x2078ad(0x6c3)]['UI'][_0x2078ad(0x6a4)];},SceneManager[_0x55ae0c(0x3e5)]=function(_0x1af82d){const _0x2ac8f4=_0x55ae0c;VisuMZ[_0x2ac8f4(0x3ae)][_0x2ac8f4(0x6c3)]['UI'][_0x2ac8f4(0x27c)]&&(this[_0x2ac8f4(0x805)]=_0x1af82d);},SceneManager[_0x55ae0c(0x290)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x55ae0c(0x3d3)]=function(){const _0x5dea01=_0x55ae0c;return this[_0x5dea01(0x6e8)];},SceneManager[_0x55ae0c(0x4bf)]=function(){const _0x14c459=_0x55ae0c;return this['areButtonsHidden']()||this[_0x14c459(0x290)]();},VisuMZ['CoreEngine'][_0x55ae0c(0x794)]=SceneManager[_0x55ae0c(0x6f4)],SceneManager[_0x55ae0c(0x6f4)]=function(){const _0x2b98fe=_0x55ae0c;return VisuMZ[_0x2b98fe(0x3ae)][_0x2b98fe(0x6c3)][_0x2b98fe(0x5fa)]['RequireFocus']?VisuMZ[_0x2b98fe(0x3ae)][_0x2b98fe(0x794)]['call'](this):!![];},SceneManager[_0x55ae0c(0x547)]=function(_0x407c28){const _0xfb7ddb=_0x55ae0c;if(_0x407c28 instanceof Error)this[_0xfb7ddb(0x374)](_0x407c28);else _0x407c28 instanceof Array&&_0x407c28[0x0]==='LoadError'?this[_0xfb7ddb(0x7f6)](_0x407c28):this['catchUnknownError'](_0x407c28);this[_0xfb7ddb(0x471)]();},VisuMZ['CoreEngine'][_0x55ae0c(0x2fa)]=BattleManager[_0x55ae0c(0x6d8)],BattleManager[_0x55ae0c(0x6d8)]=function(){const _0x2c5f21=_0x55ae0c;return VisuMZ[_0x2c5f21(0x3ae)][_0x2c5f21(0x6c3)][_0x2c5f21(0x5fa)][_0x2c5f21(0x835)]?this[_0x2c5f21(0x97d)]():VisuMZ[_0x2c5f21(0x3ae)]['BattleManager_processEscape'][_0x2c5f21(0x67e)](this);},BattleManager[_0x55ae0c(0x97d)]=function(){const _0x566ae5=_0x55ae0c;return $gameParty[_0x566ae5(0x887)](),SoundManager[_0x566ae5(0x7c8)](),this[_0x566ae5(0x300)](),!![];},BattleManager[_0x55ae0c(0x260)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x55ae0c(0x85d)]=function(){const _0x304626=_0x55ae0c;return $gameSystem[_0x304626(0x531)]()===0x1;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x24a)]=Game_Temp['prototype'][_0x55ae0c(0x6e5)],Game_Temp[_0x55ae0c(0x792)]['initialize']=function(){const _0x3a5f6d=_0x55ae0c;VisuMZ[_0x3a5f6d(0x3ae)][_0x3a5f6d(0x24a)][_0x3a5f6d(0x67e)](this),this[_0x3a5f6d(0x350)](),this['createFauxAnimationQueue'](),this['createPointAnimationQueue']();},Game_Temp['prototype']['forceOutOfPlaytest']=function(){const _0x30ba91=_0x55ae0c;VisuMZ[_0x30ba91(0x3ae)][_0x30ba91(0x6c3)][_0x30ba91(0x5fa)][_0x30ba91(0x8b4)]&&(this[_0x30ba91(0x5d3)]=![]);},Game_Temp['prototype'][_0x55ae0c(0x722)]=function(_0x3d19ac){const _0x3bfd5e=_0x55ae0c;this[_0x3bfd5e(0x313)]=_0x3d19ac;},Game_Temp[_0x55ae0c(0x792)]['getLastPluginCommandInterpreter']=function(){const _0x5b2f9b=_0x55ae0c;return this[_0x5b2f9b(0x313)];},Game_Temp[_0x55ae0c(0x792)][_0x55ae0c(0x8e0)]=function(){const _0x128eba=_0x55ae0c;this[_0x128eba(0x98a)]=undefined,this[_0x128eba(0x91c)]=undefined,this[_0x128eba(0x2e1)]=undefined;},Game_Temp[_0x55ae0c(0x792)][_0x55ae0c(0x3f7)]=function(_0x52d05d){const _0xea9795=_0x55ae0c;$gameMap&&$dataMap&&$dataMap[_0xea9795(0x526)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0xea9795(0x526)]);const _0x41bf72=$dataTroops[_0x52d05d];if(_0x41bf72){let _0x339c2c=DataManager['createTroopNote'](_0x41bf72['id']);this[_0xea9795(0x7ef)](_0x339c2c);}},Game_Temp[_0x55ae0c(0x792)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x1865eb){const _0x546c71=_0x55ae0c;if(!_0x1865eb)return;if(_0x1865eb[_0x546c71(0x65b)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x546c71(0x98a)]='FV';else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x52ac77=String(RegExp['$1']);if(_0x52ac77[_0x546c71(0x65b)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x546c71(0x98a)]='FV';else _0x52ac77[_0x546c71(0x65b)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x1865eb[_0x546c71(0x65b)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x1865eb['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x546c71(0x91c)]=0x1;else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x546c71(0x91c)]=0x2;else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:TPB|ATB)>/i))this['_forcedBattleSys']=0x2;else{if(_0x1865eb['match'](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x546c71(0x91c)]=_0x546c71(0x5fb));else{if(_0x1865eb['match'](/<(?:STB)>/i))Imported[_0x546c71(0x239)]&&(this[_0x546c71(0x91c)]='STB');else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x546c71(0x91c)]='BTB');else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:FTB)>/i))Imported[_0x546c71(0x504)]&&(this['_forcedBattleSys']=_0x546c71(0x5a4));else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x546c71(0x91c)]=_0x546c71(0x6ab));else{if(_0x1865eb['match'](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x546c71(0x91c)]=_0x546c71(0x20a));else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x546c71(0x91c)]=_0x546c71(0x3af));else{if(_0x1865eb[_0x546c71(0x65b)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4bdb4a=String(RegExp['$1']);if(_0x4bdb4a[_0x546c71(0x65b)](/DTB/i))this[_0x546c71(0x91c)]=0x0;else{if(_0x4bdb4a[_0x546c71(0x65b)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x546c71(0x91c)]=0x1;else{if(_0x4bdb4a[_0x546c71(0x65b)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x546c71(0x91c)]=0x2;else{if(_0x4bdb4a[_0x546c71(0x65b)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x546c71(0x91c)]=_0x546c71(0x5fb));else{if(_0x4bdb4a['match'](/STB/i))Imported[_0x546c71(0x239)]&&(this[_0x546c71(0x91c)]='STB');else{if(_0x4bdb4a[_0x546c71(0x65b)](/BTB/i))Imported[_0x546c71(0x472)]&&(this[_0x546c71(0x91c)]=_0x546c71(0x39a));else{if(_0x4bdb4a[_0x546c71(0x65b)](/FTB/i))Imported[_0x546c71(0x504)]&&(this[_0x546c71(0x91c)]=_0x546c71(0x5a4));else{if(_0x4bdb4a[_0x546c71(0x65b)](/OTB/i))Imported[_0x546c71(0x1dd)]&&(this[_0x546c71(0x91c)]=_0x546c71(0x6ab));else{if(_0x4bdb4a['match'](/ETB/i))Imported[_0x546c71(0x5a6)]&&(this[_0x546c71(0x91c)]=_0x546c71(0x20a));else _0x4bdb4a['match'](/PTB/i)&&(Imported[_0x546c71(0x4fe)]&&(this[_0x546c71(0x91c)]='PTB'));}}}}}}}}}}}}}}}}}}}}if(_0x1865eb[_0x546c71(0x65b)](/<(?:|BATTLE )GRID>/i))this[_0x546c71(0x2e1)]=!![];else _0x1865eb['match'](/<NO (?:|BATTLE )GRID>/i)&&(this['_forcedBattleGridSystem']=![]);},Game_Temp['prototype']['createFauxAnimationQueue']=function(){const _0x5c3e6c=_0x55ae0c;this[_0x5c3e6c(0x50c)]=[];},Game_Temp[_0x55ae0c(0x792)][_0x55ae0c(0x699)]=function(_0x7a692a,_0x1f0960,_0x109b89,_0x21a184){const _0x52b47e=_0x55ae0c;if(!this[_0x52b47e(0x6f2)]())return;_0x109b89=_0x109b89||![],_0x21a184=_0x21a184||![];if($dataAnimations[_0x1f0960]){const _0xc9cec4={'targets':_0x7a692a,'animationId':_0x1f0960,'mirror':_0x109b89,'mute':_0x21a184};this['_fauxAnimationQueue'][_0x52b47e(0x87e)](_0xc9cec4);for(const _0x34ae91 of _0x7a692a){_0x34ae91[_0x52b47e(0x3f9)]&&_0x34ae91[_0x52b47e(0x3f9)]();}}},Game_Temp['prototype']['showFauxAnimations']=function(){return!![];},Game_Temp['prototype'][_0x55ae0c(0x6e1)]=function(){const _0x47f6ea=_0x55ae0c;return this['_fauxAnimationQueue'][_0x47f6ea(0x770)]();},Game_Temp[_0x55ae0c(0x792)][_0x55ae0c(0x530)]=function(){const _0x4ace9a=_0x55ae0c;this[_0x4ace9a(0x50a)]=[];},Game_Temp[_0x55ae0c(0x792)][_0x55ae0c(0x704)]=function(_0xc68e9a,_0x453c42,_0x440218,_0x5d6e79,_0x5460e6){const _0x15b91d=_0x55ae0c;if(!this[_0x15b91d(0x803)]())return;_0x5d6e79=_0x5d6e79||![],_0x5460e6=_0x5460e6||![];if($dataAnimations[_0x440218]){const _0x4186bf={'x':_0xc68e9a,'y':_0x453c42,'animationId':_0x440218,'mirror':_0x5d6e79,'mute':_0x5460e6};this[_0x15b91d(0x50a)]['push'](_0x4186bf);}},Game_Temp['prototype'][_0x55ae0c(0x803)]=function(){return!![];},Game_Temp[_0x55ae0c(0x792)]['retrievePointAnimation']=function(){const _0x47e9f0=_0x55ae0c;return this[_0x47e9f0(0x50a)][_0x47e9f0(0x770)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x781)]=Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)],Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(){const _0x480871=_0x55ae0c;VisuMZ['CoreEngine'][_0x480871(0x781)][_0x480871(0x67e)](this),this[_0x480871(0x3d8)]();},Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x3d8)]=function(){const _0xe66b7b=_0x55ae0c;this['_CoreEngineSettings']={'SideView':$dataSystem[_0xe66b7b(0x6e6)],'BattleSystem':this[_0xe66b7b(0x733)](),'FontSize':$dataSystem[_0xe66b7b(0x787)]['fontSize'],'Padding':0xc};},Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x905)]=function(){const _0x1bdf83=_0x55ae0c;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x1bdf83(0x98a)]==='FV')return![];}if(this[_0x1bdf83(0x8eb)]===undefined)this[_0x1bdf83(0x3d8)]();if(this['_CoreEngineSettings'][_0x1bdf83(0x70a)]===undefined)this[_0x1bdf83(0x3d8)]();return this['_CoreEngineSettings'][_0x1bdf83(0x70a)];},Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x6ed)]=function(_0x14de28){const _0x4abc11=_0x55ae0c;if(this['_CoreEngineSettings']===undefined)this[_0x4abc11(0x3d8)]();if(this[_0x4abc11(0x8eb)]['SideView']===undefined)this[_0x4abc11(0x3d8)]();this['_CoreEngineSettings'][_0x4abc11(0x70a)]=_0x14de28;},Game_System['prototype'][_0x55ae0c(0x22a)]=function(){const _0x15cec0=_0x55ae0c;if(this['_CoreEngineSettings']===undefined)this[_0x15cec0(0x3d8)]();this[_0x15cec0(0x8eb)][_0x15cec0(0x7ec)]=this[_0x15cec0(0x733)]();},Game_System[_0x55ae0c(0x792)]['initialBattleSystem']=function(){const _0x40e734=_0x55ae0c,_0x40c4f2=(VisuMZ[_0x40e734(0x3ae)][_0x40e734(0x6c3)][_0x40e734(0x7ec)]||_0x40e734(0x92e))[_0x40e734(0x8d3)]()[_0x40e734(0x371)]();return VisuMZ[_0x40e734(0x3ae)][_0x40e734(0x1dc)](_0x40c4f2);},Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x531)]=function(){const _0x5e5022=_0x55ae0c;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x5e5022(0x91c)];if(this[_0x5e5022(0x8eb)]===undefined)this[_0x5e5022(0x3d8)]();if(this['_CoreEngineSettings'][_0x5e5022(0x7ec)]===undefined)this[_0x5e5022(0x22a)]();return this[_0x5e5022(0x8eb)][_0x5e5022(0x7ec)];},Game_System['prototype'][_0x55ae0c(0x6df)]=function(_0x44b9b5){const _0x10cb40=_0x55ae0c;if(this[_0x10cb40(0x8eb)]===undefined)this[_0x10cb40(0x3d8)]();if(this[_0x10cb40(0x8eb)][_0x10cb40(0x7ec)]===undefined)this[_0x10cb40(0x22a)]();this[_0x10cb40(0x8eb)][_0x10cb40(0x7ec)]=_0x44b9b5;},Game_System['prototype'][_0x55ae0c(0x8b9)]=function(){const _0x358073=_0x55ae0c;if(this['_CoreEngineSettings']===undefined)this[_0x358073(0x3d8)]();if(this[_0x358073(0x8eb)][_0x358073(0x6d1)]===undefined)this[_0x358073(0x3d8)]();return this['_CoreEngineSettings'][_0x358073(0x6d1)];},Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x38b)]=function(_0x903a8f){const _0x34cb71=_0x55ae0c;if(this[_0x34cb71(0x8eb)]===undefined)this[_0x34cb71(0x3d8)]();if(this[_0x34cb71(0x8eb)][_0x34cb71(0x988)]===undefined)this[_0x34cb71(0x3d8)]();this[_0x34cb71(0x8eb)][_0x34cb71(0x6d1)]=_0x903a8f;},Game_System['prototype']['windowPadding']=function(){const _0x1f44dd=_0x55ae0c;if(this[_0x1f44dd(0x8eb)]===undefined)this[_0x1f44dd(0x3d8)]();if(this[_0x1f44dd(0x8eb)][_0x1f44dd(0x934)]===undefined)this[_0x1f44dd(0x3d8)]();return this[_0x1f44dd(0x8eb)]['Padding'];},Game_System[_0x55ae0c(0x792)][_0x55ae0c(0x2d8)]=function(_0x23a658){const _0x1424a9=_0x55ae0c;if(this[_0x1424a9(0x8eb)]===undefined)this[_0x1424a9(0x3d8)]();if(this[_0x1424a9(0x8eb)][_0x1424a9(0x988)]===undefined)this['initCoreEngine']();this[_0x1424a9(0x8eb)][_0x1424a9(0x934)]=_0x23a658;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x319)]=Game_Screen['prototype']['initialize'],Game_Screen['prototype'][_0x55ae0c(0x6e5)]=function(){const _0x143d7=_0x55ae0c;VisuMZ[_0x143d7(0x3ae)][_0x143d7(0x319)][_0x143d7(0x67e)](this),this[_0x143d7(0x662)]();},Game_Screen[_0x55ae0c(0x792)]['initCoreEngineScreenShake']=function(){const _0x1640a7=_0x55ae0c,_0x4642bb=VisuMZ['CoreEngine'][_0x1640a7(0x6c3)][_0x1640a7(0x96d)];this[_0x1640a7(0x5c8)]=_0x4642bb?.[_0x1640a7(0x4e3)]||_0x1640a7(0x538);},Game_Screen[_0x55ae0c(0x792)][_0x55ae0c(0x65d)]=function(){const _0x34f34e=_0x55ae0c;if(this[_0x34f34e(0x5c8)]===undefined)this[_0x34f34e(0x662)]();return this[_0x34f34e(0x5c8)];},Game_Screen['prototype'][_0x55ae0c(0x3b3)]=function(_0x3da232){const _0x515146=_0x55ae0c;if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();this[_0x515146(0x5c8)]=_0x3da232[_0x515146(0x681)]()[_0x515146(0x371)]();},Game_Picture[_0x55ae0c(0x792)]['isMapScrollLinked']=function(){const _0x581f9a=_0x55ae0c;if($gameParty[_0x581f9a(0x56e)]())return![];return this['onlyfilename']()&&this[_0x581f9a(0x495)]()[_0x581f9a(0x2a7)](0x0)==='!';},Game_Picture['prototype']['onlyfilename']=function(){const _0x458ea2=_0x55ae0c;return this[_0x458ea2(0x406)]['split']('/')[_0x458ea2(0x275)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x91a)]=Game_Picture[_0x55ae0c(0x792)]['x'],Game_Picture['prototype']['x']=function(){const _0x20f764=_0x55ae0c;return this[_0x20f764(0x1ea)]()?this[_0x20f764(0x1d7)]():VisuMZ[_0x20f764(0x3ae)]['Game_Picture_x'][_0x20f764(0x67e)](this);},Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x1d7)]=function(){const _0x4e9c66=_0x55ae0c,_0x53ea59=$gameMap[_0x4e9c66(0x3e4)]()*$gameMap[_0x4e9c66(0x7ce)]();return(this['_x']-_0x53ea59)*$gameScreen[_0x4e9c66(0x657)]();},VisuMZ[_0x55ae0c(0x3ae)]['Game_Picture_y']=Game_Picture['prototype']['y'],Game_Picture[_0x55ae0c(0x792)]['y']=function(){const _0x16b79b=_0x55ae0c;return this[_0x16b79b(0x1ea)]()?this[_0x16b79b(0x8ef)]():VisuMZ[_0x16b79b(0x3ae)][_0x16b79b(0x581)][_0x16b79b(0x67e)](this);},Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x8ef)]=function(){const _0x333b78=_0x55ae0c,_0x4fef2d=$gameMap[_0x333b78(0x789)]()*$gameMap[_0x333b78(0x2a3)]();return(this['_y']-_0x4fef2d)*$gameScreen[_0x333b78(0x657)]();},VisuMZ[_0x55ae0c(0x3ae)]['Game_Picture_scaleX']=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x549)],Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x549)]=function(){const _0x22f683=_0x55ae0c;let _0x213f7a=VisuMZ['CoreEngine']['Game_Picture_scaleX']['call'](this);return this[_0x22f683(0x1ea)]()&&(_0x213f7a*=$gameScreen[_0x22f683(0x657)]()),_0x213f7a;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6b2)]=Game_Picture[_0x55ae0c(0x792)]['scaleY'],Game_Picture[_0x55ae0c(0x792)]['scaleY']=function(){const _0xc0c171=_0x55ae0c;let _0x3e2c7b=VisuMZ[_0xc0c171(0x3ae)]['Game_Picture_scaleY'][_0xc0c171(0x67e)](this);return this['isMapScrollLinked']()&&(_0x3e2c7b*=$gameScreen[_0xc0c171(0x657)]()),_0x3e2c7b;},Game_Picture[_0x55ae0c(0x792)]['setEasingType']=function(_0x411653){const _0xc6890=_0x55ae0c;this[_0xc6890(0x2c1)]=_0x411653;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6cb)]=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x972)],Game_Picture['prototype'][_0x55ae0c(0x972)]=function(_0x21984f){const _0x2b8aed=_0x55ae0c;return this[_0x2b8aed(0x2c1)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3]['includes'](this['_coreEasingType'])?VisuMZ['CoreEngine'][_0x2b8aed(0x6cb)][_0x2b8aed(0x67e)](this,_0x21984f):VisuMZ[_0x2b8aed(0x707)](_0x21984f,this['_coreEasingType']);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2c9)]=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x36f)],Game_Picture[_0x55ae0c(0x792)]['initRotation']=function(){const _0x17ec35=_0x55ae0c;VisuMZ['CoreEngine'][_0x17ec35(0x2c9)][_0x17ec35(0x67e)](this),this[_0x17ec35(0x60d)]();},Game_Picture['prototype'][_0x55ae0c(0x60d)]=function(){const _0x5daee8=_0x55ae0c;this[_0x5daee8(0x857)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x5daee8(0x394)};},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x41c)]=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x25c)],Game_Picture[_0x55ae0c(0x792)]['angle']=function(){const _0x607802=_0x55ae0c;let _0x5f577d=VisuMZ['CoreEngine'][_0x607802(0x41c)][_0x607802(0x67e)](this);return _0x5f577d+=this[_0x607802(0x711)](),_0x5f577d;},Game_Picture['prototype'][_0x55ae0c(0x711)]=function(){const _0x44ed6c=_0x55ae0c;if(this[_0x44ed6c(0x857)]===undefined)this[_0x44ed6c(0x60d)]();return this[_0x44ed6c(0x857)][_0x44ed6c(0x886)]||0x0;},Game_Picture[_0x55ae0c(0x792)]['setAnglePlusData']=function(_0x3928ca,_0x2947ac,_0x4e38f2){const _0x2542bf=_0x55ae0c;if(this[_0x2542bf(0x857)]===undefined)this['initRotationCoreEngine']();this['_anglePlus'][_0x2542bf(0x5b9)]=_0x3928ca||0x0,this['_anglePlus']['duration']=_0x2947ac||0x0,this[_0x2542bf(0x857)]['wholeDuration']=_0x2947ac||0x0,this[_0x2542bf(0x857)][_0x2542bf(0x7b2)]=_0x4e38f2||_0x2542bf(0x394),_0x2947ac<=0x0&&(this[_0x2542bf(0x857)]['current']=this[_0x2542bf(0x857)][_0x2542bf(0x5b9)]);},Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x4a3)]=function(_0x126953,_0x59e3b4,_0x471709){const _0x214728=_0x55ae0c;if(this[_0x214728(0x857)]===undefined)this['initRotationCoreEngine']();this[_0x214728(0x857)][_0x214728(0x5b9)]+=_0x126953||0x0,this['_anglePlus'][_0x214728(0x2ef)]=_0x59e3b4||0x0,this[_0x214728(0x857)]['wholeDuration']=_0x59e3b4||0x0,this['_anglePlus']['easingType']=_0x471709||_0x214728(0x394),_0x59e3b4<=0x0&&(this['_anglePlus'][_0x214728(0x886)]=this[_0x214728(0x857)][_0x214728(0x5b9)]);},VisuMZ[_0x55ae0c(0x3ae)]['Game_Picture_updateRotation']=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x31e)],Game_Picture['prototype']['updateRotation']=function(){const _0x2a0fab=_0x55ae0c;VisuMZ[_0x2a0fab(0x3ae)]['Game_Picture_updateRotation']['call'](this),this[_0x2a0fab(0x294)]();},Game_Picture[_0x55ae0c(0x792)]['updateAnglePlus']=function(){const _0x199bd0=_0x55ae0c;if(this[_0x199bd0(0x857)]===undefined)this[_0x199bd0(0x60d)]();const _0x18706f=this[_0x199bd0(0x857)];if(_0x18706f[_0x199bd0(0x2ef)]<=0x0)return;_0x18706f[_0x199bd0(0x886)]=this['applyEasingAnglePlus'](_0x18706f[_0x199bd0(0x886)],_0x18706f[_0x199bd0(0x5b9)]),_0x18706f['duration']--,_0x18706f['duration']<=0x0&&(_0x18706f['current']=_0x18706f[_0x199bd0(0x5b9)]);},Game_Picture['prototype'][_0x55ae0c(0x79c)]=function(_0x418368,_0x2e82e8){const _0x410234=_0x55ae0c,_0x4be337=this[_0x410234(0x857)],_0x4de53f=_0x4be337[_0x410234(0x7b2)],_0x3c5439=_0x4be337[_0x410234(0x2ef)],_0x4047f2=_0x4be337['wholeDuration'],_0x3c8564=VisuMZ[_0x410234(0x707)]((_0x4047f2-_0x3c5439)/_0x4047f2,_0x4de53f),_0x579efc=VisuMZ[_0x410234(0x707)]((_0x4047f2-_0x3c5439+0x1)/_0x4047f2,_0x4de53f),_0x420ba3=(_0x418368-_0x2e82e8*_0x3c8564)/(0x1-_0x3c8564);return _0x420ba3+(_0x2e82e8-_0x420ba3)*_0x579efc;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4a5)]=Game_Action['prototype'][_0x55ae0c(0x8e5)],Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x8e5)]=function(_0xe2291){const _0x2b378c=_0x55ae0c;return VisuMZ[_0x2b378c(0x3ae)][_0x2b378c(0x6c3)]['QoL'][_0x2b378c(0x476)]?this['itemHitImprovedAccuracy'](_0xe2291):VisuMZ[_0x2b378c(0x3ae)][_0x2b378c(0x4a5)][_0x2b378c(0x67e)](this,_0xe2291);},Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x1e9)]=function(_0x538a92){const _0x56da0c=_0x55ae0c,_0x3be2ae=this['itemSuccessRate'](_0x538a92),_0x3eec25=this[_0x56da0c(0x39f)](_0x538a92),_0x32b9de=this[_0x56da0c(0x570)](_0x538a92);return _0x3be2ae*(_0x3eec25-_0x32b9de);},VisuMZ['CoreEngine'][_0x55ae0c(0x36e)]=Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x5c1)],Game_Action['prototype'][_0x55ae0c(0x5c1)]=function(_0x282351){const _0x310cfe=_0x55ae0c;return VisuMZ[_0x310cfe(0x3ae)][_0x310cfe(0x6c3)][_0x310cfe(0x5fa)]['ImprovedAccuracySystem']?0x0:VisuMZ['CoreEngine'][_0x310cfe(0x36e)][_0x310cfe(0x67e)](this,_0x282351);},Game_Action['prototype'][_0x55ae0c(0x7c7)]=function(_0x10e57f){return this['item']()['successRate']*0.01;},Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x39f)]=function(_0x1c202a){const _0x24c566=_0x55ae0c;if(VisuMZ[_0x24c566(0x3ae)]['Settings'][_0x24c566(0x5fa)][_0x24c566(0x996)]&&this['isItem']())return 0x1;return this['isPhysical']()?VisuMZ[_0x24c566(0x3ae)][_0x24c566(0x6c3)][_0x24c566(0x5fa)][_0x24c566(0x996)]&&this[_0x24c566(0x840)]()[_0x24c566(0x528)]()?this['subject']()[_0x24c566(0x7a7)]+0.05:this[_0x24c566(0x840)]()['hit']:0x1;},Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x570)]=function(_0x9e1dd4){const _0x5a7b9e=_0x55ae0c;if(this['subject']()['isActor']()===_0x9e1dd4[_0x5a7b9e(0x528)]())return 0x0;if(this[_0x5a7b9e(0x28e)]())return VisuMZ[_0x5a7b9e(0x3ae)][_0x5a7b9e(0x6c3)][_0x5a7b9e(0x5fa)]['AccuracyBoost']&&_0x9e1dd4[_0x5a7b9e(0x863)]()?_0x9e1dd4['eva']-0.05:_0x9e1dd4[_0x5a7b9e(0x678)];else return this['isMagical']()?_0x9e1dd4[_0x5a7b9e(0x386)]:0x0;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x5b5)]=Game_Action['prototype']['updateLastTarget'],Game_Action['prototype'][_0x55ae0c(0x556)]=function(_0xaf1227){const _0x588155=_0x55ae0c;VisuMZ[_0x588155(0x3ae)]['Game_Action_updateLastTarget'][_0x588155(0x67e)](this,_0xaf1227);if(VisuMZ[_0x588155(0x3ae)][_0x588155(0x6c3)][_0x588155(0x5fa)][_0x588155(0x476)])return;const _0x398e19=_0xaf1227[_0x588155(0x56f)]();_0x398e19[_0x588155(0x2d3)]&&(0x1-this['itemEva'](_0xaf1227)>this[_0x588155(0x8e5)](_0xaf1227)&&(_0x398e19[_0x588155(0x2d3)]=![],_0x398e19['evaded']=!![]));},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x206)],Game_BattlerBase['prototype'][_0x55ae0c(0x206)]=function(){const _0x15d58e=_0x55ae0c;this[_0x15d58e(0x27f)]={},VisuMZ[_0x15d58e(0x3ae)][_0x15d58e(0x3a0)][_0x15d58e(0x67e)](this);},VisuMZ[_0x55ae0c(0x3ae)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x1a4)],Game_BattlerBase['prototype']['refresh']=function(){const _0x4df4c1=_0x55ae0c;this[_0x4df4c1(0x27f)]={},VisuMZ[_0x4df4c1(0x3ae)][_0x4df4c1(0x4be)][_0x4df4c1(0x67e)](this);},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x4a9629){const _0x3b9285=_0x55ae0c;return this[_0x3b9285(0x27f)]=this['_cache']||{},this[_0x3b9285(0x27f)][_0x4a9629]!==undefined;},VisuMZ['CoreEngine']['JsReplaceUserVar']=function(_0x4a9dc){const _0x367bb2=_0x55ae0c;return _0x4a9dc=_0x4a9dc||'',_0x4a9dc='\x20'+_0x4a9dc,(VisuMZ[_0x367bb2(0x3ae)][_0x367bb2(0x6c3)]['Param']['ConvertToBase']??!![])&&(_0x4a9dc=_0x4a9dc['replace'](/\s(?:USER|THIS)\.mhp\b/gi,_0x367bb2(0x7d2)),_0x4a9dc=_0x4a9dc['replace'](/\s(?:USER|THIS)\.mmp\b/gi,'this.paramBase(1)'),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\s(?:USER|THIS)\.atk\b/gi,_0x367bb2(0x292)),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\s(?:USER|THIS)\.def\b/gi,_0x367bb2(0x60a)),_0x4a9dc=_0x4a9dc['replace'](/\s(?:USER|THIS)\.mat\b/gi,_0x367bb2(0x86c)),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\s(?:USER|THIS)\.mdf\b/gi,_0x367bb2(0x499)),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\s(?:USER|THIS)\.agi\b/gi,_0x367bb2(0x3a8)),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\s(?:USER|THIS)\.luk\b/gi,'this.paramBase(7)'),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\s(?:USER|THIS)\.param\(/gi,_0x367bb2(0x1e1))),_0x4a9dc=_0x4a9dc[_0x367bb2(0x4ca)](/\suser\./gi,_0x367bb2(0x424)),_0x4a9dc;},Game_BattlerBase['prototype'][_0x55ae0c(0x812)]=function(_0x337e6d){const _0x27cc40=_0x55ae0c,_0x5a03ba=(_0x3d6e58,_0x2a61ad)=>{const _0x1330d3=_0x1c19;if(!_0x2a61ad)return _0x3d6e58;if(_0x2a61ad[_0x1330d3(0x526)][_0x1330d3(0x65b)](VisuMZ[_0x1330d3(0x3ae)][_0x1330d3(0x622)][_0x1330d3(0x812)][_0x337e6d])){var _0x105422=Number(RegExp['$1']);_0x3d6e58+=_0x105422;}if(_0x2a61ad[_0x1330d3(0x526)][_0x1330d3(0x65b)](VisuMZ[_0x1330d3(0x3ae)][_0x1330d3(0x622)][_0x1330d3(0x557)][_0x337e6d])){var _0x5e8ea0=String(RegExp['$1']);_0x5e8ea0=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x5e8ea0);try{_0x3d6e58+=eval(_0x5e8ea0);}catch(_0x3dfcf2){if($gameTemp['isPlaytest']())console[_0x1330d3(0x405)](_0x3dfcf2);}}return _0x3d6e58;};return this['traitObjects']()['reduce'](_0x5a03ba,this[_0x27cc40(0x298)][_0x337e6d]);},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x31d)]=function(_0x278586){const _0x579b2f=_0x55ae0c;var _0x4535cc=_0x579b2f(0x81f)+(this['isActor']()?_0x579b2f(0x2e3):_0x579b2f(0x5cf))+_0x579b2f(0x5ec)+_0x278586;if(this['checkCacheKey'](_0x4535cc))return this[_0x579b2f(0x27f)][_0x4535cc];this[_0x579b2f(0x27f)][_0x4535cc]=eval(VisuMZ[_0x579b2f(0x3ae)][_0x579b2f(0x6c3)][_0x579b2f(0x94d)][_0x4535cc]);const _0xa7ab86=(_0xd84870,_0x3997ba)=>{const _0x1a12ca=_0x579b2f;if(!_0x3997ba)return _0xd84870;if(_0x3997ba[_0x1a12ca(0x526)][_0x1a12ca(0x65b)](VisuMZ[_0x1a12ca(0x3ae)]['RegExp'][_0x1a12ca(0x31d)][_0x278586])){var _0x1e6bed=Number(RegExp['$1']);if(_0x1e6bed===0x0)_0x1e6bed=Number['MAX_SAFE_INTEGER'];_0xd84870=Math[_0x1a12ca(0x391)](_0xd84870,_0x1e6bed);}if(_0x3997ba[_0x1a12ca(0x526)][_0x1a12ca(0x65b)](VisuMZ['CoreEngine'][_0x1a12ca(0x622)]['paramMaxJS'][_0x278586])){var _0x4bbe3a=String(RegExp['$1']);_0x4bbe3a=VisuMZ[_0x1a12ca(0x3ae)][_0x1a12ca(0x5c3)](_0x4bbe3a);try{_0xd84870=Math[_0x1a12ca(0x391)](_0xd84870,Number(eval(_0x4bbe3a)));}catch(_0x5e373c){if($gameTemp['isPlaytest']())console[_0x1a12ca(0x405)](_0x5e373c);}}return _0xd84870;};if(this['_cache'][_0x4535cc]===0x0)this[_0x579b2f(0x27f)][_0x4535cc]=Number['MAX_SAFE_INTEGER'];return this[_0x579b2f(0x27f)][_0x4535cc]=this['traitObjects']()[_0x579b2f(0x765)](_0xa7ab86,this[_0x579b2f(0x27f)][_0x4535cc]),this[_0x579b2f(0x27f)][_0x4535cc];},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x98e)]=function(_0x3c5c28){const _0x2e9e30=_0x55ae0c,_0x1eaa18=this[_0x2e9e30(0x279)](Game_BattlerBase[_0x2e9e30(0x196)],_0x3c5c28),_0x51061f=(_0x4a8fd5,_0x5b4db1)=>{const _0x5dc087=_0x2e9e30;if(!_0x5b4db1)return _0x4a8fd5;if(_0x5b4db1['note'][_0x5dc087(0x65b)](VisuMZ['CoreEngine'][_0x5dc087(0x622)][_0x5dc087(0x73f)][_0x3c5c28])){var _0x3da472=Number(RegExp['$1'])/0x64;_0x4a8fd5*=_0x3da472;}if(_0x5b4db1[_0x5dc087(0x526)][_0x5dc087(0x65b)](VisuMZ[_0x5dc087(0x3ae)][_0x5dc087(0x622)][_0x5dc087(0x6dc)][_0x3c5c28])){var _0x3da472=Number(RegExp['$1']);_0x4a8fd5*=_0x3da472;}if(_0x5b4db1[_0x5dc087(0x526)]['match'](VisuMZ[_0x5dc087(0x3ae)][_0x5dc087(0x622)][_0x5dc087(0x8c4)][_0x3c5c28])){var _0x586642=String(RegExp['$1']);_0x586642=VisuMZ['CoreEngine'][_0x5dc087(0x5c3)](_0x586642);try{_0x4a8fd5*=eval(_0x586642);}catch(_0x2f9720){if($gameTemp[_0x5dc087(0x6fd)]())console['log'](_0x2f9720);}}return _0x4a8fd5;};return this['traitObjects']()[_0x2e9e30(0x765)](_0x51061f,_0x1eaa18);},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x436)]=function(_0x464032){const _0x26587d=_0x55ae0c,_0xeda40d=(_0x49e5c2,_0x26e1ec)=>{const _0x1cc4a7=_0x1c19;if(!_0x26e1ec)return _0x49e5c2;if(_0x26e1ec[_0x1cc4a7(0x526)][_0x1cc4a7(0x65b)](VisuMZ[_0x1cc4a7(0x3ae)][_0x1cc4a7(0x622)]['paramFlat'][_0x464032])){var _0x257ef2=Number(RegExp['$1']);_0x49e5c2+=_0x257ef2;}if(_0x26e1ec[_0x1cc4a7(0x526)][_0x1cc4a7(0x65b)](VisuMZ[_0x1cc4a7(0x3ae)][_0x1cc4a7(0x622)]['paramFlatJS'][_0x464032])){var _0x1966ee=String(RegExp['$1']);_0x1966ee=VisuMZ[_0x1cc4a7(0x3ae)]['JsReplaceUserVar'](_0x1966ee);try{_0x49e5c2+=eval(_0x1966ee);}catch(_0x28caa7){if($gameTemp[_0x1cc4a7(0x6fd)]())console[_0x1cc4a7(0x405)](_0x28caa7);}}return _0x49e5c2;};return this['traitObjects']()[_0x26587d(0x765)](_0xeda40d,0x0);},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x26b)]=function(_0x547fa6){const _0x282a17=_0x55ae0c;let _0x209114=_0x282a17(0x26b)+_0x547fa6+'Total';if(this[_0x282a17(0x209)](_0x209114))return this[_0x282a17(0x27f)][_0x209114];return this['_cache'][_0x209114]=Math['round'](VisuMZ['CoreEngine'][_0x282a17(0x6c3)][_0x282a17(0x94d)][_0x282a17(0x52c)][_0x282a17(0x67e)](this,_0x547fa6)),this[_0x282a17(0x27f)][_0x209114];},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x729)]=function(_0x416ded){const _0x1bc1ec=_0x55ae0c,_0x4227fe=(_0x41e829,_0x471d4e)=>{const _0x85ad3d=_0x1c19;if(!_0x471d4e)return _0x41e829;if(_0x471d4e[_0x85ad3d(0x526)][_0x85ad3d(0x65b)](VisuMZ['CoreEngine'][_0x85ad3d(0x622)][_0x85ad3d(0x2f9)][_0x416ded])){var _0x32ac95=Number(RegExp['$1'])/0x64;_0x41e829+=_0x32ac95;}if(_0x471d4e['note'][_0x85ad3d(0x65b)](VisuMZ[_0x85ad3d(0x3ae)][_0x85ad3d(0x622)][_0x85ad3d(0x342)][_0x416ded])){var _0x32ac95=Number(RegExp['$1']);_0x41e829+=_0x32ac95;}if(_0x471d4e[_0x85ad3d(0x526)]['match'](VisuMZ['CoreEngine'][_0x85ad3d(0x622)][_0x85ad3d(0x795)][_0x416ded])){var _0x1c5090=String(RegExp['$1']);_0x1c5090=VisuMZ[_0x85ad3d(0x3ae)][_0x85ad3d(0x5c3)](_0x1c5090);try{_0x41e829+=eval(_0x1c5090);}catch(_0x115625){if($gameTemp[_0x85ad3d(0x6fd)]())console['log'](_0x115625);}}return _0x41e829;};return this[_0x1bc1ec(0x326)]()[_0x1bc1ec(0x765)](_0x4227fe,0x0);},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x513)]=function(_0x300b57){const _0x2c2527=(_0x16667f,_0x5408ba)=>{const _0x40ed8e=_0x1c19;if(!_0x5408ba)return _0x16667f;if(_0x5408ba[_0x40ed8e(0x526)][_0x40ed8e(0x65b)](VisuMZ['CoreEngine']['RegExp'][_0x40ed8e(0x434)][_0x300b57])){var _0x241b98=Number(RegExp['$1'])/0x64;_0x16667f*=_0x241b98;}if(_0x5408ba[_0x40ed8e(0x526)]['match'](VisuMZ[_0x40ed8e(0x3ae)][_0x40ed8e(0x622)][_0x40ed8e(0x53d)][_0x300b57])){var _0x241b98=Number(RegExp['$1']);_0x16667f*=_0x241b98;}if(_0x5408ba[_0x40ed8e(0x526)][_0x40ed8e(0x65b)](VisuMZ[_0x40ed8e(0x3ae)][_0x40ed8e(0x622)][_0x40ed8e(0x1ca)][_0x300b57])){var _0x446653=String(RegExp['$1']);_0x446653=VisuMZ[_0x40ed8e(0x3ae)][_0x40ed8e(0x5c3)](_0x446653);try{_0x16667f*=eval(_0x446653);}catch(_0x4845d2){if($gameTemp[_0x40ed8e(0x6fd)]())console[_0x40ed8e(0x405)](_0x4845d2);}}return _0x16667f;};return this['traitObjects']()['reduce'](_0x2c2527,0x1);},Game_BattlerBase['prototype'][_0x55ae0c(0x742)]=function(_0x4915d7){const _0x569b87=_0x55ae0c,_0x4b22e2=(_0x2c802a,_0x241fdb)=>{const _0x4f327b=_0x1c19;if(!_0x241fdb)return _0x2c802a;if(_0x241fdb[_0x4f327b(0x526)][_0x4f327b(0x65b)](VisuMZ[_0x4f327b(0x3ae)][_0x4f327b(0x622)][_0x4f327b(0x48b)][_0x4915d7])){var _0x5e9488=Number(RegExp['$1'])/0x64;_0x2c802a+=_0x5e9488;}if(_0x241fdb[_0x4f327b(0x526)]['match'](VisuMZ[_0x4f327b(0x3ae)]['RegExp'][_0x4f327b(0x4f5)][_0x4915d7])){var _0x5e9488=Number(RegExp['$1']);_0x2c802a+=_0x5e9488;}if(_0x241fdb[_0x4f327b(0x526)][_0x4f327b(0x65b)](VisuMZ[_0x4f327b(0x3ae)]['RegExp']['xparamFlatJS'][_0x4915d7])){var _0x4cfcbe=String(RegExp['$1']);_0x4cfcbe=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x4cfcbe);try{_0x2c802a+=eval(_0x4cfcbe);}catch(_0x290675){if($gameTemp['isPlaytest']())console[_0x4f327b(0x405)](_0x290675);}}return _0x2c802a;};return this['traitObjects']()[_0x569b87(0x765)](_0x4b22e2,0x0);},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x442)]=function(_0x10ed0f){const _0x761467=_0x55ae0c;let _0x172186=_0x761467(0x442)+_0x10ed0f+_0x761467(0x39e);if(this['checkCacheKey'](_0x172186))return this[_0x761467(0x27f)][_0x172186];return this[_0x761467(0x27f)][_0x172186]=VisuMZ[_0x761467(0x3ae)][_0x761467(0x6c3)][_0x761467(0x94d)][_0x761467(0x19c)][_0x761467(0x67e)](this,_0x10ed0f),this[_0x761467(0x27f)][_0x172186];},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x2c0)]=function(_0x2e4c18){const _0x1d164b=_0x55ae0c,_0x4a6209=(_0x50f1d2,_0xd2d880)=>{const _0x437f4a=_0x1c19;if(!_0xd2d880)return _0x50f1d2;if(_0xd2d880[_0x437f4a(0x526)][_0x437f4a(0x65b)](VisuMZ[_0x437f4a(0x3ae)][_0x437f4a(0x622)][_0x437f4a(0x2db)][_0x2e4c18])){var _0x2142af=Number(RegExp['$1'])/0x64;_0x50f1d2+=_0x2142af;}if(_0xd2d880['note'][_0x437f4a(0x65b)](VisuMZ[_0x437f4a(0x3ae)]['RegExp'][_0x437f4a(0x299)][_0x2e4c18])){var _0x2142af=Number(RegExp['$1']);_0x50f1d2+=_0x2142af;}if(_0xd2d880['note'][_0x437f4a(0x65b)](VisuMZ[_0x437f4a(0x3ae)][_0x437f4a(0x622)]['sparamPlusJS'][_0x2e4c18])){var _0x3cce51=String(RegExp['$1']);_0x3cce51=VisuMZ[_0x437f4a(0x3ae)][_0x437f4a(0x5c3)](_0x3cce51);try{_0x50f1d2+=eval(_0x3cce51);}catch(_0x2ca1ba){if($gameTemp[_0x437f4a(0x6fd)]())console['log'](_0x2ca1ba);}}return _0x50f1d2;};return this['traitObjects']()[_0x1d164b(0x765)](_0x4a6209,0x0);},Game_BattlerBase[_0x55ae0c(0x792)]['sparamRate']=function(_0x41a851){const _0x3f6b72=_0x55ae0c,_0x21a989=(_0x76c4b9,_0x5c3ed0)=>{const _0x1906e2=_0x1c19;if(!_0x5c3ed0)return _0x76c4b9;if(_0x5c3ed0[_0x1906e2(0x526)][_0x1906e2(0x65b)](VisuMZ[_0x1906e2(0x3ae)][_0x1906e2(0x622)]['sparamRate1'][_0x41a851])){var _0x2fd32f=Number(RegExp['$1'])/0x64;_0x76c4b9*=_0x2fd32f;}if(_0x5c3ed0[_0x1906e2(0x526)][_0x1906e2(0x65b)](VisuMZ[_0x1906e2(0x3ae)][_0x1906e2(0x622)]['sparamRate2'][_0x41a851])){var _0x2fd32f=Number(RegExp['$1']);_0x76c4b9*=_0x2fd32f;}if(_0x5c3ed0[_0x1906e2(0x526)]['match'](VisuMZ[_0x1906e2(0x3ae)][_0x1906e2(0x622)][_0x1906e2(0x445)][_0x41a851])){var _0x36031b=String(RegExp['$1']);_0x36031b=VisuMZ[_0x1906e2(0x3ae)][_0x1906e2(0x5c3)](_0x36031b);try{_0x76c4b9*=eval(_0x36031b);}catch(_0x582cfb){if($gameTemp['isPlaytest']())console[_0x1906e2(0x405)](_0x582cfb);}}return _0x76c4b9;};return this[_0x3f6b72(0x326)]()[_0x3f6b72(0x765)](_0x21a989,0x1);},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x4c4)]=function(_0xc5d774){const _0x4b2e1c=_0x55ae0c,_0xe51c8c=(_0x322ef3,_0x2d1164)=>{const _0x132e75=_0x1c19;if(!_0x2d1164)return _0x322ef3;if(_0x2d1164[_0x132e75(0x526)]['match'](VisuMZ[_0x132e75(0x3ae)][_0x132e75(0x622)][_0x132e75(0x6c7)][_0xc5d774])){var _0x2c90ac=Number(RegExp['$1'])/0x64;_0x322ef3+=_0x2c90ac;}if(_0x2d1164[_0x132e75(0x526)]['match'](VisuMZ[_0x132e75(0x3ae)]['RegExp']['sparamFlat2'][_0xc5d774])){var _0x2c90ac=Number(RegExp['$1']);_0x322ef3+=_0x2c90ac;}if(_0x2d1164[_0x132e75(0x526)][_0x132e75(0x65b)](VisuMZ[_0x132e75(0x3ae)][_0x132e75(0x622)]['sparamFlatJS'][_0xc5d774])){var _0x35b892=String(RegExp['$1']);_0x35b892=VisuMZ[_0x132e75(0x3ae)][_0x132e75(0x5c3)](_0x35b892);try{_0x322ef3+=eval(_0x35b892);}catch(_0x308a6d){if($gameTemp[_0x132e75(0x6fd)]())console[_0x132e75(0x405)](_0x308a6d);}}return _0x322ef3;};return this['traitObjects']()[_0x4b2e1c(0x765)](_0xe51c8c,0x0);},Game_BattlerBase['prototype'][_0x55ae0c(0x559)]=function(_0x3355c6){const _0x3c7bcb=_0x55ae0c;let _0x3cf4b7=_0x3c7bcb(0x559)+_0x3355c6+'Total';if(this[_0x3c7bcb(0x209)](_0x3cf4b7))return this[_0x3c7bcb(0x27f)][_0x3cf4b7];return this[_0x3c7bcb(0x27f)][_0x3cf4b7]=VisuMZ['CoreEngine'][_0x3c7bcb(0x6c3)]['Param']['SParameterFormula'][_0x3c7bcb(0x67e)](this,_0x3355c6),this[_0x3c7bcb(0x27f)][_0x3cf4b7];},Game_BattlerBase[_0x55ae0c(0x792)][_0x55ae0c(0x280)]=function(_0x3dbb59,_0x528a33){const _0x457d53=_0x55ae0c;if(typeof paramId===_0x457d53(0x24d))return this[_0x457d53(0x26b)](_0x3dbb59);_0x3dbb59=String(_0x3dbb59||'')[_0x457d53(0x8d3)]();if(_0x3dbb59===_0x457d53(0x866))return this['param'](0x0);if(_0x3dbb59===_0x457d53(0x4f9))return this[_0x457d53(0x26b)](0x1);if(_0x3dbb59===_0x457d53(0x335))return this['param'](0x2);if(_0x3dbb59==='DEF')return this[_0x457d53(0x26b)](0x3);if(_0x3dbb59===_0x457d53(0x6fe))return this[_0x457d53(0x26b)](0x4);if(_0x3dbb59===_0x457d53(0x775))return this[_0x457d53(0x26b)](0x5);if(_0x3dbb59===_0x457d53(0x6b7))return this[_0x457d53(0x26b)](0x6);if(_0x3dbb59===_0x457d53(0x4a1))return this[_0x457d53(0x26b)](0x7);if(_0x3dbb59==='HIT')return _0x528a33?String(Math[_0x457d53(0x41d)](this['xparam'](0x0)*0x64))+'%':this[_0x457d53(0x442)](0x0);if(_0x3dbb59===_0x457d53(0x409))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x442)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x3dbb59==='CRI')return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x442)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x3dbb59==='CEV')return _0x528a33?String(Math['round'](this[_0x457d53(0x442)](0x3)*0x64))+'%':this[_0x457d53(0x442)](0x3);if(_0x3dbb59===_0x457d53(0x832))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x442)](0x4)*0x64))+'%':this[_0x457d53(0x442)](0x4);if(_0x3dbb59===_0x457d53(0x302))return _0x528a33?String(Math['round'](this[_0x457d53(0x442)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x3dbb59===_0x457d53(0x673))return _0x528a33?String(Math['round'](this[_0x457d53(0x442)](0x6)*0x64))+'%':this[_0x457d53(0x442)](0x6);if(_0x3dbb59===_0x457d53(0x5c7))return _0x528a33?String(Math[_0x457d53(0x41d)](this['xparam'](0x7)*0x64))+'%':this[_0x457d53(0x442)](0x7);if(_0x3dbb59==='MRG')return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x442)](0x8)*0x64))+'%':this[_0x457d53(0x442)](0x8);if(_0x3dbb59===_0x457d53(0x62f))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x442)](0x9)*0x64))+'%':this[_0x457d53(0x442)](0x9);if(_0x3dbb59===_0x457d53(0x506))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x0)*0x64))+'%':this[_0x457d53(0x559)](0x0);if(_0x3dbb59==='GRD')return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x1)*0x64))+'%':this[_0x457d53(0x559)](0x1);if(_0x3dbb59===_0x457d53(0x473))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x3dbb59===_0x457d53(0x807))return _0x528a33?String(Math['round'](this[_0x457d53(0x559)](0x3)*0x64))+'%':this[_0x457d53(0x559)](0x3);if(_0x3dbb59===_0x457d53(0x427))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x4)*0x64))+'%':this[_0x457d53(0x559)](0x4);if(_0x3dbb59===_0x457d53(0x1d2))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x5)*0x64))+'%':this[_0x457d53(0x559)](0x5);if(_0x3dbb59===_0x457d53(0x6ac))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x6)*0x64))+'%':this[_0x457d53(0x559)](0x6);if(_0x3dbb59===_0x457d53(0x3df))return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x7)*0x64))+'%':this[_0x457d53(0x559)](0x7);if(_0x3dbb59==='FDR')return _0x528a33?String(Math[_0x457d53(0x41d)](this[_0x457d53(0x559)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x3dbb59===_0x457d53(0x877))return _0x528a33?String(Math[_0x457d53(0x41d)](this['sparam'](0x9)*0x64))+'%':this[_0x457d53(0x559)](0x9);if(VisuMZ[_0x457d53(0x3ae)][_0x457d53(0x1de)][_0x3dbb59]){const _0x3d9a4c=VisuMZ[_0x457d53(0x3ae)][_0x457d53(0x1de)][_0x3dbb59],_0x563610=this[_0x3d9a4c];return VisuMZ[_0x457d53(0x3ae)][_0x457d53(0x3c8)][_0x3dbb59]==='integer'?_0x563610:_0x528a33?String(Math[_0x457d53(0x41d)](_0x563610*0x64))+'%':_0x563610;}return'';},Game_BattlerBase[_0x55ae0c(0x792)]['isDying']=function(){const _0x48a702=_0x55ae0c;return this[_0x48a702(0x3ab)]()&&this[_0x48a702(0x7f3)]<this['mhp']*VisuMZ[_0x48a702(0x3ae)][_0x48a702(0x6c3)][_0x48a702(0x94d)]['CrisisRate'];},Game_Battler['prototype'][_0x55ae0c(0x402)]=function(){const _0x379ccf=_0x55ae0c;SoundManager[_0x379ccf(0x940)](),this[_0x379ccf(0x22e)](_0x379ccf(0x565));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6b3)]=Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x5f3)],Game_Actor[_0x55ae0c(0x792)]['paramBase']=function(_0x57de08){const _0x22b79f=_0x55ae0c;if(this[_0x22b79f(0x26f)]>0x63)return this[_0x22b79f(0x392)](_0x57de08);return VisuMZ['CoreEngine']['Game_Actor_paramBase'][_0x22b79f(0x67e)](this,_0x57de08);},Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x392)]=function(_0xd4bd56){const _0x2fe96f=_0x55ae0c,_0x44a32b=this[_0x2fe96f(0x1af)]()[_0x2fe96f(0x6f5)][_0xd4bd56][0x63],_0x120d2a=this[_0x2fe96f(0x1af)]()[_0x2fe96f(0x6f5)][_0xd4bd56][0x62];return _0x44a32b+(_0x44a32b-_0x120d2a)*(this[_0x2fe96f(0x26f)]-0x63);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x21d)]=Game_Actor['prototype']['changeClass'],Game_Actor['prototype'][_0x55ae0c(0x348)]=function(_0x5a7eac,_0x281ff6){const _0x1eb923=_0x55ae0c;$gameTemp['_changingClass']=!![],VisuMZ[_0x1eb923(0x3ae)]['Game_Actor_changeClass'][_0x1eb923(0x67e)](this,_0x5a7eac,_0x281ff6),$gameTemp[_0x1eb923(0x4c9)]=undefined;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x831)]=Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x808)],Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x808)]=function(){const _0x440b8d=_0x55ae0c;VisuMZ['CoreEngine'][_0x440b8d(0x831)]['call'](this);if(!$gameTemp[_0x440b8d(0x4c9)])this[_0x440b8d(0x88b)]();},Game_Actor['prototype'][_0x55ae0c(0x88b)]=function(){const _0x58f0fa=_0x55ae0c;this[_0x58f0fa(0x27f)]={};if(VisuMZ['CoreEngine'][_0x58f0fa(0x6c3)][_0x58f0fa(0x5fa)][_0x58f0fa(0x274)])this[_0x58f0fa(0x7f3)]=this['mhp'];if(VisuMZ[_0x58f0fa(0x3ae)][_0x58f0fa(0x6c3)]['QoL'][_0x58f0fa(0x3cb)])this[_0x58f0fa(0x7bc)]=this[_0x58f0fa(0x87d)];},Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x59a)]=function(){const _0x5d29ef=_0x55ae0c;if(this[_0x5d29ef(0x876)]())return 0x1;const _0x46514d=this['nextLevelExp']()-this[_0x5d29ef(0x3f4)](),_0x3057bc=this['currentExp']()-this['currentLevelExp']();return(_0x3057bc/_0x46514d)[_0x5d29ef(0x621)](0x0,0x1);},Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x326)]=function(){const _0x5dfa33=_0x55ae0c,_0x5355e2=Game_Battler[_0x5dfa33(0x792)]['traitObjects'][_0x5dfa33(0x67e)](this);for(const _0x59cc0a of this[_0x5dfa33(0x4d4)]()){_0x59cc0a&&_0x5355e2['push'](_0x59cc0a);}return _0x5355e2[_0x5dfa33(0x87e)](this[_0x5dfa33(0x1af)](),this[_0x5dfa33(0x6ce)]()),_0x5355e2;},VisuMZ[_0x55ae0c(0x3ae)]['Game_Actor_isPreserveTp']=Game_Actor[_0x55ae0c(0x792)]['isPreserveTp'],Game_Actor['prototype']['isPreserveTp']=function(){const _0x58c457=_0x55ae0c;if(!$gameParty[_0x58c457(0x56e)]())return!![];return VisuMZ['CoreEngine'][_0x58c457(0x8cb)]['call'](this);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x23a)]=Game_Unit[_0x55ae0c(0x792)][_0x55ae0c(0x305)],Game_Unit['prototype'][_0x55ae0c(0x305)]=function(_0x21a168){const _0x46d12d=_0x55ae0c;this['_inBattle']=!![],VisuMZ[_0x46d12d(0x3ae)][_0x46d12d(0x23a)][_0x46d12d(0x67e)](this,_0x21a168);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x901)]=Game_Unit[_0x55ae0c(0x792)][_0x55ae0c(0x6d0)],Game_Unit[_0x55ae0c(0x792)]['onBattleEnd']=function(){const _0x59644a=_0x55ae0c;for(const _0x309c2d of this[_0x59644a(0x63b)]()){_0x309c2d&&!_0x309c2d[_0x59644a(0x201)]()&&_0x309c2d[_0x59644a(0x429)]();}VisuMZ[_0x59644a(0x3ae)]['Game_Unit_onBattleEnd'][_0x59644a(0x67e)](this);},Object[_0x55ae0c(0x522)](Game_Enemy['prototype'],_0x55ae0c(0x26f),{'get':function(){const _0x5f0268=_0x55ae0c;return this[_0x5f0268(0x2b7)]();},'configurable':!![]}),Game_Enemy[_0x55ae0c(0x792)][_0x55ae0c(0x2b7)]=function(){const _0x3d7338=_0x55ae0c;return this[_0x3d7338(0x4db)]()[_0x3d7338(0x26f)];},Game_Enemy[_0x55ae0c(0x792)]['moveRelativeToResolutionChange']=function(){const _0x3e3364=_0x55ae0c;!this[_0x3e3364(0x682)]&&(this[_0x3e3364(0x2ec)]+=Math[_0x3e3364(0x41d)]((Graphics[_0x3e3364(0x555)]-0x270)/0x2),this[_0x3e3364(0x2ec)]-=Math[_0x3e3364(0x49a)]((Graphics[_0x3e3364(0x555)]-Graphics[_0x3e3364(0x6bc)])/0x2),$gameSystem[_0x3e3364(0x905)]()?this[_0x3e3364(0x6b9)]-=Math[_0x3e3364(0x49a)]((Graphics[_0x3e3364(0x780)]-Graphics['boxWidth'])/0x2):this[_0x3e3364(0x6b9)]+=Math[_0x3e3364(0x41d)]((Graphics[_0x3e3364(0x508)]-0x330)/0x2)),this[_0x3e3364(0x682)]=!![];},Game_Party['prototype'][_0x55ae0c(0x95e)]=function(){const _0x5c922e=_0x55ae0c;return VisuMZ[_0x5c922e(0x3ae)]['Settings'][_0x5c922e(0x204)][_0x5c922e(0x969)];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2cb)]=Game_Party[_0x55ae0c(0x792)][_0x55ae0c(0x97e)],Game_Party['prototype'][_0x55ae0c(0x97e)]=function(_0x13f4ba){const _0x5dc18f=_0x55ae0c;if(VisuMZ[_0x5dc18f(0x3ae)]['Settings']['QoL'][_0x5dc18f(0x717)]&&DataManager[_0x5dc18f(0x91b)](_0x13f4ba))return;VisuMZ[_0x5dc18f(0x3ae)][_0x5dc18f(0x2cb)]['call'](this,_0x13f4ba);},Game_Party['prototype'][_0x55ae0c(0x605)]=function(){const _0x51f14f=_0x55ae0c,_0x1857ba=VisuMZ[_0x51f14f(0x3ae)][_0x51f14f(0x6c3)][_0x51f14f(0x5fa)],_0x4259d3=_0x1857ba[_0x51f14f(0x619)]??0x63;let _0x4839e0=[];(_0x1857ba['BTestItems']??!![])&&(_0x4839e0=_0x4839e0[_0x51f14f(0x892)]($dataItems));(_0x1857ba[_0x51f14f(0x665)]??!![])&&(_0x4839e0=_0x4839e0[_0x51f14f(0x892)]($dataWeapons));(_0x1857ba[_0x51f14f(0x755)]??!![])&&(_0x4839e0=_0x4839e0[_0x51f14f(0x892)]($dataArmors));for(const _0x554f6c of _0x4839e0){if(!_0x554f6c)continue;if(_0x554f6c['name']['trim']()<=0x0)continue;if(_0x554f6c[_0x51f14f(0x61b)][_0x51f14f(0x65b)](/-----/i))continue;this[_0x51f14f(0x3f6)](_0x554f6c,_0x4259d3);}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1d1)]=Game_Troop['prototype']['setup'],Game_Troop[_0x55ae0c(0x792)]['setup']=function(_0x5abd75){const _0x49c721=_0x55ae0c;$gameTemp[_0x49c721(0x8e0)](),$gameTemp[_0x49c721(0x3f7)](_0x5abd75),VisuMZ[_0x49c721(0x3ae)][_0x49c721(0x1d1)][_0x49c721(0x67e)](this,_0x5abd75);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x78a)]=Game_Map[_0x55ae0c(0x792)]['setup'],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x24e)]=function(_0x4b244d){const _0x1bcf63=_0x55ae0c;VisuMZ[_0x1bcf63(0x3ae)][_0x1bcf63(0x78a)][_0x1bcf63(0x67e)](this,_0x4b244d),this[_0x1bcf63(0x7ca)](),this[_0x1bcf63(0x57b)](_0x4b244d),this[_0x1bcf63(0x486)]();},Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x57b)]=function(){const _0x830312=_0x55ae0c;this[_0x830312(0x358)]=VisuMZ[_0x830312(0x3ae)][_0x830312(0x6c3)][_0x830312(0x5fa)][_0x830312(0x79a)]||![];const _0x4adfad=VisuMZ[_0x830312(0x3ae)][_0x830312(0x6c3)][_0x830312(0x824)],_0x1b14c8=$dataMap?$dataMap[_0x830312(0x526)]||'':'';if(_0x1b14c8[_0x830312(0x65b)](/<SHOW TILE SHADOWS>/i))this[_0x830312(0x358)]=![];else _0x1b14c8[_0x830312(0x65b)](/<HIDE TILE SHADOWS>/i)&&(this[_0x830312(0x358)]=!![]);if(_0x1b14c8[_0x830312(0x65b)](/<SCROLL LOCK X>/i))this[_0x830312(0x93d)]()[_0x830312(0x22b)]=!![],this['centerCameraCheckData']()['displayX']=_0x4adfad[_0x830312(0x719)];else _0x1b14c8[_0x830312(0x65b)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x830312(0x93d)]()[_0x830312(0x22b)]=!![],this[_0x830312(0x93d)]()[_0x830312(0x3e4)]=Number(RegExp['$1']));if(_0x1b14c8[_0x830312(0x65b)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()[_0x830312(0x813)]=!![],this[_0x830312(0x93d)]()['displayY']=_0x4adfad['DisplayLockY'];else _0x1b14c8['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x830312(0x93d)]()[_0x830312(0x813)]=!![],this['centerCameraCheckData']()[_0x830312(0x789)]=Number(RegExp['$1']));},Game_Map[_0x55ae0c(0x792)]['areTileShadowsHidden']=function(){const _0x30165c=_0x55ae0c;if(this[_0x30165c(0x358)]===undefined)this[_0x30165c(0x57b)]();return this[_0x30165c(0x358)];},Game_Map['prototype'][_0x55ae0c(0x7ca)]=function(){const _0x23bc3d=_0x55ae0c,_0x36c3a9=VisuMZ[_0x23bc3d(0x3ae)][_0x23bc3d(0x6c3)][_0x23bc3d(0x824)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x36c3a9[_0x23bc3d(0x40a)]){const _0xd0b7e5=Graphics['width']/this[_0x23bc3d(0x7ce)]();_0xd0b7e5%0x1!==0x0&&Math[_0x23bc3d(0x478)](_0xd0b7e5)===this[_0x23bc3d(0x780)]()&&!this['isLoopHorizontal']()&&(this[_0x23bc3d(0x479)][_0x23bc3d(0x22b)]=!![],this[_0x23bc3d(0x479)][_0x23bc3d(0x3e4)]=_0x36c3a9['DisplayLockX']||0x0);}if(_0x36c3a9[_0x23bc3d(0x66f)]){const _0x47ab9a=Graphics[_0x23bc3d(0x555)]/this[_0x23bc3d(0x2a3)]();_0x47ab9a%0x1!==0x0&&Math['ceil'](_0x47ab9a)===this[_0x23bc3d(0x555)]()&&!this[_0x23bc3d(0x455)]()&&(this[_0x23bc3d(0x479)][_0x23bc3d(0x813)]=!![],this[_0x23bc3d(0x479)][_0x23bc3d(0x789)]=_0x36c3a9[_0x23bc3d(0x203)]||0x0);}$gameScreen[_0x23bc3d(0x657)]()===0x1&&(this[_0x23bc3d(0x93d)]()[_0x23bc3d(0x22b)]&&(this[_0x23bc3d(0x7b5)]=this[_0x23bc3d(0x93d)]()['displayX']),this[_0x23bc3d(0x93d)]()[_0x23bc3d(0x813)]&&(this[_0x23bc3d(0x3fa)]=this[_0x23bc3d(0x93d)]()[_0x23bc3d(0x789)]));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6cc)]=Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x999)],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x999)]=function(_0x2319df,_0x149628){const _0x1ef1c5=_0x55ae0c;VisuMZ['CoreEngine'][_0x1ef1c5(0x6cc)]['call'](this,_0x2319df,_0x149628),$gameScreen[_0x1ef1c5(0x657)]()===0x1&&(!this[_0x1ef1c5(0x3e6)]()&&this[_0x1ef1c5(0x93d)]()[_0x1ef1c5(0x22b)]&&(this[_0x1ef1c5(0x7b5)]=this[_0x1ef1c5(0x93d)]()[_0x1ef1c5(0x3e4)]),!this[_0x1ef1c5(0x455)]()&&this[_0x1ef1c5(0x93d)]()[_0x1ef1c5(0x813)]&&(this[_0x1ef1c5(0x3fa)]=this[_0x1ef1c5(0x93d)]()[_0x1ef1c5(0x789)]));},Game_Map[_0x55ae0c(0x792)]['centerCameraCheckData']=function(){const _0x493b70=_0x55ae0c;if(this[_0x493b70(0x479)]===undefined)this['checkCoreEngineDisplayCenter']();return this['_centerCameraCheck'];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x46f)]=Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x1fc)],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x1fc)]=function(_0x402b69){const _0x38c8cf=_0x55ae0c;if(this[_0x38c8cf(0x93d)]()[_0x38c8cf(0x813)]&&$gameScreen[_0x38c8cf(0x657)]()===0x1){this[_0x38c8cf(0x3fa)]=this[_0x38c8cf(0x93d)]()[_0x38c8cf(0x789)];return;}VisuMZ[_0x38c8cf(0x3ae)][_0x38c8cf(0x46f)][_0x38c8cf(0x67e)](this,_0x402b69);},VisuMZ['CoreEngine']['Game_Map_scrollLeft']=Game_Map['prototype'][_0x55ae0c(0x1e2)],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x1e2)]=function(_0x449bfe){const _0x48aaaa=_0x55ae0c;if(this[_0x48aaaa(0x93d)]()[_0x48aaaa(0x22b)]&&$gameScreen[_0x48aaaa(0x657)]()===0x1){this[_0x48aaaa(0x7b5)]=this[_0x48aaaa(0x93d)]()['displayX'];return;}VisuMZ[_0x48aaaa(0x3ae)]['Game_Map_scrollLeft'][_0x48aaaa(0x67e)](this,_0x449bfe);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x8f6)]=Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x497)],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x497)]=function(_0x4d2e34){const _0x406797=_0x55ae0c;if(this['centerCameraCheckData']()[_0x406797(0x22b)]&&$gameScreen[_0x406797(0x657)]()===0x1){this['_displayX']=this['centerCameraCheckData']()[_0x406797(0x3e4)];return;}VisuMZ[_0x406797(0x3ae)][_0x406797(0x8f6)][_0x406797(0x67e)](this,_0x4d2e34);},VisuMZ['CoreEngine'][_0x55ae0c(0x40f)]=Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x253)],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x253)]=function(_0x5968a3){const _0x5e53be=_0x55ae0c;if(this[_0x5e53be(0x93d)]()[_0x5e53be(0x813)]&&$gameScreen['zoomScale']()===0x1){this[_0x5e53be(0x3fa)]=this[_0x5e53be(0x93d)]()[_0x5e53be(0x789)];return;}VisuMZ[_0x5e53be(0x3ae)][_0x5e53be(0x40f)][_0x5e53be(0x67e)](this,_0x5968a3);},Game_Map[_0x55ae0c(0x792)]['setupTileExtendTerrainTags']=function(){const _0x2982d6=_0x55ae0c;this[_0x2982d6(0x6ee)]={};const _0x35f77c=this[_0x2982d6(0x4b2)]();if(!_0x35f77c)return{};const _0x36be30=_0x35f77c[_0x2982d6(0x526)]||'',_0x31f96d=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x35cbe8={};const _0x217470=_0x36be30['match'](_0x31f96d);if(_0x217470)for(const _0x55b7d1 of _0x217470){_0x55b7d1[_0x2982d6(0x65b)](_0x31f96d);const _0x1aa3eb=Number(RegExp['$1'])[_0x2982d6(0x621)](0x1,0x10),_0x56da49=String(RegExp['$2'])[_0x2982d6(0x43e)](',')[_0x2982d6(0x776)](_0x3e8e6c=>Number(_0x3e8e6c)[_0x2982d6(0x621)](0x1,0x7));for(const _0x9c3179 of _0x56da49){_0x35cbe8[_0x9c3179]=_0x1aa3eb;}}this[_0x2982d6(0x6ee)]=_0x35cbe8;},Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x78f)]=function(){const _0x11afd0=_0x55ae0c;if(this['_tileExtendTerrainTags']===undefined)this[_0x11afd0(0x486)]();return this[_0x11afd0(0x6ee)];},Game_Map['prototype']['isTileExtended']=function(_0x3e1437){const _0x2c014a=_0x55ae0c;if(_0x3e1437>=0x400)return![];const _0x472043=$gameMap[_0x2c014a(0x78f)]();if(Object[_0x2c014a(0x470)](_0x472043)[_0x2c014a(0x616)]<=0x0)return![];const _0x568a7b=this['tilesetFlags'](),_0x157cf3=_0x568a7b[_0x3e1437]>>0xc,_0x6fd623=_0x472043[_0x157cf3]||0x0;return _0x6fd623>0x0;},VisuMZ[_0x55ae0c(0x3ae)]['Game_Map_changeTileset']=Game_Map['prototype'][_0x55ae0c(0x44e)],Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x44e)]=function(_0x2ef383){const _0x579496=_0x55ae0c;VisuMZ[_0x579496(0x3ae)]['Game_Map_changeTileset'][_0x579496(0x67e)](this,_0x2ef383),this[_0x579496(0x8d5)](),SceneManager['_scene'][_0x579496(0x5d7)]['update']();},Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x8d5)]=function(){const _0x3b12a1=_0x55ae0c,_0x279089=this['getTileExtendTerrainTags']();if(Object[_0x3b12a1(0x470)](_0x279089)['length']<=0x0)return;const _0x5f27f2=SceneManager[_0x3b12a1(0x1a1)]['_spriteset'];_0x5f27f2&&(_0x5f27f2[_0x3b12a1(0x57f)]&&_0x5f27f2[_0x3b12a1(0x57f)](),_0x5f27f2[_0x3b12a1(0x79e)]&&_0x5f27f2['createTileExtendSprites']());},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1c4)]=Game_Character['prototype'][_0x55ae0c(0x428)],Game_Character[_0x55ae0c(0x792)][_0x55ae0c(0x428)]=function(_0x36cfe8){const _0x2714c2=_0x55ae0c;try{VisuMZ[_0x2714c2(0x3ae)][_0x2714c2(0x1c4)][_0x2714c2(0x67e)](this,_0x36cfe8);}catch(_0x5cea4e){if($gameTemp[_0x2714c2(0x6fd)]())console[_0x2714c2(0x405)](_0x5cea4e);}},Game_Player[_0x55ae0c(0x792)][_0x55ae0c(0x6da)]=function(){const _0x2888cd=_0x55ae0c,_0x1ca194=$gameMap[_0x2888cd(0x749)]();this[_0x2888cd(0x243)]=Math[_0x2888cd(0x6f1)](_0x1ca194)+Math[_0x2888cd(0x6f1)](_0x1ca194)+this[_0x2888cd(0x518)]();},Game_Player[_0x55ae0c(0x792)][_0x55ae0c(0x518)]=function(){const _0x116978=_0x55ae0c;return $dataMap&&$dataMap[_0x116978(0x526)]&&$dataMap['note'][_0x116978(0x65b)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x116978(0x6c3)][_0x116978(0x5fa)][_0x116978(0x35f)];},VisuMZ[_0x55ae0c(0x3ae)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x55ae0c(0x792)][_0x55ae0c(0x7f7)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x499304,_0x56c4a5){const _0x1fce10=_0x55ae0c;return this[_0x1fce10(0x364)]()?this[_0x1fce10(0x212)](_0x499304,_0x56c4a5):VisuMZ[_0x1fce10(0x3ae)][_0x1fce10(0x2fb)][_0x1fce10(0x67e)](this,_0x499304,_0x56c4a5);},Game_Event[_0x55ae0c(0x792)][_0x55ae0c(0x364)]=function(){const _0x5829b7=_0x55ae0c;return VisuMZ[_0x5829b7(0x3ae)][_0x5829b7(0x6c3)]['QoL'][_0x5829b7(0x554)];},Game_Event[_0x55ae0c(0x792)][_0x55ae0c(0x212)]=function(_0x56dc35,_0x2f4750){const _0x1d518e=_0x55ae0c;if(!this[_0x1d518e(0x8c5)]())return![];else{const _0x1dd72c=$gameMap[_0x1d518e(0x5fd)](_0x56dc35,_0x2f4750)[_0x1d518e(0x70f)](_0x50ca79=>_0x50ca79['isNormalPriority']());return _0x1dd72c[_0x1d518e(0x616)]>0x0;}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x3db)]=Game_Interpreter[_0x55ae0c(0x792)]['command105'],Game_Interpreter['prototype'][_0x55ae0c(0x214)]=function(_0x1b1acb){const _0x79ebd0=_0x55ae0c,_0xebe82d=this[_0x79ebd0(0x25a)]();return _0xebe82d[_0x79ebd0(0x65b)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x79ebd0(0x26c)](_0xebe82d):VisuMZ[_0x79ebd0(0x3ae)][_0x79ebd0(0x3db)][_0x79ebd0(0x67e)](this,_0x1b1acb);},Game_Interpreter[_0x55ae0c(0x792)]['getCombinedScrollingText']=function(){const _0x41ca4d=_0x55ae0c;let _0xefd540='',_0x53297f=this[_0x41ca4d(0x82e)]+0x1;while(this[_0x41ca4d(0x891)][_0x53297f]&&this[_0x41ca4d(0x891)][_0x53297f][_0x41ca4d(0x60c)]===0x195){_0xefd540+=this[_0x41ca4d(0x891)][_0x53297f][_0x41ca4d(0x60e)][0x0]+'\x0a',_0x53297f++;}return _0xefd540;},Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x26c)]=function(_0xd1884b){const _0x4a10dd=_0x55ae0c;try{eval(_0xd1884b);}catch(_0x34a2c6){$gameTemp[_0x4a10dd(0x6fd)]()&&(console['log'](_0x4a10dd(0x4d7)),console[_0x4a10dd(0x405)](_0x34a2c6));}return!![];},VisuMZ['CoreEngine'][_0x55ae0c(0x365)]=Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x223)],Game_Interpreter['prototype'][_0x55ae0c(0x223)]=function(_0x4a30d3){const _0xc5f35f=_0x55ae0c;try{VisuMZ[_0xc5f35f(0x3ae)][_0xc5f35f(0x365)][_0xc5f35f(0x67e)](this,_0x4a30d3);}catch(_0x2668db){$gameTemp[_0xc5f35f(0x6fd)]()&&(console['log'](_0xc5f35f(0x44d)),console[_0xc5f35f(0x405)](_0x2668db)),this[_0xc5f35f(0x868)]();}return!![];},VisuMZ[_0x55ae0c(0x3ae)]['Game_Interpreter_command122']=Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x419)],Game_Interpreter['prototype']['command122']=function(_0x508e60){const _0x549919=_0x55ae0c;try{VisuMZ[_0x549919(0x3ae)][_0x549919(0x721)][_0x549919(0x67e)](this,_0x508e60);}catch(_0x51379f){$gameTemp[_0x549919(0x6fd)]()&&(console['log'](_0x549919(0x542)),console['log'](_0x51379f));}return!![];},VisuMZ['CoreEngine'][_0x55ae0c(0x913)]=Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x73b)],Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x73b)]=function(){const _0x101726=_0x55ae0c;try{VisuMZ[_0x101726(0x3ae)][_0x101726(0x913)][_0x101726(0x67e)](this);}catch(_0x2bbf55){$gameTemp[_0x101726(0x6fd)]()&&(console['log'](_0x101726(0x6b5)),console[_0x101726(0x405)](_0x2bbf55));}return!![];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x8f7)]=Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x6e4)],Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x6e4)]=function(_0x4e21d9){const _0x17e7a9=_0x55ae0c;return $gameTemp[_0x17e7a9(0x722)](this),VisuMZ[_0x17e7a9(0x3ae)]['Game_Interpreter_PluginCommand'][_0x17e7a9(0x67e)](this,_0x4e21d9);},Scene_Base[_0x55ae0c(0x792)]['fadeSpeed']=function(){const _0x59c5bf=_0x55ae0c;return VisuMZ['CoreEngine'][_0x59c5bf(0x6c3)]['UI'][_0x59c5bf(0x7e4)];},Scene_Base[_0x55ae0c(0x792)]['isBottomHelpMode']=function(){const _0x5cad33=_0x55ae0c;return VisuMZ[_0x5cad33(0x3ae)][_0x5cad33(0x6c3)]['UI'][_0x5cad33(0x507)];},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x2f8)]=function(){const _0x13705c=_0x55ae0c;return VisuMZ[_0x13705c(0x3ae)]['Settings']['UI']['BottomButtons'];},Scene_Base['prototype']['isRightInputMode']=function(){const _0x55dce1=_0x55ae0c;return VisuMZ['CoreEngine']['Settings']['UI'][_0x55dce1(0x22f)];},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x56b)]=function(){const _0x4011a2=_0x55ae0c;return VisuMZ[_0x4011a2(0x3ae)][_0x4011a2(0x6c3)]['UI'][_0x4011a2(0x53f)];},Scene_Base[_0x55ae0c(0x792)]['buttonAreaHeight']=function(){const _0x35d5dc=_0x55ae0c;return VisuMZ[_0x35d5dc(0x3ae)]['Settings']['UI'][_0x35d5dc(0x423)];},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x31a)]=function(){const _0x1c7ba1=_0x55ae0c;return VisuMZ[_0x1c7ba1(0x3ae)][_0x1c7ba1(0x6c3)][_0x1c7ba1(0x3ec)][_0x1c7ba1(0x70e)];},VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']=Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x33a)],Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x33a)]=function(){const _0x4b9368=_0x55ae0c;VisuMZ[_0x4b9368(0x3ae)][_0x4b9368(0x81e)][_0x4b9368(0x67e)](this),this['createButtonAssistWindow'](),this[_0x4b9368(0x727)](),this['_windowLayer']['x']=Math[_0x4b9368(0x41d)](this[_0x4b9368(0x1a8)]['x']),this[_0x4b9368(0x1a8)]['y']=Math[_0x4b9368(0x41d)](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x55ae0c(0x87f)]=function(){},Scene_Base[_0x55ae0c(0x792)]['createTextPopupWindow']=function(){const _0x3f1a8e=_0x55ae0c;this[_0x3f1a8e(0x1e5)]=new Window_TextPopup(),this['addChild'](this['_textPopupWindow']);},$textPopup=function(_0xe1dc83){const _0x24e55c=_0x55ae0c,_0x219189=SceneManager['_scene'][_0x24e55c(0x1e5)];_0x219189&&_0x219189['addQueue'](_0xe1dc83);},Scene_Base['prototype'][_0x55ae0c(0x4c3)]=function(){const _0x4365c5=_0x55ae0c;return TextManager[_0x4365c5(0x2f4)](_0x4365c5(0x310),'pagedown');},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x798)]=function(){const _0x10df67=_0x55ae0c;return TextManager[_0x10df67(0x2b0)](_0x10df67(0x385));},Scene_Base['prototype'][_0x55ae0c(0x4e6)]=function(){const _0x4a9714=_0x55ae0c;return TextManager[_0x4a9714(0x2b0)](_0x4a9714(0x770));},Scene_Base[_0x55ae0c(0x792)]['buttonAssistKey4']=function(){const _0x3ace23=_0x55ae0c;return TextManager[_0x3ace23(0x2b0)]('ok');},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x354)]=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x55ae0c(0x792)]['buttonAssistText1']=function(){const _0x2923d1=_0x55ae0c;return this[_0x2923d1(0x3be)]&&this['_pageupButton'][_0x2923d1(0x21e)]?TextManager[_0x2923d1(0x862)]:'';},Scene_Base['prototype']['buttonAssistText2']=function(){return'';},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x37e)]=function(){return'';},Scene_Base[_0x55ae0c(0x792)]['buttonAssistText4']=function(){const _0x39a3a2=_0x55ae0c;return TextManager[_0x39a3a2(0x28b)];},Scene_Base['prototype'][_0x55ae0c(0x33f)]=function(){const _0x2652d0=_0x55ae0c;return TextManager[_0x2652d0(0x8ad)];},Scene_Base['prototype'][_0x55ae0c(0x566)]=function(){return 0x0;},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x1d5)]=function(){return 0x0;},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x817)]=function(){return 0x0;},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x8fb)]=function(){return 0x0;},Scene_Base[_0x55ae0c(0x792)][_0x55ae0c(0x50e)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x55ae0c(0x29e)]=Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x70b)],Scene_Boot['prototype'][_0x55ae0c(0x70b)]=function(){const _0x1d0928=_0x55ae0c;VisuMZ[_0x1d0928(0x3ae)][_0x1d0928(0x29e)][_0x1d0928(0x67e)](this),this[_0x1d0928(0x1ef)]();},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x1ef)]=function(){const _0x4d7bf9=_0x55ae0c,_0x6356bb=[_0x4d7bf9(0x1f5),'battlebacks1',_0x4d7bf9(0x716),_0x4d7bf9(0x2b4),_0x4d7bf9(0x8c9),'faces','parallaxes','pictures',_0x4d7bf9(0x825),_0x4d7bf9(0x660),_0x4d7bf9(0x68a),'tilesets',_0x4d7bf9(0x69c),_0x4d7bf9(0x65e)];for(const _0x2ec0ce of _0x6356bb){const _0x73902c=VisuMZ[_0x4d7bf9(0x3ae)][_0x4d7bf9(0x6c3)][_0x4d7bf9(0x7d7)][_0x2ec0ce],_0x4af3ef=_0x4d7bf9(0x438)[_0x4d7bf9(0x703)](_0x2ec0ce);for(const _0x4c9cf7 of _0x73902c){ImageManager[_0x4d7bf9(0x6d9)](_0x4af3ef,_0x4c9cf7);}}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x598)]=Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x5cb)],Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x5cb)]=function(){const _0x51e299=_0x55ae0c;Utils[_0x51e299(0x4b0)]('test')&&VisuMZ[_0x51e299(0x3ae)]['Settings'][_0x51e299(0x5fa)]['NewGameBoot']?this[_0x51e299(0x666)]():VisuMZ[_0x51e299(0x3ae)]['Scene_Boot_startNormalGame'][_0x51e299(0x67e)](this);},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x666)]=function(){const _0x357bb1=_0x55ae0c;this[_0x357bb1(0x5b0)](),DataManager[_0x357bb1(0x88e)](),SceneManager[_0x357bb1(0x667)](Scene_Map);},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x593)]=function(){const _0x23a930=_0x55ae0c,_0x459a7b=$dataSystem[_0x23a930(0x787)]['uiAreaWidth'],_0x5e8696=$dataSystem[_0x23a930(0x787)][_0x23a930(0x596)],_0x26ee62=VisuMZ[_0x23a930(0x3ae)][_0x23a930(0x6c3)]['UI'][_0x23a930(0x7a1)];Graphics[_0x23a930(0x508)]=_0x459a7b-_0x26ee62*0x2,Graphics['boxHeight']=_0x5e8696-_0x26ee62*0x2,this[_0x23a930(0x690)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x37a)]=Scene_Boot[_0x55ae0c(0x792)]['updateDocumentTitle'],Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x221)]=function(){const _0x5cc9c9=_0x55ae0c;this[_0x5cc9c9(0x4dd)]()?this[_0x5cc9c9(0x92b)]():VisuMZ['CoreEngine'][_0x5cc9c9(0x37a)][_0x5cc9c9(0x67e)](this);},Scene_Boot['prototype'][_0x55ae0c(0x4dd)]=function(){const _0x19a5a4=_0x55ae0c;if(Scene_Title[_0x19a5a4(0x55d)]==='')return![];if(Scene_Title[_0x19a5a4(0x55d)]==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x19a5a4(0x8e9)]==='0.00')return![];return!![];},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x92b)]=function(){const _0x305aac=_0x55ae0c,_0x13b2c1=$dataSystem['gameTitle'],_0x3c1071=Scene_Title['subtitle']||'',_0x3ba28b=Scene_Title['version']||'',_0x5395de=VisuMZ['CoreEngine'][_0x305aac(0x6c3)][_0x305aac(0x8f4)][_0x305aac(0x5d4)][_0x305aac(0x5dd)],_0x3e3568=_0x5395de[_0x305aac(0x703)](_0x13b2c1,_0x3c1071,_0x3ba28b);document['title']=_0x3e3568;},Scene_Boot[_0x55ae0c(0x792)][_0x55ae0c(0x690)]=function(){const _0xcb8f4a=_0x55ae0c;if(VisuMZ[_0xcb8f4a(0x3ae)]['Settings']['UI'][_0xcb8f4a(0x27c)]){const _0x4ecd3d=Graphics[_0xcb8f4a(0x780)]-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0xcb8f4a(0x6c3)]['UI']['BoxMargin']*0x2,_0x153d94=Sprite_Button[_0xcb8f4a(0x792)][_0xcb8f4a(0x7c0)][_0xcb8f4a(0x67e)](this)*0x4;if(_0x4ecd3d>=_0x153d94)SceneManager[_0xcb8f4a(0x3e5)](!![]);}},Scene_Title[_0x55ae0c(0x55d)]=VisuMZ[_0x55ae0c(0x3ae)]['Settings'][_0x55ae0c(0x8f4)][_0x55ae0c(0x5d4)][_0x55ae0c(0x8a5)],Scene_Title['version']=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x8f4)][_0x55ae0c(0x5d4)][_0x55ae0c(0x210)],Scene_Title[_0x55ae0c(0x6e0)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['TitlePicButtons'],VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x524)]=Scene_Title[_0x55ae0c(0x792)][_0x55ae0c(0x2e6)],Scene_Title[_0x55ae0c(0x792)]['drawGameTitle']=function(){const _0x18c694=_0x55ae0c;VisuMZ[_0x18c694(0x3ae)][_0x18c694(0x6c3)][_0x18c694(0x8f4)][_0x18c694(0x5d4)][_0x18c694(0x2e6)]['call'](this);if(Scene_Title[_0x18c694(0x55d)]!==''&&Scene_Title[_0x18c694(0x55d)]!==_0x18c694(0x8a5))this[_0x18c694(0x691)]();if(Scene_Title['version']!==''&&Scene_Title[_0x18c694(0x8e9)]!==_0x18c694(0x27a))this[_0x18c694(0x521)]();},Scene_Title[_0x55ae0c(0x792)][_0x55ae0c(0x691)]=function(){const _0x50faa7=_0x55ae0c;VisuMZ[_0x50faa7(0x3ae)][_0x50faa7(0x6c3)][_0x50faa7(0x8f4)][_0x50faa7(0x5d4)][_0x50faa7(0x691)][_0x50faa7(0x67e)](this);},Scene_Title[_0x55ae0c(0x792)]['drawGameVersion']=function(){const _0x34fd1e=_0x55ae0c;VisuMZ[_0x34fd1e(0x3ae)]['Settings'][_0x34fd1e(0x8f4)][_0x34fd1e(0x5d4)][_0x34fd1e(0x521)][_0x34fd1e(0x67e)](this);},Scene_Title['prototype'][_0x55ae0c(0x4f8)]=function(){const _0xe81817=_0x55ae0c;this[_0xe81817(0x44a)]();const _0x401667=$dataSystem[_0xe81817(0x5a0)][_0xe81817(0x750)],_0x57df39=this[_0xe81817(0x883)]();this['_commandWindow']=new Window_TitleCommand(_0x57df39),this['_commandWindow'][_0xe81817(0x200)](_0x401667);const _0x1ce188=this[_0xe81817(0x883)]();this[_0xe81817(0x958)]['move'](_0x1ce188['x'],_0x1ce188['y'],_0x1ce188[_0xe81817(0x780)],_0x1ce188[_0xe81817(0x555)]),this[_0xe81817(0x958)]['createContents'](),this[_0xe81817(0x958)][_0xe81817(0x1a4)](),this[_0xe81817(0x958)][_0xe81817(0x448)](),this[_0xe81817(0x3fb)](this[_0xe81817(0x958)]);},Scene_Title[_0x55ae0c(0x792)]['commandWindowRows']=function(){const _0x5b21b9=_0x55ae0c;return this[_0x5b21b9(0x958)]?this[_0x5b21b9(0x958)]['maxItems']():VisuMZ[_0x5b21b9(0x3ae)][_0x5b21b9(0x6c3)][_0x5b21b9(0x4f6)][_0x5b21b9(0x616)];},Scene_Title[_0x55ae0c(0x792)][_0x55ae0c(0x883)]=function(){const _0x4a0196=_0x55ae0c;return VisuMZ[_0x4a0196(0x3ae)]['Settings'][_0x4a0196(0x8f4)][_0x4a0196(0x5d4)][_0x4a0196(0x589)][_0x4a0196(0x67e)](this);},Scene_Title[_0x55ae0c(0x792)]['createTitleButtons']=function(){const _0x474ef5=_0x55ae0c;for(const _0x4c414f of Scene_Title[_0x474ef5(0x6e0)]){const _0x9714cb=new Sprite_TitlePictureButton(_0x4c414f);this[_0x474ef5(0x359)](_0x9714cb);}},VisuMZ[_0x55ae0c(0x3ae)]['Scene_Map_initialize']=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)],Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(){const _0x440db1=_0x55ae0c;VisuMZ[_0x440db1(0x3ae)][_0x440db1(0x639)][_0x440db1(0x67e)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x440db1(0x4ed)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x216)]=Scene_Map['prototype'][_0x55ae0c(0x910)],Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x910)]=function(){const _0x47c561=_0x55ae0c;VisuMZ['CoreEngine'][_0x47c561(0x216)][_0x47c561(0x67e)](this),$gameTemp[_0x47c561(0x7cf)]&&!$gameMessage[_0x47c561(0x5aa)]()&&(this[_0x47c561(0x2c2)](),SceneManager[_0x47c561(0x481)]());},Scene_Map[_0x55ae0c(0x792)]['terminate']=function(){const _0x433a06=_0x55ae0c;Scene_Message[_0x433a06(0x792)][_0x433a06(0x20b)][_0x433a06(0x67e)](this),!SceneManager[_0x433a06(0x567)](Scene_Battle)&&(this[_0x433a06(0x5d7)]['update'](),this[_0x433a06(0x57c)][_0x433a06(0x3d2)](),this['_windowLayer'][_0x433a06(0x21e)]=![],SceneManager[_0x433a06(0x58d)]()),$gameScreen[_0x433a06(0x8c3)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x68f)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x797)],Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x797)]=function(){const _0x306000=_0x55ae0c;VisuMZ[_0x306000(0x3ae)][_0x306000(0x68f)][_0x306000(0x67e)](this),SceneManager[_0x306000(0x290)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x55ae0c(0x792)]['moveMenuButtonSideButtonLayout']=function(){const _0x48513b=_0x55ae0c;this[_0x48513b(0x769)]['x']=Graphics[_0x48513b(0x508)]+0x4;},VisuMZ['CoreEngine'][_0x55ae0c(0x989)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x2a8)],Scene_Map['prototype'][_0x55ae0c(0x2a8)]=function(){const _0x3462e6=_0x55ae0c;VisuMZ[_0x3462e6(0x3ae)][_0x3462e6(0x989)][_0x3462e6(0x67e)](this),this[_0x3462e6(0x61f)]();},Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x61f)]=function(){const _0x2b335c=_0x55ae0c;Input['isTriggered']('dashToggle')&&(ConfigManager['alwaysDash']=!ConfigManager[_0x2b335c(0x7f5)],ConfigManager[_0x2b335c(0x3fc)]());},VisuMZ['CoreEngine'][_0x55ae0c(0x487)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x2c2)],Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x2c2)]=function(){const _0x108737=_0x55ae0c;VisuMZ[_0x108737(0x3ae)][_0x108737(0x487)][_0x108737(0x67e)](this),this[_0x108737(0x726)]();},Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x4ed)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x726)]=function(){const _0x3be861=_0x55ae0c;if(!this[_0x3be861(0x5f2)])return;for(const _0x2b6f5b of this[_0x3be861(0x5f2)]){_0x2b6f5b&&_0x2b6f5b[_0x3be861(0x4e1)]();}},Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x4cb)]=function(_0x570b4c,_0x4050e3){const _0x1ef55c=_0x55ae0c,_0x5e4b07=$dataCommonEvents[_0x570b4c];if(!_0x5e4b07)return;const _0x2b4984=new Game_OnceParallelInterpreter();this[_0x1ef55c(0x57a)](_0x2b4984),_0x2b4984['setCommonEvent'](_0x570b4c),_0x2b4984[_0x1ef55c(0x1a0)](_0x4050e3);},Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x57a)]=function(_0x5f2dbb){const _0x27143f=_0x55ae0c;this[_0x27143f(0x5f2)]=this[_0x27143f(0x5f2)]||[],this['_onceParallelInterpreters']['push'](_0x5f2dbb);},Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x650)]=function(_0x138ef6){const _0x3adfaa=_0x55ae0c;this[_0x3adfaa(0x5f2)]=this[_0x3adfaa(0x5f2)]||[],this[_0x3adfaa(0x5f2)][_0x3adfaa(0x60f)](_0x138ef6);};function Game_OnceParallelInterpreter(){const _0xcfd54=_0x55ae0c;this[_0xcfd54(0x6e5)](...arguments);}Game_OnceParallelInterpreter[_0x55ae0c(0x792)]=Object[_0x55ae0c(0x6b4)](Game_Interpreter[_0x55ae0c(0x792)]),Game_OnceParallelInterpreter['prototype'][_0x55ae0c(0x68b)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x55ae0c(0x568)]=function(_0x2b1acb){const _0x47e230=_0x55ae0c,_0x172e4=$dataCommonEvents[_0x2b1acb];_0x172e4?this[_0x47e230(0x24e)](_0x172e4[_0x47e230(0x784)],0x0):this[_0x47e230(0x20b)]();},Game_OnceParallelInterpreter['prototype'][_0x55ae0c(0x1a0)]=function(_0x4b0336){const _0x4e32dd=_0x55ae0c;this[_0x4e32dd(0x64e)]=_0x4b0336||0x0;},Game_OnceParallelInterpreter[_0x55ae0c(0x792)][_0x55ae0c(0x20b)]=function(){const _0x321a58=_0x55ae0c;if(!SceneManager['isSceneMap']())return;SceneManager[_0x321a58(0x1a1)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x321a58(0x792)]['terminate'][_0x321a58(0x67e)](this);},VisuMZ['CoreEngine'][_0x55ae0c(0x1a2)]=Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x7a8)],Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x7a8)]=function(){const _0x37d365=_0x55ae0c;let _0x3d284a=0x0;return SceneManager[_0x37d365(0x4bf)]()?_0x3d284a=this[_0x37d365(0x38d)]():_0x3d284a=VisuMZ[_0x37d365(0x3ae)][_0x37d365(0x1a2)]['call'](this),_0x3d284a;},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x38d)]=function(){const _0x4b60f5=_0x55ae0c;return this['isBottomHelpMode']()?this[_0x4b60f5(0x867)]():0x0;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x28d)]=Scene_MenuBase['prototype']['mainAreaTop'],Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x600)]=function(){const _0x16b611=_0x55ae0c;return SceneManager[_0x16b611(0x4bf)]()?this['mainAreaTopSideButtonLayout']():VisuMZ[_0x16b611(0x3ae)][_0x16b611(0x28d)][_0x16b611(0x67e)](this);},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x93a)]=function(){const _0x5d5bc3=_0x55ae0c;if(!this[_0x5d5bc3(0x25d)]())return this[_0x5d5bc3(0x306)]();else return this['isMenuButtonAssistEnabled']()&&this[_0x5d5bc3(0x973)]()===_0x5d5bc3(0x953)?Window_ButtonAssist[_0x5d5bc3(0x792)][_0x5d5bc3(0x407)]():0x0;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x451)]=Scene_MenuBase[_0x55ae0c(0x792)]['mainAreaHeight'],Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x4b3)]=function(){const _0x517f2e=_0x55ae0c;let _0x57629e=0x0;return SceneManager[_0x517f2e(0x4bf)]()?_0x57629e=this[_0x517f2e(0x6aa)]():_0x57629e=VisuMZ[_0x517f2e(0x3ae)][_0x517f2e(0x451)][_0x517f2e(0x67e)](this),this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!==_0x517f2e(0x270)&&(_0x57629e-=Window_ButtonAssist[_0x517f2e(0x792)][_0x517f2e(0x407)]()),_0x57629e;},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x6aa)]=function(){const _0x323c6f=_0x55ae0c;return Graphics['boxHeight']-this[_0x323c6f(0x909)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x272)]=Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x828)],Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x828)]=function(){const _0x215206=_0x55ae0c,_0x2762fe=VisuMZ[_0x215206(0x3ae)][_0x215206(0x6c3)][_0x215206(0x885)][_0x215206(0x5d2)]??0x8;this[_0x215206(0x893)]=new PIXI['filters']['BlurFilter'](_0x2762fe),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager[_0x215206(0x413)](),this[_0x215206(0x415)][_0x215206(0x318)]=[this['_backgroundFilter']],this[_0x215206(0x359)](this['_backgroundSprite']),this['setBackgroundOpacity'](0xc0),this['setBackgroundOpacity'](this[_0x215206(0x5ff)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x5ff)]=function(){const _0x2347e2=_0x55ae0c,_0x255c2d=String(this['constructor'][_0x2347e2(0x61b)]),_0x7f6af=this[_0x2347e2(0x977)](_0x255c2d);return _0x7f6af?_0x7f6af[_0x2347e2(0x2a2)]:0xc0;},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x3cc)]=function(){const _0x5dd629=_0x55ae0c,_0x37dd73=String(this['constructor'][_0x5dd629(0x61b)]),_0x4dd7ee=this[_0x5dd629(0x977)](_0x37dd73);_0x4dd7ee&&(_0x4dd7ee[_0x5dd629(0x7e8)]!==''||_0x4dd7ee[_0x5dd629(0x1f0)]!=='')&&(this[_0x5dd629(0x19f)]=new Sprite(ImageManager[_0x5dd629(0x509)](_0x4dd7ee[_0x5dd629(0x7e8)])),this[_0x5dd629(0x42b)]=new Sprite(ImageManager[_0x5dd629(0x8f3)](_0x4dd7ee['BgFilename2'])),this['addChild'](this['_backSprite1']),this[_0x5dd629(0x359)](this[_0x5dd629(0x42b)]),this[_0x5dd629(0x19f)][_0x5dd629(0x5ce)][_0x5dd629(0x661)](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x5dd629(0x42b)][_0x5dd629(0x5ce)][_0x5dd629(0x661)](this[_0x5dd629(0x896)]['bind'](this,this[_0x5dd629(0x42b)])));},Scene_MenuBase[_0x55ae0c(0x792)]['getCustomBackgroundSettings']=function(_0x430239){const _0x506e1c=_0x55ae0c;return VisuMZ[_0x506e1c(0x3ae)]['Settings'][_0x506e1c(0x885)][_0x430239]||VisuMZ['CoreEngine'][_0x506e1c(0x6c3)][_0x506e1c(0x885)][_0x506e1c(0x583)];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x32e30b){const _0x114b6c=_0x55ae0c;this[_0x114b6c(0x1b4)](_0x32e30b),this[_0x114b6c(0x753)](_0x32e30b);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x76a)]=Scene_MenuBase[_0x55ae0c(0x792)]['createCancelButton'],Scene_MenuBase[_0x55ae0c(0x792)]['createCancelButton']=function(){const _0x5d0f1c=_0x55ae0c;VisuMZ[_0x5d0f1c(0x3ae)][_0x5d0f1c(0x76a)][_0x5d0f1c(0x67e)](this),SceneManager[_0x5d0f1c(0x290)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x55ae0c(0x792)]['moveCancelButtonSideButtonLayout']=function(){const _0x50d240=_0x55ae0c;this[_0x50d240(0x312)]['x']=Graphics[_0x50d240(0x508)]+0x4;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x289)]=Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x8f1)],Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x8f1)]=function(){const _0x4463b6=_0x55ae0c;VisuMZ[_0x4463b6(0x3ae)][_0x4463b6(0x289)][_0x4463b6(0x67e)](this),SceneManager['isSideButtonLayout']()&&this[_0x4463b6(0x4de)]();},Scene_MenuBase['prototype'][_0x55ae0c(0x4de)]=function(){const _0xfbdb27=_0x55ae0c;this[_0xfbdb27(0x3be)]['x']=-0x1*(this[_0xfbdb27(0x3be)][_0xfbdb27(0x780)]+this[_0xfbdb27(0x858)][_0xfbdb27(0x780)]+0x8),this[_0xfbdb27(0x858)]['x']=-0x1*(this[_0xfbdb27(0x858)][_0xfbdb27(0x780)]+0x4);},Scene_MenuBase[_0x55ae0c(0x792)]['isMenuButtonAssistEnabled']=function(){const _0x1c50ef=_0x55ae0c;return VisuMZ['CoreEngine']['Settings']['ButtonAssist'][_0x1c50ef(0x263)];},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x973)]=function(){const _0x4c5c18=_0x55ae0c;return SceneManager[_0x4c5c18(0x290)]()||SceneManager[_0x4c5c18(0x3d3)]()?VisuMZ['CoreEngine'][_0x4c5c18(0x6c3)][_0x4c5c18(0x6a8)][_0x4c5c18(0x5bb)]:'button';},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x87f)]=function(){const _0x2b2857=_0x55ae0c;if(!this[_0x2b2857(0x71c)]())return;const _0x24b078=this[_0x2b2857(0x432)]();this[_0x2b2857(0x4fb)]=new Window_ButtonAssist(_0x24b078),this[_0x2b2857(0x3fb)](this[_0x2b2857(0x4fb)]);},Scene_MenuBase['prototype'][_0x55ae0c(0x432)]=function(){const _0x30db15=_0x55ae0c;return this[_0x30db15(0x973)]()===_0x30db15(0x270)?this[_0x30db15(0x697)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x697)]=function(){const _0x30549a=_0x55ae0c,_0x3c451c=ConfigManager['touchUI']?(Sprite_Button[_0x30549a(0x792)]['blockWidth']()+0x6)*0x2:0x0,_0x4af1e5=this[_0x30549a(0x226)](),_0x12ebaa=Graphics['boxWidth']-_0x3c451c*0x2,_0x4eddb3=this[_0x30549a(0x287)]();return new Rectangle(_0x3c451c,_0x4af1e5,_0x12ebaa,_0x4eddb3);},Scene_MenuBase[_0x55ae0c(0x792)][_0x55ae0c(0x322)]=function(){const _0x3260d4=_0x55ae0c,_0x33e433=Graphics[_0x3260d4(0x508)],_0x4aa2ba=Window_ButtonAssist[_0x3260d4(0x792)][_0x3260d4(0x407)](),_0x3fa166=0x0;let _0x4b5502=0x0;return this[_0x3260d4(0x973)]()===_0x3260d4(0x953)?_0x4b5502=0x0:_0x4b5502=Graphics[_0x3260d4(0x6bc)]-_0x4aa2ba,new Rectangle(_0x3fa166,_0x4b5502,_0x33e433,_0x4aa2ba);},Scene_Menu['layoutSettings']=VisuMZ['CoreEngine'][_0x55ae0c(0x6c3)][_0x55ae0c(0x8f4)][_0x55ae0c(0x6a0)],VisuMZ[_0x55ae0c(0x3ae)]['Scene_Menu_create']=Scene_Menu[_0x55ae0c(0x792)]['create'],Scene_Menu[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x348697=_0x55ae0c;VisuMZ[_0x348697(0x3ae)][_0x348697(0x864)][_0x348697(0x67e)](this),this[_0x348697(0x2de)]();},Scene_Menu[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x53c4c2=_0x55ae0c;this[_0x53c4c2(0x958)]&&this[_0x53c4c2(0x958)][_0x53c4c2(0x200)](Scene_Menu[_0x53c4c2(0x69b)][_0x53c4c2(0x2f5)]),this['_goldWindow']&&this[_0x53c4c2(0x8ce)][_0x53c4c2(0x200)](Scene_Menu[_0x53c4c2(0x69b)][_0x53c4c2(0x920)]),this[_0x53c4c2(0x594)]&&this[_0x53c4c2(0x594)]['setBackgroundType'](Scene_Menu['layoutSettings']['StatusBgType']);},Scene_Menu[_0x55ae0c(0x792)]['commandWindowRect']=function(){const _0x23b3ac=_0x55ae0c;return Scene_Menu[_0x23b3ac(0x69b)][_0x23b3ac(0x589)]['call'](this);},Scene_Menu[_0x55ae0c(0x792)][_0x55ae0c(0x2c7)]=function(){const _0x1adee9=_0x55ae0c;return Scene_Menu[_0x1adee9(0x69b)][_0x1adee9(0x849)][_0x1adee9(0x67e)](this);},Scene_Menu[_0x55ae0c(0x792)][_0x55ae0c(0x24f)]=function(){const _0x58d7c9=_0x55ae0c;return Scene_Menu['layoutSettings']['StatusRect'][_0x58d7c9(0x67e)](this);},Scene_Item['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x55ae0c(0x8f4)][_0x55ae0c(0x1cf)],VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x5ac)]=Scene_Item[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)],Scene_Item[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x1b7728=_0x55ae0c;VisuMZ[_0x1b7728(0x3ae)][_0x1b7728(0x5ac)][_0x1b7728(0x67e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item['prototype'][_0x55ae0c(0x2de)]=function(){const _0x2a769c=_0x55ae0c;this[_0x2a769c(0x5da)]&&this[_0x2a769c(0x5da)][_0x2a769c(0x200)](Scene_Item['layoutSettings'][_0x2a769c(0x3e0)]),this[_0x2a769c(0x412)]&&this[_0x2a769c(0x412)][_0x2a769c(0x200)](Scene_Item[_0x2a769c(0x69b)][_0x2a769c(0x278)]),this['_itemWindow']&&this[_0x2a769c(0x709)][_0x2a769c(0x200)](Scene_Item[_0x2a769c(0x69b)][_0x2a769c(0x3d4)]),this[_0x2a769c(0x3e3)]&&this[_0x2a769c(0x3e3)][_0x2a769c(0x200)](Scene_Item['layoutSettings'][_0x2a769c(0x5c9)]);},Scene_Item[_0x55ae0c(0x792)]['helpWindowRect']=function(){const _0x21719d=_0x55ae0c;return Scene_Item['layoutSettings'][_0x21719d(0x967)][_0x21719d(0x67e)](this);},Scene_Item[_0x55ae0c(0x792)][_0x55ae0c(0x592)]=function(){const _0x2ee143=_0x55ae0c;return Scene_Item[_0x2ee143(0x69b)][_0x2ee143(0x41a)][_0x2ee143(0x67e)](this);},Scene_Item[_0x55ae0c(0x792)][_0x55ae0c(0x69a)]=function(){const _0x589e6f=_0x55ae0c;return Scene_Item[_0x589e6f(0x69b)]['ItemRect'][_0x589e6f(0x67e)](this);},Scene_Item[_0x55ae0c(0x792)][_0x55ae0c(0x4b6)]=function(){const _0x4b0cbe=_0x55ae0c;return Scene_Item[_0x4b0cbe(0x69b)][_0x4b0cbe(0x743)][_0x4b0cbe(0x67e)](this);},Scene_Skill[_0x55ae0c(0x69b)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x8f4)][_0x55ae0c(0x77f)],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)],Scene_Skill[_0x55ae0c(0x792)]['create']=function(){const _0xc70bc6=_0x55ae0c;VisuMZ[_0xc70bc6(0x3ae)][_0xc70bc6(0x286)][_0xc70bc6(0x67e)](this),this[_0xc70bc6(0x2de)]();},Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x34f531=_0x55ae0c;this[_0x34f531(0x5da)]&&this[_0x34f531(0x5da)][_0x34f531(0x200)](Scene_Skill[_0x34f531(0x69b)][_0x34f531(0x3e0)]),this[_0x34f531(0x55e)]&&this[_0x34f531(0x55e)][_0x34f531(0x200)](Scene_Skill[_0x34f531(0x69b)][_0x34f531(0x5e4)]),this[_0x34f531(0x594)]&&this[_0x34f531(0x594)][_0x34f531(0x200)](Scene_Skill[_0x34f531(0x69b)][_0x34f531(0x261)]),this['_itemWindow']&&this[_0x34f531(0x709)][_0x34f531(0x200)](Scene_Skill[_0x34f531(0x69b)]['ItemBgType']),this[_0x34f531(0x3e3)]&&this[_0x34f531(0x3e3)][_0x34f531(0x200)](Scene_Skill['layoutSettings'][_0x34f531(0x5c9)]);},Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x830)]=function(){const _0x40d317=_0x55ae0c;return Scene_Skill['layoutSettings']['HelpRect'][_0x40d317(0x67e)](this);},Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x796)]=function(){const _0x40ff0c=_0x55ae0c;return Scene_Skill['layoutSettings'][_0x40ff0c(0x806)]['call'](this);},Scene_Skill['prototype'][_0x55ae0c(0x24f)]=function(){const _0x43976d=_0x55ae0c;return Scene_Skill['layoutSettings'][_0x43976d(0x552)][_0x43976d(0x67e)](this);},Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x69a)]=function(){const _0x2f4e47=_0x55ae0c;return Scene_Skill[_0x2f4e47(0x69b)][_0x2f4e47(0x5e6)][_0x2f4e47(0x67e)](this);},Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x4b6)]=function(){const _0x167faf=_0x55ae0c;return Scene_Skill[_0x167faf(0x69b)]['ActorRect'][_0x167faf(0x67e)](this);},Scene_Equip[_0x55ae0c(0x69b)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x55ae0c(0x397)],VisuMZ[_0x55ae0c(0x3ae)]['Scene_Equip_create']=Scene_Equip[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)],Scene_Equip[_0x55ae0c(0x792)]['create']=function(){const _0x2f982f=_0x55ae0c;VisuMZ[_0x2f982f(0x3ae)][_0x2f982f(0x588)][_0x2f982f(0x67e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x55ae0c(0x2de)]=function(){const _0x159676=_0x55ae0c;this[_0x159676(0x5da)]&&this[_0x159676(0x5da)]['setBackgroundType'](Scene_Equip[_0x159676(0x69b)]['HelpBgType']),this[_0x159676(0x594)]&&this[_0x159676(0x594)][_0x159676(0x200)](Scene_Equip[_0x159676(0x69b)][_0x159676(0x261)]),this[_0x159676(0x958)]&&this[_0x159676(0x958)][_0x159676(0x200)](Scene_Equip[_0x159676(0x69b)]['CommandBgType']),this[_0x159676(0x546)]&&this[_0x159676(0x546)][_0x159676(0x200)](Scene_Equip[_0x159676(0x69b)][_0x159676(0x689)]),this[_0x159676(0x709)]&&this[_0x159676(0x709)][_0x159676(0x200)](Scene_Equip[_0x159676(0x69b)][_0x159676(0x3d4)]);},Scene_Equip[_0x55ae0c(0x792)][_0x55ae0c(0x830)]=function(){const _0x3375d0=_0x55ae0c;return Scene_Equip[_0x3375d0(0x69b)][_0x3375d0(0x967)][_0x3375d0(0x67e)](this);},Scene_Equip[_0x55ae0c(0x792)]['statusWindowRect']=function(){const _0x210614=_0x55ae0c;return Scene_Equip[_0x210614(0x69b)][_0x210614(0x552)][_0x210614(0x67e)](this);},Scene_Equip[_0x55ae0c(0x792)]['commandWindowRect']=function(){const _0xba6197=_0x55ae0c;return Scene_Equip[_0xba6197(0x69b)][_0xba6197(0x589)][_0xba6197(0x67e)](this);},Scene_Equip[_0x55ae0c(0x792)]['slotWindowRect']=function(){const _0xd60cc8=_0x55ae0c;return Scene_Equip[_0xd60cc8(0x69b)][_0xd60cc8(0x84a)]['call'](this);},Scene_Equip[_0x55ae0c(0x792)][_0x55ae0c(0x69a)]=function(){const _0x364f04=_0x55ae0c;return Scene_Equip[_0x364f04(0x69b)]['ItemRect'][_0x364f04(0x67e)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x8f4)][_0x55ae0c(0x77a)],VisuMZ['CoreEngine'][_0x55ae0c(0x83c)]=Scene_Status[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)],Scene_Status[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x214697=_0x55ae0c;VisuMZ[_0x214697(0x3ae)]['Scene_Status_create']['call'](this),this[_0x214697(0x2de)]();},Scene_Status[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x22d148=_0x55ae0c;this[_0x22d148(0x725)]&&this[_0x22d148(0x725)][_0x22d148(0x200)](Scene_Status['layoutSettings'][_0x22d148(0x763)]),this[_0x22d148(0x594)]&&this['_statusWindow'][_0x22d148(0x200)](Scene_Status[_0x22d148(0x69b)][_0x22d148(0x261)]),this[_0x22d148(0x50f)]&&this['_statusParamsWindow'][_0x22d148(0x200)](Scene_Status[_0x22d148(0x69b)]['StatusParamsBgType']),this['_statusEquipWindow']&&this[_0x22d148(0x1df)]['setBackgroundType'](Scene_Status[_0x22d148(0x69b)][_0x22d148(0x58e)]);},Scene_Status[_0x55ae0c(0x792)][_0x55ae0c(0x7d5)]=function(){const _0x4e3451=_0x55ae0c;return Scene_Status['layoutSettings']['ProfileRect'][_0x4e3451(0x67e)](this);},Scene_Status[_0x55ae0c(0x792)]['statusWindowRect']=function(){const _0x5ee419=_0x55ae0c;return Scene_Status[_0x5ee419(0x69b)][_0x5ee419(0x552)][_0x5ee419(0x67e)](this);},Scene_Status[_0x55ae0c(0x792)][_0x55ae0c(0x510)]=function(){const _0x832a5d=_0x55ae0c;return Scene_Status[_0x832a5d(0x69b)]['StatusParamsRect'][_0x832a5d(0x67e)](this);},Scene_Status[_0x55ae0c(0x792)][_0x55ae0c(0x8a8)]=function(){const _0x3bce20=_0x55ae0c;return Scene_Status[_0x3bce20(0x69b)]['StatusEquipRect'][_0x3bce20(0x67e)](this);},Scene_Options[_0x55ae0c(0x69b)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x8f4)]['OptionsMenu'],VisuMZ['CoreEngine'][_0x55ae0c(0x70d)]=Scene_Options['prototype'][_0x55ae0c(0x6b4)],Scene_Options['prototype'][_0x55ae0c(0x6b4)]=function(){const _0x437724=_0x55ae0c;VisuMZ[_0x437724(0x3ae)][_0x437724(0x70d)]['call'](this),this[_0x437724(0x2de)]();},Scene_Options[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x55d605=_0x55ae0c;this[_0x55d605(0x706)]&&this['_optionsWindow'][_0x55d605(0x200)](Scene_Options['layoutSettings'][_0x55d605(0x443)]);},Scene_Options['prototype'][_0x55ae0c(0x778)]=function(){const _0x2c843e=_0x55ae0c;return Scene_Options[_0x2c843e(0x69b)]['OptionsRect'][_0x2c843e(0x67e)](this);},Scene_Save[_0x55ae0c(0x69b)]=VisuMZ['CoreEngine'][_0x55ae0c(0x6c3)]['MenuLayout'][_0x55ae0c(0x847)],Scene_Save[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x4050ef=_0x55ae0c;Scene_File[_0x4050ef(0x792)][_0x4050ef(0x6b4)][_0x4050ef(0x67e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x55ae0c(0x792)]['setCoreEngineUpdateWindowBg']=function(){const _0x1fcaee=_0x55ae0c;this[_0x1fcaee(0x5da)]&&this[_0x1fcaee(0x5da)][_0x1fcaee(0x200)](Scene_Save[_0x1fcaee(0x69b)][_0x1fcaee(0x3e0)]),this[_0x1fcaee(0x748)]&&this['_listWindow'][_0x1fcaee(0x200)](Scene_Save[_0x1fcaee(0x69b)][_0x1fcaee(0x8f2)]);},Scene_Save[_0x55ae0c(0x792)][_0x55ae0c(0x830)]=function(){const _0x3737a4=_0x55ae0c;return Scene_Save[_0x3737a4(0x69b)]['HelpRect'][_0x3737a4(0x67e)](this);},Scene_Save['prototype'][_0x55ae0c(0x591)]=function(){const _0x30cb48=_0x55ae0c;return Scene_Save[_0x30cb48(0x69b)][_0x30cb48(0x410)][_0x30cb48(0x67e)](this);},Scene_Load[_0x55ae0c(0x69b)]=VisuMZ['CoreEngine']['Settings'][_0x55ae0c(0x8f4)][_0x55ae0c(0x37b)],Scene_Load[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x3b036c=_0x55ae0c;Scene_File['prototype'][_0x3b036c(0x6b4)][_0x3b036c(0x67e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x3f35d5=_0x55ae0c;this[_0x3f35d5(0x5da)]&&this['_helpWindow'][_0x3f35d5(0x200)](Scene_Load[_0x3f35d5(0x69b)]['HelpBgType']),this[_0x3f35d5(0x748)]&&this['_listWindow']['setBackgroundType'](Scene_Load[_0x3f35d5(0x69b)][_0x3f35d5(0x8f2)]);},Scene_Load[_0x55ae0c(0x792)][_0x55ae0c(0x830)]=function(){const _0x2b8a50=_0x55ae0c;return Scene_Load[_0x2b8a50(0x69b)][_0x2b8a50(0x967)][_0x2b8a50(0x67e)](this);},Scene_Load[_0x55ae0c(0x792)]['listWindowRect']=function(){const _0x45f195=_0x55ae0c;return Scene_Load['layoutSettings'][_0x45f195(0x410)][_0x45f195(0x67e)](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x55ae0c(0x792)]=Object[_0x55ae0c(0x6b4)](Scene_Load[_0x55ae0c(0x792)]),Scene_QuickLoad[_0x55ae0c(0x792)][_0x55ae0c(0x68b)]=Scene_QuickLoad,Scene_QuickLoad[_0x55ae0c(0x792)]['initialize']=function(){const _0x53bed4=_0x55ae0c;Scene_Load[_0x53bed4(0x792)][_0x53bed4(0x6e5)][_0x53bed4(0x67e)](this);},Scene_QuickLoad[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x38338d=_0x55ae0c;this['executeLoad'](this[_0x38338d(0x916)]);},Scene_QuickLoad['prototype'][_0x55ae0c(0x1f1)]=function(_0xc426da){const _0x2cb9c6=_0x55ae0c;this[_0x2cb9c6(0x916)]=_0xc426da;},Scene_QuickLoad['prototype'][_0x55ae0c(0x60b)]=function(){const _0x41d702=_0x55ae0c;Scene_MenuBase[_0x41d702(0x792)][_0x41d702(0x60b)]['call'](this);},Scene_GameEnd[_0x55ae0c(0x69b)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['MenuLayout'][_0x55ae0c(0x271)],VisuMZ[_0x55ae0c(0x3ae)]['Scene_GameEnd_createBackground']=Scene_GameEnd['prototype'][_0x55ae0c(0x828)],Scene_GameEnd[_0x55ae0c(0x792)][_0x55ae0c(0x828)]=function(){const _0xf3a094=_0x55ae0c;Scene_MenuBase[_0xf3a094(0x792)]['createBackground'][_0xf3a094(0x67e)](this);},Scene_GameEnd['prototype']['createCommandWindow']=function(){const _0x51981c=_0x55ae0c,_0x3eb5c5=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x3eb5c5),this[_0x51981c(0x958)][_0x51981c(0x85b)](_0x51981c(0x55a),this[_0x51981c(0x96c)][_0x51981c(0x505)](this)),this['addWindow'](this[_0x51981c(0x958)]),this['_commandWindow'][_0x51981c(0x200)](Scene_GameEnd[_0x51981c(0x69b)][_0x51981c(0x2f5)]);},Scene_GameEnd[_0x55ae0c(0x792)][_0x55ae0c(0x883)]=function(){const _0x207039=_0x55ae0c;return Scene_GameEnd[_0x207039(0x69b)][_0x207039(0x589)]['call'](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['MenuLayout'][_0x55ae0c(0x420)],VisuMZ[_0x55ae0c(0x3ae)]['Scene_Shop_create']=Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)],Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x3261b7=_0x55ae0c;VisuMZ[_0x3261b7(0x3ae)]['Scene_Shop_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x219d07=_0x55ae0c;this[_0x219d07(0x5da)]&&this[_0x219d07(0x5da)][_0x219d07(0x200)](Scene_Shop['layoutSettings'][_0x219d07(0x3e0)]),this[_0x219d07(0x8ce)]&&this[_0x219d07(0x8ce)][_0x219d07(0x200)](Scene_Shop[_0x219d07(0x69b)][_0x219d07(0x920)]),this['_commandWindow']&&this['_commandWindow'][_0x219d07(0x200)](Scene_Shop[_0x219d07(0x69b)][_0x219d07(0x2f5)]),this[_0x219d07(0x345)]&&this[_0x219d07(0x345)]['setBackgroundType'](Scene_Shop[_0x219d07(0x69b)]['DummyBgType']),this[_0x219d07(0x6d7)]&&this[_0x219d07(0x6d7)][_0x219d07(0x200)](Scene_Shop[_0x219d07(0x69b)][_0x219d07(0x367)]),this[_0x219d07(0x594)]&&this[_0x219d07(0x594)]['setBackgroundType'](Scene_Shop[_0x219d07(0x69b)][_0x219d07(0x261)]),this[_0x219d07(0x693)]&&this['_buyWindow'][_0x219d07(0x200)](Scene_Shop[_0x219d07(0x69b)][_0x219d07(0x51d)]),this[_0x219d07(0x412)]&&this[_0x219d07(0x412)]['setBackgroundType'](Scene_Shop[_0x219d07(0x69b)][_0x219d07(0x278)]),this[_0x219d07(0x4cc)]&&this[_0x219d07(0x4cc)][_0x219d07(0x200)](Scene_Shop['layoutSettings'][_0x219d07(0x493)]);},Scene_Shop[_0x55ae0c(0x792)]['helpWindowRect']=function(){const _0x166184=_0x55ae0c;return Scene_Shop[_0x166184(0x69b)][_0x166184(0x967)][_0x166184(0x67e)](this);},Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x2c7)]=function(){const _0x280e58=_0x55ae0c;return Scene_Shop['layoutSettings'][_0x280e58(0x849)][_0x280e58(0x67e)](this);},Scene_Shop['prototype'][_0x55ae0c(0x883)]=function(){const _0x1e20cb=_0x55ae0c;return Scene_Shop[_0x1e20cb(0x69b)][_0x1e20cb(0x589)][_0x1e20cb(0x67e)](this);},Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x5bd)]=function(){const _0x975509=_0x55ae0c;return Scene_Shop['layoutSettings'][_0x975509(0x31c)][_0x975509(0x67e)](this);},Scene_Shop['prototype'][_0x55ae0c(0x395)]=function(){const _0x5e755d=_0x55ae0c;return Scene_Shop[_0x5e755d(0x69b)][_0x5e755d(0x33c)][_0x5e755d(0x67e)](this);},Scene_Shop[_0x55ae0c(0x792)]['statusWindowRect']=function(){const _0x4ae902=_0x55ae0c;return Scene_Shop[_0x4ae902(0x69b)][_0x4ae902(0x552)][_0x4ae902(0x67e)](this);},Scene_Shop[_0x55ae0c(0x792)]['buyWindowRect']=function(){const _0x32afac=_0x55ae0c;return Scene_Shop[_0x32afac(0x69b)]['BuyRect'][_0x32afac(0x67e)](this);},Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x592)]=function(){const _0x1c1dd4=_0x55ae0c;return Scene_Shop[_0x1c1dd4(0x69b)]['CategoryRect'][_0x1c1dd4(0x67e)](this);},Scene_Shop[_0x55ae0c(0x792)][_0x55ae0c(0x761)]=function(){const _0x10359b=_0x55ae0c;return Scene_Shop[_0x10359b(0x69b)][_0x10359b(0x3e2)]['call'](this);},Scene_Name['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x55ae0c(0x8f4)][_0x55ae0c(0x2e5)],VisuMZ[_0x55ae0c(0x3ae)]['Scene_Name_create']=Scene_Name[_0x55ae0c(0x792)]['create'],Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x6b4)]=function(){const _0x5403dc=_0x55ae0c;VisuMZ[_0x5403dc(0x3ae)][_0x5403dc(0x7de)][_0x5403dc(0x67e)](this),this[_0x5403dc(0x2de)]();},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x2de)]=function(){const _0x20f3b6=_0x55ae0c;this[_0x20f3b6(0x3d0)]&&this[_0x20f3b6(0x3d0)][_0x20f3b6(0x200)](Scene_Name['layoutSettings']['EditBgType']),this[_0x20f3b6(0x32c)]&&this[_0x20f3b6(0x32c)][_0x20f3b6(0x200)](Scene_Name[_0x20f3b6(0x69b)][_0x20f3b6(0x36d)]);},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x5c4)]=function(){const _0x4d5763=_0x55ae0c;return Scene_Name[_0x4d5763(0x69b)][_0x4d5763(0x959)][_0x4d5763(0x67e)](this);},Scene_Name['prototype']['inputWindowRect']=function(){const _0x271c22=_0x55ae0c;return Scene_Name[_0x271c22(0x69b)][_0x271c22(0x59b)]['call'](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x96a)]=function(){const _0x3fc742=_0x55ae0c;if(!this['_inputWindow'])return![];return VisuMZ[_0x3fc742(0x3ae)]['Settings'][_0x3fc742(0x6a2)]['EnableNameInput'];},Scene_Name['prototype']['buttonAssistKey1']=function(){const _0x269feb=_0x55ae0c;if(this[_0x269feb(0x96a)]()&&this[_0x269feb(0x32c)][_0x269feb(0x643)]!==_0x269feb(0x3fe))return TextManager[_0x269feb(0x2f4)]('pageup','pagedown');return Scene_MenuBase['prototype'][_0x269feb(0x4c3)][_0x269feb(0x67e)](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x4e6)]=function(){const _0x5663b9=_0x55ae0c;return this[_0x5663b9(0x96a)]()?TextManager[_0x5663b9(0x2b0)](_0x5663b9(0x385)):Scene_MenuBase['prototype'][_0x5663b9(0x4e6)][_0x5663b9(0x67e)](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x199)]=function(){const _0x9c9c5a=_0x55ae0c;if(this[_0x9c9c5a(0x96a)]()&&this[_0x9c9c5a(0x32c)][_0x9c9c5a(0x643)]===_0x9c9c5a(0x3fe))return TextManager[_0x9c9c5a(0x3b0)]([_0x9c9c5a(0x43a)]);return Scene_MenuBase['prototype'][_0x9c9c5a(0x199)][_0x9c9c5a(0x67e)](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x354)]=function(){const _0x5e10b6=_0x55ae0c;if(this[_0x5e10b6(0x96a)]()&&this[_0x5e10b6(0x32c)][_0x5e10b6(0x643)]==='keyboard')return TextManager[_0x5e10b6(0x3b0)]([_0x5e10b6(0x67b)]);return Scene_MenuBase[_0x5e10b6(0x792)][_0x5e10b6(0x354)][_0x5e10b6(0x67e)](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x43d)]=function(){const _0x316abc=_0x55ae0c;if(this[_0x316abc(0x96a)]()&&this[_0x316abc(0x32c)][_0x316abc(0x643)]!==_0x316abc(0x3fe)){const _0x3ba2a5=VisuMZ['CoreEngine'][_0x316abc(0x6c3)]['KeyboardInput'];return _0x3ba2a5[_0x316abc(0x6f3)]||_0x316abc(0x42f);}return Scene_MenuBase[_0x316abc(0x792)][_0x316abc(0x43d)]['call'](this);},Scene_Name['prototype']['buttonAssistText3']=function(){const _0x121a05=_0x55ae0c;if(this[_0x121a05(0x96a)]()){const _0x3eb2fe=VisuMZ['CoreEngine']['Settings']['KeyboardInput'];return this[_0x121a05(0x32c)][_0x121a05(0x643)]===_0x121a05(0x3fe)?_0x3eb2fe[_0x121a05(0x3a5)]||'Keyboard':_0x3eb2fe[_0x121a05(0x731)]||'Manual';}else return Scene_MenuBase[_0x121a05(0x792)][_0x121a05(0x37e)][_0x121a05(0x67e)](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x2a0)]=function(){const _0x2abe4c=_0x55ae0c;if(this[_0x2abe4c(0x96a)]()){const _0x4df921=VisuMZ['CoreEngine'][_0x2abe4c(0x6c3)][_0x2abe4c(0x6a2)];if(this[_0x2abe4c(0x32c)][_0x2abe4c(0x643)]===_0x2abe4c(0x3fe))return _0x4df921[_0x2abe4c(0x873)]||_0x2abe4c(0x873);}return Scene_MenuBase['prototype'][_0x2abe4c(0x2a0)][_0x2abe4c(0x67e)](this);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2be)]=Scene_Name[_0x55ae0c(0x792)]['onInputOk'],Scene_Name['prototype'][_0x55ae0c(0x3b8)]=function(){const _0xd86432=_0x55ae0c;this[_0xd86432(0x648)]()?this[_0xd86432(0x3d5)]():VisuMZ['CoreEngine'][_0xd86432(0x2be)][_0xd86432(0x67e)](this);},Scene_Name[_0x55ae0c(0x792)][_0x55ae0c(0x648)]=function(){const _0x4cadd1=_0x55ae0c,_0x475c8d=VisuMZ[_0x4cadd1(0x3ae)][_0x4cadd1(0x6c3)]['KeyboardInput'];if(!_0x475c8d)return![];const _0x5413d8=_0x475c8d['BannedWords'];if(!_0x5413d8)return![];const _0x2b8a6f=this['_editWindow'][_0x4cadd1(0x61b)]()[_0x4cadd1(0x681)]();for(const _0x2b53e5 of _0x5413d8){if(_0x2b8a6f[_0x4cadd1(0x80e)](_0x2b53e5[_0x4cadd1(0x681)]()))return!![];}return![];},Scene_Name['prototype'][_0x55ae0c(0x3d5)]=function(){const _0x3a561f=_0x55ae0c;SoundManager[_0x3a561f(0x408)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x32e)]=Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)],Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0x2035fe=_0x55ae0c;VisuMZ['CoreEngine'][_0x2035fe(0x32e)][_0x2035fe(0x67e)](this);if($gameTemp[_0x2035fe(0x7cf)])this['updatePlayTestF7']();},Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x1b1)]=function(){const _0x49fe21=_0x55ae0c;!BattleManager[_0x49fe21(0x4e5)]()&&!this[_0x49fe21(0x7a3)]&&!$gameMessage[_0x49fe21(0x5aa)]()&&(this[_0x49fe21(0x7a3)]=!![],this[_0x49fe21(0x4e1)](),SceneManager[_0x49fe21(0x481)](),this[_0x49fe21(0x7a3)]=![]);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x788)]=Scene_Battle['prototype'][_0x55ae0c(0x774)],Scene_Battle['prototype'][_0x55ae0c(0x774)]=function(){const _0x3ff5d1=_0x55ae0c;VisuMZ['CoreEngine']['Scene_Battle_createCancelButton'][_0x3ff5d1(0x67e)](this),SceneManager['isSideButtonLayout']()&&this[_0x3ff5d1(0x3a9)]();},Scene_Battle[_0x55ae0c(0x792)]['repositionCancelButtonSideButtonLayout']=function(){const _0x489659=_0x55ae0c;this[_0x489659(0x312)]['x']=Graphics[_0x489659(0x508)]+0x4,this['isBottomButtonMode']()?this[_0x489659(0x312)]['y']=Graphics['boxHeight']-this[_0x489659(0x287)]():this[_0x489659(0x312)]['y']=0x0;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x73d)]=Sprite_Button[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)],Sprite_Button[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x909857){const _0x46bed3=_0x55ae0c;VisuMZ[_0x46bed3(0x3ae)][_0x46bed3(0x73d)][_0x46bed3(0x67e)](this,_0x909857),this[_0x46bed3(0x802)]();},Sprite_Button[_0x55ae0c(0x792)][_0x55ae0c(0x802)]=function(){const _0x43c7d4=_0x55ae0c,_0x1b6a85=VisuMZ[_0x43c7d4(0x3ae)][_0x43c7d4(0x6c3)]['UI'];this[_0x43c7d4(0x4d8)]=![];switch(this[_0x43c7d4(0x59d)]){case _0x43c7d4(0x55a):this[_0x43c7d4(0x4d8)]=!_0x1b6a85[_0x43c7d4(0x83e)];break;case'pageup':case _0x43c7d4(0x8aa):this[_0x43c7d4(0x4d8)]=!_0x1b6a85[_0x43c7d4(0x8ae)];break;case'down':case'up':case _0x43c7d4(0x7c2):case _0x43c7d4(0x74b):case'ok':this[_0x43c7d4(0x4d8)]=!_0x1b6a85[_0x43c7d4(0x631)];break;case _0x43c7d4(0x232):this[_0x43c7d4(0x4d8)]=!_0x1b6a85['menuShowButton'];break;}},VisuMZ['CoreEngine'][_0x55ae0c(0x250)]=Sprite_Button[_0x55ae0c(0x792)][_0x55ae0c(0x853)],Sprite_Button[_0x55ae0c(0x792)][_0x55ae0c(0x853)]=function(){const _0x270b0e=_0x55ae0c;SceneManager[_0x270b0e(0x3d3)]()||this[_0x270b0e(0x4d8)]?this['hideButtonFromView']():VisuMZ[_0x270b0e(0x3ae)]['Sprite_Button_updateOpacity'][_0x270b0e(0x67e)](this);},Sprite_Button['prototype'][_0x55ae0c(0x93e)]=function(){const _0x40026b=_0x55ae0c;this['visible']=![],this[_0x40026b(0x5ad)]=0x0,this['x']=Graphics[_0x40026b(0x780)]*0xa,this['y']=Graphics[_0x40026b(0x555)]*0xa;},VisuMZ[_0x55ae0c(0x3ae)]['Sprite_Battler_startMove']=Sprite_Battler['prototype'][_0x55ae0c(0x86a)],Sprite_Battler[_0x55ae0c(0x792)][_0x55ae0c(0x86a)]=function(_0x33896c,_0xf77e43,_0x1b8a21){const _0x2c2e40=_0x55ae0c;(this[_0x2c2e40(0x623)]!==_0x33896c||this[_0x2c2e40(0x293)]!==_0xf77e43)&&(this[_0x2c2e40(0x935)]('Linear'),this[_0x2c2e40(0x78c)]=_0x1b8a21),VisuMZ[_0x2c2e40(0x3ae)][_0x2c2e40(0x928)][_0x2c2e40(0x67e)](this,_0x33896c,_0xf77e43,_0x1b8a21);},Sprite_Battler[_0x55ae0c(0x792)][_0x55ae0c(0x935)]=function(_0x176c6){this['_moveEasingType']=_0x176c6;},Sprite_Battler[_0x55ae0c(0x792)][_0x55ae0c(0x317)]=function(){const _0x5b8875=_0x55ae0c;if(this[_0x5b8875(0x4e7)]<=0x0)return;const _0x4c04bc=this[_0x5b8875(0x4e7)],_0x44ceaa=this[_0x5b8875(0x78c)],_0x135ccd=this[_0x5b8875(0x902)];this[_0x5b8875(0x456)]=this['applyEasing'](this[_0x5b8875(0x456)],this['_targetOffsetX'],_0x4c04bc,_0x44ceaa,_0x135ccd),this[_0x5b8875(0x89e)]=this[_0x5b8875(0x20d)](this['_offsetY'],this[_0x5b8875(0x293)],_0x4c04bc,_0x44ceaa,_0x135ccd),this[_0x5b8875(0x4e7)]--;if(this[_0x5b8875(0x4e7)]<=0x0)this[_0x5b8875(0x91f)]();},Sprite_Battler[_0x55ae0c(0x792)]['applyEasing']=function(_0xabf02c,_0x9cf8e,_0x536b2f,_0x48703b,_0x1d4ff4){const _0x192d22=_0x55ae0c,_0x462b22=VisuMZ['ApplyEasing']((_0x48703b-_0x536b2f)/_0x48703b,_0x1d4ff4||'Linear'),_0x14b703=VisuMZ[_0x192d22(0x707)]((_0x48703b-_0x536b2f+0x1)/_0x48703b,_0x1d4ff4||_0x192d22(0x394)),_0x1e3c95=(_0xabf02c-_0x9cf8e*_0x462b22)/(0x1-_0x462b22);return _0x1e3c95+(_0x9cf8e-_0x1e3c95)*_0x14b703;},VisuMZ[_0x55ae0c(0x3ae)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x55ae0c(0x792)]['setActorHome'],Sprite_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x2f0)]=function(_0x4bc4a4){const _0x46ae6c=_0x55ae0c;VisuMZ[_0x46ae6c(0x3ae)][_0x46ae6c(0x6c3)]['UI'][_0x46ae6c(0x269)]?this[_0x46ae6c(0x850)](_0x4bc4a4):VisuMZ[_0x46ae6c(0x3ae)][_0x46ae6c(0x8a0)][_0x46ae6c(0x67e)](this,_0x4bc4a4);},Sprite_Actor['prototype']['setActorHomeRepositioned']=function(_0x3124e2){const _0x8c2bd2=_0x55ae0c;let _0xf17856=Math[_0x8c2bd2(0x41d)](Graphics[_0x8c2bd2(0x780)]/0x2+0xc0);_0xf17856-=Math[_0x8c2bd2(0x49a)]((Graphics['width']-Graphics[_0x8c2bd2(0x508)])/0x2),_0xf17856+=_0x3124e2*0x20;let _0x5a2c53=Graphics[_0x8c2bd2(0x555)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x5a2c53-=Math[_0x8c2bd2(0x49a)]((Graphics[_0x8c2bd2(0x555)]-Graphics[_0x8c2bd2(0x6bc)])/0x2),_0x5a2c53+=_0x3124e2*0x30,this['setHome'](_0xf17856,_0x5a2c53);},Sprite_Actor['prototype']['retreat']=function(){const _0x40a725=_0x55ae0c;this[_0x40a725(0x86a)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x55ae0c(0x2a6)]=function(_0x24ce17){this['_muteSound']=_0x24ce17;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x9a3)]=Sprite_Animation['prototype'][_0x55ae0c(0x7a0)],Sprite_Animation[_0x55ae0c(0x792)][_0x55ae0c(0x7a0)]=function(){const _0x7b4c84=_0x55ae0c;if(this[_0x7b4c84(0x76c)])return;VisuMZ['CoreEngine'][_0x7b4c84(0x9a3)][_0x7b4c84(0x67e)](this);},VisuMZ[_0x55ae0c(0x3ae)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x55ae0c(0x792)]['setViewport'],Sprite_Animation['prototype'][_0x55ae0c(0x3d7)]=function(_0x207508){const _0x34d5c0=_0x55ae0c;this['isAnimationOffsetXMirrored']()?this[_0x34d5c0(0x8cc)](_0x207508):VisuMZ['CoreEngine']['Sprite_Animation_setViewport'][_0x34d5c0(0x67e)](this,_0x207508);},Sprite_Animation['prototype'][_0x55ae0c(0x1b9)]=function(){const _0x5daf0f=_0x55ae0c;if(!this['_animation'])return![];const _0x52574e=this[_0x5daf0f(0x6db)][_0x5daf0f(0x61b)]||'';if(_0x52574e['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x52574e[_0x5daf0f(0x65b)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x5daf0f(0x3ae)][_0x5daf0f(0x6c3)][_0x5daf0f(0x5fa)][_0x5daf0f(0x737)];},Sprite_Animation[_0x55ae0c(0x792)][_0x55ae0c(0x8cc)]=function(_0x4a94d2){const _0x46e3c8=_0x55ae0c,_0x12e13c=this[_0x46e3c8(0x772)],_0x19429b=this['_viewportSize'],_0x2161da=this[_0x46e3c8(0x6db)]['offsetX']*(this[_0x46e3c8(0x52d)]?-0x1:0x1)-_0x12e13c/0x2,_0x4f3b59=this['_animation'][_0x46e3c8(0x5c6)]-_0x19429b/0x2,_0x2d144c=this[_0x46e3c8(0x501)](_0x4a94d2);_0x4a94d2['gl'][_0x46e3c8(0x96b)](_0x2161da+_0x2d144c['x'],_0x4f3b59+_0x2d144c['y'],_0x12e13c,_0x19429b);},Sprite_Animation['prototype'][_0x55ae0c(0x90b)]=function(_0x40f8b9){const _0x144c61=_0x55ae0c;if(_0x40f8b9[_0x144c61(0x59f)]){}const _0x52cfe2=this[_0x144c61(0x6db)][_0x144c61(0x61b)];let _0x22eabc=_0x40f8b9['height']*_0x40f8b9[_0x144c61(0x610)]['y'],_0xaa0960=0x0,_0x22a5c5=-_0x22eabc/0x2;if(_0x52cfe2[_0x144c61(0x65b)](/<(?:HEAD|HEADER|TOP)>/i))_0x22a5c5=-_0x22eabc;if(_0x52cfe2[_0x144c61(0x65b)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x22a5c5=0x0;if(this[_0x144c61(0x6db)]['alignBottom'])_0x22a5c5=0x0;if(_0x52cfe2[_0x144c61(0x65b)](/<(?:LEFT)>/i))_0xaa0960=-_0x40f8b9[_0x144c61(0x780)]/0x2;if(_0x52cfe2[_0x144c61(0x65b)](/<(?:RIGHT)>/i))_0xaa0960=_0x40f8b9[_0x144c61(0x780)]/0x2;_0x52cfe2[_0x144c61(0x65b)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0xaa0960=Number(RegExp['$1'])*_0x40f8b9['width']);_0x52cfe2[_0x144c61(0x65b)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x22a5c5=(0x1-Number(RegExp['$1']))*-_0x22eabc);_0x52cfe2[_0x144c61(0x65b)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0xaa0960=Number(RegExp['$1'])*_0x40f8b9['width'],_0x22a5c5=(0x1-Number(RegExp['$2']))*-_0x22eabc);if(_0x52cfe2[_0x144c61(0x65b)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0xaa0960+=Number(RegExp['$1']);if(_0x52cfe2[_0x144c61(0x65b)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x22a5c5+=Number(RegExp['$1']);_0x52cfe2['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0xaa0960+=Number(RegExp['$1']),_0x22a5c5+=Number(RegExp['$2']));const _0x42a953=new Point(_0xaa0960,_0x22a5c5);return _0x40f8b9['updateTransform'](),_0x40f8b9['worldTransform'][_0x144c61(0x4ec)](_0x42a953);},Sprite_AnimationMV[_0x55ae0c(0x792)][_0x55ae0c(0x330)]=function(){const _0x4ff8e9=_0x55ae0c;this[_0x4ff8e9(0x71e)]=VisuMZ[_0x4ff8e9(0x3ae)][_0x4ff8e9(0x6c3)][_0x4ff8e9(0x5fa)][_0x4ff8e9(0x8be)]??0x4,this[_0x4ff8e9(0x38f)](),this[_0x4ff8e9(0x71e)]=this[_0x4ff8e9(0x71e)][_0x4ff8e9(0x621)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x55ae0c(0x38f)]=function(){const _0x124c84=_0x55ae0c;if(!this[_0x124c84(0x6db)]);const _0x1d1ad6=this[_0x124c84(0x6db)][_0x124c84(0x61b)]||'';_0x1d1ad6[_0x124c84(0x65b)](/<RATE:[ ](\d+)>/i)&&(this[_0x124c84(0x71e)]=(Number(RegExp['$1'])||0x1)[_0x124c84(0x621)](0x1,0xa));},Sprite_AnimationMV[_0x55ae0c(0x792)][_0x55ae0c(0x2a6)]=function(_0x2f86ec){const _0x848829=_0x55ae0c;this[_0x848829(0x76c)]=_0x2f86ec;},VisuMZ[_0x55ae0c(0x3ae)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x55ae0c(0x792)][_0x55ae0c(0x964)],Sprite_AnimationMV['prototype'][_0x55ae0c(0x964)]=function(_0x58109d){const _0x2dceb5=_0x55ae0c;this[_0x2dceb5(0x76c)]&&(_0x58109d=JsonEx[_0x2dceb5(0x78b)](_0x58109d),_0x58109d['se']&&(_0x58109d['se']['volume']=0x0)),VisuMZ['CoreEngine'][_0x2dceb5(0x1c5)]['call'](this,_0x58109d);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7f1)]=Sprite_AnimationMV[_0x55ae0c(0x792)][_0x55ae0c(0x376)],Sprite_AnimationMV[_0x55ae0c(0x792)][_0x55ae0c(0x376)]=function(){const _0x4a712f=_0x55ae0c;VisuMZ[_0x4a712f(0x3ae)]['Sprite_AnimationMV_updatePosition']['call'](this);if(this[_0x4a712f(0x6db)][_0x4a712f(0x220)]===0x3){if(this['x']===0x0)this['x']=Math[_0x4a712f(0x41d)](Graphics[_0x4a712f(0x780)]/0x2);if(this['y']===0x0)this['y']=Math[_0x4a712f(0x41d)](Graphics[_0x4a712f(0x555)]/0x2);}},Sprite_Damage['prototype'][_0x55ae0c(0x45d)]=function(_0x4bc4e0){const _0x24157f=_0x55ae0c;let _0x527f3c=Math[_0x24157f(0x2e8)](_0x4bc4e0)[_0x24157f(0x6a5)]();this[_0x24157f(0x974)]()&&(_0x527f3c=VisuMZ[_0x24157f(0x5e3)](_0x527f3c));const _0x2dd740=this['fontSize'](),_0x28a7ca=Math[_0x24157f(0x49a)](_0x2dd740*0.75);for(let _0x4ffe14=0x0;_0x4ffe14<_0x527f3c[_0x24157f(0x616)];_0x4ffe14++){const _0x24172b=this[_0x24157f(0x5ca)](_0x28a7ca,_0x2dd740);_0x24172b[_0x24157f(0x5ce)][_0x24157f(0x7d9)](_0x527f3c[_0x4ffe14],0x0,0x0,_0x28a7ca,_0x2dd740,_0x24157f(0x3f8)),_0x24172b['x']=(_0x4ffe14-(_0x527f3c[_0x24157f(0x616)]-0x1)/0x2)*_0x28a7ca,_0x24172b['dy']=-_0x4ffe14;}},Sprite_Damage[_0x55ae0c(0x792)][_0x55ae0c(0x974)]=function(){const _0x251d0e=_0x55ae0c;return VisuMZ['CoreEngine'][_0x251d0e(0x6c3)][_0x251d0e(0x5fa)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x55ae0c(0x792)][_0x55ae0c(0x2ca)]=function(){const _0x3a40bf=_0x55ae0c;return ColorManager[_0x3a40bf(0x1b7)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x72b)]=Sprite_Gauge[_0x55ae0c(0x792)][_0x55ae0c(0x454)],Sprite_Gauge['prototype'][_0x55ae0c(0x454)]=function(){const _0x451be3=_0x55ae0c;return VisuMZ[_0x451be3(0x3ae)][_0x451be3(0x72b)][_0x451be3(0x67e)](this)[_0x451be3(0x621)](0x0,0x1);},VisuMZ['CoreEngine'][_0x55ae0c(0x5e9)]=Sprite_Gauge['prototype'][_0x55ae0c(0x7d3)],Sprite_Gauge[_0x55ae0c(0x792)]['currentValue']=function(){const _0x7e9a94=_0x55ae0c;let _0x2b6b4a=VisuMZ[_0x7e9a94(0x3ae)][_0x7e9a94(0x5e9)][_0x7e9a94(0x67e)](this);return _0x2b6b4a;},Sprite_Gauge[_0x55ae0c(0x792)][_0x55ae0c(0x8f9)]=function(){const _0x3f5d53=_0x55ae0c;let _0x8dee9a=this[_0x3f5d53(0x7d3)]();this['useDigitGrouping']()&&(_0x8dee9a=VisuMZ[_0x3f5d53(0x5e3)](_0x8dee9a));const _0x38c8a5=this[_0x3f5d53(0x670)]()-0x1,_0x21c1b5=this[_0x3f5d53(0x85c)]?this[_0x3f5d53(0x85c)]():this[_0x3f5d53(0x879)]();this['setupValueFont'](),this[_0x3f5d53(0x5ce)]['drawText'](_0x8dee9a,0x0,0x0,_0x38c8a5,_0x21c1b5,'right');},Sprite_Gauge[_0x55ae0c(0x792)][_0x55ae0c(0x975)]=function(){return 0x3;},Sprite_Gauge[_0x55ae0c(0x792)]['useDigitGrouping']=function(){const _0x34888e=_0x55ae0c;return VisuMZ[_0x34888e(0x3ae)][_0x34888e(0x6c3)][_0x34888e(0x5fa)]['DigitGroupingGaugeSprites'];},Sprite_Gauge['prototype']['valueOutlineColor']=function(){const _0x32af89=_0x55ae0c;return ColorManager[_0x32af89(0x30a)]();},Sprite_StateIcon[_0x55ae0c(0x5a9)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['UI'][_0x55ae0c(0x599)]??!![],VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x252)]=Sprite_StateIcon['prototype'][_0x55ae0c(0x6d9)],Sprite_StateIcon[_0x55ae0c(0x792)][_0x55ae0c(0x6d9)]=function(){const _0x3338a9=_0x55ae0c;Sprite_StateIcon[_0x3338a9(0x5a9)]?this[_0x3338a9(0x49d)]():VisuMZ[_0x3338a9(0x3ae)][_0x3338a9(0x252)][_0x3338a9(0x67e)](this);},Sprite_StateIcon[_0x55ae0c(0x792)][_0x55ae0c(0x49d)]=function(){const _0x5cab23=_0x55ae0c;this['bitmap']=new Bitmap(ImageManager[_0x5cab23(0x918)],ImageManager['iconHeight']),this[_0x5cab23(0x1b0)]=ImageManager[_0x5cab23(0x976)](_0x5cab23(0x6ff));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7b6)]=Sprite_StateIcon[_0x55ae0c(0x792)][_0x55ae0c(0x2eb)],Sprite_StateIcon[_0x55ae0c(0x792)][_0x55ae0c(0x2eb)]=function(){const _0x4f5f8b=_0x55ae0c;Sprite_StateIcon[_0x4f5f8b(0x5a9)]?this[_0x4f5f8b(0x2bf)]():VisuMZ[_0x4f5f8b(0x3ae)][_0x4f5f8b(0x7b6)]['call'](this);},Sprite_StateIcon[_0x55ae0c(0x792)]['updateFrameCoreEngine']=function(){const _0x229e85=_0x55ae0c;if(this[_0x229e85(0x28f)]===this[_0x229e85(0x512)])return;this['_lastIconIndex']=this[_0x229e85(0x512)];const _0xd25ebc=ImageManager['iconWidth'],_0x303c09=ImageManager[_0x229e85(0x5f9)],_0x130f9a=this[_0x229e85(0x512)]%0x10*_0xd25ebc,_0x12bcd7=Math[_0x229e85(0x49a)](this['_iconIndex']/0x10)*_0x303c09,_0x3f7550=this[_0x229e85(0x1b0)],_0x1566f3=this['bitmap'];_0x1566f3['clear'](),_0x1566f3['blt'](_0x3f7550,_0x130f9a,_0x12bcd7,_0xd25ebc,_0x303c09,0x0,0x0,_0x1566f3[_0x229e85(0x780)],_0x1566f3[_0x229e85(0x555)]);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x809)]=Sprite_Picture[_0x55ae0c(0x792)]['loadBitmap'],Sprite_Picture['prototype'][_0x55ae0c(0x6d9)]=function(){const _0xa26734=_0x55ae0c;this[_0xa26734(0x65c)]&&this[_0xa26734(0x65c)][_0xa26734(0x65b)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0xa26734(0x738)](Number(RegExp['$1'])):VisuMZ[_0xa26734(0x3ae)]['Sprite_Picture_loadBitmap'][_0xa26734(0x67e)](this);},Sprite_Picture['prototype'][_0x55ae0c(0x738)]=function(_0xa1cef7){const _0x30b968=_0x55ae0c,_0xcb74f7=ImageManager[_0x30b968(0x918)],_0x44e2a1=ImageManager[_0x30b968(0x5f9)],_0x12020d=this[_0x30b968(0x65c)][_0x30b968(0x65b)](/SMOOTH/i);this[_0x30b968(0x5ce)]=new Bitmap(_0xcb74f7,_0x44e2a1);const _0x53489e=ImageManager['loadSystem'](_0x30b968(0x6ff)),_0x48d027=_0xa1cef7%0x10*_0xcb74f7,_0x46d46c=Math['floor'](_0xa1cef7/0x10)*_0x44e2a1;this[_0x30b968(0x5ce)][_0x30b968(0x35b)]=_0x12020d,this[_0x30b968(0x5ce)][_0x30b968(0x685)](_0x53489e,_0x48d027,_0x46d46c,_0xcb74f7,_0x44e2a1,0x0,0x0,_0xcb74f7,_0x44e2a1);};function Sprite_TitlePictureButton(){const _0xd8f424=_0x55ae0c;this[_0xd8f424(0x6e5)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x55ae0c(0x6b4)](Sprite_Clickable[_0x55ae0c(0x792)]),Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x68b)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x2cea08){const _0x3a4e5b=_0x55ae0c;Sprite_Clickable[_0x3a4e5b(0x792)][_0x3a4e5b(0x6e5)][_0x3a4e5b(0x67e)](this),this[_0x3a4e5b(0x277)]=_0x2cea08,this[_0x3a4e5b(0x540)]=null,this['setup']();},Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x24e)]=function(){const _0x17fb7b=_0x55ae0c;this['x']=Graphics['width'],this['y']=Graphics[_0x17fb7b(0x555)],this[_0x17fb7b(0x21e)]=![],this[_0x17fb7b(0x5b7)]();},Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x5b7)]=function(){const _0x4657ac=_0x55ae0c;this[_0x4657ac(0x5ce)]=ImageManager[_0x4657ac(0x332)](this['_data'][_0x4657ac(0x7ea)]),this[_0x4657ac(0x5ce)][_0x4657ac(0x661)](this[_0x4657ac(0x8bb)][_0x4657ac(0x505)](this));},Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x8bb)]=function(){const _0x355ac9=_0x55ae0c;this['_data'][_0x355ac9(0x921)]['call'](this),this[_0x355ac9(0x277)]['PositionJS'][_0x355ac9(0x67e)](this),this['setClickHandler'](this[_0x355ac9(0x277)][_0x355ac9(0x3e7)][_0x355ac9(0x505)](this));},Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0x26fcbb=_0x55ae0c;Sprite_Clickable['prototype'][_0x26fcbb(0x4e1)][_0x26fcbb(0x67e)](this),this[_0x26fcbb(0x853)](),this[_0x26fcbb(0x6bf)]();},Sprite_TitlePictureButton['prototype'][_0x55ae0c(0x6c1)]=function(){const _0x321471=_0x55ae0c;return VisuMZ[_0x321471(0x3ae)][_0x321471(0x6c3)][_0x321471(0x8f4)][_0x321471(0x5d4)][_0x321471(0x882)];},Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x853)]=function(){const _0x29e38a=_0x55ae0c;this['_pressed']||this['_hovered']?this[_0x29e38a(0x5ad)]=0xff:(this['opacity']+=this['visible']?this['fadeSpeed']():-0x1*this['fadeSpeed'](),this[_0x29e38a(0x5ad)]=Math[_0x29e38a(0x81a)](0xc0,this[_0x29e38a(0x5ad)]));},Sprite_TitlePictureButton[_0x55ae0c(0x792)][_0x55ae0c(0x46b)]=function(_0x4308cb){const _0x213651=_0x55ae0c;this[_0x213651(0x540)]=_0x4308cb;},Sprite_TitlePictureButton['prototype'][_0x55ae0c(0x4ad)]=function(){const _0x5d86ff=_0x55ae0c;this['_clickHandler']&&this[_0x5d86ff(0x540)]();};function Sprite_ExtendedTile(){this['initialize'](...arguments);}Sprite_ExtendedTile[_0x55ae0c(0x792)]=Object[_0x55ae0c(0x6b4)](Sprite['prototype']),Sprite_ExtendedTile[_0x55ae0c(0x792)][_0x55ae0c(0x68b)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x4c6ffd,_0x277b42,_0x20c387,_0x39ba6f){const _0x4cc743=_0x55ae0c;this[_0x4cc743(0x494)]=Game_CharacterBase[_0x4cc743(0x630)]||-0x6,this[_0x4cc743(0x3c4)]=_0x4c6ffd,this[_0x4cc743(0x1e0)]=_0x277b42,this[_0x4cc743(0x766)]=_0x20c387,this[_0x4cc743(0x2d9)]=_0x39ba6f,Sprite[_0x4cc743(0x792)]['initialize'][_0x4cc743(0x67e)](this),this['createSubSprite'](),this['loadTileBitmap'](),this[_0x4cc743(0x603)](),this[_0x4cc743(0x4e1)]();},Sprite_ExtendedTile[_0x55ae0c(0x792)]['createSubSprite']=function(){const _0x3536d4=_0x55ae0c;this[_0x3536d4(0x720)]=new Sprite(),this[_0x3536d4(0x720)][_0x3536d4(0x1f2)]['x']=0.5,this[_0x3536d4(0x720)][_0x3536d4(0x1f2)]['y']=0x1,this[_0x3536d4(0x720)]['y']=-this['_shiftY']+0x1,this[_0x3536d4(0x359)](this['_tileSprite']);},Sprite_ExtendedTile[_0x55ae0c(0x792)][_0x55ae0c(0x241)]=function(){const _0x1e74d8=_0x55ae0c,_0x1fa1a1=$gameMap[_0x1e74d8(0x4b2)](),_0x53a84b=0x5+Math[_0x1e74d8(0x49a)](this['_tile']/0x100);this['_tileSprite'][_0x1e74d8(0x5ce)]=ImageManager[_0x1e74d8(0x941)](_0x1fa1a1['tilesetNames'][_0x53a84b]);},Sprite_ExtendedTile[_0x55ae0c(0x792)]['setTileFrame']=function(){const _0x354ec4=_0x55ae0c,_0x538b81=this['_tile'],_0x404aa5=$gameMap[_0x354ec4(0x7ce)](),_0x70a9c=$gameMap[_0x354ec4(0x2a3)](),_0x266d31=(Math['floor'](_0x538b81/0x80)%0x2*0x8+_0x538b81%0x8)*_0x404aa5,_0x12a5f0=Math['floor'](_0x538b81%0x100/0x8)%0x10*_0x70a9c,_0x12ba13=this[_0x354ec4(0x2d9)]*_0x70a9c;this[_0x354ec4(0x720)][_0x354ec4(0x7ad)](_0x266d31,_0x12a5f0-_0x12ba13,_0x404aa5,_0x70a9c+_0x12ba13);},Sprite_ExtendedTile[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0x45d857=_0x55ae0c;Sprite[_0x45d857(0x792)][_0x45d857(0x4e1)][_0x45d857(0x67e)](this),this[_0x45d857(0x376)]();},Sprite_ExtendedTile[_0x55ae0c(0x792)][_0x55ae0c(0x376)]=function(){const _0x47022a=_0x55ae0c,_0x5a410f=$gameMap['tileWidth'](),_0x4bd376=$gameMap['tileHeight'](),_0x1acb61=this[_0x47022a(0x3c4)],_0x5ec992=this[_0x47022a(0x1e0)];this['x']=Math['floor'](($gameMap[_0x47022a(0x656)](_0x1acb61)+0.5)*_0x5a410f),this['y']=Math[_0x47022a(0x49a)](($gameMap[_0x47022a(0x482)](_0x5ec992)+0x1)*_0x4bd376)+this[_0x47022a(0x494)]-0x1;},VisuMZ['CoreEngine'][_0x55ae0c(0x267)]=Spriteset_Base[_0x55ae0c(0x792)]['initialize'],Spriteset_Base['prototype']['initialize']=function(){const _0x50af99=_0x55ae0c;VisuMZ[_0x50af99(0x3ae)][_0x50af99(0x267)][_0x50af99(0x67e)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x33d)]=function(){const _0xee2ab4=_0x55ae0c;this[_0xee2ab4(0x281)]=[],this[_0xee2ab4(0x8d1)]=[],this[_0xee2ab4(0x83f)]=this['scale']['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x55b)]=Spriteset_Base['prototype'][_0x55ae0c(0x297)],Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x297)]=function(_0x34caf7){const _0xbf5866=_0x55ae0c;this['removeAllFauxAnimations'](),this[_0xbf5866(0x917)](),VisuMZ[_0xbf5866(0x3ae)][_0xbf5866(0x55b)][_0xbf5866(0x67e)](this,_0x34caf7);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4d5)]=Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)],Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0x44b623=_0x55ae0c;VisuMZ[_0x44b623(0x3ae)]['Spriteset_Base_update']['call'](this),this[_0x44b623(0x3a2)](),this[_0x44b623(0x1db)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base[_0x55ae0c(0x792)]['updatePictureSettings']=function(){},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x1db)]=function(){const _0x56a8c5=_0x55ae0c;if(!VisuMZ[_0x56a8c5(0x3ae)][_0x56a8c5(0x6c3)][_0x56a8c5(0x5fa)]['AntiZoomPictures'])return;if(this[_0x56a8c5(0x83f)]===this[_0x56a8c5(0x610)]['x']&&this['_cacheScaleY']===this['scale']['y'])return;this[_0x56a8c5(0x695)](),this[_0x56a8c5(0x83f)]=this[_0x56a8c5(0x610)]['x'],this['_cacheScaleY']=this[_0x56a8c5(0x610)]['y'];},Spriteset_Base['prototype'][_0x55ae0c(0x695)]=function(){const _0x8e35c7=_0x55ae0c;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x8e35c7(0x47f)])return;else{if(SceneManager[_0x8e35c7(0x228)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;}this[_0x8e35c7(0x610)]['x']!==0x0&&(this[_0x8e35c7(0x90a)][_0x8e35c7(0x610)]['x']=0x1/this[_0x8e35c7(0x610)]['x'],this[_0x8e35c7(0x90a)]['x']=-(this['x']/this[_0x8e35c7(0x610)]['x'])),this[_0x8e35c7(0x610)]['y']!==0x0&&(this['_pictureContainer'][_0x8e35c7(0x610)]['y']=0x1/this[_0x8e35c7(0x610)]['y'],this['_pictureContainer']['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2dd)]=Spriteset_Base[_0x55ae0c(0x792)]['updatePosition'],Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x376)]=function(){const _0x18e9dc=_0x55ae0c;VisuMZ[_0x18e9dc(0x3ae)][_0x18e9dc(0x2dd)]['call'](this),this[_0x18e9dc(0x355)]();},Spriteset_Base[_0x55ae0c(0x792)]['updatePositionCoreEngine']=function(){const _0x385e57=_0x55ae0c;if(!$gameScreen)return;if($gameScreen[_0x385e57(0x758)]<=0x0)return;this['x']-=Math[_0x385e57(0x41d)]($gameScreen[_0x385e57(0x492)]());const _0x1e95b7=$gameScreen[_0x385e57(0x65d)]();switch($gameScreen[_0x385e57(0x65d)]()){case _0x385e57(0x23e):this[_0x385e57(0x235)]();break;case _0x385e57(0x8ff):this[_0x385e57(0x880)]();break;case _0x385e57(0x1ee):this[_0x385e57(0x984)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base['prototype'][_0x55ae0c(0x235)]=function(){const _0x403b6b=_0x55ae0c,_0x35003f=VisuMZ[_0x403b6b(0x3ae)][_0x403b6b(0x6c3)][_0x403b6b(0x96d)];if(_0x35003f&&_0x35003f['originalJS'])return _0x35003f['originalJS'][_0x403b6b(0x67e)](this);this['x']+=Math[_0x403b6b(0x41d)]($gameScreen['shake']());},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x8b0)]=function(){const _0x263905=_0x55ae0c,_0x492991=VisuMZ[_0x263905(0x3ae)][_0x263905(0x6c3)][_0x263905(0x96d)];if(_0x492991&&_0x492991[_0x263905(0x69e)])return _0x492991[_0x263905(0x69e)][_0x263905(0x67e)](this);const _0x5635f0=$gameScreen[_0x263905(0x536)]*0.75,_0xbb6f44=$gameScreen['_shakeSpeed']*0.6,_0x18e6d4=$gameScreen['_shakeDuration'];this['x']+=Math[_0x263905(0x41d)](Math[_0x263905(0x6f1)](_0x5635f0)-Math[_0x263905(0x6f1)](_0xbb6f44))*(Math['min'](_0x18e6d4,0x1e)*0.5),this['y']+=Math['round'](Math[_0x263905(0x6f1)](_0x5635f0)-Math[_0x263905(0x6f1)](_0xbb6f44))*(Math['min'](_0x18e6d4,0x1e)*0.5);},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x880)]=function(){const _0x4a00cc=_0x55ae0c,_0x2dad34=VisuMZ[_0x4a00cc(0x3ae)][_0x4a00cc(0x6c3)][_0x4a00cc(0x96d)];if(_0x2dad34&&_0x2dad34[_0x4a00cc(0x1e7)])return _0x2dad34[_0x4a00cc(0x1e7)]['call'](this);const _0x5d7878=$gameScreen['_shakePower']*0.75,_0x4c30c0=$gameScreen['_shakeSpeed']*0.6,_0x3a369b=$gameScreen['_shakeDuration'];this['x']+=Math[_0x4a00cc(0x41d)](Math[_0x4a00cc(0x6f1)](_0x5d7878)-Math['randomInt'](_0x4c30c0))*(Math[_0x4a00cc(0x81a)](_0x3a369b,0x1e)*0.5);},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x984)]=function(){const _0x707657=_0x55ae0c,_0x1e46fb=VisuMZ[_0x707657(0x3ae)][_0x707657(0x6c3)][_0x707657(0x96d)];if(_0x1e46fb&&_0x1e46fb[_0x707657(0x66d)])return _0x1e46fb[_0x707657(0x66d)][_0x707657(0x67e)](this);const _0xaaa3a8=$gameScreen['_shakePower']*0.75,_0x360177=$gameScreen[_0x707657(0x64c)]*0.6,_0x198385=$gameScreen[_0x707657(0x758)];this['y']+=Math[_0x707657(0x41d)](Math[_0x707657(0x6f1)](_0xaaa3a8)-Math[_0x707657(0x6f1)](_0x360177))*(Math[_0x707657(0x81a)](_0x198385,0x1e)*0.5);},Spriteset_Base[_0x55ae0c(0x792)]['updateFauxAnimations']=function(){const _0xd5de2f=_0x55ae0c;for(const _0x2aec32 of this['_fauxAnimationSprites']){!_0x2aec32[_0xd5de2f(0x75a)]()&&this[_0xd5de2f(0x85a)](_0x2aec32);}this[_0xd5de2f(0x827)]();},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x827)]=function(){const _0x2d5c3a=_0x55ae0c;for(;;){const _0x3c716d=$gameTemp[_0x2d5c3a(0x6e1)]();if(_0x3c716d)this[_0x2d5c3a(0x64d)](_0x3c716d);else break;}},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x64d)]=function(_0x31d2fd){const _0x395ede=_0x55ae0c,_0x3bb2f4=$dataAnimations[_0x31d2fd[_0x395ede(0x19a)]],_0x3d36ce=_0x31d2fd[_0x395ede(0x490)],_0x196935=_0x31d2fd[_0x395ede(0x90c)],_0x48b22d=_0x31d2fd[_0x395ede(0x97c)];let _0x3e112b=this['animationBaseDelay']();const _0x5473ee=this[_0x395ede(0x2ce)]();if(this[_0x395ede(0x34e)](_0x3bb2f4))for(const _0x18efbc of _0x3d36ce){this[_0x395ede(0x39b)]([_0x18efbc],_0x3bb2f4,_0x196935,_0x3e112b,_0x48b22d),_0x3e112b+=_0x5473ee;}else this['createFauxAnimationSprite'](_0x3d36ce,_0x3bb2f4,_0x196935,_0x3e112b,_0x48b22d);},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x72a)]=function(_0xaeb4b2,_0x12d5e7,_0x52c2fc,_0x53c6aa){const _0x5248f2=_0x55ae0c,_0x58e594=this[_0x5248f2(0x78d)](_0x12d5e7),_0x65aa97=new(_0x58e594?Sprite_AnimationMV:Sprite_Animation)(),_0x57f90f=this[_0x5248f2(0x804)](_0xaeb4b2),_0x544d57=this[_0x5248f2(0x1f4)](),_0x32efdc=_0x53c6aa>_0x544d57?this['lastAnimationSprite']():null;this[_0x5248f2(0x468)](_0xaeb4b2[0x0])&&(_0x52c2fc=!_0x52c2fc),_0x65aa97['targetObjects']=_0xaeb4b2,_0x65aa97[_0x5248f2(0x24e)](_0x57f90f,_0x12d5e7,_0x52c2fc,_0x53c6aa,_0x32efdc),this[_0x5248f2(0x3ee)](_0x65aa97),this[_0x5248f2(0x7fe)][_0x5248f2(0x87e)](_0x65aa97);},Spriteset_Base[_0x55ae0c(0x792)]['createFauxAnimationSprite']=function(_0x2ee4b6,_0x4dd6c9,_0x538292,_0x4f11b2,_0x32eeae){const _0x16827b=_0x55ae0c,_0x271437=this[_0x16827b(0x78d)](_0x4dd6c9),_0x56f470=new(_0x271437?Sprite_AnimationMV:Sprite_Animation)(),_0x140eda=this[_0x16827b(0x804)](_0x2ee4b6);this[_0x16827b(0x468)](_0x2ee4b6[0x0])&&(_0x538292=!_0x538292);_0x56f470[_0x16827b(0x84b)]=_0x2ee4b6,_0x56f470[_0x16827b(0x24e)](_0x140eda,_0x4dd6c9,_0x538292,_0x4f11b2),_0x56f470[_0x16827b(0x2a6)](_0x32eeae),this[_0x16827b(0x3ee)](_0x56f470);if(this[_0x16827b(0x7fe)])this[_0x16827b(0x7fe)][_0x16827b(0x60f)](_0x56f470);this[_0x16827b(0x281)][_0x16827b(0x87e)](_0x56f470);},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x3ee)]=function(_0xa15fc8){const _0x3c2a93=_0x55ae0c;this[_0x3c2a93(0x782)][_0x3c2a93(0x359)](_0xa15fc8);},Spriteset_Base['prototype']['removeAnimation']=function(_0x4b63c3){const _0x2324d6=_0x55ae0c;this[_0x2324d6(0x7fe)][_0x2324d6(0x60f)](_0x4b63c3),this[_0x2324d6(0x520)](_0x4b63c3);for(const _0x1c7580 of _0x4b63c3[_0x2324d6(0x84b)]){_0x1c7580[_0x2324d6(0x38e)]&&_0x1c7580[_0x2324d6(0x38e)]();}_0x4b63c3[_0x2324d6(0x297)]();},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x85a)]=function(_0x5c6cb4){const _0x1ec88e=_0x55ae0c;this[_0x1ec88e(0x281)][_0x1ec88e(0x60f)](_0x5c6cb4),this['removeAnimationFromContainer'](_0x5c6cb4);for(const _0x456b56 of _0x5c6cb4[_0x1ec88e(0x84b)]){_0x456b56[_0x1ec88e(0x38e)]&&_0x456b56[_0x1ec88e(0x38e)]();}_0x5c6cb4[_0x1ec88e(0x297)]();},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x520)]=function(_0x9efa81){const _0x56ba04=_0x55ae0c;this[_0x56ba04(0x782)]['removeChild'](_0x9efa81);},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x7af)]=function(){const _0x27f355=_0x55ae0c;for(const _0x38e3cc of this[_0x27f355(0x281)]){this[_0x27f355(0x85a)](_0x38e3cc);}},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x2b9)]=function(){const _0x3af066=_0x55ae0c;return this[_0x3af066(0x281)][_0x3af066(0x616)]>0x0;},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x548)]=function(){const _0x48d1d8=_0x55ae0c;for(const _0x36b143 of this[_0x48d1d8(0x8d1)]){!_0x36b143[_0x48d1d8(0x75a)]()&&this[_0x48d1d8(0x46e)](_0x36b143);}this[_0x48d1d8(0x30d)]();},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x30d)]=function(){const _0x56f0d0=_0x55ae0c;for(;;){const _0x27c8e3=$gameTemp[_0x56f0d0(0x3e8)]();if(_0x27c8e3)this[_0x56f0d0(0x69f)](_0x27c8e3);else break;}},Spriteset_Base[_0x55ae0c(0x792)]['createPointAnimation']=function(_0x10ce34){const _0xf2461=_0x55ae0c,_0x5eaf86=$dataAnimations[_0x10ce34['animationId']],_0x387e4b=this[_0xf2461(0x244)](_0x10ce34),_0xaa77d9=_0x10ce34['mirror'],_0x4adefb=_0x10ce34[_0xf2461(0x97c)];let _0x3771ab=this[_0xf2461(0x1f4)]();const _0x33009e=this[_0xf2461(0x2ce)]();if(this[_0xf2461(0x34e)](_0x5eaf86))for(const _0xd56fc8 of _0x387e4b){this[_0xf2461(0x3c5)]([_0xd56fc8],_0x5eaf86,_0xaa77d9,_0x3771ab,_0x4adefb),_0x3771ab+=_0x33009e;}else this[_0xf2461(0x3c5)](_0x387e4b,_0x5eaf86,_0xaa77d9,_0x3771ab,_0x4adefb);},Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x244)]=function(_0x530fe5){const _0x242a56=_0x55ae0c,_0x5b44d7=new Sprite_Clickable(),_0x2bb811=this['getPointAnimationLayer']();_0x5b44d7['x']=_0x530fe5['x']-_0x2bb811['x'],_0x5b44d7['y']=_0x530fe5['y']-_0x2bb811['y'],_0x5b44d7['z']=0x64;const _0x15a03b=this[_0x242a56(0x652)]();return _0x15a03b['addChild'](_0x5b44d7),[_0x5b44d7];},Spriteset_Base['prototype']['getPointAnimationLayer']=function(){return this;},Spriteset_Map['prototype']['getPointAnimationLayer']=function(){const _0x526f32=_0x55ae0c;return this[_0x526f32(0x79f)]||this;},Spriteset_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x652)]=function(){return this['_battleField']||this;},Spriteset_Base['prototype'][_0x55ae0c(0x3c5)]=function(_0x4d13cb,_0x4a8c41,_0x49cea2,_0x2ccaec,_0x40e731){const _0xf6b740=_0x55ae0c,_0x2d4bd8=this['isMVAnimation'](_0x4a8c41),_0x79f3b9=new(_0x2d4bd8?Sprite_AnimationMV:Sprite_Animation)();_0x79f3b9[_0xf6b740(0x84b)]=_0x4d13cb,_0x79f3b9[_0xf6b740(0x24e)](_0x4d13cb,_0x4a8c41,_0x49cea2,_0x2ccaec),_0x79f3b9[_0xf6b740(0x2a6)](_0x40e731),this[_0xf6b740(0x3ee)](_0x79f3b9),this[_0xf6b740(0x8d1)][_0xf6b740(0x87e)](_0x79f3b9);},Spriteset_Base['prototype'][_0x55ae0c(0x46e)]=function(_0x16274c){const _0x37d867=_0x55ae0c;this[_0x37d867(0x8d1)][_0x37d867(0x60f)](_0x16274c),this[_0x37d867(0x782)][_0x37d867(0x81d)](_0x16274c);for(const _0x1e8a9b of _0x16274c[_0x37d867(0x84b)]){_0x1e8a9b['endAnimation']&&_0x1e8a9b[_0x37d867(0x38e)]();const _0x38381e=this[_0x37d867(0x652)]();if(_0x38381e)_0x38381e[_0x37d867(0x81d)](_0x1e8a9b);}_0x16274c[_0x37d867(0x297)]();},Spriteset_Base['prototype']['removeAllPointAnimations']=function(){const _0x4e65be=_0x55ae0c;for(const _0x2c801d of this['_pointAnimationSprites']){this[_0x4e65be(0x46e)](_0x2c801d);}},Spriteset_Base[_0x55ae0c(0x792)]['isPointAnimationPlaying']=function(){const _0x17d7f2=_0x55ae0c;return this[_0x17d7f2(0x8d1)][_0x17d7f2(0x616)]>0x0;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x285)]=Spriteset_Base[_0x55ae0c(0x792)][_0x55ae0c(0x3a3)],Spriteset_Base['prototype']['isAnimationPlaying']=function(){const _0x2a317c=_0x55ae0c;return VisuMZ[_0x2a317c(0x3ae)]['Spriteset_Base_isAnimationPlaying'][_0x2a317c(0x67e)](this)||this[_0x2a317c(0x915)]();},Spriteset_Map[_0x55ae0c(0x47f)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['QoL']['DetachMapPictureContainer']||![],VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1ad)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x637)],Scene_Map[_0x55ae0c(0x792)]['createSpriteset']=function(){const _0x28ebc4=_0x55ae0c;VisuMZ[_0x28ebc4(0x3ae)][_0x28ebc4(0x1ad)][_0x28ebc4(0x67e)](this);if(!Spriteset_Map[_0x28ebc4(0x47f)])return;const _0x2f04f0=this[_0x28ebc4(0x5d7)];if(!_0x2f04f0)return;this['_pictureContainer']=_0x2f04f0['_pictureContainer'];if(!this[_0x28ebc4(0x90a)])return;this[_0x28ebc4(0x359)](this[_0x28ebc4(0x90a)]);},VisuMZ['CoreEngine'][_0x55ae0c(0x584)]=Spriteset_Map[_0x55ae0c(0x792)][_0x55ae0c(0x356)],Spriteset_Map[_0x55ae0c(0x792)][_0x55ae0c(0x356)]=function(){const _0x82c817=_0x55ae0c;VisuMZ[_0x82c817(0x3ae)][_0x82c817(0x584)][_0x82c817(0x67e)](this),this['createTileExtendSprites']();},Spriteset_Map[_0x55ae0c(0x792)][_0x55ae0c(0x79e)]=function(){const _0x488cd9=_0x55ae0c,_0x617ff2=$gameMap[_0x488cd9(0x4b2)]();if(!_0x617ff2)return;const _0x414d65=$gameMap[_0x488cd9(0x78f)]();if(Object[_0x488cd9(0x470)](_0x414d65)[_0x488cd9(0x616)]<=0x0)return;const _0x12efc8=$gameMap[_0x488cd9(0x8ee)]();this[_0x488cd9(0x45a)]=this[_0x488cd9(0x45a)]||[];for(let _0x31cbff=0x0;_0x31cbff<$gameMap['height']();_0x31cbff++){for(let _0xc1c993=0x0;_0xc1c993<$gameMap[_0x488cd9(0x780)]();_0xc1c993++){for(const _0x2bed27 of $gameMap['layeredTiles'](_0xc1c993,_0x31cbff)){const _0x4d057f=_0x12efc8[_0x2bed27]>>0xc,_0x3f8274=_0x414d65[_0x4d057f]||0x0;if(_0x3f8274<=0x0)continue;this[_0x488cd9(0x7bf)](_0xc1c993,_0x31cbff,_0x2bed27,_0x3f8274);}}}},Spriteset_Map[_0x55ae0c(0x792)][_0x55ae0c(0x57f)]=function(){const _0x4b71bc=_0x55ae0c;this[_0x4b71bc(0x45a)]=this[_0x4b71bc(0x45a)]||[];for(const _0x1355d2 of this[_0x4b71bc(0x45a)]){this[_0x4b71bc(0x79f)]['removeChild'](_0x1355d2);}this[_0x4b71bc(0x45a)]=[];},Spriteset_Map['prototype'][_0x55ae0c(0x7bf)]=function(_0x38ac04,_0x50e20c,_0x30f875,_0x3d8a44){const _0x20d511=_0x55ae0c,_0x3ed708=new Sprite_ExtendedTile(_0x38ac04,_0x50e20c,_0x30f875,_0x3d8a44),_0x3832bf=$gameMap[_0x20d511(0x8ee)]();_0x3832bf[_0x30f875]&0x10?_0x3ed708['z']=0x4:_0x3ed708['z']=0x3,this[_0x20d511(0x79f)][_0x20d511(0x359)](_0x3ed708),this[_0x20d511(0x45a)][_0x20d511(0x87e)](_0x3ed708);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x34b)]=Tilemap['prototype'][_0x55ae0c(0x563)],Tilemap[_0x55ae0c(0x792)][_0x55ae0c(0x563)]=function(_0x3677ba,_0x25d7d2,_0x377d46){const _0x4931e0=_0x55ae0c;if($gameMap['isTileExtended'](_0x3677ba))return;VisuMZ['CoreEngine'][_0x4931e0(0x34b)][_0x4931e0(0x67e)](this,_0x3677ba,_0x25d7d2,_0x377d46);},Spriteset_Battle[_0x55ae0c(0x47f)]=VisuMZ['CoreEngine'][_0x55ae0c(0x6c3)][_0x55ae0c(0x5fa)][_0x55ae0c(0x823)]||![],VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4b7)]=Scene_Battle[_0x55ae0c(0x792)]['createSpriteset'],Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x637)]=function(){const _0x2578b8=_0x55ae0c;VisuMZ[_0x2578b8(0x3ae)][_0x2578b8(0x4b7)][_0x2578b8(0x67e)](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x202c54=this[_0x2578b8(0x5d7)];if(!_0x202c54)return;this[_0x2578b8(0x90a)]=_0x202c54[_0x2578b8(0x90a)];if(!this['_pictureContainer'])return;this[_0x2578b8(0x359)](this[_0x2578b8(0x90a)]);},Spriteset_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x828)]=function(){const _0x43e463=_0x55ae0c;this[_0x43e463(0x893)]=new PIXI[(_0x43e463(0x318))][(_0x43e463(0x7dc))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager['backgroundBitmap'](),this[_0x43e463(0x415)][_0x43e463(0x318)]=[this[_0x43e463(0x893)]],this[_0x43e463(0x8f5)][_0x43e463(0x359)](this[_0x43e463(0x415)]);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x255)]=Spriteset_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x664)],Spriteset_Battle['prototype'][_0x55ae0c(0x664)]=function(){const _0x40ba21=_0x55ae0c;this[_0x40ba21(0x71a)]()&&this[_0x40ba21(0x5d5)](),VisuMZ[_0x40ba21(0x3ae)][_0x40ba21(0x255)]['call'](this);},Spriteset_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x71a)]=function(){const _0x38858f=_0x55ae0c,_0x43e64c=VisuMZ['CoreEngine'][_0x38858f(0x6c3)]['ScreenResolution'];if(!_0x43e64c)return![];if(Utils[_0x38858f(0x31f)]>=_0x38858f(0x8ca)&&!_0x43e64c[_0x38858f(0x8ea)])return![];return _0x43e64c[_0x38858f(0x4bd)];},Spriteset_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x5d5)]=function(){const _0x412c73=_0x55ae0c;for(member of $gameTroop[_0x412c73(0x63b)]()){member[_0x412c73(0x38c)]();}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)],Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x11999d){const _0x54407=_0x55ae0c;_0x11999d['x']=Math['round'](_0x11999d['x']),_0x11999d['y']=Math[_0x54407(0x41d)](_0x11999d['y']),_0x11999d[_0x54407(0x780)]=Math[_0x54407(0x41d)](_0x11999d[_0x54407(0x780)]),_0x11999d[_0x54407(0x555)]=Math[_0x54407(0x41d)](_0x11999d[_0x54407(0x555)]),this[_0x54407(0x240)](),VisuMZ[_0x54407(0x3ae)][_0x54407(0x5a2)]['call'](this,_0x11999d),this[_0x54407(0x35a)]();},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x240)]=function(){const _0xe9ddd1=_0x55ae0c;this[_0xe9ddd1(0x95f)]=VisuMZ[_0xe9ddd1(0x3ae)][_0xe9ddd1(0x6c3)][_0xe9ddd1(0x5fa)][_0xe9ddd1(0x954)],this['_digitGroupingEx']=VisuMZ[_0xe9ddd1(0x3ae)][_0xe9ddd1(0x6c3)][_0xe9ddd1(0x5fa)][_0xe9ddd1(0x399)];},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x407)]=function(){const _0x1c18cf=_0x55ae0c;return VisuMZ[_0x1c18cf(0x3ae)][_0x1c18cf(0x6c3)][_0x1c18cf(0x3ec)]['LineHeight'];},Window_Base[_0x55ae0c(0x792)]['itemPadding']=function(){const _0x137e37=_0x55ae0c;return VisuMZ[_0x137e37(0x3ae)][_0x137e37(0x6c3)][_0x137e37(0x3ec)]['ItemPadding'];},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x421)]=function(){const _0x1ebf44=_0x55ae0c;$gameSystem['windowOpacity']?this['backOpacity']=$gameSystem[_0x1ebf44(0x7ac)]():this[_0x1ebf44(0x819)]=VisuMZ[_0x1ebf44(0x3ae)][_0x1ebf44(0x6c3)][_0x1ebf44(0x3ec)][_0x1ebf44(0x237)];},Window_Base['prototype'][_0x55ae0c(0x517)]=function(){const _0x382c88=_0x55ae0c;return VisuMZ[_0x382c88(0x3ae)][_0x382c88(0x6c3)][_0x382c88(0x3ec)][_0x382c88(0x1bd)];},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x283)]=function(){const _0xc604bb=_0x55ae0c;return VisuMZ[_0xc604bb(0x3ae)][_0xc604bb(0x6c3)][_0xc604bb(0x3ec)][_0xc604bb(0x6e2)];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x745)]=Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)],Window_Base['prototype'][_0x55ae0c(0x4e1)]=function(){const _0x1e8af1=_0x55ae0c;VisuMZ[_0x1e8af1(0x3ae)][_0x1e8af1(0x745)][_0x1e8af1(0x67e)](this),this[_0x1e8af1(0x7d8)]();},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x1b5)]=function(){const _0x32d037=_0x55ae0c;this[_0x32d037(0x6d5)]&&(this[_0x32d037(0x3e9)]+=this['openingSpeed'](),this[_0x32d037(0x855)]()&&(this['_opening']=![]));},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x52b)]=function(){const _0x4711e2=_0x55ae0c;this[_0x4711e2(0x94c)]&&(this[_0x4711e2(0x3e9)]-=this[_0x4711e2(0x283)](),this[_0x4711e2(0x19b)]()&&(this['_closing']=![]));},VisuMZ['CoreEngine'][_0x55ae0c(0x979)]=Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x7d9)],Window_Base['prototype']['drawText']=function(_0x45c7aa,_0x4cbd37,_0x1592d6,_0x4fa415,_0x374885){const _0x2e8004=_0x55ae0c;if(this[_0x2e8004(0x974)]())_0x45c7aa=VisuMZ[_0x2e8004(0x5e3)](_0x45c7aa);VisuMZ['CoreEngine'][_0x2e8004(0x979)][_0x2e8004(0x67e)](this,_0x45c7aa,_0x4cbd37,_0x1592d6,_0x4fa415,_0x374885);},Window_Base['prototype']['useDigitGrouping']=function(){return this['_digitGrouping'];},VisuMZ['CoreEngine'][_0x55ae0c(0x675)]=Window_Base['prototype'][_0x55ae0c(0x734)],Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x734)]=function(_0x952b24,_0x4c8ccf,_0x30236a,_0x43d4fc){const _0x280309=_0x55ae0c;var _0x1ab315=VisuMZ[_0x280309(0x3ae)][_0x280309(0x675)][_0x280309(0x67e)](this,_0x952b24,_0x4c8ccf,_0x30236a,_0x43d4fc);if(this[_0x280309(0x663)]())_0x1ab315[_0x280309(0x6dd)]=String(VisuMZ[_0x280309(0x5e3)](_0x1ab315[_0x280309(0x6dd)]))||'';return _0x1ab315;},Window_Base['prototype'][_0x55ae0c(0x663)]=function(){return this['_digitGroupingEx'];},Window_Base['prototype'][_0x55ae0c(0x924)]=function(_0x2ae9c9){this['_digitGrouping']=_0x2ae9c9;},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x6d2)]=function(_0x209758){const _0x4c940a=_0x55ae0c;this[_0x4c940a(0x574)]=_0x209758;},VisuMZ[_0x55ae0c(0x3ae)]['Window_Base_drawIcon']=Window_Base['prototype'][_0x55ae0c(0x908)],Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x908)]=function(_0x46c4a1,_0x23681c,_0x477537){const _0x2f0188=_0x55ae0c;_0x23681c=Math[_0x2f0188(0x41d)](_0x23681c),_0x477537=Math[_0x2f0188(0x41d)](_0x477537),VisuMZ[_0x2f0188(0x3ae)]['Window_Base_drawIcon'][_0x2f0188(0x67e)](this,_0x46c4a1,_0x23681c,_0x477537);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7fb)]=Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x2d5)],Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x2d5)]=function(_0x3d1e5e,_0x193dfb,_0x49dc31,_0x534426,_0x310514,_0x2b8cf6){const _0x4d2b1c=_0x55ae0c;_0x310514=_0x310514||ImageManager[_0x4d2b1c(0x633)],_0x2b8cf6=_0x2b8cf6||ImageManager[_0x4d2b1c(0x360)],_0x49dc31=Math[_0x4d2b1c(0x41d)](_0x49dc31),_0x534426=Math[_0x4d2b1c(0x41d)](_0x534426),_0x310514=Math[_0x4d2b1c(0x41d)](_0x310514),_0x2b8cf6=Math[_0x4d2b1c(0x41d)](_0x2b8cf6),VisuMZ[_0x4d2b1c(0x3ae)][_0x4d2b1c(0x7fb)][_0x4d2b1c(0x67e)](this,_0x3d1e5e,_0x193dfb,_0x49dc31,_0x534426,_0x310514,_0x2b8cf6);},VisuMZ['CoreEngine'][_0x55ae0c(0x658)]=Window_Base[_0x55ae0c(0x792)]['drawCharacter'],Window_Base[_0x55ae0c(0x792)]['drawCharacter']=function(_0x39ad9f,_0x10e202,_0x57755f,_0x4ef6eb){const _0x51f698=_0x55ae0c;_0x57755f=Math[_0x51f698(0x41d)](_0x57755f),_0x4ef6eb=Math[_0x51f698(0x41d)](_0x4ef6eb),VisuMZ[_0x51f698(0x3ae)][_0x51f698(0x658)][_0x51f698(0x67e)](this,_0x39ad9f,_0x10e202,_0x57755f,_0x4ef6eb);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x833)]=Window_Selectable['prototype']['itemRect'],Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x352)]=function(_0x4db0b8){const _0x19bf24=_0x55ae0c;let _0x1e9308=VisuMZ[_0x19bf24(0x3ae)]['Window_Selectable_itemRect'][_0x19bf24(0x67e)](this,_0x4db0b8);return _0x1e9308['x']=Math[_0x19bf24(0x41d)](_0x1e9308['x']),_0x1e9308['y']=Math[_0x19bf24(0x41d)](_0x1e9308['y']),_0x1e9308['width']=Math[_0x19bf24(0x41d)](_0x1e9308[_0x19bf24(0x780)]),_0x1e9308[_0x19bf24(0x555)]=Math[_0x19bf24(0x41d)](_0x1e9308[_0x19bf24(0x555)]),_0x1e9308;},VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x55ae0c(0x792)][_0x55ae0c(0x248)],Window_StatusBase['prototype']['drawActorSimpleStatus']=function(_0x428133,_0x267482,_0x3b6437){const _0x3cb0b8=_0x55ae0c;_0x267482=Math['round'](_0x267482),_0x3b6437=Math[_0x3cb0b8(0x41d)](_0x3b6437),VisuMZ[_0x3cb0b8(0x3ae)]['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x428133,_0x267482,_0x3b6437);},Window_Base['prototype'][_0x55ae0c(0x35a)]=function(){const _0x4ff44b=_0x55ae0c;this[_0x4ff44b(0x309)]={'duration':0x0,'wholeDuration':0x0,'type':_0x4ff44b(0x3d9),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x4ff44b(0x610)]['x'],'targetScaleY':this[_0x4ff44b(0x610)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x4ff44b(0x819)],'targetContentsOpacity':this[_0x4ff44b(0x467)]};},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x7d8)]=function(){const _0xf3ceb0=_0x55ae0c;if(!this[_0xf3ceb0(0x309)])return;if(this[_0xf3ceb0(0x309)][_0xf3ceb0(0x2ef)]<=0x0)return;this['x']=this[_0xf3ceb0(0x40b)](this['x'],this['_coreEasing'][_0xf3ceb0(0x4e2)]),this['y']=this[_0xf3ceb0(0x40b)](this['y'],this[_0xf3ceb0(0x309)][_0xf3ceb0(0x54c)]),this[_0xf3ceb0(0x610)]['x']=this[_0xf3ceb0(0x40b)](this[_0xf3ceb0(0x610)]['x'],this[_0xf3ceb0(0x309)]['targetScaleX']),this[_0xf3ceb0(0x610)]['y']=this[_0xf3ceb0(0x40b)](this[_0xf3ceb0(0x610)]['y'],this[_0xf3ceb0(0x309)][_0xf3ceb0(0x198)]),this[_0xf3ceb0(0x5ad)]=this[_0xf3ceb0(0x40b)](this[_0xf3ceb0(0x5ad)],this[_0xf3ceb0(0x309)][_0xf3ceb0(0x72c)]),this[_0xf3ceb0(0x819)]=this[_0xf3ceb0(0x40b)](this[_0xf3ceb0(0x819)],this['_coreEasing'][_0xf3ceb0(0x56d)]),this['contentsOpacity']=this[_0xf3ceb0(0x40b)](this[_0xf3ceb0(0x467)],this[_0xf3ceb0(0x309)][_0xf3ceb0(0x7f9)]),this[_0xf3ceb0(0x309)][_0xf3ceb0(0x2ef)]--;},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x40b)]=function(_0x33c75e,_0x2a48ca){const _0xc5bc1d=_0x55ae0c;if(!this[_0xc5bc1d(0x309)])return _0x2a48ca;const _0x44707d=this[_0xc5bc1d(0x309)][_0xc5bc1d(0x2ef)],_0x27cf18=this[_0xc5bc1d(0x309)]['wholeDuration'],_0x2c529c=this[_0xc5bc1d(0x8f8)]((_0x27cf18-_0x44707d)/_0x27cf18),_0x530c4e=this['calcCoreEasing']((_0x27cf18-_0x44707d+0x1)/_0x27cf18),_0x6b1920=(_0x33c75e-_0x2a48ca*_0x2c529c)/(0x1-_0x2c529c);return _0x6b1920+(_0x2a48ca-_0x6b1920)*_0x530c4e;},Window_Base[_0x55ae0c(0x792)]['calcCoreEasing']=function(_0x403541){const _0x12c618=_0x55ae0c;if(!this[_0x12c618(0x309)])return _0x403541;return VisuMZ[_0x12c618(0x707)](_0x403541,this[_0x12c618(0x309)][_0x12c618(0x45b)]||_0x12c618(0x3d9));},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x5a8)]=function(_0x5c541e,_0x3b207b){const _0x15e6fb=_0x55ae0c;if(!this[_0x15e6fb(0x309)])return;this['x']=this[_0x15e6fb(0x309)][_0x15e6fb(0x4e2)],this['y']=this[_0x15e6fb(0x309)]['targetY'],this[_0x15e6fb(0x610)]['x']=this[_0x15e6fb(0x309)][_0x15e6fb(0x653)],this[_0x15e6fb(0x610)]['y']=this['_coreEasing'][_0x15e6fb(0x198)],this[_0x15e6fb(0x5ad)]=this[_0x15e6fb(0x309)][_0x15e6fb(0x72c)],this[_0x15e6fb(0x819)]=this[_0x15e6fb(0x309)]['targetBackOpacity'],this[_0x15e6fb(0x467)]=this['_coreEasing'][_0x15e6fb(0x7f9)],this[_0x15e6fb(0x2d2)](_0x5c541e,_0x3b207b,this['x'],this['y'],this['scale']['x'],this[_0x15e6fb(0x610)]['y'],this[_0x15e6fb(0x5ad)],this[_0x15e6fb(0x819)],this[_0x15e6fb(0x467)]);},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x2d2)]=function(_0x3309e6,_0x2146f3,_0x1d45f7,_0x4a4cda,_0x10aee9,_0x58830e,_0x2bca96,_0x534ebc,_0x4c371f){this['_coreEasing']={'duration':_0x3309e6,'wholeDuration':_0x3309e6,'type':_0x2146f3,'targetX':_0x1d45f7,'targetY':_0x4a4cda,'targetScaleX':_0x10aee9,'targetScaleY':_0x58830e,'targetOpacity':_0x2bca96,'targetBackOpacity':_0x534ebc,'targetContentsOpacity':_0x4c371f};},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x215)]=function(_0x1f8391,_0x55e20b,_0x4f38bc,_0x2c9201,_0x28ec3b){const _0x42c8e8=_0x55ae0c;this['resetFontSettings'](),this[_0x42c8e8(0x463)][_0x42c8e8(0x3ac)]=VisuMZ['CoreEngine'][_0x42c8e8(0x6c3)][_0x42c8e8(0x204)][_0x42c8e8(0x856)];const _0x4022b7=VisuMZ[_0x42c8e8(0x3ae)][_0x42c8e8(0x6c3)]['Gold'][_0x42c8e8(0x45c)];if(_0x4022b7>0x0&&_0x55e20b===TextManager[_0x42c8e8(0x83d)]){const _0x5b6045=_0x2c9201+(this[_0x42c8e8(0x407)]()-ImageManager[_0x42c8e8(0x5f9)])/0x2;this[_0x42c8e8(0x908)](_0x4022b7,_0x4f38bc+(_0x28ec3b-ImageManager['iconWidth']),_0x5b6045),_0x28ec3b-=ImageManager[_0x42c8e8(0x918)]+0x4;}else this[_0x42c8e8(0x30c)](ColorManager[_0x42c8e8(0x1e6)]()),this['drawText'](_0x55e20b,_0x4f38bc,_0x2c9201,_0x28ec3b,_0x42c8e8(0x339)),_0x28ec3b-=this[_0x42c8e8(0x351)](_0x55e20b)+0x6;this[_0x42c8e8(0x458)]();const _0x45bae7=this[_0x42c8e8(0x351)](this[_0x42c8e8(0x95f)]?VisuMZ['GroupDigits'](_0x1f8391):_0x1f8391);_0x45bae7>_0x28ec3b?this[_0x42c8e8(0x7d9)](VisuMZ[_0x42c8e8(0x3ae)]['Settings'][_0x42c8e8(0x204)][_0x42c8e8(0x534)],_0x4f38bc,_0x2c9201,_0x28ec3b,_0x42c8e8(0x339)):this[_0x42c8e8(0x7d9)](_0x1f8391,_0x4f38bc,_0x2c9201,_0x28ec3b,_0x42c8e8(0x339)),this[_0x42c8e8(0x257)]();},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x36c)]=function(_0x1c1da7,_0xf554e8,_0x2678c2,_0x53c5ae,_0x46cd5d){const _0x5323c3=_0x55ae0c,_0x404734=ImageManager[_0x5323c3(0x976)](_0x5323c3(0x6ff)),_0x492b50=ImageManager[_0x5323c3(0x918)],_0x30fe5b=ImageManager[_0x5323c3(0x5f9)],_0x428663=_0x1c1da7%0x10*_0x492b50,_0x5a8e82=Math[_0x5323c3(0x49a)](_0x1c1da7/0x10)*_0x30fe5b,_0x9d095a=_0x53c5ae,_0x294916=_0x53c5ae;this[_0x5323c3(0x463)][_0x5323c3(0x45f)][_0x5323c3(0x51f)]=_0x46cd5d,this[_0x5323c3(0x463)][_0x5323c3(0x685)](_0x404734,_0x428663,_0x5a8e82,_0x492b50,_0x30fe5b,_0xf554e8,_0x2678c2,_0x9d095a,_0x294916),this[_0x5323c3(0x463)][_0x5323c3(0x45f)][_0x5323c3(0x51f)]=!![];},Window_Base['prototype'][_0x55ae0c(0x6b8)]=function(_0x3f2883,_0x50b05c,_0xe82d16,_0x348f04,_0x28370a,_0x419347){const _0x182eb5=_0x55ae0c,_0x31afb3=Math[_0x182eb5(0x49a)]((_0xe82d16-0x2)*_0x348f04),_0x17371b=Sprite_Gauge[_0x182eb5(0x792)][_0x182eb5(0x1d9)][_0x182eb5(0x67e)](this),_0x3a46b5=_0x50b05c+this['lineHeight']()-_0x17371b-0x2;this[_0x182eb5(0x463)][_0x182eb5(0x5f6)](_0x3f2883,_0x3a46b5,_0xe82d16,_0x17371b,ColorManager['gaugeBackColor']()),this[_0x182eb5(0x463)][_0x182eb5(0x558)](_0x3f2883+0x1,_0x3a46b5+0x1,_0x31afb3,_0x17371b-0x2,_0x28370a,_0x419347);},Window_Scrollable['SCROLLBAR']={'enabled':VisuMZ['CoreEngine']['Settings'][_0x55ae0c(0x3ec)][_0x55ae0c(0x48f)]??!![],'thickness':VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['Window'][_0x55ae0c(0x4d0)]??0x2,'offset':VisuMZ['CoreEngine'][_0x55ae0c(0x6c3)]['Window'][_0x55ae0c(0x229)]??0x2,'bodyColor':VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x3ec)]['BarBodyColor']??0x0,'offColor':VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['Window'][_0x55ae0c(0x712)]??0x7,'offOpacity':VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x3ec)][_0x55ae0c(0x674)]??0x80},Window_Base[_0x55ae0c(0x792)]['isScrollBarVisible']=function(){const _0x513e95=_0x55ae0c;return Window_Scrollable[_0x513e95(0x34c)][_0x513e95(0x46a)]&&Window_Scrollable['SCROLLBAR']['thickness']>0x0;},VisuMZ['CoreEngine'][_0x55ae0c(0x582)]=Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x897)],Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x897)]=function(){const _0x4e6243=_0x55ae0c;VisuMZ[_0x4e6243(0x3ae)][_0x4e6243(0x582)][_0x4e6243(0x67e)](this),this[_0x4e6243(0x676)](),this[_0x4e6243(0x773)](!![]),this[_0x4e6243(0x773)](![]);},Window_Base[_0x55ae0c(0x792)]['createScrollBarSprites']=function(){const _0x345577=_0x55ae0c;if(!this[_0x345577(0x77c)]())return;if(this[_0x345577(0x61e)]||this[_0x345577(0x5f7)])return;this[_0x345577(0x98c)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x345577(0x61e)]=new Sprite(),this[_0x345577(0x5f7)]=new Sprite(),this[_0x345577(0x359)](this['_scrollBarHorz']),this[_0x345577(0x359)](this[_0x345577(0x5f7)]);},Window_Base['prototype'][_0x55ae0c(0x773)]=function(_0x1bdb94){const _0x5f0a7d=_0x55ae0c,_0x3f3639=_0x1bdb94?this['_scrollBarHorz']:this[_0x5f0a7d(0x5f7)];if(!_0x3f3639)return;const _0x24f9d0=Window_Scrollable[_0x5f0a7d(0x34c)],_0x5c39d9=_0x24f9d0[_0x5f0a7d(0x926)],_0xf92e2a=_0x1bdb94?this[_0x5f0a7d(0x431)]-_0x5c39d9*0x2:_0x5c39d9,_0x5f15fa=_0x1bdb94?_0x5c39d9:this[_0x5f0a7d(0x767)]-_0x5c39d9*0x2;_0x3f3639[_0x5f0a7d(0x5ce)]=new Bitmap(_0xf92e2a,_0x5f15fa),_0x3f3639['setFrame'](0x0,0x0,_0xf92e2a,_0x5f15fa),this[_0x5f0a7d(0x529)](_0x1bdb94);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x713)]=Window_Base['prototype']['destroyContents'],Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x3eb)]=function(){const _0xf54cdb=_0x55ae0c;VisuMZ[_0xf54cdb(0x3ae)]['Window_Base_destroyContents'][_0xf54cdb(0x67e)](this),this[_0xf54cdb(0x6e3)]();},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x6e3)]=function(){const _0x525917=_0x55ae0c,_0x5daa1b=[this['_scrollBarHorz'],this[_0x525917(0x5f7)]];for(const _0x482df4 of _0x5daa1b){if(_0x482df4&&_0x482df4[_0x525917(0x5ce)])_0x482df4['bitmap']['destroy']();}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x8e4)]=Window_Scrollable[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)],Window_Scrollable['prototype'][_0x55ae0c(0x4e1)]=function(){const _0x4e54c0=_0x55ae0c;VisuMZ[_0x4e54c0(0x3ae)][_0x4e54c0(0x8e4)]['call'](this),this[_0x4e54c0(0x247)]();},Window_Scrollable[_0x55ae0c(0x792)][_0x55ae0c(0x247)]=function(){const _0x41bd0f=_0x55ae0c;this[_0x41bd0f(0x62a)](),this['checkScrollBarBitmap'](!![]),this[_0x41bd0f(0x63d)](![]),this[_0x41bd0f(0x529)](!![]),this['updateScrollBarPosition'](![]);},Window_Scrollable[_0x55ae0c(0x792)]['updateScrollBarVisibility']=function(){const _0x17013f=_0x55ae0c,_0x27f88d=[this[_0x17013f(0x61e)],this[_0x17013f(0x5f7)]];for(const _0x5d32db of _0x27f88d){_0x5d32db&&(_0x5d32db['visible']=this[_0x17013f(0x77c)]()&&this[_0x17013f(0x855)]());}},Window_Scrollable[_0x55ae0c(0x792)][_0x55ae0c(0x63d)]=function(_0x58ed8f){const _0x56b6ab=_0x55ae0c;if(!this['_lastScrollBarValues'])return;const _0x2ebcf8=this[_0x56b6ab(0x23f)](_0x58ed8f),_0x5dfded=this[_0x56b6ab(0x4f4)](_0x58ed8f),_0x539247=_0x58ed8f?'horz':_0x56b6ab(0x960),_0x3d45a3=_0x58ed8f?_0x56b6ab(0x452):_0x56b6ab(0x4a0);(this[_0x56b6ab(0x98c)][_0x539247]!==_0x2ebcf8||this[_0x56b6ab(0x98c)][_0x3d45a3]!==_0x5dfded)&&(this[_0x56b6ab(0x98c)][_0x539247]=_0x2ebcf8,this[_0x56b6ab(0x98c)][_0x3d45a3]=_0x5dfded,this[_0x56b6ab(0x983)](_0x58ed8f,_0x2ebcf8,_0x5dfded));},Window_Scrollable[_0x55ae0c(0x792)][_0x55ae0c(0x23f)]=function(_0x5a907b){const _0xb4e7d6=_0x55ae0c;if(this[_0xb4e7d6(0x3c6)]!==undefined)return _0x5a907b?this['scrollX']():this[_0xb4e7d6(0x949)]['y'];return _0x5a907b?this[_0xb4e7d6(0x735)]():this[_0xb4e7d6(0x1a9)]();},Window_Scrollable[_0x55ae0c(0x792)]['maxScrollbar']=function(_0x4cf497){const _0x5dc794=_0x55ae0c;if(this[_0x5dc794(0x3c6)]!==undefined)return _0x4cf497?this['maxScrollX']():Math[_0x5dc794(0x391)](0x0,this[_0x5dc794(0x3c6)]-this[_0x5dc794(0x767)]);return _0x4cf497?this['maxScrollX']():this[_0x5dc794(0x457)]();},Window_Scrollable[_0x55ae0c(0x792)][_0x55ae0c(0x53c)]=function(){const _0x423ab2=_0x55ae0c;if(this['_allTextHeight']!==undefined)return Math[_0x423ab2(0x391)](0x0,this['_allTextHeight']);return this[_0x423ab2(0x63c)]();},Window_Scrollable[_0x55ae0c(0x792)]['refreshScrollBarBitmap']=function(_0x3928bf,_0x3e7254,_0x10bcd1){const _0x268b3d=_0x55ae0c,_0x3a4cc2=_0x3928bf?this[_0x268b3d(0x61e)]:this[_0x268b3d(0x5f7)];if(!_0x3a4cc2)return;if(!_0x3a4cc2[_0x268b3d(0x5ce)])return;const _0x20435f=_0x3a4cc2[_0x268b3d(0x5ce)];_0x20435f[_0x268b3d(0x3dd)]();if(_0x10bcd1<=0x0)return;const _0x488597=_0x3928bf?this[_0x268b3d(0x431)]/this[_0x268b3d(0x30f)]():this[_0x268b3d(0x767)]/this[_0x268b3d(0x53c)](),_0x2fa0d4=_0x3928bf?Math[_0x268b3d(0x41d)](_0x3e7254*_0x488597):0x0,_0x521aa3=_0x3928bf?0x0:Math[_0x268b3d(0x41d)](_0x3e7254*_0x488597),_0x506f1e=_0x3928bf?Math[_0x268b3d(0x41d)](_0x20435f['width']*_0x488597):_0x20435f[_0x268b3d(0x780)],_0x5c7f5c=_0x3928bf?_0x20435f[_0x268b3d(0x555)]:Math['round'](_0x20435f[_0x268b3d(0x555)]*_0x488597),_0x5c2f2d=Window_Scrollable[_0x268b3d(0x34c)],_0x2651ec=ColorManager[_0x268b3d(0x21b)](_0x5c2f2d['offColor']),_0x3a727b=ColorManager[_0x268b3d(0x21b)](_0x5c2f2d[_0x268b3d(0x86f)]),_0x58f39c=_0x5c2f2d['offOpacity'];_0x20435f[_0x268b3d(0x94e)]=_0x58f39c,_0x20435f['fillAll'](_0x2651ec),_0x20435f[_0x268b3d(0x94e)]=0xff,_0x20435f[_0x268b3d(0x5f6)](_0x2fa0d4,_0x521aa3,_0x506f1e,_0x5c7f5c,_0x3a727b);},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x529)]=function(_0x484db0){const _0x5cd70e=_0x55ae0c,_0x550202=_0x484db0?this[_0x5cd70e(0x61e)]:this[_0x5cd70e(0x5f7)];if(!_0x550202)return;const _0x596ee5=Window_Scrollable[_0x5cd70e(0x34c)],_0x32b4c4=_0x596ee5[_0x5cd70e(0x926)],_0x104dd7=_0x596ee5[_0x5cd70e(0x238)];if(!_0x550202[_0x5cd70e(0x4ff)])return;_0x550202['x']=this[_0x5cd70e(0x77d)]+(_0x484db0?_0x32b4c4:this['innerWidth']+_0x104dd7),_0x550202['y']=this['padding']+(_0x484db0?this['innerHeight']+_0x104dd7:_0x32b4c4);},Window_Selectable['prototype'][_0x55ae0c(0x7b8)]=function(_0x16e6a9){const _0x327bcf=_0x55ae0c;let _0x2e3b3e=this[_0x327bcf(0x5e8)]();const _0x57f4c9=this[_0x327bcf(0x751)](),_0x44620e=this['maxCols']();if(this[_0x327bcf(0x437)]()&&(_0x2e3b3e<_0x57f4c9||_0x16e6a9&&_0x44620e===0x1)){_0x2e3b3e+=_0x44620e;if(_0x2e3b3e>=_0x57f4c9)_0x2e3b3e=_0x57f4c9-0x1;this[_0x327bcf(0x8bd)](_0x2e3b3e);}else!this[_0x327bcf(0x437)]()&&((_0x2e3b3e<_0x57f4c9-_0x44620e||_0x16e6a9&&_0x44620e===0x1)&&this['smoothSelect']((_0x2e3b3e+_0x44620e)%_0x57f4c9));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4af)]=Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x7b8)],Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x7b8)]=function(_0x65fb0d){const _0x4c0864=_0x55ae0c;this[_0x4c0864(0x437)]()&&_0x65fb0d&&this[_0x4c0864(0x344)]()===0x1&&this[_0x4c0864(0x5e8)]()===this[_0x4c0864(0x751)]()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x4c0864(0x3ae)][_0x4c0864(0x4af)]['call'](this,_0x65fb0d);},Window_Selectable['prototype'][_0x55ae0c(0x68d)]=function(_0x51c910){const _0x1a4d60=_0x55ae0c;let _0x4f2bc6=Math['max'](0x0,this[_0x1a4d60(0x5e8)]());const _0x1e641a=this[_0x1a4d60(0x751)](),_0x40ac30=this['maxCols']();if(this['isUseModernControls']()&&_0x4f2bc6>0x0||_0x51c910&&_0x40ac30===0x1){_0x4f2bc6-=_0x40ac30;if(_0x4f2bc6<=0x0)_0x4f2bc6=0x0;this['smoothSelect'](_0x4f2bc6);}else!this['isUseModernControls']()&&((_0x4f2bc6>=_0x40ac30||_0x51c910&&_0x40ac30===0x1)&&this['smoothSelect']((_0x4f2bc6-_0x40ac30+_0x1e641a)%_0x1e641a));},VisuMZ[_0x55ae0c(0x3ae)]['Window_Selectable_cursorUp']=Window_Selectable['prototype'][_0x55ae0c(0x68d)],Window_Selectable[_0x55ae0c(0x792)]['cursorUp']=function(_0x537e89){const _0x32c1a3=_0x55ae0c;this['isUseModernControls']()&&_0x537e89&&this[_0x32c1a3(0x344)]()===0x1&&this[_0x32c1a3(0x5e8)]()===0x0?this[_0x32c1a3(0x8bd)](this['maxItems']()-0x1):VisuMZ[_0x32c1a3(0x3ae)]['Window_Selectable_cursorUp'][_0x32c1a3(0x67e)](this,_0x537e89);},Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x437)]=function(){const _0x554701=_0x55ae0c;return VisuMZ[_0x554701(0x3ae)]['Settings'][_0x554701(0x5fa)][_0x554701(0x21c)];},VisuMZ[_0x55ae0c(0x3ae)]['Window_Selectable_processCursorMove']=Window_Selectable['prototype'][_0x55ae0c(0x64b)],Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x64b)]=function(){const _0x33527d=_0x55ae0c;this[_0x33527d(0x437)]()?(this[_0x33527d(0x764)](),this[_0x33527d(0x327)]()):VisuMZ[_0x33527d(0x3ae)][_0x33527d(0x5e1)][_0x33527d(0x67e)](this);},Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x8c6)]=function(){return!![];},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0x5e6b72=_0x55ae0c;if(this['isCursorMovable']()){const _0x14bc78=this[_0x5e6b72(0x5e8)]();Input['isRepeated'](_0x5e6b72(0x8a6))&&(Input['isPressed'](_0x5e6b72(0x770))&&this[_0x5e6b72(0x8c6)]()?this[_0x5e6b72(0x906)]():this[_0x5e6b72(0x7b8)](Input['isTriggered']('down'))),Input[_0x5e6b72(0x3ca)]('up')&&(Input[_0x5e6b72(0x607)](_0x5e6b72(0x770))&&this[_0x5e6b72(0x8c6)]()?this[_0x5e6b72(0x700)]():this[_0x5e6b72(0x68d)](Input['isTriggered']('up'))),Input[_0x5e6b72(0x3ca)](_0x5e6b72(0x339))&&this[_0x5e6b72(0x56c)](Input['isTriggered'](_0x5e6b72(0x339))),Input[_0x5e6b72(0x3ca)](_0x5e6b72(0x3dc))&&this[_0x5e6b72(0x3bf)](Input[_0x5e6b72(0x99f)]('left')),!this[_0x5e6b72(0x68e)](_0x5e6b72(0x8aa))&&Input[_0x5e6b72(0x3ca)](_0x5e6b72(0x8aa))&&this[_0x5e6b72(0x906)](),!this[_0x5e6b72(0x68e)]('pageup')&&Input[_0x5e6b72(0x3ca)](_0x5e6b72(0x310))&&this[_0x5e6b72(0x700)](),this[_0x5e6b72(0x5e8)]()!==_0x14bc78&&this[_0x5e6b72(0x597)]();}},Window_Selectable[_0x55ae0c(0x792)]['processCursorHomeEndTrigger']=function(){const _0x697773=_0x55ae0c;if(this[_0x697773(0x2c8)]()){const _0x26f0a7=this[_0x697773(0x5e8)]();Input[_0x697773(0x99f)]('home')&&this[_0x697773(0x8bd)](Math[_0x697773(0x81a)](this[_0x697773(0x5e8)](),0x0)),Input['isTriggered'](_0x697773(0x202))&&this[_0x697773(0x8bd)](Math[_0x697773(0x391)](this['index'](),this[_0x697773(0x751)]()-0x1)),this['index']()!==_0x26f0a7&&this[_0x697773(0x597)]();}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x76f)]=Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x6bf)],Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x6bf)]=function(){const _0x158f63=_0x55ae0c;this[_0x158f63(0x437)]()?this[_0x158f63(0x425)]():VisuMZ[_0x158f63(0x3ae)][_0x158f63(0x76f)][_0x158f63(0x67e)](this);},Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x425)]=function(){const _0x395db7=_0x55ae0c;VisuMZ[_0x395db7(0x3ae)]['Window_Selectable_processTouch'][_0x395db7(0x67e)](this);},Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x80c)]=function(){const _0x4f15eb=_0x55ae0c;return VisuMZ['CoreEngine']['Settings']['Window'][_0x4f15eb(0x8df)];},Window_Selectable[_0x55ae0c(0x792)]['rowSpacing']=function(){const _0x2c31da=_0x55ae0c;return VisuMZ[_0x2c31da(0x3ae)][_0x2c31da(0x6c3)][_0x2c31da(0x3ec)]['RowSpacing'];},Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x5a1)]=function(){const _0x3d477b=_0x55ae0c;return Window_Scrollable[_0x3d477b(0x792)][_0x3d477b(0x5a1)][_0x3d477b(0x67e)](this)+VisuMZ['CoreEngine'][_0x3d477b(0x6c3)][_0x3d477b(0x3ec)][_0x3d477b(0x7b9)];;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7df)]=Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x75b)],Window_Selectable[_0x55ae0c(0x792)][_0x55ae0c(0x75b)]=function(_0x4e251f){const _0x307eb1=_0x55ae0c,_0x4be8c2=VisuMZ[_0x307eb1(0x3ae)][_0x307eb1(0x6c3)][_0x307eb1(0x3ec)];if(_0x4be8c2[_0x307eb1(0x1c8)]===![])return;_0x4be8c2[_0x307eb1(0x990)]?_0x4be8c2[_0x307eb1(0x990)][_0x307eb1(0x67e)](this,_0x4e251f):VisuMZ['CoreEngine'][_0x307eb1(0x7df)]['call'](this,_0x4e251f);},VisuMZ['CoreEngine']['Window_Gold_refresh']=Window_Gold['prototype'][_0x55ae0c(0x1a4)],Window_Gold[_0x55ae0c(0x792)][_0x55ae0c(0x1a4)]=function(){const _0x3fce61=_0x55ae0c;this[_0x3fce61(0x26a)]()?this[_0x3fce61(0x33b)]():VisuMZ[_0x3fce61(0x3ae)][_0x3fce61(0x561)]['call'](this);},Window_Gold[_0x55ae0c(0x792)][_0x55ae0c(0x26a)]=function(){const _0x160632=_0x55ae0c;if(TextManager[_0x160632(0x83d)]!==this[_0x160632(0x83d)]())return![];return VisuMZ['CoreEngine'][_0x160632(0x6c3)]['Gold'][_0x160632(0x1a3)];},Window_Gold[_0x55ae0c(0x792)]['drawGoldItemStyle']=function(){const _0x107b7c=_0x55ae0c;this[_0x107b7c(0x257)](),this[_0x107b7c(0x463)]['clear'](),this['contents'][_0x107b7c(0x3ac)]=VisuMZ[_0x107b7c(0x3ae)][_0x107b7c(0x6c3)]['Gold'][_0x107b7c(0x856)];const _0x6e2990=VisuMZ[_0x107b7c(0x3ae)][_0x107b7c(0x6c3)][_0x107b7c(0x204)][_0x107b7c(0x45c)],_0x5cb609=this[_0x107b7c(0x94b)](0x0);if(_0x6e2990>0x0){const _0x4bf8ac=ImageManager[_0x107b7c(0x1f7)]||0x20,_0x16418a=_0x4bf8ac-ImageManager[_0x107b7c(0x918)],_0x207baa=_0x5cb609['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x107b7c(0x908)](_0x6e2990,_0x5cb609['x']+Math[_0x107b7c(0x478)](_0x16418a/0x2),_0x207baa);const _0x4f1bb9=_0x4bf8ac+0x4;_0x5cb609['x']+=_0x4f1bb9,_0x5cb609['width']-=_0x4f1bb9;}this[_0x107b7c(0x30c)](ColorManager['systemColor']()),this[_0x107b7c(0x7d9)](this[_0x107b7c(0x83d)](),_0x5cb609['x'],_0x5cb609['y'],_0x5cb609[_0x107b7c(0x780)],'left');const _0x37f572=this['textWidth'](this[_0x107b7c(0x83d)]())+0x6;;_0x5cb609['x']+=_0x37f572,_0x5cb609[_0x107b7c(0x780)]-=_0x37f572,this[_0x107b7c(0x458)]();const _0x1c14e2=this['value'](),_0x32cf8b=this[_0x107b7c(0x351)](this[_0x107b7c(0x95f)]?VisuMZ['GroupDigits'](this[_0x107b7c(0x80a)]()):this[_0x107b7c(0x80a)]());_0x32cf8b>_0x5cb609[_0x107b7c(0x780)]?this[_0x107b7c(0x7d9)](VisuMZ['CoreEngine'][_0x107b7c(0x6c3)][_0x107b7c(0x204)][_0x107b7c(0x534)],_0x5cb609['x'],_0x5cb609['y'],_0x5cb609[_0x107b7c(0x780)],_0x107b7c(0x339)):this[_0x107b7c(0x7d9)](this[_0x107b7c(0x80a)](),_0x5cb609['x'],_0x5cb609['y'],_0x5cb609[_0x107b7c(0x780)],'right'),this[_0x107b7c(0x257)]();},Window_StatusBase[_0x55ae0c(0x792)]['drawParamText']=function(_0x58bfe4,_0x211e4a,_0x4c871d,_0x227680,_0x49a197){const _0x2fac25=_0x55ae0c;_0x227680=String(_0x227680||'')[_0x2fac25(0x8d3)]();if(VisuMZ['CoreEngine']['Settings'][_0x2fac25(0x94d)]['DrawIcons']){const _0x4fd1ca=VisuMZ['GetParamIcon'](_0x227680);if(_0x49a197)this[_0x2fac25(0x36c)](_0x4fd1ca,_0x58bfe4,_0x211e4a,this['gaugeLineHeight']()),_0x4c871d-=this[_0x2fac25(0x5f5)]()+0x2,_0x58bfe4+=this['gaugeLineHeight']()+0x2;else{const _0x1e7c6d=ImageManager[_0x2fac25(0x1f7)]||0x20,_0x293add=ImageManager[_0x2fac25(0x609)]||0x20,_0x4cd6b8=_0x1e7c6d-ImageManager['iconWidth'],_0x493099=_0x293add-ImageManager[_0x2fac25(0x5f9)];let _0x1cd1ae=0x2,_0x1a2c16=0x2;this[_0x2fac25(0x407)]()!==0x24&&(_0x1a2c16=Math[_0x2fac25(0x49a)]((this['lineHeight']()-_0x293add)/0x2));const _0x2701cf=_0x58bfe4+Math[_0x2fac25(0x49a)](_0x4cd6b8/0x2)+_0x1cd1ae,_0x28bed2=_0x211e4a+Math['floor'](_0x493099/0x2)+_0x1a2c16;this[_0x2fac25(0x908)](_0x4fd1ca,_0x2701cf,_0x28bed2),_0x4c871d-=_0x1e7c6d+0x4,_0x58bfe4+=_0x1e7c6d+0x4;}}const _0x405721=TextManager['param'](_0x227680);this[_0x2fac25(0x257)](),this['changeTextColor'](ColorManager['systemColor']()),_0x49a197?(this[_0x2fac25(0x463)][_0x2fac25(0x3ac)]=this[_0x2fac25(0x390)](),this[_0x2fac25(0x463)][_0x2fac25(0x7d9)](_0x405721,_0x58bfe4,_0x211e4a,_0x4c871d,this[_0x2fac25(0x5f5)](),_0x2fac25(0x3dc))):this[_0x2fac25(0x7d9)](_0x405721,_0x58bfe4,_0x211e4a,_0x4c871d),this[_0x2fac25(0x257)]();},Window_StatusBase['prototype'][_0x55ae0c(0x390)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x55ae0c(0x792)]['drawActorClass']=function(_0x172d2e,_0x24cf2f,_0x2a943f,_0x2b12d2){const _0x350631=_0x55ae0c;_0x2b12d2=_0x2b12d2||0xa8,this['resetTextColor']();if(VisuMZ[_0x350631(0x3ae)][_0x350631(0x6c3)]['UI']['TextCodeClassNames'])this['drawTextEx'](_0x172d2e[_0x350631(0x1af)]()[_0x350631(0x61b)],_0x24cf2f,_0x2a943f,_0x2b12d2);else{const _0x2c3dc9=_0x172d2e[_0x350631(0x1af)]()[_0x350631(0x61b)][_0x350631(0x4ca)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x2c3dc9,_0x24cf2f,_0x2a943f,_0x2b12d2);}},Window_StatusBase['prototype'][_0x55ae0c(0x4bb)]=function(_0x544ffc,_0x14b53e,_0x520355,_0x3c9d40){const _0x5b4565=_0x55ae0c;_0x3c9d40=_0x3c9d40||0x10e,this[_0x5b4565(0x458)]();if(VisuMZ[_0x5b4565(0x3ae)][_0x5b4565(0x6c3)]['UI'][_0x5b4565(0x97a)])this['drawTextEx'](_0x544ffc[_0x5b4565(0x2af)](),_0x14b53e,_0x520355,_0x3c9d40);else{const _0x1362de=_0x544ffc[_0x5b4565(0x2af)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x5b4565(0x7d9)](_0x544ffc[_0x5b4565(0x2af)](),_0x14b53e,_0x520355,_0x3c9d40);}},VisuMZ['CoreEngine'][_0x55ae0c(0x3b9)]=Window_StatusBase['prototype'][_0x55ae0c(0x736)],Window_StatusBase['prototype']['drawActorLevel']=function(_0x29d480,_0x83ce5a,_0xa9bf1c){const _0xcc8ded=_0x55ae0c;if(VisuMZ[_0xcc8ded(0x3ae)]['Settings']['Param'][_0xcc8ded(0x314)]===![])return;if(this[_0xcc8ded(0x710)]())this[_0xcc8ded(0x1e3)](_0x29d480,_0x83ce5a,_0xa9bf1c);VisuMZ[_0xcc8ded(0x3ae)][_0xcc8ded(0x3b9)][_0xcc8ded(0x67e)](this,_0x29d480,_0x83ce5a,_0xa9bf1c);},Window_StatusBase[_0x55ae0c(0x792)]['isExpGaugeDrawn']=function(){const _0x4506f5=_0x55ae0c;return VisuMZ[_0x4506f5(0x3ae)][_0x4506f5(0x6c3)]['UI'][_0x4506f5(0x32a)];},Window_StatusBase[_0x55ae0c(0x792)]['drawActorExpGauge']=function(_0x3b90d3,_0x954dec,_0x1a7df8){const _0x11211c=_0x55ae0c;if(!_0x3b90d3)return;if(!_0x3b90d3['isActor']())return;const _0x11a67d=0x80,_0x2e2865=_0x3b90d3[_0x11211c(0x59a)]();let _0x3cc7fd=ColorManager[_0x11211c(0x818)](),_0x5c50e5=ColorManager[_0x11211c(0x465)]();_0x2e2865>=0x1&&(_0x3cc7fd=ColorManager[_0x11211c(0x679)](),_0x5c50e5=ColorManager[_0x11211c(0x52e)]()),this['drawGauge'](_0x954dec,_0x1a7df8,_0x11a67d,_0x2e2865,_0x3cc7fd,_0x5c50e5);},Window_EquipStatus[_0x55ae0c(0x792)][_0x55ae0c(0x97b)]=function(){const _0xab85f3=_0x55ae0c;let _0x508e99=0x0;for(const _0x4be3b6 of VisuMZ['CoreEngine'][_0xab85f3(0x6c3)][_0xab85f3(0x94d)][_0xab85f3(0x963)]){const _0x196013=this[_0xab85f3(0x837)](),_0x569417=this[_0xab85f3(0x846)](_0x508e99);this['drawItem'](_0x196013,_0x569417,_0x4be3b6),_0x508e99++;}},Window_EquipStatus['prototype'][_0x55ae0c(0x44b)]=function(_0x17c4d2,_0x4d926c,_0x1d191e){const _0x1697ef=_0x55ae0c,_0x46a860=this[_0x1697ef(0x8e7)]()-this['itemPadding']()*0x2;this[_0x1697ef(0x740)](_0x17c4d2,_0x4d926c,_0x46a860,_0x1d191e,![]);},Window_EquipStatus['prototype'][_0x55ae0c(0x27d)]=function(_0x483ec5,_0x23d632,_0x3a93c0){const _0x74b850=_0x55ae0c,_0xa9be78=this[_0x74b850(0x845)]();this[_0x74b850(0x458)](),this[_0x74b850(0x7d9)](this[_0x74b850(0x56a)][_0x74b850(0x280)](_0x3a93c0,!![]),_0x483ec5,_0x23d632,_0xa9be78,_0x74b850(0x339));},Window_EquipStatus[_0x55ae0c(0x792)][_0x55ae0c(0x6fc)]=function(_0x40815c,_0xfbad04){const _0x3e937d=_0x55ae0c,_0x1a522f=this[_0x3e937d(0x52a)]();this[_0x3e937d(0x30c)](ColorManager['systemColor']());const _0x3ab754=VisuMZ[_0x3e937d(0x3ae)][_0x3e937d(0x6c3)]['UI'][_0x3e937d(0x2cc)];this[_0x3e937d(0x7d9)](_0x3ab754,_0x40815c,_0xfbad04,_0x1a522f,_0x3e937d(0x3f8));},Window_EquipStatus[_0x55ae0c(0x792)][_0x55ae0c(0x925)]=function(_0xd15138,_0x2e09d3,_0x2fb5e8){const _0x89f7a1=_0x55ae0c,_0x511366=this[_0x89f7a1(0x845)](),_0x554453=this['_tempActor'][_0x89f7a1(0x280)](_0x2fb5e8),_0x2435dd=_0x554453-this[_0x89f7a1(0x56a)][_0x89f7a1(0x280)](_0x2fb5e8);this[_0x89f7a1(0x30c)](ColorManager['paramchangeTextColor'](_0x2435dd)),this['drawText'](this['_tempActor'][_0x89f7a1(0x280)](_0x2fb5e8,!![]),_0xd15138,_0x2e09d3,_0x511366,_0x89f7a1(0x339));},VisuMZ[_0x55ae0c(0x3ae)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype']['isEnabled'],Window_EquipItem[_0x55ae0c(0x792)][_0x55ae0c(0x3fd)]=function(_0x18864b){const _0x468284=_0x55ae0c;return _0x18864b&&this[_0x468284(0x56a)]?this[_0x468284(0x56a)][_0x468284(0x551)](_0x18864b):VisuMZ[_0x468284(0x3ae)][_0x468284(0x426)]['call'](this,_0x18864b);},Window_StatusParams['prototype']['maxItems']=function(){const _0x36c3fc=_0x55ae0c;return VisuMZ[_0x36c3fc(0x3ae)][_0x36c3fc(0x6c3)]['Param'][_0x36c3fc(0x963)]['length'];},Window_StatusParams[_0x55ae0c(0x792)][_0x55ae0c(0x224)]=function(_0x2fb641){const _0xb8f662=_0x55ae0c,_0x296c95=this[_0xb8f662(0x94b)](_0x2fb641),_0x6f4837=VisuMZ['CoreEngine'][_0xb8f662(0x6c3)]['Param'][_0xb8f662(0x963)][_0x2fb641],_0x5c60a6=TextManager[_0xb8f662(0x26b)](_0x6f4837),_0xa0eebd=this[_0xb8f662(0x56a)][_0xb8f662(0x280)](_0x6f4837,!![]);this[_0xb8f662(0x740)](_0x296c95['x'],_0x296c95['y'],0xa0,_0x6f4837,![]),this[_0xb8f662(0x458)](),this[_0xb8f662(0x7d9)](_0xa0eebd,_0x296c95['x']+0xa0,_0x296c95['y'],0x3c,_0xb8f662(0x339));};if(VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['KeyboardInput']['EnableNameInput']){VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x6a2)][_0x55ae0c(0x545)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x55ae0c(0x3ae)]['Window_NameInput_initialize']=Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x36e11d){const _0x568b14=_0x55ae0c;this[_0x568b14(0x643)]=this[_0x568b14(0x4c6)](),VisuMZ[_0x568b14(0x3ae)]['Window_NameInput_initialize'][_0x568b14(0x67e)](this,_0x36e11d),this['_mode']===_0x568b14(0x1cb)?this[_0x568b14(0x291)](0x0):(Input[_0x568b14(0x3dd)](),this[_0x568b14(0x580)]());},Window_NameInput[_0x55ae0c(0x792)]['defaultInputMode']=function(){const _0x279eeb=_0x55ae0c;if(Input[_0x279eeb(0x3bb)]())return _0x279eeb(0x1cb);return VisuMZ[_0x279eeb(0x3ae)][_0x279eeb(0x6c3)][_0x279eeb(0x6a2)][_0x279eeb(0x861)]||_0x279eeb(0x3fe);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4a7)]=Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x839)],Window_NameInput['prototype'][_0x55ae0c(0x839)]=function(){const _0x2ad9d=_0x55ae0c;if(!this[_0x2ad9d(0x855)]())return;if(!this['active'])return;if(this[_0x2ad9d(0x643)]===_0x2ad9d(0x3fe)&&Input['isGamepadTriggered']())this[_0x2ad9d(0x7b3)](_0x2ad9d(0x1cb));else{if(Input[_0x2ad9d(0x841)](_0x2ad9d(0x380)))Input[_0x2ad9d(0x3dd)](),this[_0x2ad9d(0x3f2)]();else{if(Input['isTriggered'](_0x2ad9d(0x385)))Input[_0x2ad9d(0x3dd)](),this[_0x2ad9d(0x643)]===_0x2ad9d(0x3fe)?this[_0x2ad9d(0x7b3)]('default'):this[_0x2ad9d(0x7b3)]('keyboard');else{if(this[_0x2ad9d(0x643)]===_0x2ad9d(0x3fe))this['processKeyboardHandling']();else Input['isSpecialCode']('escape')?(Input[_0x2ad9d(0x3dd)](),this[_0x2ad9d(0x7b3)](_0x2ad9d(0x3fe))):VisuMZ[_0x2ad9d(0x3ae)][_0x2ad9d(0x4a7)]['call'](this);}}}},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x389)]=Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x6bf)],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x6bf)]=function(){const _0x11b23b=_0x55ae0c;if(!this[_0x11b23b(0x82d)]())return;if(this['_mode']===_0x11b23b(0x3fe)){if(TouchInput['isTriggered']()&&this[_0x11b23b(0x4dc)]())this[_0x11b23b(0x7b3)](_0x11b23b(0x1cb));else TouchInput['isCancelled']()&&this[_0x11b23b(0x7b3)]('default');}else VisuMZ[_0x11b23b(0x3ae)][_0x11b23b(0x389)][_0x11b23b(0x67e)](this);},Window_NameInput[_0x55ae0c(0x792)]['processKeyboardHandling']=function(){const _0x411a5c=_0x55ae0c;if(Input['isSpecialCode'](_0x411a5c(0x7e5)))Input[_0x411a5c(0x3dd)](),this[_0x411a5c(0x81c)]();else{if(Input[_0x411a5c(0x264)]!==undefined){let _0x17718d=Input['_inputString'],_0x1bbd95=_0x17718d['length'];for(let _0x4e704c=0x0;_0x4e704c<_0x1bbd95;++_0x4e704c){this['_editWindow'][_0x411a5c(0x343)](_0x17718d[_0x4e704c])?SoundManager[_0x411a5c(0x894)]():SoundManager[_0x411a5c(0x408)]();}Input['clear']();}}},Window_NameInput[_0x55ae0c(0x792)]['switchModes']=function(_0x335e5f){const _0x3a1d18=_0x55ae0c;let _0x4a7cdd=this[_0x3a1d18(0x643)];this['_mode']=_0x335e5f,_0x4a7cdd!==this['_mode']&&(this['refresh'](),SoundManager[_0x3a1d18(0x894)](),this[_0x3a1d18(0x643)]===_0x3a1d18(0x1cb)?this[_0x3a1d18(0x291)](0x0):this['select'](-0x1));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4d2)]=Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x7b8)],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x7b8)]=function(_0x286b21){const _0x287542=_0x55ae0c;if(this[_0x287542(0x643)]===_0x287542(0x3fe)&&!Input[_0x287542(0x62c)]())return;if(Input[_0x287542(0x462)]())return;VisuMZ['CoreEngine'][_0x287542(0x4d2)][_0x287542(0x67e)](this,_0x286b21),this[_0x287542(0x7b3)](_0x287542(0x1cb));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x786)]=Window_NameInput[_0x55ae0c(0x792)]['cursorUp'],Window_NameInput['prototype'][_0x55ae0c(0x68d)]=function(_0x2ea65e){const _0x59ad53=_0x55ae0c;if(this[_0x59ad53(0x643)]===_0x59ad53(0x3fe)&&!Input[_0x59ad53(0x62c)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x59ad53(0x3ae)][_0x59ad53(0x786)][_0x59ad53(0x67e)](this,_0x2ea65e),this[_0x59ad53(0x7b3)](_0x59ad53(0x1cb));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x45e)]=Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x56c)],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x56c)]=function(_0x4b529a){const _0x7443a8=_0x55ae0c;if(this[_0x7443a8(0x643)]===_0x7443a8(0x3fe)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x7443a8(0x3ae)][_0x7443a8(0x45e)]['call'](this,_0x4b529a),this[_0x7443a8(0x7b3)](_0x7443a8(0x1cb));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x5f1)]=Window_NameInput['prototype']['cursorLeft'],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x3bf)]=function(_0x5940f2){const _0x2a8f5c=_0x55ae0c;if(this['_mode']===_0x2a8f5c(0x3fe)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2a8f5c(0x3ae)]['Window_NameInput_cursorLeft'][_0x2a8f5c(0x67e)](this,_0x5940f2),this[_0x2a8f5c(0x7b3)](_0x2a8f5c(0x1cb));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x553)]=Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x906)],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x906)]=function(){const _0x25d473=_0x55ae0c;if(this[_0x25d473(0x643)]===_0x25d473(0x3fe))return;if(Input[_0x25d473(0x462)]())return;VisuMZ[_0x25d473(0x3ae)]['Window_NameInput_cursorPagedown']['call'](this),this[_0x25d473(0x7b3)]('default');},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1da)]=Window_NameInput['prototype'][_0x55ae0c(0x700)],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x700)]=function(){const _0x2a29f3=_0x55ae0c;if(this[_0x2a29f3(0x643)]==='keyboard')return;if(Input['isNumpadPressed']())return;VisuMZ[_0x2a29f3(0x3ae)]['Window_NameInput_cursorPageup'][_0x2a29f3(0x67e)](this),this[_0x2a29f3(0x7b3)](_0x2a29f3(0x1cb));},VisuMZ[_0x55ae0c(0x3ae)]['Window_NameInput_refresh']=Window_NameInput[_0x55ae0c(0x792)]['refresh'],Window_NameInput[_0x55ae0c(0x792)][_0x55ae0c(0x1a4)]=function(){const _0x55d1d7=_0x55ae0c;if(this[_0x55d1d7(0x643)]===_0x55d1d7(0x3fe)){this[_0x55d1d7(0x463)][_0x55d1d7(0x3dd)](),this['contentsBack'][_0x55d1d7(0x3dd)](),this[_0x55d1d7(0x458)]();let _0x4574b2=VisuMZ['CoreEngine'][_0x55d1d7(0x6c3)][_0x55d1d7(0x6a2)][_0x55d1d7(0x35d)]['split']('\x0a'),_0x3e50c2=_0x4574b2['length'],_0x83e0de=(this[_0x55d1d7(0x767)]-_0x3e50c2*this[_0x55d1d7(0x407)]())/0x2;for(let _0x251a73=0x0;_0x251a73<_0x3e50c2;++_0x251a73){let _0x4dc2ca=_0x4574b2[_0x251a73],_0x4d8631=this[_0x55d1d7(0x2c4)](_0x4dc2ca)[_0x55d1d7(0x780)],_0x449497=Math[_0x55d1d7(0x49a)]((this[_0x55d1d7(0x463)]['width']-_0x4d8631)/0x2);this[_0x55d1d7(0x2e4)](_0x4dc2ca,_0x449497,_0x83e0de),_0x83e0de+=this[_0x55d1d7(0x407)]();}}else VisuMZ['CoreEngine'][_0x55d1d7(0x3c1)][_0x55d1d7(0x67e)](this);};};VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7dd)]=Window_ShopSell[_0x55ae0c(0x792)]['isEnabled'],Window_ShopSell[_0x55ae0c(0x792)]['isEnabled']=function(_0x19344a){const _0x32ad6d=_0x55ae0c;return VisuMZ[_0x32ad6d(0x3ae)][_0x32ad6d(0x6c3)][_0x32ad6d(0x5fa)][_0x32ad6d(0x717)]&&DataManager[_0x32ad6d(0x91b)](_0x19344a)?![]:VisuMZ[_0x32ad6d(0x3ae)][_0x32ad6d(0x7dd)][_0x32ad6d(0x67e)](this,_0x19344a);},Window_NumberInput[_0x55ae0c(0x792)]['isUseModernControls']=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0x55ae0c(0x6a2)][_0x55ae0c(0x84d)]&&(VisuMZ['CoreEngine']['Window_NumberInput_start']=Window_NumberInput['prototype'][_0x55ae0c(0x60b)],Window_NumberInput['prototype'][_0x55ae0c(0x60b)]=function(){const _0x21a486=_0x55ae0c;VisuMZ[_0x21a486(0x3ae)][_0x21a486(0x68c)]['call'](this),this[_0x21a486(0x291)](this[_0x21a486(0x651)]-0x1),Input['clear']();},VisuMZ['CoreEngine'][_0x55ae0c(0x8f0)]=Window_NumberInput['prototype'][_0x55ae0c(0x3c0)],Window_NumberInput[_0x55ae0c(0x792)][_0x55ae0c(0x3c0)]=function(){const _0x263d64=_0x55ae0c;if(!this['isOpenAndActive']())return;if(Input[_0x263d64(0x462)]())this[_0x263d64(0x2e7)]();else{if(Input[_0x263d64(0x841)](_0x263d64(0x380)))this[_0x263d64(0x895)]();else{if(Input[_0x263d64(0x6c9)]===0x2e)this[_0x263d64(0x8d0)]();else{if(Input[_0x263d64(0x6c9)]===0x24)this[_0x263d64(0x29d)]();else Input[_0x263d64(0x6c9)]===0x23?this[_0x263d64(0x878)]():VisuMZ['CoreEngine'][_0x263d64(0x8f0)]['call'](this);}}}},Window_NumberInput[_0x55ae0c(0x792)][_0x55ae0c(0x64b)]=function(){const _0x134711=_0x55ae0c;if(!this['isCursorMovable']())return;Input[_0x134711(0x462)]()?this[_0x134711(0x2e7)]():Window_Selectable[_0x134711(0x792)][_0x134711(0x64b)][_0x134711(0x67e)](this);},Window_NumberInput[_0x55ae0c(0x792)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x55ae0c(0x792)]['processKeyboardDigitChange']=function(){const _0x1fe153=_0x55ae0c;if(String(this[_0x1fe153(0x67c)])['length']>=this[_0x1fe153(0x651)])return;const _0x2f6817=Number(String(this[_0x1fe153(0x67c)])+Input['_inputString']);if(isNaN(_0x2f6817))return;this['_number']=_0x2f6817;const _0x3f3874='9'[_0x1fe153(0x93f)](this[_0x1fe153(0x651)]);this[_0x1fe153(0x67c)]=this[_0x1fe153(0x67c)][_0x1fe153(0x621)](0x0,_0x3f3874),Input['clear'](),this[_0x1fe153(0x1a4)](),SoundManager[_0x1fe153(0x336)](),this[_0x1fe153(0x291)](this[_0x1fe153(0x651)]-0x1);},Window_NumberInput['prototype'][_0x55ae0c(0x895)]=function(){const _0x4d220c=_0x55ae0c;this[_0x4d220c(0x67c)]=Number(String(this[_0x4d220c(0x67c)])[_0x4d220c(0x8dd)](0x0,-0x1)),this[_0x4d220c(0x67c)]=Math[_0x4d220c(0x391)](0x0,this[_0x4d220c(0x67c)]),Input[_0x4d220c(0x3dd)](),this[_0x4d220c(0x1a4)](),SoundManager['playCursor'](),this[_0x4d220c(0x291)](this[_0x4d220c(0x651)]-0x1);},Window_NumberInput[_0x55ae0c(0x792)][_0x55ae0c(0x8d0)]=function(){const _0x1f32a9=_0x55ae0c;this[_0x1f32a9(0x67c)]=Number(String(this[_0x1f32a9(0x67c)])['substring'](0x1)),this['_number']=Math[_0x1f32a9(0x391)](0x0,this['_number']),Input[_0x1f32a9(0x3dd)](),this[_0x1f32a9(0x1a4)](),SoundManager[_0x1f32a9(0x336)](),this[_0x1f32a9(0x291)](this[_0x1f32a9(0x651)]-0x1);},Window_NumberInput[_0x55ae0c(0x792)][_0x55ae0c(0x29d)]=function(){const _0x31bf13=_0x55ae0c;if(this['index']()===0x0)return;Input[_0x31bf13(0x3dd)](),this['refresh'](),SoundManager['playCursor'](),this['select'](0x0);},Window_NumberInput['prototype'][_0x55ae0c(0x878)]=function(){const _0xd795c1=_0x55ae0c;if(this[_0xd795c1(0x5e8)]()===this['_maxDigits']-0x1)return;Input[_0xd795c1(0x3dd)](),this[_0xd795c1(0x1a4)](),SoundManager[_0xd795c1(0x336)](),this[_0xd795c1(0x291)](this[_0xd795c1(0x651)]-0x1);});;VisuMZ['CoreEngine'][_0x55ae0c(0x3f1)]=Window_MapName[_0x55ae0c(0x792)][_0x55ae0c(0x1a4)],Window_MapName[_0x55ae0c(0x792)][_0x55ae0c(0x1a4)]=function(){const _0xe5f9ed=_0x55ae0c;VisuMZ[_0xe5f9ed(0x3ae)]['Settings']['QoL'][_0xe5f9ed(0x7cd)]?this[_0xe5f9ed(0x2b5)]():VisuMZ['CoreEngine'][_0xe5f9ed(0x3f1)][_0xe5f9ed(0x67e)](this);},Window_MapName[_0x55ae0c(0x792)][_0x55ae0c(0x2b5)]=function(){const _0x3d8bda=_0x55ae0c;this[_0x3d8bda(0x463)][_0x3d8bda(0x3dd)]();if($gameMap[_0x3d8bda(0x8b3)]()){const _0x857a42=this[_0x3d8bda(0x431)];this[_0x3d8bda(0x446)](0x0,0x0,_0x857a42,this['lineHeight']());const _0x5ae64b=this[_0x3d8bda(0x2c4)]($gameMap[_0x3d8bda(0x8b3)]())[_0x3d8bda(0x780)];this[_0x3d8bda(0x2e4)]($gameMap[_0x3d8bda(0x8b3)](),Math['floor']((_0x857a42-_0x5ae64b)/0x2),0x0);}},Window_TitleCommand[_0x55ae0c(0x5d6)]=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x4f6)],Window_TitleCommand[_0x55ae0c(0x792)][_0x55ae0c(0x611)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand['prototype'][_0x55ae0c(0x5b1)]=function(){const _0x144da2=_0x55ae0c;for(const _0x505581 of Window_TitleCommand[_0x144da2(0x5d6)]){if(_0x505581[_0x144da2(0x466)]['call'](this)){const _0x1e8c98=_0x505581['Symbol'];let _0x579292=_0x505581['TextStr'];if(['',_0x144da2(0x980)]['includes'](_0x579292))_0x579292=_0x505581['TextJS']['call'](this);const _0x444dcc=_0x505581['EnableJS'][_0x144da2(0x67e)](this),_0x2efe10=_0x505581['ExtJS'][_0x144da2(0x67e)](this);this[_0x144da2(0x88f)](_0x579292,_0x1e8c98,_0x444dcc,_0x2efe10),this[_0x144da2(0x85b)](_0x1e8c98,_0x505581[_0x144da2(0x3e7)][_0x144da2(0x505)](this,_0x2efe10));}}},VisuMZ[_0x55ae0c(0x3ae)]['Window_TitleCommand_selectLast']=Window_TitleCommand[_0x55ae0c(0x792)]['selectLast'],Window_TitleCommand[_0x55ae0c(0x792)][_0x55ae0c(0x448)]=function(){const _0x875d9b=_0x55ae0c;VisuMZ['CoreEngine'][_0x875d9b(0x328)][_0x875d9b(0x67e)](this);if(!Window_TitleCommand[_0x875d9b(0x6af)])return;const _0x51813a=this['findSymbol'](Window_TitleCommand[_0x875d9b(0x6af)]),_0x1a104b=Math['floor'](this[_0x875d9b(0x842)]()/0x2)-0x1;this[_0x875d9b(0x8bd)](_0x51813a),this[_0x875d9b(0x3c7)]>0x1&&(this[_0x875d9b(0x3c7)]=0x1,this[_0x875d9b(0x96e)]()),this['setTopRow'](_0x51813a-_0x1a104b);},Window_GameEnd['_commandList']=VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)]['MenuLayout'][_0x55ae0c(0x271)][_0x55ae0c(0x943)],Window_GameEnd['prototype'][_0x55ae0c(0x611)]=function(){const _0x5b7914=_0x55ae0c;this[_0x5b7914(0x5b1)]();},Window_GameEnd[_0x55ae0c(0x792)][_0x55ae0c(0x5b1)]=function(){const _0x6f9b5=_0x55ae0c;for(const _0x2090e9 of Window_GameEnd['_commandList']){if(_0x2090e9[_0x6f9b5(0x466)][_0x6f9b5(0x67e)](this)){const _0x50a544=_0x2090e9[_0x6f9b5(0x99e)];let _0x3f7387=_0x2090e9['TextStr'];if(['',_0x6f9b5(0x980)][_0x6f9b5(0x80e)](_0x3f7387))_0x3f7387=_0x2090e9[_0x6f9b5(0x95c)][_0x6f9b5(0x67e)](this);const _0x18ce5e=_0x2090e9[_0x6f9b5(0x93b)][_0x6f9b5(0x67e)](this),_0x272eaf=_0x2090e9[_0x6f9b5(0x8fa)]['call'](this);this[_0x6f9b5(0x88f)](_0x3f7387,_0x50a544,_0x18ce5e,_0x272eaf),this[_0x6f9b5(0x85b)](_0x50a544,_0x2090e9['CallHandlerJS'][_0x6f9b5(0x505)](this,_0x272eaf));}}};function Window_ButtonAssist(){const _0xe69aa8=_0x55ae0c;this[_0xe69aa8(0x6e5)](...arguments);}Window_ButtonAssist[_0x55ae0c(0x792)]=Object[_0x55ae0c(0x6b4)](Window_Base[_0x55ae0c(0x792)]),Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x68b)]=Window_ButtonAssist,Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(_0x20bfd5){const _0x275ea5=_0x55ae0c;this['_data']={},Window_Base[_0x275ea5(0x792)][_0x275ea5(0x6e5)][_0x275ea5(0x67e)](this,_0x20bfd5),this[_0x275ea5(0x200)](VisuMZ[_0x275ea5(0x3ae)][_0x275ea5(0x6c3)][_0x275ea5(0x6a8)]['BgType']||0x0),this[_0x275ea5(0x1a4)]();},Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x407)]=function(){const _0x3711a0=_0x55ae0c;return this[_0x3711a0(0x767)]||Window_Base['prototype'][_0x3711a0(0x407)]['call'](this);},Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x6eb)]=function(){const _0x4b2002=_0x55ae0c;this['contents'][_0x4b2002(0x3ac)]<=0x60&&(this[_0x4b2002(0x463)][_0x4b2002(0x3ac)]+=0x6);},Window_ButtonAssist[_0x55ae0c(0x792)]['makeFontSmaller']=function(){const _0x40f978=_0x55ae0c;this['contents'][_0x40f978(0x3ac)]>=0x18&&(this[_0x40f978(0x463)]['fontSize']-=0x6);},Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0x33011f=_0x55ae0c;Window_Base['prototype']['update']['call'](this),this[_0x33011f(0x6ea)]();},Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x2cd)]=function(){const _0x54444b=_0x55ae0c;this[_0x54444b(0x77d)]=SceneManager[_0x54444b(0x1a1)][_0x54444b(0x973)]()!==_0x54444b(0x270)?0x0:0x8;},Window_ButtonAssist[_0x55ae0c(0x792)]['updateKeyText']=function(){const _0x55aeac=_0x55ae0c,_0x6c52e2=SceneManager['_scene'];for(let _0x3b0557=0x1;_0x3b0557<=0x5;_0x3b0557++){if(this[_0x55aeac(0x277)][_0x55aeac(0x58c)[_0x55aeac(0x703)](_0x3b0557)]!==_0x6c52e2[_0x55aeac(0x7d4)[_0x55aeac(0x703)](_0x3b0557)]())return this[_0x55aeac(0x1a4)]();if(this[_0x55aeac(0x277)]['text%1'[_0x55aeac(0x703)](_0x3b0557)]!==_0x6c52e2[_0x55aeac(0x1f8)['format'](_0x3b0557)]())return this[_0x55aeac(0x1a4)]();}},Window_ButtonAssist['prototype']['refresh']=function(){const _0x298554=_0x55ae0c;this['contents'][_0x298554(0x3dd)]();for(let _0x3f3d47=0x1;_0x3f3d47<=0x5;_0x3f3d47++){this[_0x298554(0x8ed)](_0x3f3d47);}},Window_ButtonAssist[_0x55ae0c(0x792)][_0x55ae0c(0x8ed)]=function(_0x34676e){const _0x23fb32=_0x55ae0c,_0x5693f7=this[_0x23fb32(0x431)]/0x5,_0x826938=SceneManager[_0x23fb32(0x1a1)],_0x3dd1f0=_0x826938[_0x23fb32(0x7d4)[_0x23fb32(0x703)](_0x34676e)](),_0x1c1d58=_0x826938[_0x23fb32(0x1f8)['format'](_0x34676e)]();this[_0x23fb32(0x277)][_0x23fb32(0x58c)['format'](_0x34676e)]=_0x3dd1f0,this['_data'][_0x23fb32(0x48c)[_0x23fb32(0x703)](_0x34676e)]=_0x1c1d58;if(_0x3dd1f0==='')return;if(_0x1c1d58==='')return;const _0x3ad11e=_0x826938['buttonAssistOffset%1'[_0x23fb32(0x703)](_0x34676e)](),_0x36f20e=this[_0x23fb32(0x837)](),_0x44eac7=_0x5693f7*(_0x34676e-0x1)+_0x36f20e+_0x3ad11e,_0x116ef7=VisuMZ[_0x23fb32(0x3ae)][_0x23fb32(0x6c3)][_0x23fb32(0x6a8)][_0x23fb32(0x6be)];this[_0x23fb32(0x2e4)](_0x116ef7[_0x23fb32(0x703)](_0x3dd1f0,_0x1c1d58),_0x44eac7,0x0,_0x5693f7-_0x36f20e*0x2);},VisuMZ['CoreEngine'][_0x55ae0c(0x381)]=Game_Interpreter['prototype'][_0x55ae0c(0x2fe)],Game_Interpreter[_0x55ae0c(0x792)][_0x55ae0c(0x2fe)]=function(){const _0xcaa22e=_0x55ae0c;if($gameTemp[_0xcaa22e(0x233)]!==undefined)return VisuMZ[_0xcaa22e(0x3ae)][_0xcaa22e(0x4ab)]();return VisuMZ['CoreEngine'][_0xcaa22e(0x381)][_0xcaa22e(0x67e)](this);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x4ab)]=function(){const _0x15a4f3=_0x55ae0c,_0x3cacf4=$gameTemp[_0x15a4f3(0x233)]||0x0;(_0x3cacf4<0x0||_0x3cacf4>0x64||TouchInput[_0x15a4f3(0x829)]()||Input[_0x15a4f3(0x99f)](_0x15a4f3(0x55a)))&&($gameTemp[_0x15a4f3(0x233)]=undefined,Input[_0x15a4f3(0x3dd)](),TouchInput[_0x15a4f3(0x3dd)]());const _0x4ffd5a=$gameScreen[_0x15a4f3(0x532)](_0x3cacf4);return _0x4ffd5a&&(_0x4ffd5a['_x']=TouchInput['_x'],_0x4ffd5a['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x15a4f3(0x334)](),$gameTemp[_0x15a4f3(0x233)]!==undefined;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x334)]=function(){const _0xa6e46d=_0x55ae0c,_0x41569c=SceneManager['_scene'];if(!_0x41569c)return;!_0x41569c[_0xa6e46d(0x811)]&&(SoundManager[_0xa6e46d(0x5ef)](),_0x41569c[_0xa6e46d(0x811)]=new Window_PictureCoordinates(),_0x41569c[_0xa6e46d(0x359)](_0x41569c[_0xa6e46d(0x811)])),$gameTemp[_0xa6e46d(0x233)]===undefined&&(SoundManager[_0xa6e46d(0x4da)](),_0x41569c['removeChild'](_0x41569c['_pictureCoordinatesWindow']),_0x41569c[_0xa6e46d(0x811)]=undefined);};function Window_PictureCoordinates(){const _0x81d2e7=_0x55ae0c;this[_0x81d2e7(0x6e5)](...arguments);}function _0x2cd2(){const _0xb0ddf3=['DefaultMode','buttonAssistSwitch','isEnemy','Scene_Menu_create','test','MAXHP','mainAreaBottom','skipBranch','INOUTCIRC','startMove','NewGameCommonEventAll','this.paramBase(4)','WIN_OEM_PA3','CheckSplitEscape','bodyColor','INSINE','PictureShowIcon','ActorHPColor','Finish','ALT','textBaseline','isMaxLevel','EXR','processKeyboardEnd','bitmapHeight','TPB\x20ACTIVE','%1:\x20Exit\x20','PictureEraseRange','mmp','push','createButtonAssistWindow','updatePositionCoreEngineShakeHorz','ExtDisplayedParams','ButtonFadeSpeed','commandWindowRect','Graphics','MenuBg','current','performEscape','WIN_ICO_CLEAR','setSkill','PreserveNumbers','levelUpRecovery','bgm','endBattlerActions','setupNewGame','addCommand','SwitchToggleRange','_list','concat','_backgroundFilter','playOk','processKeyboardBackspace','adjustSprite','createContents','_drawTextShadow','FDR','_startPlaying','dimColor2','Input_update','ColorHPGauge1','_offsetY','NUMPAD4','Sprite_Actor_setActorHome','_lastOrigin','jsQuickFunc','setAnglePlusData','_stored_tpGaugeColor2','Subtitle','down','Bitmap_clearRect','statusEquipWindowRect','NUMPAD3','pagedown','INOUTQUART','ParseItemNotetags','buttonAssistCancel','pagedownShowButton','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','updatePositionCoreEngineShakeRand','_active','autoRemovalTiming','displayName','ForceNoPlayTest','BACK_QUOTE','ADD','Game_Picture_updateMove','skillTypes','mainFontSize','consumable','onButtonImageLoad','_image','smoothSelect','MvAnimationRate','usableSkills','learnings','FontWidthFix','updateTpbChargeTime','clearZoom','paramRateJS','isNormalPriority','allowShiftScrolling','nah','NUM','enemies','1.3.0','Game_Actor_isPreserveTp','setViewportCoreEngineFix','EndingID','_goldWindow','loadWindowskin','processKeyboardDelete','_pointAnimationSprites','home','toUpperCase','_battlerName','refreshSpritesetForExtendedTiles','ColorMPGauge1','Chance','ColorPowerUp','pressed','_realScale','prepareNextScene','setEasingType','slice','erasePicture','ColSpacing','clearForcedGameTroopSettingsCoreEngine','cos','setTargetAnchor','_onKeyDown','Window_Scrollable_update','itemHit','ShiftT_Toggle','paramX','alphabetic','version','RepositionEnemies130','_CoreEngineSettings','description','drawSegment','tilesetFlags','yScrollLinkedOffset','Window_NumberInput_processDigitChange','createPageButtons','ListBgType','loadTitle2','MenuLayout','_baseSprite','Game_Map_scrollRight','Game_Interpreter_PluginCommand','calcCoreEasing','drawValue','ExtJS','buttonAssistOffset4','setupFont','_opacity','playTestF7','horizontal','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','Game_Unit_onBattleEnd','_moveEasingType','meVolume','STRUCT','isSideView','cursorPagedown','gainGold','drawIcon','helpAreaHeight','_pictureContainer','targetSpritePosition','mirror','strokeRect','ACCEPT','INOUTBOUNCE','updateMainMultiply','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','TPB\x20WAIT','Game_Interpreter_command355','OUTELASTIC','isPointAnimationPlaying','_saveFileID','removeAllPointAnimations','iconWidth','pictures','Game_Picture_x','isKeyItem','_forcedBattleSys','seVolume','updateMotion','onMoveEnd','GoldBgType','OnLoadJS','gaugeBackColor','_dimmerSprite','enableDigitGrouping','drawNewParam','thickness','VariableJsBlock','Sprite_Battler_startMove','parallaxes','_logWindow','makeDocumentTitle','OpenURL','isItem','DATABASE','_stored_powerDownColor','Mirror','_startDecrypting','Smooth','bgs','Padding','setMoveEasingType','loadMapData','Input_updateGamepadState','NONCONVERT','_baseTexture','mainAreaTopSideButtonLayout','EnableJS','SceneManager_exit','centerCameraCheckData','hideButtonFromView','repeat','playMiss','loadTileset','IconXParam3','CommandList','WIN_OEM_JUMP','checkSubstitute','\x5c}❪SHIFT❫\x5c{','71343CCxYDM','atypeId','origin','_stored_hpGaugeColor2','itemLineRect','_closing','Param','paintOpacity','F19','mpGaugeColor2','pointX','HOME','top','DigitGroupingStandardText','ColorManager_loadWindowskin','AnimationID','OUTQUINT','_commandWindow','EditRect','deflate','_stored_expGaugeColor1','TextJS','ItemBackColor2','maxGold','_digitGrouping','vert','isGamepadButtonPressed','Renderer','DisplayedParams','processTimingData','_stored_expGaugeColor2','createTroopNote','HelpRect','children','GoldMax','EnableNameInput','viewport','popScene','ScreenShake','updateSmoothScroll','windowRect','charging','〘Common\x20Event\x20%1:\x20%2〙\x20End','calcEasing','getButtonAssistLocation','useDigitGrouping','valueOutlineWidth','loadSystem','getCustomBackgroundSettings','Game_Picture_initBasic','Window_Base_drawText','TextCodeNicknames','drawAllParams','mute','processAlwaysEscape','consumeItem','WIN_OEM_PA1','Untitled','WIN_OEM_CUSEL','dropItems','refreshScrollBarBitmap','updatePositionCoreEngineShakeVert','onDatabaseLoaded','INOUTQUINT','markCoreEngineModified','TimeProgress','Scene_Map_updateScene','_forcedTroopView','ColorGaugeBack','_lastScrollBarValues','F7key','paramRate','updateText','DrawItemBackgroundJS','WIN_OEM_CLEAR','createCustomParameter','option','Rate2','JUNJA','AccuracyBoost','setAction','DEF','setDisplayPos','data/','turn','ONE_MINUS_SRC_ALPHA','IconParam0','Symbol','isTriggered','_onKeyPress','onActorChange','pendingColor','Sprite_Animation_processSoundTimings','EQUALS','OPEN_BRACKET','TRAIT_PARAM','_currentBgm','targetScaleY','buttonAssistKey4','animationId','isClosed','XParameterFormula','rgba(0,\x200,\x200,\x201.0)','pos','_backSprite1','setEvent','_scene','Scene_MenuBase_helpAreaTop','ItemStyle','refresh','\x5c}❪TAB❫\x5c{','_makeFontNameText','_troopId','_windowLayer','scrollY','_stored_normalColor','_phase','IconSParam1','Scene_Map_createSpriteset_detach','_text','currentClass','_srcBitmap','updatePlayTestF7','playBgs','CEV','scaleSprite','updateOpen','#%1','outlineColorDmg','application/json','isAnimationOffsetXMirrored','MAX_GL_TEXTURES','_drawTextBody','faces','TranslucentOpacity','INOUTEXPO','BACK_SLASH','ColorMPGauge2','Enemy-%1-%2','integer','Map%1.json','Game_Character_processMoveCommand','Sprite_AnimationMV_processTimingData','OutlineColorGauge','IconXParam1','ShowItemBackground','MODECHANGE','xparamRateJS','default','CTRL','Rate1','exportAllTroopStrings','ItemMenu','Layer','Game_Troop_setup','TCR','_blank','isOpening','buttonAssistOffset2','SystemSetBattleSystem','xScrollLinkedOffset','_timeDuration','gaugeHeight','Window_NameInput_cursorPageup','updatePictureAntiZoom','CreateBattleSystemID','VisuMZ_2_BattleSystemOTB','CustomParamAbb','_statusEquipWindow','_mapY','this.paramBase(','scrollLeft','drawActorExpGauge','\x0a\x0a\x0a\x0a\x0a','_textPopupWindow','systemColor','horzJS','Window_SkillList_includes','itemHitImprovedAccuracy','isMapScrollLinked','Armor-%1-%2','CommonEventID','ARRAYSTR','vertical','loadGameImagesCoreEngine','BgFilename2','prepare','anchor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','animationBaseDelay','animations','ScaleY','standardIconWidth','buttonAssistText%1','IconParam1','ColorDeath','ColorTPGauge1','scrollDown','_upArrowSprite','hpColor','powerUpColor','setBackgroundType','isPreserveTp','end','DisplayLockY','Gold','reserveNewGameCommonEvent','initMembers','EXCLAMATION','Duration','checkCacheKey','ETB','terminate','KeyTAB','applyEasing','_height','open','Version','F14','checkSmartEventCollision','SParamVocab7','command105','drawCurrencyValue','Scene_Map_updateMainMultiply','baseTextRect','enable','KeySHIFT','outbounce','getColor','ModernControls','Game_Actor_changeClass','visible','en-US','position','updateDocumentTitle','PA1','command111','drawItem','ExportAllTroopText','buttonY','inbounce','isSceneBattle','BarOffset','resetBattleSystem','centerX','send','EQUAL','requestMotion','RightMenus','addEventListener','IconParam3','menu','_pictureCoordinatesMode','setActionState','updatePositionCoreEngineShakeOriginal','setValue','BackOpacity','offset','VisuMZ_2_BattleSystemSTB','Game_Unit_onBattleStart','reservePlayTestNewGameCommonEvent','process_VisuMZ_CoreEngine_Notetags','Window_refreshBack','original','scrollbar','initDigitGrouping','loadTileBitmap','IconSParam5','_encounterCount','createPointAnimationTargets','PictureID','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','updateScrollBars','drawActorSimpleStatus','_clientArea','Game_Temp_initialize','INOUTQUAD','keypress','number','setup','statusWindowRect','Sprite_Button_updateOpacity','ColorCTGauge1','Sprite_StateIcon_loadBitmap','scrollUp','Game_Battler_initTpbChargeTime','Spriteset_Battle_createEnemies','MinDuration','resetFontSettings','mapId','attackSkillId','getCombinedScrollingText','keyMapper','angle','isBottomHelpMode','_refreshBack','ENTER_SPECIAL','isTpb','StatusBgType','seek','Enable','_inputString','ParseClassNotetags','_stored_tpGaugeColor1','Spriteset_Base_initialize','maxTurns','RepositionActors','isItemStyle','param','runCombinedScrollingTextAsCode','operand','Scene_Base_terminateAnimationClearBugFix','level','button','GameEnd','Scene_MenuBase_createBackground','IconSParam2','LevelUpFullHp','pop','_lastGamepad','_data','CategoryBgType','traitsPi','0.00','battleSystem','SideButtons','drawCurrentParam','IconXParam8','_cache','paramValueByName','_fauxAnimationSprites','createDimmerSprite','openingSpeed','Upper\x20Left','Spriteset_Base_isAnimationPlaying','Scene_Skill_create','buttonAreaHeight','INCIRC','Scene_MenuBase_createPageButtons','ItemBackColor1','buttonAssistOk','ParseArmorNotetags','Scene_MenuBase_mainAreaTop','isPhysical','_lastIconIndex','isSideButtonLayout','select','this.paramBase(2)','_targetOffsetY','updateAnglePlus','showPicture','DebugConsoleLastControllerID','destroy','_paramPlus','sparamPlus2','_anchor','Game_Picture_show','_updateFilterArea','processKeyboardHome','Scene_Boot_loadSystemImages','ARRAYSTRUCT','buttonAssistText4','Game_Action_setAttack','SnapshotOpacity','tileHeight','getControllerInputButtonMatch','Center','setMute','charAt','updateScene','_backSprite','Pixelated','stringKeyMap','Bitmap_initialize','Scene_Map_createSpritesetFix','playTestShiftR','nickname','getInputButtonString','deathColor','SUBTRACT','_subject','characters','refreshWithTextCodeSupport','mpGaugeColor1','getLevel','EVAL','isFauxAnimationPlaying','ARRAYJSON','setAnchor','textColor','return\x200','Scene_Name_onInputOk','updateFrameCoreEngine','sparamPlus','_coreEasingType','updateMain','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','textSizeEx','openURL','invokeCounterAttack','goldWindowRect','isCursorMovable','Game_Picture_initRotation','valueOutlineColor','Game_Party_consumeItem','ParamArrow','updatePadding','animationNextDelay','_bitmap','initialLevel','PositionX','setupCoreEasing','missed','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','drawFace','ColorMPCost','AudioChangeBgsPan','setWindowPadding','_patternHeight','WIN_OEM_FJ_JISHO','sparamPlus1','Scene_Map_shouldAutosave','Spriteset_Base_updatePosition','setCoreEngineUpdateWindowBg','Bitmap_drawText','updateCurrentEvent','_forcedBattleGridSystem','destroyCoreEngineMarkedBitmaps','Actor','drawTextEx','NameMenu','drawGameTitle','processKeyboardDigitChange','abs','checkPassage','EXSEL','updateFrame','_screenY','AutoStretch','toLocaleString','duration','setActorHome','stencilFunc','VIEWPORT','sqrt','getInputMultiButtonStrings','CommandBgType','EISU','XParamVocab5','isBottomButtonMode','xparamPlus1','BattleManager_processEscape','Game_Event_isCollidedWithEvents','pow','isSceneMap','updateWaitMode','SParamVocab1','onEscapeSuccess','DurationPerChat','MRF','CustomParamIcons','ONE','onBattleStart','helpAreaBottom','startShake','_downArrowSprite','_coreEasing','outlineColorGauge','_pauseSignSprite','changeTextColor','processPointAnimationRequests','isMaskingEnabled','overallWidth','pageup','escape','_cancelButton','_lastPluginCommandInterpreter','ShowActorLevel','SwitchRandomizeOne','Input_onKeyDown','updateMove','filters','Game_Screen_initialize','isWindowMaskingEnabled','3771fMcXBm','DummyRect','paramMax','updateRotation','RPGMAKER_VERSION','scaleMode','Mute','buttonAssistWindowSideRect','Class-%1-%2','Item-%1-%2','context','traitObjects','processCursorHomeEndTrigger','Window_TitleCommand_selectLast','_stored_pendingColor','LvExpGauge','hpGaugeColor2','_inputWindow','OkText','Scene_Battle_update','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','setupRate','Scene_Boot_onDatabaseLoaded','loadPicture','OutlineColorDmg','updatePictureCoordinates','ATK','playCursor','CLEAR','NUM_LOCK','right','createWindowLayer','drawGoldItemStyle','NumberRect','initMembersCoreEngine','canAttack','buttonAssistText5','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','buttons','xparamPlus2','add','maxCols','_dummyWindow','SParamVocab4','worldTransform','changeClass','142583dNPVYT','playtestQuickLoad','Tilemap_addSpotTile','SCROLLBAR','_displayedPassageError','isAnimationForEach','CONVERT','forceOutOfPlaytest','textWidth','itemRect','_targetScaleY','buttonAssistKey5','updatePositionCoreEngine','createTilemap','refreshDimmerBitmap','_hideTileShadows','addChild','initCoreEasing','smooth','getGamepads','NameInputMessage','renderNoMask','EncounterRateMinimum','faceHeight','DECIMAL','tpGaugeColor2','IconSParam8','isSmartEventCollisionOn','Game_Interpreter_command111','CONTEXT_MENU','NumberBgType','clearRect','contains','style','QUOTE','drawIconBySize','InputBgType','Game_Action_itemEva','initRotation','updateData','trim','_createInternalTextures','setLastGamepadUsed','catchNormalError','_pollGamepads','updatePosition','_balloonQueue','isGamepadTriggered','_targets','Scene_Boot_updateDocumentTitle','LoadMenu','MRG','([\x5c+\x5c-]\x5cd+)>','buttonAssistText3','Input_pollGamepads','backspace','Game_Interpreter_updateWaitMode','bgsVolume','mpCostColor','font','tab','mev','SwitchRandomizeRange','GRD','Window_NameInput_processTouch','object','setMainFontSize','moveRelativeToResolutionChange','helpAreaTopSideButtonLayout','endAnimation','setupCustomRateCoreEngine','smallParamFontSize','max','paramBaseAboveLevel99','F24','Linear','numberWindowRect','ScaleX','EquipMenu','Max','DigitGroupingExText','BTB','createFauxAnimationSprite','Scene_Load','Bitmap_measureTextWidth','Total','subjectHitRate','Game_BattlerBase_initMembers','DashToggleR','updatePictureSettings','isAnimationPlaying','isAutoColorAffected','Keyboard','getLastUsedGamepadType','textAlign','this.paramBase(6)','repositionCancelButtonSideButtonLayout','processDrawIcon','isAlive','fontSize','join','CoreEngine','PTB','makeInputButtonString','IconXParam4','_duration','setCoreEngineScreenShakeStyle','F18','active','Input_shouldPreventDefault','_isWindow','onInputOk','Window_StatusBase_drawActorLevel','DOWN','isGamepadConnected','process_VisuMZ_CoreEngine_ControllerButtons','<%1\x20%2:[\x20]','_pageupButton','cursorLeft','processDigitChange','Window_NameInput_refresh','CustomParamNames','%1\x0a','_mapX','createPointAnimationSprite','_allTextHeight','_scrollDuration','CustomParamType','_bgmBuffer','isRepeated','LevelUpFullMp','createCustomBackgroundImages','FunctionName','CLOSE_PAREN','ValueJS','_editWindow','onXhrError','hide','areButtonsHidden','ItemBgType','onInputBannedWords','IDs','setViewport','initCoreEngine','LINEAR','AudioChangeBgmPan','Game_Interpreter_command105','left','clear','setAttack','MDR','HelpBgType','_destroyInternalTextures','SellRect','_actorWindow','displayX','setSideButtonLayout','isLoopHorizontal','CallHandlerJS','retrievePointAnimation','openness','INOUTCUBIC','destroyContents','Window','〘Show\x20Text〙\x0a','addAnimationSpriteToContainer','Graphics_defaultStretchMode','_storedMapText','Window_MapName_refresh','processBack','Key%1','currentLevelExp','STB','gainItem','applyForcedGameTroopSettingsCoreEngine','center','startAnimation','_displayY','addWindow','save','isEnabled','keyboard','Tilemap_addShadow','_stored_mpGaugeColor1','mpColor','performMiss','MULTIPLY','altKey','log','_name','lineHeight','playBuzzer','EVA','AutoScrollLockX','applyCoreEasing','WIN_OEM_FJ_MASSHOU','ColorCrisis','AudioChangeBgsPitch','Game_Map_scrollUp','ListRect','updateDuration','_categoryWindow','backgroundBitmap','OpenConsole','_backgroundSprite','Bitmap_blt','ctrlKey','ExportStrFromAllTroops','command122','CategoryRect','Scene_SingleLoadTransition','Game_Picture_angle','round','JSON','SystemLoadImages','ShopMenu','updateBackOpacity','allTiles','ButtonHeight','\x20this.','processTouchModernControls','Window_EquipItem_isEnabled','MCR','processMoveCommand','clearTp','playTestF6','_backSprite2','WIN_ICO_00','Sprite_destroy','WIN_OEM_AUTO','Page','shouldAutosave','innerWidth','buttonAssistWindowRect','INOUTELASTIC','xparamRate1','CLOSE_CURLY_BRACKET','paramFlatBonus','isUseModernControls','img/%1/','DamageColor','ENTER','clone','GoldChange','buttonAssistText1','split','_stored_maxLvGaugeColor2','NUMPAD9','Input_setupEventHandlers','xparam','OptionsBgType','XParamVocab2','sparamRateJS','drawBackground','arePageButtonsEnabled','selectLast','BattleManager_checkSubstitute','createTitleButtons','drawParamName','Bitmap_drawCircle','Conditional\x20Branch\x20Script\x20Error','changeTileset','close','KANA','Scene_MenuBase_mainAreaHeight','maxHorz','WIN_OEM_RESET','gaugeRate','isLoopVertical','_offsetX','maxScrollY','resetTextColor','fillText','_tileExtendSprites','type','GoldIcon','createDigits','Window_NameInput_cursorRight','_context','BattleManager_update','ParamName','isNumpadPressed','contents','PictureRotateBy','expGaugeColor2','ShowJS','contentsOpacity','animationShouldMirror','_customModified','enabled','setClickHandler','refreshActor','SETTINGS','removePointAnimation','Game_Map_scrollDown','keys','stop','VisuMZ_2_BattleSystemBTB','REC','LEFT','IconXParam6','ImprovedAccuracySystem','makeActionList','ceil','_centerCameraCheck','_colorCache','createKeyJS','stypeId','SystemSetSideView','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DETACH_PICTURE_CONTAINER','WIN_OEM_COPY','updateEffekseer','adjustY','CRI','_currentBgs','_stored_hpGaugeColor1','setupTileExtendTerrainTags','Scene_Map_updateMain','_internalTextures','move','initVisuMZCoreEngine','xparamFlat1','text%1','COMMA','sceneTerminationClearEffects','ShowScrollBar','targets','Scene_Base_terminate','shake','SellBgType','_shiftY','onlyfilename','PIPE','scrollRight','ColorExpGauge1','this.paramBase(5)','floor','SceneManager_initialize','IconSParam6','loadBitmapCoreEngine','XParamVocab1','SwitchToggleOne','maxVert','LUK','ConvertParams','changeAnglePlusData','process_VisuMZ_CoreEngine_CustomParameters','Game_Action_itemHit','_stored_ctGaugeColor2','Window_NameInput_processHandling','normalColor','operation','pan','UpdatePictureCoordinates','pictureId','onClick','F17','Window_Selectable_cursorDown','isOptionValid','Scene_Battle_createSpriteset','tileset','mainAreaHeight','registerCommand','playTestShiftT','actorWindowRect','Scene_Battle_createSpriteset_detach','Graphics_centerElement','SParamVocab9','connected','drawActorNickname','ctGaugeColor1','RepositionEnemies','Game_BattlerBase_refresh','areButtonsOutsideMainUI','_storedStack','jsonToZip','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','buttonAssistKey1','sparamFlatBonus','string','defaultInputMode','_scaleY','and\x20add\x20it\x20onto\x20this\x20one.','_changingClass','replace','playOnceParallelInterpreter','_sellWindow','_originalViewport','axes','SParamVocab3','BarThickness','needsUpdate','Window_NameInput_cursorDown','ParseEnemyNotetags','equips','Spriteset_Base_update','canUse','Show\x20Scrolling\x20Text\x20Script\x20Error','_isButtonHidden','CLOSE_BRACKET','playCancel','enemy','isTouchedInsideFrame','isFullDocumentTitle','movePageButtonSideButtonLayout','WIN_OEM_FJ_ROYA','CANCEL','update','targetX','DefaultStyle','_targetAnchor','isInputting','buttonAssistKey3','_movementDuration','PictureEraseAll','_textQueue','maxPictures','ExtractStrFromMap','apply','clearOnceParallelInterpreters','_bgsBuffer','_stored_systemColor','REPLACE','F20','PGUP','exportAllMapStrings','maxScrollbar','xparamFlat2','TitleCommandList','Flat2','createCommandWindow','MAXMP','expParams','_buttonAssistWindow','Bitmap_gradientFillRect','render','VisuMZ_2_BattleSystemPTB','transform','WIN_OEM_FJ_LOYA','targetPosition','updateBgsParameters','Plus1','VisuMZ_2_BattleSystemFTB','bind','TGR','BottomHelp','boxWidth','loadTitle1','_pointAnimationQueue','baseId','_fauxAnimationQueue','F15','buttonAssistOffset5','_statusParamsWindow','statusParamsWindowRect','Scene_Base_create','_iconIndex','xparamRate','_targetScaleX','BlendMode','Name','translucentOpacity','encounterStepsMinimum','measureTextWidthNoRounding','_lastY','platform','ColorTPCost','BuyBgType','_windowskin','imageSmoothingEnabled','removeAnimationFromContainer','drawGameVersion','defineProperty','AudioChangeBgmVolume','Scene_Title_drawGameTitle','_currentMap','note','AudioChangeBgmPitch','isActor','updateScrollBarPosition','rightArrowWidth','updateClose','BasicParameterFormula','_mirror','maxLvGaugeColor2','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','createPointAnimationQueue','getBattleSystem','picture','updateBattleVariables','GoldOverlap','_animationQueue','_shakePower','_smooth','random','_centerElement','HASH','responseText','scrollbarHeight','xparamRate2','initBasic','CommandWidth','_clickHandler','TAB','Control\x20Variables\x20Script\x20Error','INSERT','Abbreviation','QwertyLayout','_slotWindow','catchException','updatePointAnimations','scaleX','_refreshPauseSign','WIN_OEM_PA2','targetY','initTpbChargeTime','SystemSetWindowPadding','CancelText','allIcons','canEquip','StatusRect','Window_NameInput_cursorPagedown','SmartEventCollisionPriority','height','updateLastTarget','paramPlusJS','gradientFillRect','sparam','cancel','Spriteset_Base_destroy','Graphics_printError','subtitle','_skillTypeWindow','maxTp','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','Window_Gold_refresh','_registerKeyInput','_addSpotTile','clearStencil','evade','buttonAssistOffset1','isNextScene','setCommonEvent','State-%1-%2','_actor','mainCommandWidth','cursorRight','targetBackOpacity','inBattle','result','targetEvaRate','_shouldPreventDefault','framesMin','Actor-%1-%2','_digitGroupingEx','ParseWeaponNotetags','F21','CorrectSkinBleeding','maxLevel','process_VisuMZ_CoreEngine_Settings','addOnceParallelInterpreter','setupCoreEngine','_mapNameWindow','_stored_powerUpColor','Flat1','removeTileExtendSprites','deselect','Game_Picture_y','Window_Base_createContents','Scene_Unlisted','Spriteset_Map_createTilemap','_drawTextOutline','ARRAYFUNC','Bitmap_drawTextOutline','Scene_Equip_create','CommandRect','QUESTION_MARK','volume','key%1','snapForBackground','StatusEquipBgType','drawing','_stored_gaugeBackColor','listWindowRect','categoryWindowRect','adjustBoxSize','_statusWindow','KeyUnlisted','uiAreaHeight','playCursorSound','Scene_Boot_startNormalGame','StateIconsNonFrame','expRate','InputRect','PLUS','_buttonType','KEEP','_mainSprite','titleCommandWindow','itemHeight','Window_Base_initialize','blendFunc','FTB','events','VisuMZ_2_BattleSystemETB','pointY','anchorCoreEasing','NON_FRAME','isBusy','filterArea','Scene_Item_create','opacity','EREOF','ExtractStrFromList','checkPlayerLocation','makeCoreEngineCommandList','status','Opacity','ShiftR_Toggle','Game_Action_updateLastTarget','keyRepeatWait','setupButtonImage','drawCircle','target','7970rZuRCt','Location','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','dummyWindowRect','guardSkillId','crisisColor','BattleManager_invokeCounterAttack','itemEva','terms','JsReplaceUserVar','editWindowRect','Scene_Map_update','offsetY','HRG','_coreEngineShakeStyle','ActorBgType','createChildSprite','startNormalGame','INQUAD','item','bitmap','Enemy','skills','pitch','BlurStrength','_isPlaytest','Title','repositionEnemiesByResolution','_commandList','_spriteset','exit','24wHwqRj','_helpWindow','measureText','Plus2','DocumentTitleFmt','onLoad','AllMaps','_stored_tpCostColor','Window_Selectable_processCursorMove','dimColor1','GroupDigits','SkillTypeBgType','getKeyboardInputButtonString','ItemRect','exec','index','Sprite_Gauge_currentValue','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','Weapon-%1-%2','ParamMax','IconXParam9','SCALE_MODES','playLoad','GREATER_THAN','Window_NameInput_cursorLeft','_onceParallelInterpreters','paramBase','Game_Picture_move','gaugeLineHeight','fillRect','_scrollBarVert','exp','iconHeight','QoL','CTB','parse','eventsXyNt','process_VisuMZ_CoreEngine_jsQuickFunctions','getBackgroundOpacity','mainAreaTop','XParamVocab0','RIGHT','setTileFrame','batch','setupBattleTestItems','Skill-%1-%2','isPressed','hpGaugeColor1','standardIconHeight','this.paramBase(3)','start','code','initRotationCoreEngine','parameters','remove','scale','makeCommandList','_target','SParamVocab8','3455045gccCys','PictureRotate','length','process_VisuMZ_CoreEngine_Functions','isNwjs','BTestAddedQuantity','updateAnchor','name','NUMPAD7','drawActorIcons','_scrollBarHorz','updateDashToggle','MaxDuration','clamp','RegExp','_targetOffsetX','updateOrigin','_stored_mpCostColor','$dataMap','_targetX','STR','focus','updateScrollBarVisibility','Sprite_Picture_updateOrigin','isArrowPressed','tpColor','isClosing','TRG','DEFAULT_SHIFT_Y','numberShowButton','_commonEventLayers','faceWidth','numRepeats','SEMICOLON','ParseAllNotetags','createSpriteset','gold','Scene_Map_initialize','StartID','members','overallHeight','checkScrollBarBitmap','XParamVocab4','isGamepadAxisMoved','DimColor2','SCROLL_LOCK','PLAY','_mode','(\x5cd+)>','_onError','_colorTone','drawTextTopAligned','doesNameContainBannedWords','hasEncryptedImages','updateShadow','processCursorMove','_shakeSpeed','createFauxAnimation','_eventId','NUMPAD0','removeOnceParallelInterpreter','_maxDigits','getPointAnimationLayer','targetScaleX','FontShadows','WIN_OEM_BACKTAB','adjustX','zoomScale','Window_Base_drawCharacter','ControllerMatches','VOLUME_MUTE','match','_pictureName','getCoreEngineScreenShakeStyle','titles2','ColorPowerDown','sv_enemies','addLoadListener','initCoreEngineScreenShake','useDigitGroupingEx','createEnemies','BTestWeapons','startAutoNewGame','goto','outlineColor','IconXParam5','stencilOp','getColorDataFromPluginParameters','ColorMaxLvGauge2','vertJS','_startLoading','AutoScrollLockY','bitmapWidth','onload','%1〘Choice\x20%2〙\x20%3%1','CNT','OffBarOpacity','Window_Base_createTextState','createScrollBarSprites','xdg-open','eva','maxLvGaugeColor1','endAction','BKSP','_number','storeMapData','call','createJsQuickFunction','PictureEasingType','toLowerCase','_repositioned','_gamepadWait','25000qnnhkr','blt','STENCIL_TEST','F12','windowPadding','SlotBgType','system','constructor','Window_NumberInput_start','cursorUp','isHandled','Scene_Map_createMenuButton','determineSideButtonLayoutValid','drawGameSubtitle','ExportAllMapText','_buyWindow','END','adjustPictureAntiZoom','VisuMZ_1_OptionsCore','buttonAssistWindowButtonRect','updateBgmParameters','requestFauxAnimation','itemWindowRect','layoutSettings','titles1','》Comment《\x0a%1\x0a','randomJS','createPointAnimation','MainMenu','pages','KeyboardInput','addChildToBack','ShowButtons','toString','_texture','DELETE','ButtonAssist','OUTBACK','mainAreaHeightSideButtonLayout','OTB','PDR','13jfTpwj','AudioChangeBgsVolume','_lastCommandSymbol','MultiKeyFmt','GET','Game_Picture_scaleY','Game_Actor_paramBase','create','Script\x20Call\x20Error','DIVIDE','AGI','drawGauge','_screenX','onKeyDownKeysF6F7','Bitmap_strokeRect','boxHeight','_refreshArrows','TextFmt','processTouch','_origin','fadeSpeed','ParamChange','Settings','ParseTilesetNotetags','F23','ShortcutScripts','sparamFlat1','1.4.4','_inputSpecialKeyCode','Game_Action_numRepeats','Game_Picture_calcEasing','Game_Map_setDisplayPos','48MDADCH','actor','restore','onBattleEnd','FontSize','enableDigitGroupingEx','SceneManager_onKeyDown','INQUINT','_opening','_url','_numberWindow','processEscape','loadBitmap','makeEncounterCount','_animation','paramRate2','text','DataManager_setupNewGame','setBattleSystem','pictureButtons','retrieveFauxAnimation','OpenSpeed','destroyScrollBarBitmaps','command357','initialize','optSideView','DTB','_hideButtons','fillStyle','updateKeyText','makeFontBigger','_lastX','setSideView','_tileExtendTerrainTags','Color','etypeId','randomInt','showFauxAnimations','PageChange','isGameActive','params','_scaleX','WIN_OEM_FJ_TOUROKU','ParseStateNotetags','2096988amRTCT','paramName','AnimationPoint','drawRightArrow','isPlaytest','MAT','IconSet','cursorPageup','globalAlpha','F22','format','requestPointAnimation','_bypassCanCounterCheck','_optionsWindow','ApplyEasing','_updateGamepadState','_itemWindow','SideView','loadSystemImages','INBACK','Scene_Options_create','EnableMasking','filter','isExpGaugeDrawn','anglePlus','OffBarColor','Window_Base_destroyContents','F13','Type','battlebacks2','KeyItemProtect','VariableEvalReference','DisplayLockX','coreEngineRepositionEnemies','NUMPAD6','isMenuButtonAssistEnabled','Bitmap_fillRect','_rate','SELECT','_tileSprite','Game_Interpreter_command122','setLastPluginCommandInterpreter','%2%1%3','atbActive','_profileWindow','updateOnceParallelInterpreters','createTextPopupWindow','Speed','xparamPlus','createAnimationSprite','Sprite_Gauge_gaugeRate','targetOpacity','get','FontSmoothing','SplitEscape','RevertPreserveNumbers','Manual','playBgm','initialBattleSystem','createTextState','scrollX','drawActorLevel','AnimationMirrorOffset','loadIconBitmap','%1〘Choice\x20Cancel〙%1','X:\x20%1','command355','clearCachedKeys','Sprite_Button_initialize','2130LSkKwA','paramRate1','drawParamText','ParseActorNotetags','xparamFlatBonus','ActorRect','App','Window_Base_update','SHIFT','ActorMPColor','_listWindow','encounterStep','SLEEP','up2','padZero','SParamVocab6','OUTQUART','onTpbCharged','background','maxItems','WIN_OEM_ENLW','centerSprite','1578aNysZL','BTestArmors','flush','isEventRunning','_shakeDuration','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','isPlaying','drawBackgroundRect','win32','savefileInfo','sin','IconParam7','Origin','sellWindowRect','showDevTools','ProfileBgType','processCursorMoveModernControls','reduce','_tile','innerHeight','normal','_menuButton','Scene_MenuBase_createCancelButton','tpGaugeColor1','_muteSound','_onLoad','damageColor','Window_Selectable_processTouch','shift','showIncompleteTilesetError','_viewportSize','setupScrollBarBitmap','createCancelButton','MDF','map','disable','optionsWindowRect','resize','StatusMenu','MapOnceParallel','isScrollBarVisible','padding','ControllerButtons','SkillMenu','width','Game_System_initialize','_effectsContainer','printError','list','_tpbChargeTime','Window_NameInput_cursorUp','advanced','Scene_Battle_createCancelButton','displayY','Game_Map_setup','makeDeepCopy','_movementWholeDuration','isMVAnimation','_addShadow','getTileExtendTerrainTags','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','8glyQho','prototype','OutlineColor','SceneManager_isGameActive','xparamPlusJS','skillTypeWindowRect','createMenuButton','buttonAssistKey2','requiredWtypeId1','NoTileShadows','OUTCUBIC','applyEasingAnglePlus','OUTQUAD','createTileExtendSprites','_tilemap','processSoundTimings','BoxMargin','keyCode','_playtestF7Looping','NewGameCommonEvent','Input_clear','WIN_OEM_FINISH','hit','helpAreaTop','DimColor1','saveViewport','ShowDevTools','windowOpacity','setFrame','battlebacks1','removeAllFauxAnimations','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','src','easingType','switchModes','Scene_Battle_createSpritesetFix','_displayX','Sprite_StateIcon_updateFrame','framesPerChar','cursorDown','ItemHeight','overrideMimeType','asin','_mp','F10','IconXParam7','createExtendedTileSprite','blockWidth','【%1】\x0a','down2','EXECUTE','measureTextWidth','framesMax','bgmVolume','itemSuccessRate','playEscape','PERCENT','checkCoreEngineDisplayCenter','OPEN_CURLY_BRACKET','Flat','MapNameTextCode','tileWidth','_playTestFastMode','getParameter','show','this.paramBase(0)','currentValue','buttonAssistKey%1','profileWindowRect','DigitGroupingLocale','ImgLoad','updateCoreEasing','drawText','WASD','_destroyCanvas','BlurFilter','Window_ShopSell_isEnabled','Scene_Name_create','Window_Selectable_drawBackgroundRect','IconSParam4','rgba(0,\x200,\x200,\x200.7)','XParamVocab7','ExtractStrFromTroop','FadeSpeed','enter','tpbAcceleration','getControllerInputButtonString','BgFilename1','ColorTPGauge2','PictureFilename','HIT','BattleSystem','SEPARATOR','WindowLayer_render','parseForcedGameTroopSettingsCoreEngine','OPEN_PAREN','Sprite_AnimationMV_updatePosition','ColorExpGauge2','_hp','_width','alwaysDash','catchLoadError','isCollidedWithEvents','areTileShadowsHidden','targetContentsOpacity','ESC','Window_Base_drawFace','PixelateImageRendering','MAX_SAFE_INTEGER','_animationSprites','COLON','BaseTexture','ParseSkillNotetags','initButtonHidden','showPointAnimations','makeTargetSprites','_sideButtonLayout','SkillTypeRect','PHA','levelUp','Sprite_Picture_loadBitmap','value','numActions','colSpacing','toFixed','includes','activate','VisuMZ_4_UniqueTileEffects','_pictureCoordinatesWindow','paramPlus','centerY','reserveCommonEvent','deactivate','process_VisuMZ_CoreEngine_RegExp','buttonAssistOffset3','expGaugeColor1','backOpacity','min','VOLUME_UP','onNameOk','removeChild','Scene_Base_createWindowLayer','Basic','PGDN','SParamVocab2','INQUART','DetachBattlePictureContainer','ScreenResolution','sv_actors','INBOUNCE','processFauxAnimationRequests','createBackground','isCancelled','F6key','ColorNormal','NUMPAD1','isOpenAndActive','_index','CodeJS','helpWindowRect','Game_Actor_levelUp','MEV','Window_Selectable_itemRect','FINAL','EscapeAlways','〘Common\x20Event\x20%1:\x20%2〙\x20Start','itemPadding','Troop%1','processHandling','CtrlQuickLoad','INOUTBACK','Scene_Status_create','currencyUnit','cancelShowButton','_cacheScaleX','subject','isSpecialCode','maxVisibleItems','IconParam5','_timerSprite','paramWidth','paramY','SaveMenu','ARRAYNUM','GoldRect','SlotRect','targetObjects','Unnamed','EnableNumberInput','MIN_SAFE_INTEGER','ExportString','setActorHomeRepositioned','ColorCTGauge2','WIN_OEM_WSCTRL','updateOpacity','wait','isOpen','GoldFontSize','_anglePlus','_pagedownButton','ALWAYS','removeFauxAnimation','setHandler','textHeight','isActiveTpb','Bitmap_resize','getLastPluginCommandInterpreter','SParamVocab5'];_0x2cd2=function(){return _0xb0ddf3;};return _0x2cd2();}Window_PictureCoordinates['prototype']=Object[_0x55ae0c(0x6b4)](Window_Base['prototype']),Window_PictureCoordinates[_0x55ae0c(0x792)][_0x55ae0c(0x68b)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x55ae0c(0x792)][_0x55ae0c(0x6e5)]=function(){const _0x2592ee=_0x55ae0c;this[_0x2592ee(0x8a1)]=_0x2592ee(0x8c7),this['_lastX']=_0x2592ee(0x8c7),this[_0x2592ee(0x51a)]='nah';const _0xe2d844=this[_0x2592ee(0x96f)]();Window_Base[_0x2592ee(0x792)][_0x2592ee(0x6e5)][_0x2592ee(0x67e)](this,_0xe2d844),this[_0x2592ee(0x200)](0x2);},Window_PictureCoordinates['prototype'][_0x55ae0c(0x96f)]=function(){const _0x1c5bd9=_0x55ae0c;let _0x329877=0x0,_0x533c8c=Graphics[_0x1c5bd9(0x555)]-this['lineHeight'](),_0x229875=Graphics[_0x1c5bd9(0x780)],_0x464071=this[_0x1c5bd9(0x407)]();return new Rectangle(_0x329877,_0x533c8c,_0x229875,_0x464071);},Window_PictureCoordinates[_0x55ae0c(0x792)][_0x55ae0c(0x2cd)]=function(){this['padding']=0x0;},Window_PictureCoordinates[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0xa8ac35=_0x55ae0c;Window_Base[_0xa8ac35(0x792)][_0xa8ac35(0x4e1)][_0xa8ac35(0x67e)](this),this[_0xa8ac35(0x370)]();},Window_PictureCoordinates['prototype'][_0x55ae0c(0x370)]=function(){const _0x17da83=_0x55ae0c;if(!this[_0x17da83(0x4d1)]())return;this[_0x17da83(0x1a4)]();},Window_PictureCoordinates[_0x55ae0c(0x792)][_0x55ae0c(0x4d1)]=function(){const _0x30e309=_0x55ae0c,_0x4beb65=$gameTemp['_pictureCoordinatesMode'],_0x184e24=$gameScreen[_0x30e309(0x532)](_0x4beb65);return _0x184e24?this[_0x30e309(0x8a1)]!==_0x184e24['_origin']||this[_0x30e309(0x6ec)]!==_0x184e24['_x']||this['_lastY']!==_0x184e24['_y']:![];},Window_PictureCoordinates[_0x55ae0c(0x792)]['refresh']=function(){const _0x4363b6=_0x55ae0c;this[_0x4363b6(0x463)]['clear']();const _0x469b16=$gameTemp[_0x4363b6(0x233)],_0x2db294=$gameScreen['picture'](_0x469b16);if(!_0x2db294)return;this['_lastOrigin']=_0x2db294[_0x4363b6(0x6c0)],this[_0x4363b6(0x6ec)]=_0x2db294['_x'],this[_0x4363b6(0x51a)]=_0x2db294['_y'];const _0x121871=ColorManager['itemBackColor1']();this[_0x4363b6(0x463)]['fillRect'](0x0,0x0,this[_0x4363b6(0x431)],this[_0x4363b6(0x767)],_0x121871);const _0x276ec1='\x20Origin:\x20%1'['format'](_0x2db294[_0x4363b6(0x6c0)]===0x0?_0x4363b6(0x284):_0x4363b6(0x2a5)),_0x5a4020=_0x4363b6(0x73a)['format'](_0x2db294['_x']),_0x3ea0eb='Y:\x20%1'[_0x4363b6(0x703)](_0x2db294['_y']),_0x2d57ba=_0x4363b6(0x87b)[_0x4363b6(0x703)](TextManager['getInputButtonString'](_0x4363b6(0x55a)));let _0x19c0b9=Math[_0x4363b6(0x49a)](this[_0x4363b6(0x431)]/0x4);this['drawText'](_0x276ec1,_0x19c0b9*0x0,0x0,_0x19c0b9),this[_0x4363b6(0x7d9)](_0x5a4020,_0x19c0b9*0x1,0x0,_0x19c0b9,'center'),this[_0x4363b6(0x7d9)](_0x3ea0eb,_0x19c0b9*0x2,0x0,_0x19c0b9,'center');const _0x5e0782=this[_0x4363b6(0x2c4)](_0x2d57ba)[_0x4363b6(0x780)],_0xa17f90=this[_0x4363b6(0x431)]-_0x5e0782;this[_0x4363b6(0x2e4)](_0x2d57ba,_0xa17f90,0x0,_0x5e0782);};function Window_TextPopup(){this['initialize'](...arguments);}Window_TextPopup[_0x55ae0c(0x792)]=Object[_0x55ae0c(0x6b4)](Window_Base['prototype']),Window_TextPopup[_0x55ae0c(0x792)][_0x55ae0c(0x68b)]=Window_TextPopup,Window_TextPopup[_0x55ae0c(0x46d)]={'framesPerChar':VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x6c3)][_0x55ae0c(0x3ec)][_0x55ae0c(0x301)]??1.5,'framesMin':VisuMZ[_0x55ae0c(0x3ae)]['Settings']['Window'][_0x55ae0c(0x256)]??0x5a,'framesMax':VisuMZ['CoreEngine'][_0x55ae0c(0x6c3)][_0x55ae0c(0x3ec)][_0x55ae0c(0x620)]??0x12c},Window_TextPopup['prototype']['initialize']=function(){const _0x373901=_0x55ae0c,_0x3234e8=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x373901(0x792)]['initialize']['call'](this,_0x3234e8),this[_0x373901(0x3e9)]=0x0,this[_0x373901(0x1ae)]='',this[_0x373901(0x4e9)]=[],this[_0x373901(0x1d8)]=0x0;},Window_TextPopup['prototype'][_0x55ae0c(0x3a4)]=function(){return!![];},Window_TextPopup[_0x55ae0c(0x792)]['addQueue']=function(_0x2399e1){const _0xdf7c74=_0x55ae0c;if(this[_0xdf7c74(0x4e9)][this[_0xdf7c74(0x4e9)][_0xdf7c74(0x616)]-0x1]===_0x2399e1)return;this[_0xdf7c74(0x4e9)][_0xdf7c74(0x87e)](_0x2399e1),SceneManager[_0xdf7c74(0x1a1)][_0xdf7c74(0x359)](this);},Window_TextPopup['prototype'][_0x55ae0c(0x4e1)]=function(){const _0x37acd5=_0x55ae0c;Window_Base[_0x37acd5(0x792)][_0x37acd5(0x4e1)][_0x37acd5(0x67e)](this),this[_0x37acd5(0x98f)](),this['updateDuration']();},Window_TextPopup[_0x55ae0c(0x792)][_0x55ae0c(0x98f)]=function(){const _0xc7269f=_0x55ae0c;if(this[_0xc7269f(0x1ae)]!=='')return;if(this[_0xc7269f(0x4e9)][_0xc7269f(0x616)]<=0x0)return;if(!this[_0xc7269f(0x19b)]())return;this['_text']=this[_0xc7269f(0x4e9)][_0xc7269f(0x770)]();const _0x158647=Window_TextPopup[_0xc7269f(0x46d)],_0x2a3439=Math[_0xc7269f(0x478)](this[_0xc7269f(0x1ae)][_0xc7269f(0x616)]*_0x158647[_0xc7269f(0x7b7)]);this[_0xc7269f(0x1d8)]=_0x2a3439['clamp'](_0x158647[_0xc7269f(0x572)],_0x158647[_0xc7269f(0x7c5)]);const _0x3fa8de=this[_0xc7269f(0x2c4)](this[_0xc7269f(0x1ae)]);let _0x40183f=_0x3fa8de[_0xc7269f(0x780)]+this[_0xc7269f(0x837)]()*0x2;_0x40183f+=$gameSystem[_0xc7269f(0x688)]()*0x2;let _0x569bd7=Math[_0xc7269f(0x391)](_0x3fa8de[_0xc7269f(0x555)],this['lineHeight']());_0x569bd7+=$gameSystem[_0xc7269f(0x688)]()*0x2;const _0x3dacdc=Math[_0xc7269f(0x41d)]((Graphics[_0xc7269f(0x780)]-_0x40183f)/0x2),_0x314b1a=Math[_0xc7269f(0x41d)]((Graphics[_0xc7269f(0x555)]-_0x569bd7)/0x2),_0x3496d4=new Rectangle(_0x3dacdc,_0x314b1a,_0x40183f,_0x569bd7);this[_0xc7269f(0x489)](_0x3496d4['x'],_0x3496d4['y'],_0x3496d4[_0xc7269f(0x780)],_0x3496d4[_0xc7269f(0x555)]),this[_0xc7269f(0x897)](),this[_0xc7269f(0x1a4)](),this[_0xc7269f(0x20f)](),SceneManager[_0xc7269f(0x1a1)][_0xc7269f(0x359)](this);},Window_TextPopup[_0x55ae0c(0x792)][_0x55ae0c(0x1a4)]=function(){const _0x387e26=_0x55ae0c,_0x8ca5d3=this[_0x387e26(0x217)]();this[_0x387e26(0x463)][_0x387e26(0x3dd)](),this[_0x387e26(0x2e4)](this['_text'],_0x8ca5d3['x'],_0x8ca5d3['y'],_0x8ca5d3[_0x387e26(0x780)]);},Window_TextPopup['prototype'][_0x55ae0c(0x411)]=function(){const _0x4aad63=_0x55ae0c;if(this[_0x4aad63(0x1d4)]()||this[_0x4aad63(0x62e)]())return;if(this[_0x4aad63(0x1d8)]<=0x0)return;this['_timeDuration']--,this[_0x4aad63(0x1d8)]<=0x0&&(this[_0x4aad63(0x44f)](),this['_text']='');},VisuMZ[_0x55ae0c(0x7ab)]=function(_0x1405a2){const _0x1e9d45=_0x55ae0c;if(Utils[_0x1e9d45(0x4b0)](_0x1e9d45(0x865))){var _0x459dff=require('nw.gui')[_0x1e9d45(0x3ec)][_0x1e9d45(0x72d)]();SceneManager[_0x1e9d45(0x762)]();if(_0x1405a2)setTimeout(_0x459dff[_0x1e9d45(0x629)][_0x1e9d45(0x505)](_0x459dff),0x190);}},VisuMZ[_0x55ae0c(0x707)]=function(_0x2582aa,_0x10254c){const _0x1b15fe=_0x55ae0c;_0x10254c=_0x10254c[_0x1b15fe(0x8d3)]();var _0x566190=1.70158,_0x422d5c=0.7;switch(_0x10254c){case'LINEAR':return _0x2582aa;case _0x1b15fe(0x870):return-0x1*Math[_0x1b15fe(0x8e1)](_0x2582aa*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math['sin'](_0x2582aa*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x1b15fe(0x8e1)](Math['PI']*_0x2582aa)-0x1);case _0x1b15fe(0x5cc):return _0x2582aa*_0x2582aa;case _0x1b15fe(0x79d):return _0x2582aa*(0x2-_0x2582aa);case _0x1b15fe(0x24b):return _0x2582aa<0.5?0x2*_0x2582aa*_0x2582aa:-0x1+(0x4-0x2*_0x2582aa)*_0x2582aa;case'INCUBIC':return _0x2582aa*_0x2582aa*_0x2582aa;case _0x1b15fe(0x79b):var _0xc380ae=_0x2582aa-0x1;return _0xc380ae*_0xc380ae*_0xc380ae+0x1;case _0x1b15fe(0x3ea):return _0x2582aa<0.5?0x4*_0x2582aa*_0x2582aa*_0x2582aa:(_0x2582aa-0x1)*(0x2*_0x2582aa-0x2)*(0x2*_0x2582aa-0x2)+0x1;case _0x1b15fe(0x822):return _0x2582aa*_0x2582aa*_0x2582aa*_0x2582aa;case _0x1b15fe(0x74e):var _0xc380ae=_0x2582aa-0x1;return 0x1-_0xc380ae*_0xc380ae*_0xc380ae*_0xc380ae;case _0x1b15fe(0x8ab):var _0xc380ae=_0x2582aa-0x1;return _0x2582aa<0.5?0x8*_0x2582aa*_0x2582aa*_0x2582aa*_0x2582aa:0x1-0x8*_0xc380ae*_0xc380ae*_0xc380ae*_0xc380ae;case _0x1b15fe(0x6d4):return _0x2582aa*_0x2582aa*_0x2582aa*_0x2582aa*_0x2582aa;case _0x1b15fe(0x957):var _0xc380ae=_0x2582aa-0x1;return 0x1+_0xc380ae*_0xc380ae*_0xc380ae*_0xc380ae*_0xc380ae;case _0x1b15fe(0x986):var _0xc380ae=_0x2582aa-0x1;return _0x2582aa<0.5?0x10*_0x2582aa*_0x2582aa*_0x2582aa*_0x2582aa*_0x2582aa:0x1+0x10*_0xc380ae*_0xc380ae*_0xc380ae*_0xc380ae*_0xc380ae;case'INEXPO':if(_0x2582aa===0x0)return 0x0;return Math[_0x1b15fe(0x2fc)](0x2,0xa*(_0x2582aa-0x1));case'OUTEXPO':if(_0x2582aa===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x2582aa)+0x1;case _0x1b15fe(0x1be):if(_0x2582aa===0x0||_0x2582aa===0x1)return _0x2582aa;var _0x670fec=_0x2582aa*0x2,_0x4e2602=_0x670fec-0x1;if(_0x670fec<0x1)return 0.5*Math['pow'](0x2,0xa*_0x4e2602);return 0.5*(-Math[_0x1b15fe(0x2fc)](0x2,-0xa*_0x4e2602)+0x2);case _0x1b15fe(0x288):var _0x670fec=_0x2582aa/0x1;return-0x1*(Math['sqrt'](0x1-_0x670fec*_0x2582aa)-0x1);case'OUTCIRC':var _0xc380ae=_0x2582aa-0x1;return Math['sqrt'](0x1-_0xc380ae*_0xc380ae);case _0x1b15fe(0x869):var _0x670fec=_0x2582aa*0x2,_0x4e2602=_0x670fec-0x2;if(_0x670fec<0x1)return-0.5*(Math['sqrt'](0x1-_0x670fec*_0x670fec)-0x1);return 0.5*(Math[_0x1b15fe(0x2f3)](0x1-_0x4e2602*_0x4e2602)+0x1);case _0x1b15fe(0x70c):return _0x2582aa*_0x2582aa*((_0x566190+0x1)*_0x2582aa-_0x566190);case _0x1b15fe(0x6a9):var _0x670fec=_0x2582aa/0x1-0x1;return _0x670fec*_0x670fec*((_0x566190+0x1)*_0x670fec+_0x566190)+0x1;break;case _0x1b15fe(0x83b):var _0x670fec=_0x2582aa*0x2,_0x116af5=_0x670fec-0x2,_0x6ee4f3=_0x566190*1.525;if(_0x670fec<0x1)return 0.5*_0x670fec*_0x670fec*((_0x6ee4f3+0x1)*_0x670fec-_0x6ee4f3);return 0.5*(_0x116af5*_0x116af5*((_0x6ee4f3+0x1)*_0x116af5+_0x6ee4f3)+0x2);case'INELASTIC':if(_0x2582aa===0x0||_0x2582aa===0x1)return _0x2582aa;var _0x670fec=_0x2582aa/0x1,_0x4e2602=_0x670fec-0x1,_0x1fadfe=0x1-_0x422d5c,_0x6ee4f3=_0x1fadfe/(0x2*Math['PI'])*Math[_0x1b15fe(0x7bb)](0x1);return-(Math[_0x1b15fe(0x2fc)](0x2,0xa*_0x4e2602)*Math[_0x1b15fe(0x75e)]((_0x4e2602-_0x6ee4f3)*(0x2*Math['PI'])/_0x1fadfe));case _0x1b15fe(0x914):var _0x1fadfe=0x1-_0x422d5c,_0x670fec=_0x2582aa*0x2;if(_0x2582aa===0x0||_0x2582aa===0x1)return _0x2582aa;var _0x6ee4f3=_0x1fadfe/(0x2*Math['PI'])*Math[_0x1b15fe(0x7bb)](0x1);return Math['pow'](0x2,-0xa*_0x670fec)*Math[_0x1b15fe(0x75e)]((_0x670fec-_0x6ee4f3)*(0x2*Math['PI'])/_0x1fadfe)+0x1;case _0x1b15fe(0x433):var _0x1fadfe=0x1-_0x422d5c;if(_0x2582aa===0x0||_0x2582aa===0x1)return _0x2582aa;var _0x670fec=_0x2582aa*0x2,_0x4e2602=_0x670fec-0x1,_0x6ee4f3=_0x1fadfe/(0x2*Math['PI'])*Math[_0x1b15fe(0x7bb)](0x1);if(_0x670fec<0x1)return-0.5*(Math[_0x1b15fe(0x2fc)](0x2,0xa*_0x4e2602)*Math['sin']((_0x4e2602-_0x6ee4f3)*(0x2*Math['PI'])/_0x1fadfe));return Math[_0x1b15fe(0x2fc)](0x2,-0xa*_0x4e2602)*Math[_0x1b15fe(0x75e)]((_0x4e2602-_0x6ee4f3)*(0x2*Math['PI'])/_0x1fadfe)*0.5+0x1;case'OUTBOUNCE':var _0x670fec=_0x2582aa/0x1;if(_0x670fec<0x1/2.75)return 7.5625*_0x670fec*_0x670fec;else{if(_0x670fec<0x2/2.75){var _0x116af5=_0x670fec-1.5/2.75;return 7.5625*_0x116af5*_0x116af5+0.75;}else{if(_0x670fec<2.5/2.75){var _0x116af5=_0x670fec-2.25/2.75;return 7.5625*_0x116af5*_0x116af5+0.9375;}else{var _0x116af5=_0x670fec-2.625/2.75;return 7.5625*_0x116af5*_0x116af5+0.984375;}}}case _0x1b15fe(0x826):var _0x38ef30=0x1-VisuMZ[_0x1b15fe(0x707)](0x1-_0x2582aa,_0x1b15fe(0x21a));return _0x38ef30;case _0x1b15fe(0x90f):if(_0x2582aa<0.5)var _0x38ef30=VisuMZ['ApplyEasing'](_0x2582aa*0x2,_0x1b15fe(0x227))*0.5;else var _0x38ef30=VisuMZ['ApplyEasing'](_0x2582aa*0x2-0x1,_0x1b15fe(0x21a))*0.5+0.5;return _0x38ef30;default:return _0x2582aa;}},VisuMZ['GetParamIcon']=function(_0x5eeff3){const _0x7fb0c2=_0x55ae0c;_0x5eeff3=String(_0x5eeff3)['toUpperCase']();const _0xed0bfc=VisuMZ[_0x7fb0c2(0x3ae)][_0x7fb0c2(0x6c3)]['Param'];if(_0x5eeff3===_0x7fb0c2(0x866))return _0xed0bfc[_0x7fb0c2(0x99d)];if(_0x5eeff3===_0x7fb0c2(0x4f9))return _0xed0bfc[_0x7fb0c2(0x1f9)];if(_0x5eeff3===_0x7fb0c2(0x335))return _0xed0bfc['IconParam2'];if(_0x5eeff3===_0x7fb0c2(0x998))return _0xed0bfc[_0x7fb0c2(0x231)];if(_0x5eeff3===_0x7fb0c2(0x6fe))return _0xed0bfc['IconParam4'];if(_0x5eeff3==='MDF')return _0xed0bfc[_0x7fb0c2(0x843)];if(_0x5eeff3===_0x7fb0c2(0x6b7))return _0xed0bfc['IconParam6'];if(_0x5eeff3===_0x7fb0c2(0x4a1))return _0xed0bfc[_0x7fb0c2(0x75f)];if(_0x5eeff3===_0x7fb0c2(0x7eb))return _0xed0bfc['IconXParam0'];if(_0x5eeff3===_0x7fb0c2(0x409))return _0xed0bfc[_0x7fb0c2(0x1c7)];if(_0x5eeff3==='CRI')return _0xed0bfc['IconXParam2'];if(_0x5eeff3===_0x7fb0c2(0x1b3))return _0xed0bfc[_0x7fb0c2(0x942)];if(_0x5eeff3===_0x7fb0c2(0x832))return _0xed0bfc[_0x7fb0c2(0x3b1)];if(_0x5eeff3===_0x7fb0c2(0x302))return _0xed0bfc[_0x7fb0c2(0x669)];if(_0x5eeff3==='CNT')return _0xed0bfc[_0x7fb0c2(0x475)];if(_0x5eeff3===_0x7fb0c2(0x5c7))return _0xed0bfc[_0x7fb0c2(0x7be)];if(_0x5eeff3==='MRG')return _0xed0bfc[_0x7fb0c2(0x27e)];if(_0x5eeff3===_0x7fb0c2(0x62f))return _0xed0bfc[_0x7fb0c2(0x5ed)];if(_0x5eeff3===_0x7fb0c2(0x506))return _0xed0bfc['IconSParam0'];if(_0x5eeff3===_0x7fb0c2(0x388))return _0xed0bfc[_0x7fb0c2(0x1ac)];if(_0x5eeff3==='REC')return _0xed0bfc[_0x7fb0c2(0x273)];if(_0x5eeff3===_0x7fb0c2(0x807))return _0xed0bfc['IconSParam3'];if(_0x5eeff3===_0x7fb0c2(0x427))return _0xed0bfc[_0x7fb0c2(0x7e0)];if(_0x5eeff3==='TCR')return _0xed0bfc[_0x7fb0c2(0x242)];if(_0x5eeff3===_0x7fb0c2(0x6ac))return _0xed0bfc[_0x7fb0c2(0x49c)];if(_0x5eeff3===_0x7fb0c2(0x3df))return _0xed0bfc['IconSParam7'];if(_0x5eeff3===_0x7fb0c2(0x899))return _0xed0bfc[_0x7fb0c2(0x363)];if(_0x5eeff3===_0x7fb0c2(0x877))return _0xed0bfc['IconSParam9'];if(VisuMZ[_0x7fb0c2(0x3ae)][_0x7fb0c2(0x303)][_0x5eeff3])return VisuMZ['CoreEngine'][_0x7fb0c2(0x303)][_0x5eeff3]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x58dba2,_0x31f342,_0x5f42b8){const _0x354dfc=_0x55ae0c;if(_0x5f42b8===undefined&&_0x58dba2%0x1===0x0)return _0x58dba2;if(_0x5f42b8!==undefined&&[_0x354dfc(0x866),'MAXMP',_0x354dfc(0x335),_0x354dfc(0x998),'MAT','MDF',_0x354dfc(0x6b7),_0x354dfc(0x4a1)]['includes'](String(_0x5f42b8)[_0x354dfc(0x8d3)]()['trim']()))return _0x58dba2;_0x31f342=_0x31f342||0x0;if(VisuMZ[_0x354dfc(0x3ae)][_0x354dfc(0x1de)][_0x5f42b8])return VisuMZ[_0x354dfc(0x3ae)][_0x354dfc(0x3c8)][_0x5f42b8]===_0x354dfc(0x1c2)?_0x58dba2:String((_0x58dba2*0x64)[_0x354dfc(0x80d)](_0x31f342))+'%';return String((_0x58dba2*0x64)[_0x354dfc(0x80d)](_0x31f342))+'%';},VisuMZ['GroupDigits']=function(_0x22347d){const _0x575f65=_0x55ae0c;_0x22347d=String(_0x22347d);if(!_0x22347d)return _0x22347d;if(typeof _0x22347d!==_0x575f65(0x4c5))return _0x22347d;const _0x22c4d6=VisuMZ['CoreEngine'][_0x575f65(0x6c3)][_0x575f65(0x5fa)][_0x575f65(0x7d6)]||_0x575f65(0x21f),_0x46c54e={'maximumFractionDigits':0x6};_0x22347d=_0x22347d[_0x575f65(0x4ca)](/\[(.*?)\]/g,(_0x43ef34,_0x5dc08d)=>{const _0x2151ec=_0x575f65;return VisuMZ[_0x2151ec(0x88a)](_0x5dc08d,'[',']');}),_0x22347d=_0x22347d[_0x575f65(0x4ca)](/<(.*?)>/g,(_0x31f756,_0x1b02b0)=>{return VisuMZ['PreserveNumbers'](_0x1b02b0,'<','>');}),_0x22347d=_0x22347d[_0x575f65(0x4ca)](/\{\{(.*?)\}\}/g,(_0x4c86ab,_0x2147ff)=>{const _0x2df477=_0x575f65;return VisuMZ[_0x2df477(0x88a)](_0x2147ff,'','');}),_0x22347d=_0x22347d[_0x575f65(0x4ca)](/(\d+\.?\d*)/g,(_0x242604,_0x540f0c)=>{const _0x2f1c02=_0x575f65;let _0xecc764=_0x540f0c;if(_0xecc764[0x0]==='0')return _0xecc764;if(_0xecc764[_0xecc764['length']-0x1]==='.')return Number(_0xecc764)[_0x2f1c02(0x2ee)](_0x22c4d6,_0x46c54e)+'.';else return _0xecc764[_0xecc764[_0x2f1c02(0x616)]-0x1]===','?Number(_0xecc764)[_0x2f1c02(0x2ee)](_0x22c4d6,_0x46c54e)+',':Number(_0xecc764)[_0x2f1c02(0x2ee)](_0x22c4d6,_0x46c54e);});let _0x4a5e54=0x3;while(_0x4a5e54--){_0x22347d=VisuMZ[_0x575f65(0x730)](_0x22347d);}return _0x22347d;},VisuMZ['PreserveNumbers']=function(_0x51ff8c,_0x5a1bb6,_0xafc3b1){const _0x1bed4e=_0x55ae0c;return _0x51ff8c=_0x51ff8c[_0x1bed4e(0x4ca)](/(\d)/gi,(_0x400239,_0x2a4f3e)=>'PRESERVCONVERSION(%1)'['format'](Number(_0x2a4f3e))),_0x1bed4e(0x723)[_0x1bed4e(0x703)](_0x51ff8c,_0x5a1bb6,_0xafc3b1);},VisuMZ[_0x55ae0c(0x730)]=function(_0x224cfe){const _0x18ddec=_0x55ae0c;return _0x224cfe=_0x224cfe[_0x18ddec(0x4ca)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4c5b4a,_0x326245)=>Number(parseInt(_0x326245))),_0x224cfe;},VisuMZ['openURL']=function(_0x4751d5){const _0x31a917=_0x55ae0c;SoundManager[_0x31a917(0x894)]();if(!Utils['isNwjs']()){const _0x3b1ab2=window[_0x31a917(0x20f)](_0x4751d5,_0x31a917(0x1d3));}else{const _0x48a560=process[_0x31a917(0x51b)]=='darwin'?_0x31a917(0x20f):process[_0x31a917(0x51b)]==_0x31a917(0x75c)?_0x31a917(0x60b):_0x31a917(0x677);require('child_process')[_0x31a917(0x5e7)](_0x48a560+'\x20'+_0x4751d5);}},VisuMZ[_0x55ae0c(0x47b)]=function(_0x4b1556,_0x1f49c0){const _0xa720e4=_0x55ae0c;if(!_0x4b1556)return'';const _0x3ffeeb=_0x4b1556[_0xa720e4(0x50b)]||_0x4b1556['id'];let _0x4c734c='';return _0x4b1556[_0xa720e4(0x2d0)]!==undefined&&_0x4b1556['nickname']!==undefined&&(_0x4c734c=_0xa720e4(0x573)['format'](_0x3ffeeb,_0x1f49c0)),_0x4b1556[_0xa720e4(0x4fa)]!==undefined&&_0x4b1556[_0xa720e4(0x8c0)]!==undefined&&(_0x4c734c=_0xa720e4(0x323)[_0xa720e4(0x703)](_0x3ffeeb,_0x1f49c0)),_0x4b1556[_0xa720e4(0x47c)]!==undefined&&_0x4b1556[_0xa720e4(0x799)]!==undefined&&(_0x4c734c=_0xa720e4(0x606)[_0xa720e4(0x703)](_0x3ffeeb,_0x1f49c0)),_0x4b1556['itypeId']!==undefined&&_0x4b1556[_0xa720e4(0x8ba)]!==undefined&&(_0x4c734c=_0xa720e4(0x324)[_0xa720e4(0x703)](_0x3ffeeb,_0x1f49c0)),_0x4b1556['wtypeId']!==undefined&&_0x4b1556[_0xa720e4(0x6f0)]===0x1&&(_0x4c734c=_0xa720e4(0x5eb)['format'](_0x3ffeeb,_0x1f49c0)),_0x4b1556[_0xa720e4(0x948)]!==undefined&&_0x4b1556[_0xa720e4(0x6f0)]>0x1&&(_0x4c734c=_0xa720e4(0x1eb)['format'](_0x3ffeeb,_0x1f49c0)),_0x4b1556[_0xa720e4(0x982)]!==undefined&&_0x4b1556['battlerHue']!==undefined&&(_0x4c734c=_0xa720e4(0x1c1)['format'](_0x3ffeeb,_0x1f49c0)),_0x4b1556[_0xa720e4(0x8b2)]!==undefined&&_0x4b1556[_0xa720e4(0x268)]!==undefined&&(_0x4c734c=_0xa720e4(0x569)['format'](_0x3ffeeb,_0x1f49c0)),_0x4c734c;},Window_Base['prototype'][_0x55ae0c(0x3aa)]=function(_0x215ed8,_0x691d4e){const _0x510341=_0x55ae0c,_0x463cf8=ImageManager[_0x510341(0x1f7)]||0x20,_0x3b5e78=ImageManager[_0x510341(0x609)]||0x20;if(_0x691d4e[_0x510341(0x58f)]){const _0x13184c=_0x463cf8-ImageManager[_0x510341(0x918)],_0x53c6a2=_0x3b5e78-ImageManager[_0x510341(0x5f9)];let _0x4b9c1a=0x2,_0x42679b=0x2;this[_0x510341(0x407)]()!==0x24&&(_0x42679b=Math['floor']((this[_0x510341(0x407)]()-_0x3b5e78)/0x2));const _0x54025f=_0x691d4e['x']+Math['floor'](_0x13184c/0x2)+_0x4b9c1a,_0x42bdac=_0x691d4e['y']+Math[_0x510341(0x49a)](_0x53c6a2/0x2)+_0x42679b;this[_0x510341(0x908)](_0x215ed8,_0x54025f,_0x42bdac);}_0x691d4e['x']+=_0x463cf8+0x4;},Window_StatusBase[_0x55ae0c(0x792)][_0x55ae0c(0x61d)]=function(_0x190dd7,_0x311e17,_0x20e54e,_0x338a2d){const _0x414015=_0x55ae0c;_0x338a2d=_0x338a2d||0x90;const _0x228a0c=ImageManager[_0x414015(0x1f7)]||0x20,_0x5ef9fe=ImageManager[_0x414015(0x609)]||0x20,_0x581d5a=_0x228a0c-ImageManager[_0x414015(0x918)],_0x225105=_0x5ef9fe-ImageManager[_0x414015(0x5f9)],_0x3c92ee=_0x228a0c,_0x5c93fc=_0x190dd7[_0x414015(0x550)]()['slice'](0x0,Math[_0x414015(0x49a)](_0x338a2d/_0x3c92ee));let _0x2760db=_0x311e17+Math[_0x414015(0x478)](_0x581d5a/0x2),_0x181055=_0x20e54e+Math[_0x414015(0x478)](_0x225105/0x2);for(const _0x40ed83 of _0x5c93fc){this['drawIcon'](_0x40ed83,_0x2760db,_0x181055),_0x2760db+=_0x3c92ee;}},Game_Picture['prototype'][_0x55ae0c(0x1f2)]=function(){const _0x716c16=_0x55ae0c;return this[_0x716c16(0x29a)];},VisuMZ['CoreEngine'][_0x55ae0c(0x978)]=Game_Picture['prototype']['initBasic'],Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x53e)]=function(){const _0x360f2b=_0x55ae0c;VisuMZ[_0x360f2b(0x3ae)][_0x360f2b(0x978)][_0x360f2b(0x67e)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x360f2b(0x4e4)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x55ae0c(0x8b7)]=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x317)],Game_Picture['prototype']['updateMove']=function(){const _0x367c13=_0x55ae0c;this[_0x367c13(0x61a)]();const _0x1aa873=this[_0x367c13(0x3b2)];VisuMZ[_0x367c13(0x3ae)][_0x367c13(0x8b7)][_0x367c13(0x67e)](this),_0x1aa873>0x0&&this[_0x367c13(0x3b2)]<=0x0&&(this['_x']=this[_0x367c13(0x627)],this['_y']=this['_targetY'],this[_0x367c13(0x6f6)]=this[_0x367c13(0x514)],this[_0x367c13(0x4c7)]=this[_0x367c13(0x353)],this[_0x367c13(0x8fd)]=this['_targetOpacity'],this[_0x367c13(0x29a)]&&(this[_0x367c13(0x29a)]['x']=this[_0x367c13(0x4e4)]['x'],this[_0x367c13(0x29a)]['y']=this[_0x367c13(0x4e4)]['y']));},VisuMZ['CoreEngine'][_0x55ae0c(0x29b)]=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x7d1)],Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x7d1)]=function(_0x4eb955,_0x26bf03,_0xf44fbf,_0x12cd84,_0x1a41b1,_0x11c3f4,_0x4efb4,_0x291453){const _0x34d86c=_0x55ae0c;VisuMZ['CoreEngine']['Game_Picture_show'][_0x34d86c(0x67e)](this,_0x4eb955,_0x26bf03,_0xf44fbf,_0x12cd84,_0x1a41b1,_0x11c3f4,_0x4efb4,_0x291453),this[_0x34d86c(0x2bb)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x26bf03]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x55ae0c(0x5f4)]=Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x489)],Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x489)]=function(_0x53b5ea,_0x4d0b15,_0x29c68f,_0x58e91f,_0x1bcf2a,_0x569d62,_0x17ba79,_0xc4c717,_0x32bbaa){const _0x5362c0=_0x55ae0c;VisuMZ[_0x5362c0(0x3ae)][_0x5362c0(0x5f4)]['call'](this,_0x53b5ea,_0x4d0b15,_0x29c68f,_0x58e91f,_0x1bcf2a,_0x569d62,_0x17ba79,_0xc4c717,_0x32bbaa),this[_0x5362c0(0x8e2)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x53b5ea]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x55ae0c(0x61a)]=function(){const _0x48bfab=_0x55ae0c;this['_duration']>0x0&&(this[_0x48bfab(0x29a)]['x']=this[_0x48bfab(0x20d)](this[_0x48bfab(0x29a)]['x'],this[_0x48bfab(0x4e4)]['x']),this[_0x48bfab(0x29a)]['y']=this['applyEasing'](this[_0x48bfab(0x29a)]['y'],this[_0x48bfab(0x4e4)]['y']));},Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x2bb)]=function(_0x4c9a2c){const _0x5a4373=_0x55ae0c;this['_anchor']=_0x4c9a2c,this[_0x5a4373(0x4e4)]=JsonEx[_0x5a4373(0x78b)](this[_0x5a4373(0x29a)]);},Game_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x8e2)]=function(_0x5c57a3){this['_targetAnchor']=_0x5c57a3;},VisuMZ[_0x55ae0c(0x3ae)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x624)],Sprite_Picture[_0x55ae0c(0x792)][_0x55ae0c(0x624)]=function(){const _0x20feb0=_0x55ae0c,_0x1993c8=this[_0x20feb0(0x532)]();!_0x1993c8[_0x20feb0(0x1f2)]()?VisuMZ['CoreEngine'][_0x20feb0(0x62b)][_0x20feb0(0x67e)](this):(this[_0x20feb0(0x1f2)]['x']=_0x1993c8['anchor']()['x'],this[_0x20feb0(0x1f2)]['y']=_0x1993c8[_0x20feb0(0x1f2)]()['y']);},Game_Action[_0x55ae0c(0x792)]['setEnemyAction']=function(_0x12f098){const _0x567e99=_0x55ae0c;if(_0x12f098){const _0x4a89a1=_0x12f098['skillId'];if(_0x4a89a1===0x1&&this['subject']()[_0x567e99(0x259)]()!==0x1)this['setAttack']();else _0x4a89a1===0x2&&this[_0x567e99(0x840)]()[_0x567e99(0x5be)]()!==0x2?this['setGuard']():this[_0x567e99(0x889)](_0x4a89a1);}else this[_0x567e99(0x3dd)]();},Game_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x8bf)]=function(){const _0x576516=_0x55ae0c;return this[_0x576516(0x5d0)]()[_0x576516(0x70f)](_0x234595=>this['canUse'](_0x234595)&&this[_0x576516(0x8b8)]()[_0x576516(0x80e)](_0x234595['stypeId']));},Window_Base['prototype'][_0x55ae0c(0x282)]=function(){const _0xe33d82=_0x55ae0c;this[_0xe33d82(0x923)]=new Sprite(),this[_0xe33d82(0x923)][_0xe33d82(0x5ce)]=new Bitmap(0x0,0x0),this[_0xe33d82(0x923)]['x']=0x0,this[_0xe33d82(0x6a3)](this[_0xe33d82(0x923)]);},Window_Base[_0x55ae0c(0x792)][_0x55ae0c(0x357)]=function(){const _0x3617e0=_0x55ae0c;if(this[_0x3617e0(0x923)]){const _0x5bb31f=this['_dimmerSprite'][_0x3617e0(0x5ce)],_0x2a94b2=this[_0x3617e0(0x780)],_0x1e130e=this[_0x3617e0(0x555)],_0x4bd0f4=this[_0x3617e0(0x77d)],_0x3e81f2=ColorManager[_0x3617e0(0x5e2)](),_0x1bd7c4=ColorManager[_0x3617e0(0x89b)]();_0x5bb31f[_0x3617e0(0x779)](_0x2a94b2,_0x1e130e),_0x5bb31f[_0x3617e0(0x558)](0x0,0x0,_0x2a94b2,_0x4bd0f4,_0x1bd7c4,_0x3e81f2,!![]),_0x5bb31f[_0x3617e0(0x5f6)](0x0,_0x4bd0f4,_0x2a94b2,_0x1e130e-_0x4bd0f4*0x2,_0x3e81f2),_0x5bb31f[_0x3617e0(0x558)](0x0,_0x1e130e-_0x4bd0f4,_0x2a94b2,_0x4bd0f4,_0x3e81f2,_0x1bd7c4,!![]),this[_0x3617e0(0x923)][_0x3617e0(0x7ad)](0x0,0x0,_0x2a94b2,_0x1e130e);}},Game_Actor['prototype']['makeAutoBattleActions']=function(){const _0x3443ef=_0x55ae0c;for(let _0x4537ed=0x0;_0x4537ed<this[_0x3443ef(0x80b)]();_0x4537ed++){const _0x1c0e44=this[_0x3443ef(0x477)]();let _0x404cfb=Number[_0x3443ef(0x84e)];this[_0x3443ef(0x997)](_0x4537ed,_0x1c0e44[0x0]);for(const _0x3672bc of _0x1c0e44){const _0x4b23a0=_0x3672bc['evaluate']();_0x4b23a0>_0x404cfb&&(_0x404cfb=_0x4b23a0,this[_0x3443ef(0x997)](_0x4537ed,_0x3672bc));}}this[_0x3443ef(0x234)]('waiting');},Window_BattleItem[_0x55ae0c(0x792)][_0x55ae0c(0x3fd)]=function(_0x447a1e){const _0x2b180e=_0x55ae0c;return BattleManager[_0x2b180e(0x6ce)]()?BattleManager['actor']()[_0x2b180e(0x4d6)](_0x447a1e):Window_ItemList['prototype'][_0x2b180e(0x3fd)][_0x2b180e(0x67e)](this,_0x447a1e);},VisuMZ['CoreEngine'][_0x55ae0c(0x2ad)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x637)],Scene_Map['prototype'][_0x55ae0c(0x637)]=function(){const _0x279d81=_0x55ae0c;VisuMZ[_0x279d81(0x3ae)][_0x279d81(0x2ad)][_0x279d81(0x67e)](this);const _0x5b9401=this[_0x279d81(0x5d7)][_0x279d81(0x844)];if(_0x5b9401)this[_0x279d81(0x359)](_0x5b9401);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x7b4)]=Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x637)],Scene_Battle[_0x55ae0c(0x792)][_0x55ae0c(0x637)]=function(){const _0x2ffcfe=_0x55ae0c;VisuMZ[_0x2ffcfe(0x3ae)][_0x2ffcfe(0x7b4)]['call'](this);const _0x9673ff=this[_0x2ffcfe(0x5d7)]['_timerSprite'];if(_0x9673ff)this[_0x2ffcfe(0x359)](_0x9673ff);},Sprite_Actor[_0x55ae0c(0x792)][_0x55ae0c(0x4e1)]=function(){const _0x5045cb=_0x55ae0c;Sprite_Battler[_0x5045cb(0x792)][_0x5045cb(0x4e1)][_0x5045cb(0x67e)](this),this[_0x5045cb(0x64a)]();if(this[_0x5045cb(0x56a)])this[_0x5045cb(0x91e)]();else this['_battlerName']!==''&&(this[_0x5045cb(0x8d4)]='');},Window[_0x55ae0c(0x792)][_0x55ae0c(0x6bd)]=function(){const _0x5cd0b5=_0x55ae0c,_0x1d8138=this[_0x5cd0b5(0x7f4)],_0x3fbb8a=this[_0x5cd0b5(0x20e)],_0x5d69fc=0x18,_0x5b180c=_0x5d69fc/0x2,_0x423b4f=0x60+_0x5d69fc,_0x50c69e=0x0+_0x5d69fc;this[_0x5cd0b5(0x308)][_0x5cd0b5(0x5ce)]=this[_0x5cd0b5(0x51e)],this['_downArrowSprite'][_0x5cd0b5(0x1f2)]['x']=0.5,this[_0x5cd0b5(0x308)]['anchor']['y']=0.5,this[_0x5cd0b5(0x308)]['setFrame'](_0x423b4f+_0x5b180c,_0x50c69e+_0x5b180c+_0x5d69fc,_0x5d69fc,_0x5b180c),this[_0x5cd0b5(0x308)]['move'](Math[_0x5cd0b5(0x41d)](_0x1d8138/0x2),Math[_0x5cd0b5(0x41d)](_0x3fbb8a-_0x5b180c)),this['_upArrowSprite']['bitmap']=this[_0x5cd0b5(0x51e)],this[_0x5cd0b5(0x1fd)][_0x5cd0b5(0x1f2)]['x']=0.5,this[_0x5cd0b5(0x1fd)][_0x5cd0b5(0x1f2)]['y']=0.5,this[_0x5cd0b5(0x1fd)]['setFrame'](_0x423b4f+_0x5b180c,_0x50c69e,_0x5d69fc,_0x5b180c),this[_0x5cd0b5(0x1fd)]['move'](Math['round'](_0x1d8138/0x2),Math[_0x5cd0b5(0x41d)](_0x5b180c));},Window[_0x55ae0c(0x792)][_0x55ae0c(0x54a)]=function(){const _0x2fcc91=_0x55ae0c,_0x2bc2c6=0x90,_0x4269df=0x60,_0x43376d=0x18;this[_0x2fcc91(0x30b)][_0x2fcc91(0x5ce)]=this[_0x2fcc91(0x51e)],this['_pauseSignSprite'][_0x2fcc91(0x1f2)]['x']=0.5,this[_0x2fcc91(0x30b)][_0x2fcc91(0x1f2)]['y']=0x1,this[_0x2fcc91(0x30b)][_0x2fcc91(0x489)](Math[_0x2fcc91(0x41d)](this[_0x2fcc91(0x7f4)]/0x2),this['_height']),this[_0x2fcc91(0x30b)]['setFrame'](_0x2bc2c6,_0x4269df,_0x43376d,_0x43376d),this[_0x2fcc91(0x30b)]['alpha']=0xff;},Window['prototype'][_0x55ae0c(0x29c)]=function(){const _0x48a1f7=_0x55ae0c,_0x49658d=this[_0x48a1f7(0x249)][_0x48a1f7(0x347)]['apply'](new Point(0x0,0x0)),_0x3c4229=this[_0x48a1f7(0x249)][_0x48a1f7(0x5ab)];_0x3c4229['x']=_0x49658d['x']+this[_0x48a1f7(0x949)]['x'],_0x3c4229['y']=_0x49658d['y']+this[_0x48a1f7(0x949)]['y'],_0x3c4229[_0x48a1f7(0x780)]=Math[_0x48a1f7(0x478)](this['innerWidth']*this[_0x48a1f7(0x610)]['x']),_0x3c4229['height']=Math[_0x48a1f7(0x478)](this[_0x48a1f7(0x767)]*this[_0x48a1f7(0x610)]['y']);},VisuMZ['CoreEngine'][_0x55ae0c(0x23d)]=Window['prototype'][_0x55ae0c(0x25e)],Window[_0x55ae0c(0x792)][_0x55ae0c(0x25e)]=function(){const _0x34f890=_0x55ae0c,_0x56c691=VisuMZ[_0x34f890(0x3ae)][_0x34f890(0x6c3)][_0x34f890(0x3ec)][_0x34f890(0x577)]??!![];if(!_0x56c691)return VisuMZ['CoreEngine'][_0x34f890(0x23d)]['call'](this);const _0x49fb95=this['_margin'],_0x418098=Math[_0x34f890(0x391)](0x0,this[_0x34f890(0x7f4)]-_0x49fb95*0x2),_0x1a5a18=Math[_0x34f890(0x391)](0x0,this[_0x34f890(0x20e)]-_0x49fb95*0x2),_0x23fa3d=this[_0x34f890(0x2a9)],_0x3844f3=_0x23fa3d[_0x34f890(0x968)][0x0];_0x23fa3d[_0x34f890(0x5ce)]=this[_0x34f890(0x51e)],_0x23fa3d[_0x34f890(0x7ad)](0x0,0x0,0x60,0x60),_0x23fa3d['move'](_0x49fb95,_0x49fb95),_0x23fa3d[_0x34f890(0x610)]['x']=_0x418098/0x60,_0x23fa3d[_0x34f890(0x610)]['y']=_0x1a5a18/0x60,_0x3844f3[_0x34f890(0x5ce)]=this[_0x34f890(0x51e)],_0x3844f3[_0x34f890(0x7ad)](0x0,0x60,0x60,0x60),_0x3844f3[_0x34f890(0x489)](0x0,0x0,_0x418098,_0x1a5a18),_0x3844f3[_0x34f890(0x610)]['x']=0x1/_0x23fa3d[_0x34f890(0x610)]['x'],_0x3844f3['scale']['y']=0x1/_0x23fa3d[_0x34f890(0x610)]['y'],_0x23fa3d['setColorTone'](this[_0x34f890(0x646)]);},Game_Temp[_0x55ae0c(0x792)][_0x55ae0c(0x48e)]=function(){const _0x198f06=_0x55ae0c;this[_0x198f06(0x535)]=[],this[_0x198f06(0x50c)]=[],this[_0x198f06(0x50a)]=[],this[_0x198f06(0x377)]=[];},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x26e)]=Scene_Base['prototype'][_0x55ae0c(0x20b)],Scene_Base[_0x55ae0c(0x792)]['terminate']=function(){if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix']['call'](this);},Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x519)]=function(_0x22a08d){const _0x2b96f0=_0x55ae0c,_0x24dc28=this[_0x2b96f0(0x325)];_0x24dc28['save'](),_0x24dc28[_0x2b96f0(0x384)]=this[_0x2b96f0(0x1a6)]();const _0x2c67d4=_0x24dc28[_0x2b96f0(0x5db)](_0x22a08d)[_0x2b96f0(0x780)];return _0x24dc28[_0x2b96f0(0x6cf)](),_0x2c67d4;},Window_Message['prototype'][_0x55ae0c(0x351)]=function(_0x23ac6c){const _0x16543b=_0x55ae0c;return this['useFontWidthFix']()?this[_0x16543b(0x463)]['measureTextWidthNoRounding'](_0x23ac6c):Window_Base[_0x16543b(0x792)]['textWidth'][_0x16543b(0x67e)](this,_0x23ac6c);},Window_Message['prototype']['useFontWidthFix']=function(){const _0x1e168f=_0x55ae0c;return VisuMZ['CoreEngine']['Settings'][_0x1e168f(0x5fa)][_0x1e168f(0x8c1)]??!![];},VisuMZ[_0x55ae0c(0x3ae)]['Game_Action_numRepeats']=Game_Action['prototype'][_0x55ae0c(0x634)],Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x634)]=function(){const _0x5aecef=_0x55ae0c;return this[_0x5aecef(0x5cd)]()?VisuMZ[_0x5aecef(0x3ae)][_0x5aecef(0x6ca)][_0x5aecef(0x67e)](this):0x0;},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2a1)]=Game_Action[_0x55ae0c(0x792)][_0x55ae0c(0x3de)],Game_Action['prototype'][_0x55ae0c(0x3de)]=function(){const _0x5c0500=_0x55ae0c;if(this['subject']()&&this[_0x5c0500(0x840)]()[_0x5c0500(0x33e)]())VisuMZ[_0x5c0500(0x3ae)][_0x5c0500(0x2a1)][_0x5c0500(0x67e)](this);else BattleManager[_0x5c0500(0x705)]?VisuMZ[_0x5c0500(0x3ae)][_0x5c0500(0x2a1)][_0x5c0500(0x67e)](this):this[_0x5c0500(0x3dd)]();},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x5c0)]=BattleManager[_0x55ae0c(0x2c6)],BattleManager[_0x55ae0c(0x2c6)]=function(_0x45859b,_0x3c611e){const _0x433204=_0x55ae0c;this[_0x433204(0x705)]=!![],VisuMZ[_0x433204(0x3ae)][_0x433204(0x5c0)]['call'](this,_0x45859b,_0x3c611e),this[_0x433204(0x705)]=undefined;},Sprite_Name[_0x55ae0c(0x792)][_0x55ae0c(0x879)]=function(){return 0x24;},Sprite_Name['prototype']['redraw']=function(){const _0x1347e0=_0x55ae0c,_0xe7d1cf=this[_0x1347e0(0x61b)](),_0x4f2b00=this['bitmapWidth'](),_0x19033b=this[_0x1347e0(0x879)]();this[_0x1347e0(0x8fc)](),this[_0x1347e0(0x5ce)][_0x1347e0(0x3dd)](),this[_0x1347e0(0x5ce)][_0x1347e0(0x647)](_0xe7d1cf,0x4,0x0,_0x4f2b00-0xa,_0x19033b,_0x1347e0(0x3dc));},Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x647)]=function(_0x1c7581,_0x1dc7b4,_0x24372f,_0x4e6a92,_0x175148,_0x25f0ec){const _0x296f4f=_0x55ae0c,_0x37412a=this[_0x296f4f(0x325)],_0x2ef20a=_0x37412a[_0x296f4f(0x701)];_0x4e6a92=_0x4e6a92||0xffffffff;let _0x53214e=_0x1dc7b4,_0x57dc7f=Math['round'](_0x24372f+0x18/0x2+this[_0x296f4f(0x3ac)]*0.35);_0x25f0ec===_0x296f4f(0x3f8)&&(_0x53214e+=_0x4e6a92/0x2),_0x25f0ec==='right'&&(_0x53214e+=_0x4e6a92),_0x37412a['save'](),_0x37412a[_0x296f4f(0x384)]=this['_makeFontNameText'](),_0x37412a[_0x296f4f(0x3a7)]=_0x25f0ec,_0x37412a[_0x296f4f(0x875)]=_0x296f4f(0x8e8),_0x37412a[_0x296f4f(0x701)]=0x1,this[_0x296f4f(0x585)](_0x1c7581,_0x53214e,_0x57dc7f,_0x4e6a92),_0x37412a[_0x296f4f(0x701)]=_0x2ef20a,this[_0x296f4f(0x1bb)](_0x1c7581,_0x53214e,_0x57dc7f,_0x4e6a92),_0x37412a[_0x296f4f(0x6cf)](),this[_0x296f4f(0x939)][_0x296f4f(0x4e1)]();},VisuMZ[_0x55ae0c(0x3ae)]['BattleManager_checkSubstitute']=BattleManager[_0x55ae0c(0x945)],BattleManager[_0x55ae0c(0x945)]=function(_0x3862b5){const _0x3e2057=_0x55ae0c;if(this[_0x3e2057(0x2b3)]&&this[_0x3e2057(0x2b3)][_0x3e2057(0x528)]()===_0x3862b5['isActor']())return![];return VisuMZ['CoreEngine'][_0x3e2057(0x449)][_0x3e2057(0x67e)](this,_0x3862b5);},BattleManager[_0x55ae0c(0x67a)]=function(){const _0x3ba633=_0x55ae0c;if(this[_0x3ba633(0x2b3)])this[_0x3ba633(0x92a)][_0x3ba633(0x67a)](this[_0x3ba633(0x2b3)]);this[_0x3ba633(0x1ab)]=_0x3ba633(0x99b),this[_0x3ba633(0x2b3)]&&this['_subject'][_0x3ba633(0x80b)]()===0x0&&(this[_0x3ba633(0x88d)](this[_0x3ba633(0x2b3)]),this[_0x3ba633(0x2b3)]=null);},Bitmap[_0x55ae0c(0x792)][_0x55ae0c(0x66e)]=function(){const _0x2090b7=_0x55ae0c;this['_image']=new Image(),this[_0x2090b7(0x8bc)][_0x2090b7(0x671)]=this['_onLoad'][_0x2090b7(0x505)](this),this['_image']['onerror']=this[_0x2090b7(0x645)][_0x2090b7(0x505)](this),this[_0x2090b7(0x7db)](),this['_loadingState']='loading',Utils[_0x2090b7(0x649)]()?this[_0x2090b7(0x931)]():(this[_0x2090b7(0x8bc)][_0x2090b7(0x7b1)]=this[_0x2090b7(0x6d6)],![]&&this[_0x2090b7(0x8bc)][_0x2090b7(0x780)]>0x0&&(this[_0x2090b7(0x8bc)][_0x2090b7(0x671)]=null,this[_0x2090b7(0x76d)]()));},Scene_Skill['prototype']['onActorChange']=function(){const _0x55dcee=_0x55ae0c;Scene_MenuBase[_0x55dcee(0x792)][_0x55dcee(0x9a1)]['call'](this),this[_0x55dcee(0x46c)](),this['_itemWindow'][_0x55dcee(0x815)](),this[_0x55dcee(0x709)][_0x55dcee(0x580)](),this[_0x55dcee(0x55e)][_0x55dcee(0x80f)]();},Scene_Skill[_0x55ae0c(0x792)][_0x55ae0c(0x447)]=function(){const _0x139e3b=_0x55ae0c;return this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x139e3b(0x3b5)];},Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x2e9)]=function(_0x5e77b7,_0x173b92,_0x4863af){const _0x26314d=_0x55ae0c,_0x259940=this[_0x26314d(0x8ee)](),_0x4daa46=this[_0x26314d(0x422)](_0x5e77b7,_0x173b92);for(const _0x39eed7 of _0x4daa46){const _0x59f80c=_0x259940[_0x39eed7];if(_0x59f80c===undefined||_0x59f80c===null){if($gameTemp[_0x26314d(0x6fd)]()&&!DataManager['isEventTest']()){let _0x478093='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x478093+=_0x26314d(0x5ea)+'\x0a',_0x478093+=_0x26314d(0x4c8);if(this[_0x26314d(0x771)]())alert(_0x478093),SceneManager['exit']();else{if(!this[_0x26314d(0x34d)])console[_0x26314d(0x405)](_0x478093);this[_0x26314d(0x34d)]=!![];}}}if((_0x59f80c&0x10)!==0x0)continue;if((_0x59f80c&_0x4863af)===0x0)return!![];if((_0x59f80c&_0x4863af)===_0x4863af)return![];}return![];},Game_Map[_0x55ae0c(0x792)][_0x55ae0c(0x771)]=function(){const _0x2db76f=_0x55ae0c;if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported[_0x2db76f(0x810)])return!![];return![];},Sprite_Animation[_0x55ae0c(0x792)][_0x55ae0c(0x7aa)]=function(_0x29098d){const _0x2bd1c9=_0x55ae0c;!this[_0x2bd1c9(0x4cd)]&&(this['_originalViewport']=_0x29098d['gl'][_0x2bd1c9(0x7d0)](_0x29098d['gl'][_0x2bd1c9(0x2f2)]));},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x2dc)]=Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x430)],Scene_Map[_0x55ae0c(0x792)][_0x55ae0c(0x430)]=function(){const _0x4d7f1f=_0x55ae0c,_0x387a07=SceneManager['_previousClass'][_0x4d7f1f(0x61b)];if(['Scene_Title',_0x4d7f1f(0x39c),'Scene_TitleTransition',_0x4d7f1f(0x41b)][_0x4d7f1f(0x80e)](_0x387a07))return![];return VisuMZ['CoreEngine']['Scene_Map_shouldAutosave'][_0x4d7f1f(0x67e)](this);},VisuMZ[_0x55ae0c(0x3ae)][_0x55ae0c(0x1e8)]=Window_SkillList[_0x55ae0c(0x792)][_0x55ae0c(0x80e)],Window_SkillList[_0x55ae0c(0x792)]['includes']=function(_0x31ffb0){const _0x1c381d=_0x55ae0c;if(this['_stypeId']<=0x0)return![];return VisuMZ[_0x1c381d(0x3ae)]['Window_SkillList_includes'][_0x1c381d(0x67e)](this,_0x31ffb0);},VisuMZ[_0x55ae0c(0x3ae)]['Game_Battler_initTpbChargeTime']=Game_Battler[_0x55ae0c(0x792)][_0x55ae0c(0x54d)],Game_Battler[_0x55ae0c(0x792)][_0x55ae0c(0x54d)]=function(_0xf5ea0e){const _0x5867b5=_0x55ae0c;VisuMZ[_0x5867b5(0x3ae)]['Game_Battler_initTpbChargeTime'][_0x5867b5(0x67e)](this,_0xf5ea0e),isNaN(this[_0x5867b5(0x785)])&&(VisuMZ[_0x5867b5(0x3ae)][_0x5867b5(0x254)]['call'](this,_0xf5ea0e),isNaN(this['_tpbChargeTime'])&&(this[_0x5867b5(0x785)]=0x0));},Game_Battler[_0x55ae0c(0x792)][_0x55ae0c(0x8c2)]=function(){const _0x367fb2=_0x55ae0c;this['_tpbState']===_0x367fb2(0x970)&&(this['_tpbChargeTime']+=this['tpbAcceleration'](),isNaN(this[_0x367fb2(0x785)])&&(this[_0x367fb2(0x785)]=this[_0x367fb2(0x7e6)](),isNaN(this[_0x367fb2(0x785)])&&(this[_0x367fb2(0x785)]=0x0)),this['_tpbChargeTime']>=0x1&&(this[_0x367fb2(0x785)]=0x1,this[_0x367fb2(0x74f)]()));};