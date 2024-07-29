import mongoose from 'mongoose';
const TaskSchema= new mongoose.Schema({
    title:{ type: String, required: true},
    description:{ type: String, required: true},
    dueDate:{ type: Date},
    status:{ type: String, enum:['pending','completed'], default: 'pending'},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    notifications: [{message: String, createdAt: {type:Date, default: Date.now}}],
});
const Task=mongoose.model('Task',TaskSchema);
export default Task;