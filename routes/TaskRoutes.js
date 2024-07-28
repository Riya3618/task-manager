const express=require('express');
const {createTask,getTask,updateTask,deleteTask,getNotifications}=require('../controllers/taskController');
const auth=require('../middleware/auth');
const router=express.Router();
router.post('/',auth,createTask);
router.get('/',auth,getTask);
router.put('/:id',auth,updateTask);
router.delete('./:id',auth,deleteTask);
router.get('/notifications',auth,getNotifications);
module.exports=router;

