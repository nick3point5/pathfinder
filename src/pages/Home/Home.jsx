import './Home.css'
import { Grid, Toolbar, Instructions } from '@/components'
import { useRef, useState } from 'react'
import { generateGrid } from '@/modules'

const initRows = 20
const initColumns = 40
const initStart = [5, 5]
const initEnd = [initRows - 7, initColumns - 7]

export function Home(props) {
	const [start, setStart] = useState(initStart)
	const [end, setEnd] = useState(initEnd)
	const [grid, setGrid] = useState(
		generateGrid(start, end, initRows, initColumns)
	)
	const mouseMode = useRef('off')
	const isCalculated = useRef(false)

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
				grid={grid}
				setGrid={setGrid}
				isCalculated={isCalculated}
				start={start}
				end={end}
			/>
			<Instructions />
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
