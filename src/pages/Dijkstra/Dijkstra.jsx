import './Dijkstra.css'
import { Grid } from '@/components'
import { useRef, useState } from 'react'

export function Dijkstra(props) {
	const isMouseDown = useRef(false)
	// const [isMouseDown, setMouseDown] = useState(false)

	function handleMouseDown() {
		isMouseDown.current = true
		// setMouseDown(true)
	}
	function handleMouseUp() {
		isMouseDown.current = false
		// setMouseDown(false)
	}

	console.log(isMouseDown)
	return (
		<div
			className={`Dijkstra`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<Grid isMouseDown={isMouseDown} />
		</div>
	)
}
