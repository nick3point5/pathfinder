export function dijkstra(grid, startNode, endNode) {
	const visitedNodesInOrder = []
	startNode.distance = 0
	const unvisitedNodes = getAllNodes(grid)
	console.log(unvisitedNodes)
}

function getAllNodes(grid) {
	let allNodes = []
	for(const row of grid) {
		allNodes = allNodes.concat(row)
	}
	return allNodes
}
