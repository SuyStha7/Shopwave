import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

// Mongodb connection
connectDB();

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

//importing routes
import userRouter from "./routes/userRoutes.js";
import categoriesRouter from "./routes/categoriesRoutes.js";
import productRouter from "./routes/productRoutes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`.bgWhite);
});
