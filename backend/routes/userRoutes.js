import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  allUsersController,
} from "../controllers/userController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// url = http://localhost:8000/api/v1

// {{url}}/users/register
userRouter.post("/register", registerController);
// {{url}}/users/login
userRouter.post("/login", loginController);
// {{url}}/users/logout
userRouter.get("/logout", logoutController);

// Admin routes
// {{url}}/users/all-users
userRouter.get("/all-users", isAuthorized, isAdmin, allUsersController);

export default userRouter;
