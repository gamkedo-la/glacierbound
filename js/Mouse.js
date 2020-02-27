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
    } else {
        mouseEnabled = false;
        document.removeEventListener("mousemove", moveMouse, false);
    }
}

function moveMouse(evt) {
    mouseDelta.x += evt.movementX;
    mouseDelta.y += evt.movementY;

    //player.rotationAngle += mouseDelta.x * (Math.PI/180) * MOUSE_SENS;
}