import { expect, suite, test, vi } from 'vitest'
import prisma from '../../../libs/__mocks__/prisma'
import { shorterService } from '../../../services/shorter.services'

vi.mock('../../../libs/prisma')

vi.mock('nanoid', () => {
  return {
    nanoid: () => 'b05nOoQ'
  }
})

suite('shorterService', () => {
  test('should have a create method', () => {
    expect(shorterService).toHaveProperty('create')
  })

  test('shorterService.create should return a short url', async () => {
    const body = {
      url: 'https://www.google.com'
    }

    const mockUrl = {
      id: '1',
      longUrl: 'https://www.google.com',
      shortUrl: '1234567',
      visits: 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const expectedArgument = {
      data: {
        longUrl: body.url,
        shortUrl: 'b05nOoQ'
      }
    }

    prisma.dbUrls.create.mockResolvedValue(mockUrl)

    const result = await shorterService.create(body)
    expect(prisma.dbUrls.create).toHaveBeenCalled()
    expect(prisma.dbUrls.create).toHaveBeenCalledWith(expectedArgument)
    expect(result).toStrictEqual(mockUrl)
  })

  test('shorterService.create should return an error if the url given is not valid', async () => {
    const body = {
      url: 'lorem ipsum'
    }

    prisma.dbUrls.create.mockImplementation(() => {
      throw new Error('There was an error')
    })

    try {
      const result = await shorterService.create(body)
    } catch (err) {
      expect(err).toMatch(/error/)
    }
    expect(prisma.dbUrls.create).toHaveBeenCalled()
    expect(prisma.dbUrls.create).toHaveBeenCalledWith({
      data: {
        longUrl: body.url,
        shortUrl: 'b05nOoQ'
      }
    })
  })

  test('should have a getAll method', () => {
    expect(shorterService).toHaveProperty('getAll')
  })

  test('shorterService.getAll should return an array of shorts url', async () => {
    const mockUrls = [
      {
        id: '1',
        longUrl: 'https://www.google.com',
        shortUrl: '1234567',
        visits: 0,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        longUrl: 'https://www.google.com',
        shortUrl: '1234567',
        visits: 0,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    prisma.dbUrls.findMany.mockResolvedValue(mockUrls)

    const result = await shorterService.getAll()

    expect(prisma.dbUrls.findMany).toHaveBeenCalled()
    expect(result).toHaveLength(2)
    expect(result).toStrictEqual(mockUrls)
  })

  test('should have a getOne method', () => {
    expect(shorterService).toHaveProperty('getOne')
  })

  test('shorterService.getOne should return the short url who match the id', async () => {
    const mockUrl = {
      id: '1',
      longUrl: 'https://www.google.com',
      shortUrl: '1234567',
      visits: 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    prisma.dbUrls.findUniqueOrThrow.mockResolvedValue(mockUrl)

    const result = await shorterService.getOne('1')

    expect(prisma.dbUrls.findUniqueOrThrow).toHaveBeenCalled()
    expect(prisma.dbUrls.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    })
    expect(result).toStrictEqual(mockUrl)
  })

  test('shorterService.getOne should return an error when no id found', async () => {
    prisma.dbUrls.findUniqueOrThrow.mockImplementation(() => {
      throw new Error('There was an error')
    })
    try {
      await shorterService.getOne('1')
    } catch (err) {
      expect(err).toMatch(/error/)
    }

    expect(prisma.dbUrls.findUniqueOrThrow).toHaveBeenCalled()
    expect(prisma.dbUrls.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    })
  })

  test('should have a getByShortUrl method', () => {
    expect(shorterService).toHaveProperty('getByShortUrl')
  })

  test('shorterService.getByShortUrl should return the short url who match the shortUrl', async () => {
    const mockUrl = {
      id: '1',
      longUrl: 'https://www.google.com',
      shortUrl: '1234567',
      visits: 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const expectedArgument = {
      where: {
        shortUrl: '1234567'
      },
      data: {
        visits: {
          increment: 1
        }
      }
    }

    prisma.dbUrls.update.mockResolvedValue(mockUrl)

    const result = await shorterService.getByShortUrl('1234567')

    expect(prisma.dbUrls.update).toHaveBeenCalled()
    expect(prisma.dbUrls.update).toHaveBeenCalledWith(expectedArgument)
    expect(result).toStrictEqual(mockUrl)
  })

  test('shorterService.getByShortUrl should return an error if no short url found', async () => {
    prisma.dbUrls.update.mockImplementation(() => {
      throw new Error('There was an error')
    })

    try {
      const result = await shorterService.getByShortUrl('1234567')
      expect(result).toMatch(/error/)
    } catch (err) {
      expect(err).toMatch(/error/)
    }

    expect(prisma.dbUrls.update).toHaveBeenCalled()
    expect(prisma.dbUrls.update).toHaveBeenCalledWith({
      where: {
        shortUrl: '1234567'
      },
      data: {
        visits: {
          increment: 1
        }
      }
    })
  })

  test('should have a deleteOne method', () => {
    expect(shorterService).toHaveProperty('deleteOne')
  })

  test('shorterService.deleteOne should return the url with the date in the deletedAt field', async () => {
    const mockUrl = {
      id: '1',
      longUrl: 'https://www.google.com',
      shortUrl: '1234567',
      visits: 0,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    prisma.dbUrls.delete.mockResolvedValue(mockUrl)

    const result = await shorterService.deleteOne('1')

    expect(prisma.dbUrls.delete).toHaveBeenCalled()
    expect(prisma.dbUrls.delete).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    })
    expect(result).toStrictEqual(mockUrl)
  })

  test('shorterService.deleteOne should return an error if no url found', async () => {
    prisma.dbUrls.delete.mockImplementation(() => {
      throw new Error('There was an error')
    })

    try {
      await shorterService.deleteOne('125')
    } catch (err) {
      expect(err).toMatch(/error/)
    }

    expect(prisma.dbUrls.delete).toHaveBeenCalled()
    expect(prisma.dbUrls.delete).toHaveBeenCalledWith({
      where: {
        id: '125'
      }
    })
  })
})
