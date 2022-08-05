import { Container } from "@mui/material"
import "./App.css"
import Footer from "./Footer"
import Nav from "./Nav"

function App() {
  return (
    <>
      <Nav />
      <div className="content">
        <Container maxWidth="sm"></Container>
      </div>
      <Footer />
    </>
  )
}
export default App
