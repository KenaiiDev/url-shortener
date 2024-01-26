import type { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
  mockReset(prisma)
})

const client = mockDeep<PrismaClient>()
const clientExtended = client.$extends({
  name: 'MockedPrismaClientSoftDelete',
  query: {
    $allModels: {
      async create({ args, query }) {
        const data = {
          ...args.data,
          deletedAt: null
        }
        args.data = data
        return query({ ...args })
      },
      // add filter to all queries to exclude items when deletedAt is not null
      async findMany({ args, query }) {
        args.where = {
          ...args.where,
          deletedAt: null
        }
        return query(args)
      },

      async findUnique({ args, query }) {
        args.where = {
          ...args.where,
          deletedAt: null
        }
        return query(args)
      },

      async findUniqueOrThrow({ args, query }) {
        args.where = {
          ...args.where,
          deletedAt: null
        }
        return query(args)
      },

      async findFirst({ args, query }) {
        args.where = {
          ...args.where,
          deletedAt: null
        }
        return query(args)
      },

      // modify delete to soft delete
      async delete({ args }) {
        const data = {
          deletedAt: new Date()
        }

        return client.dbUrls.update({
          ...args,
          data
        })
      }
    }
  }
})
const prisma = mockDeep<typeof clientExtended>()

export default prisma
