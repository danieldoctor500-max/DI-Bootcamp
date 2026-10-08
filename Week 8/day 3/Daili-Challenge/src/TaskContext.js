import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  nextId: 1,
  filter: "all",
};

function taskReducer(state, action) {
  switch (action.type) {
    case "add": {
      const text = action.text.trim();
      if (!text) {
        return state;
      }

      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: state.nextId, text, completed: false },
        ],
        nextId: state.nextId + 1,
      };
    }
    case "edit": {
      const text = action.text.trim();
      if (!text) {
        return state;
      }

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text } : task
        ),
      };
    }
    case "toggle":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "remove":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "filter":
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider
      value={{ tasks: state.tasks, filter: state.filter, dispatch }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (context === null) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}
