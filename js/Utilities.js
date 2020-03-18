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
    var index = levelTileIndexAtColRowCoord(levelTileCol, levelTileRow);
    return (currentLevel.mapGrid[index] > 0 && !(Math.floor(currentLevel.mapGrid[index]) === 2 && currentLevel.doorOffsets[index] === 0));
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
    return Math.hypot(x1 -x2, y1 - y2);
}

function DistanceBetweenTwoGameObjects(gameObject1, gameObject2) {
    return Math.hypot(gameObject1.x - gameObject2.x, gameObject1.y - gameObject2.y);;
}

function circlesOverlap(x1, y1, r1, x2, y2, r2) {
    let deltaX = x1 - x2;
    let deltaY = y1 - y2;
    let dist = Math.hypot(deltaX, deltaY);

    return dist > r1 + r2;
}