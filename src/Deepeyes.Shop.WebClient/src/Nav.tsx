import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home'
import Contact from './components/Contact'

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
        <Route path="/"  element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>
    </Router>
  )
}
export default Nav
