import './Home.css'
import { Grid, Toolbar } from '@/components'
import { useRef, useState } from 'react'
import { generateGrid, getPath, animateSearch, algorithm } from '@/modules'

export function Home(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [rows, setRows] = useState(20)
	const [columns, setColumns] = useState(50)
	const [grid, setGrid] = useState(generateGrid(start, end, rows, columns))
	const [algorithmType, setAlgorithmType] = useState('dijkstra')
	const mouseMode = useRef('off')
	const isCalculated = useRef(false)
	const timeouts = useRef([])

	function runSearch() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedOrder = algorithm(startNode, endNode, grid, algorithmType)
		const pathOrder = getPath(endNode)
		isCalculated.current = true
		animateSearch(visitedOrder, pathOrder, timeouts, 100)
	}

	function resetGrid() {
		while (!!timeouts.current.length) {
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
		// mouseMode.current = "wall"
	}

	function handleMouseUp() {
		mouseMode.current = 'off'
	}

	return (
		<div
			className={`Home`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<Toolbar
				runSearch={runSearch}
				resetGrid={resetGrid}
				rows={rows}
				setRows={setRows}
				columns={columns}
				setColumns={setColumns}
				algorithmType={algorithmType}
				setAlgorithmType={setAlgorithmType}
			/>
			<Grid
				mouseMode={mouseMode}
				grid={grid}
				isCalculated={isCalculated}
				setStart={setStart}
				setEnd={setEnd}
			/>
		</div>
	)
}
