import React from 'react'
import SinglePost from './SinglePost'
const Posts = ({ posts }) => {
  return (
    <div className='all-posts'>
      {
        posts &&
        posts.map(post => {
          return <SinglePost key={post.id} post={post} />
        })
      }
    </div>
  )
}

export default Posts
