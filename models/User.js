const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'https://img.icons8.com/nolan/64/name.png'
    }
})

module.exports = mongoose.model('User', UserSchema);