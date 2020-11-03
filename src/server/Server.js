import express from 'express'
import Http from 'http'
import SocketIo from 'socket.io'
import cors from 'cors'
import os from 'os-utils'

import routes from './routes'

// const debounceEvent = (fn, wait = 1000, time) => (...args) =>
//   clearTimeout(time, (time = setTimeout(() => fn(...args), wait)))

class Server {
  constructor() {
    this.express = express()
    this.setMiddlewares()
    this.setRoutes()

    this.server = Http.createServer(this.express)
    this.io = new SocketIo(this.server)

    this.setSocketIoEvents()
    return this
  }

  setMiddlewares() {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
  }

  setRoutes() {
    this.express.use(routes)
  }

  setSocketIoEvents() {
    this.io.on('connect', socket => {
      socket.emit('connected', { message: `connected ${socket.id}` })
      setInterval(() => {
        os.cpuUsage(cpuPercent => {
          socket.emit('cpu', { name: 'cpu1', value: cpuPercent })
        })
      }, 300)
    })
  }
}

export default new Server()
