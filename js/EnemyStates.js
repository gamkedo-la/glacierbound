class EnemyStateMachine extends FiniteStateMachine {
	constructor(body) {
		let stateList = {'Idle': new EnemyIdleState(), 'Wandering': new EnemyWanderState(), 'Patrolling': new EnemyPatrolState(),
						'Attacking': new EnemyAttackState(), 'Searching': new EnemySearchState(), 'Dying' : new EnemyDyingState() };
		super(stateList, 'Idle');
		this.body = body;
	}

	start() {
		super.start();
	}

	update() {
		if (this.body === undefined || !this.isActive) return;
		this.currentState.run(this.body);
		let newState = this.currentState.checkConditions(this.body)
		if (newState) this.changeState(this.currentState.name, newState);
	}

	changeState(from, to) {
		console.log('Changing state from ' + from + ' to ' + to);
		if (from === to) return;
		this.currentState.onExit(this.body, to);
		this.currentState = this.states[to];
		this.currentState.onEnter(this.body, from);
	}
}

class EnemyIdleState extends State {
	constructor(name) {
		super();
		this.name = 'Idle'
	}

	onEnter(character, from) {
		return;
	}

	run(character) {
		character.moveSpeed = 0;
		character.targetVisible = character.objectInView(player);
		return;
	}

	checkConditions(character) {
		if (character.targetVisible) {
			return 'Attacking';
		}

		if (character.damagedBy) {
			return 'Searching'
		}

		else if (character.patrolPath != undefined && character.patrolPath != null) {
			return 'Patrolling';
		}

		else return false;
	}

	onExit(character, to) {
		if (to === 'Attacking') {
			character.target = player;
		}
		else if (to === 'Searching') {
			character.target = character.damagedBy;
			character.lastKnownPosition = {x: character.target.x, y: character.target.y};
		}
	}
}

class EnemyWanderState extends State {
	constructor() {
		super();
		this.changeDir = false;
		this.name = 'Wandering'
	}

	onEnter(character, from) {
		character.moveSpeed = 1;
	}

	run(character) {
		if (objectMapCollision(character.x + Math.cos(character.direction) * character.moveSpeed, character.y + Math.sin(character.direction) * character.moveSpeed, character.radius)) {
			this.changeDir = true;
		}

		if (this.changeDir) {
			let randomDir = Math.random() * (Math.PI * 2);
			character.direction = randomDir;
			this.changeDir = false;
		}

		character.targetVisible = character.objectInView(player);
	}

	checkConditions(character) {
		if (character.isDying) {
			return 'Dying';
		}

		if (character.targetVisible) {
			return 'Attacking';
		}
		if (character.damagedBy) {
			return 'Searching'
		}

		else return false;
	}

	onExit(character, to) {
		if (to === 'Attacking') {
			character.target = player;
		}
		else if (to === 'Searching') {
			character.target = character.damagedBy;
			character.lastKnownPosition = {x: character.target.x, y: character.target.y};
		}
	}
}

class EnemyPatrolState extends State {
	constructor() {
		super();
		this.name = 'Patrolling'
	}

	onEnter(character, from) {
		return;
	}

	run(character) {
		character.targetVisible = character.objectInView(player);
		return;
	}

	checkConditions(character) {
		if (character.isDying) {
			return 'Dying';
		}
		if (!character.targetVisible) {
			return 'Attacking';
		}

		else return false;
	}

	onExit(character, to) {
		return;
	}
}

class EnemyAttackState extends State {
	constructor() {
		super();
		this.name = 'Attacking'
		this.firstTimeAttacking = true;
		if(currentLevel.index == 5)
		{
			this.battleMusic = new BackgroundMusicClass("klaim-ice_wizard-battle");
			this.sound = soundWizardLaugh;
		}
		else
		{
			this.sound = soundMonster2;
		}
	}

	onEnter(character, from) {
		character.damagedBy = false;


		if(this.firstTimeAttacking)
		{
			if(currentLevel.index == 5) { // Special case for when the boss starts attacking the player for the first time
				playBGM(this.battleMusic);
			}
			character.ticksSinceLastLaugh = 0;
			this.sound.play();
		}
		this.firstTimeAttacking = false;
	}

	run(character) {
		if (character.target === null) {
			character.targetVisible = false;
			return;
		}

		character.ticksSinceLastLaugh++;
		if(character.ticksSinceLastLaugh > 4 * 60)
		{
			character.ticksSinceLastLaugh = 0;
			this.sound.play();
		}

		let deltaX = character.target.x - character.x;
		let deltaY = character.target.y - character.y;

		let deltaAng = Math.atan2(deltaY, deltaX);
		let dp = dotProduct(Math.cos(character.direction - Math.PI / 2), Math.sin(character.direction - Math.PI / 2), Math.cos(deltaAng), Math.sin(deltaAng));

		if (dp > 0) character.direction -= Math.PI / 45;
		if (dp < 0) character.direction += Math.PI / 45;

		if (Math.abs(dp) <= 0.2) {
			character.attack();
			if (character.distToTarget() > character.attackRange) {
				character.moveSpeed = 1;
			} else character.moveSpeed = 0;
		}

		character.targetVisible = character.objectInView(character.target);
	}

