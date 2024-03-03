import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';

// import dataRoutes from './routes/dataRoutes';
import * as userDB from './db/users';

dotenv.config()


const app: Express = express()

const port = process.env.PORT || 8081

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(`<a href="/data">get data</a>`)
})

app.post('/auth/signup', async (req: Request, res: Response) => {
  const options = req.query as {delay: string}
  const delay = parseInt(options.delay)
  const response: userDB.dbResponse = await userDB.signup(
    {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username || 'Anon123'
    },
    delay || 0
  )  
  if (response.user) {
    res.setHeader('Content-Type', 'application/json')
    res.json(response.user)
    return
  }

  if (response.error)  {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).json({message: response.error})
  }

})

app.post('/auth/login', async (req: Request, res: Response) => {
  const options = req.query as {delay: string}
  const delay = parseInt(options.delay)
  const response: userDB.dbResponse = await userDB.login(
    req.body.email,
    req.body.password,
    delay || 0
  )
  if(response.user) {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(response.user)
    return
  }

  if (response.error) {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).json({message: response.error})
  }

})

////// data routes
//  app.use('/data', dataRoutes)



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

