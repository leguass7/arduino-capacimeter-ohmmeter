import React, { useEffect } from 'react'

export default function useIsMounted() {
  const isMounted = React.useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
  return isMounted
}
