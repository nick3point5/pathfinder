export function animateSearch(visitedOrder, pathOrder, timeouts, speedFactor) {
	const speed = 200 / speedFactor
	const timeoutsArray = timeouts.current
	for (let i = 0; i < visitedOrder.length; i++) {
		const timeout = setTimeout(() => {
			const node = visitedOrder[i]
			const element = node.element.current
			element.classList.add('node-visited')
		}, speed * i)
		timeoutsArray.push(timeout)
	}
	for (let i = 0; i < pathOrder.length; i++) {
		const timeout = setTimeout(() => {
			const node = pathOrder[i]
			const element = node.element.current
			element.classList.add('node-path')
		}, speed * (i + visitedOrder.length))
		timeoutsArray.push(timeout)
	}
}