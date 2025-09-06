import { userModel } from "../models/user.models.js";
import bcryptjs from "bcryptjs";



//Post


export const postUser = async (request, response) => {

try { const {firstName, lastName, email, phone, password, city, categories, address} = request.body;
    
const codePass= await bcryptjs.hash(password, 10)

await userModel.create({
firstName, 
lastName, 
email, 
phone, 
city, 
categories, 
address, 
password:codePass


});

 return response.status (201).json({"mensaje": "Usuario creado, Bienvenido a MatchFood"})
    } catch (error) {return response.status(400).json({
            "mensaje": "Ocurrió un error al crear usuario",
            "error": error.message || error 
        })
        
    }

};

//Get

export const getUser = async (request, response)=> {
    try { const alluser = await userModel.find();


 return response.status (201).json({"mensaje": "Usuarios de MatchFood", "data": alluser})
    } catch (error) {return response.status(400).json({
            "mensaje": "Ocurrió un error al crear usuario",
            "error": error.message || error 
        })
        
    }
}

//Put

export  const putUserById = async (request, response) => {

try {
    const idForUpdate= request.params._id;
    const dataForUpdate= request.body;

    await userModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
    return response.status (200).json ({
        "mensaje": "Usuario Actualizado"
    });
    
   } catch (error) {
    return response.status(500).json({ "mensaje": "Intenta actualizar mas tarde",
    "error": error  || error.message
    });
   };
};

// DELETE

export const deleteUserById = async(request, response) => {

try {
    const idForDelete= request.params._id;
   
    await userModel.findByIdAndDelete(idForDelete);
    return response.status(200).json({"mensaje": "Usuario eliminado con exito"})
    
   } catch (error) {
    return response.status(500).json({ "mensaje": "Intenta eliminar tu cuenta mas tarde",
    "error": error  || error.message
    });
   };
    
};