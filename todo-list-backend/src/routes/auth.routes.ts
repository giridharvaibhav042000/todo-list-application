import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/users";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({ token });
//   console.log(token);
});

export default router;
