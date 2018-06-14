const mongoose = require('mongoose')

//define the schema for todo
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        //always false when adding a new todo
        default: false
    },
    completedAt: {
        type: Number,
        //will only be inserted when completed is true
        default: null
    } 
})

module.exports = {
    Todo
}