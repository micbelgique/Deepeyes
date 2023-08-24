import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material"
import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./index.css"


import theme from "./routes/Shop/utils/theme"
import Generation from "./routes/Generation"
import Nav from "./routes/Shop/components/Nav"
import Home from "./routes/Shop/Home"
import Scanner from "./routes/Scanner"
import Footer from "./routes/Shop/components/Footer"




// const Scanner = lazy(() => import("./routes/Scanner"))
// const Home = lazy(() => import("./routes/Shop/Home"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/scanner"
            element={
              <Suspense fallback={<LinearProgress variant="indeterminate" />}>
                <Scanner />
              </Suspense>
            }
          />
          <Route
            path="/generation"
            element={
              <Suspense fallback={<LinearProgress variant="indeterminate" />}>
                <Generation />
              </Suspense>
            }
          />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
