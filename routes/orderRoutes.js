import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
    createCustomerOrder,
    getMyOrders
} from "../controller/orderController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin","waiter"), createOrder);
router.get("/", protect, authorize("admin","waiter","kitchen"), getAllOrders);
router.get("/:id", protect,authorize("admin","waiter","kitchen"), getOrder);
router.put("/:id/status", protect, authorize("admin", "kitchen"), updateOrderStatus);
router.put("/:id/payment", protect, authorize("admin","waiter"), updatePaymentStatus);
router.delete("/:id", protect,authorize("admin"), deleteOrder);
router.post("/customer", protect, authorize("customer"), createCustomerOrder)
router.get("/customer/my-order", protect, authorize("customer"), getMyOrders)

export default router;