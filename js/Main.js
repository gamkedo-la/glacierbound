const PROJECTION_PLANE_WIDTH = 800;
const PROJECTION_PLANE_HEIGHT = 600;
const FOV_DEGREES = 60;
const FOV_RADS = FOV_DEGREES * (Math.PI / 180);
const RAY_INCREMENT_WIDTH = 1;
const NUM_OF_RAYS = PROJECTION_PLANE_WIDTH / RAY_INCREMENT_WIDTH;
const RAY_ANGLE_INCREMENT = FOV_RADS / NUM_OF_RAYS;

const MINIMAP_SCALE_FACTOR = 0.2;

var canvas;
var canvasContext;

var player;
var grid;
var currentLevel;
var level1;
var level2;
var objects = [];
var character;

var interior = true;
var visibilityDist = 300;

window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = PROJECTION_PLANE_WIDTH;
    canvasContext.canvas.height = PROJECTION_PLANE_HEIGHT;

    level1 = new Level(MAP_GRIDS[0]);
    level2 = new Level(MAP_GRIDS[1]);
    currentLevel = level1;

    player = new Player();
    character = new Character();
    let testObject = new Character(300, 275, 5, null, -0.25, 0.5, 0);
    testObject.target = player;
    testObject.createSprite('orangered');
    objects.push(testObject);
    pickup1 = new Item(300, 275, 0, null, -0.5, 0.2, 0);
    pickup1.createSprite('green');
    objects.push(pickup1);

    loadImages();
}

function initRenderLoop() {
    var framesPerSecond = 60;

    setInterval(function () {

        moveEverything();
        drawEverything();

    }, 1000 / framesPerSecond);
    initInput();
}

function moveEverything() {
    player.update();
    currentLevel.updateDoors()

    for (let o of objects) {
        o.update();
    }
    removeDead();
    objects.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
}

function drawEverything() {

    if (interior == true){
        colorRect(0, 0, canvas.width, canvas.height, 'SlateGrey'); //Ceiling/Sky Color
        colorRect(0, canvas.height / 2, canvas.width, canvas.height, 'DarkGrey'); //Floor Color
    } else {
        colorRect(0, 0, canvas.width, canvas.height, 'Azure'); //Ceiling/Sky Color
    }

    // clear the game view by filling it with white

    render3DProjection();
    currentLevel.draw();
    player.draw();
    player.drawHands();
    pickup1.draw2D();

    for (let o of objects) {
        o.draw2D();
    }

    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Player Health:", canvas.width-100, 50);
    canvasContext.fillText(player.health, canvas.width-100, 60);

    canvasContext.fillText("Enemy Health:", canvas.width-100, 80);
    canvasContext.fillText(character.health, canvas.width-100, 90);

}

function render3DProjection() {
    let o = 0;
    for (var i = 0; i < NUM_OF_RAYS; i++) {
        var ray = player.rays[i];

        for (o; o < objects.length; o++) {
            if (objects[o].distance > ray.distance) objects[o].draw();
            else break;
        }

        //Account for fish-eye effect when storing the distance to the wall
        var correctedWallDistance = ray.distance * Math.cos(ray.angle - player.rotationAngle);

        //calculate distance to the projection plane
        var distanceProjectionPlane = (canvas.width / 2) / Math.tan(FOV_RADS / 2);

        //calculate the height of the wall strip on the projection plane
        var wallStripHeight = (TILE_SIZE / correctedWallDistance) * distanceProjectionPlane;

        let tileIndex = mapTileToIndex(Math.floor(ray.wallHitX / TILE_SIZE), Math.floor(ray.wallHitY / TILE_SIZE))
        let tileValue = currentLevel.mapGrid[tileIndex];
        if (tileValue > 0) {
            let type = Math.floor(tileValue);
            let textureIndex = Math.ceil((tileValue * 100)) - (type * 100);
            let name = getTileName(type);
            let texture = textureList[name][textureIndex - 1];

            let wallX = 0;
            if (ray.wasHitVertical) wallX = ray.wallHitY;
            else wallX = ray.wallHitX;
            if (type === GRID_DOOR) wallX -= currentLevel.doorOffsets[tileIndex];
            wallX /= TILE_SIZE
            wallX -= Math.floor(wallX);
            wallX = 1 - wallX;

            let textureX = Math.floor(texture.width * wallX);

            if (interior === false) {
                let alpha = 1 - (ray.distance / visibilityDist);
                if (alpha < 0) {
                    alpha = 0;
                }
                canvasContext.globalAlpha = alpha;
            }

            canvasContext.drawImage(texture, textureX, 0, 1, texture.height, ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height / 2) - (wallStripHeight / 2), RAY_INCREMENT_WIDTH, wallStripHeight);
        }

        //colorRect(ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height / 2) - (wallStripHeight / 2), RAY_INCREMENT_WIDTH, wallStripHeight, rgb(100, 100, (255 - Math.min(0.5 * correctedWallDistance, 255))));

    }

    for (o; o < objects.length; o++) {

        if (interior === false) {
            let alpha = 1 - (objects[o].distance / visibilityDist);
            if (alpha < 0) {
                alpha = 0;
            }
            canvasContext.globalAlpha = alpha;
        }

        objects[o].draw();

    }

    canvasContext.globalAlpha = 1.0;
}

function removeDead() {
    for (let d = objects.length - 1; d >= 0; d--) {
        if (objects[d].isDead) objects.splice(d, 1);
    }
}