import { createTheme } from "@mui/material/styles"
import { TypographyStyleOptions } from "@mui/material/styles/createTypography"

const headingTheme: TypographyStyleOptions = {
  fontFamily: "Bebas Neue",
  color: "#9d9797",
  textTransform: "uppercase",
}

const theme = createTheme({
  typography: {
    h1: headingTheme,
    h2: headingTheme,
    h3: headingTheme,
    h4: headingTheme,
    h5: headingTheme,
    h6: headingTheme,
  },
})

export default theme
