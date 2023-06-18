import { FastifyInstance } from 'fastify'

import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async (request) => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    return users.map((user) => ({
      id: user.id,
      username: user.username,
    }))
  })
}
