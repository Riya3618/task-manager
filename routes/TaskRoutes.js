import express from 'express';
import {createTask,getTask,updateTask,deleteTask,getNotifications} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const router=express.Router();
router.post('/',auth,createTask);
router.get('/',auth,getTask);
router.put('/:id',auth,updateTask);
router.delete('./:id',auth,deleteTask);
router.get('/notifications',auth,getNotifications);
export default router;

