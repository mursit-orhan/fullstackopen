const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const likesTotal = blogs.reduce((a, b) => a + b.likes, 0)
  return likesTotal
}

module.exports = {
  dummy,
  totalLikes,
}
