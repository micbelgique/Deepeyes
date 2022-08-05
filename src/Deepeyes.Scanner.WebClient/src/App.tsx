import { useCallback, useRef } from "react"
import Webcam from "react-webcam"
import "./App.css"
import CaptureButton from "./components/captureButton"

import WebCamView from "./components/webcamView"
import { uploadImage } from "./services/blobStorage"

function App() {
  const webcamRef = useRef<Webcam>(null)

  const sendImage = useCallback(async (imageB64: string) => {
    try {
      const res = await fetch(imageB64)
      const image = await res.blob()
      await uploadImage(image)
      console.log("Image uploaded")
    } catch (error) {
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

  return (
    <div className="App">
      <WebCamView ref={webcamRef}/>
        <div className="ButtonCam">
          <CaptureButton onClick={handleCapture} />
        </div>
    </div>
    
  )
}

export default App
