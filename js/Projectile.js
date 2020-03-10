class Projectile extends GameObject{
    constructor(x, y, speed, pic, altitude, scale, angle) {
        super(x, y, speed, pic, altitude, scale, angle);
        this.lifeTime = 120;
    }

    update() {
        super.update();
        if (isWallTileAtPixelCoord(this.x, this.y)) this.die();
        else {
            this.lifeTime--;
            if (this.lifeTime < 0) this.die();
        }
    }
}