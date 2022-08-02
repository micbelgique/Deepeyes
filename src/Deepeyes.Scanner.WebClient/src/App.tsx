import { Container, CssBaseline, Grid } from "@mui/material"
import "./App.css"
import Interface from "./components/interface"
import WebCam from "./components/webcam"
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl" fixed>
        <Grid container spacing={1} width={"100vw"}>
          <Grid item xs={6}>
            <WebCam />
          </Grid>
          <Grid item xs={6}>
            <Interface />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
