class TitleScreen extends State {
    constructor() {
        super();
        this.name = 'Title Screen';
    }

    onEnter() {
        this.startHighlighted = false;
        this.creditsHighlighted = false;
        this.timer = 0;
        resetMouse();
    }

    run() {
        this.control();
        this.draw();
    }

    control() {
        if (!mouseEnabled || mousePos === null) return;
        var startButton = {x: canvas.width / 2 - 50, y: canvas.height - 50, w: 100, h: 20};
        var creditsButton = {x: canvas.width / 2 - 50, y: canvas.height - 80, w: 100, h: 20};
    
        if (pointInRect(mousePos.x, mousePos.y, startButton.x, startButton.y, startButton.w, startButton.h)){
            this.startHighlighted = true;
        } else {
            this.startHighlighted = false
        }
    
        if (pointInRect(mousePos.x, mousePos.y, creditsButton.x, creditsButton.y, creditsButton.w, creditsButton.h)){
            this.creditsHighlighted = true;
        } else {
            this.creditsHighlighted = false;
        }

        //Start game
        if (this.timer <= 0 && mouseHeld[0] && this.startHighlighted) {
            resetMouse();
            player.health = 100;
            player.armor = 0;
            loadLevel(0);
            moveEverything();
            this.timer++;
        }
    }

    draw() {
        if (this.timer > 0) {
            currentLevel.drawBackground();
            render3DProjection();

            let weight = this.timer/60;
            hudTransition(weight);

            canvasContext.globalAlpha = 1 - smoothStop(weight, 3);
        }
        
        colorRect(0, 0, canvas.width, canvas.height, 'white');
    
        canvasContext.fillStyle = '#5FCDE4';
        canvasContext.font = '80px Arial';
        canvasContext.textAlign = 'center';
		
		//commenting out the placeholder title, attempting to add the logo images
		//below code is an attempt at adding logo
		canvasContext.drawImage(spriteList['logo'], 0, 0, 800, 450);
        //canvasContext.fillText("GLACIERBOUND", canvas.width / 2, canvas.height / 3);
    
        canvasContext.fillStyle = this.startHighlighted ? '#5FCDE4' : '#516faf';
        canvasContext.font = '20px Arial';
        canvasContext.fillText("Start", canvas.width / 2, canvas.height - 40);
    
    
        canvasContext.fillStyle = this.creditsHighlighted ? '#5FCDE4' : '#516faf';
        canvasContext.fillText("Credits", canvas.width / 2, canvas.height - 70);
    
        if (this.timer <= 0)  {
            drawCursor();
        } else this.timer++;

        canvasContext.globalAlpha = 1;
    }

    checkConditions() {
        if (this.timer > 60) {
            return "Game Started";
        }
    }

    onExit() {
        resetMouse();
    }
}

function hudTransition(weight) {
    let handsOffset = lerp (210, 0, smoothStop(weight, 3));
    canvasContext.translate(0, handsOffset);
    player.drawHands();
    canvasContext.translate(0, -handsOffset);

    let hudOffset = lerp(-210, 0, smoothStart(weight, 1));
    canvasContext.translate(hudOffset, 0);
    drawPlayerArmor();
    drawPlayerHealth();
    canvasContext.translate(-hudOffset, 0);
    
    canvasContext.translate(-hudOffset, 0);
    drawPlayerKeys();
    canvasContext.translate(hudOffset, 0);
}