import Task from "../models/Task.js";
export const createTask=async(req,res)=>{
    const {title,description,dueDate}=req.body;
    try{
        const task=await Task.create({title,description,dueDate,user:req.user.id});
        res.status(201).json(task);
    }
    catch(e){
       
        res.status(400).json({message: 'Task could not be created'});
    }
};
export const getTask=async(req,res)=>{
    const tasks=await Task.find({user:req.user.id});
    res.json(tasks);
};

export const updateTask=async(req,res)=>{
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

export const deleteTask=async(req,res)=>{
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
export const getNotifications=async(req,res)=>{
    try{
        const tasks=await Task.find({user: req.user.id}).populate('user');
        const notifications=tasks.flatMap(task=>task.notifications);
        res.json(notifications);
    }
    catch(e){
         res.status(500).json({message: e.message});
    }
};