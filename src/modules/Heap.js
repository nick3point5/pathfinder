//min heap (a, b) => (a < b)
//max heap (a, b) => (a > b)
function minComparator(a, b) {
	return a < b
}

export class Heap {
	constructor(comparator = minComparator) {
		this.array = []
		this.comparator = comparator
	}
	push(element) {
		this.array.unshift(element)
		this.siftDown(0)
	}
	pop() {
		const top = this.array[0]
		const bottom = this.array.pop()
		if (this.array.length > 0) {
			this.array[0] = bottom
			this.siftDown(0)
		}
		return top
	}
	heapify(array) {
		if (!Array.isArray(array)) {
			console.log('not an array')
			return
		}
		for (let index = 0; index < array.length; index++) {
			this.push(array[index])
		}
	}
	remove(node) {
		const index = this.array.indexOf(node)
		const bottom = this.array.pop()

		if (index !== this.array.length - 1) {
			this.array[index] = bottom

			if (this.comparator(bottom, node)) {
				this.siftUp(index)
			} else {
				this.siftDown(index)
			}
		}
	}
	size() {
		return this.array.length
	}
	rescoreElement(node) {
		this.siftUp(this.array.indexOf(node))
	}
	siftUp(index) {
		const element = this.array[index]
		while (index > 0) {
			const parentIndex = ((index + 1) >> 1) - 1
			const parent = this.array[parentIndex]
			if (this.comparator(element, parent)) {
				this.array[parentIndex] = element
				this.array[index] = parent
				index = parentIndex
			} else {
				break
			}
		}
	}
	siftDown(index) {
		const length = this.array.length
		const element = this.array[index]

		while (true) {
			const childIndex2 = (index + 1) << 1
			const childIndex1 = childIndex2 - 1
			const child1 = this.array[childIndex1]
			const child2 = this.array[childIndex2]

			var swapIndex = null

			if (childIndex1 < length) {
				if (this.comparator(child1, element)) {
					swapIndex = childIndex1
				}
			}

			if (childIndex2 < length) {
				const compareElement = swapIndex === null ? element : child1
				if (this.comparator(child2, compareElement)) {
					swapIndex = childIndex2
				}
			}

			if (swapIndex !== null) {
				this.array[index] = this.array[swapIndex]
				this.array[swapIndex] = element
				index = swapIndex
			} else {
				break
			}
		}
	}
}

// // const sample = []
// const sample = [2, 4, 3, 8, 5, 1, 6, 7, 9]
// const sample2 = [
// 	{distance: 2},
// 	{distance: 4},
// 	{distance: 3},
// 	{distance: 8},
// 	{distance: 5},
// 	{distance: 1},
// 	{distance: 6},
// 	{distance: 7},
// ]
// const sample3 = [
// 	{ distance: 1, time: 1 },
// 	{ distance: 1, time: 2 },
// 	{ distance: 1, time: 3 },
// 	{ distance: 1, time: 4 },
// 	{ distance: 1, time: 5 },
// 	{ distance: 1, time: 6 },
// 	{ distance: 1, time: 7 },
// 	{ distance: 1, time: 8 },
// ]

// const minHeap = new Heap((a, b) => a.distance - b.distance)
// minHeap.heapify(sample3)

//= minHeap.push(2)
// minHeap.push(4)
// minHeap.push(3)
// minHeap.push(8)
// minHeap.push(5)
// minHeap.push(1)
// minHeap.push(6)
// minHeap.push(7)

// console.log(minHeap.pop())
// console.log(minHeap.pop())
// console.log(minHeap.pop())
// console.log(minHeap.pop())
// console.log(minHeap.pop())
// console.log(minHeap.pop())
// console.log(minHeap.pop())
// console.log(minHeap.pop())
