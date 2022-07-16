import {MinHeap} from '@/modules'

export function dijkstra(grid, startNode, endNode) {
	const visitedNodesInOrder = []
	startNode.distance = 0
	const unvisitedNodes = getAllNodes(grid)
	// const heap = new MinHeap(unvisitedNodes,(node) => node?.distance)

	while (!!unvisitedNodes.length) {
		sortByDistance(unvisitedNodes)
		const closestNode = unvisitedNodes.shift()
		if (closestNode.isWall) continue

		if (closestNode.distance === Infinity) return visitedNodesInOrder
		closestNode.isVisited = true
		visitedNodesInOrder.push(closestNode)
		if (closestNode === endNode) return visitedNodesInOrder
		updateUnvisitedNeighbors(closestNode, grid)
	}
}

function sortByDistance(nodes) {
	nodes.sort((current, next) => current.distance - next.distance)
}

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