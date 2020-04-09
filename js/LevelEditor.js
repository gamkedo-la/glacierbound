var selectedTile = textureList['wall'][0];
var selectedTileTexValue = 0.01;

class LevelEdit extends State {
    constructor() {
        super();
        this.name = 'Level Edit';
    }

	onEnter() {
        displayLevelData();
        debugModeEnabled = true;
        this.levelEdit = true;
    
        resetMouse();
        mousePos = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }
    }

	run() {
        drawEverything();
        drawTileSelector();
        drawCursor();
    }

	checkConditions() {
        if (!this.levelEdit) {
            return 'Game Started';
        }
    }

	onExit() {
        debugModeEnabled = false;
    }
}

function displayLevelData() {
    let levelData = document.getElementById('EditorExport');
    var outPutString = "";
    for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
            
        for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {
            outPutString += currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)].toPrecision(3) + ", ";
        }

        outPutString += "<br>";
    }

    levelData.innerHTML = outPutString;
}

function drawTileSelector() {
    for (var i = 0; i < textureList['wall'].length; i++) {
        canvasContext.drawImage(textureList['wall'][i], MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        if (selectedTile === textureList['wall'][i]) {
            drawRect(MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR, i * TILE_SIZE, TILE_SIZE, TILE_SIZE, 'yellow');
        }
    }
}

function setSelectedTile() {
    for (var i = 0; i < textureList['wall'].length; i++) {
        if (mousePos.x > MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR &&
            mousePos.x < (MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR) + TILE_SIZE &&
            mousePos.y < (textureList['wall'].length * TILE_SIZE)) {
            selectedTile = textureList['wall'][Math.floor(mousePos.y / TILE_SIZE)];
            selectedTileTexValue = (Math.floor(mousePos.y / TILE_SIZE) + 1) / 100;
        }
    }
}

function toggleLevelEditMode() {
    if (Game.currentState.name === 'Game Started') {
        Game.currentState.levelEdit = true;
    } else {
        Game.currentState.levelEdit = false;
    }
}

function setTileToWall(index, wall_type, wall_tex) {
    if (currentLevel.mapGrid[index] > 0) {
        currentLevel.mapGrid[index] = 0.00;
    } else {
        currentLevel.mapGrid[index] = wall_type + wall_tex;
    }
}