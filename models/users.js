const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: [true, "Fullname is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    message: String,
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User