	checkConditions(character) {
		if (character.isDying) {
			return 'Dying';
		}
		if (character.target.isDead) {
			return 'Wandering';
		}
		if (!character.targetVisible) {
			return 'Searching';
		}
		else if (character.damagedBy && character.damagedBy != player) {
			return 'Searching';
		}
		else return false;
	}

	onExit(character, to) {
		if (to === 'Wandering') {
			character.target = null;
		}
		if (to === 'Searching') {
			if (character.damagedBy && character.damagedBy != player) character.target = character.damagedBy;
			character.lastKnownPosition = { x: character.target.x, y: character.target.y };
		}
	}
}

class EnemySearchState extends State {
	constructor() {
		super();
		this.name = 'Searching'
	}

	onEnter(character, from) {
		if (!isWallTileAtPixelCoord(character.lastKnownPosition.x, character.lastKnownPosition.y)) {
			let targetIndex = mapTileToIndex(Math.floor(character.lastKnownPosition.x / TILE_SIZE), Math.floor(character.lastKnownPosition.y / TILE_SIZE));
			let startIndex = mapTileToIndex(Math.floor(character.x / TILE_SIZE), Math.floor(character.y / TILE_SIZE));
			character.path = breadthFirstSearch(startIndex, targetIndex, currentLevel.mapGrid);

			let destination = getTileCoordinates(character.path[character.path.length - 1]);
			character.destination = { x: destination.x + TILE_SIZE / 2, y: destination.y + TILE_SIZE / 2 };
			character.path.pop();
		}
	}

	run(character) {
		let destIndex = Math.floor(character.destination.x / TILE_SIZE) + Math.floor(character.destination.y / TILE_SIZE) * MAP_NUM_COLS;
		let currentIndex = Math.floor(character.x / TILE_SIZE) + Math.floor(character.y / TILE_SIZE) * MAP_NUM_COLS;
		let deltaX = character.destination.x - character.x;
		let deltaY = character.destination.y - character.y;
		let dist = Math.hypot(deltaX, deltaY);

		deltaX /= dist;
		deltaY /= dist;

		let dp = dotProduct(Math.cos(character.direction - Math.PI / 2), Math.sin(character.direction - Math.PI / 2), deltaX, deltaY);


		if (dp > 0) character.direction -= Math.PI / 45;
		if (dp < 0) character.direction += Math.PI / 45;

		let checkIndex = Math.floor(currentLevel.mapGrid[currentIndex]) === 2 ? currentIndex : destIndex;
		if (Math.floor(currentLevel.mapGrid[checkIndex]) === 2 && currentLevel.doorOffsets[checkIndex] === 64)
			currentLevel.toggleDoor(destIndex);

		if (dist > TILE_SIZE / 4) {
			character.moveSpeed = 1;
		} else if (character.path.length > 1) {
			character.destination = getTileCoordinates(character.path[character.path.length - 1]);
			character.destination.x += TILE_SIZE / 2;
			character.destination.y += TILE_SIZE / 2;
			character.path.pop();
		} else {
			character.destination = character.lastKnownPosition;
		}

		if (character.damagedBy) {
			character.lastKnownPosition = {x: character.damagedBy.x, y: character.damagedBy.y};
			character.target = character.damagedBy;
			character.damagedBy = false;
		}

		character.targetVisible = character.objectInView(character.target);
	}

	checkConditions(character) {
		if (character.isDying) {
			return 'Dying';
		}
		if (character.target.isDead) {
			return 'Wandering';
		}
		else if (character.targetVisible) {
			return 'Attacking';
		}
		else if (character.path.length <= 1 &&
			Math.abs(character.x - character.destination.x) < TILE_SIZE / 4 &&
			Math.abs(character.y - character.destination.y) < TILE_SIZE / 4) {
			return 'Wandering'
		}
		else return false;
	}

	onExit(character, to) {
		character.path = [];
		if (character.target.isDead) character.target = null;
	}
}

class EnemyDyingState extends State {
	constructor() {
		super();
		this.name = 'Dying';
		this.sound = soundMonster4;
	}
	onEnter(character, from) {
		character.createSprite('white');
		this.sound.play();
	}

	run(character) {
		character.scale -= 0.05;
		character.altitude -= 0.025;
		if (character.scale <= 0) character.isDead = true;
	}
	checkConditions() {
		//End state. No transitions.
		return;
	}

	onExit() {
		return;
	}
}