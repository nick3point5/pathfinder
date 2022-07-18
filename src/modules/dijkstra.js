import { Heap } from '@/modules'

export function dijkstra(startNode, endNode) {
	const visitedNodesInOrder = []
	startNode.distance = 0
	const minHeap = new Heap((a, b) => (a.distance < b.distance));

	minHeap.push(startNode)
	minHeap.push(startNode)

	while (!!minHeap.size()) {
		const closestNode = minHeap.pop()
		

		closestNode.isVisited = true
		visitedNodesInOrder.push(closestNode)

		if (closestNode === endNode) {
			return visitedNodesInOrder
		}
		updateUnvisitedNeighbors(closestNode,minHeap)
	}

	return visitedNodesInOrder
}

function updateUnvisitedNeighbors(node,minHeap) {
	const unvisitedNeighbors = getUnVisitedNeighbors(node)
	unvisitedNeighbors.forEach((neighbor)=> {
		neighbor.distance = node.distance + neighbor.weight
		neighbor.previousNode = node
		if(!neighbor.isVisitable && !neighbor.isWall) {
			neighbor.isVisitable = true
			minHeap.push(neighbor)
		} 
	})
}

function getUnVisitedNeighbors(node) {
	const unvisitedNeighbors = node.neighbors.filter(neighbor => !neighbor.isVisited)
	return unvisitedNeighbors
}