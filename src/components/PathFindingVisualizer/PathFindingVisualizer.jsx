import './PathFindingVisualizer.css'
import { useEffect, useState } from 'react'
import { Node } from '@/components'

const nodesInit = []
const rows = 15
const columns = 50
const isStart = (row, column) => row === 10 && column === 5
const isFinish = (row, column) => row === 10 && column === 45

for (let row = 0; row < rows; row++) {
	const currentRow = []
	for (let column = 0; column < columns; column++) {
		let currentNode = {
			column,
			row,
			isStart: isStart(row, column),
			isFinish: isFinish(row, column),
		}
		currentRow.push(currentNode)
	}
	nodesInit.push(currentRow)
}

export function PathFindingVisualizer(props) {
	const [nodes, setNodes] = useState(nodesInit)

	return (
		<div className={`PathFindingVisualizer`}>
			<div className='grid'>
				{nodes.map((row, rowIdx) => {
					return (
						<div className='grid-row' key={rowIdx}>
							{row.map((node, nodeIdx) => {
								const {isStart, isFinish} = node
								return <Node key={nodeIdx} isStart={isStart} isFinish={isFinish} />
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}
