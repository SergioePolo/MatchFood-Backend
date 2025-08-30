import mongoose from "mongoose";

const {Schema} = mongoose;

const postSchema = new Schema({
    Image:{
        type: String,
        required: required
    },
    comment:{
        type: String,
    },
    userId: {
        type: String,
        required: required
    },
    restaurantId: {
        type: String,
        required: required
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})