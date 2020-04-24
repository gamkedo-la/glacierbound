class TitleScreen extends State {
    constructor() {
        super();
        this.name = 'Title Screen';
        this.startButton = {x: canvas.width / 2 - 50, y: canvas.height - 160, w: 100, h: 30};
        this.creditsButton = {x: canvas.width / 2 - 50, y: canvas.height - 130, w: 100, h: 30};
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
    
        if (pointInRect(mousePos.x, mousePos.y, this.startButton.x, this.startButton.y, this.startButton.w, this.startButton.h)){
            this.startHighlighted = true;
        } else {
            this.startHighlighted = false
        }
    
        if (pointInRect(mousePos.x, mousePos.y, this.creditsButton.x, this.creditsButton.y, this.creditsButton.w, this.creditsButton.h)){
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
        canvasContext.save();
        if (this.timer > 0) {
            currentLevel.drawBackground();
            render3DProjection();

            let weight = this.timer/60;
            hudTransition(weight);

            canvasContext.globalAlpha = 1 - smoothStop(weight, 3);
        }
        
        let gradient = canvasContext.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height/2, canvas.width/2, canvas.height/2, canvas.height/4);
            gradient.addColorStop(0, '#516faf');
            gradient.addColorStop(1, 'white');
        colorRect(0, 0, canvas.width, canvas.height, gradient);
		
        let graphic = spriteList['logo'];
        let drawRatio = graphic.width >= canvas.width ? canvas.width/graphic.width : graphic.width/canvas.width;
            drawRatio *= 0.8;
        let drawWidth = graphic.width * drawRatio, 
            drawHeight = graphic.height * drawRatio,
            drawX = (canvas.width - drawWidth) / 2,
            drawY = (canvas.height - drawHeight) / 2;

        canvasContext.shadowBlur = 2;
        canvasContext.shadowColor = '#3F3F74';
        canvasContext.drawImage(graphic, 0, 0, graphic.width, graphic.height, drawX, drawY, drawWidth, drawHeight);
    
        canvasContext.textAlign = 'center';
        canvasContext.fillStyle = this.startHighlighted ? '#5FCDE4' : '#516faf';
        canvasContext.font = '20px Arial';
        canvasContext.fillText("Start", canvas.width / 2, this.startButton.y + 20);
    
    
        canvasContext.fillStyle = this.creditsHighlighted ? '#5FCDE4' : '#516faf';
        canvasContext.fillText("Credits", canvas.width / 2, this.creditsButton.y + 20);
    
        if (this.timer <= 0)  {
            drawCursor();
        } else this.timer++;

        canvasContext.restore();
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