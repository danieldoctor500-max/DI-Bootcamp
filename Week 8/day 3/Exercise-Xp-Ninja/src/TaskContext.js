import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  nextId: 1,
};

function taskReducer(state, action) {
  switch (action.type) {
    case "add": {
      const text = action.text.trim();
      if (!text) {
        return state;
      }

      return {
        tasks: [
          ...state.tasks,
          { id: state.nextId, text, completed: false },
        ],
        nextId: state.nextId + 1,
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
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, dispatch }}>
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
