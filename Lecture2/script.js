const express=require('express');
const bcrypt=require('bcrypt');
const app=express();
app.use(express.json());

// Async function to hash the password using bcrypt

 async function bcryptPassword(Plainpassword){
    const hashPassword=await bcrypt.hash(Plainpassword,10,function(err,hash){
        console.log(hash);
    })
    return hashPassword;
}

const users=[
    {username:"Mujahid",password:"1234"},
]
app.get("/",(req,res)=>{
    res.json('Welcome to  User mnagement system')
});
app.post("/users", async (req,res)=>{
    const {username,password}=req.body;
    const hashPassword=await bcryptPassword(password);
    const newUser={
        username,
        password:hashPassword,
    }
    users.push(newUser);
    console.log(newUser);
    res.json(newUser);
})
app.listen(3000,()=>{
    console.log('Running at port 3000');
});