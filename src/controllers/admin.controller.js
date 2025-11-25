import { userModel } from "../models/user.models.js";
import { restaurantsModel } from '../models/restaurants.models.js';
import { reservesModel } from '../models/reserves.models.js';

export const adminDashboard = async (req, res) => {
    try {
        const usersCount = await userModel.countDocuments();
        const restaurantCount = await restaurantsModel.countDocuments();
        const reservesCount = await reservesModel.countDocuments();
        const listPreferences = await userModel.aggregate([
            {
                $group: {
                    _id: "$preferences",
                    count: { $sum: 1 }
                }
            }
        ]);

        const newData = {
            users: usersCount,
            restaurants: restaurantCount,
            reserves: reservesCount,
            preferences: listPreferences
        }
        
        return res.status(200).json({
            msg: 'Información entregada correctamente',
            data: newData
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Se presentó un error al momento de cargar la información del dashboard",
            error: error.message || error 
        })
    }
};