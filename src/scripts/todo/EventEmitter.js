export default class EventEmitter {
  events = {}

  on = (eventName, cb) => {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(cb)
    return () => this.off(eventName, cb)
  }

  off = (eventName, cb) => {
    if (!this.events[eventName]) return
    this.events[eventName] = this.events[eventName].filter(callback => callback !== cb)
  }

  emit = (eventName, ...rest) => this.events[eventName] && this.events[eventName].forEach(cb => cb(...rest))
}
