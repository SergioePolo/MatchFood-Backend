import express from "express";
import { postRating, getAllRatings, putRatingById, deleteRatingById } from '../controllers/rating.controller.js';
import { upload } from '../config/multer.js';
import { auth } from '../middleware/auth.js';

export const ratingRouter = express.Router();

ratingRouter.post('/:id',auth('user'),
    (req, res, next) => {
        req.uploadType = 'ratingPost';
        req.userId = req.params.id;
        next();
    },
    upload.array('images',3),
    postRating);

ratingRouter.get('/', getAllRatings);

ratingRouter.put('/:id', auth('user'), putRatingById);

ratingRouter.delete('/:id', auth('user'), deleteRatingById);