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

    //find and update a document from Todos
    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectID('5b208d74d650f52adb967ddf')
    // },{
    //     $set:{completed: true}
    // },{
    //     returnOriginal: false
    // }).then((docs) => {
    //     console.log('Found and updated item')
    //     console.log(docs)
    // }, (error) => {
    //     console.log('Unable to find and delete', error)
    // })

    //find and update a document from Users
    db.collection('Users').findOneAndUpdate({
        _id: ObjectID('5b1f934d7d3f151c1114b298')
    },{
        $set:{location: 'Singapore'},
        $inc:{age: 1}
    },{
        returnOriginal: false
    }).then((result)=> {
        console.log('Successfully updated user')
        console.log(JSON.stringify(result,undefined,2))
    }, (err) => {
        console.log('Unable to find and update')
    })

    client.close()
})