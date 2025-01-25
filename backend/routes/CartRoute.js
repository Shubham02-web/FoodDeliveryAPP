import express from "express";

import {
    addToCart,
    removeFromCart,
    getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";
const CartRouter = express.Router();

CartRouter.post("/add", authMiddleware, addToCart);
CartRouter.post("/remove", authMiddleware, removeFromCart);
CartRouter.post("/get", authMiddleware, getCart);

export default CartRouter;