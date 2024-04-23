import {useState} from 'react'

const Login = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const loggedUser = await res.json();
    setToken(loggedUser.token)
    setPassword('')
    setUsername('')
  }
  return (
    <div className='form'>
      <h2>Login</h2>
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
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
