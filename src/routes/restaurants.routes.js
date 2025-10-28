import express from "express";
import { postRestaurant, getAllRestaurants, putRestaurantById, deleteRestaurantById, getAllRestaurantsByCity } from "../controllers/restaurants.controller.js";
import { upload } from '../config/multer.js';
export const restaurantRouter = express.Router();
import { auth } from '../middleware/auth.js';
//Post
restaurantRouter.post("/", postRestaurant);

//Get
restaurantRouter.get("/", getAllRestaurants, auth('admin'));

//Put
restaurantRouter.put("/:id",auth('restaurant'),
    (req,res, next) => {
        req.uploadType = 'restaurantProfile';
        req.restaurantId = req.params.id;
        next();
    },
    upload.single('logo'),
    putRestaurantById
);

//Delete
restaurantRouter.delete("/:id", auth('restaurant','admin'), deleteRestaurantById);

restaurantRouter.get("/getByCity/:id", auth('restaurant', 'admin'), getAllRestaurantsByCity);

