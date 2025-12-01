console.log('Hello World!');

class Square {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.visited = false;
		this.parent = null;
	}
}

// Creating board and populate it with Squares
const board = [];

for (let i = 0; i < 8; i++) {
	board[i] = [];

	for (let j = 0; j < 8; j++) {
		board[i][j] = new Square(i, j);
	}
}

function knightMoves(x, y) {
	const moves = [
		[x + 2, y + 1],
		[x + 2, y - 1],
		[x - 2, y + 1],
		[x - 2, y - 1],
		[x + 1, y + 2],
		[x + 1, y - 2],
		[x - 1, y + 2],
		[x - 1, y - 2],
	];

	// filtrer les mouvements hors plateau
	return moves.filter(([nx, ny]) => nx >= 0 && nx < 8 && ny >= 0 && ny < 8);
}

function findShortestPath(start, end) {
    // TBD
}