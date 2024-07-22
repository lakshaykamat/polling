const Appointment = require("../models/Appointment");
const User = require("../models/User");

const createAppointment = async (req, res) => {
  const { teacherId, date, time } = req.body;
  const studentId = req.user._id;

  try {
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "Teacher") {
      return res.status(400).json({ message: "Invalid teacher" });
    }

    const appointment = await Appointment.create({
      student: studentId,
      teacher: teacherId,
      date,
      time,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in req.user

    let appointments;
    if (req.user.role === "Student") {
      appointments = await Appointment.find({ student: userId }).populate(
        "student teacher"
      );
    } else if (req.user.role === "Teacher") {
      appointments = await Appointment.find({ teacher: userId }).populate(
        "student teacher"
      );
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "confirmed";
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.remove();
    res.json({ message: "Appointment removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
