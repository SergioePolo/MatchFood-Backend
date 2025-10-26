import mongoose from "mongoose";

const {Schema} = mongoose;

const restaurantSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    city:{
        type: String,   
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    ratingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"restaurantRatings",
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const restaurantsModel = mongoose.model("restaurants", restaurantSchema);