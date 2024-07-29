import express, { json } from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import taskRoutes from './routes/TaskRoutes.js';
import Task from './models/Task.js';
import { config } from 'dotenv';
import { schedule } from 'node-cron';
config();
const app=express();
connectDB();
app.use(json());
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
schedule('0 9 * * *',sendNotification);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})
