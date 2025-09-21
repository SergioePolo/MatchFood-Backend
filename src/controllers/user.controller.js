import { userModel } from "../models/user.models.js";
import bcryptjs from "bcryptjs";

//CreateUser
export const postUser = async (req, res) => {
try { 

    const { password } = req.body;
    
    const codePass= await bcryptjs.hash(password, 10);
    
    const newUser = {
        ...req.body,
        password:codePass,
    }

    await userModel.create(newUser);
    return res.status (201).json({"mensaje": "Usuario creado, Bienvenido a MatchFood"})

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrió un error al crear usuario",
            "error": error.message || error 
        })
    }
};

//GetAllUsers
export const getUser = async (req, res)=> {
    try { const alluser = await userModel.find();


 return res.status (201).json({"mensaje": "Usuarios de MatchFood", "data": alluser})
    } catch (error) {return res.status(400).json({
            "mensaje": "Ocurrió un error al crear usuario",
            "error": error.message || error 
        })
        
    }
}

//Update User

export  const putUserById = async (req, res) => {
    try {
        const idForUpdate= req.params.id;
        const dataForUpdate= req.body;

        if(dataForUpdate.password){
            dataForUpdate.password = await bcryptjs.hash(dataForUpdate.password, 10);
        }

        if(req.file){
            dataForUpdate.profilePicture = `/uploads/users/profilePictures/${req.userId}/${req.file.filename}`;
        }
        await userModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
        return res.status (200).json ({
            "mensaje": "Usuario Actualizado"
        });
        
    } catch (error) {
        return res.status(500).json({ "mensaje": "Intenta actualizar mas tarde",
        "error": error  || error.message
        });
    };
};

//Delete User

export const deleteUserById = async(req, res) => {
    try {
        const idForDelete= req.params._id;
    
        await userModel.findByIdAndDelete(idForDelete);
        return res.status(200).json({"mensaje": "Usuario eliminado con exito"})
        
    } catch (error) {
        return res.status(500).json({ "mensaje": "Intenta eliminar tu cuenta mas tarde",
        "error": error  || error.message
        });
    };
        
};