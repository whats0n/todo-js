export default class Storage {
  constructor(id) {
    this.id = id
    this.store = localStorage
  }

  set data(data) {
    data.count = data.items.length
    this.store.setItem(this.id, JSON.stringify(data))
  }

  get data() {
    return JSON.parse(this.store.getItem(this.id) || '{ "items": [], "count": 0 }')
  }

  get = (id = null) => {
    const data = this.data
    return id === null ? data.items : data.items.find(item => item.id === id)
  }

  set = (item) => {
    const data = this.data
    data.items.push(item)
    this.data = data
  }

  update = (item) => {
    const data = this.data
    data.items = data.items.map(current => current.id === item.id ? item : current)
    this.data = data
  }

  delete = (id) => {
    const data = this.data
    data.items = data.items.filter(item => item.id !== id)
    this.data = data
  }
}