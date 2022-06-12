import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export  const getPosts = async (req, res)=>{
    try {
        const postMessages=await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
// wait call kar raha chochu ho tum...okay
export const createPost = async (req, res) =>{
    const post= req.body;
    
    const newPost= new PostMessage(post);


try {
    await newPost.save();
    
    res.status(201).jso (newPost);

} catch (error) {
    res.status(409).json({message: error});
}

}
export const updatePost = async (req, res) =>{
    
    const {id : _id}=req.params;//renaming id into _id
    const uPost= req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("no post with the given id");
    
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,[...uPost,_id],{new:true});
    
    res.json(updatedPost);

}
export const deletePost = async (req,res)=>{
 const  {id}=req.params;
  
 if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send("no post with the given id");

 await PostMessage.findByIdAndRemove(id);
 res.json({message:'Post deleted successfully'});
 
  

}

export const likePost = async (req, res) =>{
const {id} =req.params;
if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send("no post with the given id");
const post = await PostMessage.findbyID(id);
const update = await PostMessage.findbyIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});

res.json(update);
}