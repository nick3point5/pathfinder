export function dijkstra(node, neighbor) {
	neighbor.distance = node.distance + neighbor.weight
	neighbor.previousNode = node
	neighbor.isVisitable = true
}

