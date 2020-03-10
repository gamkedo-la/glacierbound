const TILE_SIZE = 64;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const GRID_FLOOR = 0;
const GRID_WALL = 1;
const GRID_DOOR = 2;

class Map {
    constructor() {
        this.level1 = [
            1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01,
            1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 1.01,
            1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 0.00, 0.00, 1.02, 2.01, 1.01, 1.01, 1.01, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 1.01, 1.01, 1.02, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
        ];

        this.level2 = [
            1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 2.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
            1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
        ]

        this.currentLevel = this.level1;

        this.doorStates = [];
        this.doorStates.length = this.currentLevel.length;
        this.doorStates.fill(0);

        this.doorOffsets = this.doorStates.slice();
        this.doorOffsets.fill(64);
    }

    draw() {
        for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {

                if (grid.currentLevel[mapTileToIndex(eachCol, eachRow)]) {
                    colorRect(MINIMAP_SCALE_FACTOR * eachCol * TILE_SIZE, MINIMAP_SCALE_FACTOR * eachRow * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, 'black');
                }

            }
        }
    }

    updateDoors() {
        for (let d = 0; d < this.doorStates.length; d++) {
            if (Math.floor(this.currentLevel[d]) != 2) continue;
            if (this.doorStates[d] != 0) {
                this.doorOffsets[d] -= this.doorStates[d];
            } 


            if (this.doorOffsets[d] < 0 || this.doorOffsets[d] > 64) {
                this.doorStates[d] = 0;
                this.doorOffsets[d] = Math.min(this.doorOffsets[d], 64);
                this.doorOffsets[d] = Math.max(this.doorOffsets[d], 0);
            }
        }
    }

    toggleDoors() {
        //TO DO: Check for characters currently in open door tiles
        for (let d = 0; d < this.doorStates.length; d++) {
            if (Math.floor(this.currentLevel[d]) === 2) {
                if (this.doorOffsets[d] === 0) this.doorStates[d] = -1;
                if (this.doorOffsets[d] === 64) this.doorStates[d] = 1;
            }
        }
    }
}

function mapTileToIndex(tileCol, tileRow) {
    return (tileCol + MAP_NUM_COLS * tileRow);
}

function getTileTypeAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TILE_SIZE;
    var tileRow = pixelY / TILE_SIZE;

    // we'll use Math.floor to round down to the nearest whole number
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    // first check whether the player is within any part of the wall
    if (tileCol < 0 || tileCol >= MAP_NUM_COLS ||
        tileRow < 0 || tileRow >= MAP_NUM_ROWS) {
        return GRID_WALL; // avoid invalid array access, treat out of bounds as wall
    }

    var gridIndex = mapTileToIndex(tileCol, tileRow);
    return grid.currentLevel[gridIndex];
}

function getTileCoordinates(index) {
    let x = (index % MAP_NUM_COLS);
    let y = ((index - x) / MAP_NUM_COLS) * TILE_SIZE;
        x *= TILE_SIZE;

    return {x: x, y: y};
}

function getTileName(type) {
    switch(type) {
        case 1:
            return 'wall';
        case 2:
            return "door";
        default:
            return 'wall';
    }
}