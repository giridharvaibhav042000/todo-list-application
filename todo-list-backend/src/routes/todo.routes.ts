import express, { Request, Response } from "express";
import { Todo } from "../models/todo.model";

const router = express.Router();

let todos: Todo[] = [
  {
      id: 1,
      title: 'Todo Title 1',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: true,
    },
    {
      id: 2,
      title: 'Todo Title 2',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
    },
    {
      id: 3,
      title: 'Todo Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
    },
    {
      id: 4,
      title: 'Todo Title 4',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: true,
    },
    {
      id: 5,
      title: 'Todo Title 5',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
    },
    {
      id: 6,
      title: 'Todo Title 6',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
    },
    {
      id: 7,
      title: 'Todo Title 7',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
    },
    {
      id: 8,
      title: 'Todo Title 8',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
      completed: false,
    },
];

// GET all todos
router.get("/", (req: Request, res: Response) => {
  res.json(todos);
});

// ADD todo
router.post("/", (req: Request, res: Response) => {
  const todo: Todo = req.body;
  todos.unshift(todo);
  res.status(201).json(todo);
});

// UPDATE todo
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  todos = todos.map(todo =>
    todo.id === id ? req.body : todo
  );
  res.json({ message: "Todo updated" });
});

// DELETE todo
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: "Todo deleted" });
});

export default router;
