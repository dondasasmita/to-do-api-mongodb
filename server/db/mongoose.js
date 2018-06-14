//load mongoose 
const mongoose = require('mongoose')
// require('mongoose-type-email')

//configured connection to the database
mongoose.connect('mongodb://localhost:27017/TodoApp')

//export mongoose
module.exports = {
    mongoose
}