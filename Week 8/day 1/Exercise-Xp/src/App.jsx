import { Component } from 'react'
import ErrorBoundary from './ErrorBoundary.jsx'
import './App.css'

const simulations = [
  {
    id: 'shared',
    label: 'One boundary, two counters',
    description:
      'Both counters share one boundary. When either counter crashes, both are replaced by the fallback.',
  },
  {
    id: 'separate',
    label: 'Two boundaries',
    description:
      'Each counter has its own boundary, so one can crash without affecting the other.',
  },
  {
    id: 'unprotected',
    label: 'No boundary',
    description:
      'The counter is unprotected. Its rendering error clears the React tree; refresh the page to try again.',
  },
]

class BuggyCounter extends Component {
  state = { counter: 0 }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }))
  }

  render() {
    if (this.state.counter >= 5) {
      throw new Error('I crashed!')
    }

    return (
      <button className="counter-card" onClick={this.handleClick} type="button">
        <span className="counter-card__label">{this.props.label}</span>
        <span className="counter-card__value">{this.state.counter}</span>
        <span className="counter-card__hint">Click to increment</span>
      </button>
    )
  }
}

class ColorLifecycle extends Component {
  state = { favoriteColor: 'red' }

  componentDidMount() {
    this.colorTimer = window.setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' })
    }, 2500)
  }

  componentWillUnmount() {
    window.clearTimeout(this.colorTimer)
  }

  shouldComponentUpdate() {
    return true
  }

  getSnapshotBeforeUpdate() {
    console.log('in getSnapshotBeforeUpdate')
    return this.state.favoriteColor
  }

  componentDidUpdate(_previousProps, _previousState, snapshot) {
    console.log('after update', { previousColor: snapshot })
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' })
  }

  render() {
    return (
      <div className="color-demo">
        <div
          className="color-swatch"
          style={{ '--swatch-color': this.state.favoriteColor }}
          aria-label={`Favorite color: ${this.state.favoriteColor}`}
        >
          <span>{this.state.favoriteColor}</span>
        </div>
        <div className="color-demo__copy">
          <p className="eyebrow">CLASS COMPONENT · UPDATE PHASE</p>
          <h3>
            My favorite color is{' '}
            <span className="color-name">{this.state.favoriteColor}</span>
          </h3>
          <p>
            Starts red, changes to yellow after mounting, and can be changed to
            blue with the button.
          </p>
          <button className="button button--primary" onClick={this.changeColor} type="button">
            Change color to blue
          </button>
        </div>
      </div>
    )
  }
}

class Child extends Component {
  componentWillUnmount() {
    window.alert('The Child component has unmounted.')
  }

  render() {
    return <h3 className="child-message">Hello World!</h3>
  }
}

class App extends Component {
  state = {
    activeExercise: 'errors',
    simulation: 'shared',
    boundaryRun: 0,
    show: true,
  }

  selectExercise = (activeExercise) => {
    this.setState({ activeExercise })
  }

  selectSimulation = (simulation) => {
    this.setState((state) => ({
      simulation,
      boundaryRun: state.boundaryRun + 1,
    }))
  }

  resetSimulation = () => {
    this.setState((state) => ({ boundaryRun: state.boundaryRun + 1 }))
  }

  deleteChild = () => {
    this.setState({ show: false })
  }

  renderCounters() {
    const { simulation, boundaryRun } = this.state

    if (simulation === 'shared') {
      return (
        <ErrorBoundary key={boundaryRun}>
          <div className="counter-grid">
            <BuggyCounter label="Counter one" />
            <BuggyCounter label="Counter two" />
          </div>
        </ErrorBoundary>
      )
    }

    if (simulation === 'separate') {
      return (
        <div className="counter-grid">
          <ErrorBoundary key={`first-${boundaryRun}`}>
            <BuggyCounter label="Counter one" />
          </ErrorBoundary>
          <ErrorBoundary key={`second-${boundaryRun}`}>
            <BuggyCounter label="Counter two" />
          </ErrorBoundary>
        </div>
      )
    }

    return (
      <div className="counter-grid">
        <BuggyCounter key={boundaryRun} label="Unprotected counter" />
      </div>
    )
  }

