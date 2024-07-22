const express = require("express");
const { isAuthenticated, isTeacher } = require("../middleware/auth");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.put("/approve/:id", isAuthenticated, isTeacher, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "Approved";
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/reject/:id", isAuthenticated, isTeacher, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "Rejected";
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
