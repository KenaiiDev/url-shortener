import { nanoid } from 'nanoid'

import prisma from '@/libs/prisma'
import type { BodyUrlType } from '@/types/urls'

export const shorterService = {
  create: async (body: BodyUrlType) => {
    const nanoidLength = Number(process.env.NANOID_LENGTH)
    const urlId = nanoid(!isNaN(nanoidLength) ? nanoidLength : 7)
    return await prisma.dbUrls.create({
      data: {
        longUrl: body.url,
        shortUrl: urlId
      }
    })
  },
  getAll: async () => {
    return await prisma.dbUrls.findMany()
  },
  getOne: async (id: string) => {
    return await prisma.dbUrls.findUniqueOrThrow({
      where: {
        id
      }
    })
  },
  getByShortUrl: async (shortUrl: string) => {
    return await prisma.dbUrls.update({
      where: {
        shortUrl
      },
      data: {
        visits: {
          increment: 1
        }
      }
    })
  },
  deleteOne: async (id: string) => {
    return await prisma.dbUrls.delete({
      where: {
        id
      }
    })
  }
}
