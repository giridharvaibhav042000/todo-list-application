
import '../App.css';

function TodoCard() {
  return (
    <div className="todo-card__container">
        <div className="todo-card__inner">
            <div className="todo-card__content--check">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 2C15.431 2 2 15.432 2 32c0 16.568 13.432 30 30 30c16.568 0 30-13.432 30-30C62 15.432 48.568 2 32 2zm-6.975 48l-.02-.02l-.017.02L11 35.6l7.029-7.164l6.977 7.184l21-21.619L53 21.199L25.025 50z" fill="#000000"></path></g></svg>
            </div>
            <h2 className="todo-card__content--title">
                Todo Title
            </h2>
            <p className="todo-card__content--paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A expedita provident id, accusamus saepe et at numquam nostrum! Repellendus reprehenderit sequi facilis explicabo ad, eveniet rem ducimus enim quam animi!
            </p>
            <button className="todo-card__content--button">
                view
            </button>
        </div>
    </div>
  );
}

export default TodoCard;
