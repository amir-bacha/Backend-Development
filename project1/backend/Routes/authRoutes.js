const express=require('express');
const router=express.Router();
const {register,login}=require('../Controllers/authController');
// to register a new user
router.post('/register',register);
// to login a user
router.post('/login',login);
module.exports=router;
