import { useState } from 'react'
import { RegistrationForm } from './components/RegistrationForm'
import { DataTableExercise } from './components/DataTableExercise'
import { UserList } from './components/UserList'
import './App.css'

function App() {
  const [activeExercise, setActiveExercise] = useState(1)

  return (
    <main className="gold-shell">
      <header className="gold-header">
        <a className="gold-brand" href="#home" onClick={() => setActiveExercise(1)}>
          <span className="brand-icon">G</span><span>React lab <small>GOLD</small></span>
        </a>
        <div className="gold-path"><span>WEEK 10</span><b>/</b><span>DAY 1</span><b>/</b><span>ADVANCED TYPESCRIPT</span></div>
        <span className="ready-label"><i /> READY</span>
      </header>
      <div className="gold-layout">
        <aside className="gold-sidebar">
          <p className="side-overline">ADVANCED PRACTICE</p>
          <nav aria-label="Gold exercises">
            <button className={activeExercise === 1 ? 'selected' : ''} onClick={() => setActiveExercise(1)} type="button"><span>01</span><span>Form hook</span><b>↗</b></button>
            <button className={activeExercise === 2 ? 'selected' : ''} onClick={() => setActiveExercise(2)} type="button"><span>02</span><span>Generic table</span><b>↗</b></button>
            <button className={activeExercise === 3 ? 'selected' : ''} onClick={() => setActiveExercise(3)} type="button"><span>03</span><span>Fetch + cache</span><b>↗</b></button>
          </nav>
          <div className="side-foot"><span>3 EXERCISES</span><span>·</span><span>TYPE-SAFE</span></div>
        </aside>
        <section className="gold-content" key={activeExercise}>
          {activeExercise === 1 && <RegistrationForm />}
          {activeExercise === 2 && <DataTableExercise />}
          {activeExercise === 3 && <UserList />}
        </section>
      </div>
    </main>
  )
}

export default App
