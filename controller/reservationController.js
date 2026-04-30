import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";

export const createReservation = async (req, res) => {
  try {
    const { table, customerName, phone, guests, date, time, notes } = req.body;

    const reservation = await Reservation.create({
      customer: req.user._id,
      table: table || null,
      customerName,
      phone,
      guests,
      date,
      time,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Reservation request submitted",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ customer: req.user._id })
      .populate("table")
      .sort({ createdAt: -1 });

    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("customer", "name email")
      .populate("table")
      .sort({ createdAt: -1 });

    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("table");

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (status === "approved" && reservation.table) {
      await Table.findByIdAndUpdate(reservation.table._id, {
        status: "reserved",
      });
    }

    res.json({
      success: true,
      message: "Reservation updated",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};