// import { getTodos } from './fetchapi.js'

const getTodos = async () => {
  const response = await fetch('http://localhost:4000/todo', {
    method: 'GET'
  })
  if (response.status === 200) {
    const data = await response.json()
    console.log('getTodos : ', data)
    return data
  }
}

// Create todo
// const createTodo = (todoText) => {
//   const id = getId()

//   console.log('id: ', id)
//   const todo = { id, todoText }
//   todos.push(todo)
//   displayTodos(todo)// pass todo object
//   updateData()
// }

const create = () => {
  const submitBtn = document.forms['add-todo']

  // Submit todo header text
  submitBtn.addEventListener('submit', (event) => {
    event.preventDefault()
    const todoText = document.querySelector('#todoText')
    if (todoText.value.trim()) {
      console.log('gettodos')
      createTodo(todoText.value.trim())
    }
    todoText.value = ''
  })
}

const app = () => {
  try {
    console.log('app todos')
    create()
    // getTodos()
  } catch (error) {
    console.log('error : ', error)
  }
}

getTodos()
app()
