import { Grid } from "@mui/material"
import Info from "../info"

export default function Interface() {
  return (
    <Grid container direction="column">
      <Grid item>
        <h1>Deep Eyes</h1>
      </Grid>
      <Grid item>
        <button>Scan</button>
      </Grid>
      <Grid item>
        <Info />
      </Grid>
    </Grid>
  )
}
