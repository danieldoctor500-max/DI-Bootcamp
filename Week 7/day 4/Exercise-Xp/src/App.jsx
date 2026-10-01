import './App.css'
import Exercise from './Exercise3.jsx'
import UserFavoriteAnimals from './UserFavoriteAnimals.jsx'

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
}

function App() {
  const myelement = <h1>I Love JSX!</h1>
  const sum = 5 + 5

  return (
    <main className="exercise-page">
      <section className="exercise-section" aria-labelledby="jsx-title">
        <p className="eyebrow">Exercise 1</p>
        <h2 id="jsx-title">With JSX</h2>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
      </section>

      <section className="exercise-section" aria-labelledby="object-title">
        <p className="eyebrow">Exercise 2</p>
        <h2 id="object-title">Object and props</h2>
        <div className="user-name">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
        </div>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>

      <section className="exercise-section" aria-labelledby="tags-title">
        <p className="eyebrow">Exercise 3</p>
        <h2 id="tags-title">HTML tags in React</h2>
        <Exercise />
      </section>
    </main>
  )
}

export default App