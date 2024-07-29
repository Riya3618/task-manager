import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema=new Schema({
    username:{type: String, required: true, unique:true},
    password:{type: String, required: true},
});
UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))return next;
    this.password=await bcrypt.hash(this.password,10);
    next();
});
UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
const User=mongoose.model('User',UserSchema);
export default User;