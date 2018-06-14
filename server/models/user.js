const mongoose = require('mongoose')

//defining schema for users
const User = mongoose.model('User', {
    username: {
        type: String,
        // trim: true,
        required: true
    },
    email: {
        type: String, 
        required: true,
        // trim: true,
        min: 10
    }
})

module.exports = {
    User
}

// //create a new user
// User.create({
//     username: 'tangmjudy',
//     email: ''
// }, (error) => {
//     if (error) console.log('Unable to create user', error)
// })