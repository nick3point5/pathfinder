export function getPath(finishNode) {
	const shortestPath = []
	let node = finishNode
	while(node !== null) {
		shortestPath.unshift(node)
		node = node.previousNode
	}
	return shortestPath
}