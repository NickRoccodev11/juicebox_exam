import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

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
    });
    const loggedUser = await res.json();
    if (loggedUser.token) {
      setToken(loggedUser.token);
      setCurrentUser(loggedUser.username)
      setPassword('');
      setUsername('');
      setIsLoggedIn(true);
      setMessage('')
    } else {
      if (loggedUser.msg) {
        setMessage(loggedUser.msg)
      }

    }

  }
  return (
    <div className='form-container'>
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
        {
          isLoggedIn &&
          <>
            <p>SuccesssFul Login!</p>
            <button onClick={() => navigate('/profile')}>Go to Profile</button>
          </>
        }
        {
          message &&
          <p>{message}</p>
        }
      </div>
    </div>

  )
}

export default Login
