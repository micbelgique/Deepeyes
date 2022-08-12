import { forwardRef } from "react"
import Webcam from "react-webcam"

export default forwardRef<Webcam, any>((props, ref) => {
  return (
    <Webcam
      className="WebcamScreen"
      ref={ref}
      audio={false}
      screenshotFormat="image/jpeg"
      forceScreenshotSourceSize={true}
      videoConstraints={{
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: "environment",
      }}
    />
  )
})
