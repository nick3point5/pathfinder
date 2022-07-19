import './Toolbar.css'
import { useRef, useState } from 'react'
import { algorithm, getPath, animateSearch, generateGrid } from '@/modules'
import { FormInputNumber, FormSelect } from '@/components'

export function Toolbar({ grid, setGrid, isCalculated, start, end }) {
	const [rows, setRows] = useState(20)
	const [columns, setColumns] = useState(40)
	const [algorithmType, setAlgorithmType] = useState('dijkstra')
	const [speed, setSpeed] = useState(100)
	const timeouts = useRef([])

	function runSearch(event) {
		event.preventDefault()
		resetSearch(event)
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const visitedOrder = algorithm(startNode, endNode, grid, algorithmType)
		const pathOrder = getPath(endNode)
		isCalculated.current = true
		animateSearch(visitedOrder, pathOrder, timeouts, speed)
	}

	function resetGrid(event) {
		event.preventDefault()
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

	function resetSearch(event) {
		event.preventDefault()
		while (!!timeouts.current.length) {
			const timeout = timeouts.current.pop()
			clearTimeout(timeout)
		}

		grid.forEach((rows) => {
			rows.forEach((node) => {
				const element = node.element.current
				element.classList.remove('node-visited')
				element.classList.remove('node-path')
				node.isVisited = false
				node.isVisitable = false
				node.distance = Infinity
				node.previousNode = null
			})
		})

		isCalculated.current = false
	}


	return (
		<div className={`Toolbar`}>
			<form>
				<FormSelect
					label={'algorithm'}
					value={algorithmType}
					setValue={setAlgorithmType}
				/>
				<button onClick={runSearch}>Run</button>
				<button onClick={resetGrid}>Reset Grid</button>
				<button onClick={resetSearch}>Reset Run</button>
			</form>

			<form>
				<FormInputNumber label={'rows'} value={rows} setValue={setRows} />
				<FormInputNumber label={'columns'} value={columns} setValue={setColumns} />
				<FormInputNumber label={'speed'} value={speed} setValue={setSpeed} />

				<button onClick={resetGrid}>apply</button>
			</form>
		</div>
	)
}
