import './Grid.css'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Node } from '@/components'
import { dijkstra, generateGrid, getPath } from '@/modules'

export function Grid(props) {
	const [start, setStart] = useState([10, 5])
	const [end, setEnd] = useState([10, 45])
	const [grid, setGrid] = useState(generateGrid(start, end))

	function runDijkstra() {
		const startNode = grid[start[0]][start[1]]
		const endNode = grid[end[0]][end[1]]
		const searchOrder = dijkstra(grid, startNode, endNode)
		const pathOrder = getPath(endNode)
		console.log(searchOrder)
		// animatePath(pathOrder)
		// console.log(startNode.element.current.className)
	}

	function animatePath(pathOrder) {
		console.log(pathOrder.length)
    for (let i = 0; i <= pathOrder.length; i++) {
      // if (i === searchOrder.length) {
      //   setTimeout(() => {
      //     this.animateShortestPath(pathOrder);
      //   }, 10 * i);
      //   return;
      // }
      // setTimeout(() => {
      //   const node = searchOrder[i];
      //   node.element.current.className +=
      //     ' node-visited';
      // }, 10 * i);
			const node = pathOrder[i];
			console.log(node)
			// node.element.current.className +=	' node-visited';
    }
	}
	// function animateShortestPath(nodesInShortestPathOrder) {
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     setTimeout(() => {
  //       const node = nodesInShortestPathOrder[i];
  //       document.getElementById(`node-${node.row}-${node.col}`).className =
  //         'node node-shortest-path';
  //     }, 50 * i);
  //   }
  // }

	useEffect(() => {
		const path = runDijkstra()
	}, [])

	return (
		<div className='grid'>
			{grid.map((row, rowIdx) => {
				return (
					<div className='grid-row' key={rowIdx}>
						{row.map((node, nodeIdx) => {
							const { isStart, isEnd } = node
							return <Node key={nodeIdx} node={node} />
						})}
					</div>
				)
			})}
		</div>
	)
}
