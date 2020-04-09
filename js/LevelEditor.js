var isInLevelEditMode = false;
var selectedTile = textureList['wall'][0];
var selectedTileTexValue = 0.01;

function displayLevelData() {

    var outPutString = "";

    if (isInLevelEditMode === true) {
        for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {

            for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
                outPutString += currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)] + ", ";
            }

            outPutString += "<br>";

        }
    }

    levelData.innerHTML = outPutString;
}

function drawTileSelector() {
    for (var i = 0; i < textureList['wall'].length; i++) {
        canvasContext.drawImage(textureList['wall'][i], MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        if (selectedTile === textureList['wall'][i]){
            drawRect(MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR, i * TILE_SIZE, TILE_SIZE, TILE_SIZE, 'yellow');
        }
    }
}

function setSelectedTile(){
    for (var i = 0; i < textureList['wall'].length; i++) {
        if (mousePos.x > MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR &&
            mousePos.x < (MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR) + TILE_SIZE &&
            mousePos.y < (textureList['wall'].length * TILE_SIZE)){
                selectedTile = textureList['wall'][Math.floor(mousePos.y / TILE_SIZE)];
                selectedTileTexValue = (Math.floor(mousePos.y / TILE_SIZE) + 1) / 100;
        }
    }
}

function toggleLevelEditMode() {
    isInLevelEditMode = !isInLevelEditMode;

    if (isInLevelEditMode) {
        debugModeEnabled = true;
    } else {
        debugModeEnabled = false;
    }

    resetMouse();
    mousePos = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }
}

function setTileToWall(index, wall_type, wall_tex) {

    if (currentLevel.mapGrid[index] > 0) {
        currentLevel.mapGrid[index] = 0.00;
    } else {
        currentLevel.mapGrid[index] = wall_type + wall_tex;
    }

}