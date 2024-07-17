import express from 'express'
import cors from 'cors'

import infoRouter from './src/routes/restaurant.routes.js'
import userRouter from './src/routes/user.routes.js'
import authRouter from './src/routes/auth.routes.js'

import { db } from './src/config/db.config.js'

import dotenv from 'dotenv'
//import { corsOption } from './src/middlewares/cors.middleware.js'

dotenv.config()

const app = express()


//middleswares parse Json  siempre van si o si y siempre primero este//
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleware CORS
app.use(cors())


//middlewares para rutas //
app.use('/api/v1', authRouter);
app.use('/api/v1', infoRouter);
app.use('/api/v1', userRouter);





db()

app.listen(process.env.PORT, ()=>{
    console.log(`servidor levantado en el puerto: ${process.env.PORT}`)
})