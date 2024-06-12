import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { addProductController, getAllProductsController } from "../controllers/productsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const productsRouter = express.Router();

// {{baseUrl}}/products/getProduct
productsRouter.get("/getProduct", getAllProductsController);

// Admin routes
// {{baseUrl}}/products/addProduct
productsRouter.post(
  "/addProduct",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addProductController
);

// {{baseUrl}}/products/delProduct/boc
productsRouter.delete("/delProduct/:slug", isAuthorized, isAdmin);

// {{baseUrl}}/products/getSingleProduct/boc
productsRouter.get("/getSingleProduct/:slug", isAuthorized, isAdmin);

// {{baseUrl}}/products/updateProduct/boc
productsRouter.put("/updateProduct/:slug", isAuthorized, isAdmin);

export default productsRouter;
