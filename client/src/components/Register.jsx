import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const newUser = await res.json();
    if (newUser.token) {
      setToken(newUser.token)
      setPassword('')
      setUsername('')
      setIsRegistered(true)
    }

  }
  return (
    <div className='form-container'>
      <div className='form'>
        <h2>Register</h2>
        <form onSubmit={(e) => handleSubmit(e)} >
          <label >Username:</label><br />
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <label >Password:</label><br />
          <input
            required
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button>Register</button>
        </form>
        {
          isRegistered &&
          <>
            <p>Successful Registration!</p>
            <button onClick={() => navigate('/profile')}>Go to Profile</button>
          </>
        }
      </div>
    </div>

  )
}

export default Register
