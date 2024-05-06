const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    ID: {type: Number},
    Name: {type: String},
    Gender: {type: String}
})
module.exports = mongoose.model('users', UserSchema)