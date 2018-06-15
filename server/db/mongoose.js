//load mongoose 
const mongoose = require('mongoose')
const config = require('./../../config')
// require('mongoose-type-email')

//configured connection to the database
mongoose.connect(config.MONGODB_URI ||'mongodb://localhost:27017/TodoApp')

//export mongoose
module.exports = {
    mongoose
}