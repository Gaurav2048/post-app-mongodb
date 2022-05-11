const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: [ 3, 'Min length is 3' ]
    },
    email: {
        type: String,
        required: true,
        unique: [ true, 'Email already exists']
    }, 
    mobileNumber: {
        type: String,
        required: true,
        minLength: [10, 'Please add a valid number']
    }, 
    password: {
        type: String,
        required: true,
    }, 
    token: {
        type: String,
    }
})

const UserModel = mongoose.model('users', UserSchema); 
module.exports = UserModel; 
