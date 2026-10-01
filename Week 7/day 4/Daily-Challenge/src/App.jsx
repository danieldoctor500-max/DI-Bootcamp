import { Carousel } from 'react-responsive-carousel'
import './Carousel.css'

function App() {
  return (
    <main className="container-fluid destination-page py-4 py-md-5">
      <h1 className="visually-hidden">Destination carousel</h1>
      <div className="destination-carousel mx-auto">
        <Carousel
          ariaLabel="Destination photos"
          infiniteLoop
          showArrows
          showIndicators
          showStatus
          showThumbs
          swipeable
        >
          <div>
            <img
              src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg"
              alt="Hong Kong harbor and skyline"
            />
            <p className="legend">Hong Kong</p>
          </div>
          <div>
            <img
              src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp"
              alt="Historic architecture in Macao"
            />
            <p className="legend">Macao</p>
          </div>
          <div>
            <img
              src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp"
              alt="A destination in Japan"
            />
            <p className="legend">Japan</p>
          </div>
          <div>
            <img
              src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp"
              alt="Las Vegas skyline at sunset"
            />
            <p className="legend">Las Vegas</p>
          </div>
        </Carousel>
      </div>
    </main>
  )
}

export default App
