import { expect, suite, test, vi, beforeEach } from 'vitest'
import { shorterService } from '../../../services/__mocks__/shorter.services'
import { httpResponse } from '../../../helpers/__mocks__/httpStatus'
import {
  shortUrl,
  getAllUrl,
  getUrlById,
  getUrlByShortId,
  deleteUrlById
} from '../../../controllers/shorter.controller'

import type { Request, Response, NextFunction } from 'express'
import type { BodyUrlType, IdUrlType, ShortUrlType } from '../../../types/urls'

vi.mock('../../../services/shorter.services')
vi.mock('../../../helpers/httpStatus')

suite('Shorter controller', () => {
  suite('shortUrl', () => {
    test('should return a short url', async () => {
      const req = {
        body: {
          url: 'https://www.google.com'
        }
      } as Request<unknown, unknown, BodyUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 201,
        statusMsg: 'Created',
        data: {
          id: '65b10bb0b57984db9b6aaed7',
          longUrl: 'https://www.google.com',
          shortUrl: 'w-r61u2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          visits: 0
        }
      }

      shorterService.create.mockResolvedValue(mockResponse.data)
      httpResponse.CREATED.mockReturnValue(mockResponse)

      const result = await shortUrl(req, res as any, next)

      expect(shorterService.create).toHaveBeenCalled()
      expect(httpResponse.CREATED).toHaveBeenCalled()

      expect(shorterService.create).toHaveBeenCalledWith(req.body)
      expect(httpResponse.CREATED).toHaveBeenCalledWith(res, mockResponse.data)

      expect(result).toStrictEqual(mockResponse)
    })

    test('should return an error if the url is not valid', async () => {
      const req = {
        body: {
          url: 'laegakfl'
        }
      } as Request<unknown, unknown, BodyUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockError = new Error('Invalid url')
      const mockResponse = {
        status: 422,
        statusMsg: 'Unprocessable Entity',
        message: 'Error on data validation',
        error: mockError
      }

      shorterService.create.mockRejectedValue(mockError)

      const result = await shortUrl(req, res, next)

      expect(shorterService.create).toHaveBeenCalled()
      expect(shorterService.create).toHaveBeenCalledWith(req.body)
      expect(next).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(mockError)
    })
  })

  suite('getAllUrl', () => {
    test('should return an array of urls', async () => {
      const req = {} as Request
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 200,
        statusMsg: 'OK',
        data: [
          {
            id: '65b10bb0b57984db9b6aaed7',
            longUrl: 'https://www.google.com',
            shortUrl: 'w-r61u2',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            visits: 0
          },
          {
            id: '65b10bb0b57984db9b6aaed7',
            longUrl: 'https://www.google.com',
            shortUrl: 'w-r61u2',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            visits: 0
          }
        ]
      }

      shorterService.getAll.mockResolvedValue(mockResponse.data)
      httpResponse.OK.mockReturnValue(mockResponse)

      const result = await getAllUrl(req, res, next)

      expect(shorterService.getAll).toHaveBeenCalled()
      expect(httpResponse.OK).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })

    test('should return an empty array if there are no urls', async () => {
      const req = {} as Request
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 200,
        statusMsg: 'OK',
        data: []
      }

      shorterService.getAll.mockResolvedValue(mockResponse.data)
      httpResponse.OK.mockReturnValue(mockResponse)

      const result = await getAllUrl(req, res, next)

      expect(shorterService.getAll).toHaveBeenCalled()
      expect(httpResponse.OK).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })
  })

  suite('getUrlById', () => {
    test('Should return a url', async () => {
      const req = {
        params: {
          id: '65b10bb0b57984db9b6aaed7'
        }
      } as Request<IdUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 200,
        statusMsg: 'OK',
        data: {
          id: '65b10bb0b57984db9b6aaed7',
          longUrl: 'https://www.google.com',
          shortUrl: 'w-r61u2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          visits: 0
        }
      }

      shorterService.getOne.mockResolvedValue(mockResponse.data)
      httpResponse.OK.mockReturnValue(mockResponse)

      const result = await getUrlById(req, res, next)

      expect(shorterService.getOne).toHaveBeenCalled()
      expect(httpResponse.OK).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })

    test('Should return an error if the url does not exist', async () => {
      const req = {
        params: {
          id: '65b10bb0b57984db9b6aaed7'
        }
      } as Request<IdUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 404,
        statusMsg: 'Not Found',
        message: 'Url not found'
      }

      shorterService.getOne.mockResolvedValue(null)
      httpResponse.NOT_FOUND.mockReturnValue(mockResponse)

      const result = await getUrlById(req, res, next)

      expect(shorterService.getOne).toHaveBeenCalled()
      expect(httpResponse.NOT_FOUND).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })
  })

  suite('getUrlByShortId', () => {
    test('Should redirect to the long url', async () => {
      const req = {
        params: {
          shortUrl: 'w-r61u2'
        }
      } as Request<ShortUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn(),
        redirect: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        id: '65b10bb0b57984db9b6aaed7',
        longUrl: 'https://www.google.com',
        shortUrl: 'w-r61u2',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        visits: 0
      }

      shorterService.getByShortUrl.mockResolvedValue(mockResponse)
      httpResponse.OK_REDIRECT.mockReturnValue(undefined)

      const result = await getUrlByShortId(req, res, next)

      expect(shorterService.getByShortUrl).toHaveBeenCalled()
      expect(httpResponse.OK_REDIRECT).toHaveBeenCalled()
      expect(result).toStrictEqual(undefined)
    })

    test('Should return an error if the url does not exist', async () => {
      const req = {
        params: {
          shortUrl: 'w-r61u2'
        }
      } as Request<ShortUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn(),
        redirect: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 404,
        statusMsg: 'Not Found',
        message: 'Url not found'
      }

      shorterService.getByShortUrl.mockResolvedValue(null)
      httpResponse.NOT_FOUND.mockReturnValue(mockResponse)

      const result = await getUrlByShortId(req, res, next)

      expect(shorterService.getByShortUrl).toHaveBeenCalled()
      expect(httpResponse.NOT_FOUND).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })
  })

  suite('deleteUrlById', () => {
    test('Should return the deleted url', async () => {
      const req = {
        params: {
          id: '65b10bb0b57984db9b6aaed7'
        }
      } as Request<IdUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 200,
        statusMsg: 'OK',
        data: {
          id: '65b10bb0b57984db9b6aaed7',
          longUrl: 'https://www.google.com',
          shortUrl: 'w-r61u2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          visits: 0
        }
      }

      shorterService.deleteOne.mockResolvedValue(mockResponse.data)
      httpResponse.OK.mockReturnValue(mockResponse)

      const result = await deleteUrlById(req, res, next)

      expect(shorterService.deleteOne).toHaveBeenCalled()
      expect(httpResponse.OK).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })

    test('Should return 404 if the url does not exist', async () => {
      const req = {
        params: {
          id: '65b10bb0b57984db9b6aaed7'
        }
      } as Request<IdUrlType>
      const res = {
        json: vi.fn(),
        status: vi.fn()
      } as unknown as Response
      const next = vi.fn() as unknown as NextFunction

      const mockResponse = {
        status: 404,
        statusMsg: 'Not Found',
        message: 'Url not found'
      }

      shorterService.deleteOne.mockResolvedValue(null)
      httpResponse.NOT_FOUND.mockReturnValue(mockResponse)

      const result = await deleteUrlById(req, res, next)

      expect(shorterService.deleteOne).toHaveBeenCalled()
      expect(httpResponse.NOT_FOUND).toHaveBeenCalled()
      expect(result).toStrictEqual(mockResponse)
    })
  })
})
