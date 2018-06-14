//load mongoose 
const mongoose = require('mongoose')

//configured connection to the database
mongoose.connect('mongodb://localhost:27017/TodoApp')

//define the schema
const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    } 
})

//create a new todo instance
Todo.create({
    text: 'Try one without curly braces in the if statement',
    completed: false,
    completedAt: 132
}, (error) => {
    if (error) console.log('Unable to add todo', error)
})