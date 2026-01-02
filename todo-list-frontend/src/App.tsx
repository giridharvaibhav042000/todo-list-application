import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTask from './pages/AddTask';
import Home from './pages/Home';
import { Todo } from "./types/Todo";
import ViewAll from './pages/ViewAll';
import ViewTask from './pages/ViewTask';
import { createTodo, deleteTodoApi, updateTodoApi } from './services/todoApi';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const loadTodos = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log("Todos from API:", data);
        setTodos(data);
      } catch (err) {
        console.error(err);
        setTodos([]);
      }
    };

    loadTodos();
  }, []);


  const addTodo = async (todo: Todo) => {
    await createTodo(todo);
    setTodos(prev => [todo, ...prev]);
  };

  const updateTodo = async (todo: Todo) => {
    await updateTodoApi(todo);
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? todo : t))
    );
  };

  const deleteTodo = async (id: number) => {
    await deleteTodoApi(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home todos={todos} /></ProtectedRoute>} />
        <Route path="/add-task" element={<ProtectedRoute><AddTask addTodo={addTodo} /></ProtectedRoute>} />
        <Route path="/view-all" element={<ProtectedRoute><ViewAll todos={todos} /></ProtectedRoute>} />
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
