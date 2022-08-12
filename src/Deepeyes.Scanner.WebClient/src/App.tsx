import { Alert, AlertColor, Snackbar, Stack } from "@mui/material"
import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam"
import "./App.css"
import CaptureButton from "./components/captureButton"
import Footer from "./components/footer"
import UploadButton from "./components/uploadButton"

import WebCamView from "./components/webcamView"
import { uploadImage } from "./services/blobStorage"

const MAX_FILES = 10

function App() {
  const webcamRef = useRef<Webcam>(null)
  const [open, setOpen] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success")

  const sendImage = useCallback(async (imageB64: string) => {
    try {
      const res = await fetch(imageB64)
      const image = await res.blob()
      await uploadImage(image)
      setSnackbarText("Image uploaded")
      setSnackbarSeverity("success")
      setOpen(true)
    } catch (error) {
      setSnackbarText("Error uploading image")
      setSnackbarSeverity("error")
      setOpen(true)
      console.error(error)
    }
  }, [])

  const handleCapture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        await sendImage(imageSrc)
      }
    }
  }, [])

  const handleSubmitFiles = useCallback(async (files: FileList) => {
    try {
      for (let i = 0; i < Math.min(files.length, MAX_FILES); i++) {
        const file = files.item(i)
        if (file) {
          await uploadImage(file)
        }
      }
      setSnackbarText("Images uploaded")
      setSnackbarSeverity("success")
      setOpen(true)
    } catch (error) {
      setSnackbarText("Error uploading images")
      setSnackbarSeverity("error")
      setOpen(true)
    }
  }, [])

  return (
    <div className="App">
      <div className="content Container">
        <div className="IndexInterface">
          <h1 style={{ margin: "0.2em 0" }}>Deep Eyes Project</h1>
        </div>
        <WebCamView ref={webcamRef} />
        <div className="ButtonCam">
          <Stack direction="row" spacing={2}>
            <UploadButton onSubmit={handleSubmitFiles} />
            <CaptureButton onClick={handleCapture} />
          </Stack>
        </div>
        <Footer />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
