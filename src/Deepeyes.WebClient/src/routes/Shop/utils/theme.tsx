import { createTheme } from "@mui/material/styles"
import { TypographyStyleOptions } from "@mui/material/styles/createTypography"
import React from "react"

import { LinkProps } from "@mui/material/Link"
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom"

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

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
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})

export default theme
