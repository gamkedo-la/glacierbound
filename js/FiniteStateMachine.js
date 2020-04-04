class FiniteStateMachine {
	constructor(stateList, initialState) {
		this.states = stateList;
		this.currentState = stateList[initialState];
		this.isActive = true;
		this.start();
	}

	start() {
		if (this.currentState != null && this.currentState != undefined) this.isActive = true;
		this.currentState.onEnter();
	}

	update() {
		if (!this.isActive) return;
		this.currentState.run();
		let newState = this.currentState.checkConditions();
		if (newState) this.changeState(newState);
	}

	changeState(newState) {
		if (from === to) return;
		this.currentState.onExit(to);
		this.currentState = this.states[newState];
		this.currentState.onEnter(from);
	}
}

class State {
	constructor() { if (this.constructor === State) throw new Error("Can't instantiate abstract class."); }
	onEnter() { if (this.constructor === State) throw new Error("Abstract method."); }
	run() { if (this.constructor === State) throw new Error("Abstract method."); }
	checkConditions() { if (this.constructor === State) throw new Error("Abstract method."); }
	onExit() { if (this.constructor === State) throw new Error("Abstract method."); }
}