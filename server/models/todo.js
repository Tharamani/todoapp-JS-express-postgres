const { client } = require('../config/db')

const getTodoModel = async () => {
  const getQuery = 'SELECT * FROM todoschema.todo ORDER BY todo_id;'
  const result = await client.query(getQuery)
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

// post all properties
const createTodoModel = async (title, notes, dueDate, priority, isChecked) => {
  console.log('createTodoModel : >>>>>>>>', title, notes, dueDate, priority, isChecked)
  const createQuery = 'INSERT INTO todoschema.todo(title, notes, due_date, priority, is_checked ) VALUES($1, $2, $3, $4, $5) RETURNING *'
  const values = [title, notes, dueDate, priority, isChecked]
  const result = await client.query(createQuery, values)
  console.log('createTodoModel: result ', result)
  if (result.rowCount !== 1) throw new Error('Failed to create todo') //
  return result.rows[0]
  
}

// change for update
const updateTodoModel = async (id, title, notes, dueDate, priority, isChecked) => {
  const values = [id, title, notes, dueDate, priority, isChecked]
  const updateQuery = 'UPDATE todoschema.todo SET  title = $2, notes = $3, due_date = $4, priority = $5, is_checked = $6 WHERE todo_id = $1 RETURNING *'

  const result = await client.query(updateQuery, values)
  if (result.rowCount !== 1) throw new Error('Failed to update todo') //
  return result.rows[0]
  
}

const deleteTodoModel = async (id) => {
  const deleteQuery = `DELETE FROM todoschema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(deleteQuery)
  console.log('deleteTodoModel: result ', result)
  if (result.rowCount !== 1) throw new Error('Failed to delete todo') //
  return result.rowCount
  // return result.rowCount // throw error
  
}

const getTodoByIdTodo = async (id) => {
  const getByIdQuery = `SELECT FROM todoschema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(getByIdQuery)
  if (result.rowCount !== 1) throw new Error('Resource not found') //
  // console.log('getTodoByIdTodo', result)
  return result.rowCount
}

const showDoneModel = async () => {
  const showDoneQuery = `SELECT * FROM todoschema.todo
  WHERE is_checked = true ORDER BY todo_id;`
  const result = await client.query(showDoneQuery)
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

const deleteDoneModel = async () => {
  console.log('deleteDoneModel')
  const deleteDoneQuery = `DELETE FROM todoschema.todo
  WHERE is_checked = true;`
  const result = await client.query(deleteDoneQuery)
  // return result.rowCount
  if (result.rowCount >= 0) return result.rowCount
  // return result.rowCount // throw error
  throw new Error('Failed to delete done todos') //
}

const deleteAllModel = async () => {
  const deleteAllQuery = 'DELETE FROM todoschema.todo;'
  const result = await client.query(deleteAllQuery)
  // return result.rowCount
  if (result.rowCount >= 0) return result.rowCount
  // return result.rowCount // throw error
  throw new Error('Failed to delete all todos') //
}

module.exports = { createTodoModel, getTodoModel, updateTodoModel, deleteTodoModel, getTodoByIdTodo, showDoneModel, deleteDoneModel, deleteAllModel }
