class GameObject {
    constructor(x, y, speed, pic, altitude, scale, angle) {
        this.x = x;
        this.y = y;
        this.direction = angle;
        this.moveSpeed = speed;
        this.altitude = altitude ? altitude : 0; //screen y offset
        this.pic = pic;
        if (this.pic) this.tint = this.createTint(currentLevel.colors.sky);
        this.scale = scale ? scale : 1; //multiple of draw height/width
        this.radius = (this.scale * TILE_SIZE / 2) - 6;
        this.distance = Infinity; //distance to player
        this.isDead = false;
        this.hasShadow = true;
        this.animTimer = 0;
    }

    createSprite(color) {
        this.pic = document.createElement('canvas');
        this.pic.width = 256;
        this.pic.height = 256;
        this.pic.ctx = this.pic.getContext('2d');

        this.pic.ctx.fillStyle = color;
        this.pic.ctx.beginPath();
        this.pic.ctx.arc(128, 128, 128, 0, Math.PI * 2, true);
        this.pic.ctx.fill();
        this.tint = this.createTint(currentLevel.colors.sky);
    }

    createTint(color) {
        let buffer = document.createElement('canvas');
        buffer.width = this.pic.width;
        buffer.height = this.pic.height
        buffer.ctx = buffer.getContext('2d');
        this.setTint(buffer, color);
        return buffer;
    }

    setTint(tintCanvas, color) {
        tintCanvas.ctx.globalCompositeOperation = 'source-over';
        tintCanvas.ctx.fillStyle = color;
        tintCanvas.ctx.fillRect(0, 0, tintCanvas.width, tintCanvas.height);
        tintCanvas.ctx.globalCompositeOperation = 'destination-atop';
        tintCanvas.ctx.drawImage(this.pic, 0, 0);
    }

    update() {
        this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);

        let movePos = getPixelCoordFromAngleAndSpeed(this.x, this.y, this.direction, this.moveSpeed);
        this.x = movePos[0];
        this.y = movePos[1];
        if (this.pic.animationFrames) {
            this.animTimer += 0.1;
            if (this.animTimer > this.pic.animationFrames) {
                this.animTimer = 0;
            }
        }
    }

    updateCollision(other) {
        return;
    }

    draw() {
        let dist = this.distance;
        let deltaAng = Math.atan2(this.y - player.y, this.x - player.x)
        let drawAngle = deltaAng - player.rotationAngle;

        let size = Math.cos(drawAngle);
        if (size <= Math.cos(FOV_RADS)) return;

        let drawHeight = (TILE_SIZE / dist) * PROJECTION_PLAIN_DISTANCE;
        let drawWidth;
        if (this.pic.animationFrames || this.pic.rotationFrames) drawWidth = (this.pic.frameWidth / this.pic.frameWidth) * drawHeight;
        else drawWidth = (this.pic.width / this.pic.height) * drawHeight;
        let drawX = canvas.width / 2 + Math.tan(drawAngle) * PROJECTION_PLAIN_DISTANCE;
        let drawY = (canvas.height / 2) - (drawHeight / 2) - (drawHeight * this.altitude);

        let alpha = 0;
        if (currentLevel.visibilityDist >= dist) {
            alpha = dist / currentLevel.visibilityDist;
        } else return;

        //Draw shadow
        if (this.hasShadow) {
            canvasContext.beginPath();
            let color = alpha > 0 ? lerpRGB('rgb(0, 0, 0)', currentLevel.colors.sky, alpha): 'black';
            canvasContext.fillStyle = color;
            canvasContext.ellipse(drawX, canvas.height / 2 + drawHeight / 2, drawWidth / 2 * this.scale, drawWidth / 10 * this.scale, 0, 0, Math.PI * 2, false);
            canvasContext.fill();
        }

        if (this.pic.animationFrames || this.pic.rotationFrames) {
            //Animation Frames
            let frameX = 0; 
            if (this.pic.animationFrames) frameX = Math.floor(this.animTimer) * this.pic.frameWidth;

            //Rotation Frames
            //Calculate the difference between the angle to the camera and the object's angle of rotation
            //Subtract Math.PI to flip the deltaAng calculated earlier
            let rotationAngle = (deltaAng - Math.PI) - this.direction;
            //Add half of the division to center the range for each rotation frame
            rotationAngle += (Math.PI / this.pic.rotationFrames);
            //Convert to a range from 0 to the number of rotation frames
            let frameY = this.pic.rotationFrames ? normalizeAngle(rotationAngle) / (Math.PI*2) * this.pic.rotationFrames : 0;
            frameY = Math.floor(frameY) * this.pic.frameHeight;
            canvasContext.drawImage(this.pic, frameX, frameY, this.pic.frameWidth, this.pic.frameHeight, drawX - (drawWidth * this.scale) / 2, drawY, drawWidth * this.scale, drawHeight * this.scale);

            if (alpha > 0) {
                canvasContext.globalAlpha = alpha;
                canvasContext.drawImage(this.tint, frameX, frameY, this.pic.frameWidth, this.pic.frameHeight, drawX - (drawWidth * this.scale) / 2, drawY, drawWidth * this.scale, drawHeight * this.scale);
            }

        } else {
            canvasContext.drawImage(this.pic, 0, 0, this.pic.width, this.pic.height, drawX - (drawWidth * this.scale) / 2, drawY, drawWidth * this.scale, drawHeight * this.scale);
            if (alpha > 0) {
                canvasContext.globalAlpha = alpha;
                canvasContext.drawImage(this.tint, 0, 0, this.pic.width, this.pic.height, drawX - (drawWidth * this.scale) / 2, drawY, drawWidth * this.scale, drawHeight * this.scale);
            }
        }

        if ('drawLabels' in this) this.drawLabels(drawX, drawY, drawHeight);
        
        canvasContext.globalAlpha = 1;
    }

    draw2D() {

        if (debugModeEnabled === false) return;

        colorCircle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.radius * MINIMAP_SCALE_FACTOR, "yellow");
        colorLineAtAngle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.direction, 10, 'yellow');
    }

    die() {
        this.isDead = true;
    }
}