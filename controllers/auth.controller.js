import { singUp, logIn } from '../services/index.js'

export const singUpController = async (req, res) => {
  try {
    const user = await singUp(req.body.email, req.body.password)
    res.status(200).send({...user,message:'Usuario registrado correctamente'})
  } catch (error) {
    res.status(500).send('Error al registrar el usuario')
  }
}

export const logInController = async (req, res) => {
  try {
    const token = await logIn(req.body.email, req.body.password)
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).send('Error en la autenticación')
  }
}
