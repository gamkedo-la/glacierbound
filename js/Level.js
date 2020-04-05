const TILE_SIZE = 64;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const GRID_FLOOR = 0;
const GRID_WALL = 1;
const GRID_DOOR = 2;

const WALL_TEX_GREY = 0.01;
const WALL_TEX_BLUE = 0.02;

const MAP_GRIDS = [];

MAP_GRIDS[0] = [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 0.00, 0.00, 1.02, 2.01, 1.01, 1.01, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 1.01, 1.01, 1.01, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.02,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.02, 1.01,
];

MAP_GRIDS[1] = [
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 0.00, 1.03, 1.03,
    1.03, 0.00, 0.00, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
]

MAP_GRIDS[2] = [
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
]

class Level {
    constructor(map_grid, is_Interior, visibility, startX, startY, startAng, exitX, exitY) {

        this.mapGrid = map_grid;
        this.isInterior = is_Interior;
        this.visibilityDist = visibility;

        this.start = new GameObject(startX, startY, 0, null, -0.5, 1, startAng);
        this.exit = new GameObject(exitX, exitY, 0, null, -0.5, 1, 0)

        this.doorStates = [];
        this.doorStates.length = this.mapGrid.length;
        this.doorStates.fill(0);

        this.doorOffsets = this.doorStates.slice();
        this.doorOffsets.fill(64);
    }

    draw() {
        for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {

                //let tileIndex = mapTileToIndex(Math.floor(ray.wallHitX / TILE_SIZE), Math.floor(ray.wallHitY / TILE_SIZE))
                //let tileValue = currentLevel.mapGrid[tileIndex];

                if (currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)]) {
                    //colorRect(MINIMAP_SCALE_FACTOR * eachCol * TILE_SIZE, MINIMAP_SCALE_FACTOR * eachRow * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, 'black');

                    let type = Math.floor(currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)]);
                    let textureIndex = Math.ceil((currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)] * 100)) - (type * 100);
                    let name = getTileName(type);
                    let texture = textureList[name][textureIndex - 1];

                    canvasContext.drawImage(texture, MINIMAP_SCALE_FACTOR * eachCol * TILE_SIZE, MINIMAP_SCALE_FACTOR * eachRow * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE);
                }

            }
        }
    }

    updateDoors() {
        for (let d = 0; d < this.doorStates.length; d++) {
            if (Math.floor(this.mapGrid[d]) != 2) continue;
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

    toggleDoor(index) {
        let doorPosition = mapIndexCoords(index);
        if (circleRectOverlap(player.x, player.y, player.radius, doorPosition.x, doorPosition.y, TILE_SIZE, TILE_SIZE)) return;
        for (let o of objects) {
            if (circleRectOverlap(o.x, o.y, o.radius, doorPosition.x, doorPosition.y, TILE_SIZE, TILE_SIZE)) return;
        }

        if (this.doorStates[index] === 0) {
            if (this.doorOffsets[index] === 0) this.doorStates[index] = -1;
            else if (this.doorOffsets[index] === 64) this.doorStates[index] = 1;
        } else {
            this.doorStates[index] *= -1;
        }
    }

    toggleDoors() {
        for (let d = 0; d < this.doorStates.length; d++) {
            if (Math.floor(this.mapGrid[d]) === 2) {
                this.toggleDoor(d);
            }
        }
    }
}

function generateMap() {
    for (var i = 0; i < (MAP_NUM_COLS * MAP_NUM_ROWS); i++) {

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
    return currentLevel.mapGrid[gridIndex];
}

function getTileCoordinates(index) {
    let x = (index % MAP_NUM_COLS);
    let y = ((index - x) / MAP_NUM_COLS) * TILE_SIZE;
    x *= TILE_SIZE;

    return {
        x: x,
        y: y
    };
}

function getTileName(type) {
    switch (type) {
        case 1:
            return 'wall';
        case 2:
            return "door";
        default:
            return 'wall';
    }
}

function loadLevel(level) {
    currentLevel = level;
    player.x = currentLevel.start.x;
    player.y = currentLevel.start.y;
    player.rotationAngle = currentLevel.start.direction;
}