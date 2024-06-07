import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

// {{url}}/products/getProduct
productRouter.get("/getProduct");

// Admin routes
// {{url}}/productss/addProduct
productRouter.post("/addProduct", isAuthorized, isAdmin);

// {{url}}/products/delProduct/boc
productRouter.delete("/delProduct/:slug", isAuthorized, isAdmin);

// {{url}}/products/getSingleProduct/boc
productRouter.get("/getSingleProduct/:slug", isAuthorized, isAdmin);

// {{url}}/products/updateProduct/boc
productRouter.put("/updateProduct/:slug", isAuthorized, isAdmin);

export default productRouter;
