import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

const prisma = client.$extends({
  name: 'PrismaClientSoftDelete',
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

export default prisma
