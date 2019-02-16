const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    request.token = auth.substring(7)
  }
  next()
}

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
.then(()=> {
  console.log('Connected')
})
.catch((error) => {
  console.log('Failed to connect: ', error.message)
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app