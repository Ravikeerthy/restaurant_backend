import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createReservation, getAllReservations, getMyReservations, updateReservationStatus } from "../controller/reservationController.js";

const router = express.Router();

router.post("/", protect, authorize("customer", "user"), createReservation);
router.get("/my-reservations", protect, authorize("customer", "user"), getMyReservations);
router.get("/", protect, authorize("admin", "waiter"), getAllReservations);
router.put("/:id/status", protect, authorize("admin", "waiter"), updateReservationStatus);

export default router;