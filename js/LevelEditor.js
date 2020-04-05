var isInLevelEditMode = false;

function displayLevelData() {

    var outPutString = "";

    if (isInLevelEditMode === true){
        for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {

            for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
                outPutString += currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)] + ", ";
            }
    
            outPutString += "<br>";
    
        }
    }
    
    levelData.innerHTML = outPutString;
}

function drawTileSelector(){
    canvasContext.drawImage(textureList['wall'][0], 0 + 160, canvas.height - 64, 64, 64);
    canvasContext.drawImage(textureList['wall'][1], 64 + 160, canvas.height - 64, 64, 64);
}

function toggleLevelEditMode() {
    isInLevelEditMode = !isInLevelEditMode;
    resetMouse();
    mousePos = {x: canvas.width/2, y: canvas.height/2}
}

function setTileToWall(index, wall_type, wall_tex){
    if (currentLevel.mapGrid[index] > 0){
        currentLevel.mapGrid[index] = 0.00;
    } else {
        currentLevel.mapGrid[index] = wall_type + wall_tex;
    }
    
}