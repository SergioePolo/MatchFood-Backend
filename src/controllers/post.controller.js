import { postsModel } from '../models/posts.models.js';

export const createPost = async ( req,res ) => {
    try {
        await postsModel.create(req.body);

        return res.status(200).json({
            msg: 'La publicación ha sido creada con éxito'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Se encontro un problema al momento de crear la publicación',
            error: error.message || error 
        })
    }
}

export const getPosts = async ( req, res ) => {
    try {
        const reponse = await postsModel.find().populate('restaurantId', 'name city').populate('userId', 'firstName city profilePicture' );

        return res.status(200).json({
            data: reponse
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Se encontro un problema al momento de buscar las publicacaiones',
            error: error.message || error 
        })
    }
}

export const updatePostById = async ( req, res ) => {
    try {
        const idToUpdate = req.params.id;
        const data = req.body;
        
        await postsModel.findByIdAndUpdate(idToUpdate, data);
    
        return res.status(202).json({
            msg: 'Se actualizo corretamente la publicación'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Se encontro un problema al momento de actualizar la publicación',
            error: error.message || error 
        })
    }
}

export const deletePostById = async ( req, res ) => {
    try {
        const idToDelete = req.params.id;

        await postsModel.findByIdAndDelete(idToDelete);

        return res.status(200).json({
            msg: 'La publicación fue eliminada con exito'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Se encontro un problema al momento de eliminar la publicación',
            error: error.message || error 
        })
    }
}

export const getAllPostByUser = async ( req, res ) => {
    try {
        const userId = req.params.id;

        const response = await postsModel.find({userId: userId}).populate('userId', 'firstName city profilePicture').populate('restaurantId', 'name city');
        return res.status(200).json({
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Se encontro un problema al momento de buscar las pulicaciones',
            error: error.message || error 
        })
    }
}

export const getAllPostByRestaurant = async ( req, res )=> {
    try {
        const restaurantId = req.params.id;

        const response = await postsModel.find({restaurantId: restaurantId}).populate('userId', 'firstName city profilePicture').populate('restaurantId', 'name city');
        return res.status(200).json({
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Se encontro un problema al momento de buscar las pulicaciones',
            error: error.message || error 
        })
    }
}