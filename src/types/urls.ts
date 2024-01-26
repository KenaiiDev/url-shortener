import type { z } from 'zod'
import type { bodyUrlSchema, idUrlSchema, paramsUrlSchema, shortUrlSchema } from '@/schemas/urls'

export type BodyUrlType = z.infer<typeof bodyUrlSchema>['body']
export type IdUrlType = z.infer<typeof idUrlSchema>['params']
export type ParamsUrlType = z.infer<typeof paramsUrlSchema>['params']
export type ShortUrlType = z.infer<typeof shortUrlSchema>['params']
