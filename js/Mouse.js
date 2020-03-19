const MOUSE_SENS = 0.05;

let mouseDelta = {x: 0, y: 0};
let mouseEnabled = false;

function initMouse() {
    canvas.onclick = function() {canvas.requestPointerLock();}
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
        document.removeEventListener("mousemove", moveMouse, false);
        document.removeEventListener("mousedown", mouseDown, false);
        document.removeEventListener("mouseup", mouseUp, false);
    }
}

function moveMouse(evt) {
    mouseDelta.x += evt.movementX;
    mouseDelta.y += evt.movementY;
}

function mouseDown(evt) {
    clickMouse(true);
}

function mouseUp(evt) {
    clickMouse(false);
}

function clickMouse(state) {
    player.keyHeld_Fire = state;
}