import express, { Request, Response } from "express";
import { Todo } from "../models/todo.model";
import { auth } from "../middleware/auth";
import { AuthRequest } from "../types/AuthRequest";
const router = express.Router();

let todos: Todo[] = [
  {
      id: 1,
      title: 'Todo Title 1',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: true,
      userId: 1
    },
    {
      id: 2,
      title: 'Todo Title 2',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
      userId: 2
    },
    {
      id: 3,
      title: 'Todo Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
      userId: 1
    },
    {
      id: 4,
      title: 'Todo Title 4',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: true,
      userId: 2
    },
    {
      id: 5,
      title: 'Todo Title 5',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
      userId: 2
    },
    {
      id: 6,
      title: 'Todo Title 6',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
      userId: 1
    },
    {
      id: 7,
      title: 'Todo Title 7',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
      userId: 1
    },
    {
      id: 8,
      title: 'Todo Title 8',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
      userId: 1
    },
];

// GET all todos
router.get("/", auth, (req: AuthRequest, res) => {
  console.log("REQ USER:", req.user);

  const userTodos = todos.filter(
    todo => todo.userId === Number(req.user?.id)
  );

  res.json(userTodos);
});

// ADD todo
router.post("/", auth, (req: AuthRequest, res) => {
  const newTodo: Todo = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    completed: false,
    userId: req.user!.id,
  };

  todos.unshift(newTodo);
  res.status(201).json(newTodo);
});



// UPDATE todo
router.put("/:id", auth, (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(
    t => t.id === id && t.userId === req.user!.id
  );

  if (!todo) {
    return res.status(403).json({ message: "Not allowed" });
  }

  Object.assign(todo, req.body);
  res.json(todo);
});


// DELETE todo
router.delete("/:id", auth, (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(
    t => t.id === id && t.userId === req.user!.id
  );

  if (!todo) {
    return res.status(403).json({ message: "Not allowed" });
  }

  todos = todos.filter(t => t.id !== id);
  res.json({ message: "Todo deleted" });
});


export default router;
