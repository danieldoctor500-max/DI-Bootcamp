import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  return (
    <main className="page">
      <section className="task-manager" aria-labelledby="page-title">
        <p className="eyebrow">Week 8 · Day 3 · Daily Challenge</p>
        <h1 id="page-title">Task Manager</h1>
        <p className="intro">
          Organize your day, update your tasks, and keep track of what’s done.
        </p>
        <AddTaskForm />
        <TaskList />
      </section>
    </main>
  );
}

export default App;
