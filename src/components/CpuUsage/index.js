import React, { useState, useCallback, useEffect } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { LineChart, Line } from 'recharts'
import styled from 'styled-components'
import useIsMounted from '../useIsMounted'
import useSocketIo from '../useSocketIo'
// import useIsServer from '../useIsServer'

const Div = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  z-index: 90;
`

export default function CpuUsage() {
  const isMounted = useIsMounted()
  const [data, setData] = useState([{ name: 'cpu1', value: 1, time: 0 }])
  const socket = useSocketIo()
  // const isServer = useIsServer()
  const [w, setW] = useState(400)

  const updateCpu = useCallback(
    cpuPercent => {
      if (isMounted.current) {
        setData(currentData => {
          const lastData = currentData[currentData.length - 1]
          const cpu = { ...cpuPercent, time: lastData.time + 1 }

          if (currentData.length > 10) {
            const newdata = [...currentData, cpu]
            newdata.shift()
            return newdata
          } else {
            return [...currentData, cpu]
          }
        })
      }
    },
    [isMounted]
  )

  function onResize(width) {
    if (w !== width && isMounted.current) setW(width)
  }

  useEffect(() => {
    if (socket) {
      socket.on('cpu', cpuPercent => updateCpu(cpuPercent || 0))
    }
  }, [socket, updateCpu])

  return (
    <Div>
      <ReactResizeDetector
        refreshMode="debounce"
        refreshRate={600}
        handleWidth
        onResize={onResize}
      />
      <LineChart id="cpu" width={w || 500} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#000"
          strokeWidth={1}
          dot={false}
          yAxisId="valuefor"
        />
      </LineChart>
    </Div>
  )
}
