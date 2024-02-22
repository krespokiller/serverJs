import { singUp, logIn } from '../../services/auth/auth.js'

export const singUpController = async (req, res) => {
  try {
    await singUp(req.body.username, req.body.password)
    res.status(201).send('Usuario registrado correctamente')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al registrar el usuario')
  }
}

export const logInController = async (req, res) => {
  try {
    const token = await logIn(req.body.username, req.body.password)
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en la autenticación')
  }
}
