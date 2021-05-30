require('dotenv').config()
// if you want to use nextRoutes
// const routes = require('@server/nextRoutes')

import express from 'express'
import next from 'next'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'

const { PORT = '3000', NODE_ENV } = process.env
const port = parseInt(PORT, 10) || 3000
const dev = NODE_ENV !== 'production'
let stateDataJson = require('./stateData.json')

console.log('Running env; ' + NODE_ENV)

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
// if you want to use nextRoutes
// const handle = routes.getRequestHandler(nextApp)

nextApp.prepare().then(() => {
  const server = express()

  //security
  server.use(
    helmet({
      contentSecurityPolicy: false,
    })
  )

  // Generate logs
  server.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  )
  server.use(compression())

  server.get('/api/state', function(req, res) {
    res.send(stateDataJson)
  })

  server.get('*', (req, res) => handle(req, res))
  // express().use(handler).listen(3000) //routes handle way
  //@ts-ignore
  server.listen(port, err => {
    if (err) throw err
  })
})
