import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/auth'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, { secret: `${process.env.JWT_SECRET}` })

app.register(authRoutes)
app.register(usersRoutes)

app
  .listen({
    port: parseInt(`${process.env.API_PORT}`),
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`API running on port ${process.env.API_PORT}`)
  })
