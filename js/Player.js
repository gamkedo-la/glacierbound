class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = TILE_SIZE/4;
        this.moveSpeed = 4.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
        this.health = 100;
        this.maxHealth = 100;
        this.healthPickup = 0;
        this.armor = 0;
        this.maxArmor = 15;
        this.armorPickup = 0;

        this.normaldamage = 20;
        //Damage Boost Type 1 - Normal damage is multiplied by dBoost1damageMultiplier for 1 attack. Stacks.
        this.dBoost1Pickup = 0;
        this.dBoost1damageMultiplier = 3;
        this.dBoost1active = 0;
        //Damage Boost Type 2 - Normal damage is multiplied by dBoost2damageMultiplier for dBoost2duration seconds. Does not stack.
        this.dBoost2Pickup = 0;
        this.dBoost2active = false;
        this.dBoost2duration  = 10;
        this.dBoost2damageMultiplier = 2;
        this.dBoost2timeLeft = 0;
        this.dboost2Timer;

        this.reset();
    }

    reset() {
        this.keyHeld_Forward = false;
        this.keyHeld_Backward = false;
        this.keyHeld_Left = false;
        this.keyHeld_Right = false;
        this.keyHeld_Fire = false;
        this.rotationAngle = 0;
        this.rays = [];
        this.moveSway = 0;
        this.keys = [];
        this.timeToShoot = 10;
    }

    update() {
        this.updatePosition();
        this.updateCollisions();
        this.castAllRays();
        if (this.timeToShoot > 0) this.timeToShoot--;
        if (this.keyHeld_Fire || mouseHeld(0)) this.fireWeapon();
        this.rotationAngle = normalizeAngle(this.rotationAngle);
    }

    updatePosition() {

        if (mouseEnabled) this.updateMouse();
        let newX = 0,
            newY = 0;
        if (this.keyHeld_Left) newY -= 1;
        if (this.keyHeld_Right) newY += 1;
        if (this.keyHeld_Forward) newX += 1;
        if (this.keyHeld_Backward) newX -= 1;

        if (newX === 0 && newY === 0) {
            //Reset move sway to 0 when the player stops
            let sway = this.moveSway % (Math.PI * 2);
            let diff = 0;
            if (sway - Math.PI <= 0) diff = -Math.PI/30;
            else diff = Math.PI/30;

            if (sway + diff < 0 || sway + diff > Math.PI * 2) this.moveSway -= sway;
            else this.moveSway += diff;
            return;
        }

        this.moveSway += Math.PI/15;
        this.moveSway %= Math.PI * 4;

        let moveAng = this.rotationAngle + Math.atan2(newY, newX);
        let movePos = getPixelCoordFromAngleAndSpeed(this.x, this.y, moveAng, this.moveSpeed);

        if (!objectMapCollision(movePos[0], this.y, this.radius)) this.x = movePos[0];
        if (!objectMapCollision(this.x, movePos[1], this.radius)) this.y = movePos[1];
    }

    updateCollisions() {
        for (let o of objects) {
            if (o.distance < o.radius + this.radius) {
                if (o.updateCollision != undefined) o.updateCollision(this);
                else if (o.owner != this && o.radius > 0) {
                    let dX = this.x - o.x;
                    let dY = this.y - o.y;
                    let ang = Math.atan2(dY, dX);
                    let overlap = o.radius + this.radius - o.distance;

                    this.x += Math.cos(ang) * overlap;
                    this.y += Math.sin(ang) * overlap;
                }
            }
        }
    }

    fireWeapon() {
        if (this.timeToShoot > 0) return;
        let pX = this.x + Math.cos(this.rotationAngle) * (this.radius + 0.2 * 64);
        let pY = this.y + Math.sin(this.rotationAngle) * (this.radius + 0.2 * 64);
        var newProj = new Projectile(pX, pY, 10, spriteList['projectile'], -0.5, 0.2, this.rotationAngle, false);
        if (this.dBoost1active && this.dBoost2active) {
            newProj.pic = spriteList['projectile_comboboost'];
            newProj.shootFrom(this, this.normaldamage * this.dBoost1damageMultiplier * this.dBoost2damageMultiplier);
            this.dBoost1active--;
        } else if (this.dBoost1active) {
            newProj.pic = spriteList['projectile_boost1'];
            newProj.shootFrom(this, this.normaldamage * this.dBoost1damageMultiplier);
            this.dBoost1active--;
        } else if (this.dBoost2active) {
            newProj.pic = spriteList['projectile_boost2'];
            newProj.shootFrom(this, this.normaldamage * this.dBoost2damageMultiplier);
        } else {
            newProj.pic = spriteList['projectile'];
            newProj.shootFrom(this, this.normaldamage);
        }

        objects.push(newProj);
        this.timeToShoot = 12;
		laserShot.play();
    }

    frob() {
        let frobRange = TILE_SIZE;
        let fX = this.x + Math.cos(this.rotationAngle) * frobRange;
        let fY = this.y + Math.sin(this.rotationAngle) * frobRange;
        let fIndex = levelTileIndexAtColRowCoord(colAtXCoord(fX), rowAtYCoord(fY));
        let tileType = Math.floor(currentLevel.mapGrid[fIndex])

        if (tileType === GRID_DOOR) {
            let doorType = Math.ceil(currentLevel.mapGrid[fIndex] * 100) - (tileType * 100) - 1;
            if (doorType === 0 || this.keys[doorType - 1]) {
                currentLevel.toggleDoor(fIndex);
            } else {
                let color = getDoorColor(doorType);
                messageConsole.push(color + ' Key required.', color);
            }
        }
    }

    activatePickUp(pickup) {
        switch(pickup) {
            case 'health':
                if (player.healthPickup == 0) {
                    messageConsole.push("No Health Packs available.", 'red');
                } else {
                    if (player.health === player.maxHealth) {
                        messageConsole.push("Health is still at maximum level.", 'pink');
                    } else {
                        player.healthPickup--;
                        messageConsole.push('Health Pack used. '+player.healthPickup+ ' remaining.', 'pink');
                        player['health'] += 15;
                        if (player.health > player.maxHealth){
                            player.health = player.maxHealth;
                        } //end of if statement to check that player does not go above max Health
                    } //end of else statement for pickup to activate if player is damaged
                } //end of else statement checking that player has health pickup
                break;
            case 'armor':
                if (player.armorPickup == 0) {
                        messageConsole.push("No Shields available.", 'red');
                } else {
                    if (player.armor === player.maxArmor) {
                        messageConsole.push("Shield is still intact.", 'lightblue');
                    } else {
                        player.armorPickup--;
                        messageConsole.push('Shield activated. '+player.armorPickup+ ' remaining.', 'lightblue');
                        player['armor'] += 15;
                        if (player.armor > player.maxArmor){
                            player.armor = player.maxArmor;
                        } //end of if statement to check that player does not go above max armor
                    } // end of else statement for pickup to activate if armor is damaged
                } // end of else statement checking that player has armor pickup
                break;
            case 'damageboost1':
                if (player.dBoost1Pickup == 0){
                    messageConsole.push("No Damage Boost Type 1 available.", 'red');
                } else {
                    player.dBoost1Pickup--;
                    player.dBoost1active++;
                    if (player.dBoost1active == 1) {
                        messageConsole.push('Damage of next attack increased by '+this.dBoost1damageMultiplier+'00%.', 'coral');
                    } else {
                        messageConsole.push('Damage of next '+player.dBoost1active+' attacks increased by '+this.dBoost1damageMultiplier+'00%.', 'coral');
                    }
                }
                break;
            case 'damageboost2':
                if (player.dBoost2Pickup == 0){
                    messageConsole.push("No Damage Boost Type 2 available.", 'red');
                } else {
                    if (player.dBoost2active == true){
                       messageConsole.push("Damage Boost Type 2 is still active.", 'lightblue');
                    } else {
                        player.dBoost2Pickup--;
                        messageConsole.push('Damage increased by '+this.dBoost2damageMultiplier+'00% for the next '+this.dBoost2duration+' seconds.', 'hotpink');
                        player.dBoost2active = true;
                        player.dBoost2timeLeft = this.dBoost2duration;
                        this.pauseBoost2Timer();
                    }
                }
                break;
            default:
                break;
        }
    }

    pauseBoost2TimerPause(){
            console.log("Timer Paused!")
            player.dboost2Timer = clearInterval(player.dboost2Timer);
    }

    pauseBoost2Timer(){
            if(player.dBoost2timeLeft > 0) {
            player.dboost2Timer = setInterval(function(){
                              if(player.dBoost2timeLeft <= 0){
                                clearInterval(player.dboost2Timer);
                                player.dBoost2active = false;
                                messageConsole.push("Damage Boost Type 2 has ended.", 'red');
                              }
                              player.dBoost2timeLeft--;
                              console.log("Time left on Damage Boost Type 2: "+player.dBoost2timeLeft);
                            }, 1000);
            }
    }

    updateMouse() {
        this.rotationAngle += mouseDelta.x * (Math.PI/180) * MOUSE_SENS;

        mouseDelta.x = 0;
        mouseDelta.y = 0;
    }

    draw() {

        if (debugModeEnabled === false) return;

        this.rays.forEach(element => element.draw());
        colorCircle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.radius * MINIMAP_SCALE_FACTOR, 'red');
    }

    drawHands() {
        let xOffset = Math.sin(this.moveSway/2) * 40,
            yOffset = Math.cos(this.moveSway) * 30;
        canvasContext.drawImage(spriteList['leftHand'], 0, 0, 330, 200, xOffset, canvas.height-160 + yOffset, 330, 200);
        canvasContext.drawImage(spriteList['rightHand'], 0, 0, 330, 200, canvas.width-330 + xOffset, canvas.height-160 + yOffset, 330, 200);
    }

    setupControls(forwardKey, backKey, leftKey, rightKey, fireKey) {
        this.controlKeyForForward = forwardKey;
        this.controlKeyForBackward = backKey;
        this.controlKeyForStrafeLeft = leftKey;
        this.controlKeyForStrafeRight = rightKey;
        this.controlKeyForFire = fireKey;
    }
    takeDamage(howMuch, from) {
		redOverlay = true; //set show im hit overlay to true

        let damageRemaining = howMuch;
        if (this.armor > 0) {
            let mitigated = Math.floor(howMuch / 3);
            this.armor -= mitigated;

            if (this.armor < 0) {
                mitigated += this.armor
                this.armor = 0;
            }
            damageRemaining -= mitigated;
        }
        this.health = clamp(this.health - damageRemaining, 0, this.maxHealth);
        if(damageRemaining > 0){
            let hurtSounds = [ soundPlayerHurt1, soundPlayerHurt2 ];
            let sound = hurtSounds[Math.floor(Math.random() * hurtSounds.length)];
            sound.play();
        }
    }

    castAllRays() {
        var rayAngle = this.rotationAngle - (FOV_RADS / 2);
        this.rays = [];

        for (var i = 0; i < NUM_OF_RAYS; i++) {
            var ray = new Ray(this, rayAngle);
            ray.columnID = i;
            ray.cast();
            this.rays.push(ray);

            rayAngle += RAY_ANGLE_INCREMENT;
        }

        //re-sorts list of rays from furthest to closest to the player
        this.rays.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
    }
}
