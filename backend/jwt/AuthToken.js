import express from "express";
import jwt from "jsonwebtoken";
import { useRevalidator } from "react-router-dom";
import { User } from "../models/userModel.js";

const createTokenAndSave = async(userId, res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        httpOnly : true,
        sameSite : "strict",
        secure : true,
    })
    await User.findOneAndUpdate({_id :userId},{token},{new : true});

    return token;
}

export default createTokenAndSave;