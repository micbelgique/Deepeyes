import { forwardRef } from "react"
import Webcam from "react-webcam"

export default forwardRef<Webcam, any>((props, ref) => {
  return (
    <div>
      <Webcam
        ref={ref}
        audio={false}
        // height={"100%"}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "environment",
        }}
      />
    </div>
  )
})
