import { userModel } from "../models/user.models.js";
import { postsModel } from "../models/posts.models.js";
import { ratingModel } from "../models/rating.models.js";
import bcryptjs from "bcryptjs";
import path from "path";
import fs from "fs";
import { UPLOADS_BASE } from "../config/multer.js";

//CreateUser
export const postUser = async (req, res) => {
try { 
    
    const { password } = req.body;
    
    const codePass= await bcryptjs.hash(password, 10);
    
    const newUser = {
        ...req.body,
        password:codePass,
        profileComplete: false,
        userStatus: true
    }

    const user = await userModel.create(newUser);
    return res.status (201).json({"mensaje": "Usuario creado, Bienvenido a MatchFood", data: user._id.toString()})

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrió un error al crear usuario",
            "error": error.message || error 
        })
    }
};

//GetAllUsers
export const getUser = async (req, res)=> {
    try { 
        const alluser = await userModel.find();
        return res.status (201).json({"mensaje": "Usuarios de MatchFood", "data": alluser})
    } catch (error) {return res.status(400).json({
            "mensaje": "Ocurrió un error al crear usuario",
            "error": error.message || error 
        })
        
    }
}

//Update Usera

export const putUserById = async (req, res) => {    
    try {
        const idForUpdate = req.params.id;
        const dataForUpdate = req.body;
        
        // Hash password if provided
        if(dataForUpdate.password){
            dataForUpdate.password = await bcryptjs.hash(dataForUpdate.password, 10);
        }

        // Add profile picture path if file was uploaded
        if(req.file){
            dataForUpdate.profilePicture = `/uploads/users/profilePictures/${req.userId}/${req.file.filename}`
        }
        
        // If dataForUpdate is empty but we have a file, create an object
        if(Object.keys(dataForUpdate).length === 0 && req.file) {
            dataForUpdate.profilePicture = `/uploads/users/profilePictures/${req.userId}/${req.file.filename}`;
        }
        
        await userModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
        
        return res.status(200).json({
            msg: "Usuario Actualizado",
        });
        
    } catch (error) {
        return res.status(500).json({ 
            error: error.message || error
        });
    }
};

//Delete User

export const deleteUserById = async(req, res) => {
    try {
        const idForDelete= req.params.id;
        const user = await userModel.findById(idForDelete);
        const posts = await postsModel.find({userId: idForDelete});
        const ratings = await ratingModel.find({userId: idForDelete});
        let route = '';
        let mediaFolders = [];

        // profilePictures
        if(user.profilePicture){
            route = path.join(UPLOADS_BASE,"users", "profilePictures", user._id.toString());
            if (!fs.existsSync(route)) {
                // No agregamos mensaje si no existe
            } else {
                fs.rmdirSync(route, { recursive: true, force: true });
                mediaFolders.push('Imagen de perfil eliminada');
            };
        }
        
        // Posts
        if (posts.length > 0) {
            for (const element of posts) {
                await postsModel.findByIdAndDelete(element._id.toString());
                route = path.join(UPLOADS_BASE, 'users', 'posts', element._id.toString());
                if (fs.existsSync(route)) {
                    fs.rmdirSync(route, { recursive: true, force: true });
                }
            }
            mediaFolders.push('Posts eliminados');
        }        
        // Ratings
        if (ratings.length > 0) {
            for (const element of ratings) {
                route = path.join(UPLOADS_BASE, 'restaurants', 'ratings', element._id.toString());
                if (fs.existsSync(route)) {
                    fs.rmdirSync(route, { recursive: true, force: true });
                }
            }
            mediaFolders.push('Ratings eliminados');
        }
        // Eliminar restaurante al final de todo
        await restaurantsModel.findByIdAndDelete(idForDelete);

        // Respuesta: solo enviar el array si hay contenido
        const response = { msg: 'Usuario eliminado con éxito' };
        if (mediaFolders.length > 0) {
            response.data = mediaFolders;
        }
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            mensaje: "Ocurrió un error al eliminar el usuario",
            error: error.message || error
        });
    }
}

export const getUserById = async(req, res) =>{
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);
        if(user){
            return res.status(200).json({
                data: user
            });
        }
        else{
            return res.status(404).json({
                msg: 'Usuario no encontrado, por favor registrate en el sistema'
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'Se presentó un error al momento de buscar el usuario',
            error: error.message || error
        })
    }
}