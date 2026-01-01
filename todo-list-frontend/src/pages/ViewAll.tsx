import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import { Todo } from "../types/Todo";
import { Link } from "react-router-dom";

interface ViewAllProps {
  todos: Todo[];
}

const ViewAll = ({ todos }: ViewAllProps) => {
  return (
    <div className="app-container">
      <Header/>
      <div className="app-content__card--section horizontal">
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            task={todo}
            cardPos="vertical"
          />
        ))}
      </div>
   <div className="app-content__cta">
      <Link to="/" className="app-content__back">
        back
      </Link>

   </div>
    </div>
  );
};

export default ViewAll;
