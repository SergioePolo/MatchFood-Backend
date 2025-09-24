import express from 'express';
import { createPost, getPosts, updatePostById, deletePostById, getAllPostByUser, getAllPostByRestaurant } from '../controllers/post.controller.js';
import { upload } from '../config/multer.js';
import { auth } from '../middleware/auth.js';
export const postRouter = express.Router();

postRouter.post ('/:id', auth('user'),
    (req, res, next)=>{
        req.uploadType = 'userPost';
        req.userId = req.params.id;
        next();
    },
    upload.array('images', 5),
    createPost
);

postRouter.get ('/',getPosts);

postRouter.put ('/:id', auth('user'),
    (req, res, next)=>{
        req.uploadType = 'userPost';
        req.userId = req.params.id;
        next();
    },
    upload.array('images', 5),
    updatePostById);

postRouter.delete ('/:id', auth('user'), deletePostById);

postRouter.get('/postsByUser/:id', getAllPostByUser);

postRouter.get('/postByRestaurant/:id', getAllPostByRestaurant);