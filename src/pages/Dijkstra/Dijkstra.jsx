import './Dijkstra.css'
import { Grid } from '@/components'
import { useRef, useState } from 'react'
import { dijkstra, generateGrid, getPath, animateSearch } from '@/modules'

export function Dijkstra(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [rows, setRows] = useState(20)
	const [columns, setColumns] = useState(50)
	const [grid, setGrid] = useState(generateGrid(start, end, rows, columns))
	const isMouseDown = useRef(false)
	const isCalculated = useRef(false)
	const timeouts = useRef([])

	function runSearch() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedOrder = dijkstra(startNode, endNode)
		const pathOrder = getPath(endNode)
		isCalculated.current = true
		animateSearch(visitedOrder, pathOrder, timeouts, 10)
	}

	function resetGrid() {
		while (!timeouts.current.length) {
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

		isCalculated.current = false
		
		const freshGrid = generateGrid(start, end, rows, columns)

		setGrid(freshGrid)
	}

	function handleMouseDown() {
		isMouseDown.current = true
	}
	
	function handleMouseUp() {
		isMouseDown.current = false
	}

	return (
		<div
			className={`Dijkstra`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<Grid isMouseDown={isMouseDown} grid={grid} isCalculated={isCalculated} />
			<button onClick={runSearch}>Run</button>
			<button onClick={resetGrid}>Reset</button>
		</div>
	)
}
