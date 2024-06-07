import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoriesController.js";

const categoriesRoute = express.Router();

// {{url}}/categories/getCategory
categoriesRoute.get("/getCategory", getAllCategoriesController);

// Admin routes
// {{url}}/categories/addCategory
categoriesRoute.post("/addCategory", isAuthorized, isAdmin, createCategoryController);

// {{url}}/categories/delCategory/boc
categoriesRoute.delete("/delCategory/:slug", isAuthorized, isAdmin, deleteCategoryController);

// {{url}}/categories/getSingleCategory/boc
categoriesRoute.get("/getSingleCategory/:slug", isAuthorized, isAdmin, getSingleCategoryController);

// {{url}}/categories/updateCategory/boc
categoriesRoute.put("/updateCategory/:slug", isAuthorized, isAdmin, updateCategoryController);

export default categoriesRoute;
