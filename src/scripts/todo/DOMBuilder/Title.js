export default class Title {
  constructor(title) {
    this.title = title
    this.initDOM()
  }

  initDOM() {
    this.node = document.createElement('h1')
    this.node.classList.add('title')
    this.node.textContent = this.title
  }
}