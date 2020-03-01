class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 5;
        this.keyHeld_Forward = false;
        this.keyHeld_Backward = false;
        this.keyHeld_TurnLeft = false;
        this.keyHeld_TurnRight = false;
        this.keyHeld_Strafe = false;
        this.keyHeld_Fire = false;
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 4.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
        this.rays = [];
        this.moveSway = 0;
    }

    update() {
        this.updatePosition();
        this.castAllRays();

        if (this.keyHeld_Fire){
            this.fireProjectile();
        }
    }

    updatePosition() {
        if (mouseEnabled) this.updateMouse();
        let newX = 0, 
            newY = 0;
        if (this.keyHeld_TurnLeft) {
            if (this.keyHeld_Strafe) newY -= 1;
            else this.rotationAngle -= this.rotationSpeed;
        }
        if (this.keyHeld_TurnRight) {
            if (this.keyHeld_Strafe) newY += 1;
            else this.rotationAngle += this.rotationSpeed;
        }
        if (this.keyHeld_Forward) newX += 1;
        if (this.keyHeld_Backward) newX -= 1;

        if (newX === 0 && newY === 0) return;
        this.moveSway += Math.PI/15;
        this.moveSway %= Math.PI * 4;
        
        let moveAng = this.rotationAngle + Math.atan2(newY, newX);
        let movePos = getPixelCoordFromAngleAndSpeed(this.x, this.y, moveAng, this.moveSpeed);
        if (!isWallTileAtPixelCoord(movePos[0], movePos[1])) {
            this.x = movePos[0];
            this.y = movePos[1];
        }

    }

    fireProjectile(){
        var newProj = new Projectile(this.x, this.y, 10, mapWallTex, -0.3, 0.2, this.rotationAngle);
        console.log(newProj.direction);
        projectiles.push(newProj);
        if (projectiles.length > 10){
            projectiles.shift;
        }
    }

    updateMouse() {
        player.rotationAngle += mouseDelta.x * (Math.PI/180) * MOUSE_SENS;

        mouseDelta.x = 0;
        mouseDelta.y = 0;
    }

    draw() {
        this.rays.forEach(element => element.draw());
        colorCircle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.radius * MINIMAP_SCALE_FACTOR, 'red');
    }

    drawHands() {
        let xOffset = Math.sin(this.moveSway/2) * 40,
            yOffset = Math.sin(this.moveSway) * 30;
        canvasContext.drawImage(leftHandPic, 0, 0, 330, 200, xOffset, canvas.height-160 + yOffset, 330, 200);
        canvasContext.drawImage(rightHandPic, 0, 0, 330, 200,canvas.width-330 + xOffset, canvas.height-160 + yOffset, 330, 200);
    }

    setupControls(forwardKey, backKey, leftKey, rightKey, strafeKey, fireKey) {
        this.controlKeyForForward = forwardKey;
        this.controlKeyForBackward = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
        this.controlKeyForStrafe = strafeKey;
        this.controlKeyForFire = fireKey;
    }

    castAllRays() {

        var rayAngle = this.rotationAngle - (FOV_RADS / 2);
        this.rays = [];

        for (var i = 0; i < NUM_OF_RAYS; i++) {
            var ray = new Ray(rayAngle);
            ray.columnID = i;
            ray.cast();
            this.rays.push(ray);

            rayAngle += RAY_ANGLE_INCREMENT;
        }

        //re-sorts list of rays from furthest to closest to the player
        this.rays.sort((a, b) => (a.distance < b.distance) ? 1 : -1);

    }
}
