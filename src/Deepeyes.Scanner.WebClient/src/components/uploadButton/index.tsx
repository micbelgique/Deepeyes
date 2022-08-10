import UploadIcon from "@mui/icons-material/Upload"
import { Button } from "@mui/material"
import { useCallback } from "react"

export default function UploadButton({ onSubmit }: { onSubmit: Function }) {
  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      console.log("gello")
      if (files) {
        onSubmit(files)
      }
    },
    []
  )

  return (
    <Button variant="contained" component="label">
      <UploadIcon />
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleChange}
      />
    </Button>
  )
}
