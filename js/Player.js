class Player {
    constructor() {
        this.x = currentLevel.start.x;
        this.y = currentLevel.start.y;
        this.radius = 5;
        this.keyHeld_Forward = false;
        this.keyHeld_Backward = false;
        this.keyHeld_Left = false;
        this.keyHeld_Right = false;
        this.keyHeld_Fire = false;
        this.rotationAngle = currentLevel.start.direction;
        this.moveSpeed = 4.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
        this.rays = [];
        this.moveSway = 0;
        this.health = 100;
        this.armor = 0;
        this.timeToShoot = 0;
    }

    update() {
        this.updatePosition();
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

            if (sway + diff < 0 || sway + diff > Math.PI * 2) this.moveSway = 0;
            else this.moveSway += diff;
            return;
        }

        this.moveSway += Math.PI/15;
        this.moveSway %= Math.PI * 4;

        let moveAng = this.rotationAngle + Math.atan2(newY, newX);
        let movePos = getPixelCoordFromAngleAndSpeed(this.x, this.y, moveAng, this.moveSpeed);
        if (!isWallTileAtPixelCoord(movePos[0], movePos[1])) {
            this.x = movePos[0];
            this.y = movePos[1];
        }

    }

    fireWeapon() {
        if (this.timeToShoot > 0) return;

        var newProj = new Projectile(this.x, this.y, 10, null, -0.5, 0.2, this.rotationAngle, false);
        newProj.createSprite('lightblue');
        objects.push(newProj);
        this.timeToShoot = 15;
    }

    updateMouse() {
        this.rotationAngle += mouseDelta.x * (Math.PI/180) * MOUSE_SENS;

        mouseDelta.x = 0;
        mouseDelta.y = 0;
    }

    draw() {
        this.rays.forEach(element => element.draw());
        colorCircle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.radius * MINIMAP_SCALE_FACTOR, 'red');
    }

    drawHands() {
        let xOffset = Math.sin(this.moveSway/2) * 40,
            yOffset = Math.cos(this.moveSway) * 30;
        canvasContext.drawImage(spriteList['leftHand'], 0, 0, 330, 200, xOffset, canvas.height-160 + yOffset, 330, 200);
        canvasContext.drawImage(spriteList['rightHand'], 0, 0, 330, 200,canvas.width-330 + xOffset, canvas.height-160 + yOffset, 330, 200);
    }

    setupControls(forwardKey, backKey, leftKey, rightKey, fireKey) {
        this.controlKeyForForward = forwardKey;
        this.controlKeyForBackward = backKey;
        this.controlKeyForStrafeLeft = leftKey;
        this.controlKeyForStrafeRight = rightKey;
        this.controlKeyForFire = fireKey;
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
