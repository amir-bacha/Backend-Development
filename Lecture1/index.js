const express=require('express');
const app=express();
app.get('/search',(req,res)=>{
    console.log(req.query.name);
    res.end('Hello world this is query parameter')
});
app.listen(3000,()=>{
    console.log("Running at 3000");
})