import './Toolbar.css'
import { useRef, useState } from 'react'
import { algorithm, getPath, animateSearch, generateGrid } from '@/modules'
import { FormInput, FormSelect } from '@/components'

export function Toolbar({ grid, setGrid, isCalculated, start, end }) {
	const [rows, setRows] = useState(20)
	const [columns, setColumns] = useState(50)
	const [algorithmType, setAlgorithmType] = useState('dijkstra')
	const [speed, setSpeed] = useState(100)
	const timeouts = useRef([])

	function runSearch() {
		// console.log(startNode, endNode, grid, algorithmType)
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		console.log(start)
		const visitedOrder = algorithm(startNode, endNode, grid, algorithmType)
		const pathOrder = getPath(endNode)
		isCalculated.current = true
		animateSearch(visitedOrder, pathOrder, timeouts, speed)
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

	function resetSearch() {
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

	function handleApply(event) {
		event.preventDefault()
		resetGrid()
	}
	function handleInput(event, setValue) {
		event.preventDefault()
		const { value } = event.target
		setValue(value)
	}
	return (
		<div className={`Toolbar`}>
			<button onClick={runSearch}>Run</button>
			<button onClick={resetGrid}>Reset</button>
			<form>
				<FormInput label={'rows'} value={rows} setValue={setRows}/>
				<FormInput label={'columns'} value={columns} setValue={setColumns}/>
				<FormInput label={'speed'} value={speed} setValue={setSpeed}/>
				<FormSelect label={'algorithm'} value={algorithmType} setValue={setAlgorithmType}/>
				<button onClick={handleApply}>apply</button>
			</form>
		</div>
	)
}
