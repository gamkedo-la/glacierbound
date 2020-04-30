const MOUSE_SENS = 0.05;

let mouseEnabled = false;
let mouseDelta = {
    x: 0,
    y: 0
};

let mouseButtonStates = [-1, -1, -1];

var mousePos = null;

function initMouse() {
    canvas.onclick = function () {
        canvas.requestPointerLock();
    }
    document.addEventListener('pointerlockchange', lockChange, false);
}

function lockChange() {
    if (document.pointerLockElement === canvas) {
        mouseEnabled = true;
        document.addEventListener("mousemove", moveMouse, false);
        document.addEventListener("mousedown", mouseDown, false);
        document.addEventListener("mouseup", mouseUp, false);
    } else {
        mouseEnabled = false;
        resetMouse();
        document.removeEventListener("mousemove", moveMouse, false);
        document.removeEventListener("mousedown", mouseDown, false);
        document.removeEventListener("mouseup", mouseUp, false);
    }
}

function moveMouse(evt) {
    mouseDelta.x += evt.movementX;
    mouseDelta.y += evt.movementY;

    if (mousePos != null) moveCursor(evt.movementX, evt.movementY);
    else mousePos = calculateMousePos(evt);
}

function moveCursor(x, y) {
    mousePos.x += x;
    mousePos.x = clamp(mousePos.x, 0, canvas.width);
    mousePos.y += y;
    mousePos.y = clamp(mousePos.y, 0, canvas.height);
}

function drawCursor() {
    if (mouseEnabled && mousePos != null) canvasContext.drawImage(spriteList['cursor'], mousePos.x, mousePos.y);
}

function mouseDown(evt) {
    if (mouseButtonStates[evt.button] < 1) mouseButtonStates[evt.button] = 1;
}

function mouseUp(evt) {
    if (Game.currentState.name === 'Level Edit') {
        if (mousePos.x < MAP_NUM_COLS * TILE_SIZE * MINIMAP_SCALE_FACTOR &&
            mousePos.y < MAP_NUM_ROWS * TILE_SIZE * MINIMAP_SCALE_FACTOR) {
                var index = mapTileToIndex(colAtXCoord(mousePos.x / MINIMAP_SCALE_FACTOR), rowAtYCoord(mousePos.y / MINIMAP_SCALE_FACTOR));
                setTileToWall(index, selectedTileType, selectedTileTexValue);
        }
        setSelectedTile();
        displayLevelData();
    }

    if (mouseButtonStates[evt.button] > -1) mouseButtonStates[evt.button] = -1;
}

function pollMouseButtons() {
    for (let m = 0; m < mouseButtonStates.length; m++) {
        if (mouseButtonStates[m] > 0 && mouseButtonStates[m] <= 10) mouseButtonStates[m]++; 
        if (mouseButtonStates[m] < 0 && mouseButtonStates[m] >= -10) mouseButtonStates[m]--;
    }
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(),
        root = document.documentElement;
    //	account	for	the	margins,	canvas	position	on	page,	scroll	amount,	etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function resetMouse() {
    mouseDelta = {
        x: 0,
        y: 0
    };
    mousePos = null;
    mouseButtonStates.fill(-1);
}

function mouseClicked(button) {
    return (mouseButtonStates[button] > 0 && mouseButtonStates[button] < 3);
}

function mouseReleased(button) {
    return (mouseButtonStates[button] < 0 && mouseButtonStates[button] > -3);
}

function mouseHeld(button) {
    return mouseButtonStates[button] > 0;
}