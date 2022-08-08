import SearchIcon from "@mui/icons-material/Search"
import Masonry from "@mui/lab/Masonry"
import { InputAdornment, TextField } from "@mui/material"
import { Container } from "@mui/system"
import { useState } from "react"
import usePollingEffect from "../hooks/usePollingEffect"
import ScanVisionResult from "../models/ScanVisionResult"
import ItemCard from "./ItemCard"
import ItemModal from "./ItemModal"
function Home() {
  const [items, setItems] = useState<ScanVisionResult[]>([])
  const [selectedItem, setSelectedItem] = useState<ScanVisionResult | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState("")
  const { stopPolling, startPolling } = usePollingEffect(
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search.length > 0) {
      stopPolling()
      const url = new URL("/api/search", import.meta.env.VITE_FUNCTION_APP_URL)
      const params = new URLSearchParams({ q: search }).toString()
      fetch(url + "?" + params, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data: ScanVisionResult[]) => setItems(data))
    } else {
      startPolling()
    }
  }

  return (
    <div className="Home">
      <h1>Deep Eyes Project</h1>
      <Container>
        <form onSubmit={handleSearch}>
          <TextField
            variant="standard"
            id="search"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
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
              onClick={() => {
                setSelectedItem(item)
                setOpenModal(true)
              }}
            />
          ))}
        </Masonry>
      </Container>
      <ItemModal open={openModal} item={selectedItem} onClose={() => setOpenModal(false)} />
    </div>
  )
}
export default Home
