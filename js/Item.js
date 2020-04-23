class Item extends GameObject {
    constructor(x, y, altitude, scale, angle, type) {
        super(x, y, 0, null, altitude, scale, angle);
        this.type = type;
        this.touched = false;
        this.setSprite(type);
        this.createTint(currentLevel.colors.sky);
    }

    activate() {
        if (!this.touched) {
            currentLevel.stats.itemsCollected++;
            this.touched = true;
        }

        switch(this.type) {
            case 'health':
                if (player.health === player.maxHealth) return;
                messageConsole.push('Health Pack acquired. Press Z to use.', 'pink');
                player['health'] += 15;
                if (player.health > player.maxHealth){
                    player.health = player.maxHealth;
                }
                break;
            case 'armor':
                if (player.armor === player.maxArmor) return;
                messageConsole.push('Armor acquired. Press X to activate.', 'lightblue');
                player['armor'] += 15;
                if (player.armor > player.maxArmor){
                    player.armor = player.maxArmor;
                }
                break;
            case 'blue key':
                messageConsole.push('Blue Key acquired.', 'lightblue');
                player.keys[0] = true;
                break;
            case 'red key':
                messageConsole.push('Red Key acquired.', 'red');
                player.keys[1] = true;
                break;
            case 'green key':
                messageConsole.push('Green Key acquired.', 'green');
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
                this.pic = spriteList['healthpickup'];
                break;
            case 'armor':
                this.pic = spriteList['armorpickup'];
                break;
            case 'blue key':
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