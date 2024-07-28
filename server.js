const express=require('express');
const connectDB=require('./config/db');
const userRoutes=require('./routes/UserRoutes');
const taskRoutes=require('./routes/TaskRoutes');
const Task=require('./models/Task');
const dotenv=require('dotenv');
const cron=require('node-cron');
dotenv.config();
const app=express();
connectDB();
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);
const sendNotification=async()=>{
    const now=new Date();
    const upcomingTask=await Task.find({
        dueDate:{$gte: now, $lt: new Date(now.getTime()+ 24*60*60*1000)},
    }).populate('user');
    upcomingTask.forEach(async (task) => {
        const notificationMessage = `Your task "${task.title}" is due soon!`;
        task.notifications.push({message: notificationMessage});
        await task.save();
    });
};
cron.schedule('0 9 * * *',sendNotification);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})
