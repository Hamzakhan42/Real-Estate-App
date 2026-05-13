import { useEffect, useRef } from 'react'

export default function useAutoPlay(intervalMs, callback, isPaused) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (isPaused) return
    if (!intervalMs) return

    const id = setInterval(() => {
      savedCallback.current?.()
    }, intervalMs)

    return () => clearInterval(id)
  }, [intervalMs, isPaused])
}
