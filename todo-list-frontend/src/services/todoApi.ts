import { Todo } from "../types/Todo";

const API_URL = "http://localhost:5000/todos";

// Helper function to get token
const getToken = () => localStorage.getItem("token");

export const fetchTodos = async (): Promise<Todo[]> => {
  const token = getToken();
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const createTodo = async (todo: Todo) => {
  const token = getToken();
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
};

export const updateTodoApi = async (todo: Todo) => {
  const token = getToken();
  return fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodoApi = async (id: number) => {
  const token = getToken();
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
