import type { Request, Response, NextFunction } from 'express'
import type { AnyZodObject } from 'zod'

export const schemaValidator =
  (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      next(error)
    }
  }
