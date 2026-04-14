import Order from "../models/Order.js";
import Table from "../models/Table.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { table, items, notes, paymentMethod, customer, orderType } = req.body;

    if (orderType === "dine-in" && !table) {
      return res
        .status(400)
        .json({ message: "Table is required for dine-in orders" });
    }
    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Create order
    const order = await Order.create({
      orderType,
      table: orderType === "dine-in" ? table : null,
      items,
      totalAmount,
      notes,
      paymentMethod,
      customer,
    });

    // Update table status to occupied
       if (orderType === "dine-in" && table) {
      await Table.findByIdAndUpdate(table, {
        status: "occupied",
        currentOrder: order._id,
      });
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("table")
      .populate("items.menuItem")
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("table")
      .populate("items.menuItem")
      .populate("customer", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    )
      .populate("table")
      .populate("items.menuItem");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If order completed → free the table
    if ((status === "completed" || status === "cancelled") && order.table){
      await Table.findByIdAndUpdate(order.table._id, {
        status: "available",
        currentOrder: null,
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, paymentMethod },
      { returnDocument: "after" },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
