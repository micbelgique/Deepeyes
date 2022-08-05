import Box from "@mui/material/Box"
import { Container } from "@mui/system"
import { useState } from "react"
import usePollingEffect from "../hooks/usePollingEffect"
import ScanVisionResult from "../models/ScanVisionResult"
import ItemCard from "./ItemCard"

function Home() {
  const [items, setItems] = useState<ScanVisionResult[]>([])
  usePollingEffect(
    () => {
      fetch(import.meta.env.VITE_FUNCTION_APP_URL + "/api/readtable")
        .then((res) => res.json())
        .then((data: ScanVisionResult[]) => setItems(data))
    },
    [],
    {
      interval: 10_000,
    }
  )

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
        >
          {items.map((item) => (
            <ItemCard
              key={item.id}
              description={item.captions?.[0]?.text ?? "description"}
              tags={item.tags}
              image={item.image}
            />
          ))}
        </Box>
      </Container>
    </div>
  )
}
export default Home
