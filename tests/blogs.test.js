const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./testblogs').blogs
const listWithOneBlog = require('./testblogs').listWithOneBlog


test('dummy returns one', () => {
    expect(dummy([])).toBe(1)
})

describe('total likes', () => {
    
    test('total likes with one blog is the likes of the blog', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('total likes with a list of 6 blogs', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('total likes with an empty list is 0', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })
})

describe('most liked blog', () => {
    
    const mostLiked = [
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          }
    ]

    test('most liked blog with one blog is that blog', () => {
        const result = favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog)
    })

    test('most liked blog with a list of blogs', () => {
        const result = favoriteBlog(blogs)
        expect(result).toEqual(mostLiked)
    })

    test('most liked blog with no blogs', () => {
        const result = favoriteBlog([])
        expect(result).toEqual([])
    })
})

describe('most blogs', () => {

    test('Author with the most blogs with bloglist', () => {
        const result = mostBlogs(blogs)
        const author = { author: 'Robert C. Martin', blogs: 3 }
        expect(result).toEqual(author)
    })

    test('Author with the most blogs with noblogs', () => {
        const result = mostBlogs([])
        expect(result).toBe(0)
    })

    test('Author with the most blogs with 1 blog', () => {
        const result = mostBlogs(listWithOneBlog)
        const author = { author: 'Edsger W. Dijkstra', blogs: 1 }
        expect(result).toEqual(author)
    })
})

describe('most likes', () => {
    test('Author with the most likes on his blogs with bloglist', () => {
        const result = mostLikes(blogs)
        const author = { author: 'Edsger W. Dijkstra', likes: 17 }
        expect(result).toEqual(author)
    })
    test('Author with the most likes on his blogs with one blog', () => {
        const result = mostLikes(listWithOneBlog)
        const author = { author: 'Edsger W. Dijkstra', likes: 5 }
        expect(result).toEqual(author)
    })
    test('Author with the most likes on his blogs with noBlog', () => {
        const result = mostLikes([])
        expect(result).toBe(0)
    })
})