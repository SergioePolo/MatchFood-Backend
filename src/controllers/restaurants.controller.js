import {restaurantsModel} from "../models/restaurants.models.js";
import path from "path";
import fs from "fs";
// Create-Post

export const postRestaurant = async (req, res) => {
    try {
        await restaurantsModel.create(req.body);

        return res.status(201).json({
            "mensaje": "Restaurante creado correctamente"
        });

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrió un error al crear restaurante",
            "error": error.message || error 
        })
    }}

// Read-Get

export const getAllRestaurants = async (req, res) => {
    try {
        const allRestaurants = await restaurantsModel.find().populate('ratingId');

        return res.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allRestaurants
        })

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al mostrar restaurantes",
            "error": error.message || error
        })
    }
}

// Update

export const putRestaurantById = async (req, res) => {
    try {
        const idForUpdate = req.params.id;
        const dataForUpdate = req.body;

        if(req.file){
            dataForUpdate.logo = `/uploads/restaurants/profilePictures/${req.restaurantId}/${req.file.filename}`;
        }

        await restaurantsModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return res.status(200).json({
            "mensaje":"Restaurante actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al actualizar restaurante",
            "error": error.message || error
        })
    }
}

// Delete

export const deleteRestaurantById = async (req, res) => {
    try {
        const idForDelete = req.params.id;
        const restaurant = await restaurantsModel.findById(idForDelete);
        const RESTAURANT_BASE = '../../uploads/';
        let route = '';
        let mediaFolders = [];

        if(restaurant.profilePicture){
            route = path.join(RESTAURANT_BASE, 'profilePictures', restaurant._id.toString());
            if(fs.existsSync(route)){
                fs.rmdirSync(route, {recursive: true, force: true});
            }
            mediaFolders.push('Imagen de perfil eliminada');
        }

        //posts

        //ratings
        

        /* await restaurantsModel.findByIdAndDelete(idForDelete);

        return res.status(200).json({
            "mensaje": "Restaurante eliminado exitosamente"
        }); */

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al eliminar restaurante",
            "error": error.message || error
        })
    }
}

export const getAllRestaurantsByCity = async (req, res) =>{
    try {
        const city = req.params.id;
        const res = await restaurantsModel.find({city: city});

        return res.status(200).json({
            data: res
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": `Ocurrió un error al buscar los restaurants de la ciudad ${req.params.restaurant}`,
            "error": error.message || error
        })
    }
}