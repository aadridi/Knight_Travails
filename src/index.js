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
	// 1. Réinitialiser les états des Squares de board
	board.forEach((row) =>
		row.forEach((square) => {
			square.visited = false;
			square.parent = null;
		})
	);

	const startingSquare = board[start[0]][start[1]];
	const endingSquare = board[end[0]][end[1]];

	// On marque seulement le départ comme visité
	startingSquare.visited = true;

	// La file d'attente (Queue)
	let queue = [];
	queue.push(startingSquare);

	// Variable pour stocker le carré final quand on le trouve
	let targetSquare = null;

	// --- ALGORITHME BFS ---
	while (queue.length > 0) {
		// On retire le premier élément de la file (FIFO)
		const currentSquare = queue.shift();

		// Est-ce qu'on est arrivé ?
		if (currentSquare.x === endingSquare.x && currentSquare.y === endingSquare.y) {
			targetSquare = currentSquare;
			break; // On sort de la boucle while car on a trouvé le plus court chemin
		}

		// Sinon, on trouve les prochains mouvements possibles
		const validMoves = knightMoves(currentSquare.x, currentSquare.y);

		validMoves.forEach(([nx, ny]) => {
			const neighbor = board[nx][ny];

			// Si le voisin n'a pas été visité, on l'ajoute à la file
			if (!neighbor.visited) {
				neighbor.visited = true;
				neighbor.parent = currentSquare;
				queue.push(neighbor);
			}
		});
	}

	// --- RECONSTRUCTION DU CHEMIN ---
	// On part de la fin et on remonte via les parents
	let path = [];
	let current = targetSquare;

	while (current !== null) {
		// On ajoute les coordonnées au début du tableau path
		path.unshift([current.x, current.y]);
		current = current.parent;
	}

	// On retourne le chemin complet (ex: [[0,0], [1,2], ...])
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(move => {
        console.log(move);
    });
    return path;
}


console.log(findShortestPath([3, 3], [4, 3]));