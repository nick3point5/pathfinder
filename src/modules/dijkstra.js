import {MinHeap} from '@/modules'
import Heap from 'heap-js';



export function dijkstra(grid, startNode, endNode) {
	const visitedNodesInOrder = []
	startNode.distance = 0
	const unvisitedNodes = getAllNodes(grid)
<<<<<<< HEAD
	// const heap = new Heap((a, b) => a.distance - b.distance);
	// heap.push(startNode)

=======
	// const heap = new MinHeap(unvisitedNodes,(node) => node?.distance)
>>>>>>> animate

	while (!!unvisitedNodes.length) {
		sortByDistance(unvisitedNodes)
		const closestNode = unvisitedNodes.shift()
<<<<<<< HEAD

=======
>>>>>>> animate
		if (closestNode.isWall) continue

		if (closestNode.distance === Infinity) return visitedNodesInOrder
		closestNode.isVisited = true
		visitedNodesInOrder.push(closestNode)
		if (closestNode === endNode) return visitedNodesInOrder
		updateUnvisitedNeighbors(closestNode)
	}
}

function sortByDistance(nodes) {
	nodes.sort((current, next) => current.distance - next.distance)
}

<<<<<<< HEAD

=======
>>>>>>> animate
function getAllNodes(grid) {
	let allNodes = []
	for (const row of grid) {
		allNodes = allNodes.concat(row)
	}
	return allNodes
}

function updateUnvisitedNeighbors(node) {
	const unvisitedNeighbors = getUnVisitedNeighbors(node)
	unvisitedNeighbors.forEach((neighbor)=> {
		neighbor.distance = node.distance + 1
		neighbor.previousNode = node
	})
}

function getUnVisitedNeighbors(node) {
	const unvisitedNeighbors = node.neighbors.filter(neighbor => !neighbor.isVisited)
	return unvisitedNeighbors
}