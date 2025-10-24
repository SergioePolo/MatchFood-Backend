import {rateModel} from '../models/rate.model.js';
import path from 'path';
import fs from 'fs';


export const postRate = async (req, res) => {
    try {
        await  rateModel.create(req.body);

        return res.status(201).json({
            "mensaje": "Gracias por tu reseña"
        });

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrió un error al crear la reseña",
            "error": error.message || error 
        })
    }}

export const getAllRates = async (req, res) => {
    try {
        const allRates = await rateModel.find().populate('rates');

        return res.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allRates
        })

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al mostrar las reseñas",
            "error": error.message || error
        })
    }
} 
export const putRateById = async (req, res) => {
    try {
        const idForUpdate = req.params.id;
        const dataForUpdate = req.body;

        await rateModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return res.status(200).json({
            "mensaje":"Rate actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al actualizar Rate",
            "error": error.message || error
        })
    }
}

export const deleteRateById = async (req, res) => {
    try {
        const idForDelete = req.params.id;
        await rateModel.findByIdAndDelete(idForDelete);
        return res.status(200).json({
            "mensaje": "Rate eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al eliminar Rate",
            "error": error.message || error
        })
    }
}