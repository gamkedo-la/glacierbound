function drawHUD() {
    //Background
    canvasContext.fillStyle = '#3F3F74';
    canvasContext.fillRect(canvas.width - 110, 55, 110, 200);

    //Health
    canvasContext.drawImage(spriteList['healthbar'], 10,canvas.height - 100);
    var healthPercent = player.health/player.maxHealth * 100;
    var healthState = 'green';
    if (healthPercent == 100) {
        healthState = 'green';
    } else if (healthPercent <= 60 && healthPercent > 30) {
        healthState = 'orange';
    } else if (healthPercent <= 30) {
        healthState = 'red';
    }
    colorRect(10+45,canvas.height - 100+15, healthPercent*1.45,20,healthState);
    
    //Armor
    canvasContext.drawImage(spriteList['armorbar'], 10,canvas.height - 55);
    var armorPercent = player.armor/player.maxArmor * 100;
    colorRect(10+45,canvas.height - 55+15, armorPercent*1.45,20,'deepskyblue');
    
    //Text
    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText(player.health+"/"+player.maxHealth, 130, canvas.height - 70);
    if (player.armor == 0){
        canvasContext.fillText(0, 130, canvas.height - 25);
    } else {
        canvasContext.fillText(player.armor+"/"+player.maxArmor, 130, canvas.height - 25);
    }

    //Debug Info
    canvasContext.font = '10px Arial';
    canvasContext.textAlign = 'left';

    canvasContext.fillText("Enemy State:", canvas.width - 100, 80);
    canvasContext.fillText(testObject.brain.currentState.name, canvas.width - 100, 90);

    canvasContext.fillText("Player Position:", canvas.width - 100, 110);
    canvasContext.fillText(Math.floor(player.x) + ", " + Math.floor(player.y), canvas.width - 100, 120);

    canvasContext.fillText("Player Direction:", canvas.width - 100, 140);
    canvasContext.fillText(player.rotationAngle, canvas.width - 100, 150);

    canvasContext.fillText("Level Editor Enabled:", canvas.width - 100, 170);
    canvasContext.fillText(isInLevelEditMode, canvas.width - 100, 180);

    canvasContext.fillText("Mouse Position:", canvas.width - 100, 200);
    canvasContext.fillText("Scaled Mouse Pos:", canvas.width - 100, 220);
    canvasContext.fillText("Wall Tile Type:", canvas.width - 100, 240);
    if (mousePos != null) {
        canvasContext.fillText(mousePos.x + ", " + mousePos.y, canvas.width - 100, 210);
        canvasContext.fillText(mousePos.x / MINIMAP_SCALE_FACTOR + ", " + mousePos.y / MINIMAP_SCALE_FACTOR, canvas.width - 100, 230);
        canvasContext.fillText(getTileTypeAtPixelCoord(mousePos.x / MINIMAP_SCALE_FACTOR, mousePos.y / MINIMAP_SCALE_FACTOR), canvas.width - 100, 250);
    }

    if (isInLevelEditMode) {
        drawTileSelector();
        drawCursor();
    }
}