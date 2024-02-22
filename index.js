import prisma from './prisma/db.js'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swaggerConfig.js' // Permite a Express interpretar JSON en las solicitudes

// Rutas
// import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.json())
// app.use('/auth', authRoutes)

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Iniciar el servidor
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
  try {
    await prisma.$connect()
    console.log('Conexión a la base de datos establecida')
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
    process.exit(1)
  }
})

export default app // Exporta app para las pruebas
