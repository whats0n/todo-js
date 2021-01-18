export default class Item {
  constructor({ id, title, done }, emitter) {
    this.id = id
    this.title = title
    this.done = done

    this.emitter = emitter

    this.initDOM()
    this.initListeners()

    this.done && this.check()

    this.emitter.emit('item:create', this.getData())
  }

  initDOM = () => {
    this.node = document.createElement('li')
    this.node.classList.add('item')
    this.node.innerHTML = `
      <div class="item__title">${this.title}</div>
      <button type="button" class="button item__done">Done</button>
      <button type="button" class="button item__delete">Delete</button>
    `
  }

  initListeners = () => {
    this.node.querySelector('.item__done').addEventListener('click', this.listeners.onDone)
    this.node.querySelector('.item__delete').addEventListener('click', this.listeners.onDelete)
  }

  check = () => this.listeners.onChange(true)

  uncheck = () => this.listeners.onChange(false)

  getData = () => ({
    title: this.title,
    done: this.done,
    id: this.id
  })

  listeners = {
    onChange: done => {
      const method = done ? 'add' : 'remove'
      this.done = done
      this.node.classList[method]('is-done')
      this.emitter.emit('item:change', this.getData())
    },

    onDone: e => {
      e.preventDefault()
      this.done ? this.uncheck() : this.check()
    },
  
    onDelete: e => {
      e.preventDefault()
      this.emitter.emit('item:delete', this.id, this.node)
    }
  }
}