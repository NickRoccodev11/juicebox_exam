import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SinglePost from './SinglePost'
import UpdateForm from './UpdateForm'
import PostForm from './PostForm'

const Profile = ({ allPosts, token, currentUser, setAllPosts }) => {

  const [showUpdateForm, setShowUpdateForm] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    setAllPosts(prev => prev.filter(post => post.id !== id))
  }


  return (
    <div className='profile'>
      {
        token ?
          <div>
            <button onClick={() => setShowCreate(true)}>Create a new post</button>
            {
              showCreate &&
              <PostForm
                setAllPosts={setAllPosts}
                setShowCreate={setShowCreate}
                token={token}
                currentUser={currentUser}
              />
            }
            <h2>My Posts</h2>
            {
              allPosts &&
              allPosts.map(post => {
                if (post.author.username === currentUser) {
                  return (
                    <div key={post.id}>
                      <SinglePost
                        post={post}
                        token={token}
                        allPosts={allPosts}
                        setAllPosts={setAllPosts}
                        currentUser={currentUser}
                      />
                      <button onClick={() => setShowUpdateForm(post.id)}>edit post</button>
                      {
                        showUpdateForm === post.id &&
                        <UpdateForm
                          id={post.id}
                          title={post.title}
                          content={post.content}
                          setShowUpdateForm={setShowUpdateForm}
                          token={token}
                          setAllPosts={setAllPosts}
                        />
                      }
                      <button onClick={() => handleDelete(post.id)}>delete post</button>
                    </div>
                  )
                }
              })
            }

          </div> :
          <div>
            <h3> You must be logged in to see your profile</h3>
            <button onClick={() => navigate('/login')}>go to login</button>
          </div>
      }
    </div>
  )
}

export default Profile
