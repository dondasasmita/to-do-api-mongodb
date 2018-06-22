const mongoose = require('mongoose')
//loading validator library
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

//determines what gets returned when a mongoose model converted into JSON value
//client side will only get id, username, email 
UserSchema.methods.toJSON = function () {
    let user = this
    //converts mongoose variable to regular object 
    let userObject = user.toObject()
    return _.pick(userObject, ['_id', 'username', 'email'])

}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString()
    
    //push and update the user model
    // Code below had to be modified, it did not return the x-auth oh htpp headers
    user.tokens = user.tokens.concat([{access,token}])
    return user.save().then(() => {
       return token
    })
}

//defining schema for users
const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}
