import { useTasks } from "./TaskContext";

function TaskList() {
  const { tasks, dispatch } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="tasks-heading">
        <h2 id="tasks-heading">Your tasks</h2>
        <span>
          {completedCount} of {tasks.length} completed
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Add one above to get started.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.id}>
              <label className={`task-label${task.completed ? " is-completed" : ""}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch({ type: "toggle", id: task.id })}
                  aria-label={`Mark ${task.text} ${task.completed ? "not complete" : "complete"}`}
                />
                <span>{task.text}</span>
              </label>
              <button
                className="remove-button"
                type="button"
                onClick={() => dispatch({ type: "remove", id: task.id })}
                aria-label={`Remove ${task.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
