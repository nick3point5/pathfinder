import './Node.css'
import { useRef } from 'react'
export function Node({ node, mouseDownHandler, mouseEnterHandler }) {
	const ref = useRef(null)
	const { isStart, isEnd, row, column, isWall } = node

	node.element = ref

	const classes = ['Node']
	if (isStart) classes.push('start')
	if (isEnd) classes.push('end')
	if (isWall) classes.push('wall')

	const id = `node-${row}-${column}`

	// function mouseDownHandler(event) {
	// 	node.isWall = true
	// 	const element = node.element.current
	// 	element.classList.add('wall')
	// }

	return (
		<div
			ref={ref}
			className={classes.join(' ')}
			id={id}
			onMouseDown={(event) => mouseDownHandler(event, node)}
			onMouseEnter={(event) => mouseEnterHandler(event, node)}
		></div>
	)
}
