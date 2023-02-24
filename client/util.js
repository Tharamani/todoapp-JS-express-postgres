import { getTodos } from './fetchapi'

// Get todos from DB and display
const requestTodos = async () => {
  const todos = await getTodos()
  console.log('fetchTodos todos', todos)
  return todos
}
export { requestTodos }
