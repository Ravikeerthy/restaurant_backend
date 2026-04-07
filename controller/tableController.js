import Table from "../models/Table.js";

// Get All Tables
export const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find().populate("currentOrder");
        res.status(200).json({
            success: true,
            count: tables.length,
            tables
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Table
export const getTable = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id).populate("currentOrder");
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json({ success: true, table });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Table
export const createTable = async (req, res) => {
    try {
        const table = await Table.create(req.body);
        res.status(201).json({ success: true, table });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Table Status
export const updateTableStatus = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json({ success: true, table });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Table
export const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json({ success: true, message: "Table deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};