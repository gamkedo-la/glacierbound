class Character extends GameObject {
	constructor(x, y, speed, pic, altitude, scale, angle) {
		super(x, y, speed, pic, altitude, scale, angle);
		this.path = [];
		this.destination = {x: this.x, y: this.y};
		this.target = null;
		this.lastKnownPosition = null;
		this.xv = 0;
		this.yv = 0;
		this.fov = Math.PI/3;
		this.lineOfSight = null;
		this.health = 100;
	}

	aim() {
		if (this.target) {
			let targetPos = {x: this.target.x, y: this.target.y}
			if (this.lastKnownPosition != targetPos && !isWallTileAtPixelCoord(targetPos.x, targetPos.y)) {
				this.lastKnownPosition = targetPos;
				let deltaX = this.target.x - this.x;
				let deltaY = this.target.y - this.y;
				let dist = Math.hypot(deltaX, deltaY);
					
				let deltaAng = Math.atan2(deltaY, deltaX);
				this.lineOfSight = new Ray(this, deltaAng);
				this.lineOfSight.cast();

				if (this.lineOfSight.distance > dist) {
					this.path.length = 0;
				} else {
					let targetIndex = mapTileToIndex(Math.floor(this.lastKnownPosition.x / TILE_SIZE), Math.floor(this.lastKnownPosition.y / TILE_SIZE));
					let startIndex = mapTileToIndex(Math.floor(this.x / TILE_SIZE), Math.floor(this.y / TILE_SIZE));
					this.path = breadthFirstSearch(startIndex, targetIndex, grid.currentLevel);
				}
			}

			if (this.path.length > 1) {
				this.destination = getTileCoordinates(this.path[this.path.length-1]);
				this.destination.x += TILE_SIZE/2;
				this.destination.y += TILE_SIZE/2;
				this.path.pop();
			} else this.destination = targetPos;


			let deltaX = this.destination.x - this.x;
			let deltaY = this.destination.y - this.y;
			let dist = Math.hypot(deltaX, deltaY);
			let dir = this.direction - Math.PI/2;
			deltaX /= dist;
			deltaY /= dist;
			let dotProduct = deltaX * Math.cos(dir) + deltaY * Math.sin(dir);
			if (dotProduct > 0) this.direction -= Math.PI/45;
			else if (dotProduct < 0) this.direction += Math.PI/45;
			this.moveSpeed = Math.abs(dotProduct) <= this.fov/2 && dist > TILE_SIZE/2 ? 2 : 0;
		}
	}

	move() {
		this.xv = Math.cos(this.direction) * this.moveSpeed;
		this.yv = Math.sin(this.direction) * this.moveSpeed;

		if (isWallTileAtPixelCoord(this.x, this.y)) {
			let tileX = this.x - (this.x % TILE_SIZE) + TILE_SIZE/2,
				tileY = this.y - (this.y % TILE_SIZE) + TILE_SIZE/2,
				deltaAng = Math.atan2(this.y - tileY, this.x - tileX);

			this.xv = (this.xv + Math.cos(deltaAng) * this.moveSpeed)/2;
			this.yv = (this.xv + Math.sin(deltaAng) * this.moveSpeed)/2;
		}

		let deltaX = this.destination.x - this.x;
		let deltaY = this.destination.y - this.y;
		
		if (Math.abs(this.xv) > Math.abs(this.deltaX)) this.xv = deltaX;
		if (Math.abs(this.yv) > Math.abs(this.deltaY)) this.yv = deltaY;

		this.x += this.xv;
		this.y += this.yv;
	}

	update() {
		this.distance = DistanceBetweenTwoPixelCoords(this.x, this.y, player.x, player.y);
		this.renderedThisFrame = false;
		this.aim();
		this.move();
	}

	draw2D() {
		super.draw2D();
		for (let p of this.path) {
			let x = (p % MAP_NUM_COLS);
			let y = ((p - x) / MAP_NUM_COLS) * TILE_SIZE;
				x *= TILE_SIZE;
			colorRect(x * MINIMAP_SCALE_FACTOR, y * MINIMAP_SCALE_FACTOR, TILE_SIZE * MINIMAP_SCALE_FACTOR, TILE_SIZE * MINIMAP_SCALE_FACTOR, 'orange');
		}
		this.lineOfSight.draw();
	}
}