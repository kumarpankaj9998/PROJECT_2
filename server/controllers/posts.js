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

export const createPost = async (req, res) =>{
    const post = req.body;

    const newPostMessage =new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
     
try {
    await newPostMessage.save();
    
    res.status(201).jso (newPostMessage);

} catch (error) {
    res.status(409).json({message: error.message});
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

if(!req.userId) return res.json({message:'Unauthenticated'});//that user is eithe authicated or not

if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send("no post with the given id");

const index=await post.likes.findIndex((id) =>id===String(req.userId));//we are searching in the array of id's who have liked a specific post if the Id is in the array already,that means he already had liked the post so he will not be allowed to do that again


if(index===-1){
    post.likes.push(req.userId);

}else
{
    post.likes= post.likes.filter((id)=>id===String(req.userId));
}


const post = await PostMessage.findbyID(id);

const update = await PostMessage.findbyIdAndUpdate(id,post,{new:true});

res.json(update);
}

//Queary-> /posts?page=1 ->page=1
//Params->/posts/:id, that means if i write /posts/123 : then id=123
export const getPostsBySearch = async (req, res) =>{
    const {searchQuery,tags} = req.query;


    try {
        const title = new RegExp(searchQuery,'i');

        const posts= await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});//find me the post with either Title or tags which is passed from front end

        res.json({data:posts});
    } catch (error) {
        res.status(404).json({message:error.message});

    }

}