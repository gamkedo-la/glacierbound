

class TitleScreen extends State {
    constructor() {
        super();
        this.name = 'Title Screen';
        this.startButton = {x: canvas.width / 2 - 50, y: canvas.height - 160, w: 100, h: 30};
        this.creditsButton = {x: canvas.width / 2 - 50, y: canvas.height - 130, w: 100, h: 30};
        this.showingCredits = false;
        this.clickHeldPrevFrame = false; // to prevent holding from passing between menus
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

        if(this.showingCredits) { // click anywhere to exit
            if(mouseHeld[0] && this.clickHeldPrevFrame == false) { // clicking?
                this.showingCredits = false;
            }
            this.clickHeldPrevFrame = mouseHeld[0];
            return;
        }
    
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

        if(this.timer <= 0 && mouseHeld[0] && this.clickHeldPrevFrame == false) { // clicking?
        //Start game
            if (this.startHighlighted) {
                resetMouse();
                player.health = 100;
                player.armor = 0;
                loadLevel(0);
                moveEverything();
                this.timer++;
            } else if (this.creditsHighlighted) {
                console.log("toggling show credits");
                this.showingCredits = true;
            }
        }

        this.clickHeldPrevFrame = mouseHeld[0];
    }

    draw() {
        canvasContext.save();
        if(this.showingCredits) {
            canvasContext.restore();
            colorRect(0, 0, canvas.width, canvas.height, "#516faf");
            gameCredits.drawCredits();
            canvasContext.textAlign = 'center';
            canvasContext.fillStyle = 'white';
            canvasContext.font = '20px Arial';
            canvasContext.fillText("Click anywhere to return", canvas.width / 2, canvas.height - 20);
            return;
        }

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
    drawProjectileHUD();
    canvasContext.translate(-hudOffset, 0);
    
    canvasContext.translate(-hudOffset, 0);
    drawPlayerKeys();
    canvasContext.translate(hudOffset, 0);
}

//Credit Screen
function Credits() {

    this.creditsMaxCharWidthToWrap = 105;
    this.creditsScrollRate = 0.0; // no scrolling needed in this case

    this.creditNameList = [
        "Brian J. Boucher: Project lead, core gameplay and main raycaster code, snow art, custom level editor, projectiles, item pickup code, multiple level support, exit functionality, initial title screen, debug mode visualizations, level design (1 and 2), assorted bug fixing"," ",
        "Andrew Mushel: Wall texture support, sprite object rendering, mouse input, hand sway, pathfinding, most collision code, enemy AI, image loading improvements, additional texture art, door code, garbage collection, shadows, snow optimizations, HUD refinements, custom cursor, keys, skybox, floor and ceiling distance gradient, level stats and transition"," ",
        "Catherine San Luis: Health and armor systems (UI, art, related code), inventory pick up messages, damage boost power-up"," ",
        "Vince McKeown: Player hands graphics, 2 enemy sprites, initial enemy placement, addl. wall texture, sound code integration, sounds for laser and fireball"," ",
        "Ashleigh M.: Logo, hit feedback for player and enemy, title screen improvements, game over image"," ",
        "Klaim (A. Joël Lamotte): Avalanche track"," ",
        "Yong Wei: Strafe input"," ",
        "Joshua Rigley: Health tracking"," ",
        " "," ",
        "Made by members of HomeTeam GameDev (Outpost)"," ","Join at HomeTeamGameDev.com to make games with us!",
        ];

    this.creditsScroll = 0;

    this.drawCredits = function(){
        var posHeight = 50;
        var count = 0;

        var anyDrew = false;
        var wasFont = canvasContext.font;
        canvasContext.font = "15px Arial";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "left";
        for (count; count < this.creditNameList.length; count++){
            var drawAt = posHeight+count*18-this.creditsScroll;
            //if(drawAt > 160 && drawAt < 475) { // used for if we want to conceal top/bottom for other info when scrolling
                canvasContext.fillText(this.creditNameList[count], 50, drawAt);
                anyDrew = true;
            //}
        }
        canvasContext.font = wasFont;
        this.creditsScroll+=this.creditsScrollRate;
        if(anyDrew==false) { // reset, all off screen
            this.creditsScroll=0;
        }
    }

    this.wrapCredits = function(){ // note: gets calling immediately after definition
        var newCut = [];
        var findEnd;
        for(var i=0;i<this.creditNameList.length;i++) {
            while(this.creditNameList[i].length > 0) {
                findEnd = this.creditsMaxCharWidthToWrap;
                if(this.creditNameList[i].length > this.creditsMaxCharWidthToWrap) {
                    for(var ii=findEnd;ii>0;ii--) {
                        if(this.creditNameList[i].charAt(ii) == " ") {
                            findEnd=ii;
                            break;
                        }
                    }
                }
                newCut.push(this.creditNameList[i].substring(0, findEnd));
                this.creditNameList[i] = this.creditNameList[i].substring(findEnd, this.creditNameList[i].length);
            }
        }
        this.creditNameList = newCut;
    }
    this.wrapCredits();

}

var gameCredits = new Credits();
var Introduction = ["Once upon a time, an old wizard woke up from a long sleep."," ",
        "When he regained his senses, his last memory came rushing back. His worst enemy, the White Magician of the Northern Kingdoms, riding his Wonderful Dragon, giving him a fatal blow."," ",
        "He remembered the pain and rubbed his temples. But then came the image of a young boy."," ",
        "'The Prince! He must know that I am alive and I should protect him'"," ",
        "He stood up. 'Where am I? It looks like a crypt. I had better be on the lookout for danger...'", " ",];

var Conclusion = [
"Surrounded by glass castles and a kind of magic he did not fully understand, the wizard realized he had slept for a longer time than he ever could have imagined. . ",
"The Great Magicien, his Wonderful Dragon, the Northern Kingdoms and the Prince, all were part of a world which was fading into the past.",
"But still, looking around, he felt a deep hope.",
"People were still around, same as they were two thousand years ago! He noticed a 10 year old boy approaching him. His kind face expressed a profound curiosity. ",
"So the wizard did what he knew to be his duty. So the wizard did was his duty was.",
"'Sir! Would you agree to be my new Prince?'",
"The wizard asked. The boy smiled. He nodded. A new story was about to begin.",
]