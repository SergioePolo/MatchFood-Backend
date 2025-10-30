import { verifyToken } from "../config/jwt.js";

export const auth = (requiredRole) => { 
    return async (request, response, next) => {
        const token = request.headers["authorization"];
        if (!token) {
            return response.status(401).json({
                msg: "No se encontró token, permiso denegado",
            });
        }

        const allowedToken = token.split(" ")[1];
        
        try {
            const decoded = await verifyToken(allowedToken);
            request.user = decoded;
            
            // Los admins tienen acceso a todo
            if (decoded.role === "admin") {
                return next();
            }


            if (requiredRole && decoded.role !== requiredRole) {
                return response.status(403).json({
                    msg: `Acceso no permitido. Requieres tener rol de: ${requiredRole}`,
                });
            }

            next();

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return response.status(401).json({
                    msg: "El token ha expirado, inicia sesión nuevamente",
                });
            }

            return response.status(401).json({
                msg: "Falló la autenticación: Token no permitido",
            });
        }
    };
} 
