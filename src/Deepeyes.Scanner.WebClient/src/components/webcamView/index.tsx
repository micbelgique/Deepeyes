import { forwardRef } from "react"
import Webcam from "react-webcam"
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

export default forwardRef<Webcam, any>((props, ref) => {


  return (
    
      <div className="Container">      
      <div className="IndexInterface">
      <h1>Deep Eyes Project</h1>
      </div>
     
      
      <Webcam className="WebcamScreen"
        ref={ref}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: { ideal: 500 },
          height: { ideal: 500 },
          facingMode: "environment",
        }}
      />
    </div>
    
  
  )
})
