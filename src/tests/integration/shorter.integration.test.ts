import request from 'supertest'
import app from '../../libs/createServer'
import prisma from './helpers/prisma'
import { suite, expect, test, beforeAll } from 'vitest'

suite('Shorter', async () => {
  beforeAll(async () => {
    await prisma.dbUrls.deleteMany()
  })

  suite('[POST] /shorter', () => {
    test('Should respond with a `200` status code and a shortened URL', async () => {
      const mockUrl = 'https://www.google.com'
      const result = await request(app).post('/shorter').send({
        url: mockUrl
      })

      const newUrl = await prisma.dbUrls.findFirst()

      expect(result.status).toBe(201)
      expect(newUrl).not.toBeNull()
      expect(result.body).toStrictEqual({
        status: 201,
        statusMsg: 'Created',
        data: {
          ...newUrl,
          createdAt: newUrl?.createdAt.toISOString(),
          updatedAt: newUrl?.updatedAt.toISOString()
        }
      })
    })
  })

  suite('[GET] /:shortUrl', async () => {
    test('Should respond with a `200` status code and redirect to the original URL', async () => {
      const mockUrl = 'https://www.google.com'
      const result = await request(app).post('/shorter').send({
        url: mockUrl
      })

      const newUrl = await prisma.dbUrls.findFirst()

      const redirect = await request(app).get(`/${newUrl?.shortUrl}`)

      expect(redirect.status).toBe(302)
      expect(redirect.header.location).toBe(mockUrl)
    })
  })
})
