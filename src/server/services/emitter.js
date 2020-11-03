import Server from '../Server'

export function trySerialJson(serialData = '') {
  try {
    const data = JSON.parse(serialData)
    return typeof data === 'object' ? data : false
  } catch (error) {
    return false
  }
}

export function emitter(serialData) {
  const data = trySerialJson(serialData)
  if (data) {
    return Server.io.emit('serial-data', data)
  }
  return Server.io.emit('serialport-line', serialData)
}
