import mongoose, {Schema} from "mongoose";



const userSchema =  new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },   
    password:{
        type:String,
        required: true
    },   
    city:{
        type:String,
        required: true
    },   
    categories:{
        type:String,
        required: true,
        enum: ["carne", "pescado", "pollo"],
    },
    address:{
        type:String,
        required: true
    }
})

export const userModel = mongoose.model("users", userSchema);