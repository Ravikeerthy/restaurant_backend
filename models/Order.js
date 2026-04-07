import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "preparing", "served", "completed", "cancelled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "card", "online"],
        default: "cash"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    notes: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);