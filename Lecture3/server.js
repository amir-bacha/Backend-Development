const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('./Models/userModel');
const app=express();
app.use(express.json());
// Connecting to the database
mongoose.connect('mongodb://localhost:27017/firstdb');
// Main route
app.get("/",(req,res)=>{
    res.json("Welcome to the Signup form ");
});
   // Creating a user
app.post("/user", async(req,res)=>{
    try {
         const {name,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser= await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({message:"User created successfully",user:newUser});
    } catch (error) {
        res.status(500).
        json({message:"Error creating user",error:error.message});
    }
});
 // Login a user
 app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    const user=User.findOne({email});
    if(!user){
        res.status(404).json({message:"User not found"});
        return;
    }
    // Here to compare the password with stored hashed password
    bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err){
            res.status(500).json({message:"Error comparing passwords",error:err.message});
        }
        if(isMatch){
            // Generate a JWT token
            const token=jwt.sign({id:user._id},'amazingsecret',{expiresIn:"1h"});
            res.status(200).json({message:"Login successful", token});
        } else {
            res.status(401).json({message:"Invalid password"});
        }
    })
 })
app.listen(3000,()=>{
    console.log('Running at port 3000');
});