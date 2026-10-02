import Car from './Components/Car.jsx'
import Color from './Components/Color.jsx'
import Events from './Components/Events.jsx'
import Phone from './Components/Phone.jsx'

const carinfo = { name: 'Ford', model: 'Mustang' }

const exercises = [
  { number: '01', title: 'Car and components' },
  { number: '02', title: 'Events' },
  { number: '03', title: 'Phone and components' },
  { number: '04', title: 'useEffect hook' },
]

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Exercise XP</h1>
        <p className="intro">Components, state, and events in one small garage of an app.</p>
      </header>

      <div className="exercise-grid">
        <section className="exercise-section" aria-labelledby="exercise-1-title">
          <div className="section-heading">
            <span className="exercise-number">{exercises[0].number}</span>
            <h2 id="exercise-1-title">{exercises[0].title}</h2>
          </div>
          <Car carInfo={carinfo} />
        </section>

        <section className="exercise-section" aria-labelledby="exercise-2-title">
          <div className="section-heading">
            <span className="exercise-number">{exercises[1].number}</span>
            <h2 id="exercise-2-title">{exercises[1].title}</h2>
          </div>
          <Events />
        </section>

        <section className="exercise-section" aria-labelledby="exercise-3-title">
          <div className="section-heading">
            <span className="exercise-number">{exercises[2].number}</span>
            <h2 id="exercise-3-title">{exercises[2].title}</h2>
          </div>
          <Phone />
        </section>

        <section className="exercise-section" aria-labelledby="exercise-4-title">
          <div className="section-heading">
            <span className="exercise-number">{exercises[3].number}</span>
            <h2 id="exercise-4-title">{exercises[3].title}</h2>
          </div>
          <Color />
        </section>
      </div>
    </main>
  )
}
