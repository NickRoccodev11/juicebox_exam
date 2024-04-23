import React from 'react'

const PostForm = () => {
  const [title, setTitle] = 
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Title:</label><br/>
        <input 
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        /><br/>
        <label>Content</label><br/>
        <input 
        type="text"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        /><br/>
        <button>Create Post</button>
      </form>
    </div>
  )
}

export default PostForm
