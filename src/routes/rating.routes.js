import express from "express";

import { postRating, getAllRatings, putRatingById, deleteRatingById } from '../controllers/rating.controller.js';

export const ratingRouter = express.Router();

ratingRouter.post('/', postRating);

ratingRouter.get('/', getAllRatings);

ratingRouter.put('/:id', putRatingById);

ratingRouter.delete('/:id',deleteRatingById);