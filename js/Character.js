class Character extends GameObject {
	constructor(x, y, pic, projectile_pic, altitude, scale, angle, health = 100, timeToShoot = 96) {
		super(x, y, 0, pic, altitude, scale, angle);
		if (this.pic) this.damagedPic = this.createTint('red');
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
		this.health = health;
		this.damagedBy = false;
		this.justDamaged = 0; //overlay cooldown
		this.initialTimeToShoot = timeToShoot;
		this.timeToShoot = timeToShoot;
		this.projPic = projectile_pic;
	}

	attack() {
        if (this.timeToShoot > 0) return;
        let newProj = new Projectile(this.x, this.y, 5, this.projPic, -0.5, 0.2, this.direction, false);
        newProj.shootFrom(this, 20);
        objects.push(newProj);
        this.timeToShoot = this.initialTimeToShoot;
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

	die() {
		this.isDying = true;
	}

	distToTarget() {
		if (!this.target) return Infinity;
		else if (this.target === player) return this.distance;
		else return Math.hypot(this.x - this.target.x, this.y - this.target.y);
	}

	draw() {
		if (this.isDying)  {
			super.draw();
			return;
		}
		const srcPic = this.pic;
		this.pic = this.justDamaged ? this.damagedPic : this.pic;
		super.draw();
		if (this.pic != srcPic) this.pic = srcPic;
	}

	pathToTarget() {
		let targetIndex = mapTileToIndex(Math.floor(this.lastKnownPosition.x / TILE_SIZE), Math.floor(this.lastKnownPosition.y / TILE_SIZE));
		let startIndex = mapTileToIndex(Math.floor(this.x / TILE_SIZE), Math.floor(this.y / TILE_SIZE));
		this.path = breadthFirstSearch(startIndex, targetIndex, currentLevel.mapGrid);
	}

	takeDamage(howMuch, from) {
		if (this.isDying) return;
		this.justDamaged = 6;
		this.health -= howMuch;
		this.damagedBy = from;
		if (this.health <= 0) {
			currentLevel.stats.enemiesKilled++;
			this.die();
		} else {
			soundMonster3.play();
		}

	}

	move() {
		if (this.isDead || this.isDying) return;
		this.xv = Math.cos(this.direction) * this.moveSpeed;
		this.yv = Math.sin(this.direction) * this.moveSpeed;

		let deltaX = this.destination.x - this.x;
		let deltaY = this.destination.y - this.y;

		if (Math.abs(this.xv) > Math.abs(this.deltaX)) this.xv = deltaX;
		if (Math.abs(this.yv) > Math.abs(this.deltaY)) this.yv = deltaY;

		if (!objectMapCollision(this.x + this.xv, this.y, this.radius)) this.x += this.xv;
		if (!objectMapCollision(this.x, this.y + this.yv, this.radius)) this.y += this.yv;
	}

	update() {
		this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
		this.renderedThisFrame = false;
		if (this.justDamaged) this.justDamaged--;
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