import React from 'react'

const SinglePost = ({post}) => {
  return (
    <div className='single-post'>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  )
}

export default SinglePost
