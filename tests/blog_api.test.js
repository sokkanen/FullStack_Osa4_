const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testblogs = require('./testblogs')
const Blog = require('../models/blog')

const api = supertest(app)
const oneBlog = new Blog(testblogs.listWithOneBlog2[0])

beforeAll( async () => {
    jest.setTimeout(30000);
    await oneBlog.save()
})

describe('tests with one blog in db', () => {

test('blogs are returned as json', async () => {
    jest.setTimeout(30000);
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    })

test('there are n blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(1)
    })

test('blog is identified by the field id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
    })
})

afterAll(async () => {
    jest.setTimeout(30000);
    await oneBlog.remove()
    mongoose.connection.close()
})