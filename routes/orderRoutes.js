import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder
} from "../controller/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/status", protect, updateOrderStatus);
router.put("/:id/payment", protect, updatePaymentStatus);
router.delete("/:id", protect, deleteOrder);

export default router;