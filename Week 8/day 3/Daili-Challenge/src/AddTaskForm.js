import { useState } from "react";
import { useTasks } from "./TaskContext";

function AddTaskForm() {
  const [text, setText] = useState("");
  const { dispatch } = useTasks();

  const addTask = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }

    dispatch({ type: "add", text });
    setText("");
  };

  return (
    <form className="task-form" onSubmit={addTask}>
      <label className="visually-hidden" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to get done?"
      />
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTaskForm;
