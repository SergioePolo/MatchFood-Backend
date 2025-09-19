import { decode } from "jsonwebtoken";
import { verifyToken } from "../config/jwt.js";

export const auth = (requiredRole) => {
    return async (request, response, next) => {
        const token = request.headers["authorization"];

        if (!token) {
            return response.status(401).json({
              mensaje: "No se encontró token, permiso denegado",
            });
          }

             
    const allowedToken = token.split(" ")[1];

    try {
        const decoded = await verifyToken(allowedToken);
        console.log("decoded: ", decoded);
  
       
          if(requiredRole === "admin" && decoded.admin === false){
              return response.status(403).json({
                  "mensaje": "Acceso no permitido, no eres administrador"
              });
          }
  
      } catch (error) {
        if (error.name === "TokenExpiredError") {
            return response.status(401).json({
              mensaje: "El token ha expirado, inicia sesión nuevamente",
            });
          }

        return response.status(401).json({
          mensaje: "Falló la autenticación: Token no permitido",
        });
      }

   
    
      next();
    };
  }