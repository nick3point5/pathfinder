import './Grid.css'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Node } from '@/components'
import { dijkstra, generateGrid, getPath } from '@/modules'

export function Grid(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [rows, setRows] = useState(20)
	const [columns, setColumns] = useState(50)
	const [grid, setGrid] = useState(generateGrid(start, end, rows, columns))

	function runDijkstra() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedOrder = dijkstra(grid, startNode, endNode)
		const pathOrder = getPath(endNode)
		animate(visitedOrder, pathOrder, 100)
	}

	function animate(visitedOrder, pathOrder, speedFactor) {
		const speed = 20/speedFactor
		for (let i = 0; i < visitedOrder.length; i++) {
			setTimeout(() => {
				const node = visitedOrder[i]
				const element = node.element.current
				element.classList.add('node-visited')
			}, speed * i)
		}
		for (let i = 0; i < pathOrder.length; i++) {
			setTimeout(() => {
				const node = pathOrder[i]
				const element = node.element.current
				element.classList.add('node-path')
			}, speed * (i + visitedOrder.length))
		}
	}

	function resetGrid() {
		grid.forEach(rows => {
			rows.forEach(node => {
				node.element.current.classList.remove('node-visited')
				node.element.current.classList.remove('node-path')
			})
		})
		const freshGrid = generateGrid(start, end, rows, columns)

		setGrid(freshGrid)
	}

	return (
		<div className='Grid'>
			<div className='node-grid'>
				{grid.map((row, rowIdx) => {
					return (
						<div className='grid-row' key={rowIdx}>
							{row.map((node, nodeIdx) => {
								const { isStart, isEnd } = node
								return <Node key={nodeIdx} node={node} />
							})}
						</div>
					)
				})}
			</div>
			<button onClick={runDijkstra}>Dijkstra</button>
			<button onClick={resetGrid}>
        Reset
      </button>
		</div>
	)
}
