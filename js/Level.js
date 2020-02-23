const TILE_SIZE = 64;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const GRID_FLOOR = 0;
const GRID_WALL = 1;

class Map {
    constructor() {
        this.grid = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
            1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ];
    }

    draw() {
        for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {

                if (grid.grid[mapTileToIndex(eachCol, eachRow)]) {
                    colorRect(MINIMAP_SCALE_FACTOR * eachCol * TILE_SIZE, MINIMAP_SCALE_FACTOR * eachRow * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, 'black');
                }

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
    if (tileCol < 0 || tileCol >= TRACK_COLS ||
        tileRow < 0 || tileRow >= TRACK_ROWS) {
        return GRID_WALL; // avoid invalid array access, treat out of bounds as wall
    }

    var gridIndex = trackTileToIndex(tileCol, tileRow);
    return grid.grid[gridIndex];
}