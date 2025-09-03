import mongoose from "mongoose";

const {Schema} = mongoose;

const scoreSchema = new Schema({
    image:{
        type: String
    },
    comment:{
        type: String
    },
    score:{
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const scoreModel = mongoose.model("restaurantScores", scoreSchema);