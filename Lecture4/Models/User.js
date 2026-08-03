const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
},
    {timestamps:true}

);

const user=mongoose.model('User',UserSchema);
module.exports=user;