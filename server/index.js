 import express from 'express';
 import bodyParse from 'body-parser';
 import mongoose from 'mongoose';
 import cors from 'cors';
 import dotenv from 'dotenv';


 import postRoutes from './routes/post.js';
 import userRoutes from './routes/user.js';

 
 
 const app=express();
 dotenv.config();
 app.use(bodyParse.json({limit:"30 mb",extended:true}));
 app.use(bodyParse.urlencoded({limit:"30 mb",extended:true}));
 app.use(cors());

 app.use('/posts',postRoutes);
 app.use('/user',userRoutes);

const PORT =process.env.PORT || 5000; 
mongoose.connect(process.env.connection_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>app.listen(PORT,()=>console.log(`Server running on port:${PORT}`))).catch((error)=>console.log(error));
//mongoose.set('useFindAndModify',true);
