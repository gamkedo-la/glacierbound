const PROJECTION_PLANE_WIDTH = 800;
const PROJECTION_PLANE_HEIGHT = 600;
const FOV_DEGREES = 60;
const FOV_RADS = FOV_DEGREES * (Math.PI /180);
const RAY_INCREMENT_WIDTH = 1;
const NUM_OF_RAYS = PROJECTION_PLANE_WIDTH / RAY_INCREMENT_WIDTH;
const RAY_ANGLE_INCREMENT = FOV_RADS / NUM_OF_RAYS;

const MINIMAP_SCALE_FACTOR = 0.2;

var canvas;
var canvasContext;

var player;
var grid;
var testObject;

window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = PROJECTION_PLANE_WIDTH;
    canvasContext.canvas.height = PROJECTION_PLANE_HEIGHT;

    grid = new Map();
    player = new Player();
    testObject = new GameObject(300, 275, mapWallTex, -0.5, 0.5);

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
    testObject.update();
}

function drawEverything() {

    // clear the game view by filling it with white
    colorRect(0, 0, canvas.width, canvas.height, 'SlateGrey'); //Ceiling/Sky Color
    colorRect(0, canvas.height /2, canvas.width, canvas.height, 'DarkGrey'); //Floor Color

    render3DProjection();
    //testObject.draw();
    grid.draw();
    player.draw();
    player.drawHands();
}

function render3DProjection(){
    for (var i = 0; i < NUM_OF_RAYS; i++){
        var ray = player.rays[i];

        //Account for fish-eye effect when storing the distance to the wall
        var correctedWallDistance = ray.distance * Math.cos(ray.angle - player.rotationAngle);

        //calculate distance to the projection plane
        var distanceProjectionPlane = (canvas.width / 2) / Math.tan(FOV_RADS / 2);

        //calculate the height of the wall strip on the projection plane
        var wallStripHeight = (TILE_SIZE / correctedWallDistance ) * distanceProjectionPlane;
        
        if (getTileTypeAtPixelCoord(ray.wallHitX, ray.wallHitY) > 1) {
            let wallX = 0;
            if (ray.wasHitVertical) wallX = ray.wallHitY / TILE_SIZE;
            else  wallX = ray.wallHitX / TILE_SIZE;
            wallX -= Math.floor(wallX);
            wallX = 1 - wallX;
    
            let textureX = Math.floor(mapWallTex.width * wallX);
            canvasContext.drawImage(mapWallTex, textureX, 0, 1, mapWallTex.height, ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height /2) - (wallStripHeight /2), RAY_INCREMENT_WIDTH, wallStripHeight);
        } else {
            colorRect(ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height /2) - (wallStripHeight /2), RAY_INCREMENT_WIDTH, wallStripHeight, rgb(100,100, (255 - Math.min( 0.5 * correctedWallDistance, 255)))) ;
        }

        if (testObject.distance >= ray.distance){
            testObject.draw();
        }
    }
    testObject.draw();
}