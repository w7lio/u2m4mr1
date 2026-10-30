//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.0.1) A simple plugin that adds a credits option to the title screen.
 * 
 * @author Sinflower and Candiru
 *
 */


///////////// Menu Specific settings //////////////////
var MENU_INSERT_INDEX = 3;

// Text for the Credits menu entry
var CREDITS_MENU_NAME = "Credits";

///////////////////////////////////////////////////////

///////////// Credits Specific settings ///////////////
// Name of the logo file to add to the top
var LOGO = "kaguralogo4_c";

// List of different crediting groups and their members
var GROUPS = {}
GROUPS["Localization"] = ["Agelheed", "elfloren", "JGF", "Kapurino Inc. Swaps4 Jake Caprino", "Kennoko", "MC", "sacchan", "SFrame", "Shawn Gill"];
GROUPS["Quality Assurance"] = ["Imban", "RowynNope", "The Gentleman Pervert", "Wes Mullers", "Yawning Soldier"];
//GROUPS["Editor"] = ["A-chan", "elfloren", "JGF", "Kapurino Inc. Swaps4 Jake Caprino", "Kennoko", "MC", "SFrame"];
//GROUPS["QA"] = ["Test  1", "Test  2", "Test  3"];
//GROUPS["PlaceHolders"] = ["Test  1", "Test  2", "Test  3"];
//GROUPS["PlaceHolders2"] = ["Test  12", "Test  21", "Test  32"];
//GROUPS["PlaceHolders3"] = ["Test  12", "Test  21", "Test  32"];

// Distance of the logo from the top
var LOGO_TOP_DIST = 24;
// Distance of the first group from the logo
var LOGO_FIRST_GROUP_DIST = 10;
// Font size for the group name
var GROUP_NAME_FONT_SIZE = 30;
// Font size for the groups people
var GROUP_PERSON_FONT_SIZE = 20;
// Additional distance between the group name and the name of the first person
var TITLE_PERSON_DIST = 20;
// Distance between the names of two persons
var PERSON_NAME_DIST = 30;
// Distance between the name of the last person and the name of the next group
var PERSON_GROUP_DIST = 40;
///////////////////////////////////////////////////////

var Window_TitleCommand_makeCommandList_org = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function()
{
	Window_TitleCommand_makeCommandList_org.call(this);
	this._list.splice(MENU_INSERT_INDEX, 0, {name: CREDITS_MENU_NAME+ '', symbol: 'credits', enabled: true, ext: null});
	//#edited above to add '    Credits'
	// this.addCommand(CREDITS_MENU_NAME, 'credits');
	// this.addCommand(parameters['name'] ,'credits');
    // var anotherCommand1 = this._list.pop();
    // this._list.splice(MENU_INSERT_INDEX, 0, anotherCommand1);
            
};

var Scene_Title_createCommandWindow_org = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function()
{
	Scene_Title_createCommandWindow_org.call(this);
	this._commandWindow.setHandler('credits',  this.showCredits.bind(this));
};

Scene_Title.prototype.showCredits = function()
{
	this._commandWindow.close();
	SceneManager.push(Scene_Credits);
};


function Scene_Credits()
{
    this.initialize.apply(this, arguments);
}

Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Credits.prototype.constructor = Scene_Credits;

Scene_Credits.prototype.initialize = function()
{
	Scene_MenuBase.prototype.initialize.call(this);

	this.logo = null;
	this.creditSprite = null;
	this.logoInitDone = false;
	this.creditsBitmap = null;
	this.color = 'rgba(0,0,10,0.8)';
	this.logoOffset = 0;
	this.scrollOffset = 0;
	this.scrolling = false;
};

Scene_Credits.prototype.create = function()
{
    Scene_MenuBase.prototype.create.call(this);
    this.createCreditsScreen();
};

Scene_Credits.prototype.terminate = function()
{
    Scene_MenuBase.prototype.terminate.call(this);
};


