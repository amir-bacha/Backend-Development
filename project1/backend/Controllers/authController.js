const User=require('../Models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// To add/register a new user in database
exports.register=async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        const ExistingUser= await User.findOne({email});
        if(ExistingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashed_password=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashed_password
        });
        const userResponse=newUser.toObject();
        delete userResponse.password;
        res.status(201).json({message:"User created successfully",user:userResponse});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
 // How to login
exports.login=async(req,res)=>{
    try {
        let {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
                // to check password
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        } 
                // Making of token to send to user
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'10m'});
        res.cookie('token', token, {
            httpOnly: true,      // JS can't access it — safer against XSS
            secure: false,        // true in production (https only)
            sameSite:'lax'
           });
        const userResponse=user.toObject();
        delete userResponse.password;
        res.status(200).json({message:" user Logged successfullly",user:userResponse});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}