import express from "express"
import dotenv from "dotenv"
import {mongooseConection} from "./src/config/db.js";


import { userRouter } from "./src/routes/user.routes.js";
import {restaurantRouter} from "./src/routes/restaurants.routes.js";
import { postRouter } from "./src/routes/post.routes.js";
import { ratingRouter } from "./src/routes/rating.routes.js";

const app = express();
  dotenv.config();
const port= process.env.PORT
mongooseConection();


app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(express.json())

app.use("/user", userRouter);
app.use("/restaurants", restaurantRouter);
app.use('/post', postRouter);
app.use('/rating', ratingRouter);

app.listen(port,() =>{
    console.log (`Servidor escuchando en http://localhost:${port}`);
});