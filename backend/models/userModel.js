import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema({
    email : {
        type : String,
        required: true,
        validator: [validator.isEmail, "Please Enter a valid Email"]
    },
    password:{
        type: String,
        required : true,
        select : false,
        minlength : 8,
    },
    name :{
        type: String,
        required : true,
    },
    phone:{
        type : Number,
        required : true,
    },
    token:{
        type : String,
        default : null,
    }
})

export const User = mongoose.model("user",UserSchema);