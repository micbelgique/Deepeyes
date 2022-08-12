import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import "./App.css"
import Footer from "./components/Footer"
import Nav from "./components/Nav"

function App() {
  return (
    <>
      <div className="content">
        <Nav />
        <main>
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </main>
      </div>
      <Footer />
    </>
  )
}
export default App
