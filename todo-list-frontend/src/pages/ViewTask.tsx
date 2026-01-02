import { useParams, useNavigate } from "react-router-dom";
import { Todo } from "../types/Todo";
import { useState, useEffect } from "react";
import Header from "../components/Header";

interface ViewTaskProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (_id: string) => Promise<void>;
}

const ViewTask = ({ todos, updateTodo, deleteTodo }: ViewTaskProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = todos.find(todo => todo._id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // Sync state AFTER task is available
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setCompleted(task.completed);
    }
  }, [task]);

  if (!task) return <p>Task not found</p>;

  const handleUpdate = async () => {
    await updateTodo({
      ...task,
      title,
      description,
      completed,
    });
    navigate("/view-all");
  };

  const handleDelete = async () => {
    await deleteTodo(task._id);
    navigate("/view-all");
  };

  return (
    <div className="app-container">
      <Header />

      <div className="todo-form__wrapper">
        <div className="todo-form__inner">
          <div className="todo-form__left">
            <label>
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 2C15.431 2 2 15.432 2 32c0 16.568 13.432 30 30 30c16.568 0 30-13.432 30-30C62 15.432 48.568 2 32 2zm-6.975 48l-.02-.02l-.017.02L11 35.6l7.029-7.164l6.977 7.184l21-21.619L53 21.199L25.025 50z" fill="#009c15ff"></path></g></svg>
              <input
                type="checkbox"
                checked={completed}
                onChange={e => setCompleted(e.target.checked)}
              />
            </label>
          </div>

          <div className="todo-form__right">
            <label htmlFor="title-viewtask">Title</label>
            <input
              id="title-viewtask"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <label htmlFor="description-viewtask">Description</label>
            <textarea
              id="description-viewtask"
              rows={8}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="action-buttons">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
