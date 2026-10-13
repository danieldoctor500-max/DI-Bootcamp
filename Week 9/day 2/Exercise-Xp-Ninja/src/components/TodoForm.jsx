import { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions.js'

function TodoForm({ categories, addTodo }) {
  const [text, setText] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText || !categories.some((category) => category.id === categoryId)) {
      return
    }

    addTodo(trimmedText, categoryId)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="new-todo">Add a task to your list</label>
      <div className="form-controls">
        <input
          id="new-todo"
          className="todo-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs your attention?"
          autoComplete="off"
          maxLength={160}
        />
        <label className="sr-only" htmlFor="todo-category">Choose a category</label>
        <select
          id="todo-category"
          className="category-select"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button className="add-button" type="submit">Add task</button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({
  categories: state.todos.categories,
})

export default connect(mapStateToProps, { addTodo })(TodoForm)
