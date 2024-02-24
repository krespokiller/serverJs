import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swaggerConfig.js' 
import cors from 'cors'
// Rutas
import { 
    userRouter, 
    authRouter,
    productRouter
} from './routes/index.js'

export const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
//Routes
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/product', productRouter)
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))