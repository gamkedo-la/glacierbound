class Projectile extends GameObject {
    constructor(x, y, speed, pic, altitude, scale, angle, variable_Height) {
        super(x, y, speed, pic, altitude, scale, angle);
        this.lifeTime = 120;
        this.hasShadow = false;
        this.variableHeight = variable_Height;
    }

    update() {
        super.update();
        if (objectMapCollision(this.x, this.y, this.radius)) this.die();
        else {
            this.lifeTime--;
            if (this.lifeTime < 0) this.die();
        }

        if(this.variableHeight){
            this.altitude += ((Math.random() - .5 ) / 5);
        }
    }

    updateCollision(other) {
        if (this.owner === other) return;
        if (other.takeDamage != undefined) {
            other.takeDamage(20, this.owner);
            this.die();
        }
    }

    shootFrom(owner) {
        this.owner = owner;
    }
}