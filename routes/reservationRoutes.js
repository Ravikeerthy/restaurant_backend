import express from "express";
import {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
} from "../controllers/reservationController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("customer"), createReservation);
router.get("/my-reservations", protect, authorize("customer"), getMyReservations);
router.get("/", protect, authorize("admin", "waiter"), getAllReservations);
router.put("/:id/status", protect, authorize("admin", "waiter"), updateReservationStatus);

export default router;