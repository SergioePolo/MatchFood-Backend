import express from "express";

import { postUser, getUser, putUserById, deleteUserById } from "../controllers/user.controller.js";

export const userRouter =express.Router();

//Post 

userRouter.post("/", postUser);

//Get

userRouter.get ("/", getUser) 

//PUT
userRouter.put ("/:_id", putUserById) 

//
userRouter.delete ("/:_id", deleteUserById)