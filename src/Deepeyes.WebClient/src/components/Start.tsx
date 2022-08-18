import CameraIcon from "@mui/icons-material/CameraAlt"
import ShopIcon from "@mui/icons-material/ShoppingCart"
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"

export default function App() {
  return (
    <Grid
      container
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      spacing={4}
    >
      <Grid item>
        <Card sx={{ maxWidth: "18rem" }}>
          <CardActionArea href="/shop">
            <ShopIcon sx={{ height: "16rem", width: "16rem" }} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Shop
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ maxWidth: "18rem" }}>
          <CardActionArea href="/scanner">
            <CameraIcon sx={{ height: "16rem", width: "16rem" }} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Scanner
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}
