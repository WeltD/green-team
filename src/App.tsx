import React from "react"
import "./App.css"
import MainRoutes from "./Routes"
import Sidebar from "./components/Sidebar"
import "./styles.css"

function App() {
  return (
    <div className="App">
      <h1>BRS Parking Visualisation</h1>
      {/** Sidebar */}
      <Sidebar />

      {/** Inner container */}
      <MainRoutes />
    </div>
  )
}

export default App
