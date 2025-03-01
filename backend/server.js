import express from "express";
import cors from "cors";
import { ConnectMongo } from "./config/db.js";
import foodRouter from "./routes/FoodRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import CartRouter from "./routes/cartRoute.js";
import dotenv from "dotenv";
import orderRouter from "./routes/OrderRoute.js";
// app config
dotenv.config();
const app = express();
const PORT = process.env.PORT;
// middlewares
app.use(express.json());
app.use(cors());

// Db Connection
ConnectMongo();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/image", express.static("uploads"));
app.use("/api/cart", CartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
    res.send("API Working");
});
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});