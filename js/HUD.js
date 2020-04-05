function drawHUD() {
    //Background
    canvasContext.fillStyle = '#3F3F74';
    canvasContext.fillRect(canvas.width - 110, 55, 110, 200);
    canvasContext.fillRect(0, canvas.height - 60, 160, 60);
    canvasContext.fillRect(canvas.width - 160, canvas.height - 60, 160, 60);

    //Text
    canvasContext.fillStyle = 'white';
    canvasContext.font = '20px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText("Health: " + player.health, 75, canvas.height - 20);
    canvasContext.fillText("Armor: " + player.armor, canvas.width - 75, canvas.height - 20);

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