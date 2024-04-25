import { useState } from 'react'

const SinglePost = ({ post, setAllPosts, allPosts, token, currentUser }) => {

  const handleLike = async (postId) => {
    const res = await fetch('http://localhost:8000/api/posts/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        postId
      })
    })

    const toggledLike = await res.json()
    const updatedPosts = allPosts.map(currentPost => {
      if (currentPost.id === post.id) {
        if (toggledLike.liked) {
          currentPost.Like.push(toggledLike)
          return currentPost
        } else if (!toggledLike.liked) {
          currentPost.Like = currentPost.Like.filter(like => like.userId !== toggledLike.userId)
          return currentPost
        }
      }
      return currentPost
    })
    setAllPosts(updatedPosts)
  }

  return (
    <div className='single-post'>
      <h3>{post.title}</h3>
      {
        post.author &&
        <h4>by: {post.author.username}</h4>
      }
      <p>{post.content}</p>
      {
        post.Like &&
        <p>likes: {post.Like.length}</p>
      }
      {
        currentUser &&
        <button onClick={() => handleLike(post.id)}>like</button>
      }
    </div>
  )
}

export default SinglePost