  render() {
    const { activeExercise, simulation, show } = this.state
    const currentSimulation = simulations.find((item) => item.id === simulation)

    return (
      <main className="app-shell">
        <header className="hero">
          <div className="hero__content">
            <p className="eyebrow">WEEK 8 · DAY 1 · REACT</p>
            <h1>Lifecycle &amp; error boundaries</h1>
            <p className="hero__intro">
              Explore how class components update, unmount, and recover from
              rendering errors.
            </p>
            <div className="topic-list" aria-label="Topics">
              <span>React lifecycle</span>
              <span>Event handlers</span>
              <span>Error boundaries</span>
            </div>
          </div>
          <div className="hero__orbit" aria-hidden="true">
            <span className="orbit orbit--outer" />
            <span className="orbit orbit--inner" />
            <span className="orbit__core">R</span>
          </div>
        </header>

        <nav className="exercise-tabs" aria-label="Exercises">
          <button
            className={`exercise-tab ${activeExercise === 'errors' ? 'is-active' : ''}`}
            aria-pressed={activeExercise === 'errors'}
            onClick={() => this.selectExercise('errors')}
            type="button"
          >
            <span className="exercise-tab__number">01</span>
            <span>Error boundary simulation</span>
          </button>
          <button
            className={`exercise-tab ${activeExercise === 'lifecycle' ? 'is-active' : ''}`}
            aria-pressed={activeExercise === 'lifecycle'}
            onClick={() => this.selectExercise('lifecycle')}
            type="button"
          >
            <span className="exercise-tab__number">02–03</span>
            <span>Lifecycle</span>
          </button>
        </nav>

        {activeExercise === 'errors' ? (
          <section className="exercise-section" aria-labelledby="errors-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">EXERCISE 1</p>
                <h2 id="errors-title">Error boundary simulation</h2>
                <p className="section-description">
                  Click a counter five times to make it throw an error. Try each
                  boundary setup and compare what stays on screen.
                </p>
              </div>
              <button
                className="button button--quiet"
                onClick={this.resetSimulation}
                type="button"
              >
                Reset counters
              </button>
            </div>

            <div className="simulation-picker" role="group" aria-label="Choose a simulation">
              {simulations.map((item, index) => (
                <button
                  className={`simulation-option ${simulation === item.id ? 'is-active' : ''}`}
                  key={item.id}
                  onClick={() => this.selectSimulation(item.id)}
                  type="button"
                  aria-pressed={simulation === item.id}
                >
                  <span className="simulation-option__number">0{index + 1}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="demo-panel">
              <div className="demo-panel__heading">
                <div>
                  <p className="eyebrow">SIMULATION {simulations.findIndex((item) => item.id === simulation) + 1}</p>
                  <h3>{currentSimulation.label}</h3>
                </div>
                <span className={`status-pill ${simulation === 'unprotected' ? 'status-pill--warning' : ''}`}>
                  {simulation === 'unprotected' ? 'Unprotected' : 'Protected'}
                </span>
              </div>
              <p className="demo-panel__description">{currentSimulation.description}</p>
              {this.renderCounters()}
            </div>
          </section>
        ) : (
          <section className="exercise-section" aria-labelledby="lifecycle-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">EXERCISES 2 &amp; 3</p>
                <h2 id="lifecycle-title">Lifecycle in action</h2>
                <p className="section-description">
                  Observe the update lifecycle, then remove a child component
                  and observe its unmount lifecycle.
                </p>
              </div>
            </div>

            <div className="lifecycle-grid">
              <article className="demo-panel lifecycle-panel">
                <div className="demo-panel__heading">
                  <div>
                    <p className="eyebrow">PARTS I–III</p>
                    <h3>Updating a class component</h3>
                  </div>
                  <span className="status-pill">Update phase</span>
                </div>
                <ColorLifecycle />
                <p className="console-note">
                  Open the browser console to see <code>getSnapshotBeforeUpdate</code>{' '}
                  and <code>componentDidUpdate</code>.
                </p>
              </article>

              <article className="demo-panel lifecycle-panel">
                <div className="demo-panel__heading">
                  <div>
                    <p className="eyebrow">EXERCISE 3</p>
                    <h3>Unmounting a child</h3>
                  </div>
                  <span className="status-pill">Unmount phase</span>
                </div>
                <div className="unmount-demo">
                  <div className="child-stage">
                    {show ? (
                      <Child />
                    ) : (
                      <p className="empty-state">The child has been removed.</p>
                    )}
                  </div>
                  <button
                    className="button button--danger"
                    disabled={!show}
                    onClick={this.deleteChild}
                    type="button"
                  >
                    Delete child
                  </button>
                  <p className="unmount-hint">
                    Deleting the child calls <code>componentWillUnmount</code>.
                  </p>
                </div>
              </article>
            </div>
          </section>
        )}

        <footer className="page-footer">
          <span>Built with class components</span>
          <span>Mount · Update · Unmount</span>
        </footer>
      </main>
    )
  }
}

export default App
