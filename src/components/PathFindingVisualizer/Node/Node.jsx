import './Node.css'

export function Node({ isStart, isFinish }) {
	let classes = 'Node'
	if (isStart) {
		classes += ' start'
	}
	if (isFinish) {
		classes += ' finish'
	}
	return <div className={classes}></div>
}
