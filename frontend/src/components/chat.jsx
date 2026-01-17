import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const API = 'http://127.0.0.1:8000/api'

function Chat({ project }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const token = localStorage.getItem('token')

  const sendMessage = async () => {
    if (!input) return

    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    const res = await fetch(`${API}/projects/${project.id}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ message: userMsg.text })
    })

    const data = await res.json()
    setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
  }


  return (
    <div className="chat-container">
      <h3> <br />{project.name} - Project</h3>
      <br />

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            {m.role === 'bot' ? (
              <ReactMarkdown>{m.text}</ReactMarkdown>
            ) : (
              <span>{m.text}</span>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Type message..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat
