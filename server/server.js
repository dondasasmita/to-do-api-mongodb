//import libraries
const express = require('express')
const bodyParser = require('body-parser')

//local imports
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

//create app 
const app = express()

app.use(bodyParser.json())

//create
app.post('/todos', (request, result) => {
    let todo = new Todo ({
        text: request.body.text
    })
    todo.save().then((doc) => {
        result.send(doc)
    }, (error) => {
        result.status(400).send(error)
    })
})

// //read
// app.get('/todos')
// //update
// app.post('/')
// //delete
// app.delete('')


app.listen(3000, () => {
    console.log('Started on port 3000')
})