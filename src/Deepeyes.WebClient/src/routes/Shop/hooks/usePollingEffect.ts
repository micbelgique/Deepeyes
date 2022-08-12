import { useCallback, useEffect, useRef, useState } from "react"

interface usePollingEffectOptions {
  interval?: number
  onCleanUp?: Function
}

export default function usePollingEffect(
  asyncCallback: Function,
  dependencies = [],
  {
    interval = 10_000, // 10 seconds
    onCleanUp = () => {},
  }: usePollingEffectOptions = {}
) {
  const timeoutIdRef = useRef<number | null>(null)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    let _stopped = false
    // Side note: preceding semicolon needed for IIFEs.
    ;(async function pollingCallback() {
      try {
        if (!pause) {
          await asyncCallback()
        }
      } finally {
        // Set timeout after it finished, unless stopped
        timeoutIdRef.current = !_stopped && window.setTimeout(pollingCallback, interval)
      }
    })()
    // Clean up if dependencies change
    return () => {
      _stopped = true // prevent racing conditions
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
      onCleanUp()
    }
  }, [...dependencies, interval, pause])

  // function to stop polling
  const stopPolling = useCallback(() => {
    setPause(true)
  }, [])

  // function to restrat polling
  const startPolling = useCallback(() => {
    setPause(false)
  }, [])

  return { stopPolling, startPolling }
}
