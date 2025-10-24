import express from 'express';
import { postRate, getAllRates, putRateById, deleteRateById } from '../controllers/rate.controller.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../config/multer.js';

export const rateRouter = express.Router();

rateRouter.post ('/:id', auth('user'),
    (req, res, next)=>{
        req.uploadType = 'userRate';
        req.userId = req.params.id;
        next();
    },
    
    upload.array('images', 3),
    postRate
);

rateRouter.get ('/', getAllRates);  

rateRouter.put ('/:id', auth('user'), putRateById);
(req, res)=>{ req.uploadType = 'userRate';
        req.userId = req.params.id;
        next();
    },

rateRouter.delete ('/:id', auth('user'), deleteRateById);   

rateRouter.get('/ratesByUser/:id', getAllRates);

rateRouter.get('/ratesByRestaurant/:id', getAllRates);  

rateRouter.get('/ratesByPost/:id', getAllRates);