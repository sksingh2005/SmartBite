import express from "express";
import { User} from "../modals/userModal.js";
import bycrypt from "bcryptjs";
import createTokenAndSave from "../jwt/AuthToken.js";

export const SignUp = async(req,res) =>{
    try{
        const {name , phone,email,password } = req.body;
        if(!name || !phone || !email || !password){
            return res.status(400).json({message : "Fill all the required details"});
        }
        const user = await User.findOne({email});
        if(user){
            res.status(400).json({
                message : "User with this email already exist"
            })
        }
        
        const hashPassword = await bycrypt.hash(password,10);
        
        const newUser = new User({
            email, name, password : hashPassword,phone
        });
        await newUser.save();

        if(newUser){
            const token = await createTokenAndSave(newUser._id,res);
            return res.status(201).json({message : "user Registered successfully"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error : "Internal Server Error"
        });
    }
}

export const login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "Please fill all the required details"});
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({error : "Invalid Credentials"});
        }
        const match = bycrypt.compare(user.password,password);
        if(!match){
            return res.status(400).json({error: "Invalid Credentials"})
        }
        const token = await createTokenAndSave(user._id, res);
        res.status(200).json({
            user : user, token : token
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error :"Internal Server Error"
        })
    }
}

export const logout = (req,res) =>{
    try{
        jwt.clearCookie("jwt",{httpOnly : true});
        return res.status(200).json({message : "User logged Out Successfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}