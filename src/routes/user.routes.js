import express from "express";
import { postUser, getUser, putUserById, deleteUserById, getUserById } from "../controllers/user.controller.js";
import { upload } from "../config/multer.js";
export const userRouter = express.Router();
import { auth } from '../middleware/auth.js';
//Create user
userRouter.post("/", postUser);

//Show all Users
userRouter.get("/", auth('admin'), getUser);

//Update user
userRouter.put(
    "/:id",
    auth('user'),
    (req, res, next) => {
        req.uploadType = "userProfile";
        req.userId = req.params.id;
        next();
    },
    upload.single('profilePicture'),
    putUserById
);

//Delete user
userRouter.delete("/:id",auth('user'), deleteUserById);

userRouter.get("/:id", auth('user'), getUserById);
