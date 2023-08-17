import Masonry from "@mui/lab/Masonry"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import ItemCard from "../components/ItemCard"
import ItemModal from "../components/ItemModal"
import Search from "../components/Search"
import StatsModal from "../components/StatsModal"
import usePollingEffect from "../hooks/usePollingEffect"
import ScanVisionResult from "../models/ScanVisionResult"

function Home() {
  const [items, setItems] = useState<ScanVisionResult[]>([])
  const [selectedItem, setSelectedItem] = useState<ScanVisionResult | null>(null)
  const [openModalItem, setOpenModalitem] = useState(false)
  const [openModalStats, setOpenModalStats] = useState(false)
  const { stopPolling, startPolling } = usePollingEffect(
    () => {
      fetch(import.meta.env.VITE_FUNCTION_APP_URL + "/readtable")
        .then((res) => res.json())
        .then((data: ScanVisionResult[]) => setItems(data))
    },
    [],
    {
      interval: 10_000,
    }
  )

  const handleSearch = (search: string) => {
    if (search.length > 0) {
      stopPolling()
      const url = `${import.meta.env.VITE_FUNCTION_APP_URL}/search`
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

  const handleDelete = useCallback(async () => {
    if (selectedItem) {
      const url = `${import.meta.env.VITE_FUNCTION_APP_URL}/deleteItem?id=${
        selectedItem.id
      }&imageId=${selectedItem.image}`

      try {
        const res = await fetch(url, {
          method: "DELETE",
        })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        setItems((items) => items.filter((item) => item.id !== selectedItem.id))
        setSelectedItem(null)
        setOpenModalitem(false)
      } catch (e) {
        console.error(e)
      }
    }
  }, [selectedItem])

  const handleDeleteAll = useCallback(async () => {
    const url = `${import.meta.env.VITE_FUNCTION_APP_URL}/deleteItem`
    try {
      for (const { id, image } of items) {
        const res = await fetch(`${url}?id=${id}&imageId=${image}`, {
          method: "DELETE",
        })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
      }
      setItems([])
    } catch (e) {
      console.error(e)
    }
  }, [items])

  function showStats() {
    setOpenModalStats(true)
  }

  return (
    <>
    
      <Typography variant="h1" sx={{ color: "black", textAlign: "center" }}>
        Deep Eyes Project
      </Typography>
      <Grid container justifyContent="space-between" sx={{ mb: "1em" }}>
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={showStats}>
              Stats
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteAll}>
              DELETE ALL
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <Search onSubmit={handleSearch} />
        </Grid>
      </Grid>

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
              setOpenModalitem(true)
            }}
          />
        ))}
      </Masonry>
      <ItemModal
        open={openModalItem}
        item={selectedItem}
        onClose={() => setOpenModalitem(false)}
        onDelete={handleDelete}
      />
      <StatsModal items={items} open={openModalStats} onClose={() => setOpenModalStats(false)} />
    </>
  )
}
export default Home
