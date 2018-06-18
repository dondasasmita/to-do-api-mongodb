//load mongoose 
const mongoose = require('mongoose')
// const config = require('./config')
// require('mongoose-type-email')

//configured connection to the database
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp')

//uncomment below for connection to local database
// mongoose.connect('mongodb://localhost:27017/TodoApp')

//export mongoose
module.exports = {
    mongoose
}