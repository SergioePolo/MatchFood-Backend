import mongoose from "mongoose";

const {Schema} = mongoose;

const rateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },

    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },

    post: { type: Schema.Types.ObjectId, ref: "Post" },

    value: { type: Number, min: 1, max: 5 },

    comment: { type: String, maxlength: 500 },
    
}, { timestamps: true });

export const rateModel = mongoose.model("rate", rateSchema);
