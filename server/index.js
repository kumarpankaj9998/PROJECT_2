 import express from 'express';
 import bodyParse from 'body-parser';
 import mongoose from 'mongoose';
 import cors from 'cors';


 import postRoutes from './routes/post.js';
 
 
 const app=express();
 
 app.use('/posts',postRoutes);

 app.use(bodyParse.json({limit:"30 mb",extended:true}));
 app.use(bodyParse.urlencoded({limit:"30 mb",extended:true}));
 app.use(cors());

 const connection_URL = "mongodb+srv://userName:7891216649a@cluster0.jlin0.mongodb.net/?retryWrites=true&w=majority"
const PORT =process.env.PORT || 5000; 
mongoose.connect(connection_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>app.listen(PORT,()=>console.log(`Server running on port:${PORT}`))).catch((error)=>console.log(error));
// mongoose.set('useFindAndModify',true);