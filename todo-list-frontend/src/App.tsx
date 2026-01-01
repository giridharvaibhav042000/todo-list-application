import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTask from './pages/AddTask';
import Home from './pages/Home';
import { Todo } from "./types/Todo";
import ViewAll from './pages/ViewAll';
import ViewTask from './pages/ViewTask';
import { createTodo, deleteTodoApi, fetchTodos, updateTodoApi } from './services/todoApi';

function App() {
  // const [todos, setTodos] = useState<Todo[]>([
  //   {
  //     id: 1,
  //     title: 'Todo Title 1',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: true,
  //   },
  //   {
  //     id: 2,
  //     title: 'Todo Title 2',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'Todo Title 3',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: false,
  //   },
  //   {
  //     id: 4,
  //     title: 'Todo Title 4',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: true,
  //   },
  //   {
  //     id: 5,
  //     title: 'Todo Title 5',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: false,
  //   },
  //   {
  //     id: 6,
  //     title: 'Todo Title 6',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: false,
  //   },
  //   {
  //     id: 7,
  //     title: 'Todo Title 7',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: false,
  //   },
  //   {
  //     id: 8,
  //     title: 'Todo Title 8',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!',
  //     completed: false,
  //   },

  // ]);

  // const addTodo = (todo: Todo) => {
  //   setTodos(prev => [todo, ...prev]);
  // };

  // const updateTodo = (updatedTodo: Todo) => {
  //   setTodos(prev =>
  //     prev.map(todo =>
  //       todo.id === updatedTodo.id ? updatedTodo : todo
  //     )
  //   );
  // };
  // const deleteTodo = (id: number) => {
  //   setTodos(prev => prev.filter(todo => todo.id !== id));
  // };
  
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      console.log("API response:", data);
      setTodos(data);
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
        <Route path="/" element={<Home todos={todos} />} />
        <Route path="/add-task" element={<AddTask addTodo={addTodo} />} />
        <Route path="/view-all" element={<ViewAll todos={todos} />} />
        <Route
          path="/task/:id"
          element={
            <ViewTask
              todos={todos}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
