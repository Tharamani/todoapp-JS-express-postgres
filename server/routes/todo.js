const express = require('express')
const todoController = require('../controllers/todo')

const router = express.Router()
// Router middle-ware for get request
router.get('/', todoController.getTodo)
router.post('/', todoController.createTodo)
router.put('/:id', todoController.editTodo)
router.delete('/deletedone', todoController.deleteDone)
router.delete('/deleteall', todoController.deleteAll)
router.delete('/:id', todoController.deleteTodo)
router.get('/showdone', todoController.showDone)

module.exports = router
