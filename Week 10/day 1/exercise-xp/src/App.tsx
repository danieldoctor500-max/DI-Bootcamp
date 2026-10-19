import { useState } from 'react'
import { Counter } from './components/Counter'
import { Greeting } from './components/Greeting'
import { UserCard } from './components/UserCard'
import { UserList } from './components/UserList'
import './App.css'

const exercises = [
  { id: 1, title: 'Project setup', tag: 'VITE + TS' },
  { id: 2, title: 'Typed props', tag: 'INTERFACES' },
  { id: 3, title: 'State hooks', tag: 'USESTATE' },
  { id: 4, title: 'Optional props', tag: 'DEFAULTS' },
  { id: 5, title: 'Fetch data', tag: 'USEEFFECT' },
] as const

type ExerciseId = (typeof exercises)[number]['id']

function App() {
  const [activeExercise, setActiveExercise] = useState<ExerciseId>(1)
  const exercise = exercises.find(({ id }) => id === activeExercise)!

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={() => setActiveExercise(1)}>
          <span className="wordmark-mark">R</span>
          <span>React lab</span>
        </a>
        <div className="course-path" aria-label="Course location">
          <span>WEEK 10</span><span className="path-slash">/</span>
          <span>DAY 1</span><span className="path-slash">/</span>
          <span>REACT + TYPESCRIPT</span>
        </div>
        <span className="setup-status"><i /> Project ready</span>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <p className="sidebar-label">TODAY'S PRACTICE</p>
          <nav aria-label="Exercises">
            {exercises.map((item) => (
              <button
                className={`exercise-link${activeExercise === item.id ? ' is-active' : ''}`}
                key={item.id}
                type="button"
                aria-current={activeExercise === item.id ? 'step' : undefined}
                onClick={() => setActiveExercise(item.id)}
              >
                <span className="exercise-number">0{item.id}</span>
                <span className="exercise-name">{item.title}</span>
                <span className="exercise-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="footer-rule" /><span>5 exercises</span><span>·</span>
            <span>Type-safe by design</span>
          </div>
        </aside>

        <main className="main-content" key={activeExercise}>
          <div className="content-heading">
            <div>
              <p className="eyebrow">EXERCISE 0{activeExercise} <span>/</span> {exercise.tag}</p>
              <h1>{exercise.title}</h1>
            </div>
            <div className="heading-mark" aria-hidden="true">{String(activeExercise).padStart(2, '0')}</div>
          </div>

          <section className="lesson-stage" aria-label={`${exercise.title} exercise`}>
            {activeExercise === 1 && (
              <div className="setup-view">
                <div className="setup-copy">
                  <span className="setup-kicker">ENVIRONMENT CHECK <span className="check-mark">OK</span></span>
                  <h2>Your workspace<br />is ready to build.</h2>
                  <p>A React app, compiled with TypeScript and served by Vite.</p>
                </div>
                <div className="stack-list" aria-label="Project stack">
                  <div><span className="stack-index">01</span><span>React</span><span className="stack-version">UI</span></div>
                  <div><span className="stack-index">02</span><span>TypeScript</span><span className="stack-version">TYPES</span></div>
                  <div><span className="stack-index">03</span><span>Vite</span><span className="stack-version">DEV SERVER</span></div>
                </div>
              </div>
            )}
            {activeExercise === 2 && (
              <div className="component-demo">
                <div className="demo-caption"><span>COMPONENT PREVIEW</span><span>Greeting.tsx</span></div>
                <Greeting name="Alex" messageCount={3} />
                <div className="type-note"><span className="type-symbol">{'{ }'}</span><span><strong>GreetingProps</strong> keeps both props explicit and required.</span></div>
              </div>
            )}
            {activeExercise === 3 && (
              <div className="component-demo">
                <div className="demo-caption"><span>INTERACTIVE STATE</span><span>Counter.tsx</span></div>
                <Counter />
              </div>
            )}
            {activeExercise === 4 && (
              <div className="component-demo">
                <div className="demo-caption"><span>DEFAULT VALUES</span><span>UserCard.tsx</span></div>
                <div className="user-card-grid">
                  <UserCard name="Morgan Lee" age={28} role="Designer" />
                  <UserCard name="Sam Rivera" role="Developer" />
                  <UserCard />
                </div>
              </div>
            )}
            {activeExercise === 5 && (
              <div className="component-demo user-list-demo">
                <div className="demo-caption"><span>LIVE API RESPONSE</span><span>UserList.tsx</span></div>
                <UserList />
              </div>
            )}
          </section>

          <footer className="content-footer">
            <span>REACT <b>·</b> TYPESCRIPT</span><span>WEEK 10 / DAY 1</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
