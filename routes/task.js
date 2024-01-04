const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
    deleteCompletedTasks
} = require('../controllers/task')

router.route('/').get(getAllTasks).post(createTask).delete(deleteCompletedTasks);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;