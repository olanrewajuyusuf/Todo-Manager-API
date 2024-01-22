const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');


const getAllTasks = asyncWrapper( async (req,res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks}) ;
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task}) 
})

const getSingleTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID})

    if (!task) {
        return next(createCustomError(`No respose with the id: ${taskID}`, 404))
    }
    res.status(200).json({task}) 
})

const updateTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return res.status(404).json({msg: `No task with the id: ${taskID}`})
    }

    res.status(200).json({task})
})

const deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID})

    if (!task) {
        return res.status(404).json({msg: `No respose with the id: ${taskID}`})
    }
    res.status(200).json({task: null, success: true}) 
    // res.status(200).json({task}) 
    // res.status(200).send()
})

const deleteCompletedTasks = asyncWrapper( async (req, res) => {
    const task = await Task.deleteMany({completed: true})

    if (!task) {
        return res.status(404).json({msg: `No Task with completed = true}`})
    }
    res.status(200).json({task: null, success: true}) 
})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
    deleteCompletedTasks,
}