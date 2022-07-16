import './Grid.css'
import { useEffect, useRef, useState } from 'react'
import { Node } from '@/components'
import { dijkstra, generateGrid, getPath } from '@/modules'

export function Grid({ isMouseDown, grid, isCalculated }) {
	function mouseDownHandler(event, node) {
		event.preventDefault()
		if (isCalculated.current) return
		const element = node.element.current
		element.classList.toggle('wall')

		node.isWall = !node.isWall
	}

	function mouseEnterHandler(event, node) {
		if (isCalculated.current) return
		if (!isMouseDown.current) return
		if (node.isStart) return
		if (node.isEnd) return
		const element = node.element.current
		element.classList.toggle('wall')
		node.isWall = !node.isWall
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
