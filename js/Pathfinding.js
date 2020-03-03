function breadthFirstSearch(start, goal, graph) {
	let frontier = [];
	frontier.push(start);
    
    let cameFrom = []
	cameFrom.length = 0;
	cameFrom[start] = null;

	while (frontier.length > 0) {
		let current = frontier[0],
			currentNeighbors = getNeighborsBF(current, graph, false);

		for (let i = 0; i < currentNeighbors.length; i++) {
			if (cameFrom[currentNeighbors[i]] === undefined) {
				frontier.push(currentNeighbors[i]);
				cameFrom[currentNeighbors[i]] = current;
			}
		}
		frontier.shift();
	}
	return getPath(start, goal, cameFrom);
}

function getPath(start, goal, searchGraph) {
	let current = goal;
	path = [];

	while (current != start) {
		path.push(current);
		current = searchGraph[current];
	}

	return path;
}

function getNeighborsBF(index, grid, diagonal) {
    let neighbors = [];

    for (let i = -1; i < 2; i++) {
        for (let e = -1; e < 2; e++) {
            //Skip corners if not diagonal
            if (!diagonal && Math.abs(i) == 1 && Math.abs(e) == 1) {
                continue;
            }

            let neighbor = index + e + (i * MAP_NUM_COLS);
            //Continue to next iteration if neighbor is outside of array
            if (neighbor < 0 || neighbor > grid.length - 1 || grid[neighbor] > 0) {
                continue;
            }

            if (neighbor % MAP_NUM_COLS >= 0 && neighbor % MAP_NUM_COLS < MAP_NUM_COLS && neighbor != index) {
                if (Math.floor(neighbor / MAP_NUM_COLS) == Math.floor(index / MAP_NUM_COLS) + i) {
                    neighbors.push(neighbor);
                }

            }
        }
    }
    return neighbors;
}