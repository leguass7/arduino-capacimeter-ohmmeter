import next from 'next'
import Server from './Server'
import SocketSerialPort from './services/SocketSerialPort'

const dev = process.env.NODE_ENV !== 'production'
const port = 3030

const appNext = next({ dev })
const nextHandler = appNext.getRequestHandler()

appNext.prepare().then(() => {
  Server.express.all('*', (req, res) => nextHandler(req, res))
  Server.server.listen(port, err => {
    if (err) throw err
    console.log(`\n> Ready on http://localhost:${port}`)
    SocketSerialPort.open()
  })
})
