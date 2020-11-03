import { useState, useEffect, useCallback } from 'react'

export default function useWindowDimensions() {
  const isServer = !!(typeof window === 'undefined')

  function getBodyDimensions() {
    const b = document.body
    const html = document.documentElement
    const width = Math.max(
      b.scrollWidth,
      b.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    )

    const height = Math.max(
      b.scrollHeight,
      b.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    return { width, height }
  }

  const getWindowDimensions = useCallback(() => {
    if (isServer) return {}
    const { innerWidth: width, innerHeight: height } = window
    const bodyDimension = getBodyDimensions()
    return {
      width,
      height,
      bodyWidth: bodyDimension.width,
      bodyHeight: bodyDimension.height
    }
  }, [isServer])

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    if (!isServer) window.addEventListener('resize', handleResize)
    return () => !isServer && window.removeEventListener('resize', handleResize)
  }, [isServer, getWindowDimensions])

  return windowDimensions
}
