import { useEffect, useCallback, useState } from 'react'

import useSocketIo from '../components/useSocketIo'
import useIsMounted from '../components/useIsMounted'

import { ListCards, ItemCard } from '../styles/cards'

import Voltimeter from '../components/Voltmeter'
import CpuUsage from '../components/CpuUsage'

export default function Home() {
  const isMounted = useIsMounted()
  const socket = useSocketIo('http://localhost:3030')
  const [, setLine] = useState('')

  const readedLine = useCallback(
    payload => {
      const { message } = payload
      if (isMounted.current) {
        setLine(message)
      }
    },
    [isMounted]
  )

  useEffect(() => {
    function handleEvent(payload) {
      console.log(payload)
      // HelloWorld
    }
    if (socket) {
      socket.on('connected', handleEvent)
      socket.on('serialport-line', readedLine)
    }
  }, [socket, readedLine])

  return (
    <>
      <CpuUsage />
      <ListCards>
        <ItemCard>
          <Voltimeter />
        </ItemCard>
        <ItemCard>
          <Voltimeter />
        </ItemCard>
      </ListCards>
    </>
  )
}
