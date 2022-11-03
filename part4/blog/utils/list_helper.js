const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const likesTotal = blogs.reduce((a, b) => a + b.likes, 0)
  return likesTotal
}
const favoriteBlog = (blogs) => {
  let mostLiked = blogs[0]
  for (const blog of blogs) {
    if (blog.likes > mostLiked.likes) {
      mostLiked = blog
    }
  }
  const { title, author, likes } = mostLiked
  return { title, author, likes }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
