import React, { useEffect, useState, useCallback, memo } from 'react'

import { Display, DisplayContainer, DisplayBack, CardContainer } from '../../styles/cards'

import useIsMounted from '../useIsMounted'
import useSocketIo from '../useSocketIo'

export function replaceAll(str, needle, replacement) {
  if (!str) return ''
  if (Array.isArray(needle)) {
    let rtn = `${str}`
    for (let i = 0; i < needle.length; i++) {
      rtn = replaceAll(rtn, needle[i], replacement)
    }
    return rtn
  }
  return str.split(needle).join(replacement)
}

function styleBack(value) {
  return replaceAll(value, '0123456789'.split(''), '8') || '8'
}

function Voltmeter() {
  const isMounted = useIsMounted()
  const [voltage, setVoltage] = useState('--')
  const socket = useSocketIo()

  const updateVoltage = useCallback(
    serialData => {
      if (isMounted.current) {
        const { voltage: v } = serialData
        setVoltage(v ? v.toFixed(3) || 0 : 0)
      }
    },
    [isMounted]
  )

  useEffect(() => {
    if (socket) {
      socket.on('serial-data', serialData => updateVoltage(serialData))
    }
  }, [socket, updateVoltage])

  return (
    <CardContainer>
      <p>{'Ohm\u00edmetro'}</p>
      <DisplayContainer>
        <DisplayBack>{styleBack(voltage)}</DisplayBack>
        <Display>{voltage}</Display>
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 4,
            fontSize: 14,
            textAlign: 'left',
            fontFamily: 'Roboto',
            color: 'rgba(31, 153, 253, 0.7)'
          }}
        >
          volts
        </div>
      </DisplayContainer>
      <hr />
      <DisplayContainer>
        <Display>{'--'}</Display>
      </DisplayContainer>
    </CardContainer>
  )
}

export default memo(Voltmeter)
