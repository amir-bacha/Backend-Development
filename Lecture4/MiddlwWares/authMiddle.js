const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    try {
         const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Acess denied"});
    };
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    res.user=decoded;
    } catch (error) {
       res.status(500).json({message:"No logged"});
    }
    next();
};
module.exports={verifyToken};