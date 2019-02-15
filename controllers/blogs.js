const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    if (!blog.title || !blog.url){
      return response.status(400).end()
    }
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
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