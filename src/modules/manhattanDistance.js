export function manhattanDistance(node, endNode) {
	const dx = Math.abs(endNode.row - node.row)
	const dy = Math.abs(endNode.column - node.column)

	return dx + dy
}