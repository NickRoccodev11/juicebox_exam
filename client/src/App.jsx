import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Posts from './components/Posts'

function App() {
  const [allPosts, setAllPosts] = useState([])
  const [token, setToken] = useState('')
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('/')

  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (currentPage === '/') {
      const fetchAllPosts = async () => {
        const res = await fetch('http://localhost:8000/api/posts')
        const postsdata = await res.json()
        setAllPosts(postsdata)
      }
      fetchAllPosts()
    }
  }, [currentPage])

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
