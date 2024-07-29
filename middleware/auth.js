import jwt from 'jsonwebtoken';
const auth=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1];
    if(!token)
       return res.status(401).json({message:'Token not available'});
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err) return res.status(403).json({message:'Failed to authenticate token'});
            req.user=decoded;
            next();
        })
    }
};
export default auth;