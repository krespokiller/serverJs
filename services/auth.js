import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from './index.js'

export const singUp = async (email, password) => {
  
  const salt = bcrypt.genSaltSync(10);
  // Store hash in your password DB.
  const hashedPassword = bcrypt.hashSync(password, salt);
  //verify if user exists
  const userexistance = await findUserByEmail(email)

  if(userexistance){
    throw new Error("User already exists")
  }
  const user = await createUser(
    email,
    hashedPassword
  )

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

  const isPasswordValid = await bcrypt.compareSync(password, user.hashedPassword)

  if (!isPasswordValid) {
    throw new Error('Credenciales incorrectas')
  }

  return {
    token:jwt.sign({ email: user.email }, process.env.SECRET_KEY,{ expiresIn: '7d' }),
    ...user
  }
}
