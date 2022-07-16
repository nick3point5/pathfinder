import './Grid.css'
import { useEffect, useRef, useState } from 'react'
import { Node } from '@/components'
import { dijkstra, generateGrid, getPath } from '@/modules'

export function Grid({ isMouseDown }) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [rows, setRows] = useState(20)
	const [columns, setColumns] = useState(50)
	const [grid, setGrid] = useState(generateGrid(start, end, rows, columns))
	const isCalculated = useRef(false)
	const timeouts = useRef([])

	function runDijkstra() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedOrder = dijkstra(startNode, endNode)
		const pathOrder = getPath(endNode)
		isCalculated.current = true
		animate(visitedOrder, pathOrder, 10)
	}

	function animate(visitedOrder, pathOrder, speedFactor) {
		const speed = 20 / speedFactor
		const timeoutsArray = timeouts.current
		for (let i = 0; i < visitedOrder.length; i++) {
			const timeout = setTimeout(() => {
				const node = visitedOrder[i]
				const element = node.element.current
				element.classList.add('node-visited')
			}, speed * i)
			timeoutsArray.push(timeout)
		}
		for (let i = 0; i < pathOrder.length; i++) {
			const timeout = setTimeout(() => {
				const node = pathOrder[i]
				const element = node.element.current
				element.classList.add('node-path')
			}, speed * (i + visitedOrder.length))
			timeoutsArray.push(timeout)
		}
	}

	function resetGrid() {
		while(!timeouts.current.length) {
			const timeout = timeouts.current.pop()
			clearTimeout(timeout)
		}

		grid.forEach((rows) => {
			rows.forEach((node) => {
				const element = node.element.current
				element.classList.remove('node-visited')
				element.classList.remove('node-path')
				element.classList.remove('wall')

				node.isWall = false
			})
		})

		const freshGrid = generateGrid(start, end, rows, columns)

		setGrid(freshGrid)
	}

	function mouseDownHandler(event, node) {
		event.preventDefault()
		const element = node.element.current
		element.classList.toggle('wall')

		node.isWall = !node.isWall
	}

	function mouseEnterHandler(event, node) {
		if (!isMouseDown.current) return
		if (node.isStart) return
		if (node.isEnd) return
		const element = node.element.current
		element.classList.toggle('wall')
		node.isWall = !node.isWall
	}

	return (
		<div className='Grid'>
			<div className='node-grid'>
				{grid.map((row, rowIdx) => {
					return (
						<div className='grid-row' key={rowIdx}>
							{row.map((node, nodeIdx) => {
								const { isStart, isEnd } = node
								return (
									<Node
										key={nodeIdx}
										node={node}
										mouseDownHandler={mouseDownHandler}
										mouseEnterHandler={mouseEnterHandler}
									/>
								)
							})}
						</div>
					)
				})}
			</div>
			<button onClick={runDijkstra}>Dijkstra</button>
			<button onClick={resetGrid}>Reset</button>
		</div>
	)
}
