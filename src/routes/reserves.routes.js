import express from 'express';
import { postReserve, getAllReserves, updateReserveById, deleteReserveById, getAllReservesByUser, getAllReservesByRestaurant } from '../controllers/reserve.controller.js';
import { auth } from '../middleware/auth.js';
export const reserveRouter = express.Router();

//Post
reserveRouter.post("/crear", auth(''), postReserve);

//Get
reserveRouter.get("/mostrar", getAllReserves);
reserveRouter.get('/mostrar/usuario/:id', auth(''), getAllReservesByUser);
reserveRouter.get('/mostrar/restaurante/:id', auth(''), getAllReservesByRestaurant);

//Put
reserveRouter.put('/actualizar/:id', auth(''), updateReserveById);

//Delete
reserveRouter.delete('/eliminar/:id', auth(''), deleteReserveById);
