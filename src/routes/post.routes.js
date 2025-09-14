import express from 'express';

import { createPost, getPosts, updatePostById, deletePostById, getAllPostByUser, getAllPostByRestaurant } from '../controllers/post.controller.js';

export const postRouter = express.Router();

postRouter.post ('/', createPost);

postRouter.get ('/',getPosts);

postRouter.put ('/:id', updatePostById);

postRouter.delete ('/:id', deletePostById);

postRouter.get('/postsByUser/:id', getAllPostByUser);

postRouter.get('/postByRestaurant/:id', getAllPostByRestaurant);