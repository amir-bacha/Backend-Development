const Post=require('../Models/postModel');
// to create a new post
exports.createPost=async(req,res)=>{
    try {
        let {title,description}=req.body;
        if(!title || !description){
         return res.status(400).json({message:"Title and description are required"});
        }
        const newPost=await Post.create({
            author:req.user.id,
            title,
            description
        });
        res.status(201).json({message:"Post created successfully",post:newPost});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
// View all posts authorized user 
exports.getAllPosts=async(req,res)=>{
    try {
        const posts=await Post.find({author:req.user.id});
        if(!posts){
            return res.status(404).json({message:"No posts found"});
        }
        res.status(200).json({message:"Posts retrieved successfully",posts});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}