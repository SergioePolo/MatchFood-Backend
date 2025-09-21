import { ratingModel } from '../models/rating.models.js';
import path from 'path';
import fs from 'fs';

export const postRating = async ( req, res ) => {
    try {
        const data = {...req.body, images: [], userId: req.params.id};
        const newRating = await ratingModel.create(data);

        const tempFolder = path.resolve('uploads/restaurants/tempFiles', data.userId.toString());
        const newFolder = path.resolve('uploads/restaurants/ratings', newRating._id.toString());

        if (!fs.existsSync(newFolder)) {
                    fs.mkdirSync(newFolder, { recursive: true });
                }
        
                if (fs.existsSync(tempFolder)) {
                    const files = fs.readdirSync(tempFolder);
        
                    files.forEach(file => {
                        const oldPath = path.join(tempFolder, file);
                        const newPath = path.join(newFolder, file);
        
                        fs.renameSync(oldPath, newPath); 
                        data.images.push(path.relative("uploads", newPath));
                    });
                    fs.rmdirSync(tempFolder);
                }
        
                newRating.images = data.images;
                await newRating.save();

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
        const response = await ratingModel.find().populate('userId', 'firstName profilePicture').populate('restaurantId', 'name');

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