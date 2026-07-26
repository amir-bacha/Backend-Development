 const express=require('express');
 const app=express();
 app.get('/',(req,res)=>{
    res.end('Hello world');
 })
 app.get('/user/:id',(req,res)=>{
    console.log(req.params);
    res.end('Hello user');
 })
 app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })