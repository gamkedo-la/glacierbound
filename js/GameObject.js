class GameObject {
    constructor(x, y, pic) {
        this.x = x;
        this.y = y;
        this.pic = pic;
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
            let dist = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
            let drawAngle = Math.atan2(this.y - player.y, this.x - player.x) - player.rotationAngle;

            let size = Math.cos(drawAngle);
            if (size <= Math.cos(FOV_RADS)) return;

            let drawHeight = (TILE_SIZE / dist) * distanceProjectionPlane;
            let drawWidth = (this.pic.width / this.pic.height) * drawHeight;
            let drawX = canvas.width / 2 + Math.tan(drawAngle) * distanceProjectionPlane;

            //let obstructed = this.clipSprite(drawX, dist);
            //if (!obstructed && drawX > -drawWidth && drawX <= canvas.width + drawWidth / 2) {
                canvasContext.drawImage(this.pic, 0, 0, this.pic.width, this.pic.height, drawX - drawWidth / 2, (canvas.height / 2) - (drawHeight / 2), drawWidth /2, drawHeight /2);
            //}

            this.renderedThisFrame = true;
        }
    }

    clipSprite(screenX, distance) {
        if (screenX < 0 || screenX > canvas.width) return true;
        let rayIndex = Math.floor(screenX / RAY_INCREMENT_WIDTH);
        let wallHit = player.rays[rayIndex];

        if (wallHit.distance < distance) return true; //Only checks the center point of the sprite
        else return false;

        //TO DO: Check all rays/wall strips overlapping sprite to calculate left and right edge clipping
    }
}