import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoriesController.js";

const categoriesRouter = express.Router();

// {{url}}/categories/getCategory
categoriesRouter.get("/getCategory", getAllCategoriesController);

// Admin routes
// {{url}}/categories/addCategory
categoriesRouter.post(
  "/addCategory",
  isAuthorized,
  isAdmin,
  createCategoryController
);

// {{url}}/categories/delCategory/boc
categoriesRouter.delete(
  "/delCategory/:slug",
  isAuthorized,
  isAdmin,
  deleteCategoryController
);

// {{url}}/categories/getSingleCategory/boc
categoriesRouter.get(
  "/getSingleCategory/:slug",
  isAuthorized,
  isAdmin,
  getSingleCategoryController
);

// {{url}}/categories/updateCategory/boc
categoriesRouter.put(
  "/updateCategory/:slug",
  isAuthorized,
  isAdmin,
  updateCategoryController
);

export default categoriesRouter;
