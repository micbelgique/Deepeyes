import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { Button } from "@mui/material"

export default function CaptureButton() {
  return (
    <Button
      color="primary"
      aria-label="take a picture"
      size="large"
      variant="contained"
    >
      <PhotoCamera />
    </Button>
  )
}
