import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser } from '../users/users'
import prisma from '../../prisma/db'

export const singUp = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 64)
  await createUser({
    email,
    password: hashedPassword
  })
}

export const logIn = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (!user) {
    throw new Error('No se encontró el usuario')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Credenciales incorrectas')
  }
  return jwt.sign({ username: user.username }, 'secretKey')
}
