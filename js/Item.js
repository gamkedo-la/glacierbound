class Item extends GameObject {
    constructor(x, y, speed, pic, altitude, scale, angle) {
        super(x, y, speed, pic, altitude, scale, angle);
        this.type = this.setType();
    }

    activate() {
        switch(this.type) {
            case 'health':
                player['health'] += 15;
                break;
            case 'armor':
                player['armor'] += 15;
                break;
            default:
                break;
        }
        this.die();
    }

    playerCollision() {
        this.activate();
    }

    setType(type) {
        if (type === undefined || type === null) {
            this.type = 'health'
        } else this.type = type;
    }
}