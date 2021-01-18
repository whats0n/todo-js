export default class Form {
  constructor(emitter) {
    this.emitter = emitter
    this.initDOM()
    this.initListeners()
  }

  initDOM() {
    this.node = document.createElement('form')
    this.node.classList.add('form')
    this.node.innerHTML = `
      <div class="form-group">
        <input
          type="text"
          placeholder="Todo list"
          class="form-control"
        />
        <button type="submit" class="button">
          Add
        </button>
      </div>
    `

    this.input = this.node.querySelector('input')
  }

  initListeners() {
    this.node.addEventListener('submit', this.onSubmit)
  }

  onSubmit = e => {
    e.preventDefault()

    const { value } = this.input

    if (!value.trim().length) return

    this.input.value = ''
    this.emitter.emit('form:submit', value.trim())
  }
}