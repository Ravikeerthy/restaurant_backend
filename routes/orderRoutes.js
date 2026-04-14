import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder
} from "../controller/orderController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin","waiter"), createOrder);
router.get("/", protect, authorize("admin","waiter","kitchen"), getAllOrders);
router.get("/:id", protect,authorize("admin","waiter","kitchen"), getOrder);
router.put("/:id/status", protect, authorize("admin", "kitchen"), updateOrderStatus);
router.put("/:id/payment", protect, authorize("admin","waiter"), updatePaymentStatus);
router.delete("/:id", protect,authorize("admin"), deleteOrder);

export default router;