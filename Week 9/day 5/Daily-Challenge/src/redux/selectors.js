import { createSelector } from '@reduxjs/toolkit'

const selectAllTasks = (state) => state.productivity.tasks
const selectCategories = (state) => state.productivity.categories

export const selectTasksByCategory = createSelector(
  [selectAllTasks, (_, categoryId) => categoryId],
  (tasks, categoryId) => tasks.filter((task) => task.categoryId === categoryId),
)

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.completed).length,
)

export const selectCategoryById = createSelector(
  [selectCategories, (_, categoryId) => categoryId],
  (categories, categoryId) => categories.find((category) => category.id === categoryId),
)

export const selectCategoriesList = (state) => state.productivity.categories
export const selectTotalTasks = (state) => state.productivity.tasks.length
