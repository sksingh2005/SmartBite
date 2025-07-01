import express from "express";
import { addToCart, decrementCartItem, getCart, removeFromCart } from "../controller/cart_controller.js";


const cartRouter = express.Router();

cartRouter.post("/addToCart",addToCart)
cartRouter.post("/removeFromCart",removeFromCart);
cartRouter.post("/decrement",decrementCartItem);
cartRouter.get("/getCart",getCart);

export default cartRouter;