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
    image: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const restaurantsModel = mongoose.model("restaurants", restaurantSchema);