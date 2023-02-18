const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware.js/jwt.middleware");
// const { isAuthenticated } = require("../middlewares/jwt.middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.status(200).json({ message: "Missing fields" });
      return;
    }

    const foundUser = await User.findOne({ email, username });
    if (foundUser) {
      res.status(200).json({ message: "User already exist" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      email,
      password: hasPassword,
      username,
    });
    try {
      res.status(200).json(createdUser);
    } catch (e) {}
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(401).json({ message: "Invalid data" });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "invalid login" });
      return;
    }

    const authToken = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "6h" }
    );
    res.status(200).json(authToken);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;
