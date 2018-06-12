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

    // fetch collections using query
    db.collection('Users').find({name: 'David'}).toArray().then((documents) => {
        console.log('Fetching Users')
        console.log(JSON.stringify(documents,undefined,2))
    }, (error) => {
        console.log('Unable to fetch documents', error)
    }) 

   // fetch all items in the collection 
//    db.collection('Todos').find().toArray().then((docs) => {
//        console.log('Todos')
//        console.log(JSON.stringify(docs,undefined,2))
//    }, (error) => {
//        console.log('Unable to fetch document', error)
//    })

    // count items in the collection
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count : ${count}`)
    // }, (error) => {
    //     console.log('Unable to fetch document', error)
    // })

    client.close()
})