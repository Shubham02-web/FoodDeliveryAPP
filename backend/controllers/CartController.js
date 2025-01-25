import userModel from "../models/UserModels.js";
import UserModel from "../models/UserModels.js";

// add to user cart
const addToCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(201).json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Add To Cart API",
        });
    }
};

// remove item from user cart

const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Remove From Cart API",
        });
    }
};

// Fetch User Cart Data

const getCart = async(req, res) => {};

export { addToCart, removeFromCart, getCart };