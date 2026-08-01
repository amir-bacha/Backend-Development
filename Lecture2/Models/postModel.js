const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    }
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;