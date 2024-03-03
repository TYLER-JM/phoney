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

export function login(email: string, password: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = findUserByEmail(email)
      if (!user) {
        resolve({ error: 'User not found' }) 
      } else if (user.password !== password) {
        resolve({ error: 'Incorrect password' }) 
      }
      resolve({ user: new AuthenticatedUser(user.username, user.email) })
    }, 2000)
  })
}

function findUserByEmail(email: string): User {
  const user = db[email]
  return user
}

function createUser(user: User) {
  db[user.email] = user
}