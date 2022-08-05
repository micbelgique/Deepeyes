import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { Button } from "@mui/material"

interface CaptureButtonProps {
  onClick: () => void
}

export default function CaptureButton({ onClick }: CaptureButtonProps) {
  return (
    <Button
      color="primary"
      aria-label="take a picture"
      size="large"
      variant="contained"
      onClick={onClick}
    >
    <PhotoCamera /> 
    </Button>
  )
}
