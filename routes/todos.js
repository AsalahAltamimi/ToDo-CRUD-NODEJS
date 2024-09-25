const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const todoController = require('../controllers/todoController'); 

// GET all items 
router.get('/', todoController.getAllTodos);

// GET item by ID
router.get('/:id', todoController.getTodoById);

// POST 
router.post(
    '/',
    [
        check('title', 'Title is required and should not be empty').not().isEmpty(),
        check('description', 'Description should be a string').optional().isString()
    ],
    todoController.createTodo
);

// PUT 
router.put(
    '/:id',
    [
        check('title', 'Title should be a string').optional().isString(),
        check('description', 'Description should be a string').optional().isString(),
        check('completed', 'Completed should be a boolean').optional().isBoolean()
    ],
    todoController.updateTodo
);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;

