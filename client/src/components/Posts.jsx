import React from 'react'
import SinglePost from './SinglePost'
const Posts = ({ allPosts, setAllPosts, token, currentUser }) => {
  return (
    <div className='all-posts'>
      {
        allPosts &&
        allPosts.map(post => {
          return <SinglePost
            key={post.id}
            setAllPosts={setAllPosts}
            post={post}
            allPosts={allPosts}
            token={token}
            currentUser={currentUser}
          />
        })
      }
    </div>
  )
}

export default Posts
