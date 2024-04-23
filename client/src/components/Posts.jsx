import React from 'react'
import SinglePost from './SinglePost'
const Posts = ({ allPosts }) => {
  return (
    <div className='all-posts'>
      {
        allPosts &&
        allPosts.map(post => {
          return <SinglePost key={post.id} post={post} />
        })
      }
    </div>
  )
}

export default Posts
