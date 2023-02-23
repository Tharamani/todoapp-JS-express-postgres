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

const createTodo = async (todo) => {
  const todoJson = JSON.stringify({ ...todo })
  console.log('createTodo todoJson : ', typeof todoJson)
  const response = await fetch('http://localhost:4000/todo', {
    method: 'POST',
    body: todoJson
  })
  console.log('createTodo : response ', response)
  if (response.status === 201) {
    const data = await response.json()
    console.log('createTodo : ', data)
    return data
  }
}

const updateTodo = async (todo) => {
  const todoJson = JSON.stringify({ ...todo })
  console.log('updateTodo todoJson', todo, todoJson, `http://localhost:4000/todo/${todo.todo_id}`)
  const response = await fetch(`http://localhost:4000/todo/${todo.todo_id}`, {
    method: 'PUT',
    body: todoJson
  })
  // console.log('updateTodo : response ', response)
  if (response.status === 200) {
    const data = await response.json()
    // console.log('updateTodo : data', data)
    return data
  }
}

const deleteTodo = async (todo) => {
  // console.log('deleteTodo : todo_id', todo.todo_id, `http://localhost:4000/todo/${todo.todo_id}`)
  const response = await fetch(`http://localhost:4000/todo/${todo.todo_id}`, {
    method: 'DELETE'
  })
  // console.log('deleteTodo : response ', response)
  if (response.status === 200) {
    const data = await response.json()
    // console.log('deleteTodo : ', data)
    return data
  }
}

const createText = (todo) => {
  const inputText = document.createElement('input')

  inputText.setAttribute('class', 'todo-text') // remove id attr, set class attr
  inputText.setAttribute('type', 'text')
  inputText.value = todo.title

  // Event listeners
  inputText.addEventListener('click', () => {
    const editItem = document.getElementById(todo.todo_id).querySelector('.edit-item')
    editItem.style.display === 'block' ? editItem.style.display = 'none' : editItem.style.display = 'block'
  })

  inputText.addEventListener('change', (event) => {
    todo.title = event.target.value
    // updateTodo(todo)
    updateTodo(todo).then(response => {
      response.todo.title = event.target.value
    })
  })

  return inputText
}

const createCheckbox = (todo) => {
  console.log('todo : createCheckbox', todo)
  const inputCheckbox = document.createElement('input')

  inputCheckbox.setAttribute('class', 'checkbox')// remove id attr, set class attr
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.checked = todo.is_checked

  inputCheckbox.addEventListener('change', () => {
    todo.is_checked = inputCheckbox.checked
    updateTodo(todo).then(response => {
      response.todo.is_checked = inputCheckbox.checked
    })

    // updateData()
  })

  return inputCheckbox
}

const createTodoItem = (todo) => {
  console.log('createTodoItem ', todo)

  const todoItem = document.createElement('div') // rename to todoItem
  todoItem.setAttribute('id', todo.todo_id)
  todoItem.setAttribute('class', 'todo-item')

  todoItem.appendChild(createCheckbox(todo))
  todoItem.appendChild(createText(todo))

  return todoItem
}

const createTextArea = (todo) => {
  const textArea = document.createElement('textarea')

  textArea.setAttribute('class', 'text-area') // remove id, add class
  textArea.setAttribute('placeholder', 'Notes')
  textArea.value = todo.notes ? todo.notes : textArea.value = ''

  textArea.addEventListener('change', (event) => {
    todo.notes = event.target.value
    // updateData(todo)
    updateTodo(todo).then(response => {
      response.todo.notes = event.target.value
    })
  })

  return textArea
}

const createDateTime = (todo) => {
  console.log('createDateTime', todo)
  const inputDateTime = document.createElement('input')

  inputDateTime.setAttribute('id', 'date-time')
  inputDateTime.setAttribute('type', 'datetime-local')
  inputDateTime.setAttribute('value', todo.due_date)

  inputDateTime.addEventListener('change', (event) => {
    todo.due_date = event.target.value
    // inputDateTime.setAttribute('value', todo.due_date)
    // updateData()
    // updateTodo(todo)
    updateTodo(todo).then(response => {
      response.due_date = event.target.value
    })
  })

  return inputDateTime
}

