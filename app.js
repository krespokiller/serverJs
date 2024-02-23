import express from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerSpec from './swaggerConfig.js' 

// Rutas
import { 
    userRouter, 
    authRouter 
} from './routes/index.js'

export const app = express()

// Middlewares
app.use(express.json())

//Routes
app.use('/user', userRouter)
app.use('/auth', authRouter)
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))