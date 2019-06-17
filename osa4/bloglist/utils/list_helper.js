var lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const max = likes.reduce((a, b) => Math.max(a, b))
    const index = likes.indexOf(max)
    const favorite = {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes
    }
    return favorite
}

const mostBlogs = (blogs) => {
    const sorted = lodash.sortBy(blogs, ['author'])
    const counts = lodash.countBy(sorted, 'author')
    const keys = lodash.keys(counts)
    const values = lodash.values(counts)
    const highest = values.reduce((a, b) => Math.max(a, b))
    const indexOfHighest = values.indexOf(highest)
    const answer = {
        author: keys[indexOfHighest],
        blogs: values[indexOfHighest]
    }
    return answer
}

const mostLikes = (blogs) => {
    const sums = blogs.reduce(
        (authors, entry) => {
            authors[entry.author] = authors[entry.author] || 0
            authors[entry.author] = authors[entry.author] + (entry.likes)
            return authors
        }, {})
    const result = lodash.keys(sums)
        .map(ath => ({ author: ath, likes: sums[ath] }))
        .reduce((highest, entry) =>
            highest === null || entry.likes > highest.likes
                ? entry
                : highest
        , null)
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}