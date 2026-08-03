const User=require('../Models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
exports.SignUp= async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            res.status(400).json("All fields are required");
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=User.create({
            name,
            email,
            password:hashedPassword,
        });
        res.status(200).json('User successfully registered');
    } catch (error) {
        res.status(500).json('Error Occured',error);
    };
};
exports.Login= async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=User.findOne({email});
        if(!user){
            res.status(401).json('User not Found');
        };
        const CheckPassword= await bcrypt.compare(password,user.password);
        if(!CheckPassword){
            res.status(400).json('Invalid credintional');
        }
        const token=jwt.sign({id:user._id},"My secret key",{expiresIn:'5m'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:FontFaceSetLoadEvent,
            sameSite:'lax'
        });
        res.status(200).json('user logged successfully');
    } catch (error) {
        res.status(500).json('Error occured');
    }
}