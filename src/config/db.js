import mongoose from 'mongoose';

export const mongooseConection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{dbName: "MatchfoodDB"});
        console.log("conexión exitosa, bienvenido a MongoDB");
    } catch (error) {
        console.error("error de conexión: ", error);
    }
}