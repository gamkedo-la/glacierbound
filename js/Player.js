class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 5;
        this.turnDirection = 0; // -1 if left, +1 if right
        this.walkDirection = 0; // -1 if back, +1 if forward
        this.keyHeld_Forward = false;
        this.keyHeld_Backward = false;
        this.keyHeld_TurnLeft = false;
        this.keyHeld_TurnRight = false;
        this.keyHeld_Strafe = false;
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 4.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
        this.rays = [];
    }

    update() {
        this.updatePosition();
        this.castAllRays();
    }

    updatePosition() {
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
        
        let moveAng = this.rotationAngle + Math.atan2(newY, newX);
        let movePos = getPixelCoordFromAngleAndSpeed(this.x, this.y, moveAng, this.moveSpeed);
        if (!isWallTileAtPixelCoord(movePos[0], movePos[1])) {
            this.x = movePos[0];
            this.y = movePos[1];
        }
    }

    draw() {
        this.rays.forEach(element => element.draw());
        colorCircle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.radius * MINIMAP_SCALE_FACTOR, 'red');
        //colorLineAtAngle(this.x, this.y, this.rotationAngle, 20, "red");
    }

    setupControls(forwardKey, backKey, leftKey, rightKey, strafeKey) {
        this.controlKeyForForward = forwardKey;
        this.controlKeyForBackward = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
        this.controlKeyForStrafe = strafeKey;
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
