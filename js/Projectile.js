class Projectile extends GameObject{
    constructor(x, y, speed, pic, altitude, scale, angle) {
        super(x, y, speed, pic, altitude, scale, angle);
        this.isFacingDown = this.direction > 0 && this.direction < Math.PI;
        this.isFacingUp = !this.isFacingDown;
        this.isFacingRight = this.direction > 1.5 * Math.PI || this.direction < 0.5 * Math.PI;
        this.isFacingLeft = !this.isFacingRight;
    }

    projUpdate(){
        //TODO
    }
}