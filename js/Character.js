class Character extends GameObject {
	constructor(x, y, speed, pic, altitude, scale, angle) {
		super(x, y, speed, pic, altitude, scale, angle);
		this.path = [];
		this.destination = {x: this.x, y: this.y}; //Next path coordinate
		this.target = null; //Target object
		this.targetVisible = false;
		this.lastKnownPosition = this.destination; //Last known position of target
		this.xv = 0;
		this.yv = 0;
		this.fov = Math.PI / 3;
		this.attackRange = TILE_SIZE * 3;
		this.lineOfSight = null;
		this.health = 100;
	}

	search() {
		this.targetVisible = this.objectInView(player);
		if (this.targetVisible) {
			this.target = player;
			this.lastKnownPosition = {x: this.target.x, y: this.target.y};
		}

		if (this.lastKnownPosition && !isWallTileAtPixelCoord(this.lastKnownPosition.x, this.lastKnownPosition.y)) {
			this.pathToTarget();
		}

		if (this.path.length > 1) {
			this.destination = getTileCoordinates(this.path[this.path.length - 1]);
			this.destination.x += TILE_SIZE / 2;
			this.destination.y += TILE_SIZE / 2;
			this.path.pop();
		} else this.destination = this.lastKnownPosition;
	}

	aim() {
		let dotProduct;
		if (!this.targetVisible) dotProduct = this.dotProduct(this.destination);
		else dotProduct = this.targetVisible;
		
		if (dotProduct > 0) this.direction -= Math.PI / 45;
		else if (dotProduct < 0) this.direction += Math.PI / 45;

		this.moveSpeed = 0;
		let diff = this.attackRange - this.distToTarget();
		if (this.targetVisible && diff > 0) {
			this.moveSpeed = diff < 1 ? -diff : -1;
		} else if (Math.abs(dotProduct) <= this.fov / 4 && DistanceBetweenTwoGameObjects(this, this.destination) > this.radius/2) {
			this.moveSpeed = 2;
		}	
	}

	dotProduct(what) {
		let deltaX = what.x - this.x;
		let deltaY = what.y - this.y;
		let dist = Math.hypot(deltaX, deltaY);
		deltaX /= dist;
		deltaY /= dist;
		let dir = this.direction - Math.PI / 2;
		let dotProduct = deltaX * Math.cos(dir) + deltaY * Math.sin(dir);
		return dotProduct;
	}

	objectInView(what) {
		let deltaX = what.x - this.x;
		let deltaY = what.y - this.y;
		let dist = Math.hypot(deltaX, deltaY);
		let deltaAng = Math.atan2(deltaY, deltaX);

		this.lineOfSight = new Ray(this, deltaAng);
		this.lineOfSight.cast();
		if (this.lineOfSight.distance < dist) return false;

		deltaX /= dist;
		deltaY /= dist;
		let dir = this.direction - Math.PI / 2;
		let dotProduct = deltaX * Math.cos(dir) + deltaY * Math.sin(dir);

		if (Math.abs(dotProduct) <= this.fov / 2) return dotProduct;
		return false;
	}

	distToTarget() {
		if (!this.target) return Infinity;
		else if (this.target === player) return this.distance;
		else return Math.hypot(this.x - this.target.x, this.y - this.target.y);
	}

	pathToTarget() {
		if (this.targetVisible) {
			this.path.length = 0;
		} else {
			let targetIndex = mapTileToIndex(Math.floor(this.lastKnownPosition.x / TILE_SIZE), Math.floor(this.lastKnownPosition.y / TILE_SIZE));
			let startIndex = mapTileToIndex(Math.floor(this.x / TILE_SIZE), Math.floor(this.y / TILE_SIZE));
			this.path = breadthFirstSearch(startIndex, targetIndex, currentLevel.mapGrid);
		}
	}

	projectileCollision(projectile) {
		if (projectile.owner == this) return;
		//this.x += projectile.moveSpeed * Math.cos(projectile.direction) * 2;
		//this.y += projectile.moveSpeed * Math.sin(projectile.direction) * 2;
		this.health -= 20;
		this.target = projectile.owner;
		this.lastKnownPosition = {x: this.target.x, y: this.target.y};
		projectile.die();
	}

	move() {
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
		this.search();
		this.aim();
		this.move();
		if (this.health <= 0) this.die();
	}

	draw2D() {
		super.draw2D();
		for (let p of this.path) {
			let x = (p % MAP_NUM_COLS);
			let y = ((p - x) / MAP_NUM_COLS) * TILE_SIZE;
			x *= TILE_SIZE;
			colorRect(x * MINIMAP_SCALE_FACTOR, y * MINIMAP_SCALE_FACTOR, TILE_SIZE * MINIMAP_SCALE_FACTOR, TILE_SIZE * MINIMAP_SCALE_FACTOR, 'orange');
		}
		if (this.lineOfSight) this.lineOfSight.draw();
	}
}