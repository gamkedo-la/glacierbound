class Ray {
    constructor(origin, rayAngle) {
        this.origin = origin;
        this.angle = normalizeAngle(rayAngle);
        this.wallHitHorX = 0;
        this.wallHitHorX = 0;
        this.wallHitVertX = 0;
        this.wallHitVertY = 0;
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;
        this.isFacingDown = this.angle > 0 && this.angle < Math.PI;
        this.isFacingUp = !this.isFacingDown;
        this.isFacingRight = this.angle > 1.5 * Math.PI || this.angle < 0.5 * Math.PI;
        this.isFacingLeft = !this.isFacingRight;
        this.wasHitVertical = false;
        this.columnID = 0;
    }

    cast() {

        var xHorIntercept, yHorIntercept;
        var xVertIntercept, yVertIntercept;
        var xStep = 0;
        var yStep = 0;

        //Horizonal Ray Grid Intersection
        var foundHorWallHit = false;
        this.wallHitHorX = -1000;
        this.wallHitHorX = -1000;

        //Find the y-Coord of the closest horizontal grid intersection
        yHorIntercept = Math.floor(this.origin.y / TILE_SIZE) * TILE_SIZE;
        if (this.isFacingDown) {
            yHorIntercept += TILE_SIZE;
        }
        //Find the x-Coord of the closest horizontal grid intersection
        xHorIntercept = this.origin.x + ((yHorIntercept - this.origin.y) / Math.tan(this.angle));

        //calc the increment xStep and yStep
        yStep = TILE_SIZE;
        if (this.isFacingUp) {
            yStep *= -1;
        }

        xStep = TILE_SIZE / Math.tan(this.angle);
        if (this.isFacingLeft && xStep > 0) {
            xStep *= -1;
        }
        if (this.isFacingRight && xStep < 0) {
            xStep *= -1;
        }

        var nextHorTouchX = xHorIntercept;
        var nextHorTouchY = yHorIntercept;

        if (this.isFacingUp) {
            nextHorTouchY--;
        }

        //increment xStep and yStep until it finds a wall
        while (nextHorTouchX >= 0 && nextHorTouchX < (TILE_SIZE * MAP_NUM_COLS) && nextHorTouchY >= 0 && nextHorTouchY < TILE_SIZE * MAP_NUM_ROWS) {
            if (isWallTileAtPixelCoord(nextHorTouchX, nextHorTouchY)) {
                let index = mapTileToIndex(Math.floor(nextHorTouchX / TILE_SIZE), Math.floor(nextHorTouchY / TILE_SIZE));
                if (Math.floor(currentLevel.mapGrid[index]) === GRID_DOOR && (nextHorTouchX + xStep/2) % TILE_SIZE > currentLevel.doorOffsets[index]) {
                    nextHorTouchX += xStep;
                    nextHorTouchY += yStep;
                } else {
                    foundHorWallHit = true;
                    this.wallHitHorX = nextHorTouchX;
                    this.wallHitHorY = nextHorTouchY;
                    if (Math.floor(currentLevel.mapGrid[index]) === 2) {
                        this.wallHitHorX += xStep/2;
                        this.wallHitHorY += yStep/2;
                    }
                    break;
                }
            } else {
                nextHorTouchX += xStep;
                nextHorTouchY += yStep;
            }
        }

        //Vertical Intercept
        var foundVertWallHit = false;
        this.wallHotVertX = -1000;
        this.wallHitVertY = -1000;

        //Find the x-Coord of the closest vertical grid intersection
        xVertIntercept = Math.floor(this.origin.x / TILE_SIZE) * TILE_SIZE;
        if (this.isFacingRight) {
            xVertIntercept += TILE_SIZE;
        }

        //Find the y-Coord of the closest vertical grid intersection
        yVertIntercept = this.origin.y + ((xVertIntercept - this.origin.x) * Math.tan(this.angle));

        //calc the increment xStep and yStep
        xStep = TILE_SIZE;
        if (this.isFacingLeft) {
            xStep *= -1;
        }

        yStep = TILE_SIZE * Math.tan(this.angle);
        if (this.isFacingUp && yStep > 0) {
            yStep *= -1;
        }
        if (this.isFacingDown && yStep < 0) {
            yStep *= -1;
        }

        var nextVertTouchX = xVertIntercept;
        var nextVertTouchY = yVertIntercept;

        if (this.isFacingLeft) {
            nextVertTouchX--;
        }

        //increment xStep and yStep until it finds a wall
        while (nextVertTouchX >= 0 && nextVertTouchX < (TILE_SIZE * MAP_NUM_COLS) && nextVertTouchY >= 0 && nextVertTouchY < (TILE_SIZE * MAP_NUM_ROWS)) {
            if (isWallTileAtPixelCoord(nextVertTouchX, nextVertTouchY)) {
                let index = mapTileToIndex(Math.floor(nextVertTouchX / TILE_SIZE), Math.floor(nextVertTouchY / TILE_SIZE));
                if (Math.floor(currentLevel.mapGrid[index]) === GRID_DOOR && (nextVertTouchY + yStep/2) % TILE_SIZE > currentLevel.doorOffsets[index]) {
                    nextVertTouchX += xStep;
                    nextVertTouchY += yStep;
                } else {
                    foundVertWallHit = true;
                    this.wallHitVertX = nextVertTouchX;
                    this.wallHitVertY = nextVertTouchY;
                    if (Math.floor(currentLevel.mapGrid[index]) === 2) {
                        this.wallHitVertX += xStep/2;
                        this.wallHitVertY += yStep/2;
                    }
                    break;
                }
            } else {
                nextVertTouchX += xStep;
                nextVertTouchY += yStep;
            }
        }

        //Calculate both hor and vert distances and choose the smallest value
        var horHitDist = DistanceBetweenTwoPixelCoords(this.origin.x, this.origin.y, this.wallHitHorX, this.wallHitHorY);
        var vertHitDist = DistanceBetweenTwoPixelCoords(this.origin.x, this.origin.y, this.wallHitVertX, this.wallHitVertY);
        
        if (horHitDist < vertHitDist){
            this.distance = horHitDist;
            this.wallHitX = this.wallHitHorX;
            this.wallHitY = this.wallHitHorY;
            this.wasHitVertical = false;
        } else {
            this.distance = vertHitDist;
            this.wallHitX = this.wallHitVertX;
            this.wallHitY = this.wallHitVertY;
            this.wasHitVertical = true;
        }

    }

    draw() {
        colorLine(this.origin.x * MINIMAP_SCALE_FACTOR, this.origin.y * MINIMAP_SCALE_FACTOR, this.wallHitX * MINIMAP_SCALE_FACTOR, this.wallHitY * MINIMAP_SCALE_FACTOR, "red");
    }

}