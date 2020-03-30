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

function toggleLevelEditMode() {
    isInLevelEditMode = !isInLevelEditMode;
    resetMouse();
    mousePos = {x: canvas.width/2, y: canvas.height/2}
}

function setTileToWall(index){
    currentLevel.mapGrid[index] = 1.01;
}