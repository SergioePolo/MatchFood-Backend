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
    try { 
        const alluser = await userModel.find();
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
        const idForDelete= req.params.id;
        const user = await userModel.findById(idForDelete);
        const posts = await postsModel.find({userId: idForDelete});
        const ratings = await ratingModel.find({userId: idForDelete});
        let route = '';
        let mediaFolders = [];
        
        await userModel.findByIdAndDelete(idForDelete);
        // profilePictures
        /* if(user.profilePicture){
            route = path.join(UPLOADS_BASE,"users", "profilePictures", user._id.toString());
            if(fs.existsSync(route)){
                fs.rmdirSync(route, {recursive: true, force: true});
            }
            console.log("realizado perfil");
            mediaFolders.push('Imagen de perfil eliminada');
        }
        
        // Posts
        if(posts.length > 0){
            console.log("entre post")
            for (let element of posts){
                await postsModel.findByIdAndDelete(element._id.toString());
                route = path.join(UPLOADS_BASE,'users', 'posts',element._id.toString());
                if(fs.existsSync(route)){
                    fs.rmdirSync(route, {recursive: true, force: true});
                }
            }
            console.log("realizado posts");
            mediaFolders.push('posts eliminados');
        }
        

        //ratings
        if(ratings.length > 0){
            console.log("entre rating")
            for (let element of ratings){
                await ratingModel.findByIdAndDelete(element._id.toString());
                route = path.join(UPLOADS_BASE,'restaurants', 'ratings',element._id.toString());
                if(fs.existsSync(route)){
                    fs.rmdirSync(route, {recursive: true, force: true});
                }
            }
            console.log("realizado ratings");
            mediaFolders.push('Ratings eliminados');
        }
        
        return res.status(200).json({msg: 'Usuario eliminado con éxito, se elimino la siguiente información', data: mediaFolders}) */
        return res.status(200).json({msg: 'Usuario eliminado con éxito'});
    } catch (error) {
        return res.status(500).json({ "mensaje": "Intenta eliminar tu cuenta mas tarde",
        "error": error  || error.message
        });
    };
        
};