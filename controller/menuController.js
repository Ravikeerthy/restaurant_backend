import Menu from "../models/Menu.js";

// Get All Menu Items
export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({ isAvailable: true });
        res.status(200).json({
            success: true,
            count: menuItems.length,
            menuItems
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Menu Item
export const getMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ success: true, menuItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Menu Item (Admin Only)
export const createMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.create(req.body);
        res.status(201).json({ success: true, menuItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Menu Item (Admin Only)
export const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ success: true, menuItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Menu Item (Admin Only)
export const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ success: true, message: "Menu item deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};