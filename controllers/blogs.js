const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const token = request.token
  console.log("Toukken: ", token)
  const blog = new Blog(request.body)
  try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id){
        return response.status(401).send({error: 'token missing or invalid'})
      }
    if (!blog.title || !blog.url){
      return response.status(400).end()
    }
    const user = await User.findById(decodedToken.id)
    blog.user = user
    const result = await blog.save()
    console.log(result._id)
    user.blogs = user.blogs.concat(result)
    await user.save()
    response.status(201).json(result)
  } catch (error) {
    if (error.name === 'JsonWebTokenError'){
      return response.status(401).send({error: 'token missing or invalid'})
    }
    next(error) 
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id.toString()){
      return response.status(401).send({error: 'token missing or invalid'})
    }
    console.log(blog.user)
    if (blog.user.toString() !== decodedToken.id){
      return response.status(401).send({error: "unauthorized user"})
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Lisää likejen määrää yhdellä
blogRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    blog = await Blog.findById(id)
    let likes = blog.likes + 1
    await Blog.findByIdAndUpdate(id, { likes: likes })
    return response.status(201).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter