const todos = require('../controllers/todo.controller')
const router = require('express').Router();

router.get('/get', todos.getTodos)
router.post('/add', todos.addTodo)
router.patch('/edit', todos.editTodo)
router.patch('/edit/status', todos.changeStatus)
router.delete('/delete/:id', todos.deleteTodo)
router.delete('/delete/completed', todos.deleteAllCompletedTodos)

module.exports = router