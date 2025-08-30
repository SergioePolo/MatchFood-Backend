import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },

    lastname : {
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

    likes:{
        type:String,
        required: true,
        enum: ["carne", "pescado", "pollo"],
    },   

    role:{
        type:String,
        required: true,
        enum: ["admin", "user"],
    },   

    usertype:{
        type:String,
        required: true,
        enum: ["restaurant", "client"],
    },   

    direccion:{
        type:String,
        required: true

    }


})