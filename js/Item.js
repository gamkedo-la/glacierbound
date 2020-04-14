class Item extends GameObject {
    constructor(x, y, altitude, scale, angle, type) {
        super(x, y, 0, null, altitude, scale, angle);
        this.type = type;
        this.setSprite(type);
        this.createTint(currentLevel.colors.sky);
    }

    activate() {
        switch(this.type) {
            case 'health':
                if (player.health === player.maxHealth) return;
                player['health'] += 15;
                if (player.health > player.maxHealth){
                    player.health = player.maxHealth;
                }
                break;
            case 'armor':
                if (player.armor === player.maxArmor) return;
                player['armor'] += 15;
                if (player.armor > player.maxArmor){
                    player.armor = player.maxArmor;
                }
                break;
            case 'blue key':
                player.keys[0] = true;
                break;
            case 'red key':
                player.keys[1] = true;
                break;
            case 'green key':
                player.keys[2] = true;
                break;
            default:
                break;
        }
        this.die();
    }

    updateCollision(other) {
        if (other === player) this.activate();
    }

    setSprite(type) {
        switch(type) {
            case 'health':
                this.createSprite('green');
                break;
            case 'armor':
                this.createSprite('skyblue');
                break;
            case 'yellow key':
                this.pic = spriteList['blueKey'];
                break;
            case 'red key':
                this.pic = spriteList['redKey'];
                break;
            case 'green key':
                this.pic = spriteList['greenKey'];
                break;
            default:
                break;
        }
    }

    setType(type) {
        if (type === undefined || type === null) {
            this.type = 'health'
        } else this.type = type;
    }
}