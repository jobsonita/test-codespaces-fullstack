import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = bodySchema.parse(request.body)

    let user = await prisma.user.findUnique({ where: { username } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          username,
          password, // TODO: hash password
        },
      })
    }

    const token = app.jwt.sign(
      {
        username: user.username,
      },
      {
        sub: user.id,
        expiresIn: '30d',
      },
    )

    return {
      token,
    }
  })
}
