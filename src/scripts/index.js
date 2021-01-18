import '../styles/index.scss'
import App from './todo/App'

if (process.env.NODE_ENV === 'development') {
  require('../index.html')
}

new App(window.app, {
  id: 'todo-list',
  title: 'My todo list for Backend'
})

new App(window.app2, {
  id: 'todo-list2',
  title: 'My todo list for Frontend'
})
