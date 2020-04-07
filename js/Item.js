class Item extends GameObject {
    constructor(x, y, speed, pic, altitude, scale, angle) {
        super(x, y, speed, pic, altitude, scale, angle);
        this.type = this.setType();
    }

    activate() {
        switch(this.type) {
            case 'health':
                player['health'] += 15;
                if (player.health > player.maxHealth){
                    player.health = player.maxHealth;
                }
                break;
            case 'armor':
                player['armor'] += 15;
                if (player.armor > player.maxArmor){
                    player.armor = player.maxArmor;
                }
                break;
            default:
                break;
        }
        this.die();
    }

    updateCollision(other) {
        if (other === player) this.activate();
    }

    setType(type) {
        if (type === undefined || type === null) {
            this.type = 'health'
        } else this.type = type;
    }
}