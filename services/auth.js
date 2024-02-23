import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from './index.js'

export const singUp = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 64)
  const user = await createUser({
    email,
    password: hashedPassword
  })
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY,{ expiresIn: '7d' })
  return {
    ...user,
    token
  }
}

export const logIn = async (email, password) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new Error('No se encontró el usuario')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Credenciales incorrectas')
  }
  return jwt.sign({ email: user.email }, process.env.SECRET_KEY,{ expiresIn: '7d' })
}
