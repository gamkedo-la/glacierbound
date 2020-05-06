

class TitleScreen extends State {
    constructor() {
        super();
        this.name = 'Title Screen';
        this.startButton = {x: canvas.width / 2 - 50, y: canvas.height - 160, w: 100, h: 30};
        this.controlsButton = {x: canvas.width / 2 - 50, y: canvas.height - 130, w: 100, h: 30};
        this.creditsButton = {x: canvas.width / 2 - 50, y: canvas.height - 100, w: 100, h: 30};
        this.showingCredits = false;
        this.showingControls = false;
        this.music = new BackgroundMusicClass("klaim-main_menu");
    }

    onEnter() {
        console.log("TitleScreen state enter");
        this.startHighlighted = false;
        this.creditsHighlighted = false;
        this.controlsHighlighted = false;
        this.timer = 0;
        resetMouse();
        playBGM(this.music, false); // no looping
    }

    run() {
        this.control();
        this.draw();

        // this is to workaround the protection preventing non-interracted pages to play audio.
        if(currentBGM && !currentBGM.isPlaying()){
            currentBGM.play(false); // no looping
        }
    }

    control() {
        if (!mouseEnabled || mousePos === null) return;

        if(this.showingCredits && mouseClicked(0)) { // click anywhere to exit
            this.showingCredits = false;
            return;
        }

        if(this.showingControls && mouseClicked(0)) { // click anywhere to exit
            this.showingControls = false;
            return;
        }

        if (pointInRect(mousePos.x, mousePos.y, this.startButton.x, this.startButton.y, this.startButton.w, this.startButton.h)){
            this.startHighlighted = true;
        } else {
            this.startHighlighted = false
        }

        if (pointInRect(mousePos.x, mousePos.y, this.creditsButton.x, this.controlsButton.y, this.controlsButton.w, this.controlsButton.h)){
            this.controlsHighlighted = true;
        } else {
            this.controlsHighlighted = false;
        }

        if (pointInRect(mousePos.x, mousePos.y, this.creditsButton.x, this.creditsButton.y, this.creditsButton.w, this.creditsButton.h)){
            this.creditsHighlighted = true;
        } else {
            this.creditsHighlighted = false;
        }


        if(this.timer <= 0 && mouseClicked(0)) { // clicking?
        //Start game
            if (this.startHighlighted) {
                resetMouse();
                player.health = 100;
                player.armor = 0;
                player.healthPickup = 0;
                player.armorPickup = 0;
                player.dBoost1Pickup = 0;
                player.dBoost2Pickup = 0;
                loadLevel(0);
                moveEverything();
                this.timer++;
            } else if (this.creditsHighlighted) {
                console.log("toggling show credits");
                this.showingCredits = true;
            }  else if (this.controlsHighlighted) {
                this.showingControls = true;
            }
        }
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
        }  else if (this.showingControls) {
            canvasContext.restore();
            colorRect(0, 0, canvas.width, canvas.height, "#516faf");
            drawControls();
            canvasContext.textAlign = 'center';
            canvasContext.fillStyle = 'white';
            canvasContext.font = '20px Arial';
            canvasContext.fillText("Click anywhere to return", canvas.width / 2, canvas.height - 20);
            return;
        }

        if (this.timer > 0) {
            colorRect(0, 0, canvas.width, canvas.height, '#0F0F28');
            let weight = this.timer/60;
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

        canvasContext.fillStyle = this.controlsHighlighted ? '#5FCDE4' : '#516faf';
        canvasContext.fillText("Controls", canvas.width / 2, this.controlsButton.y + 20);

        canvasContext.fillStyle = this.creditsHighlighted ? '#5FCDE4' : '#516faf';
        canvasContext.fillText("Credits", canvas.width / 2, this.creditsButton.y + 20);

        if (this.timer <= 0)  {
            drawCursor();
        } else this.timer++;

        canvasContext.restore();
    }

    checkConditions() {
        if (this.timer > 60) {
            return "Introduction";
        }
    }

    onExit() {
        console.log("TitleScreen state exit");
        resetMouse();
    }
}

