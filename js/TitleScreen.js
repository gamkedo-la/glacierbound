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
        var startButton = {x: canvas.width / 2 - 50, y: canvas.height / 2 - 20, w: 100, h: 20};
        var creditsButton = {x: canvas.width / 2 - 50, y: canvas.height / 2 + 20, w: 100, h: 20};
    
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

        if (this.timer <= 0 && mouseHeld[0] && this.startHighlighted) {
            resetMouse();
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
            let weightCubed = weight * weight * weight;
            let handsOffset = lerp (210, 0, weightCubed);
            canvasContext.translate(0, handsOffset);
            player.drawHands();
            canvasContext.translate(0, -handsOffset);

            let hudOffset = lerp(-210, 0, weightCubed);
            canvasContext.translate(hudOffset, 0);
            drawHUD();
            canvasContext.translate(-hudOffset, 0);

            canvasContext.globalAlpha = 1 - (this.timer/60);
        }
        
        colorRect(0, 0, canvas.width, canvas.height, '#3F3F74');
    
        canvasContext.fillStyle = '#5FCDE4';
        canvasContext.font = '80px Arial';
        canvasContext.textAlign = 'center';
    
        canvasContext.fillText("GLACIERBOUND", canvas.width / 2, canvas.height / 3);
    
        canvasContext.fillStyle = this.startHighlighted ? '#5FCDE4' : 'white';
        canvasContext.font = '20px Arial';
        canvasContext.fillText("Start", canvas.width / 2, canvas.height / 2);
    
    
        canvasContext.fillStyle = this.creditsHighlighted ? '#5FCDE4' : 'white';
        canvasContext.fillText("Credits", canvas.width / 2, (canvas.height / 2) + 40);
    
        if (this.timer <= 0)  {
            drawCursor();
        } else this.timer++;

        canvasContext.globalAlpha = 1;
    }

    checkConditions() {
        if (this.timer > 60) {
            console.log('starting');
            return "Game Started";
        }
    }

    onExit() {
        resetMouse();
    }
}