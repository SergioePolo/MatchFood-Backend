import { ratingModel } from '../models/rating.models.js';

export const postRating = async ( req, res ) => {
    try {
        await ratingModel.create(req.body);

        return res.status(200).json({
            msg:'La calificación ha sido creada con éxito'
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Se encontro un problema al momento de crear la calificación",
            error: error.message || error 
        })
    }
}

export const getAllRatings = async ( req, res ) => {
    try {
        const response = await ratingModel.find().populate('userId').populate('restaurantId');

        return res.status(200).json({
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Se encontro un problema al momento de buscar las calificaciones",
            error: error.message || error 
        })
    }
}

export const putRatingById = async ( req, res ) => {
    try {
        const idToUpdate = req.params.id;
        const data = req.body;

        await ratingModel.findByIdAndUpdate(idToUpdate, data);

        return res.status(200).json({
            msg: 'La calificación fue actualizada con éxito'
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Se encontro un problema al momento de actualizar la calificación",
            error: error.message || error 
        })
    }
}

export const deleteRatingById = async ( req, res ) => {
    try {
        const idToDelete = req.params.id;

        await ratingModel.findByIdAndDelete(idToDelete);

        return res.status(200).json({
            msg: 'La calificación fue eliminada con éxito'
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Se encontro un problema al momento de eliminar la calificación",
            error: error.message || error 
        })
    }
}