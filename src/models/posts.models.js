import mongoose from "mongoose";

const {Schema} = mongoose;

const postSchema = new Schema({
    images:{
        type: [String],
        required: true
    },
    content:{
        type: String,
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

export const postsModel = mongoose.model("posts", postSchema);