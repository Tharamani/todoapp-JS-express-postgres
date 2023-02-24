import { getTodos, createTodo, updateTodo, deleteTodo, showDone, deleteDone, deleteAll } from './fetchapi.js'

const createText = (todo) => {
  const inputText = document.createElement('input')

  inputText.setAttribute('class', 'todo-text')
  inputText.setAttribute('type', 'text')
  inputText.value = todo.title

  // Event listeners
  inputText.addEventListener('click', () => {
    const editItem = document.getElementById(todo.todo_id).querySelector('.edit-item')
    editItem.style.display === 'block' ? editItem.style.display = 'none' : editItem.style.display = 'block'
  })

  inputText.addEventListener('change', (event) => {
    todo.title = event.target.value
    updateTodo(todo).then(response => {
      response.todo.title = event.target.value
    }).catch(error => {
      console.log('createText error', error)
    })
  })

  return inputText
}

const createCheckbox = (todo) => {
  console.log('todo : createCheckbox', todo)
  const inputCheckbox = document.createElement('input')

  inputCheckbox.setAttribute('class', 'checkbox')
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.checked = todo.is_checked

  inputCheckbox.addEventListener('change', () => {
    todo.is_checked = inputCheckbox.checked
    updateTodo(todo).then(response => {
      response.todo.is_checked = inputCheckbox.checked
    }).catch(error => {
      console.log('createCheckbox error', error)
    })
  })

  return inputCheckbox
}

const createTodoItem = (todo) => {
  console.log('createTodoItem ', todo)

  const todoItem = document.createElement('div')
  todoItem.setAttribute('id', todo.todo_id)
  todoItem.setAttribute('class', 'todo-item')

  todoItem.appendChild(createCheckbox(todo))
  todoItem.appendChild(createText(todo))

  return todoItem
}

const createTextArea = (todo) => {
  const textArea = document.createElement('textarea')

  textArea.setAttribute('class', 'text-area')
  textArea.setAttribute('placeholder', 'Notes')
  textArea.value = todo.notes ? todo.notes : textArea.value = ''

  textArea.addEventListener('change', (event) => {
    todo.notes = event.target.value
    updateTodo(todo).then(response => {
      response.todo.notes = event.target.value
    }).catch(error => {
      console.log('createTextArea error', error)
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

    updateTodo(todo).then(response => {
      response.due_date = event.target.value
    }).catch(error => {
      console.log('createDateTime error', error)
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
    deleteTodo(todo).then(response => {
      console.log('deleteTodo', response.message)
    })
  })

  return deleteBtn
}

const createPriorityList = (todo) => {
  console.log('createPriorityList', todo)
  const priorityList = document.createElement('select')
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

    updateTodo(todo).then(response => {
      response.todo.due_date = event.target.value
    }).catch(error => {
      console.log('createPriorityList error', error)
    })
  })

  return priorityList
}

const createLabel = (text) => {
  const sLabel = document.createElement('label')
  sLabel.textContent = text
  return sLabel
}

let todos = []

const createFilterList = () => {
  console.log('createFilterList')
  const filterList = document.createElement('select')
  filterList.setAttribute('id', 'filter')
  // Create array of options to be added
  const filter = ['ShowAll', 'ShowDone']

  // Create and append the options
  for (let i = 0; i < filter.length; i++) {
    const option = document.createElement('option')
    option.value = filter[i]
    option.text = filter[i]
    filterList.appendChild(option)
  }
  // filterList.value = todo.priority ? todo.priority : 'Select'

  filterList.addEventListener('change', (event) => {
    if (event.target.value === 'ShowAll') {
      const todoList = document.querySelector('#todo-list')
      // todoList.innerHTML = ''

      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }

      todos.map(todo => { // using globsl var
        dispalyTodos(todo)
      })
    } else if (event.target.value === 'ShowDone') {
      const todoList = document.querySelector('#todo-list')
      // todoList.innerHTML = ''
      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      showDone().then(data => { // calls api
        console.log('showDone data', data)
        data.map(todo => {
          dispalyTodos(todo)
        })
      }).catch(error => {
        console.log('showDone error', error)
      })
    }
  })

  return filterList
}

const createFilterLabel = () => { // abstract
  return createLabel('Filter  ').appendChild(createFilterList())
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

const createDeleteDone = () => {
  const deleteDoneBtn = document.createElement('button')
  deleteDoneBtn.setAttribute('id', 'delete-done')
  deleteDoneBtn.setAttribute('type', 'button')
  deleteDoneBtn.innerText = 'Delete done'

  deleteDoneBtn.addEventListener('click', () => {
    deleteDone().then(data => { // calls api
      console.log('createDeleteDone data', data.message)
      const todoList = document.querySelector('#todo-list')
      // todoList.innerHTML = ''
      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      fetchTodos() // calls api
    }).catch(error => {
      console.log('createDeleteDone error', error)
    })
  })

  return deleteDoneBtn
}

const createDeleteAll = () => {
  const deleteDoneBtn = document.createElement('button')
  deleteDoneBtn.setAttribute('id', 'delete-all')
  deleteDoneBtn.setAttribute('type', 'button')
  deleteDoneBtn.innerText = 'Delete All'

  deleteDoneBtn.addEventListener('click', () => {
    deleteAll().then(data => { // calls api
      console.log('createDeleteAll data', data.message)
      const todoList = document.querySelector('#todo-list')
      // todoList.innerHTML = ''
      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      fetchTodos() // calls api
    }).catch(error => {
      console.log('createDeleteAll error', error)
    })
  })

  return deleteDoneBtn
}

const createFooter = () => {
  const footer = document.getElementById('footer')
  footer.appendChild(createFilterLabel())
  footer.appendChild(createDeleteDone())
  footer.appendChild(createDeleteAll())
}

const createEditItem = (todo) => {
  const todoItem = document.getElementById(`${todo.todo_id}`)
  todoItem.appendChild(createDivItem(todo))
}

export const dispalyTodos = (todo) => {
  console.log('dispalyTodos', todo.todo_id)
  const todoList = document.querySelector('#todo-list')
  todoList.appendChild(createTodoItem(todo))
  createEditItem(todo)
}

// Get todos from DB and display
const fetchTodos = () => {
  getTodos().then(data => {
    console.log('fetchTodos data', data)
    todos = data
    data.map(todo => {
      dispalyTodos(todo)
    })
  }).catch(error => {
    console.log('todos error', error)
  })
}

// Create todo
const postTodo = (title, notes = '', dueDate = '', priority = '', isChecked = false) => {
  const todo = { title, notes, due_date: dueDate, priority, is_checked: isChecked }
  console.log('postTodo todo: ', todo)

  createTodo(todo).then(response => {
    dispalyTodos(response.todo)
  }).catch(error => {
    console.log('postTodo error ', error.message)
    return error.message
  })
}

const create = () => {
  const submitBtn = document.forms['add-todo']

  // Submit todo header text
  submitBtn.addEventListener('submit', (event) => {
    event.preventDefault()
    const title = document.querySelector('#todoText')
    if (title.value.trim()) {
      postTodo(title.value.trim())
    }
    title.value = ''
  })
}

const app = () => {
  try {
    fetchTodos()
    create()
    createFooter()
  } catch (error) {
    console.log('error : ', error)
  }
}

app()
