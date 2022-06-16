//for all post request
import express from 'express';

import { getPosts, createPost ,getPostsBySearch,updatePost,deletePost,likePost} from '../controllers/posts.js';

import auth from '../middleware/auth.js';


const router= express.Router();

router.get('/search',getPostsBySearch);
router.get('/', getPosts);
router.post('/',auth, createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/id/likePost',auth,likePost);//cuz it is just like updating that's why patch
export default router;
