import React from 'react'

const SinglePost = ({post}) => {
  return (
    <div className='single-post'>
      <h3>{post.title}</h3>
      {
        post.author &&
        <h4>by: {post.author.username}</h4>
      }
      <p>{post.content}</p>
    </div>
  )
}

export default SinglePost
