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

app.post('/auth/signup', (req: Request, res: Response) => {
  console.log('req: ', req)
  // LOGIC TO CREATE, STORE, THEN RETURN new user

  res.setHeader('Content-Type', 'application/json')
  res.json({username: 'Dave', email: 'dave@example.com', token: '123'})
})

app.post('/auth/login', async (req: Request, res: Response) => {
  const response: userDB.dbResponse = await userDB.login(req.body.email, req.body.password)
  
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

