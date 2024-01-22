const express = require('express');
const cors = require('cors');
const app = express();
const tasks = require('./routes/task')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();

// var twoSum = function(nums, target) {
//     for (let i = 0; i < nums.length; i++){
//         for (let j = i + 1; j < nums.length; j++){
//             if (nums[j] === target - nums[i] ) {
//                return [i, j]
//             } 
//         }
//     }
//     return null;
// };
// const n = twoSum([3,3], 6);
// console.log(n);
