
// const url = 'http://localhost:4000/todo'

const getTodos = async () => {
  const response = await fetch('/todo')
  const data = await response.json()
  return data
}
export { getTodos }
