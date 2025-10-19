import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./components/Login"
import Nav from "./components/Nav"
import Signup from "./components/Signup"
import CaptionAI from "./components/CaptionAI"

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<CaptionAI/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/caption" element={<CaptionAI/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
