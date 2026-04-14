import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";
import { createStaffUser, deleteUser, getStaffUsers, updateUserRole } from "../controller/staffCOntroller.js";

const router = express.Router();

router.post("/staff", protect, authorize("admin"), createStaffUser);
router.get("/staff", protect, authorize("admin"), getStaffUsers);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;