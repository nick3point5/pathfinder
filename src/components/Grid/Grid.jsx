import './Grid.css'
import { useEffect, useState } from 'react'
import { Node } from '@/components'
import { dijkstra, generateGrid, getShortestPath } from '@/modules'

export function Grid(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [grid, setGrid] = useState(generateGrid(start, end))

	function runDijkstra() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
		const shortestPathOrder = getShortestPath(endNode)
		console.log(visitedNodesInOrder)
	}

	useEffect(() => {
		const path = runDijkstra()
	}, [])

	return (
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
	)
}