function hudTransition(weight) {
    let handsOffset = lerp (210, 0, smoothStop(weight, 3));
    canvasContext.translate(0, handsOffset);
    player.drawHands();
    canvasContext.translate(0, -handsOffset);

    let hudOffset = lerp(-230, 0, smoothStart(weight, 1));
    canvasContext.translate(hudOffset, 0);
    drawPlayerArmor();
    drawPlayerHealth();
    drawProjectileHUD();
    canvasContext.translate(-hudOffset, 0);

    canvasContext.translate(-hudOffset, 0);
    drawPlayerKeys();
    canvasContext.translate(hudOffset, 0);
}

//Controls Screen
function drawControls(){
        var titleHeight = 100;
        var spaceBetweenTitleAndList =  70;
        var firstText = titleHeight + spaceBetweenTitleAndList;
        var textHeight = 25;
        var usageLeftPad =   250;
        var controlsLeftPad = 500;

        canvasContext.fillStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.font = '30px Arial';
        canvasContext.fillText("CONTROLS", canvas.width / 2, titleHeight);

        var controlsList = [
            {control: 'W', usage: 'Move Forward'},
            {control: 'A', usage: 'Strafe Left'},
            {control: 'S', usage: 'Move Backward'},
            {control: 'D', usage: 'Strafe Right'},
            {control: 'E / LMB', usage: 'Fire'},
            {control: 'Spacebar', usage: 'Open Door'},
            {control: '1', usage: 'Use Health Pack'},
            {control: '2', usage: 'Use Shield'},
            {control: '3', usage: 'Use Damage Boost Type 1'},
            {control: '4', usage: 'Use Damage Boost Type 2'},
            {control: '[', usage: 'Decrease Music Volume'},
            {control: ']', usage: 'Increase Music Volume'},
            {control: 'P', usage: 'Pause Game'},
        ]

        canvasContext.textAlign = 'left';
        canvasContext.font = '18px Arial';

        for (i = 0; i < controlsList.length; i++){
            canvasContext.fillText(controlsList[i].usage, usageLeftPad, firstText +  textHeight * i);
            canvasContext.fillText(controlsList[i].control, controlsLeftPad, firstText +  textHeight * i);
        }
}

