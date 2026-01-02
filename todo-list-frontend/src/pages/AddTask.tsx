import { useState } from "react";
import { CreateTodoPayload } from "../types/Todo";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface AddTaskProps {
    addTodo: (todo: CreateTodoPayload) => Promise<void>;
}

const AddTask = ({ addTodo }: AddTaskProps) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        // const newTodo = {
        //   title,
        //   description,
        //   completed,
        // };
        const newTodo: CreateTodoPayload = {
            title,
            description,
            completed,
        };


        await addTodo(newTodo);
        navigate("/");
    };

    return (
        <div className="app-container">
            <Header />

            <form onSubmit={handleSubmit} className="todo-form__wrapper">
                <div className="todo-form__inner">
                    <div className="todo-form__left">
                        <label>
                            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M32 2C15.431 2 2 15.432 2 32c0 16.568 13.432 30 30 30 16.568 0 30-13.432 30-30C62 15.432 48.568 2 32 2zm-6.975 48-.02-.02-.017.02L11 35.6l7.029-7.164 6.977 7.184 21-21.619L53 21.199 25.025 50z" fill="#009c15ff" />
                            </svg>
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={e => setCompleted(e.target.checked)}
                            />
                        </label>
                    </div>

                    <div className="todo-form__right">
                        <label htmlFor="title-addtask">Title</label>
                        <input
                            id="title-addtask"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <label htmlFor="description-addtask">Description</label>
                        <textarea
                            id="description-addtask"
                            placeholder="Description"
                            rows={8}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <button type="submit">Add Task</button>
                    </div>
                </div>
            </form>

            <div className="app-content__cta">
                <Link to="/" className="app-content__back">
                    back
                </Link>
            </div>
        </div>
    );
};

export default AddTask;
