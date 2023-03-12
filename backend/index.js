// Enviroment variables
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Initialization
const app = express()

// Settings
app.set('port', process.env.PORT || 8888)

// Global middlewares
app.use(express.json())
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  origin: 'http://127.0.0.1:5173/',
  credentials: true
}));

// Routes; this takes the index.js that is in the folder './routes'
app.use("/api", require('./routes'))

// Start server
app.listen(app.get('port'), () => {
  console.log('Server running on port: ', app.get('port'))
})

