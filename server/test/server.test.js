/*
TESTING ENVIRONMENT
DO NOT RUN - ERRORs
*/

//loading libraries for test case
const expect = require('expect')
const request = require('supertest')

//loading the app from server.js
const {app} = require('./../server.js')
const {Todo} = require('./../models/todo')

// beforeEach((done) => {
//     Todo.remove({}).then(() => done())
//     // .catch((e) => {
//     //     done(e)
//     // })
// })

describe('Server Test', () => {
    //Post Test
    describe('POST /', () => {
        it('should persist data to the database', (done) =>{
            let toDoText = 'This is a todo test'
            request(app)
            .post('/todos')
            .send({toDoText})
            .expect(200)
            .expect((response), () => {
                expect(response.body.text).toBe(toDoText)
            })
            .end((error, response) => {
                if (error) {
                    return done(error)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(toDoText)
                    done()
                }).catch((e) => done(e))
            })

        })

    })

})