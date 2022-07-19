import { manhattanDistance } from '@/modules'

export function greedy(node, neighbor, endNode) {
	neighbor.distance = manhattanDistance(neighbor, endNode)
	neighbor.previousNode = node
	neighbor.isVisitable = true
}