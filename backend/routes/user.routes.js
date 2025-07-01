import express from "express";
import { login, logout, SignUp } from "../controller/user_controller.js";

const userRouter = express.Router();

userRouter.post("/login",login);
userRouter.post("/SignUp",SignUp);
userRouter.post("/logout",logout);

export default userRouter;