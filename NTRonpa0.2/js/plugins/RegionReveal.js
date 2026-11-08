//=============================================================================
// Region Reveal
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Hides and Shows part of the map based on regions
 * @author Tim Nash
 *
 * @help RegionReveal.js
 * Hide and how show different regions on a map.
 *
 * @command hide
 * @text Hide Region Tiles
 * @desc Hide tiles and events within a region
 * @arg regionId
 * @type number
 * @min 1
 * @max 255
 * @default 1
 * @text Region ID
 * @desc The region that is being hidden.
 *
 * @command show
 * @text Show Region Tiles
 * @desc Shows tiles and events within a region
 * @arg regionId
 * @type number
 * @min 1
 * @max 255
 * @default 1
 * @text Region ID
 * @desc The region that is being hidden.
 */

(() => {
    // Set our Plugin Name
    const pluginName = "RegionReveal";

    /*
     * Regionreveal
     * Provides Region hide/show functionality
     */
    class regionReveal {
        constructor(){
            // We will be storing our tile history here
            this.tileCoordinates = {};
        }

        /*
         * setupRegionTiles
         * Loops through and stores information about map regions
         * returns this.tileCoordinates
         */
        setupRegionTiles(){

            for(let x=0, w=$dataMap.width; x < w; x++){

                for(let y=0, h=$dataMap.height; y < h; y++){

                    //S tore the region for a given x,y co-ordinates
                    var tileRegion = $gameMap.regionId(x,y);
                    if( tileRegion >= 1 ){
                        // If we haven't got this region set already we should add it and carry on.
                        if( undefined === this.tileCoordinates[tileRegion] ){
                            this.tileCoordinates[tileRegion] = []
                        }
                        // Add the tiles data to our array including it's x,y coordinates, and all tile layers
                        this.tileCoordinates[tileRegion].push([x,y,$gameMap.allTiles(x, y).reverse()]);
                    }

                }

            }
        }

        /*
         * getRegionTiles()
         * Get all the Tile data we store for a given region
         * param int id
         * return array
         */
        getRegionTiles(id){
            // If we don't have the region bail out
            if( undefined === this.tileCoordinates[id] ){
                return false;
            }

            //Return all the region tile information
            return this.tileCoordinates[id];
        }

        /*
         * Change Region
         * Swap tiles for a region use hide true/false to set
         * param int id, bool hide
         */
        changeRegion( id, hide ){
            // If we don't have the region in the tileset bail
            if( undefined === this.tileCoordinates[id] ){
                return false;
            }

            // get our tiles and loop through them
            this.getRegionTiles(id).forEach(function (item) {
                /*
                 * item is our array from getRegionTiles contains
                 * item[0] - x coordinate
                 * item[1] - y coordinate
                 * item[2] - all tile layers
                 * item[3] - State of the tile (is it hidden)
                 */

                //Get the Map width and Height
                const w = $gameMap.width();
                const h = $gameMap.height();

                //Loop through each Z-Index which are a different entry in $dataMap
                for( let z=0; z < item[2].length; z++ ){
                    //Get the code for entry in $dataMap

                    var mapLoc = (z * w * h) + (item[1] * w) + item[0];
                    if( hide === true ){
                        //Update Entry with the tileset 0 not there.
                        $dataMap.data[mapLoc] = 0;
                    }else{
                        //Update the $dataMap entry using the data from item[2] reversed.
                        $dataMap.data[mapLoc] = item[2][z];
                    }
                }

                // Unlike Tiles for events we don't want to remove them just make them transparent
                // Check if there is an event at this tile
                if( $gameMap.eventIdXy(item[0],item[1]) > 0 ){
                    //Set events transparency to true if hidden, or false if showing.
                    $gameMap.event( $gameMap.eventIdXy(item[0],item[1]) ).setTransparent(hide);
                }

              });
        }

    }
    // Instantiate our class into an object
    let regionreveal = new regionReveal();

    /*
    * Hide
    * Add the hide plugin command
    * Takes a single Argument which is the Region ID
    */
    PluginManager.registerCommand(pluginName, "hide", args => {

        // Check if we have setup the region tiles, and if not run our setup sequence
        if( Object.entries(regionreveal.tileCoordinates).length === 0 ){
            regionreveal.setupRegionTiles();
        }
        // Hide the Region
        regionreveal.changeRegion(args.regionId,true);
    })

    /*
    * Show
    * Add the show plugin command
    * Takes a single Argument which is the Region ID
    */
    PluginManager.registerCommand(pluginName, "show", args => {

        // Show the region
        regionreveal.changeRegion(args.regionId, false);
    })
})();
