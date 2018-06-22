//import libraries
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

//local imports
const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

//create app 
const app = express()
//setup port for deployment
const port = process.env.PORT || 3000

app.use(bodyParser.json())

//a function to validate ID
const validateID = (id) => {
    if (!ObjectID.isValid(id)) {
        return response.status(404).send()
    } 
}

/*
-----------------
TODOS ROUTES
-----------------
*/

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
    }).catch((e) => {
        response.status(400).send()
    })
})

//UPDATE todos by id
app.patch('/todos/:id', (request,result) => {
    let id = request.params.id
    //grabbed the request body and only allwoing the text and completed props to be update by user
    let body = _.pick(request.body, ['text', 'completed'])

    validateID(id)

    //get timestamp when completed is changed to true
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) => {
        if(!todo){
            result.status(404).send()
        }
        result.status(200).send({todo})
    }).catch((e) => {
        result.status(400).send()
    })

})

// DELETE todo by id
app.delete('/todos/:id', (request, result) => {
    let id = request.params.id

    validateID(id)

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return result.status(404).send()
        }
        result.status(200).send(todo)
    }).catch((e) => {
        result.status(400).send()
    })
})

/*
-----------------
USER ROUTES
-----------------
*/

//GET user by id
app.get('/users/:id', (req, res) => {
    let id = req.params.id

    // validate ID
    validateID(id)

    User.findById(id).then((user) => {
        res.status(200).send(user)
    }, (err) => {
        res.status(404).send()
    })
})

//POST request to create a user
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['username', 'email', 'password'])
    let user = new User (body)

    user.save().then(() => {
        return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        })

    //Below code does not return the header with the token (x-auth - undefined)    
    // user.save().then(() => {
    //     user.generateAuthToken() 
    // }).then((token) => {
    //     res.header('x-auth',token).send(user)
    // }).catch((e) => {
    //     res.status(400).send()
    // })
})

//DELETE request 
app.delete('/users/:id', (req, res) => {
    let id = req.params.id
    validateID(id)

    User.findByIdAndRemove(id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.status(202).send()
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

exports.module = {
    app
}