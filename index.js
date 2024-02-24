import prisma from './prisma/db.js'
import { app } from './app.js'
const PORT = process.env.PORT || 3000

// Iniciar el servidor
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en "http://localhost:${PORT}/api-docs"`)
  try {
    await prisma.$connect()
    console.log('Conexión a la base de datos establecida')
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
    process.exit(1)
  }
})

export default app // Exporta app para las pruebas
