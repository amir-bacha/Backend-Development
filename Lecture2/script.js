const express=require('express');
const app=express();
app.use(express.json());
app.use((req,res,next)=>{
    console.log("Middleware is Running ");
    next();
});
app.get("/",(req,res)=>{
    console.log("Welcome to Routes")
    res.json('Welcome to Node Js tutorial')
});
app.listen(3000,()=>{
    console.log('Port is Running at port 3000');
});