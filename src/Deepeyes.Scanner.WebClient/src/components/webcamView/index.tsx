import { forwardRef } from "react"
import { useState, useEffect } from "react";
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

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
