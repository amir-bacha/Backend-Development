const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const userRoutes=require('./Routes/authRoutes');
const postRoutes=require('./Routes/postRoutes');
require('dotenv').config();
const PORT=process.env.PORT || 3000;
console.log('MONGO_URI:', process.env.MONGO_URI);
const app=express();
app.use(cors({
    origin: 'http://localhost:5173', // your frontend's exact origin
    credentials: true                 // required if you're using cookies (httpOnly JWT)
}));
app.use(cookieParser());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then((err)=>{
    console.log('mongodb is connected ')
})
.catch((err)=>{
    console.log('Mongodb connection errore',err)
})
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
