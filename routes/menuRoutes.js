import express from "express";
import {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from "../controller/menuController.js";
import  { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes (no login needed)
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItem);

// Protected Routes (admin only)
router.post("/", protect, authorize("admin"), createMenuItem);
router.put("/:id", protect, authorize("admin"), updateMenuItem);
router.delete("/:id", protect, authorize("admin"), deleteMenuItem);

export default router;