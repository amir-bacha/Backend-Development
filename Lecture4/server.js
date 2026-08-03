const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.json('Hello world by me')
});
app.listen(3000,()=>{
    console.log('Running at port 3000');
})