const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/auth");
const { isAuthenticated, isTeacher } = require("../middleware/auth");
const Appointment = require("../models/Appointment");
const router = express.Router();

router
  .route("/")
  .get(protect, getAppointments)
  .post(protect, createAppointment);

router
  .route("/:id")
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

router.patch("/approve/:id", protect, isTeacher, async (req, res) => {
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

router.patch("/reject/:id", protect, isTeacher, async (req, res) => {
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
