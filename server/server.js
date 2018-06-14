//import libraries
const express = require('express')
const bodyParser = require('body-parser')

//local imports
const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

//create app 
const app = express()

app.use(bodyParser.json())

//a function to validate ID
const validateID = (id) => {
    if (!ObjectID.isValid(id)) {
        return response.status(404).send()
    } 
}

//Create a todo
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

//Get all todos 
app.get('/todos', (request, result) => {
    Todo.find().then((todos) => {
        result.send({todos})
    }, (error) => {
        result.status(400).send(error)
    })
})

//GET todos by id
app.get('/todos/:id', (request, response) => {
    let id = request.params.id
    //validate ID
    validateID(id)

    Todo.findById(id).then((todo) => {
        response.send(todo)
    }, (error) => {
        return response.status(404).send()
    })
})

//UPDATE todos by id
app.put('/todos/:id', (request,result) => {
    let id = request.params.id

    validateID(id)

    Todo.findOneAndUpdate((id),{
        text: request.body.text
    },{
        upsert: true
    }, (e) => {
        result.status(400).send(e)
    })    
})

// DELETE todo by id
app.delete('/todos/:id', (request, result) => {
    let id = request.params.id

    validateID(id)
    
    Todo.findOneAndRemove((id) => {
        result.send(id)
    }, (e) => {
        result.status(404).send(e)
    })
})

//GET user by id
app.get('/users/:id', (req, res) => {
    let id = req.params.id

    // validate ID
    validateID(id)

    User.findById(id).then((user) => {
        res.send(user)
    }, (err) => {
        res.status(404).send()
    })
})


app.listen(3000, () => {
    console.log('Started on port 3000')
})

exports.module = {
    app
}