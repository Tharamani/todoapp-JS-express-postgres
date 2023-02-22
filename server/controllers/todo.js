const { getTodoModel, createTodoModel, updateTodoModel, deleteTodoModel } = require('../models/todo')

// Get todo
const getTodo = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    const response = await getTodoModel()
    console.log('getTodo controller response >>>>>>>>>>> ', response)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Create todo
const createTodo = async (req, res) => {
  try {
    let { todoText, todoNote, dueDate, priority, isChecked } = req.body
    if (!dueDate) dueDate = new Date()
    if (!todoText || typeof todoText !== 'string') return res.status(400).json({ message: 'Bad request' })

    const response = await createTodoModel(todoText, todoNote, dueDate, priority, isChecked)
    console.log('createTodo controller response >>>>>>>>>>> ', response)

    return res.status(201).json({
      message: 'Todo created successfully!',
      data: {
        todo: response[0]
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Edit todo
const editTodo = async (req, res) => {
  try {
    const { todoText, todoNote, dueDate, priority, isChecked } = req.body
    const response = await updateTodoModel(req.params.id, todoText, todoNote, dueDate, priority, isChecked)
    console.log('editTodo controller response >>>>>>>>>>> ', response)

    if (!response[0]) return res.status(404).json({ message: 'Resource Not found' })

    return res.status(200).json({
      message: 'Todo updated successfully!',
      data: {
        todo: response[0]
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id
    const response = await deleteTodoModel(id)
    console.log('deleteTodo controller response >>>>>>>>>>> ', response)

    if (response === 0) {
      return res.status(404).json({
        message: 'Resource Not found'
      })
    }

    return res.status(200).json({
      message: 'Todo deleted successfully!'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { createTodo, getTodo, editTodo, deleteTodo }
