import { reservesModel } from "../models/reserves.models.js";

// Post
export const postReserve = async (req, res) => {
  
    try {
        const { date, hour, people, restaurantId, comments } = req.body;
        const userId = req.user.id; 

        if (!date || !hour || ! people || !restaurantId) {
            return res.status(400).json({
                "mensaje": "Por favor diligencia todos los campos, son obligatorios"
            });
        }

        const reservaExistente = await reservesModel.findOne({ date, hour, restaurantId });
        if (reservaExistente) {
          return res.status(400).json({
            mensaje: "Ya tienes una reserva para esa fecha y hora en este restaurante"
          });
        }

        const infoReserva = {
            date,
            hour,
            people,
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
  console.log("entrar reservas")
    try {
        const allReserves = await reservesModel.find()
            .populate('userId', 'firstName lastName email')
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
      let reserves;
  
      if (req.user.role === "admin") {
        // El admin ve todas las reservas de todos los usuarios
        reserves = await reservesModel.find()
          .populate('userId', 'firstName lastName email')
          .populate('restaurantId', 'name address logo');
      } else {
        reserves = await reservesModel.find({ userId: req.user.id })
          .populate('restaurantId', 'name address logo');
      }
  
      return res.status(200).json({
        mensaje: "Peticíon exitosa",
        data: reserves
      });
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrió un error al buscar reservas",
        error: error.message || error
      });
    }
  };

// Get reserves by restaurant
export const getAllReservesByRestaurant = async (req, res) => {
    try {
      const restaurantId = req.params.id;
      const user = req.user;
  
      // El restaurante solo puede ver sus propias reservas
      if (user.role === 'restaurant' && user.id !== restaurantId) {
        return res.status(403).json({
          mensaje: "No tienes permiso para ver las reservas de otro restaurante"
        });
      }
  
      const reservas = await reservesModel.find({ restaurantId })
        .populate('userId', 'firstName lastName email');
  
      return res.status(200).json({
        mensaje: "Petición exitosa",
        data: reservas
      });
  
    } catch (error) {
      return res.status(500).json({
        mensaje: "Error al obtener las reservas del restaurante",
        error: error.message
      });
    }
  };