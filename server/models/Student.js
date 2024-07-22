// models/Student.js
const mongoose = require("mongoose");
const User = require("./User");

const studentSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  schoolName: { type: String, required: true },
});

const Student = User.discriminator("Student", studentSchema);

module.exports = Student;
