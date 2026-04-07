import express from "express";
import {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from "../controller/menuController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes (no login needed)
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItem);

// Protected Routes (admin only)
router.post("/", protect, createMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;