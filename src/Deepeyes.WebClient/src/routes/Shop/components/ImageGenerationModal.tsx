import {
    Button,
    Dialog,
    DialogActions,
    Slide,
    useTheme,
  } from "@mui/material"
  import { TransitionProps } from "@mui/material/transitions"
  import useMediaQuery from "@mui/material/useMediaQuery"
  import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
  import { forwardRef } from "react"
import Generation from "../../Generation/Composant/Generation"

  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })
  
  interface ImageGenerationModalProps {
   
    open: boolean
    onClose: () => void
  }
  export default function ImageGenerationModal({ open, onClose }: ImageGenerationModalProps): JSX.Element {
    const theme = useTheme()
    const fullscreen = useMediaQuery(theme.breakpoints.down("md"))
  
    return (
      <Dialog
        fullScreen={fullscreen}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Generation/>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
  