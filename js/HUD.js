var debugModeEnabled = false;

function drawHUD() {

    //Health
    canvasContext.drawImage(spriteList['healthbar'], 10, canvas.height - 100);
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

    //Armor
    canvasContext.drawImage(spriteList['armorbar'], 10, canvas.height - 55);
    var armorPercent = player.armor / player.maxArmor;
    colorRect(10 + 45, canvas.height - 55 + 15, armorPercent * 145, 20, 'deepskyblue');

    //Keys
    let keyAnchorX = canvas.width - 192 - 16;
    if (player.keys[0]) canvasContext.drawImage(spriteList['blueKey'], 0, 0, 64, 64, keyAnchorX, canvas.height-80, 64, 64);
    if (player.keys[1]) canvasContext.drawImage(spriteList['redKey'], 0, 0, 64, 64, keyAnchorX + 64, canvas.height-80, 64, 64);
    if (player.keys[2]) canvasContext.drawImage(spriteList['greenKey'], 0, 0, 64, 64, keyAnchorX + 128, canvas.height-80, 64, 64);

    //Text
    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText(player.health + "/" + player.maxHealth, 130, canvas.height - 70);
    if (player.armor == 0) {
        canvasContext.fillText(0, 130, canvas.height - 25);
    } else {
        canvasContext.fillText(player.armor + "/" + player.maxArmor, 130, canvas.height - 25);
    }

    //Debug Info
    if (debugModeEnabled === true) {

        //Background
        canvasContext.fillStyle = '#3F3F74';
        canvasContext.fillRect(canvas.width - 110, 55, 110, 200);

        canvasContext.fillStyle = 'white';
        canvasContext.font = '10px Arial';
        canvasContext.textAlign = 'left';

        canvasContext.fillText("Enemy State:", canvas.width - 100, 80);
        canvasContext.fillText(testObject.brain.currentState.name, canvas.width - 100, 90);

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

}

function toggleDebugMode(){
    debugModeEnabled = !debugModeEnabled;
}