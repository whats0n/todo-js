export default class List {
  constructor() {
    this.initDOM()
  }

  initDOM() {
    this.node = document.createElement('ul')
    this.node.classList.add('items')
  }
}