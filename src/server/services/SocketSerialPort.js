import SerialPort from 'serialport'
import Server from '../Server'
import { emitter } from './emitter'
const ReadLine = SerialPort.parsers.Readline

const path = 'COM3'
const baudRate = 9600
const autoOpen = false

class SocketSerialPort {
  constructor() {
    this.port = new SerialPort(path, { baudRate, autoOpen })
    this.parser = this.port.pipe(new ReadLine())
    this.isOpen = false
    this.setEvents()
  }

  open() {
    const self = this
    self.isOpen = true
    try {
      self.port.open(err => {
        self.isOpen = false
        return self.emitOpen(err)
      })
    } catch (error) {
      self.isOpen = false
    }
    return this
  }

  emitOpen(err) {
    const self = this
    Server.io.emit('serialport', {
      open: !!self.isOpen,
      message: !err && !!self.isOpen ? 'is open' : err
    })
  }

  setEvents() {
    this.parser.on('data', line => emitter(line))
  }
}

export default new SocketSerialPort()
