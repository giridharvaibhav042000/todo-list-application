import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import { Todo } from "../types/Todo";
import { Link } from "react-router-dom";

interface HomeProps {
  todos: Todo[];
}

const Home = ({ todos }: HomeProps) => {
  return (
    <div className="app-container">
    <Header/>
      <div className="app-content__card--section">
        {todos.slice(0, 4).map(todo => (
          <TodoCard
            key={todo.id}
            task={todo}
            cardPos="horizontal"
          />
        ))}

      </div>
        <div className="app-content__cta">
            <Link to="/view-all" className="app-content__viewall">
                view All
            </Link>
            <Link to="/add-task" className="app-content__addtodo">
                Add Todo
            </Link>
        </div>
    </div>
  );
};

export default Home;
