function getPixelCoordFromAngleAndSpeed(startingX, startingY, angle, speed) {
    var newX = startingX + Math.cos(angle) * speed;
    var newY = startingY + Math.sin(angle) * speed;
    return [newX, newY];
}

function isWallTileAtPixelCoord(pixelX, pixelY) {

    var levelTileCol = colAtXCoord(pixelX);
    var levelTileRow = rowAtYCoord(pixelY);

    if (levelTileCol < 0 || levelTileCol >= MAP_NUM_COLS || levelTileRow < 0 || levelTileRow >= MAP_NUM_ROWS) {
        return false;
    }

    return isWallTileAtLevelTileCoord(levelTileCol, levelTileRow);
}

function colAtXCoord(pixelX) {
    return Math.floor(pixelX / TILE_SIZE);
}

function rowAtYCoord(pixelY) {
    return Math.floor(pixelY / TILE_SIZE);
}

function isWallTileAtLevelTileCoord(levelTileCol, levelTileRow) {
    var levelTileIndex = levelTileIndexAtColRowCoord(levelTileCol, levelTileRow);
    return (grid.grid[levelTileIndex] > 0);
}

function levelTileIndexAtColRowCoord(tileCol, tileRow) {
    return (tileCol + MAP_NUM_COLS * tileRow);
}

function normalizeAngle(angle){
    angle = angle % (2 * Math.PI);
    if (angle < 0){
        angle += (2 * Math.PI);
    }
    return angle;
}

function DistanceBetweenTwoPixelCoords(x1, y1, x2, y2) {
    distance = Math.floor(Math.hypot(Math.floor(x1) - Math.floor(x2), Math.floor(y1) - Math.floor(y2)))
    return distance;
}