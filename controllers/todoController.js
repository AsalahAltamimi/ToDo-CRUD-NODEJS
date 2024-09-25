// Import UUID
const { v4: uuidv4 } = require('uuid'); 
// Import validation result
const { validationResult } = require('express-validator'); 

let todos = []; 

// Get all todos
exports.getAllTodos = (req, res) => {
    res.json(todos); 
};

// Get a single todo by ID
exports.getTodoById = (req, res) => {
    const todo = todos.find(t => t.id === req.params.id); 
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' }); 
    }
    res.json(todo);
};

// Create a new todo
exports.createTodo = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const detailedErrors = errors.array().map(err => {
            let message;
            switch (err.param) {
                case 'title':
                    message = 'Title is required and must be a non-empty string.';
                    break;
                case 'description':
                    message = 'Description must be a string if provided.';
                    break;
                case 'completed':
                    message = 'The "completed" field must be either true or false (boolean).';
                    break;
                default:
                    message = err.msg;
            }
            return {
                field: err.param,
                message: message
            };
        });
        return res.status(400).json({ errors: detailedErrors }); 
    }

    const { title, description } = req.body;

    const newTodo = {
        id: uuidv4(), 
        title,
        description: description || '',
        completed: false,
        createdAt: new Date(), 
        updatedAt: new Date()  
    };

    todos.push(newTodo);
    res.status(201).json(newTodo); 
};

// Update a todo by ID
exports.updateTodo = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const detailedErrors = errors.array().map(err => {
            let message;
            switch (err.param) {
                case 'title':
                    message = 'Title should be a non-empty string.';
                    break;
                case 'description':
                    message = 'Description should be a string.';
                    break;
                case 'completed':
                    //need improvment
                    message = 'The "completed" field must be either true or false (boolean).';
                    break;
                default:
                    message = err.msg;
            }
            return {
                field: err.param,
                message: message
            };
        });
        return res.status(400).json({ errors: detailedErrors }); 
    }

    const todo = todos.find(t => t.id === req.params.id); 
    if (!todo) {
        return res.status(404).json({ message: `Todo not found` }); 
    }

    const { title, description, completed } = req.body;

    // Update fields if provided
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (typeof completed !== 'undefined') todo.completed = completed;

    todo.updatedAt = new Date();

    res.json(todo); 
};

// Delete a todo by ID
exports.deleteTodo = (req, res) => {
    const index = todos.findIndex(t => t.id === req.params.id); 
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' }); 
    }

    const deletedTodo = todos.splice(index, 1); 
    res.json(deletedTodo); 
};
