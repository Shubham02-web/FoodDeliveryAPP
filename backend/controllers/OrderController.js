import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModels.js";
import Stripe from "stripe";

// console.log(process.env.STRIPE_SECRET_KEY);
// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend API
const placeOrder = async(req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Convert to cents
            },
            quantity: item.quantity,
        }));

        // Add delivery charges to line items
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Convert to cents
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Return the session URL to the frontend
        res.status(200).json({
            success: true,
            session_url: session.url,
        });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({
            success: false,
            message: "Error in Place Order API",
        });
    }
};

export { placeOrder };