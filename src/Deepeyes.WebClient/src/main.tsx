import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material"
import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Start from "./components/Start"
import "./index.css"
import Contact from "./routes/Contact"

import theme from "./routes/Shop/utils/theme"
import Generation from "./routes/Generation"

const Shop = lazy(() => import("./routes/Shop"))
const Scanner = lazy(() => import("./routes/Scanner"))
const Home = lazy(() => import("./routes/Shop/Home"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Shop />}>
            <Route index element={<Start />} />
            <Route
              path="/shop"
              element={
                <Suspense fallback={<LinearProgress variant="indeterminate" />}>
                  <Home />
                </Suspense>
              }
            />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Route>
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
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
