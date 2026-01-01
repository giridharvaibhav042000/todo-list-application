import { Todo } from "../types/Todo";

const API_URL = "http://localhost:5000/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const createTodo = async (todo: Todo) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });

export const updateTodoApi = async (todo: Todo) =>
  fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });

export const deleteTodoApi = async (id: number) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" });
