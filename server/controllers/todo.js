const { getTodoModel, createTodoModel, updateTodoModel, deleteTodoModel } = require('../models/todo')

// Get todo
const getTodo = async (req, res) => {
  try {
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
    const { title, notes, priority } = req.body
    console.log('req.body', req.body)

    if (!title || typeof title !== 'string') return res.status(400).json({ message: 'Bad request' })

    const response = await createTodoModel(title, notes, req.body.due_date, priority, req.body.is_checked)
    console.log('createTodo controller response >>>>>>>>>>> ', response)

    return res.status(201).json({
      message: 'Todo created successfully!',
      todo: response[0]
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Edit todo
const editTodo = async (req, res) => {
  try {
    console.log('editTodo', req.body)

    const { title, notes, priority } = req.body
    const response = await updateTodoModel(req.params.id, title, notes, req.body.due_date, priority, req.body.is_checked)
    console.log('editTodo controller response >>>>>>>>>>> ', response)

    if (!response[0]) return res.status(404).json({ message: 'Resource Not found' })

    return res.status(200).json({
      message: 'Todo updated successfully!',
      todo: response[0]
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
