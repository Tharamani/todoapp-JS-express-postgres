const { client } = require('../config/db')

const getTodoModel = async () => {
  const text = 'SELECT * FROM todoschema.todo ORDER BY todo_id;'
  const result = await client.query(text)
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

// post all properties
const createTodoModel = async (title, notes, dueDate, priority, isChecked) => {
  console.log('createTodoModel : >>>>>>>>', title, notes, dueDate, priority, isChecked)
  const text = 'INSERT INTO todoschema.todo(title, notes, due_date, priority, is_checked ) VALUES($1, $2, $3, $4, $5) RETURNING *'
  const values = [title, notes, dueDate, priority, isChecked]
  const result = await client.query(text, values)
  console.log('createTodoModel: result ', result)
  if (result.rowCount === 1) return [result.rows[0], null]
  return [null]
  // throw new Error('Failed to create todo')
}

const updateTodoModel = async (id, title, notes, dueDate, priority, isChecked) => {
  const values = [id, title, notes, dueDate, priority, isChecked]
  const text = 'UPDATE todoschema.todo SET  title = $2, notes = $3, due_date = $4, priority = $5, is_checked = $6 WHERE todo_id = $1 RETURNING *'

  // const updateQuery = `UPDATE todoSchema.todo
  //   SET title = '${todoText}', notes = '${todoNote}', due_date = '${dueDate}', priority = '${priority}', is_checked = '${isChecked}'
  //   WHERE todo_id = ${id} RETURNING todo_id, title, notes, due_date, priority, is_checked;`
  const result = await client.query(text, values)
  if (result.rowCount === 1) if (result.rowCount === 1) return [result.rows[0], null]
  return [null]
}

const deleteTodoModel = async (id) => {
  const deleteQuery = `DELETE FROM todoschema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(deleteQuery)
  return result.rowCount
}

const getTodoByIdTodo = async (id) => {
  const getByIdQuery = `SELECT FROM todoschema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(getByIdQuery)
  return result.rowCount
}

const showDoneModel = async () => {
  const showDoneQuery = `SELECT * FROM todoschema.todo
  WHERE is_checked = 'true' ORDER BY todo_id;`
  const result = await client.query(showDoneQuery)
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

const deleteDoneModel = async () => {
  console.log('deleteDoneModel')
  const deleteDoneQuery = `DELETE FROM todoschema.todo
  WHERE is_checked = true;`
  const result = await client.query(deleteDoneQuery)
  return result.rowCount
}

const deleteAllModel = async () => {
  const deleteAllQuery = 'DELETE FROM todoschema.todo;'
  const result = await client.query(deleteAllQuery)
  return result.rowCount
}

module.exports = { createTodoModel, getTodoModel, updateTodoModel, deleteTodoModel, getTodoByIdTodo, showDoneModel, deleteDoneModel, deleteAllModel }
