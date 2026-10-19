import { useState } from 'react'
import { ContactDirectory } from './components/Exercises'
import { ContactForm, FocusField, ProfileManager, SurveyForm } from './components/Exercises'
import './App.css'

const lessons = [
  { id: 1, label: 'Profile reducer', topic: 'ASYNC STATE' },
  { id: 2, label: 'Survey feedback', topic: 'STATE MACHINE' },
  { id: 3, label: 'Contact form', topic: 'FORM STATE' },
  { id: 4, label: 'Global contacts', topic: 'CONTEXT API' },
  { id: 5, label: 'DOM focus', topic: 'TYPED REFS' },
] as const

function App() {
  const [activeLesson, setActiveLesson] = useState<(typeof lessons)[number]['id']>(1)
  const lesson = lessons.find(({ id }) => id === activeLesson)!

  return (
    <div className="ninja-shell">
      <header className="ninja-header">
        <a className="ninja-brand" href="#home" onClick={() => setActiveLesson(1)}><span className="brand-symbol">N</span><span>React lab <small>NINJA</small></span></a>
        <div className="ninja-path"><span>WEEK 10</span><b>/</b><span>DAY 1</span><b>/</b><span>REDUCERS + CONTEXT</span></div>
        <span className="header-status"><i /> LIVE</span>
      </header>
      <div className="ninja-layout">
        <aside className="ninja-sidebar">
          <p className="sidebar-heading">ADVANCED PRACTICE</p>
          <nav aria-label="Ninja exercises">
            {lessons.map((item) => <button className={activeLesson === item.id ? 'active' : ''} key={item.id} type="button" aria-current={activeLesson === item.id ? 'step' : undefined} onClick={() => setActiveLesson(item.id)}>
              <span className="nav-index">0{item.id}</span><span className="nav-label">{item.label}</span><span className="nav-arrow" aria-hidden="true">↗</span>
            </button>)}
          </nav>
          <div className="sidebar-meta"><span /> 5 TYPED EXERCISES</div>
        </aside>
        <main className="ninja-main" key={activeLesson}>
          <div className="lesson-heading">
            <div><p className="lesson-overline">EXERCISE 0{activeLesson} <span>/</span> {lesson.topic}</p><h1>{lesson.label}</h1></div>
            <span className="lesson-number">0{activeLesson}</span>
          </div>
          {activeLesson === 1 && <ProfileManager />}
          {activeLesson === 2 && <SurveyForm />}
          {activeLesson === 3 && <ContactForm />}
          {activeLesson === 4 && <ContactDirectory />}
          {activeLesson === 5 && <FocusField />}
          <footer className="ninja-footer"><span>REACT <b>·</b> TYPESCRIPT</span><span>WEEK 10 / DAY 1</span></footer>
        </main>
      </div>
    </div>
  )
}

export default App
