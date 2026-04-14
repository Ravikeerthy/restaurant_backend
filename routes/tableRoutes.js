import express from "express";
import {
  getAllTables,
  getTable,
  createTable,
  updateTableStatus,
  deleteTable,
} from "../controller/tableController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected (need login)
router.get("/", protect, authorize("admin", "waiter"), getAllTables);
router.get("/:id", protect, authorize("admin", "waiter") ,getTable);
router.post("/", protect, authorize("admin"), createTable);
router.put("/:id", protect, authorize("admin","waiter"), updateTableStatus);
router.delete("/:id", protect, authorize("admin"), deleteTable);

export default router;
