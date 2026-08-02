const express=require('express');
const router=express.Router();
const {createPost,getAllPosts}=require('../Controllers/postController');
const {verifyToken}=require('../Middleware/authMiddleware');
router.post('/', verifyToken,createPost);
router.get('/', verifyToken,getAllPosts);
module.exports=router;