const createDeleteBtn = (todo) => {
  const deleteBtn = document.createElement('button')

  deleteBtn.setAttribute('id', 'delete-todo')
  deleteBtn.textContent = 'Delete'

  deleteBtn.addEventListener('click', () => {
    const deleteEle = document.getElementById(todo.todo_id)
    deleteEle.remove()
    // deleteTodo(todo)
    deleteTodo(todo).then(response => {
      console.log('deleteTodo', response.message)
    })
    // todos = todos.filter(item => {
    //   return todo.id !== item.id
    // })
    // updateData()
  })

  return deleteBtn
}

const createPriorityList = (todo) => {
  console.log('createPriorityList', todo)
  const priorityList = document.createElement('select') // rename to priorityList
  // createPriorityList
  priorityList.setAttribute('id', 'select')
  // Create array of options to be added
  const prority = ['Select', 'High', 'Medium', 'Low']

  // Create and append the options
  for (let i = 0; i < prority.length; i++) {
    const option = document.createElement('option')
    option.value = prority[i]
    option.text = prority[i]
    priorityList.appendChild(option)
  }

  priorityList.value = todo.priority ? todo.priority : 'Select'

  priorityList.addEventListener('change', (event) => {
    todo.priority = event.target.value
    // updateData()
    updateTodo(todo).then(response => {
      response.todo.due_date = event.target.value
    })
  })

  return priorityList
}

const createLabel = (text) => {
  const priorityLabel = document.createElement('label')
  priorityLabel.textContent = text
  return priorityLabel
}

const createPriorityLabel = (todo) => { // abstract
  return createLabel('Priority  ').appendChild(createPriorityList(todo))
}

const createDueDateLabel = (todo) => { // abstract
  return createLabel('DueDate  ').appendChild(createDateTime(todo))
}

const createEditLabel = (todo) => {
  const editLabelDiv = document.createElement('div')
  editLabelDiv.setAttribute('id', 'edit-label')

  editLabelDiv.appendChild(createPriorityLabel(todo))
  editLabelDiv.appendChild(createDueDateLabel(todo))
  editLabelDiv.appendChild(createDeleteBtn(todo))

  return editLabelDiv
}

const createDivItem = (todo) => {
  const editItemDiv = document.createElement('div')

  editItemDiv.setAttribute('class', 'edit-item')
  editItemDiv.style.display = 'none'
  editItemDiv.appendChild(createTextArea(todo))
  editItemDiv.appendChild(createEditLabel(todo))

  return editItemDiv
}

const createEditItem = (todo) => {
  const todoItem = document.getElementById(`${todo.todo_id}`)
  todoItem.appendChild(createDivItem(todo))
}

const dispalyTodos = (todo) => {
  console.log('dispalyTodos', todo.todo_id)
  const todoList = document.querySelector('#todo-list')
  todoList.appendChild(createTodoItem(todo))
  createEditItem(todo)
}

// Get todos from DB and display
const fetchTodos = () => {
  getTodos().then(data => {
    console.log('fetchTodos data', data)
    data.map(todo => {
      dispalyTodos(todo)
    })
  }).catch(error => {
    console.log('todos error', error)
  })
}

// Create todo
const postTodo = (title, notes = '', dueDate = '', priority = '', isChecked = false) => {
  // const newDueDate = new Date(Date.now()).toDateString().slice(0, 16)
  // console.log('Before creating newDueDate: ', newDueDate)
  const todo = { title, notes, due_Date: dueDate, priority, is_checked: isChecked }
  console.log('Before creating todo: ', todo)

  createTodo(todo).then(response => {
    console.log('response.data ', response.todo)
    dispalyTodos(response.todo)
    return response.todo
  }).catch(error => {
    console.log('error', error)
  })
  // dispalyTodos(...todoServer)
  // updateData()
}

const create = () => {
  const submitBtn = document.forms['add-todo']

  // Submit todo header text
  submitBtn.addEventListener('submit', (event) => {
    event.preventDefault()
    const title = document.querySelector('#todoText')
    if (title.value.trim()) {
      console.log('gettodos')
      postTodo(title.value.trim())
    }
    title.value = ''
  })
}

const app = () => {
  fetchTodos()
  try {
    console.log('app todos')
    create()
  } catch (error) {
    console.log('error : ', error)
  }
}

app()
