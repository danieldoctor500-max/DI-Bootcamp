const STORAGE_KEY = 'daymark.daily-planner.tasks'

function isValidTask(task) {
  return (
    task &&
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.time === 'string' &&
    typeof task.notes === 'string'
  )
}

export function loadPlannerState() {
  try {
    const value = globalThis.localStorage?.getItem(STORAGE_KEY)
    if (value === undefined || value === null) {
      return { tasksByDate: {}, storageError: null }
    }

    const tasksByDate = JSON.parse(value)
    if (
      !tasksByDate ||
      Array.isArray(tasksByDate) ||
      typeof tasksByDate !== 'object' ||
      Object.values(tasksByDate).some(
        (tasks) => !Array.isArray(tasks) || !tasks.every(isValidTask),
      )
    ) {
      throw new Error('Saved planner data has an invalid format.')
    }

    return { tasksByDate, storageError: null }
  } catch (error) {
    return {
      tasksByDate: {},
      storageError: error instanceof Error
        ? `Could not load your saved planner: ${error.message}`
        : 'Could not load your saved planner.',
    }
  }
}

export function savePlannerState(tasksByDate) {
  if (!globalThis.localStorage) {
    throw new Error('Browser storage is unavailable.')
  }
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksByDate))
}
