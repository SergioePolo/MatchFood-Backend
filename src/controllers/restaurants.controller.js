import {restaurantsModel} from "../models/restaurants.models.js";

// Create-Post

export const postRestaurant = async (request, response) => {
    try {
        await restaurantsModel.create(request.body);

        return response.status(201).json({
            "mensaje": "Restaurante creado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al crear restaurante",
            "error": error.message || error 
        })



    }}

// Read-Get

export const getAllRestaurants = async (request, response) => {
    try {
        const allRestaurants = await restaurantsModel.find();

        return response.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allRestaurants
        })

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al mostrar restaurantes",
            "error": error.message || error
        })
    }
}

// Update

export const putRestaurantById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await restaurantsModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return response.status(200).json({
            "mensaje":"Restaurante actualizado exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al actualizar restaurante",
            "error": error.message || error
        })
    }
}

// Delete

export const deleteRestaurantById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        await restaurantsModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "mensaje": "Restaurante eliminado exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al eliminar restaurante",
            "error": error.message || error
        })
    }
}