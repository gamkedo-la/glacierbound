class Item extends GameObject {
    constructor(x, y, altitude, scale, angle, type) {
        super(x, y, 0, null, altitude, scale, angle);
        this.type = type;
        this.touched = false;
        this.setSprite(type);
        this.bobTimer = 0;
        this.tint = this.createTint(currentLevel.colors.sky);
    }

    activate() {
        if (!this.touched) {
            currentLevel.stats.itemsCollected++;
            this.touched = true;
        }

        switch(this.type) {
            case 'health':
                player.healthPickup++;
                messageConsole.push('Health Pack acquired. Press 1 to use.', 'pink');
                break;
            case 'armor':
                player.armorPickup++;
                messageConsole.push('Shield acquired. Press 2 to activate.', 'lightblue');
                break;
            case 'blue key':
                messageConsole.push('Blue Key acquired.', 'blue');
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
            case 'boost1':
                player.dBoost1Pickup++;
                messageConsole.push('Damage Boost Type 1 acquired. Press 3 to use.', 'coral');
                break;
            case 'boost2':
                player.dBoost2Pickup++;
                messageConsole.push('Damage Boost Type 2 acquired. Press 4 to activate.', 'hotpink');
                break;
            default:
                break;
        }
        
        this.die();
    }

    draw() {
        const altitude = this.altitude;
        if (this.isBobEnabled()) {
            this.bobTimer++;
            if (this.bobTimer > 100) {
                this.bobTimer = 0;
            }
            this.altitude += Math.cos(this.bobTimer/100 * Math.PI * 2) / 8;
        }
        
        canvasContext.imageSmoothingEnabled = false;
        super.draw();
        canvasContext.imageSmoothingEnabled = true;

        this.altitude = altitude;
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
            case 'boost1':
                this.pic = spriteList['damageboost1pickup'];
                break;
            case 'boost2':
                this.pic = spriteList['damageboost2pickup'];
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

    isBobEnabled() {
        return this.type === 'blue key' || this.type === 'red key' || this.type === 'green key';
    }
}