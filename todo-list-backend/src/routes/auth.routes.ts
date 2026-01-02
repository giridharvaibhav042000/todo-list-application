import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role }, 
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
