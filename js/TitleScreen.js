var startHighlighted = false;
var creditsHighlighted = false;

function controlTitleScreen() {
    if (!mouseEnabled || mousePos === null) return;
    var startButton = {x: canvas.width / 2 - 50, y: canvas.height / 2 - 20, w: 100, h: 20};
    var creditsButton = {x: canvas.width / 2 - 50, y: canvas.height / 2 + 20, w: 100, h: 20};

    if (pointInRect(mousePos.x, mousePos.y, startButton.x, startButton.y, startButton.w, startButton.h)){
        startHighlighted = true;
		//hauntedHoedownSound.loopSong("hauntedHoedown");
    } else {
        startHighlighted = false
    }

    if (pointInRect(mousePos.x, mousePos.y, creditsButton.x, creditsButton.y, creditsButton.w, creditsButton.h)){
        creditsHighlighted = true;
    } else {
        creditsHighlighted = false;
    }
}

function drawTitleScreen() {
    colorRect(0, 0, canvas.width, canvas.height, '#3F3F74');

    canvasContext.fillStyle = '#5FCDE4';
    canvasContext.font = '80px Arial';
    canvasContext.textAlign = 'center';

    canvasContext.fillText("GLACIERBOUND", canvas.width / 2, canvas.height / 3);

    canvasContext.fillStyle = startHighlighted ? '#5FCDE4' : 'white';
    canvasContext.font = '20px Arial';
    canvasContext.fillText("Start", canvas.width / 2, canvas.height / 2);


    canvasContext.fillStyle = creditsHighlighted ? '#5FCDE4' : 'white';
    canvasContext.fillText("Credits", canvas.width / 2, (canvas.height / 2) + 40);

    drawCursor();
}