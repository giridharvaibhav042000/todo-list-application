import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import { CreateTodoPayload, Todo } from "./types/Todo";
import ViewAll from "./pages/ViewAll";
import ViewTask from "./pages/ViewTask";
import {
  createTodo,
  deleteTodoApi,
  updateTodoApi,
} from "./services/todoApi";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`https://todo-list-application-sepia.vercel.app/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
        setTodos([]);
      }
    };

    loadTodos();
  }, []);

  // ADD Task
  const addTodo = async (todo: CreateTodoPayload): Promise<void> => {
    const createdTodo = await createTodo(todo);
    setTodos(prev => [createdTodo, ...prev]);
  };

  // UPDATE task
  const updateTodo = async (todo: Todo) => {
    await updateTodoApi(todo);

    setTodos(prev =>
      prev.map(t => (t._id === todo._id ? todo : t))
    );
  };

  // DELETE task
  const deleteTodo = async (_id: string) => {
    await deleteTodoApi(_id);
    setTodos(prev => prev.filter(t => t._id !== _id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home todos={todos} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask addTodo={addTodo} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-all"
          element={
            <ProtectedRoute>
              <ViewAll todos={todos} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <ViewTask
                todos={todos}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
