const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  const dbUser = await User.create(user);
  res.send(dbUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email });
  const isPasswordSame = await bcrypt.compare(password, dbUser.password);
  const token = jwt.sign(
    { email: dbUser.email, role: dbUser.role },
    process.env.JWT_SECRET
  );
  res.send({ token });
});

module.exports = router;
