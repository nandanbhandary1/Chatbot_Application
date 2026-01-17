import { useEffect, useState } from 'react'
import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const saved = localStorage.getItem('token')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setToken(saved)
  }, [])

  return (
    <>
      {token ? <Dashboard setToken={setToken} /> : <Login setToken={setToken} />}
    </>
  )
}

export default App
