import express from 'express';
import { auth } from '../middleware/auth';


export const adminRouter = express.Router();

adminRouter.get('/',auth('admin'),);