const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusValues = ['new', 'in_progress', 'complete']

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        required: true,
        validate: {
            validator: function(status) {
                return statusValues.includes(status)
            },
            message: 'You must provide correct name of status'
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;