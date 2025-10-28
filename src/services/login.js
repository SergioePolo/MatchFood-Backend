import { userModel } from "../models/user.models.js";
import { restaurantsModel } from "../models/restaurants.models.js";
import { generateToken } from "../config/jwt.js";
import bcryptjs from "bcryptjs";

export const login = async (request, response) => {
  try {
    const { emailLogin, passwordLogin, role } = request.body;
    let userFound = "";
    let payload = "";
    if (role === "user") {
      userFound = await userModel.findOne({
        email: emailLogin,
      });
    } else {
      userFound = await restaurantsModel.findOne({
        email: emailLogin,
      });
    }

    if (!userFound) {
      return response.status(404).json({
        mensaje:
          "Estas a tiempo de registrarte en MatchFood y descurbrir cientos de restuarantes en tu zona",
      });
    }

    const validPassword = await bcryptjs.compare(
      passwordLogin,
      userFound.password
    );
    if (!validPassword) {
      return response.status(401).json({
        mensaje: "Contraseña incorrecta, por favor intentalo de nuevo",
      });
    }
    if (role === "user") {
      payload = {
        id: userFound._id,
        user: userFound.firstName,
        role: userFound.role,
        restaurantId: userFound.restaurantId,
      };
    } 
    else if(role === "restaurant") {
      payload = {
        id: userFound._id,          
        user: userFound.name,
        role: 'restaurant',
        restaurantId: userFound._id
      };
    }
    else{
      payload = {
        id: userFound._id,          
        user: userFound.name,
        role: userFound.role,
        restaurantId: userFound._id
      };
    }

    const token = await generateToken(payload);

    return response.status(200).json({
      mensaje: "Inicio de sesión exitoso, bienvenido a MatchFood",
      token: token,
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: "Lo sentimos, hubo un error al iniciar tu sesión",
      error: error.message || error,
    });
  }
};
