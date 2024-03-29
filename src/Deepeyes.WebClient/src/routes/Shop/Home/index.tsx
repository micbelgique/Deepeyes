import Masonry from "@mui/lab/Masonry"
import { Button, CircularProgress, Container, Dialog, Grid, Skeleton, Stack, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import ItemCard from "../components/ItemCard"
import ItemModal from "../components/ItemModal"
import Search from "../components/Search"
import StatsModal from "../components/StatsModal"
import usePollingEffect from "../hooks/usePollingEffect"
import ScanVisionResult from "../models/ScanVisionResult"
import ShopDisplay from "../models/ShopDisplay"
import CachedIcon from '@mui/icons-material/Cached';


function Home() {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  useEffect(() => {
    if (title === "") fetchTitle()
  }, [])

  const fetchTitle = async () => {
    setIsLoading(true)
    fetch(import.meta.env.VITE_FUNCTION_APP_URL + "/GenerateTitle")
      .then((res) => res.json())
      .then((data: ShopDisplay) => {
        setTitle(data.title)
        setDescription(data.description)
        setIsLoading(false);
      })

  }

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
      const url = `${import.meta.env.VITE_FUNCTION_APP_URL}/deleteItem?id=${selectedItem.id
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
      <Container sx={{ textAlign: "center", pb: "1%" }} >
        {isLoading ?
          <><Skeleton variant="rectangular" width={"100%"} height={"10vh"} /> <br />
            <Skeleton variant="rectangular" width={"100%"} height={"5vh"} /></>
          :
          <><Typography variant="h2" sx={{ color: "black", textAlign: "center" }}>
            {title}
          </Typography><Typography variant="subtitle1" sx={{ color: "black", textAlign: "center" }}>
              {description}
            </Typography></>
        }
      </Container>
      <Grid container justifyContent="space-between" sx={{ pl: "12em", pr: "13em", pb: "1em" }}>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => window.location.reload()} >
              <CachedIcon />
            </Button>

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
      <Container  sx={{textAlign: "center"}}>
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
        </Container>
     
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
