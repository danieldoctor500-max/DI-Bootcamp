import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  return (
    <main className="page">
      <section className="task-manager" aria-labelledby="page-title">
        <p className="eyebrow">Week 8 · Day 3 · Exercise XP Ninja</p>
        <h1 id="page-title">Task Manager</h1>
        <p className="intro">
          Keep track of what you need to do and check things off as you go.
        </p>
        <AddTaskForm />
        <TaskList />
      </section>
    </main>
  );
}

export default App;
