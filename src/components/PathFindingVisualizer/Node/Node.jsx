import './Node.css'

export function Node({ isStart, isEnd }) {
	let classes = 'Node'
	if (isStart) classes += ' start'
	if (isEnd) classes += ' end'
	
	return <div className={classes}></div>
}
