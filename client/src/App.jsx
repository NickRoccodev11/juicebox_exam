import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Posts from './components/Posts'

function App() {
  const [allPosts, setAllPosts] = useState([])
  const [token, setToken] = useState('')
  console.log("TOKEN", token)
  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await fetch('http://localhost:8000/api/posts')
      const postsdata = await res.json()
      console.log(postsdata)
      setAllPosts(postsdata)
    }
    fetchAllPosts()
  }, [])

  return (
    <div className='app'>
      <Navbar />
      <h1>JuiceBox</h1>
      <Routes>
        <Route path='/' element={<Posts posts={allPosts} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register setToken={setToken} />} />
        <Route path='/profile' element={<Profile token={token} />} />
      </Routes>
    </div>
  )
}

export default App
