import express from "express";
import { postRestaurant, getAllRestaurants, putRestaurantById, deleteRestaurantById } from "../controllers/restaurants.controller.js";

export const restaurantRouter = express.Router();

//Post
restaurantRouter.post("/crear", postRestaurant);

//Get
restaurantRouter.get("/mostrar", getAllRestaurants);

//Put
restaurantRouter.put("/actualizar/:id", putRestaurantById);

//Delete
restaurantRouter.delete("/eliminar/:id", deleteRestaurantById);

