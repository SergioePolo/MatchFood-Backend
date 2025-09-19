import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const secretkey = process.env.SECRET_KEY;

if (!secretkey) {
    throw new Error("SECRET_KEY no está definida en el archivo .env");
}

// Se genera y valida el JWT

export const generateToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "30min" }, (error, token) => {
            if (error) {
                reject(new Error("Error al generar el JWT: " + error.message));
            } else {
                resolve(token);
            }
        });
    });
};

export const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, SECRET_KEY, (error, decoded) => {
            if (error) {
                reject(new Error("Error al verificar el JWT: " + error.message));
            } else {
                resolve(decoded);
            }
        });
    });
};