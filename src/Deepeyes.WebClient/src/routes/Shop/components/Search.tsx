import SearchIcon from "@mui/icons-material/Search"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"

export default function Search({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(searchQuery)
      }}
    >
      <TextField
        variant="standard"
        id="search"
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onSubmit(searchQuery)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  )
}
