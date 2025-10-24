import { reservesModel } from "../models/reserves.models.js";

// Post
export const postReserve = async (req, res) => {
    try {
        const { fecha, hora, personas, restaurantId } = req.body;
        const userId = req.user.id; 

        if (!fecha || !hora || !personas || !restaurantId) {
            return res.status(400).json({
                "mensaje": "Todos los campos son requeridos"
            });
        }

        const reservaExistente = await reservesModel.findOne({ fecha, hora, restaurantId });
        if (reservaExistente) {
          return res.status(400).json({
            mensaje: "Ya existe una reserva en esa fecha y hora para este restaurante"
          });
        }

        const infoReserva = {
            fecha,
            hora,
            personas,
            restaurantId,
            userId  
        };

        await reservesModel.create(infoReserva);

        return res.status(201).json({
            "mensaje": "Reserva creada correctamente"
        });

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrió un error al crear reserva",
            "error": error.message || error 
        });
    }
}

// Get
export const getAllReserves = async (req, res) => {
    try {
        const allReserves = await reservesModel.find()
            .populate('userId', 'name email')
            .populate('restaurantId', 'name address');

        return res.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allReserves
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al mostrar reservas",
            "error": error.message || error
        });
    }
}

// Update
export const updateReserveById = async (req, res) => {
    try {
        const idForUpdate = req.params.id;
        const dataForUpdate = req.body;

        const reserve = await reservesModel.findById(idForUpdate);
        if (!reserve) {
          return res.status(404).json({
            mensaje: "Reserva no encontrada"
          });
        }
    
      
        if (req.user.role !== "admin" && reserve.userId.toString() !== req.user.id) {
          return res.status(403).json({
            mensaje: "No tienes permiso para actualizar esta reserva"
          });
        }

        await reservesModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return res.status(200).json({
            "mensaje": "Reserva actualizada exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al actualizar reserva",
            "error": error.message || error
        });
    }
}

// Delete
export const deleteReserveById = async (req, res) => {
    try {
        const idForDelete = req.params.id;

        const reserve = await reservesModel.findById(idForDelete);
        if (!reserve) {
          return res.status(404).json({
            mensaje: "Reserva no encontrada"
          });
        }
    
        if (req.user.role !== "admin" && reserve.userId.toString() !== req.user.id) {
          return res.status(403).json({
            mensaje: "No tienes permiso para eliminar esta reserva"
          });
        }

        await reservesModel.findByIdAndDelete(idForDelete);

        return res.status(200).json({
            "mensaje": "Reserva eliminada exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrió un error al eliminar reserva",
            "error": error.message || error
        });
    }
}

// Get reserves 
export const getAllReservesByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const reserves = await reservesModel.find({ userId: userId })
            .populate('restaurantId', 'name address logo');

        return res.status(200).json({
            "mensaje": "Petición exitosa",
            "data": reserves
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": `Ocurrió un error al buscar las reservas del usuario ${req.params.id}`,
            "error": error.message || error
        });
    }
}

// Get reserves by restaurant
export const getAllReservesByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const reserves = await reservesModel.find({ restaurantId: restaurantId })
            .populate('userId', 'name email');

        return res.status(200).json({
            "mensaje": "Petición exitosa",
            "data": reserves
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": `Ocurrió un error al buscar las reservas del restaurante ${req.params.id}`,
            "error": error.message || error
        });
    }
}