import express from "express";
import { postRestaurant, getAllRestaurants, putRestaurantById, deleteRestaurantById, getAllRestaurantsByCity } from "../controllers/restaurants.controller.js";
import { upload } from '../config/multer.js';
export const restaurantRouter = express.Router();

//Post
restaurantRouter.post("/crear", postRestaurant);

//Get
restaurantRouter.get("/mostrar", getAllRestaurants);

//Put
restaurantRouter.put("/actualizar/:id",
    (req,res, next) => {
        req.uploadType = 'restaurantProfile';
        req.restaurantId = req.params.id;
        next();
    },
    upload.single('logo'),
    putRestaurantById
);

//Delete
restaurantRouter.delete("/eliminar/:id", deleteRestaurantById);

restaurantRouter.get("/getByCity/:id", getAllRestaurantsByCity);

