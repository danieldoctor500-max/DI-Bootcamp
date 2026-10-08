import { useEffect, useMemo, useRef, useState } from "react";
import { useTasks } from "./TaskContext";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function EditableTask({ task, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const saveEdit = (event) => {
    event.preventDefault();
    const text = editInputRef.current?.value.trim();
    if (!text) {
      editInputRef.current?.focus();
      return;
    }

    dispatch({ type: "edit", id: task.id, text });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditKeyDown = (event) => {
    if (event.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <label className="visually-hidden" htmlFor={`edit-task-${task.id}`}>
            Edit {task.text}
          </label>
          <input
            id={`edit-task-${task.id}`}
            key={task.id}
            ref={editInputRef}
            className="edit-input"
            type="text"
            defaultValue={task.text}
            onKeyDown={handleEditKeyDown}
            aria-label={`Edit ${task.text}`}
          />
          <button className="save-button" type="submit">
            Save
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <label
            className={`task-label${task.completed ? " is-completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch({ type: "toggle", id: task.id })}
              aria-label={`Mark ${task.text} ${task.completed ? "not complete" : "complete"}`}
            />
            <span>{task.text}</span>
          </label>
          <div className="task-actions">
            <button
              className="edit-button"
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit ${task.text}`}
            >
              Edit
            </button>
            <button
              className="remove-button"
              type="button"
              onClick={() => dispatch({ type: "remove", id: task.id })}
              aria-label={`Remove ${task.text}`}
            >
              Remove
            </button>
          </div>
        </>
      )}
    </li>
  );
}

function TaskList() {
  const { tasks, filter, dispatch } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === "active") {
          return !task.completed;
        }
        if (filter === "completed") {
          return task.completed;
        }
        return true;
      }),
    [filter, tasks]
  );
  const filterLabel = FILTERS.find((option) => option.value === filter)?.label;

  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="tasks-heading">
        <h2 id="tasks-heading">Your tasks</h2>
        <span>
          {completedCount} of {tasks.length} completed
        </span>
      </div>

      <div className="filter-bar" aria-label="Filter tasks">
        {FILTERS.map((option) => (
          <button
            className={`filter-button${filter === option.value ? " is-selected" : ""}`}
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => dispatch({ type: "filter", filter: option.value })}
          >
            {option.label}
            {option.value === "all" && (
              <span className="filter-count">{tasks.length}</span>
            )}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Add one above to get started.</p>
      ) : visibleTasks.length === 0 ? (
        <p className="empty-state">
          No {filterLabel?.toLowerCase()} tasks. Choose another filter or add a
          task.
        </p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <EditableTask key={task.id} task={task} dispatch={dispatch} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
