const express = require('express');
const cors = require('cors');
const app = express();
const tasks = require('./routes/task')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks)


const port = 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();
