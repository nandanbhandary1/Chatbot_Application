import { useState } from 'react'

const API = 'http://127.0.0.1:8000/api'

function Login({ setToken }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!email || !password || (!isLogin && !username)) {
      setError('All fields are required')
      return
    }

    const url = isLogin ? '/login/' : '/register/'
    const body = isLogin ? { email, password } : { email, username, password }

    try {
      const res = await fetch(API + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(JSON.stringify(data))
        return
      }

      if (isLogin) {
        localStorage.setItem('token', data.access)
        setToken(data.access)
      } else {
        alert('Registered successfully. Please login.')
        setIsLogin(true)
      }

    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="auth-box">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

      {!isLogin && (
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      )}

      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

      <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>

      <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>

      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Login
