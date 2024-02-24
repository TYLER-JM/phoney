import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config()

const app: Express = express()

const port = process.env.PORT || 8082
const host = process.env.HOST || 'localhost'

app.get('/', (req, res) => {
  res.send('One Great Server')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
