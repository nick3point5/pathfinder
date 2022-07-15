import { useRef } from 'react'

export function  generateGrid(start, end) {
	const grid = []
	const rows = 20
	const columns = 50
	class PathNode {
		constructor(row, column) {
			this.row = row
			this.column = column
			this.isStart = row === start[0] && column === start[1]
			this.isEnd = row === end[0] && column === end[1]
			this.distance = Infinity
			this.isVisited = false
			this.isWall = false
			this.previousNode = null
			this.neighbors = []
			// this.element = useRef(null)
		}
	}

	// create nodes
	for (let row = 0; row < rows; row++) {
		const currentRow = []
		for (let column = 0; column < columns; column++) {
			const currentNode = new PathNode(row, column)
			currentRow.push(currentNode)
		}
		grid.push(currentRow)
	}

	// link nodes
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
			const currentNode = grid[row][column]
			//add right neighbor
			if (column < columns) {
				const right = grid[row][column + 1]
				currentNode.neighbors.push(right)
			}
			//add bottom neighbor
			if (row < rows - 1) {
				const bottom = grid[row + 1][column]
				currentNode.neighbors.push(bottom)
			}
			//add left neighbor
			if (column > 0) {
				const left = grid[row][column - 1]
				currentNode.neighbors.push(left)
			}
			//add top neighbor
			if (row > 0) {
				const top = grid[row - 1][column]
				currentNode.neighbors.push(top)
			}
		}
	}

	return grid
}