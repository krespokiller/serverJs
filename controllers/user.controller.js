import { 
  createUser, 
  findUserByEmail, 
  updateUserByEmail, 
  deleteUserByEmail 
} from '../services/index.js'

import { isAdmin } from '../middleware/auth.js'

export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body.email, req.body.password)
    res.status(201).send({
      ...user,
      message: 'Usuario registrado correctamente'
    })
  } catch (error) {
    res.status(500).send('Error al registrar el usuario')
  }
  
}

export const findUserByEmailController = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email)
    res.status(200).send({
      ...user,
      message: 'Usuario encontrado correctamente'
    })
  } catch (error) {
    res.status(500).send('Error al encontrar el usuario')
  }
  
}

export const updateUserByEmailController = async (req, res) => {
  try {
    const user = await updateUserByEmail(req.body.email, req.body.data)
    res.status(200).send({
      ...user,
      message: 'Usuario actualizado correctamente'
    })
  } catch (error) {
    res.status(500).send('Error al actualizar el usuario')
  }
  
}

export const deleteUserByEmailController = async (req, res) => {
  try {
    if (isAdmin(req.user)) {
      const user = await deleteUserByEmail(req.body.email)
      res.status(200).send({
        ...user,
        message: 'Usuario borrado correctamente'
      })
    }else{
      res.status(400).send("Error you need to be an admin to do that");
    }
  } catch (error) {
    res.status(500).send('Error al borrar el usuario')
  }
  
}