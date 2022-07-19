import { Heap, dijkstra, aStar, greedy } from '@/modules'

export function algorithm(startNode, endNode, grid, type) {
	const visitedNodesInOrder = []
	startNode.distance = 0
	const minHeap = new Heap((a, b) => a.distance < b.distance)

	const gridArray = []
	grid.forEach((rows) => rows.forEach((item) => gridArray.push(item)))

	minHeap.heapify(gridArray)

	let heuristic
	switch (type) {
		case 'dijkstra':
			heuristic = (node, neighbor) => dijkstra(node, neighbor)
			break
		case 'aStar':
			heuristic = (node, neighbor) => aStar(node, neighbor, endNode)
			break
		case 'greedy':
			heuristic = (node, neighbor) => greedy(node, neighbor, endNode)
			break

		default:
			break
	}

	while (!!minHeap.size()) {
		gridArray.sort((current, next) => current.distance - next.distance)
		const closestNode = gridArray.shift()
		// const closestNode = minHeap.pop()

		if (closestNode.distance === Infinity) {
			return visitedNodesInOrder
		}

		closestNode.isVisited = true
		visitedNodesInOrder.push(closestNode)

		if (closestNode === endNode) {
			return visitedNodesInOrder
		}
		updateUnvisitedNeighbors(closestNode, minHeap, heuristic)
	}

	return visitedNodesInOrder
}

function updateUnvisitedNeighbors(node, minHeap, heuristic) {
	const unvisitedNeighbors = getUnVisitedNeighbors(node)
	unvisitedNeighbors.forEach((neighbor) => {
		if (!neighbor.isVisitable && !neighbor.isWall) {
			heuristic(node, neighbor)
		}
	})
	node.neighbors.forEach((neighbor) => {
		minHeap.rescoreElement(neighbor)
	})
}

function getUnVisitedNeighbors(node) {
	const unvisitedNeighbors = node.neighbors.filter(
		(neighbor) => !neighbor.isVisited
	)
	return unvisitedNeighbors
}
