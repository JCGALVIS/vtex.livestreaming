export default class Queue<T> {
  private queue: T[]

  constructor() {
    this.queue = []
  }

  public add(x: T) {
    this.queue.push(x)

    return this.queue
  }

  public remove() {
    if (this.queue.length > 0) return this.queue.shift()

    return null
  }

  public size() {
    return this.queue.length
  }

  public isEmpty() {
    return this.queue.length === 0
  }

  public print() {
    return this.queue
  }
}
