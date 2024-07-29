import User from '../models/User.js'
import jwt from 'jsonwebtoken';
export const register=async(req,res)=>{
    const{username,password}=req.body;
    try{
        const user=await User.create({username,password});
        res.status(201).json({ message: 'User created', user });
    }
    catch(e){
        res.status(400).json({message:'Error',e});
    }
};
export const login=async(req,res)=>{
    const{username,password}=req.body;
    const user=await User.findOne({username});
    if(user && (await User.matchPassword(password))){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1h'});
        res.json({token});
    }
    else{
        res.status(401).json({message:'Invalid credentials'});
        
    }
};