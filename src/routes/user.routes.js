import express from "express";
import { postUser, getUser, putUserById, deleteUserById } from "../controllers/user.controller.js";
import { upload } from "../config/multer.js";
export const userRouter = express.Router();

//Create user
userRouter.post("/", postUser);

//Show all Users
userRouter.get("/", getUser);

//Update user
userRouter.put(
    "/:id/",
    (req, res, next) => {
        req.uploadType = "userProfile";
        req.userId = req.params.id;
        next();
    },
    upload.single('profilePicture'),
    putUserById
);

//Delete user
userRouter.delete("/:_id", deleteUserById);
