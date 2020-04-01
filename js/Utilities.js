function clamp(num, min, max) {
    let value = num < min ? min : num > max ? max : num;

    return value;
}

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
    return isSolidTile(index);
}

function isSolidTile(index) {
    return (currentLevel.mapGrid[index] > 0 && !(Math.floor(currentLevel.mapGrid[index]) === 2 && currentLevel.doorOffsets[index] === 0));
}

function levelTileIndexAtColRowCoord(tileCol, tileRow) {
    return (tileCol + MAP_NUM_COLS * tileRow);
}

function mapIndexCoords(index) {
    let tileCol = index % MAP_NUM_COLS;
    let tileRow = (index - tileCol) / MAP_NUM_COLS;

    return {x: tileCol * TILE_SIZE, y: tileRow * TILE_SIZE};
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

function circleRectOverlap(cx, cy, radius, rx, ry, rw, rh) {
//Assuming rect origin at upper left
    let testX = cx,
        testY = cy;
    
    if (cx < rx) testX = rx;
    else if (cx > rx + rw) testX = rx + rw;

    if (cy < ry) testY = ry;
    else if (cy > ry + rh) testY = ry + rh;

    let distX = cx - testX,
        distY = cy - testY,
        distance = Math.hypot(distX, distY);

    if (distance < radius) return true;
    return false;
}

function objectMapCollision(x, y, radius) {
    let objectTileX = Math.floor(x / TILE_SIZE);
    let objectTileY = Math.floor(y / TILE_SIZE);
    let index = levelTileIndexAtColRowCoord(objectTileX, objectTileY);

    for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
            let checkIndex = index + (MAP_NUM_COLS * row) + col;
            if (!isSolidTile(checkIndex)) continue;
            let checkX = (objectTileX + col) * TILE_SIZE,
                checkY = (objectTileY + row) * TILE_SIZE;
            if (circleRectOverlap(x, y, radius, checkX, checkY, TILE_SIZE, TILE_SIZE)) return true;
        }
    }

    return false;
}

function pointInRect(px, py, rx, ry, rw, rh) {
    return (px > rx && px < rx + rw && py > ry && py < ry + rh )
}