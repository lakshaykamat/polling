// models/Teacher.js
const mongoose = require("mongoose");
const User = require("./User");

const teacherSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  experience: { type: Number, required: true },
  schoolName: { type: String, required: true },
  subjects: { type: [String], required: true },
});

const Teacher = User.discriminator("Teacher", teacherSchema);

module.exports = Teacher;
