import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { SERVER } from '../src/configs/config'
import cors from 'cors'
import { router } from '../src/routes/router'
import errorHandler from '../src/middlewares/error.middleware'
import { connectToDatabase, loadModels } from '../src/helpers/db.helper'
import bodyParser from 'body-parser'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

// Error handler
app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

loadModels()

connectToDatabase().then(async () => {
  const port = SERVER.PORT
  app.listen(port, async () => {
    console.info(`Listening on ${port}`)
  })
})
