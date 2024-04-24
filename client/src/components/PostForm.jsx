import { useState } from 'react'

const PostForm = ({ userPosts, setUserPosts, setShowCreate, token }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content
      })
    })
    const newPost = await res.json();
    setUserPosts([...userPosts, newPost])
    setContent('')
    setTitle('')
    setShowCreate(false)
  }

  return (
    <div className='form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Title:</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <label>Content</label><br />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        /><br />
        <button>Create Post</button>
      </form>
    </div>
  )
}

export default PostForm
