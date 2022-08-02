import { useState } from 'react'
import './App.css'
import Nav from './Nav'
import { Container } from "@mui/material";
import Footer from './footer';

function App() {
  return (
    <>
    <Nav />
      <div className="content">
        <Container maxWidth="sm">
        </Container>
      </div>
      <Footer />
    </>
  )
}
export default App
