
const url = 'http://localhost:4000'

const getTodos = async () => {
  const response = await fetch(`${url}/todo`)
  const data = await response.json()
  return data
}

const createTodo = async (todo) => {
  const response = await fetch(`${url}/todo`, { // api call
    method: 'POST',
    body: JSON.stringify({ ...todo }) // diff b/w todo and this
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error('Error ', { cause: data.message })
  }
  return data
}

const updateTodo = async (todo) => {
  const response = await fetch(`${url}/todo/${todo.todo_id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...todo })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error('Error ', { cause: data.message })
  }

  return data
}

const deleteTodo = async (todo) => {
  const response = await fetch(`${url}/todo/${todo.todo_id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error('Error ', { cause: data.message })
  }

  return data
}

const showDone = async () => {
  const response = await fetch(`${url}/todo/showdone`, {
    method: 'GET'
  })
  const data = await response.json()
  return data
}

const deleteDone = async () => {
  const response = await fetch(`${url}/todo/deletedone`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

const deleteAll = async () => {
  const response = await fetch(`${url}/todo/deleteall`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

export { getTodos, createTodo, updateTodo, deleteTodo, showDone, deleteDone, deleteAll }
