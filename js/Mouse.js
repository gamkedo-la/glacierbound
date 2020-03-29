const MOUSE_SENS = 0.05;

let mouseDelta = {
    x: 0,
    y: 0
};
let mouseEnabled = true;

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
        mousePos = null;
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
    clickMouse(true);
}

function mouseUp(evt) {
    clickMouse(false);
}

function clickMouse(state) {
    player.keyHeld_Fire = state;
    if (!gameStarted && startHighlighted){
        mouseDelta = {x: 0, y: 0};
        gameStarted = true;
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