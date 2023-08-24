import { useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Nav.module.css";

function Nav() {
  const location = useLocation();

  return (
    <nav className={classes.navMenu}>
      <Stack component="ul" direction="row" spacing={4} className={classes.navLink} sx={{ pl: 0 }}>
        <Typography variant="h5" component="li" className={location.pathname === "/" ? classes.active : ""}>
          <Link to="/">Home</Link>
        </Typography>
        <Typography variant="h5" component="li" className={location.pathname === "/scanner" ? classes.active : ""}>
          <Link to="/scanner">Scan</Link>
        </Typography>
        <Typography variant="h5" component="li" className={location.pathname === "/generation" ? classes.active : ""}>
          <Link to="/generation">Generate</Link>
        </Typography>
      </Stack>
    </nav>
  );
}

export default Nav;
