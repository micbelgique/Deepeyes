import { Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import classes from "./Nav.module.css"

function Nav() {
  return (
    <nav className={classes.navMenu}>
      <Stack component="ul" direction="row" spacing={4} className={classes.navLink} sx={{ pl: 0 }}>
        <Typography variant="h5" component="li">
          <Link to="/">Home</Link>
        </Typography>
        <Typography variant="h5" component="li">
          <Link to="/contact">Contact</Link>
        </Typography>
      </Stack>
    </nav>
  )
}
export default Nav
