import "./App.css"
import CaptureButton from "./components/captureButton"
import Interface from "./components/interface"
import WebCam from "./components/webcam"
function App() {
  return (
    <div
      className="App"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#EEEEEE" }}
    >
      <WebCam />
      <div
        style={{
          position: "fixed",
          left: "60%",
          top: 0,
          // transform: "translateX(-10%)",
          zIndex: 100,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Interface />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        <CaptureButton />
      </div>
    </div>
  )
}

export default App
