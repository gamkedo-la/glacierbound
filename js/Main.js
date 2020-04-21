const PROJECTION_PLANE_WIDTH = 800;
const PROJECTION_PLANE_HEIGHT = 600;
const FOV_DEGREES = 60;
const FOV_RADS = FOV_DEGREES * (Math.PI / 180);
const PROJECTION_PLAIN_DISTANCE = (PROJECTION_PLANE_WIDTH / 2) / Math.tan(FOV_RADS / 2);
const RAY_INCREMENT_WIDTH = 1;
const NUM_OF_RAYS = PROJECTION_PLANE_WIDTH / RAY_INCREMENT_WIDTH;
const RAY_ANGLE_INCREMENT = FOV_RADS / NUM_OF_RAYS;

const MINIMAP_SCALE_FACTOR = 0.25;

var canvas;
var canvasContext;
var Game;

var player;
var currentLevel;
var level1;
var level2;
var objects = [];
var testObject;
var testObject2;

var timeToOverlay = 0; //overlay cooldown
var redOverlay = false; //flag to flash im hit overlay

function showOverlay(){
	//console.log('logging from func showOverlay');
	if (timeToOverlay > 12){
		timeToOverlay = 0;
		return;
	}
	timeToOverlay++;
	colorRect(0,0, canvas.width, canvas.height, 'red');
	redOverlay = false;
}
 
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = PROJECTION_PLANE_WIDTH;
    canvasContext.canvas.height = PROJECTION_PLANE_HEIGHT;

    player = new Player();
    Game = new FiniteStateMachine({'Title Screen': new TitleScreen(), 'Level Transition': new LevelTransition, 'Game Started': new GameStarted(), 'Level Edit': new LevelEdit(), 'Game Over': new GameOver()}, 'Title Screen');
    loadImages();
}

class GameStarted extends State {
    constructor() {
        super();
        this.name = 'Game Started';
    }

    onEnter() {
        return;
    }

    run() {
        moveEverything();
        drawEverything();
    }

    checkConditions() {
        if (player.health <= 0) {
            return 'Game Over';
        }

        if (currentLevel.checkLevelCompletion()) {
            return 'Level Transition';
        }

        if (this.levelEdit) {
            return 'Level Edit';
        }
    }

    onExit() {
        this.levelEdit = false;
    }
}

class GameOver extends State {
    constructor() {
        super();
        this.name = 'Game Over';
        this.timer = 0;
    }

    onEnter() {
        this.timer = 0;
    }

    run() {
        let alpha = 1;
        if (this.timer < 100) {
            drawEverything();
            alpha = this.timer/100;
            canvasContext.globalAlpha = smoothStart(alpha, 3);
            this.timer++;
        }
        canvasContext.fillStyle = lerpRGB('rgb(255,0,0)', 'rgb(255, 255, 255)', smoothStart(alpha, 3));
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.globalAlpha = 1;

        canvasContext.fillStyle = lerpRGB('rgb(255, 0, 0)', 'rgb(63,63,139)', smoothStart(alpha, 3));
        canvasContext.font = '100px Arial';
        canvasContext.testAlign = 'center';
        canvasContext.fillText('YOU DIED', canvas.width/2, canvas.height/2);
    }

    checkConditions() {
        if (mouseHeld[0]) {
            return 'Title Screen';
        }
    }

    onExit() {
        resetMouse();
        objects.length = 0;
    }
}

function initRenderLoop() {
    var framesPerSecond = 60;
    initInput();

    Game.start()
    setInterval(function () {
        Game.update();                     
    }, 1000 / framesPerSecond);
}

function initTestObjects() {
    objects.length = 0;
    testObject = new Character(300, 275, spriteList['enemy1'], 0, 1, 0);
    objects.push(testObject);
	
	testObject2 = new Character(500, 100, spriteList['enemy2'], 0, 1, 0);
    objects.push(testObject2);

    let healthPickup = new Item(300, 275, -0.5, 0.2, 0, 'health');
    objects.push(healthPickup);

    let armorPickup = new Item(400, 300, -0.5, 0.2, 0, 'armor');
    objects.push(armorPickup);

    let greenkey = new Item(500, 500, -0.5, 0.2, 0, 'green key');
    objects.push(greenkey)
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
    currentLevel.updateWeather();

    objects.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
}

function drawEverything() {
    currentLevel.drawBackground();
    render3DProjection();
    player.draw();
    currentLevel.draw();
    player.drawHands();

    for (let o of objects) {
        o.draw2D();
    }

    drawHUD();
	
	if(redOverlay){
		showOverlay();
	}
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

        //calculate the height of the wall strip on the projection plane
        var wallStripHeight = (TILE_SIZE / correctedWallDistance) * PROJECTION_PLAIN_DISTANCE;

        let tileIndex = mapTileToIndex(Math.floor(ray.wallHitX / TILE_SIZE), Math.floor(ray.wallHitY / TILE_SIZE))
        let tileValue = currentLevel.mapGrid[tileIndex];
        let alpha = 1;
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

            if (currentLevel.visibilityDist >= ray.distance) {
                alpha = ray.distance / currentLevel.visibilityDist;
            }

            if (alpha < 1) canvasContext.drawImage(texture, textureX, 0, 1, texture.height, ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height / 2) - (wallStripHeight / 2), RAY_INCREMENT_WIDTH, wallStripHeight);
        }

        if (alpha > 0 && alpha < 1) {
            canvasContext.globalAlpha = alpha;
            colorRect(ray.columnID * RAY_INCREMENT_WIDTH, (canvas.height / 2) - (wallStripHeight / 2), RAY_INCREMENT_WIDTH, wallStripHeight, currentLevel.colors.sky);
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