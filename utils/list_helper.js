const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 :
    blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, blog) => {
        if (blog.likes > max){
            max = blog.likes
        }
        return max
    }
    const maxLikes = blogs.reduce(reducer, 0)
    return blogs.length === 0 ? [] :
    blogs.filter(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const numbers = lodash.countBy(authors)
    let max = { author: '', blogs: 0}
    for (entry in numbers){
        if (numbers[entry] > max.blogs){
            max.blogs = numbers[entry]
            max.author = entry
        }
    }
    return blogs.length === 0 ? 0 : max
}

const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const likes = blogs.map(blog => blog.likes)
    let numbers = lodash.countBy(authors)
    for (entry in numbers){
        numbers[entry] = 0;
    }
    for (i = 0; i<likes.length;i++){
        const author = authors[i]
        numbers[author] = numbers[author] + likes[i]
    }
    let max = { author: '', likes: 0}
    for (entry in numbers){
        if (numbers[entry] > max.likes){
            max.likes = numbers[entry]
            max.author = entry
        }
    }

    return blogs.length === 0 ? 0 : max
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}