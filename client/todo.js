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

  inputText.addEventListener('change', async (event) => {
    todo.title = event.target.value
    try {
      const data = await updateTodo(todo) // api call
      data.todo.title = event.target.value
    } catch (error) {
      console.log('Error ', error.cause)
    }
  })

  return inputText
}

const createCheckbox = (todo) => {
  const inputCheckbox = document.createElement('input')

  inputCheckbox.setAttribute('class', 'checkbox')
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.checked = todo.is_checked

  inputCheckbox.addEventListener('change', async () => {
    todo.is_checked = inputCheckbox.checked
    try {
      const data = await updateTodo(todo) // api call
      data.todo.is_checked = inputCheckbox.checked
    } catch (error) {
      console.log('Error ', error.cause)
    }
  })

  return inputCheckbox
}

const createTodoItem = (todo) => {
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

  textArea.addEventListener('change', async (event) => {
    todo.notes = event.target.value
    try {
      const data = await updateTodo(todo) // api call
      data.todo.notes = event.target.value
    } catch (error) {
      console.log('Error ', error.cause)
    }
  })

  return textArea
}

const createDateTime = (todo) => {
  const inputDateTime = document.createElement('input')

  inputDateTime.setAttribute('id', 'date-time')
  inputDateTime.setAttribute('type', 'datetime-local')
  inputDateTime.setAttribute('value', todo.due_date)

  inputDateTime.addEventListener('change', async (event) => {
    todo.due_date = event.target.value

    try {
      const data = await updateTodo(todo) // api call
      data.due_date = event.target.value
    } catch (error) {
      console.log('Error ', error.cause)
    }
  })

  return inputDateTime
}

const createDeleteBtn = (todo) => {
  const deleteBtn = document.createElement('button')

  deleteBtn.setAttribute('id', 'delete-todo')
  deleteBtn.textContent = 'Delete'

  deleteBtn.addEventListener('click', async () => {
    const deleteEle = document.getElementById(todo.todo_id)
    deleteEle.remove()
    try {
      const data = await deleteTodo(todo) // api call
      console.log('deleteTodo', data.message)
    } catch (error) {
      console.log('Error ', error.cause)
    }
  })

  return deleteBtn
}

const createPriorityList = (todo) => {
  const priorityList = document.createElement('select')
  priorityList.setAttribute('id', 'select')
  // Create array of options to be added
  const prority = ['Select', 'High', 'Medium', 'Low']

  // Create and append the options
  // for (let i = 0; i < prority.length; i++) {
  //   const option = document.createElement('option')
  //   option.value = prority[i]
  //   option.text = prority[i]
  //   priorityList.appendChild(option)
  // }

  prority.forEach(element => {
    const option = document.createElement('option')
      option.value = element[i]
      option.text = element[i]
      priorityList.appendChild(option)
  })

  priorityList.value = todo.priority ? todo.priority : 'Select'

  priorityList.addEventListener('change', async (event) => {
    todo.priority = event.target.value

    try {
      const data = await updateTodo(todo) // api call
      data.todo.priority = event.target.value
    } catch (error) {
      console.log('Error ', error.cause)
    }
  })

  return priorityList
}

const createLabel = (text) => {
  const sLabel = document.createElement('label')
  sLabel.textContent = text
  return sLabel
}

const createFilterList = () => {
  const filterList = document.createElement('select')
  filterList.setAttribute('id', 'filter')
  // Create array of options to be added
  const filter = ['ShowAll', 'ShowDone']

  // Create and append the options
  // for (let i = 0; i < filter.length; i++) { // foreach
  //   const option = document.createElement('option')
  //   option.value = filter[i]
  //   option.text = filter[i]
  //   filterList.appendChild(option)
  // }

  filter.forEach(element => {// foreach
    option.value = element[i]
    option.text = element[i]
    filterList.appendChild(option)
  })

  const renderTodo = (todos) => {
    todos.forEach(todo => { // rendertodo function
      dispalyTodo(todo)
    })
  }

  filterList.addEventListener('change', (event) => {
    if (event.target.value === 'ShowAll') {
      const todoList = document.querySelector('#todo-list')

      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      intialize()
    } else if (event.target.value === 'ShowDone') {
      const todoList = document.querySelector('#todo-list')

      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      showDone().then(data => { // calls api
        console.log('showDone data', data)
        renderTodo(data)
        // data.map(todo => { // rendertodo function
        //   dispalyTodo(todo)
        // })
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

      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      intialize() // calls api
    }).catch(error => {
      console.log('createDeleteDone error', error)
    })
  })

  return deleteDoneBtn
}

const createDeleteAll = () => {
  const deleteAllBtn = document.createElement('button')
  deleteAllBtn.setAttribute('id', 'delete-all') // deleteAllBtn
  deleteAllBtn.setAttribute('type', 'button')
  deleteAllBtn.innerText = 'Delete All'

  deleteAllBtn.addEventListener('click', () => {
    deleteAll().then(data => { // calls api
      console.log('createDeleteAll data', data.message)
      const todoList = document.querySelector('#todo-list')
      while (todoList.hasChildNodes()) {
        todoList.removeChild(todoList.lastChild)
      }
      intialize() // calls api
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

export const dispalyTodo = (todo) => {
  console.log('dispalyTodo', todo.todo_id)
  const todoList = document.querySelector('#todo-list')
  todoList.appendChild(createTodoItem(todo))
  createEditItem(todo)
}

// Get todos from DB and display
const intialize = async () => { // rename intialize
  const data = await getTodos()
  renderTodo(data)
}

// Create todo
const postTodo = async (title, notes = '', dueDate = '', priority = '', isChecked = false) => {
  const todo = { title, notes, due_date: dueDate, priority, is_checked: isChecked }
  try {
    const data = await createTodo(todo) // api call
    dispalyTodo(data.todo)
  } catch (error) {
    console.log('Error ', error.cause)
  }
}

const createTitle = () => { // rename
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
    intialize()
    createTitle()
    createFooter()
  } catch (error) {
    console.log('error : ', error)
  }
}

app()
