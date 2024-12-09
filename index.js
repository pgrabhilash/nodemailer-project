require('dotenv').config();
const express = require('express');
const emailRouter = require('./routes/index');
const connectDB = require('./db/connectDB');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/', (req, res) => {
   res.send("Server is running...")
})

// routing
app.use('/api/v1/email', emailRouter)

connectDB(process.env.MONGO_URI)

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}...`)
})