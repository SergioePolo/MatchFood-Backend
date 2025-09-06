import express from "express";

import { postUser, getUser } from "../controllers/user.controller.js";

export const userRouter =express.Router();

//Post 

userRouter.post("/", postUser);

//Get

userRouter.get ("/", getUser)