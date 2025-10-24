import mongoose from "mongoose";

const {Schema} = mongoose;

const reserveSchema = new Schema({
 
    fecha:{
        type: String,
        required: true
    },

    hora:{
        type: String,
        required: true
    },

    personas:{
        type: Number,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"restaurants",
        required: true
    },

}, {
    timestamps: true 
})

export const reservesModel = mongoose.model("reserves", reserveSchema);