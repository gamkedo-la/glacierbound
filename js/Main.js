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
var testObject;

window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = PROJECTION_PLANE_WIDTH;
    canvasContext.canvas.height = PROJECTION_PLANE_HEIGHT;

    level1 = new Level(MAP_GRIDS[0], true, 10000, 100, 610, 0, 870, 610);
    level2 = new Level(MAP_GRIDS[1], false, 800, 400, 610, 0, 870, 610);
    currentLevel = level1;

    player = new Player();

    loadLevel(level1)
    loadImages();
}

function initRenderLoop() {
    var framesPerSecond = 60;

    testObject = new Character(300, 275, 5, spriteList['enemy1'], 0, 1, 0);
    //testObject.target = player;
    objects.push(testObject);

    let healthPickup = new Item(300, 275, 0, null, -0.5, 0.2, 0);
    healthPickup.setType('health');
    healthPickup.createSprite('green');
    objects.push(healthPickup);

    let armorPickup = new Item(400, 300, 0, null, -0.5, 0.2, 0);
    armorPickup.setType('armor');
    armorPickup.createSprite('skyblue');
    objects.push(armorPickup);

    setInterval(function () {

        moveEverything();
        drawEverything();

    }, 1000 / framesPerSecond);
    initInput();
}

function moveEverything() {
    player.update();
    currentLevel.updateDoors()

    for (let o = 0; o < objects.length; o++) {
        let object = objects[o];
        object.update();
        for (let c = o + 1; c < objects.length; c++) {
            let collision = objects[c];
            let dist = Math.hypot(object.x - collision.x, object.y - collision.y);
            if (dist < object.radius + collision.radius) {
                object.updateCollision(collision);
                collision.updateCollision(object);
            }
        } 
    }
    removeDead();
    objects.sort((a, b) => (a.distance < b.distance) ? 1 : -1);

    checkLevelCompletion();
}

function drawEverything() {

    if (currentLevel.isInterior == true) {
        colorRect(0, 0, canvas.width, canvas.height, 'SlateGrey'); //Ceiling/Sky Color
        colorRect(0, canvas.height / 2, canvas.width, canvas.height, 'DarkGrey'); //Floor Color
    } else {
        colorRect(0, 0, canvas.width, canvas.height, 'White'); //Ceiling/Sky Color
    }

    // clear the game view by filling it with white

    render3DProjection();
    currentLevel.draw();
    player.draw();
    player.drawHands();

    if (currentLevel.isInterior === false) {
        spawnSnow();
    }

    for (let o of objects) {
        o.draw2D();
    }
    drawHUD();
}

function drawHUD() {
    //Background
    canvasContext.fillStyle = '#3F3F74';
    canvasContext.fillRect(canvas.width - 110, 55, 110, 110);
    canvasContext.fillRect(0, canvas.height - 60, 160, 60);
    canvasContext.fillRect(canvas.width - 160, canvas.height - 60, 160, 60);

    //Text
    canvasContext.fillStyle = 'white';
    canvasContext.font = '10px Arial';
    canvasContext.textAlign = 'left';

    canvasContext.fillText("Enemy Health:", canvas.width - 100, 80);
    canvasContext.fillText(testObject.health, canvas.width - 100, 90);

    canvasContext.fillText("Player Position:", canvas.width - 100, 110);
    canvasContext.fillText(Math.floor(player.x) + ", " + Math.floor(player.y), canvas.width - 100, 120);

    canvasContext.fillText("Player Direction:", canvas.width - 100, 140);
    canvasContext.fillText(player.rotationAngle, canvas.width - 100, 150);

    canvasContext.font = '20px Arial';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Health: " + player.health, 75, canvas.height - 20);
    canvasContext.fillText("Armor: " + player.armor, canvas.width - 75, canvas.height - 20);
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
        let alpha = 0;
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

            if (currentLevel.isInterior === false) {
                alpha = ray.distance / currentLevel.visibilityDist;
            }

            if (alpha < 1) canvasContext.drawImage(texture, textureX, 0, 1, texture.height, ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height / 2) - (wallStripHeight / 2), RAY_INCREMENT_WIDTH, wallStripHeight);
        }

        if (alpha > 0 && alpha < 1) {
            canvasContext.globalAlpha = alpha;
            colorRect(ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height / 2) - (wallStripHeight / 2), RAY_INCREMENT_WIDTH, wallStripHeight, 'white');
            canvasContext.globalAlpha = 1;
        }
    }

    for (o; o < objects.length; o++) {
        objects[o].draw();
    }

    canvasContext.globalAlpha = 1.0;
}

function removeDead() {
    for (let d = objects.length - 1; d >= 0; d--) {
        if (objects[d].isDead) objects.splice(d, 1);
    }
}

function checkLevelCompletion() {
    let distToExit = DistanceBetweenTwoGameObjects(player, currentLevel.exit);
    if (distToExit < 50) {
        loadLevel(level2);
    }
}

function spawnSnow() {
    for (var i = 0; i < 2; i++) {
        var offsetAng = player.rotationAngle + (Math.random() * Math.PI/2) - (Math.PI/4);
        var part = new Projectile(player.x + Math.cos(offsetAng) * (64 + Math.random() * 64), //x
            player.y + Math.sin(offsetAng) * (64 + Math.random() * 64), //y
            20, //speed
            spriteList['snow'], //sprite 
            Math.floor(Math.random() * 1.5), //height
            Math.random(), //scale
            0.5, //angle
            true); //variable Height
        
        part.draw2D = function() {return};
        part.radius = 0;
        part.lifeTime = 8;
        objects.push(part);
    }
}