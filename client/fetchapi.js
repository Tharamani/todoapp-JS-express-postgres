
const url = 'http://localhost:4000'

const getTodos = async () => {
  const response = await fetch(`${url}/todo`)
  const data = await response.json()
  return data
}

const createTodo = async (todo) => {
  const response = await fetch(`${url}/todo`, {
    method: 'POST',
    body: JSON.stringify({ ...todo })
    // body: JSON.stringify({ })
  })
  console.log('response response ', response)

  if (response.status !== 201) {
    return response.statusText
  }
  const data = await response.json()
  console.log('response data ', data)
  return data
}

const updateTodo = async (todo) => {
  const response = await fetch(`${url}/todo/${todo.todo_id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...todo })
  })
  if (response.status !== 200) {
    return response.message
  }
  const data = await response.json()
  return data
}

const deleteTodo = async (todo) => {
  const response = await fetch(`${url}/todo/${todo.todo_id}`, {
    method: 'DELETE'
  })
  if (response.status !== 200) {
    return response.message
  }
  const data = await response.json()
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
  // if (response.status !== 200) {
  //   return response.message
  // }
  const data = await response.json()
  return data
}

const deleteAll = async () => {
  const response = await fetch(`${url}/todo/deleteall`, {
    method: 'DELETE'
  })
  // if (response.status !== 200) {
  //   return response.message
  // }
  const data = await response.json()
  return data
}

export { getTodos, createTodo, updateTodo, deleteTodo, showDone, deleteDone, deleteAll }
