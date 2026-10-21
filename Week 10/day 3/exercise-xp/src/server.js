require('dotenv').config()

const app = require('./app')
const { port } = require('./config')

app.listen(port, () => {
  console.log(`JWT exercise API listening on http://localhost:${port}`)
})