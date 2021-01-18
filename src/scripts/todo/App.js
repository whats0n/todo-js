import DOMBuilder from './DOMBuilder'
import Storage from './Storage'
import EventEmitter from './EventEmitter'
import generateID from '../utils/generateID'

export default class App {
  constructor(container, props) {
    this.container = container
    this.initDependencies(props)
    this.initDOM()
    this.initItemsFromStorage()
    this.initListeners()
  }

  initDependencies({ id, title }) {
    this.emitter = new EventEmitter()
    this.storage = new Storage(id)
    this.title = new DOMBuilder.Title(title)
    this.form = new DOMBuilder.Form(this.emitter)
    this.list = new DOMBuilder.List()
  }

  initDOM() {
    this.container.append(this.title.node)
    this.container.append(this.form.node)
    this.container.append(this.list.node)
  }

  initItemsFromStorage() {
    this.storage.data.items.forEach(data => this.list.node.append(this.createItem(data).node))
  }

  initListeners() {
    this.emitter.on('item:change', this.storage.update)
    this.emitter.on('item:create', this.storage.set)
    this.emitter.on('item:delete', (id, node) => {
      this.storage.delete(id)
      this.list.node.removeChild(node)
    })

    this.emitter.on('form:submit', this.onFormSubmit)
  }

  createItem = data => new DOMBuilder.Item(data, this.emitter)

  onFormSubmit = (value) => {
    const data = {
      title: value,
      done: false,
      id: generateID()
    }

    this.list.node.append(this.createItem(data).node)
  }
}
