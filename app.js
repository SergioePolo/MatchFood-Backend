import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {mongooseConection} from "./src/config/db.js";

import { userRouter } from "./src/routes/user.routes.js";
import {restaurantRouter} from "./src/routes/restaurants.routes.js";
import { postRouter } from "./src/routes/post.routes.js";
import { ratingRouter } from "./src/routes/rating.routes.js";
import { loginRouter } from "./src/routes/login.routes.js";
import { rateRouter } from "./src/routes/rate.routes.js";
import { reserveRouter } from "./src/routes/reserves.routes.js";


const app = express();
dotenv.config();
const port= process.env.PORT
mongooseConection();
const _filename = fileURLToPath(import.meta.url); 
const _dirname = path.dirname(_filename);

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use('/post', postRouter);
app.use('/rating', ratingRouter);
app.use('/uploads', express.static(path.join(_dirname,'../uploads')));
app.use('/login', loginRouter);
app.use('/rate', rateRouter);
app.use('/reserves', reserveRouter);
app.listen(port,() =>{
    console.log (`Servidor escuchando en http://localhost:${port}`);
});