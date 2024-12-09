const mongoose = require("mongoose")

const connectDB = (url) => {
    mongoose.connect(url)
    .then(() => console.log('MongoDB has been connected!'))
    .catch((error) => console.log(error.message))
}

module.exports = connectDB