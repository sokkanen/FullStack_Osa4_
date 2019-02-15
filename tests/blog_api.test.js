const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testblogs = require('./testblogs')
const Blog = require('../models/blog')

const api = supertest(app)
const oneBlog = new Blog(testblogs.listWithOneBlog2[0])
const additionalBlog = new Blog(testblogs.listWithOneBlog3[0])

beforeAll( async () => {
    jest.setTimeout(30000);
    await oneBlog.save()
})

describe('tests with a few blogs in db', () => {

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

test('adding a blog to db works', async () => {
        await additionalBlog.save()
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(2)
        const blog = response.body[1]
        expect(blog.author).toEqual('Patrik Laine')
    })
    
test('default for likes is 0', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[1]
        expect(blog.likes).toBe(0)
    })

test('adding a faulty blog return 400', async () => {
        const faultyBlog = {
            "url": "http://thisshouldnotwork.com"
        }
        await api
        .post('/api/blogs')
        .send(faultyBlog)
        .expect(400)
    })
})

afterAll(async () => {
    jest.setTimeout(30000);
    await oneBlog.remove()
    await additionalBlog.remove()
    mongoose.connection.close()
})