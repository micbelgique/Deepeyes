import Box from "@mui/material/Box"
import { Container } from "@mui/system"

function Home() {
  return (
    <div className="Home">
      <h1>Deep Eyes Project</h1>
      <Container>
        <Box
          sx={{
            display: "flex",
            m: 1,
            p: 1,
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        ></Box>
      </Container>
    </div>
  )
}
export default Home
