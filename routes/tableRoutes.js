import express from "express";
import {
  getAllTables,
  getTable,
  createTable,
  updateTableStatus,
  deleteTable,
} from "../controller/tableController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected (need login)
router.get("/", protect, getAllTables);
router.get("/:id", protect, getTable);
router.post("/", protect, createTable);
router.put("/:id", protect, updateTableStatus);
router.delete("/:id", protect, deleteTable);

export default router;
