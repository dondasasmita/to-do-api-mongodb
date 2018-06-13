//Load mongodb library
// const MongoClient = require('mongodb').MongoClient


//Below code is a destructure of the mongoclient library, uncomment to use  
const {MongoClient, ObjectID} = require('mongodb')

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

    //delete multiple documents from Todos
    // db.collection('Todos').deleteMany({text:'have breakfast'}).then(() => {
    //     console.log('Item has been deleted')
    // }, (error) => {
    //     console.log('Unable to delete', error)
    // }) 

    //delete one item by ID from Todos
    // db.collection('Todos').deleteOne({
    //     _id: ObjectID('5b1f8ba16c1c9d1ae39d032d')
    // }).then((result) => {
    //     console.log('Item has been deleted')
    //     console.log(result)
    // }, (error) => {
    //     console.log('Unable to delete', error)
    // }) 

    //find and delete a document from Users
    db.collection('Users').findOneAndDelete({name: 'Jason'}).then((result) => {
        console.log('Found and deleted item')
        console.log(result)
    }, (error) => {
        console.log('Unable to find and delete', error)
    })

    client.close()
})