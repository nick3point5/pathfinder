import './Home.css'
import { Grid, Toolbar } from '@/components'
import { useRef, useState } from 'react'
import { generateGrid } from '@/modules'


export function Home(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [grid, setGrid] = useState(generateGrid(start, end, 20, 50))
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
