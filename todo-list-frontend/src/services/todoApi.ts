import { CreateTodoPayload, Todo } from "../types/Todo";

const API_URL = "https://todo-list-application-sepia.vercel.app/todos";

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

// create todo
export const createTodo = async (
    todo: CreateTodoPayload
): Promise<Todo> => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todo),
    });

    if (!res.ok) {
        throw new Error("Failed to create todo");
    }

    return res.json();
};

// update todo
export const updateTodoApi = async (todo: any) =>
    fetch(`${API_URL}/${todo._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(todo),
    });
// delete todo
export const deleteTodoApi = async (_id: string) =>
    fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
