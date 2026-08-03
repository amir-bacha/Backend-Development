const authorize=(req,res,next)=>{
  try {
      if(!req.user){
        return res.status(401).json({message:"Access denied"});
    }
    if(req.user.role!=='Admin'){
        return res.status(400).json(message:"No authorization")
    }
    next();
  } catch (error) {
    res.status(500).json(message:"Error ",error)
  }
}
module.exports={authorize}