import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCategory,
  addTask,
  deleteCategory,
  deleteTask,
  editCategory,
  editTask,
  updateTaskProgress,
} from './redux/productivitySlice.js'
import {
  selectCategoriesList,
  selectCategoryById,
  selectCompletedTasks,
  selectTasksByCategory,
  selectTotalTasks,
} from './redux/selectors.js'

function CategorySelector({ selectedCategoryId, onSelectCategory, onDeleteCategory }) {
  const categories = useSelector(selectCategoriesList)
  const completedCount = useSelector(selectCompletedTasks)
  const totalCount = useSelector(selectTotalTasks)

  return (
    <aside className="sidebar" aria-label="Task categories">
      <div className="sidebar-label">YOUR SPACE</div>
      <nav className="category-nav" aria-label="Categories">
        {categories.map((category) => (
          <CategoryNavItem
            category={category}
            isSelected={selectedCategoryId === category.id}
            key={category.id}
            onSelect={() => onSelectCategory(category.id)}
            onDelete={() => onDeleteCategory(category.id)}
          />
        ))}
      </nav>
      <div className="sidebar-progress">
        <div className="progress-heading">
          <span>Today’s progress</span>
          <span>{totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Today's task completion"
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-valuenow={completedCount}
        >
          <span style={{ width: `${totalCount === 0 ? 0 : (completedCount / totalCount) * 100}%` }} />
        </div>
        <p>{completedCount} of {totalCount} tasks complete</p>
      </div>
    </aside>
  )
}

function CategoryNavItem({ category, isSelected, onSelect, onDelete }) {
  const categoryTasks = useSelector((state) => selectTasksByCategory(state, category.id))
  const completedCount = categoryTasks.filter((task) => task.completed).length
  const categoryColor = category.color || 'sage'

  return (
    <div className={`category-row${isSelected ? ' selected' : ''}`}>
      <button
        className="category-button"
        type="button"
        aria-current={isSelected ? 'page' : undefined}
        onClick={onSelect}
      >
        <span className={`category-dot dot-${categoryColor}`} aria-hidden="true" />
        <span className="category-name">{category.name}</span>
        <span className="category-count">{completedCount}/{categoryTasks.length}</span>
      </button>
      <div className="category-actions">
        <button
          type="button"
          aria-label={`Rename ${category.name}`}
          onClick={() => {
            const name = window.prompt('Rename category', category.name)?.trim()
            if (name && name !== category.name) {
              dispatch(editCategory({ id: category.id, name }))
            }
          }}
        >
          ✎
        </button>
        <button
          type="button"
          aria-label={`Delete ${category.name}`}
          disabled={categoryTasks.length > 0}
          title={categoryTasks.length > 0 ? 'Move or delete this category’s tasks first' : undefined}
          onClick={onDelete}
        >
          ×
        </button>
      </div>
    </div>
  )
}

function TaskList({ categoryId }) {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => selectTasksByCategory(state, categoryId))
  const category = useSelector((state) => selectCategoryById(state, categoryId))

  const handleToggle = useCallback((taskId) => {
    dispatch(updateTaskProgress(taskId))
  }, [dispatch])

  const handleDelete = useCallback((taskId) => {
    dispatch(deleteTask(taskId))
  }, [dispatch])

  const handleEdit = useCallback((task) => {
    const title = window.prompt('Edit task', task.title)?.trim()
    if (title && title !== task.title) {
      dispatch(editTask({ id: task.id, title, categoryId: task.categoryId }))
    }
  }, [dispatch])

  return (
    <section className="task-section" aria-labelledby="task-heading">
      <div className="task-header">
        <div>
          <p className="eyebrow">A LITTLE PROGRESS ADDS UP</p>
          <h2 id="task-heading">{category?.name || 'Your tasks'}</h2>
        </div>
        <span className="task-total">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
      </div>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className={`task-item${task.completed ? ' is-complete' : ''}`} key={task.id}>
              <button
                className="task-checkbox"
                type="button"
                role="checkbox"
                aria-checked={task.completed}
                aria-label={`${task.completed ? 'Mark incomplete' : 'Complete'} ${task.title}`}
                onClick={() => handleToggle(task.id)}
              >
                {task.completed && <span aria-hidden="true">✓</span>}
              </button>
              <span className="task-title">{task.title}</span>
              <div className="task-actions">
                <button type="button" aria-label={`Edit ${task.title}`} onClick={() => handleEdit(task)}>Edit</button>
                <button type="button" aria-label={`Delete ${task.title}`} onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <p>Nothing on the list yet.</p>
          <span>Add a task when you’re ready to begin.</span>
        </div>
      )}
    </section>
  )
}

function ProductivityTracker() {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategoriesList)
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? '')
  const [taskTitle, setTaskTitle] = useState('')
  const [newCategory, setNewCategory] = useState('')

  const handleAddTask = (event) => {
    event.preventDefault()
    const title = taskTitle.trim()
    if (!title || !selectedCategoryId) return

    dispatch(addTask({ title, categoryId: selectedCategoryId }))
    setTaskTitle('')
  }

  const handleAddCategory = (event) => {
    event.preventDefault()
    const name = newCategory.trim()
    if (!name || categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) return

    const action = addCategory(name)
    dispatch(action)
    setNewCategory('')
    setSelectedCategoryId(action.payload.id)
  }

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId))
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(categories.find((category) => category.id !== categoryId)?.id ?? '')
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">d</span>
          daymark
        </a>
        <span className="date-label">YOUR DAY, AT YOUR PACE</span>
      </header>

      <div className="workspace">
        <CategorySelector
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onDeleteCategory={handleDeleteCategory}
        />
        <div className="main-content">
          <div className="welcome">
            <p className="eyebrow">MAKE SPACE FOR WHAT MATTERS</p>
            <h1>A good day<br /><em>starts small.</em></h1>
            <p>Keep your tasks close, your focus gentle, and your progress visible.</p>
          </div>

          <div className="quick-add">
            <form className="task-form" onSubmit={handleAddTask}>
              <label className="visually-hidden" htmlFor="new-task">Add a task</label>
              <input
                id="new-task"
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Add a task to this category..."
                maxLength={120}
              />
              <button type="submit" disabled={!taskTitle.trim() || !selectedCategoryId}>Add task <span aria-hidden="true">+</span></button>
            </form>
            <form className="category-form" onSubmit={handleAddCategory}>
              <label className="visually-hidden" htmlFor="new-category">Add a category</label>
              <input
                id="new-category"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="New category"
                maxLength={30}
              />
              <button type="submit" disabled={!newCategory.trim()}>+ Category</button>
            </form>
          </div>

          <TaskList categoryId={selectedCategoryId} />
        </div>
      </div>

      <footer className="footer">
        <span>Small steps count.</span>
        <span className="footer-note">TODAY’S PROGRESS, THOUGHTFULLY TRACKED</span>
      </footer>
    </main>
  )
}

function App() {
  return <ProductivityTracker />
}

export default App
