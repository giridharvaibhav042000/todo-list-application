import express, { Request, Response } from "express";
import Todo from "../models/todo.model";
import { auth } from "../middleware/auth";
import { AuthRequest } from "../types/AuthRequest";
const router = express.Router();


// GET all todos
router.get("/", auth, async (req: AuthRequest, res) => {
  const todos = await Todo.find({ userId: req.user!.id });
  res.json(todos);
});

// ADD todo
router.post("/", auth, async (req: AuthRequest, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    completed: false,
    userId: req.user!.id,
  });

  res.status(201).json(todo);
});

// UPDATE todo
router.put("/:id", auth, async (req: AuthRequest, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.id },
    req.body,
    { new: true }
  );

  if (!todo) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json(todo);
});


// DELETE todo
router.delete("/:id", auth, async (req: AuthRequest, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.user!.id,
  });

  if (!todo) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json({ message: "Todo deleted" });
});


export default router;
