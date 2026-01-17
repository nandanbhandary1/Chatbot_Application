import { useEffect, useState } from 'react'
import Chat from './chat'

const API = 'http://127.0.0.1:8000/api'

function Dashboard({ setToken }) {
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [newProject, setNewProject] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const res = await fetch(API + '/projects/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (Array.isArray(data)) setProjects(data)
  }

  const createProject = async () => {
    if (!newProject.trim()) return

    await fetch(API + '/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: newProject, description: '' })
    })

    setNewProject('')
    loadProjects()
  }

  // 🔥 DELETE PROJECT
  const deleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?")
    if (!confirmDelete) return

    await fetch(`${API}/projects/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (selected?.id === id) setSelected(null)
    loadProjects()
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="dashboard">
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <h3>Your Projects</h3>

        {/* Add Project */}
        <div className="add-project-box">
          <input
            placeholder="New project name..."
            value={newProject}
            onChange={e => setNewProject(e.target.value)}
          />
          <button onClick={createProject}>+</button>
        </div>

        {/* Project List */}
        <div className="project-list">
          {projects.map(p => (
            <div
              key={p.id}
              className={`project ${selected?.id === p.id ? 'active' : ''}`}
              onClick={() => setSelected(p)}
            >
              <span className="project-name">{p.name}</span>

              {/* 🗑️ DELETE BUTTON */}
              <span
                className="delete-project"
                onClick={(e) => {
                  e.stopPropagation()   // VERY IMPORTANT
                  deleteProject(p.id)
                }}
              >
                🗑️
              </span>
            </div>
          ))}
        </div>

        <button className="logout" onClick={logout}>Logout</button>
      </div>

      {/* ===== MAIN CHAT AREA ===== */}
      <div className="main">
        {selected ? (
          <Chat project={selected} />
        ) : (
          <div className="empty-state">
            <h2>Select a project</h2>
            <p>Choose a project to start chatting with AI</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
