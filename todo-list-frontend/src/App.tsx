import React from 'react';
import './App.css';
import TodoCard from './components/TodoCard';

function App() {
  return (
    <div className="app-container">
     <header className="app-header">
      <h1 className="app-header__title">Todo <span>List</span></h1>
     </header>
     <div className="app-content__main">
      <div className="app-content__card--section">
        <TodoCard/>
        <TodoCard/>
        <TodoCard/>
        <TodoCard/>
        <TodoCard/>
        <TodoCard/>
        <TodoCard/>
        <TodoCard/>
      </div>
     </div>
    </div>
  );
}

export default App;
