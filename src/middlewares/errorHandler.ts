import type { NextFunction, Response, Request } from 'express'
import { Prisma } from '@prisma/client'
import { httpResponse } from '@/helpers/httpStatus'
import { ZodError } from 'zod'

export const ERROR_HANDLER = {
  P2002: (res: Response, err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Unique constraint failed'
    return httpResponse.BAD_REQUEST(res, message, err)
  },
  P2023: (res: Response, err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Inconsistent column data'
    return httpResponse.BAD_REQUEST(res, message, err)
  },
  PrismaClientValidationError: (res: Response, err: Prisma.PrismaClientValidationError) => {
    const message = 'Prisma validation error on request'
    return httpResponse.UNPROCESSABLE_ENTITY(res, message, err.message)
  },
  ZodError: (res: Response, err: ZodError) => {
    const message = 'Error on data validation'
    return httpResponse.UNPROCESSABLE_ENTITY(res, message, err)
  },
  NotFoundError: (res: Response, _err: any) => {
    const message = 'Resource not found'
    return httpResponse.NOT_FOUND(res, message)
  },
  defaultError: (res: Response, err: any) => {
    const message = 'Internal server error'
    return httpResponse.INTERNAL_SERVER_ERROR(res, message, err)
  }
}

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let option = err?.name

  console.log({ option, err })

  if (err instanceof ZodError) {
    option = 'ZodError'
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    option = 'PrismaClientValidationError'
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    option = err.code
  }

  const handler = ERROR_HANDLER[option as keyof typeof ERROR_HANDLER] ?? ERROR_HANDLER.defaultError

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  handler(res, err)
}
