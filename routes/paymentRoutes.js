import express from "express";
import {
    createPaymentIntent,
    confirmPayment
} from "../controller/paymentControllerr.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-payment-intent", protect, authorize("admin","waiter"), createPaymentIntent);
router.post("/confirm-payment", protect,authorize("admin","waiter"), confirmPayment);

export default router;