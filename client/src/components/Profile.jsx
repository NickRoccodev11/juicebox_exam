import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SinglePost from './SinglePost'
import UpdateForm from './UpdateForm'

const Profile = ({ token }) => {
  const [userPosts, setUserPosts] = useState()
  const [showUpdateForm, setShowUpdateForm] = useState(null)

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (token) {
        const res = await fetch('http://localhost:8000/api/posts/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const userPostData = await res.json();
        console.log(userPostData)
        setUserPosts(userPostData);
      }
    }
    fetchUserPosts();
  }, [])

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    setUserPosts(prev => prev.filter(post => post.id !== id))
  }

  const navigate = useNavigate()
  return (
    <div className='profile'>
      {
        token ?
          <div>
            <h2>My Posts</h2>
            {
              userPosts &&
              userPosts.map(post => {
                return (
                  <div key={post.id}>
                    <SinglePost post={post} />
                    <button onClick={() => handleDelete(post.id)}>delete post</button><br />
                    <button onClick={() => setShowUpdateForm(post.id)}>edit post</button>
                    {
                      showUpdateForm === post.id &&
                      <UpdateForm
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        setShowUpdateForm={setShowUpdateForm}
                        token={token}
                        userPosts={userPosts}
                        setUserPosts={setUserPosts}
                      />
                    }
                  </div>
                )
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
