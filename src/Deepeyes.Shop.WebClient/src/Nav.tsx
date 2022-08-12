import { Typography } from "@mui/material"
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
            <Typography variant="h6" component="li">
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="li">
              <Link to="/contact">Contact</Link>
            </Typography>
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
