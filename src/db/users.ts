import fs from 'node:fs/promises'

export interface dbResponse {
  user?: User
  error?: string
}

export interface User {
  email: string,
  username: string,
  password: string
}

export class AuthenticatedUser {
  constructor(
    readonly username: string,
    readonly email: string
  ) {}

  public token = Math.random().toString()
}

interface UserDB {
  [index: string]: User
}

const db: UserDB = {
  'x@x.x': {email: 'x@x.x', username: 'Dave', password: 'goats'},
  'y@y.y': {email: 'y@y.y', username: 'Graham', password: 'boats'},
}

export function login(email: string, password: string, delay: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = findUserByEmail(email)
      if (!user) {
        resolve({ error: 'User not found' }) 
        return 
      } else if (user.password !== password) {
        resolve({ error: 'Incorrect password' }) 
        return
      }
      resolve({ user: new AuthenticatedUser(user.username, user.email) })
    }, delay)
  })
}

export function signup(user: User, delay: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      const existingUser = findUserByEmail(user.email)
      if (existingUser) {
        resolve({error: 'User already exists'}) 
      } else {
        const newUser = createUser(user)
        writeDbToFile().then(() => {
          resolve({user: newUser})
        })
      }
    }, delay)
  })
}

function findUserByEmail(email: string): User {
  const user = db[email]
  return user
}

function createUser(user: User) {
  db[user.email] = user
  return new AuthenticatedUser(user.username, user.email)
}

function writeDbToFile() {
  return fs.writeFile('data/users.json', JSON.stringify(db))
}