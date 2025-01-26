import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModels.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend API
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    console.log(req.body.items);
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "payment cancel",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: true,
      message: "Error in payment ",
    });
  }
};

// user Order For Frontend
const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error in userOrderAPI",
    });
  }
};

//  List Orders For Admin Panel

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error in get all list order for admin API",
    });
  }
};

export { placeOrder, verifyOrder, userOrder, listOrders };
