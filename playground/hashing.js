const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

let user = {
    id: 10
}

let token = jwt.sign(user, 'somesalt')

console.log(token)

let decoded = jwt.verify(token, 'somesalt')

console.log(decoded)

// let message = "I am user number 3"
// let hash = SHA256(message).toString()

// console.log(hash)

// let user = {
//     id: 3
// }

// let token = {
//     user, 
//     hash: SHA256(JSON.stringify(user) + 'somesalt').toString()
// }

// // let fakeHash = SHA256(JSON.stringify(user)).toString()
// let fakeHash = SHA256(JSON.stringify(user) + 'somesalt').toString()

// console.log(token.user)
// console.log(token.hash)

// if (token.hash === fakeHash) {
//     console.log("No problem")
// } else {
//     console.log("Changed!")
// }