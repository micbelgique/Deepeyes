import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  useTheme,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { forwardRef } from "react"
import { Doughnut } from "react-chartjs-2"
import ScanVisionResult from "../models/ScanVisionResult"
import { genderRatio, meanAge, nbObjects } from "../utils/stats"

ChartJS.register(ArcElement, Tooltip, Legend)

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ItemModalProps {
  items: ScanVisionResult[] | null
  open: boolean
  onClose: () => void
}
export default function StatsModal({ items, open, onClose }: ItemModalProps): JSX.Element {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"))

  if (items === null) items = []

  const genderProportions = genderRatio(items)
  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Gender Proportion",
        data: [genderProportions.nbMales, genderProportions.nbFemales, genderProportions.nbOthers],
        backgroundColor: ["red", "blue", "green"],
      },
    ],
  }

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
      <DialogTitle id="modal-modal-title">Statistics</DialogTitle>
      <DialogContent>
        <Typography variant="h5">Number of Images: {items.length}</Typography>
        <Typography variant="h5">Number of Objects: {nbObjects(items)}</Typography>
        <Typography variant="h5">Mean Age: {meanAge(items).toFixed(2)}</Typography>
        <Typography variant="h5">Gender Proportion:</Typography>
        <Box sx={{ height: "20em" }}>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
