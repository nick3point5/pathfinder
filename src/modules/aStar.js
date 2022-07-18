import { Heap } from '@/modules'

export function aStar(startNode, endNode, grid) {
	const visitedNodesInOrder = []
	startNode.gScore = 0
	startNode.distance = 0
	const minHeap = new Heap((a, b) => a.distance < b.distance)

	const gridArray = []
	grid.forEach((rows) => rows.forEach((item) => gridArray.push(item)))
	console.log(gridArray)

	minHeap.heapify(gridArray)

	while (!!minHeap.size()) {
		const closestNode = minHeap.pop()

		closestNode.isVisited = true
		visitedNodesInOrder.push(closestNode)

		if (closestNode === endNode) {
			return visitedNodesInOrder
		}
		updateUnvisitedNeighbors(closestNode, minHeap, endNode)
	}

	return visitedNodesInOrder
}

function updateUnvisitedNeighbors(node, minHeap, endNode) {
	const unvisitedNeighbors = getUnVisitedNeighbors(node)
	unvisitedNeighbors.forEach((neighbor) => {
		if (!neighbor.isVisitable && !neighbor.isWall) {
			const gScore = node.gScore + neighbor.weight
			const heuristic = manhattanDistance(neighbor, endNode)
			neighbor.gScore = gScore
			neighbor.distance = gScore + heuristic
			neighbor.previousNode = node
			neighbor.isVisitable = true
			minHeap.rescoreElement(neighbor)
		}
	})
}

function getUnVisitedNeighbors(node) {
	const unvisitedNeighbors = node.neighbors.filter(
		(neighbor) => !neighbor.isVisited
	)
	return unvisitedNeighbors
}

function manhattanDistance(node, endNode) {
	const dx = Math.abs(endNode.row - node.row)
	const dy = Math.abs(endNode.column - node.column)

	return dx + dy
}

var astar = {
	/**
  * Perform an A* Search on a graph given a start and end node.
  * @param {Graph} graph
  * @param {GridNode} start
  * @param {GridNode} end
  * @param {Object} [options]
  * @param {bool} [options.closest] Specifies whether to return the
             path to the closest node if the target is unreachable.
  * @param {Function} [options.heuristic] Heuristic function (see
  *          astar.heuristics).
  */
	search: function (graph, start, end, options) {
		graph.cleanDirty()
		options = options || {}
		var heuristic = options.heuristic || astar.heuristics.manhattan
		var closest = options.closest || false

		var openHeap = getHeap()
		var closestNode = start // set the start node to be the closest if required

		start.h = heuristic(start, end)
		graph.markDirty(start)

		openHeap.push(start)

		while (openHeap.size() > 0) {
			// Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
			var currentNode = openHeap.pop()

			// End case -- result has been found, return the traced path.
			if (currentNode === end) {
				return pathTo(currentNode)
			}

			// Normal case -- move currentNode from open to closed, process each of its neighbors.
			currentNode.closed = true

			// Find all neighbors for the current node.
			var neighbors = graph.neighbors(currentNode)

			for (var i = 0, il = neighbors.length; i < il; ++i) {
				var neighbor = neighbors[i]

				if (neighbor.closed || neighbor.isWall()) {
					// Not a valid node to process, skip to next neighbor.
					continue
				}

				// The g score is the shortest distance from start to current node.
				// We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
				var gScore = currentNode.g + neighbor.getCost(currentNode)
				var beenVisited = neighbor.visited

				if (!beenVisited || gScore < neighbor.g) {
					// Found an optimal (so far) path to this node.  Take score for node to see how good it is.
					neighbor.visited = true
					neighbor.parent = currentNode
					neighbor.h = neighbor.h || heuristic(neighbor, end)
					neighbor.g = gScore
					neighbor.f = neighbor.g + neighbor.h
					graph.markDirty(neighbor)
					if (closest) {
						// If the neighbour is closer than the current closestNode or if it's equally close but has
						// a cheaper path than the current closest node then it becomes the closest node
						if (
							neighbor.h < closestNode.h ||
							(neighbor.h === closestNode.h && neighbor.g < closestNode.g)
						) {
							closestNode = neighbor
						}
					}

					if (!beenVisited) {
						// Pushing to heap will put it in proper place based on the 'f' value.
						openHeap.push(neighbor)
					} else {
						// Already seen the node, but since it has been rescored we need to reorder it in the heap
						openHeap.rescoreElement(neighbor)
					}
				}
			}
		}

		if (closest) {
			return pathTo(closestNode)
		}

		// No result was found - empty array signifies failure to find path.
		return []
	},
}
