
import { verifyToken } from "../config/jwt.js";

export const auth = (requiredRole) => { 
    return async (request, response, next) => {
        const token = request.headers["authorization"];
        console.log("Token recibido en el middleware de autenticación:", token);
        if (!token) {
            return response.status(401).json({
              mensaje: "No se encontró token, permiso denegado",
            });
          }
    const allowedToken = token.split(" ")[1];

    try {
        const decoded = await verifyToken(allowedToken);
          if(requiredRole === "restaurant" && decoded.role !== "restaurant"){
            if (decoded.role !== "admin"){
              return response.status(403).json({
                "mensaje": "Acceso no permitido, no eres el dueño del restaurante o administrador del sistema"
              });
            }
          }
          
          if(requiredRole === "user" && decoded.role !== "user"){
            if(decoded.role !== "admin"){
        console.log("Decoded token:", decoded);
        request.user = decoded; 

          if(requiredRole === "admin" && decoded.admin === false){
              return response.status(403).json({
                "mensaje": "Acceso no permitido, no eres el usuario o administrador del sistema"
              });
            }
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