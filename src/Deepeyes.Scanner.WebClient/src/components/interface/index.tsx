import { Grid, Typography } from "@mui/material"
import Info from "../info"

export default function Interface() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h1">Deep Eyes</Typography>
      </Grid>
      <Grid item>
        <Info />
      </Grid>
    </Grid>
  )
}
