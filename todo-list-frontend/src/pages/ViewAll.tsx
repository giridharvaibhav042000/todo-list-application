import { useState, useMemo } from "react";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import { Todo } from "../types/Todo";
import { Link } from "react-router-dom";

interface ViewAllProps {
  todos: Todo[];
}

const ViewAll = ({ todos }: ViewAllProps) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "complete" | "incomplete">("all");
  const [sortBy, setSortBy] = useState<"name" | "status">("name");
  const [search, setSearch] = useState("");

  const filteredTodos = useMemo(() => {
    let list = [...todos];

    // Search
    if (search) {
      list = list.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter(todo =>
        statusFilter === "complete" ? todo.completed : !todo.completed
      );
    }

    // Sorting
    if (sortBy === "name") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => Number(a.completed) - Number(b.completed));
    }

    return list;
  }, [todos, statusFilter, sortBy, search]);

  return (
    <div className="app-container">
      <Header />

      <div className="app-filters">
        <div className="app-filter__input">
            <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
        </div>
        <div className="app-filter__select">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
            </select>
        </div>
      </div>

      <div className="app-content__card--section horizontal">
        {filteredTodos.length ? (
          filteredTodos.map(todo => (
            <TodoCard key={todo._id} task={todo} cardPos="vertical" />
          ))
        ) : (
          <p className="no_task">No tasks found</p>
        )}
      </div>

      <div className="app-content__cta">
        <Link to="/" className="app-content__back">Back</Link>
      </div>
    </div>
  );
};

export default ViewAll;
