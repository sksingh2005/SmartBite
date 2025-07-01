import express from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/product_controller.js";

const productRouter = express.Router();

productRouter.post("/addProduct",addProduct);
productRouter.put("/updateProduct/:id",updateProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);
productRouter.get("/getAllProducts",getAllProducts);
export default productRouter;

