import { userModel } from "../models/user.models.js";
import { generateToken } from "..config/jwt.js";
import bcryptjs from "bcryptjs";

export const login = async (request, response) => {
  try {
    const { emailLogin, passwordLogin } = request.body;

    const userFound = await userModel.findOne({
      email: emailLogin,
    });

    if (!userFound) {
      return response
        .status(404)
        .json({
          mensaje:
            "Estas a tiempo de registrarte en MatchFood y descurbrir cientos de restuarantes en tu zona",
        });
    }

    const validPassword = await bcryptjs.compare(
      passwordLogin,
      userFound.password
    );
    if (!validPassword) {
      return response
        .status(401)
        .json({
          mensaje: "Contraseña incorrecta, por favor intentalo de nuevo",
        });
    }

    const payload = {
      id: userFound._id,
      user: userFound.firstName,
    };
    if (userFound.rol === "admin") {
      payload.admin = true;
    } else {
      payload.admin = false;
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
