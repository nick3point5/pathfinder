import './PathFindingVisualizer.css'
import { useEffect, useState } from 'react'
import { Node } from '@/components'
import { dijkstra } from '@/modules'

function nodesInit(start, end) {
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
		}
	}

	for (let row = 0; row < rows; row++) {
		const currentRow = []
		for (let column = 0; column < columns; column++) {
			const currentNode = new PathNode(row, column)
			currentRow.push(currentNode)
		}
		grid.push(currentRow)
	}

	return grid
}

export function PathFindingVisualizer(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [grid, setGrid] = useState(nodesInit(start, end))

	function runDijkstra() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
	}

	useEffect(() => {
		runDijkstra()
	}, [])

	return (
		<div className={`PathFindingVisualizer`}>
			<div className='grid'>
				{grid.map((row, rowIdx) => {
					return (
						<div className='grid-row' key={rowIdx}>
							{row.map((node, nodeIdx) => {
								const { isStart, isEnd } = node
								return <Node key={nodeIdx} isStart={isStart} isEnd={isEnd} />
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}
