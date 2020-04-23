var debugModeEnabled = false;
var timeToOverlay = 0; //overlay cooldown
var redOverlay = false; //flag to flash im hit overlay

var messageConsole = {
    color: 'white',
    message: null,
    _messageLifetime: 240,
    displayTimer: 0,
    draw: function() {
        if (this.displayTimer <= 0) return;
        let halfTime = this._messageLifetime/2;
        let weight = halfTime - this.displayTimer;
        let alpha = 0;
        if (weight <= 0) alpha = 1 - smoothStart(Math.abs(weight/halfTime), 12);
        else alpha = 1 - smoothStop(weight/halfTime, 12);
        
        canvasContext.font = '30px Arial';
        let textSize = canvasContext.measureText(this.message);

        canvasContext.globalAlpha = alpha/1.5;
        canvasContext.fillStyle = '#23233F';
        canvasContext.fillRect(canvas.width/2 - textSize.width/2 - 6, canvas.height - 45, textSize.width + 12, 45);


        canvasContext.globalAlpha = alpha;
        canvasContext.fillStyle = this.color;
        canvasContext.fillText(this.message, canvas.width/2, canvas.height - 15);

        canvasContext.globalAlpha = 1;
        this.update();
    },

    push: function(newMessage, color) {
        this.color = color ? color : 'white';
        this.message = newMessage;
        this.displayTimer = this._messageLifetime;
    },

    reset: function() {
        this.message = null;
        this.displayTimer = 0;
    },

    update: function() {
        if (this.displayTimer > 0) this.displayTimer--;
    }
}

function drawHUD() {
    if(redOverlay){
		showOverlay();
	}
    drawPlayerHealth();
    drawPlayerArmor();
    drawPlayerKeys();
    messageConsole.draw();

    if (debugModeEnabled === true) {
        drawDebugStats();
    }
}

function drawDebugStats() {
    //Background
    canvasContext.fillStyle = '#3F3F74';
    canvasContext.fillRect(canvas.width - 110, 55, 110, 200);

    canvasContext.fillStyle = 'white';
    canvasContext.font = '10px Arial';
    canvasContext.textAlign = 'left';

    canvasContext.fillText("Player Position:", canvas.width - 100, 110);
    canvasContext.fillText(Math.floor(player.x) + ", " + Math.floor(player.y), canvas.width - 100, 120);

    canvasContext.fillText("Player Direction:", canvas.width - 100, 140);
    canvasContext.fillText(player.rotationAngle, canvas.width - 100, 150);

    canvasContext.fillText("Level Editor Enabled:", canvas.width - 100, 170);
    canvasContext.fillText(Game.currentState.name === 'Level Edit', canvas.width - 100, 180);

    canvasContext.fillText("Mouse Position:", canvas.width - 100, 200);
    canvasContext.fillText("Scaled Mouse Pos:", canvas.width - 100, 220);
    canvasContext.fillText("Wall Tile Type:", canvas.width - 100, 240);

    if (mousePos != null) {
        canvasContext.fillText(mousePos.x + ", " + mousePos.y, canvas.width - 100, 210);
        canvasContext.fillText(mousePos.x / MINIMAP_SCALE_FACTOR + ", " + mousePos.y / MINIMAP_SCALE_FACTOR, canvas.width - 100, 230);
        canvasContext.fillText(getTileTypeAtPixelCoord(mousePos.x / MINIMAP_SCALE_FACTOR, mousePos.y / MINIMAP_SCALE_FACTOR), canvas.width - 100, 250);
    }
}

function drawPlayerArmor() {
    //armorbar
    canvasContext.drawImage(spriteList['armorbar'], 10, canvas.height - 55);

    //armor fill
    var armorPercent = player.armor / player.maxArmor;
    colorRect(10 + 45, canvas.height - 55 + 15, armorPercent * 145, 20, 'deepskyblue');

    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';


    if (player.armor == 0) {
        canvasContext.fillText(0, 130, canvas.height - 25);
    } else {
        canvasContext.fillText(player.armor + "/" + player.maxArmor, 130, canvas.height - 25);
    }

    //armor pickup
    canvasContext.drawImage(spriteList['armorpickup_ui'], 205, canvas.height - 55);
    canvasContext.fillStyle = 'deepskyblue';
    canvasContext.font = '20px Arial';
    canvasContext.fillText("5", 227, canvas.height - 20);        
}

function drawPlayerHealth() {
    //healthbar
    canvasContext.drawImage(spriteList['healthbar'], 10, canvas.height - 100);

    //health fill
    var healthPercent = player.health / player.maxHealth;
    var healthState;
    if (healthPercent < 0.3) {
        healthState = 'red';
    } else if (healthPercent < 0.6) {
        healthState = 'orange';
    } else {
        healthState = 'green';
    }
    colorRect(10 + 45, canvas.height - 100 + 15, healthPercent * 145, 20, healthState);

    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText(player.health + "/" + player.maxHealth, 130, canvas.height - 70);

    //health pickup
    canvasContext.drawImage(spriteList['healthpickup_ui'], 205, canvas.height - 100);
    canvasContext.fillStyle = 'crimson';
    canvasContext.font = '20px Arial';
    canvasContext.fillText("10", 227, canvas.height - 65);    
}

function drawPlayerKeys() {
    let keyAnchorX = canvas.width - 192 - 16;
    if (player.keys[0]) canvasContext.drawImage(spriteList['blueKey'], 0, 0, 64, 64, keyAnchorX, canvas.height-80, 64, 64);
    if (player.keys[1]) canvasContext.drawImage(spriteList['redKey'], 0, 0, 64, 64, keyAnchorX + 64, canvas.height-80, 64, 64);
    if (player.keys[2]) canvasContext.drawImage(spriteList['greenKey'], 0, 0, 64, 64, keyAnchorX + 128, canvas.height-80, 64, 64);
}

function toggleDebugMode(){
    debugModeEnabled = !debugModeEnabled;
}

function showOverlay(){
	if (timeToOverlay > 12){
		timeToOverlay = 0;
		return;
	}
	timeToOverlay++;
	colorRect(0,0, canvas.width, canvas.height, 'red');
	redOverlay = false;
}