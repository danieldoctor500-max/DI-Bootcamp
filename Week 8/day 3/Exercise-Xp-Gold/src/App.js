import { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  todos: [],
  nextId: 1,
};

function todoReducer(state, action) {
  switch (action.type) {
    case "add": {
      const text = action.text.trim();
      if (!text) {
        return state;
      }

      return {
        todos: [...state.todos, { id: state.nextId, text }],
        nextId: state.nextId + 1,
      };
    }
    case "remove":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      return;
    }

    dispatch({ type: "add", text: newTodo });
    setNewTodo("");
  };

  return (
    <main className="page">
      <section className="todo-app" aria-labelledby="page-title">
        <p className="eyebrow">Week 8 · Day 3 · Exercise XP Gold</p>
        <h1 id="page-title">My Todo List</h1>
        <p className="intro">Add a task to your list, and remove it when it’s done.</p>

        <form className="todo-form" onSubmit={addTodo}>
          <label className="visually-hidden" htmlFor="new-todo">
            New todo
          </label>
          <input
            id="new-todo"
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit">Add todo</button>
        </form>

        {state.todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add your first task above.</p>
        ) : (
          <ul className="todo-list" aria-label="Todo list">
            {state.todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <span>{todo.text}</span>
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => dispatch({ type: "remove", id: todo.id })}
                  aria-label={`Remove ${todo.text}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="todo-count" aria-live="polite">
          {state.todos.length} {state.todos.length === 1 ? "task" : "tasks"}
        </p>
      </section>
    </main>
  );
}

export default App;
