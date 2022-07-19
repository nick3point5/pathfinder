import './Home.css'
import { Grid, Toolbar } from '@/components'
import { useRef, useState } from 'react'
import { generateGrid } from '@/modules'

const initRows = 20
const initColumns = 40
const initStart = [0, 0]
const initEnd = [initRows-1, initColumns-1]


export function Home(props) {
	const [start, setStart] = useState(initStart)
	const [end, setEnd] = useState(initEnd)
	const [grid, setGrid] = useState(generateGrid(start, end, initRows, initColumns))
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
