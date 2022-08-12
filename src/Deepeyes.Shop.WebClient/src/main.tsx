import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import theme from "./utils/theme"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
