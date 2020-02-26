class GameObject {
    constructor(x, y, pic, altitude, scale) {
        this.x = x;
        this.y = y;
        this.altitude = altitude ? altitude : 0; //screen y offset
        this.pic = pic;
        this.scale = scale ? scale : 1; //multiple of draw height/width
        this.distance = 0; //distance to player
        this.renderedThisFrame = false;

        this.fwdMove = true; //for test movement code
    }

    update() {
        this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
        this.renderedThisFrame = false;

        //test code to simulate movement
        if (this.x < 100) {
            this.fwdMove = true;
        } else if (this.x > 700) {
            this.fwdMove = false;
        }
        this.fwdMove?this.x += 2:this.x -= 2;

    }

    draw() {
        if (!this.renderedThisFrame) {
            let distanceProjectionPlane = (canvas.width / 2) / Math.tan(FOV_RADS / 2);//This only changes if canvas width or FOV changes
            let dist = this.distance;
            let drawAngle = Math.atan2(this.y - player.y, this.x - player.x) - player.rotationAngle;

            let size = Math.cos(drawAngle);
            if (size <= Math.cos(FOV_RADS)) return;

            let drawHeight = (TILE_SIZE / dist) * distanceProjectionPlane;
            let drawWidth = (this.pic.width / this.pic.height) * drawHeight;
            let drawX = canvas.width / 2 + Math.tan(drawAngle) * distanceProjectionPlane;
            let drawY = (canvas.height / 2) - (drawHeight / 2) - (drawHeight * this.altitude);

            canvasContext.drawImage(this.pic, 0, 0, this.pic.width, this.pic.height, drawX - drawWidth / 2, drawY, drawWidth * this.scale, drawHeight * this.scale);

            this.renderedThisFrame = true;
        }
    }
}