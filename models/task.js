const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // name: String,
    // completed: true
    // ======for validation======
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        // maxlength: [20, 'name can not be more than 20 chars...'],
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Tasks', TaskSchema)