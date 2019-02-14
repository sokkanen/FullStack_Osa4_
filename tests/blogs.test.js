const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs


test('dummy returns one', () => {
    expect(dummy([])).toBe(1)
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

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