Scene_Credits.prototype.createCreditsScreen = function()
{
	this.logo = new Sprite(ImageManager.loadSystem(LOGO));

	this.creditSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
	this.creditSprite.bitmap.fillRect(0, 0, this.creditSprite.width, this.creditSprite.height, this.color);

	var height = 0;

	for(var key in GROUPS)
	{
		var g = GROUPS[key];
		console.log(g);
		height += TITLE_PERSON_DIST;
		height += PERSON_NAME_DIST * g.length;
		height += PERSON_GROUP_DIST;
	}

	this.creditsBitmap = new Bitmap(Graphics.width, height)
	this.scrollOffset = -80;
	this.createCreditText();

	console.log(height);

	this.addChild(this.creditSprite);
};

Scene_Credits.prototype.createCreditText = function()
{
	var offset = 0;

	for(var key in GROUPS)
	{
		this.creditsBitmap.fontSize = GROUP_NAME_FONT_SIZE;
		this.creditsBitmap.drawText(key, 0, offset, this.creditSprite.width, this.creditsBitmap.fontSize, 'center');
		offset += TITLE_PERSON_DIST;

		this.creditsBitmap.fontSize = GROUP_PERSON_FONT_SIZE;
		for(var i = 0; i < GROUPS[key].length; i++)
		{
			p = GROUPS[key][i];
			offset += PERSON_NAME_DIST;
			this.creditsBitmap.drawText(p, 0, offset, this.creditSprite.width, this.creditsBitmap.fontSize, 'center');
		}

		offset += PERSON_GROUP_DIST;
	}
};

Scene_Credits.prototype.updateCreditsSprite = function()
{
	// First clear the actual credit area
	this.creditSprite.bitmap.clearRect(0, this.logoOffset, this.creditSprite.width, this.creditSprite.height - this.logoOffset);
	// Then refill it with the transparent color (only refilling would result in a black screen as it would constantly paint over the existing image)
	this.creditSprite.bitmap.fillRect(0, this.logoOffset, this.creditSprite.width, this.creditSprite.height - this.logoOffset, this.color);

	// Calculate the available height in the destination image 
	var hS = this.creditSprite.height - this.logoOffset;
	var sy = this.scrollOffset - hS;

	// Set the height of the part to extract to the current scroll offset
	var height = this.scrollOffset;

	// If the y position in the source image is below 0 set it to 0
	if(sy < 0) sy = 0;
	// If the y position in the source image is above 0 set the 
	// height of the part to copy to the height of the destiantion image
	// (here hS which already removes the space required by the logo)
	if(sy > 0) height = hS;

	// Check if the height would exceed the actual image
	// if so set it to the highest possible value
	if(height + sy > this.creditsBitmap.height)
		height = this.creditsBitmap.height - sy;

	// Calculate the y position in the destination image
	var dy = this.creditSprite.height - this.scrollOffset;
	// Cut off at the logo bottom
	if(dy < this.logoOffset) dy = this.logoOffset;

	this.creditSprite.bitmap.blt(this.creditsBitmap, 0, sy, this.creditsBitmap.width, height, 0, dy);

	if(this.scrollOffset < 2 * this.creditsBitmap.height)
		this.scrollOffset++;
	else
		this.scrollOffset = 0;
};

Scene_Credits.prototype.update = function()
{
	// Because in MV the bitmap is not loaded as soon as load returns
	// waiting until isReady returns true is required
	if(this.logo && this.logo.bitmap.isReady() && !this.logoInitDone)
	{
		this.logoInitDone = true;
		this.creditSprite.bitmap.blt(this.logo.bitmap, 0, 0, this.logo.width, this.logo.height, this.creditSprite.width / 2 - (this.logo.width / 2), LOGO_TOP_DIST);
		this.logoOffset = this.logo.height + LOGO_TOP_DIST + LOGO_FIRST_GROUP_DIST;
		this.scrolling = (this.creditsBitmap.height + this.logoOffset) > Graphics.height;

		if(!this.scrolling)
			this.creditSprite.bitmap.blt(this.creditsBitmap, 0, 0, this.creditsBitmap.width, this.creditsBitmap.height, 0, this.logoOffset);
	}

	if(this.logoInitDone && this.scrolling)
		this.updateCreditsSprite();

	if(Input.isTriggered('cancel') || Input.isTriggered('ok'))
		SceneManager.pop();
};

