import { useState } from 'react'

const Register = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    setToken(newUser.token)
    setPassword('')
    setUsername('')
  }
  return (
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
    </div>
  )
}

export default Register
