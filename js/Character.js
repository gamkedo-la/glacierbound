class Character extends GameObject {
	constructor(x, y, pic, altitude, scale, angle) {
		super(x, y, 0, pic, altitude, scale, angle);
		this.brain = new EnemyStateMachine(this);
		this.path = [];
		this.destination = {x: this.x, y: this.y}; //Next path coordinate
		this.target = null; //Target object
		this.targetVisible = false;
		this.lastKnownPosition = this.destination; //Last known position of target
		this.xv = 0;
		this.yv = 0;
		this.fov = Math.PI / 2;
		this.attackRange = TILE_SIZE * 3;
		this.lineOfSight = null;
		this.health = 100;
		this.damagedBy = false;
		this.timeToShoot = 12;
	}

	attack() {
        if (this.timeToShoot > 0) return;
        let newProj = new Projectile(this.x, this.y, 5, null, -0.5, 0.2, this.direction, false);
        newProj.shootFrom(this);
        newProj.createSprite('orange');
        objects.push(newProj);
        this.timeToShoot = 96;
		fireBallShot.play();
    }

	objectInView(what) {
		if (what === null | what.isDead) return false; 

		let deltaX = what.x - this.x;
		let deltaY = what.y - this.y;
		let dist = Math.hypot(deltaX, deltaY);
		let deltaAng = Math.atan2(deltaY, deltaX);

		this.lineOfSight = new Ray(this, deltaAng);
		this.lineOfSight.cast();
		if (this.lineOfSight.distance < dist) return false;

		deltaX /= dist;
		deltaY /= dist;
		let dotProduct = deltaX * Math.cos(this.direction) + deltaY * Math.sin(this.direction);

		if (dotProduct > 0)  {
			if (dotProduct > Math.cos(this.fov/2)) {
				return true;
			} else return false;
		}
		else return false;
	}

	distToTarget() {
		if (!this.target) return Infinity;
		else if (this.target === player) return this.distance;
		else return Math.hypot(this.x - this.target.x, this.y - this.target.y);
	}

	pathToTarget() {
		let targetIndex = mapTileToIndex(Math.floor(this.lastKnownPosition.x / TILE_SIZE), Math.floor(this.lastKnownPosition.y / TILE_SIZE));
		let startIndex = mapTileToIndex(Math.floor(this.x / TILE_SIZE), Math.floor(this.y / TILE_SIZE));
		this.path = breadthFirstSearch(startIndex, targetIndex, currentLevel.mapGrid);
	}

	takeDamage(howMuch, from) {
		this.health -= howMuch;
		this.damagedBy = from;
	}

	move() {
		this.xv = Math.cos(this.direction) * this.moveSpeed;
		this.yv = Math.sin(this.direction) * this.moveSpeed;

		let deltaX = this.destination.x - this.x;
		let deltaY = this.destination.y - this.y;

		if (Math.abs(this.xv) > Math.abs(this.deltaX)) this.xv = deltaX;
		else if (!objectMapCollision(this.x + this.xv, this.y, this.radius)) this.x += this.xv;

		if (Math.abs(this.yv) > Math.abs(this.deltaY)) this.yv = deltaY;
		else if (!objectMapCollision(this.x, this.y + this.yv, this.radius)) this.y += this.yv;
	}

	update() {
		this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
		this.renderedThisFrame = false;
		if (this.health <= 0) this.die();
		if (this.timeToShoot > 0) this.timeToShoot--;
		this.brain.update();
		this.move();
	}

	drawLabels(screenX, screenY, height) {

		if (debugModeEnabled === false) return;

        let drawHeight = height / 4;
        canvasContext.font =  drawHeight + 'px Arial';
		canvasContext.textAlign = 'center';
		canvasContext.fillStyle = 'yellow';
        canvasContext.fillText(this.brain.currentState.name, screenX, screenY - drawHeight); 
    }

	draw2D() {

		if (debugModeEnabled === false) return;

		super.draw2D();
		if (this.path) {
			for (let p of this.path) {
				let x = (p % MAP_NUM_COLS);
				let y = ((p - x) / MAP_NUM_COLS) * TILE_SIZE;
				x *= TILE_SIZE;
				colorRect(x * MINIMAP_SCALE_FACTOR, y * MINIMAP_SCALE_FACTOR, TILE_SIZE * MINIMAP_SCALE_FACTOR, TILE_SIZE * MINIMAP_SCALE_FACTOR, 'orange');
			}
		}
		if (this.lineOfSight) this.lineOfSight.draw();
	}
}