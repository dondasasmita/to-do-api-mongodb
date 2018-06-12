//Load mongodb library
const MongoClient = require('mongodb').MongoClient


//Below code is a destructure of the mongoclient library, uncomment to use  
//const {MongoClient, ObjectID} = require('mongodb')

//To get the ID uncomment this line  
// let obj = new ObjectID()
// console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        //return keyword will stop the remaining codes to execute if error exists
        return console.log('Unable to establish connection with MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert', error)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))

    // })

    db.collection('Users').insertOne({
        name: 'Septian',
        age: 32,
        location: 'Borneo'
    }, (err,result) => {
        if (err){
            return console.log('Unable to insert user data', err)
        }
        console.log(result.ops[0]._id.getTimestamp())
    })

    client.close()
})