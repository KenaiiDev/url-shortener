import { expect, suite, test, vi } from 'vitest'
import type { NextFunction, Response, Request } from 'express'
import { httpResponse } from '../../../helpers/__mocks__/httpStatus'
import { errorHandler } from '../../../middlewares/errorHandler'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

vi.mock('../../../helpers/httpStatus')

suite('errorHandler', () => {
  test('Should return BAD_REQUEST when Prisma.PrismaClientKnownRequestError with code P2002 is passed', () => {
    const res = {} as Response
    const req = {} as Request
    const err = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '2.24.1'
    })
    const next = vi.fn() as unknown as NextFunction

    const mockResponse = {
      status: 400,
      statusMsg: 'Bad Request',
      message: 'Unique constraint failed',
      error: err
    }

    httpResponse.BAD_REQUEST.mockReturnValue(mockResponse)

    errorHandler(err, req, res, next)
    expect(httpResponse.BAD_REQUEST).toHaveBeenCalledWith(res, 'Unique constraint failed', err)
  })

  test('Should return BAD_REQUEST when Prisma.PrismaClientKnownRequestError with code P2023 is passed', () => {
    const res = {} as Response
    const req = {} as Request
    const err = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2023',
      clientVersion: '2.24.1'
    })
    const next = vi.fn() as unknown as NextFunction

    const mockResponse = {
      status: 400,
      statusMsg: 'Bad Request',
      message: 'Inconsistent column data',
      error: err
    }

    httpResponse.BAD_REQUEST.mockReturnValue(mockResponse)

    errorHandler(err, req, res, next)
    expect(httpResponse.BAD_REQUEST).toHaveBeenCalledWith(res, 'Inconsistent column data', err)
  })

  test('Should return UNPROCESSABLE_ENTITY when Prisma.PrismaClientValidationError is passed', () => {
    const res = {} as Response
    const req = {} as Request
    const err = new Prisma.PrismaClientValidationError('Prisma validation error on request', {
      clientVersion: '2.24.1'
    })
    const next = vi.fn() as unknown as NextFunction

    const mockResponse = {
      status: 422,
      statusMsg: 'Unprocessable Entity',
      message: 'Prisma validation error on request',
      error: err.message
    }

    httpResponse.UNPROCESSABLE_ENTITY.mockReturnValue(mockResponse)

    errorHandler(err, req, res, next)
    expect(httpResponse.UNPROCESSABLE_ENTITY).toHaveBeenCalledWith(
      res,
      'Prisma validation error on request',
      err.message
    )
  })

  test('Should return UNPROCESSABLE_ENTITY when ZodError is passed', () => {
    const res = {} as Response
    const req = {} as Request
    const err = ZodError.create([])
    const next = vi.fn() as unknown as NextFunction

    const mockResponse = {
      status: 422,
      statusMsg: 'Unprocessable Entity',
      message: 'Error on data validation',
      error: err
    }

    httpResponse.UNPROCESSABLE_ENTITY.mockReturnValue(mockResponse)

    errorHandler(err, req, res, next)
    expect(httpResponse.UNPROCESSABLE_ENTITY).toHaveBeenCalledWith(
      res,
      'Error on data validation',
      err
    )
  })

  test('Should return INTERNAL_SERVER_ERROR when any other error is passed', () => {
    const res = {} as Response
    const req = {} as Request
    const err = new Error('Some error')
    const next = vi.fn() as unknown as NextFunction

    const mockResponse = {
      status: 500,
      statusMsg: 'Internal Server Error',
      message: 'Internal server error',
      error: err.message
    }

    httpResponse.INTERNAL_SERVER_ERROR.mockReturnValue(mockResponse)

    errorHandler(err, req, res, next)
    expect(httpResponse.INTERNAL_SERVER_ERROR).toHaveBeenCalledWith(
      res,
      'Internal server error',
      err
    )
  })
})
