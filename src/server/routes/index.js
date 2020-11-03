import { Router } from 'express'
import SocketSerialPort from '../services/SocketSerialPort'

const routes = new Router()

routes.all('/api', (req, res, next) => {
  return res
    .status(200)
    .send({
      success: true,
      message: 'routed by express'
    })
    .end()
})

routes.get('/api/open', (req, res, next) => {
  if (!SocketSerialPort.isOpen) SocketSerialPort.open()

  return res
    .status(200)
    .send({
      success: true,
      serialport: {
        isOpen: SocketSerialPort.isOpen
      }
    })
    .end()
})

export default routes
