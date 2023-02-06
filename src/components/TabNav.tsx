import React from "react"
import { Link } from "react-router-dom"

const TabNav = () => {
  return (
    <div className="tab-nav">
      <Link to="/tabs/tab1">Tab 1</Link>
      <Link to="/tabs/tab2">Tab 2</Link>
      <Link to="/tabs/tab3">Tab 3</Link>
    </div>
  )
}

export default TabNav
