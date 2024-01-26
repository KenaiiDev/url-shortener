import { expect, test, vi, suite } from 'vitest'
import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { schemaValidator } from '../../../middlewares/schemaValidators'

suite('Schema Validator', () => {
  test('should return next() if schema is valid', () => {
    const schema = z.object({
      body: z.object({
        name: z.string()
      })
    })
    const req = {
      body: {
        name: 'John Doe'
      }
    } as unknown as Request
    const res = {} as Response
    const next = vi.fn() as unknown as NextFunction

    schemaValidator(schema)(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  test('Should call next() with error if schema is invalid', () => {
    const schema = z.object({
      body: z.object({
        name: z.string()
      })
    })
    const req = {
      body: {
        name: 123
      }
    } as unknown as Request
    const res = {} as Response
    const next = vi.fn() as unknown as NextFunction

    schemaValidator(schema)(req, res, next)

    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })
})
