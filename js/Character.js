class Character extends GameObject {
    constructor(x, y, speed, pic, altitude, scale, angle) {
        super(x, y, speed, pic, altitude, scale, angle);
        this.target = null;
        this.xv = 0;
        this.yv = 0
        this.fov = Math.PI/3;
    }

    aim() {
        if (this.target) {
            let deltaX = this.target.x - this.x;
            let deltaY = this.target.y - this.y;
            let dist = Math.hypot(deltaX, deltaY);
            let dir = this.direction - Math.PI/2;
            deltaX /= dist;
            deltaY /= dist;
            let dotProduct = deltaX * Math.cos(dir) + deltaY * Math.sin(dir);
            if (dotProduct > 0) this.direction -= Math.PI/180;
            else if (dotProduct < 0) this.direction += Math.PI/180;
            this.moveSpeed = Math.abs(dotProduct) <= this.fov/2 && dist >= TILE_SIZE * 2 ? 2 : 0;
        }
    }

    move() {
        this.xv = Math.cos(this.direction) * this.moveSpeed;
        this.yv = Math.sin(this.direction) * this.moveSpeed;

        this.x += this.xv;
        this.y += this.yv;
    }

    update() {
        this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
        this.renderedThisFrame = false;
        this.aim();
        this.move();
    }
}