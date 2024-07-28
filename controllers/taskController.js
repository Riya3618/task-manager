const Task=require('../models/Task');
exports.createTask=async(req,res)=>{
    const {title,description,dueDate}=req.body;
    try{
        const task=await Task.create({title,description,dueDate,user:req.user.id});
        res.status(201).json(task);
    }
    catch(e){
       
        res.status(400).json({message: 'Task could not be created'});
    }
};
exports.getTask=async(req,res)=>{
    const tasks=await Task.find({user:req.user.id});
    res.json(tasks);
};

exports.updateTask=async(req,res)=>{
    const {title,description,dueDate,status}=req.body;
    try{
        const task=await Task.findByIdAndUpdate(
            req.params.id,
            {title,description,dueDate,status},
            {new: true, runValidators:true}
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }
    catch(e){
        res.status(400).json({message: e.message});
    }
};

exports.deleteTask=async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.json({message:'Task deleted'});
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
};
exports.getNotifications=async(req,res)=>{
    try{
        const tasks=await Task.find({user: req.user.id}).populate('user');
        const notifications=tasks.flatMap(task=>task.notifications);
        res.json(notifications);
    }
    catch(e){
         res.status(500).json({message: e.message});
    }
};