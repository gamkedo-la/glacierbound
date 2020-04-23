class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = TILE_SIZE/4;
        this.moveSpeed = 4.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
        this.health = 100;
        this.armor = 0;
        this.maxHealth = 100;
        this.maxArmor = 15;
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
        if (this.keyHeld_Fire) this.fireWeapon();
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
        var newProj = new Projectile(pX, pY, 10, null, -0.5, 0.2, this.rotationAngle, false);
        newProj.shootFrom(this, 20);
        newProj.createSprite('lightblue');
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
                messageConsole.push(color + ' Key required', color);
            }
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
