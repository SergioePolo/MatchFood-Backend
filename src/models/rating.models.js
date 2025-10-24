import mongoose from "mongoose";

const {Schema} = mongoose;

const ratingSchema = new Schema({
    images:{
        type: [String]
    },
    content:{
        type: String
    },
    rating:{
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

export const ratingModel = mongoose.model("restaurantRatings", ratingSchema);