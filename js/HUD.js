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
        
        canvasContext.font = '20px Arial';
        let textSize = canvasContext.measureText(this.message);

        canvasContext.globalAlpha = alpha/1.5;
        canvasContext.fillStyle = '#23233F';
        canvasContext.fillRect(canvas.width/2 - textSize.width/2 - 6, canvas.height - 40, textSize.width + 12, 35);


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
    drawProjectileHUD();
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

function drawProjectileHUD() {
    //projectilebar
    if (player.dBoost1active && player.dBoost2active) {
        canvasContext.drawImage(spriteList['projectilebar_comboboost'], 10, canvas.height - 43);
    } else if (player.dBoost1active) {
       canvasContext.drawImage(spriteList['projectilebar_boost1'], 10, canvas.height - 43);
    } else if (player.dBoost2active) {
       canvasContext.drawImage(spriteList['projectilebar_boost2'], 10, canvas.height - 43);
    } else {
        canvasContext.drawImage(spriteList['projectilebar'], 10, canvas.height - 43);
    }    
  
    //Damage boost type 2 timer HUD
    var timePercent = player.dBoost2timeLeft / player.dBoost2duration;
    if (timePercent >= 0) {
    colorRect(10 + 36, canvas.height - 34, timePercent * 111, 20, 'magenta');
    }


    //Damage info display
    canvasContext.font = '13px Arial';
    canvasContext.textAlign = 'center';
    if (player.dBoost1active && player.dBoost2active) {        
        canvasContext.fillStyle = 'cyan';
        canvasContext.fillText("Damage: "+player.dBoost1damageMultiplier*player.dBoost2damageMultiplier+"00%", 100, canvas.height - 20);    
    } else if (player.dBoost1active) {
        colorRect(10 + 36, canvas.height - 34, 111, 20, 'orangered');  
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Damage: "+player.dBoost1damageMultiplier+"00%", 100, canvas.height - 20);
    } else if (player.dBoost2active) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Damage: "+player.dBoost2damageMultiplier+"00%", 100, canvas.height - 20);    
    } else {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Damage: 100%", 100, canvas.height - 20); 
    }

    //Damage boost pickup HUD
    canvasContext.fillStyle = 'black';
    canvasContext.font = '13px Arial Black';
    if (player.dBoost1Pickup > 0 ) {
        canvasContext.drawImage(spriteList['damageboost1pickup_ui'], 161, canvas.height - 43);
        canvasContext.fillText(player.dBoost1Pickup, 178, canvas.height - 20);
    }
    if (player.dBoost1Pickup == 0 && player.dBoost2Pickup > 0 ) {
        canvasContext.drawImage(spriteList['damageboost2pickup_ui'], 161, canvas.height - 43);
        canvasContext.fillText(player.dBoost2Pickup, 178, canvas.height - 20);
    } else if (player.dBoost2Pickup > 0 ) {
        canvasContext.drawImage(spriteList['damageboost2pickup_ui'], 195, canvas.height - 43);
        canvasContext.fillText(player.dBoost2Pickup, 213, canvas.height - 20);
    }

}

function drawPlayerArmor() {
    //armorbar
    canvasContext.drawImage(spriteList['armorbar'], 10, canvas.height - 79);

    //armor fill
    var armorPercent = player.armor / player.maxArmor;
    colorRect(10 + 36, canvas.height - 70, armorPercent * 145, 20, 'deepskyblue');

    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';


    if (player.armor == 0) {
        canvasContext.fillText(0, 120, canvas.height - 55);
    } else {
        canvasContext.fillText(player.armor + "/" + player.maxArmor, 120, canvas.height - 55);
    }

    //armor pickup (hidden if player doesn't have any)
  if (player.armorPickup > 0 ) {
    canvasContext.drawImage(spriteList['armorpickup_ui'], 195, canvas.height - 79);
    canvasContext.fillStyle = 'lightblue';
    canvasContext.font = '15px Arial';
    canvasContext.fillText(player.armorPickup, 212, canvas.height - 55);
    }
}

function drawPlayerHealth() {
 
    //healthbar
    canvasContext.drawImage(spriteList['healthbar'], 10, canvas.height - 115);

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
    colorRect(10 + 36, canvas.height - 106, healthPercent * 145, 20, healthState);

    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText(player.health + "/" + player.maxHealth, 120, canvas.height - 91);

    //health pickup (hidden if player doesn't have any)
   if (player.healthPickup > 0) {
    canvasContext.drawImage(spriteList['healthpickup_ui'], 195, canvas.height - 115);
    canvasContext.fillStyle = 'pink';
    canvasContext.font = '15px Arial';
    canvasContext.fillText(player.healthPickup, 212, canvas.height - 91);
    }    
}

function drawPlayerKeys() {
    let keyAnchorX = canvas.width - 192 - 16;
    canvasContext.imageSmoothingEnabled = false;
    if (player.keys[0]) canvasContext.drawImage(spriteList['blueKey'], 0, 0, 16, 16, keyAnchorX, canvas.height-80, 64, 64);
    if (player.keys[1]) canvasContext.drawImage(spriteList['redKey'], 0, 0, 16, 16, keyAnchorX + 64, canvas.height-80, 64, 64);
    if (player.keys[2]) canvasContext.drawImage(spriteList['greenKey'], 0, 0, 16, 16, keyAnchorX + 128, canvas.height-80, 64, 64);
    canvasContext.imageSmoothingEnabled = true;
}

function toggleDebugMode(){
    return; //Debug Mode Disabled
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