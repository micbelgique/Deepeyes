import Masonry from "@mui/lab/Masonry"
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
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
          spacing={2}
          defaultHeight={450}
          defaultColumns={4}
          defaultSpacing={1}
        >
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}
        </Masonry>
      </Container>
    </div>
  )
}
export default Home
