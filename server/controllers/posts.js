import mongoose from "mongoose";
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

export const createPosts = async (req, res) =>{
    const post= req.body;
    
    const newPost= new PostMessage(post);


try {
    await newPost.save();
    
    res.status(201).jso (newPost);

} catch (error) {
    res.status(409).json({message: error.message});
}

}
export const updatePosts = async (req, res) =>{
    
    const {id : _id}=req.params;//renaming id into _id
    const uPost= req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("no post with the given id");
    
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,uPost,{new:true});
    
    res.json(updatedPost);

}