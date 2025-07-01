import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());

// If needed, specify origin explicitly:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // if you're using cookies/auth
}));
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const MONGODB_URI = "mongodb+srv://raj079284:Zoz74sYFxp69jF13@cluseter0.zkxkdd9.mongodb.net/";

mongoose.connect(MONGODB_URI).then(()=>{
    console.log("connected successfully");
}).catch((error)=>{
    console.log(error);
})


app.get("/",(req,res)=> {
    res.send('HelloWorld')
})
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);

app.use
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
