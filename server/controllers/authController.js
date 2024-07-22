const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const {
    name,
    email,
    phone,
    role,
    password,
    age,
    bio,
    maritalStatus,
    experience,
    schoolName,
    subjects,
    grade,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let user;
    if (role === "Teacher") {
      user = await Teacher.create({
        name,
        email,
        phone,
        password,
        age,
        bio,
        maritalStatus,
        experience,
        schoolName,
        subjects,
      });
    } else if (role === "Student") {
      user = await Student.create({
        name,
        email,
        phone,
        password,
        age,
        grade,
        schoolName,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "21h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "21h",
    });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
