export function getShortestPath(finishNode) {
	const shortestPath = []
	let node = finishNode
	while(node !== null) {
		shortestPath.unshift(node)
		node = node.previousNode
	}
	return shortestPath
}