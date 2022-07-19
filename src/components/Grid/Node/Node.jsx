import './Node.css'
import { useRef } from 'react'
export function Node({ node, mouseDownHandler, mouseEnterHandler, mouseOutHandler }) {
	const ref = useRef(null)
	const { isStart, isEnd, row, column, isWall } = node

	node.element = ref

	const classes = ['Node']
	if (isStart) classes.push('start')
	if (isEnd) classes.push('end')

	const id = `node-${row}-${column}`

	return (
		<div
			ref={ref}
			className={classes.join(' ')}
			id={id}
			onMouseDown={(event) => mouseDownHandler(event, node)}
			onMouseEnter={(event) => mouseEnterHandler(event, node)}
			onMouseOut={(event) => mouseOutHandler(event, node)}
		></div>
	)
}
