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

const mostBlogs = (blogs) => {
  const authorBlog = new Map()
  for (const blog of blogs) {
    const blogCount = authorBlog.get(blog.author)
    if (blogCount) {
      authorBlog.set(blog.author, blogCount + 1)
    } else {
      authorBlog.set(blog.author, 1)
    }
  }

  const theMostBlog = { blogs: 0 }
  for (const [author, blogs] of authorBlog) {
    if (blogs > theMostBlog.blogs) {
      theMostBlog.author = author
      theMostBlog.blogs = blogs
    }
  }
  return theMostBlog
}
const mostLikes = (blogs) => {
  const authorBlog = new Map()
  for (const blog of blogs) {
    const likeCount = authorBlog.get(blog.author)
    if (likeCount) {
      authorBlog.set(blog.author, likeCount + blog.likes)
    } else {
      authorBlog.set(blog.author, blog.likes)
    }
  }
  const theMostLikes = { likes: 0 }
  for (const [author, likes] of authorBlog) {
    if (likes > theMostLikes.likes) {
      theMostLikes.author = author
      theMostLikes.likes = likes
    }
  }
  return theMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
