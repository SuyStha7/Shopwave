import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { addProductController } from "../controllers/productsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const productsRouter = express.Router();

// {{url}}/products/getProduct
productsRouter.get("/getProduct");

// Admin routes
// {{url}}/products/addProduct
productsRouter.post(
  "/addProduct",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addProductController
);

// {{url}}/products/delProduct/boc
productsRouter.delete("/delProduct/:slug", isAuthorized, isAdmin);

// {{url}}/products/getSingleProduct/boc
productsRouter.get("/getSingleProduct/:slug", isAuthorized, isAdmin);

// {{url}}/products/updateProduct/boc
productsRouter.put("/updateProduct/:slug", isAuthorized, isAdmin);

export default productsRouter;
