import './Grid.css'
import { Node } from '@/components'

export function Grid({ mouseMode, grid, isCalculated, setStart,setEnd }) {
	function mouseDownHandler(event, node) {
		event.preventDefault()
		if (isCalculated.current) return

		if (node.isStart) {
			mouseMode.current = 'move-start'
			return
		}

		if (node.isEnd) {
			mouseMode.current = 'move-end'
			return
		}

		mouseMode.current = 'wall'
		const element = node.element.current
		element.classList.toggle('wall')

		node.isWall = !node.isWall
	}

	function mouseEnterHandler(event, node) {
		if (isCalculated.current) return
		if (node.isStart) return
		if (node.isEnd) return
		const element = node.element.current
		switch (mouseMode.current) {
			case 'wall':
				element.classList.toggle('wall')
				node.isWall = !node.isWall
				break
			case 'move-start':
				element.classList.add('start')
				node.isStart = true
				element.classList.remove('wall')
				node.isWall =  false
				setStart([node.row, node.column])
				break
			case 'move-end':
				element.classList.add('end')
				node.isEnd = true
				element.classList.remove('wall')
				node.isWall =  false
				setEnd([node.row, node.column])
				break
			default:
				break
		}
	}

	function mouseOutHandler(event, node) {
		if (isCalculated.current) return

		const element = node.element.current
		switch (mouseMode.current) {
			case 'move-start':
				node.isStart = false
				element.classList.remove('start')
				break
			case 'move-end':
				node.isEnd = false
				element.classList.remove('end')
				break
			default:
				break
		}
	}

	return (
		<div className='Grid'>
			<div className='node-grid'>
				{grid.map((row, rowIdx) => {
					return (
						<div className='grid-row' key={rowIdx}>
							{row.map((node, nodeIdx) => {
								return (
									<Node
										key={nodeIdx}
										node={node}
										mouseDownHandler={mouseDownHandler}
										mouseEnterHandler={mouseEnterHandler}
										mouseOutHandler={mouseOutHandler}
									/>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}
