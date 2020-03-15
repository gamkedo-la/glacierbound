class GameObject {
    constructor(x, y, speed, pic, altitude, scale, angle) {
        this.x = x;
        this.y = y;
        this.direction = angle;
        this.radius = 5;
        this.moveSpeed = speed;
        this.altitude = altitude ? altitude : 0; //screen y offset
        this.pic = pic;
        this.scale = scale ? scale : 1; //multiple of draw height/width
        this.distance = 0; //distance to player
        this.renderedThisFrame = false;
        this.isDead = false;
        this.hasShadow = true;
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
    }

    update() {
        this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
        this.renderedThisFrame = false;

        let movePos = getPixelCoordFromAngleAndSpeed(this.x, this.y, this.direction, this.moveSpeed);

        this.x = movePos[0];
        this.y = movePos[1];
    }

    draw() {
        if (!this.renderedThisFrame) {

            let distanceProjectionPlane = (canvas.width / 2) / Math.tan(FOV_RADS / 2); //This only changes if canvas width or FOV changes
            let dist = this.distance;
            let drawAngle = Math.atan2(this.y - player.y, this.x - player.x) - player.rotationAngle;

            let size = Math.cos(drawAngle);
            if (size <= Math.cos(FOV_RADS)) return;

            let drawHeight = (TILE_SIZE / dist) * distanceProjectionPlane;
            let drawWidth = (this.pic.width / this.pic.height) * drawHeight;
            let drawX = canvas.width / 2 + Math.tan(drawAngle) * distanceProjectionPlane;
            let drawY = (canvas.height / 2) - (drawHeight / 2) - (drawHeight * this.altitude);

            if (currentLevel.isInterior === false) {
                let alpha = 1 - dist / currentLevel.visibilityDist;
                if (alpha <= 0) {
                    this.renderedThisFrame = true;
                    return;
                } else {
                    canvasContext.globalAlpha = alpha;
                }
            }

            //Draw shadow
            if (this.hasShadow) {
                canvasContext.beginPath();
                canvasContext.fillStyle = 'black';
                canvasContext.ellipse(drawX, canvas.height / 2 + drawHeight / 2, drawWidth / 2 * this.scale, drawWidth / 6 * this.scale, 0, 0, Math.PI * 2, false);
                canvasContext.fill();
            }
            canvasContext.drawImage(this.pic, 0, 0, this.pic.width, this.pic.height, drawX - (drawWidth * this.scale) / 2, drawY, drawWidth * this.scale, drawHeight * this.scale);

            this.renderedThisFrame = true;
            canvasContext.globalAlpha = 1;
        }
    }

    draw2D() {
        colorCircle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.radius * MINIMAP_SCALE_FACTOR, "yellow");
        colorLineAtAngle(this.x * MINIMAP_SCALE_FACTOR, this.y * MINIMAP_SCALE_FACTOR, this.direction, 10, 'yellow');
    }

    die() {
        this.isDead = true;
    }
}