//Credit Screen
function Credits() {

    this.creditsMaxCharWidthToWrap = 105;
    this.creditsScrollRate = 0.0; // no scrolling needed in this case

    this.creditNameList = [
        "Brian J. Boucher: Project lead, core gameplay and main raycaster code, snow art, custom level editor, projectiles, item pickup code, multiple level support, exit functionality, initial title screen, debug mode visualizations, level design, assorted bug fixing, minimap"," ",
        "Andrew Mushel: Wall texture support, sprite object rendering, mouse input, hand sway, pathfinding, most collision code, enemy AI, image loading improvements, additional texture art, door code, garbage collection, shadows, snow optimizations, HUD refinements, custom cursor, keys (code and animation), skybox, floor and ceiling distance gradient, level stats and transition, fog rendering, assorted bug fixing, enemy death animation"," ",
        "Catherine San Luis: Health and armor systems (UI, art, related code), inventory pick up messages, damage boost power-ups, credits display improvement, game over fixes, projectile sprites, pause screen, controls page improvements"," ",
        "Klaim (A. Joël Lamotte): Music (Banquise, Avalanche, Glacier, Ice Wizard (boss), main menu, gameover, end of level), music system improvements, music volume keys, testing"," ",
        "Vince McKeown: Player hands graphics, 2 enemy sprites, initial enemy placement, addl. wall texture, sound code integration, sounds for laser and fireball"," ",
        "Ashleigh M.: Logo, hit feedback for player and enemy, title screen improvements, intro and game over image, testing"," ",
        "Powerproust: Intro and end text display"," ",
        "Yong Wei: Strafe input"," ",
        "Joshua Rigley: Health tracking"," ",
        "Made by members of HomeTeam GameDev (Outpost)"," ","Join at HomeTeamGameDev.com to make games with us!",
        ];

    this.creditsScroll = 0;

    this.drawCredits = function(){
        var posHeight = 30;
        var count = 0;

        var anyDrew = false;
        var wasFont = canvasContext.font;
        canvasContext.font = "15px Arial";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "left";
        for (count; count < this.creditNameList.length; count++){
            var drawAt = posHeight-this.creditsScroll;
            //if(drawAt > 160 && drawAt < 475) { // used for if we want to conceal top/bottom for other info when scrolling
                canvasContext.fillText(this.creditNameList[count], 50, drawAt);
                anyDrew = true;
            if(this.creditNameList[count] != " ") {
                posHeight+=18;
            } else { // shorter skips for spacing
                posHeight+=13;
            }
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

class StoryIntroduction extends State {
	constructor() {
        super();
        this.name = 'Introduction'
        this.timer = 0;
        this.text = ["Once upon a time, an old wizard woke up from a long sleep.",
                    "When he regained his senses, his last memory came rushing back.",
                    "His worst enemy, the White Magician of the Northern Kingdoms,",
                    "riding his Wonderful Dragon, giving him a fatal blow.",
                    "He remembered the pain and rubbed his temples.",
                    "But then came the image of a young boy.",
                    "'The Prince!', he exclaimed.",
                    "'He must know that I am alive,",
                    "and I should protect him'",
                    "He stood up.",
                    "'Where am I? It looks like a crypt",
                    "I had better be on the lookout for danger..."
                ];
    }

	onEnter() {
        this.timer = 0;
        this.animation = 0;
    }

    run() {
        this.animateAlpha();

        colorRect(0, 0, canvas.width, canvas.height, 'black');
        canvasContext.fillStyle = 'white';
        if (this.animation === 1) {
            let storyImg = spriteList['intro-story-screen'];
            let drawRatio = storyImg.width >= canvas.width ? canvas.width/storyImg.width : storyImg.width/canvas.width;
                drawRatio *= 0.8;
            let drawWidth = storyImg.width * drawRatio,
                drawHeight = storyImg.height * drawRatio,
                drawX = (canvas.width - drawWidth) / 2,
                drawY = (canvas.height - drawHeight) / 2;
            canvasContext.drawImage(storyImg, 0, 0, storyImg.width, storyImg.height, drawX, drawY, drawWidth, drawHeight);
            let weight = this.timer/60;
            let startY = 30;
            let displayLength = Math.ceil(lerp(0, this.text.length, weight));
            canvasContext.font = '12.5px Arial';
            canvasContext.textAlign = 'left';
            for (let t = 0; t < displayLength; t++) {
                canvasContext.fillText(this.text[t], 15, startY + t * 25);
            }
            //draw main content
        } else if (this.animation === 2) {
            //draw transition to next state
            canvasContext.font = '60px Arial';
            canvasContext.textAlign = 'center';
            canvasContext.fillText('Entering Level 1', canvas.width/2, canvas.height/2);
        }

        this.updateTimer();
    }

    loadGame() {
        this.timer = 0;
        this.animation = 2;
        player.reset();
        loadLevel(0);
        moveEverything();
    }

    animateAlpha() {
        switch(this.animation) {
            case 0: //Transition from completed level
                //draw content from previous state
                //lerp alpha for transition content
                let weight = this.timer/60;
                canvasContext.globalAlpha = smoothStart(weight, 3);
                break;
            case 1: //Counting stats
                canvasContext.globalAlpha = 1;
                break;
            case 2: //Transition to next level
                //wait 60 frames (~1 second)
                if (this.timer > 60) {
                    //draw content from next state
                    canvasContext.globalAlpha = 1;
                    currentLevel.drawBackground();
                    render3DProjection();

                    //lerp transition content
                    let weight = (this.timer - 60) / 60;
                    hudTransition(weight);
                    canvasContext.globalAlpha = 1 - smoothStop(weight, 3);
                }
                break;
            default:
                break;
        }
    }

    updateTimer() {
        this.timer++;
        switch(this.animation) {
            case 0:
                if (this.timer > 60) {
                    this.animation++;
                    this.timer = 0;
                }
                break;
            case 1:
                this.timer -= 0.95;
                if (mouseClicked(0)) {
                    if (this.timer < 98 ) {
                        //interrupt content animation
                        this.timer = 98;
                    }
                    if (this.timer >= 100) {
                        //load content for next state
                        this.loadGame();
                    }
                }
                break;
            default:
                break;
        }
    }

	checkConditions() {
        if (this.animation === 2 && this.timer >= 120) {
            return 'Game Started';
        }
    }
	onExit() {
        resetMouse();
    }
}

class StoryConclusion extends State {
	constructor() {
        super();
        this.name = 'Conclusion'
        this.timer = 0;
        this.text = ["Surrounded by glass castles and a kind of magic he did not fully understand,",
                    "the wizard realized he had slept far longer than he ever could have imagined. . ",
                    "The Great Magicien, his Wonderful Dragon, the Northern Kingdoms and the Prince,",
                    "all were part of a world which was fading into the past.",
                    "But still, looking around, he felt a deep hope.",
                    "People were still around, same as they were two thousand years ago!",
                    "He noticed a 10 year old boy approaching him. His kind face expressed a profound curiosity. ",
                    "So the wizard did what he knew to be his duty. So the wizard did was his duty was.",
                    "'Sir! Would you agree to be my new Prince?'",
                    "The wizard asked. The boy smiled. He nodded. A new story was about to begin.",
                    ]
        this.music = new BackgroundMusicClass("klaim-avalanche");
    }

	onEnter() {
        this.timer = 0;
        this.animation = 0;
        plauBGM(this.music, false);
    }

    run() {
        this.animateAlpha();

        colorRect(0, 0, canvas.width, canvas.height, '#3F3F74');
        if (this.animation > 0) {
            canvasContext.fillStyle = 'white';
            let weight = this.timer/60;
            let startY = (canvas.height / 2) - (this.text.length * 25) / 2;
            let displayLength = this.animation === 1 ? Math.ceil(lerp(0, this.text.length, weight)) : this.text.length;
            canvasContext.font = '16px Arial';
            canvasContext.textAlign = 'center';
            for (let t = 0; t < displayLength; t++) {
                canvasContext.fillText(this.text[t], canvas.width/2, startY + t * 25);
            }
        }

        this.updateTimer();
    }

    loadGame() {
        this.timer = 0;
        this.animation = 2;
        player.reset();
        loadLevel(0);
        moveEverything();
    }

    animateAlpha() {
        let weight = 1;
        switch(this.animation) {
            case 0: //Transition from completed game
                //draw content from previous state
                //lerp alpha for transition content
                weight = this.timer/60;
                canvasContext.globalAlpha = smoothStart(weight, 3);
                break;
            case 1: //Counting stats
                canvasContext.globalAlpha = 1;
                break;
            case 2: //Transition to Title Screen
                //draw content from next state
                canvasContext.globalAlpha = 1;
                colorRect(0, 0, canvas.width, canvas.height, '#0F0F28');
                Game.states['Title Screen'].draw();
                //lerp transition content
                weight = this.timer/60;
                canvasContext.globalAlpha = 1 - smoothStop(weight, 3);
                break;
            default:
                break;
        }
    }

    updateTimer() {
        this.timer++;
        switch(this.animation) {
            case 0:
                if (this.timer > 60) {
                    this.animation++;
                    this.timer = 0;
                }
                break;
            case 1:
                this.timer -= 0.95;
                if (mouseClicked(0)) {
                    if (this.timer < 98 ) {
                        //interrupt content animation
                        this.timer = 98;
                    }
                    if (this.timer >= 100) {
                        //load content for next state
                        this.loadGame();
                    }
                }
                break;
            default:
                break;
        }
    }

	checkConditions() {
        if (this.animation === 2 && this.timer >= 60) {
            return 'Title Screen';
        }
    }
	onExit() {
        canvasContext.globalAlpha = 1;
        resetMouse();
    }
}