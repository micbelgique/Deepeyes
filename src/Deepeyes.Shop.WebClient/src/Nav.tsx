import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"
import "./App.css"

import Contact from "./components/Contact"
import Home from "./components/Home"

function Nav() {
  return (
    <Router>
      <main>
        <nav className="navMenu">
          <ul className="nav-link">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  )
}
export default Nav
