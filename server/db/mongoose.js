//load mongoose 
const mongoose = require('mongoose')
const {MONGODB_URI} = require('./../../config')
// require('mongoose-type-email')

//configured connection to the database
mongoose.connect({MONGODB_URI} ||'mongodb://localhost:27017/TodoApp')

//export mongoose
module.exports = {
    mongoose
}