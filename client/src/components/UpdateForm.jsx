import { useState } from 'react'

const UpdateForm = ({ id, title, content, setShowUpdateForm, token, userPosts, setUserPosts }) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newContent, setNewContent] = useState(content)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent
      })
    })
    const updatedPost = await res.json()
    setUserPosts(userPosts => {
      return userPosts.map(post => {
        if (post.id === updatedPost.id) {
          return updatedPost
        } else {
          return post
        }
      })
    })
    setShowUpdateForm(null)
  }

  return (
    <div className='form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label> new title </label><br />
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        /><br />
        <label> new content </label><br />
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        /><br />
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateForm
