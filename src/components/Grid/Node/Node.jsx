import './Node.css'

export function Node({ node }) {
	let { isStart, isEnd, row, column } = node
	let classes = 'Node'
	if (isStart) classes += ' start'
	if (isEnd) classes += ' end'

	return <div  className={classes} id={'node-' + row + '-' + column}></div>
	// return <div ref={element} className={classes} id={'node-' + row + '-' + column}></div>
}
