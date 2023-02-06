import React from "react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__items">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tabs">Tabs demo</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  )
}

export default Sidebar
