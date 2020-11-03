import { useState, useEffect } from 'react'

export default function useIsMounted() {
  const [isServer, setIsServer] = useState(true)

  useEffect(() => {
    setIsServer(!!(typeof window === 'undefined'))
  }, [])
  return isServer
}
