import { manhattanDistance } from '@/modules'

export function aStar(node, neighbor, endNode) {
	if (!node.gScore) {
		node.gScore = 0
	}
	const gScore = node.gScore + neighbor.weight
	const heuristic = manhattanDistance(neighbor, endNode)
	neighbor.gScore = gScore
	neighbor.distance = gScore + heuristic
	neighbor.previousNode = node
	neighbor.isVisitable = true
}
