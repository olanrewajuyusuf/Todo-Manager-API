const Task = require('../models/task');


const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks}) 
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res) => {
    try {
        console.log(req.body);
        const task = await Task.create(req.body)
        res.status(201).json({task}) 
    } catch (error) {
        res.status(500).json({msg: error})
    }
    
}

const getSingleTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID})

        if (!task) {
            return res.status(404).json({msg: `No respose with the id: ${taskID}`})
        }
        res.status(200).json({task}) 
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({msg: `No task with the id: ${taskID}`})
        }

        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID})

        if (!task) {
            return res.status(404).json({msg: `No respose with the id: ${taskID}`})
        }
        res.status(200).json({task: null, success: true}) 
        // res.status(200).json({task}) 
        // res.status(200).send()
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteCompletedTasks = async (req, res) => {
    try {
        const task = await Task.deleteMany({completed: true})

        if (!task) {
            return res.status(404).json({msg: `No Task with completed = true}`})
        }
        res.status(200).json({task: null, success: true}) 
        // res.status(200).json({task}) 
        // res.status(200).send()
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
    deleteCompletedTasks,
}