import mongoose from "mongoose";

const {Schema} = mongoose;

const reserveSchema = new Schema({
 
    date:{
        type: String,
        required: true
    },

    hour:{
        type: String,
        required: true
    },

    people:{
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

    comments:{
        type: String,
    },


}, {
    timestamps: true 
})

export const reservesModel = mongoose.model("reserves", reserveSchema);