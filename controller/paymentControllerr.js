import Stripe from "stripe";
import Order from "../models/Order.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
    try {
        const { orderId } = req.body;

        // Get order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalAmount * 100), // Stripe uses cents
            currency: "inr", // Indian currency
            metadata: { orderId: orderId }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            amount: order.totalAmount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Confirm Payment
export const confirmPayment = async (req, res) => {
    try {
        const { orderId, paymentIntentId } = req.body;

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === "succeeded") {
            // Update order payment status
            const order = await Order.findByIdAndUpdate(
                orderId,
                {
                    paymentStatus: "paid",
                    paymentMethod: "online"
                },
                { new: true }
            );
            res.status(200).json({ success: true, order });
        } else {
            res.status(400).json({ message: "Payment not successful" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};