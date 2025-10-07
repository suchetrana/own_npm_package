class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    // Get parent and child indices
    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    // Swap helper
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Add new element with a priority
    enqueue(value, priority) {
        const node = { value, priority };
        this.heap.push(node);
        this.heapifyUp();
    }

    // Remove and return the element with highest priority (lowest priority value)
    dequeue() {
        if (this.isEmpty()) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    // Peek at the top element
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (
            index > 0 &&
            this.heap[this.getParentIndex(index)].priority > this.heap[index].priority
            ) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            if (
                rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex].priority < this.heap[smallerChildIndex].priority
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[index].priority <= this.heap[smallerChildIndex].priority) break;
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    size() {
        return this.heap.length;
    }
}

module.exports = PriorityQueue;