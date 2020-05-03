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
var gamePaused = false;
var gameRunning;


window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.canvas.width = PROJECTION_PLANE_WIDTH;
    canvasContext.canvas.height = PROJECTION_PLANE_HEIGHT;

    player = new Player();
    Game = new FiniteStateMachine({ 'Title Screen': new TitleScreen(),
                                    'Introduction': new StoryIntroduction(),
                                    'Level Transition': new LevelTransition(),
                                    'Game Started': new GameStarted(),
                                    'Level Edit': new LevelEdit(),
                                    'Game Over': new GameOver(),
                                    'Conclusion': new StoryConclusion()
                                }, 'Title Screen');
    loadImages();
}

class GameStarted extends State {
    constructor() {
        super();
        this.name = 'Game Started';
    }

    onEnter() {
        console.log("GameStarted state enter");
        playBGM(currentLevel.musicTrack);
        if(currentLevel.ambientTrack){
            currentLevel.ambientTrack.setVolume(0.1); // TODO: have a way to change the volume of ambiant, sounds, and general audio
            currentLevel.ambientTrack.play(true);
        }
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
        console.log("GameStarted state exit");
        this.levelEdit = false;
        stopBGM();
        if(currentLevel.ambientTrack)
            currentLevel.ambientTrack.stop();
    }
}

class GameOver extends State {
    constructor() {
        super();
        this.name = 'Game Over';
        this.timer = 0;
        this.music = new BackgroundMusicClass("klaim-gameover");
    }

    onEnter() {
        this.timer = 0;
        playBGM(this.music, false); // no looping
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

        let graphic = spriteList['gameover'],
            drawRatio = graphic.width >= canvas.width ? canvas.width/graphic.width : graphic.width/canvas.width,
            drawWidth = graphic.width * drawRatio, drawHeight = graphic.height * drawRatio,
            drawY = (canvas.height - drawHeight) / 2;

        canvasContext.drawImage(graphic, 0, 0, graphic.width, graphic.height, 0, drawY, drawWidth, drawHeight);

        canvasContext.fillStyle = lerpRGB('rgb(255, 0, 0)', 'rgb(63,63,139)', smoothStart(alpha, 3));
        canvasContext.font = '40px Arial';
        canvasContext.testAlign = 'center';
        canvasContext.fillText('Click to Restart', canvas.width/2, canvas.height-60);

        canvasContext.globalAlpha = 1;
    }

    checkConditions() {
        if (this.timer >= 100 && mouseClicked(0)) {
            return 'Title Screen';
        }
    }

    onExit() {
        resetMouse();
        stopBGM();
    }
}

function initRenderLoop() {
    var framesPerSecond = 60;
    initInput();

    Game.start()
    gameRunning = setInterval(function () {
        pollInput();
        Game.update();
    }, 1000 / framesPerSecond);
}

function pauseGame() {
  var framesPerSecond = 60;
    if (!gamePaused && Game.currentState.name == 'Game Started') {
    gameRunning = clearInterval(gameRunning);
    player.pauseBoost2TimerPause();
    gamePaused = true;
    pauseScreen();
  } else if (gamePaused) {
    gameRunning = setInterval(function () {
        pollInput();
        Game.update();
    }, 1000 / framesPerSecond);
    player.pauseBoost2Timer();
    gamePaused = false;
  }
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
    currentLevel.draw();
    player.draw();
    player.drawHands();

    for (let o of objects) {
        o.draw2D();
    }

    drawHUD();
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

function pauseScreen(){
        canvasContext.globalAlpha = 0.5;
        canvasContext.fillStyle = '#23233F';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.globalAlpha = 1;
        canvasContext.textAlign = 'center';
        canvasContext.fillStyle = 'dodgerblue';
        canvasContext.font = '50px Arial';
        canvasContext.fillText("GAME PAUSED", canvas.width / 2, canvas.height/2);
}