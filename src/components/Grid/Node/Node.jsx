import './Node.css'
import { useRef } from 'react'
export function Node({ node }) {
	const ref = useRef(null)
	const { isStart, isEnd, row, column } = node

	node.element = ref

	const classes = ['Node']
	if (isStart) classes.push('start')
	if (isEnd) classes.push('end')

	const id = `node-${row}-${column}`

	return (
		<div ref={ref} className={classes.join(' ')} id={id}></div>
	)
}
