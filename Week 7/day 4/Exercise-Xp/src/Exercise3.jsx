import { Component } from 'react'
import './Exercise.css'

const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial',
}

class Exercise extends Component {
  render() {
    return (
      <div className="tags-exercise">
        <h1 style={style_header}>This is a heading</h1>
        <p className="para">This is a paragraph with its own CSS styling.</p>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          Learn more about React
        </a>
        <form className="sample-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="favorite-thing">Favorite thing</label>
          <input id="favorite-thing" name="favorite-thing" type="text" />
          <button type="submit">Submit</button>
        </form>
        <img
          className="sample-image"
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=640&q=80"
          alt="A dog looking toward the camera"
        />
        <ul className="sample-list">
          <li>Learn JSX</li>
          <li>Build components</li>
          <li>Style the page</li>
        </ul>
      </div>
    )
  }
}

export default Exercise