import {useState} from 'react'

const UpdateForm = ({title, content}) => {
  const [newTitle, setNewTitle] = useState(title)
  const [content, setNewContent] = useState(content)

const handleSubmit = async(e)=>{
  e.preventDefault();
  const res = await fetch(`http://localhost:8000/api/posts/${id}`)
}

  return (
    <div className='form'>
      <form  onSubmit={(e)=>handleSubmit(e)}>
        <label> new title </label><br/>
        <input 
        type="text" 
        value={newTitle}
        onChange={(e)=> setNewTitle(e.target.value)}
        /><br/>
        <label> new content </label><br/>
        <input 
        type="text" 
        value={setNewContent}
        onChange={(e)=> setNewContent(e.target.value)}
        /><br/>
  <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateForm
