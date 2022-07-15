export class MinHeap {
	constructor(array, callback) {
		if (typeof callback === 'function') {
			this.callback = callback
		} else {
			this.callback = (item) => {
				if (item) return item
				return null
			}
		}

		this.heap = []

		if (array) {
			this.heapify(array)
		}
	}

	getValue(index) {
		const item = this.callback(this.heap[index])
		if (item) return item
		return null
	}

	heapify(array) {
		if (!Array.isArray(array)) return

		for (let i = 0; i < array.length; i++) {
			const val = array[i]
			this.insert(val)
		}
	}

	siftUp(index) {
		while (index > 0) {
			const parentIndex = index >> 1
			const parent = this.getValue(parentIndex)
			const val = this.getValue(index)

			if (parent > val) {
				const temp = this.heap[parentIndex]
				this.heap[parentIndex] = this.heap[index]
				this.heap[index] = temp
			}

			index = parentIndex
		}
	}

	siftDown(index) {
		while (true) {
			const val = this.getValue(index)
			const childIndex = (index + 1) * 2
			const child = this.getValue(childIndex)
			const siblingIndex = childIndex - 1
			const sibling = this.getValue(siblingIndex)

			let swapIndex = child !== null && val > child ? childIndex : null

			if (val > sibling && child !== null && sibling < child) {
				swapIndex = siblingIndex
			}

			// if we don't need to swap, then break.
			if (swapIndex === null) break

			var temp = this.heap[swapIndex]
			this.heap[swapIndex] = this.heap[index]
			this.heap[index] = temp

			index = swapIndex
		}
	}

	insert(val) {
		this.heap.push(val)
		this.siftUp(this.heap.length - 1)
	}

	remove() {
		const min = this.heap[0]

		this.heap[0] = this.heap.pop()
		this.siftDown(0)

		return min
	}
}
