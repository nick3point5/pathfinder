import './Node.css'
import { useRef } from 'react'
export function Node({ node }) {
	const ref = useRef(null)
	let { isStart, isEnd, row, column } = node

	let classes = 'Node'
	if (isStart) classes += ' start'
	if (isEnd) classes += ' end'

	node.element = ref

	return (
		<div ref={ref} className={classes} id={'node-' + row + '-' + column}></div>
	)
}
