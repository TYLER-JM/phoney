import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

import dataRoutes from './routes/dataRoutes';

dotenv.config()

const app: Express = express()

const port = process.env.PORT || 8082

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(`<a href="/data">get data</a>`)
})
app.use('/data', dataRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
