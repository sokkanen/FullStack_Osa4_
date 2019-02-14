const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
.then(()=> {
  console.log('Connected')
})
.catch((error) => {
  console.log('Failed to connect: ', error.message)
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

module.exports = app