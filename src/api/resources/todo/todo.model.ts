import * as mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true })

const Todo = mongoose.model('todo', todoSchema)

export default Todo
