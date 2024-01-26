import { z } from 'zod'

export const bodyUrlSchema = z.object({
  body: z.object({
    url: z.string().url()
  })
})

export const idUrlSchema = z.object({
  params: z.object({
    id: z.string()
  })
})

export const shortUrlSchema = z.object({
  params: z.object({
    shortUrl: z.string()
  })
})

export const paramsUrlSchema = z.object({
  params: z.object({
    url: z.string().url()
  })
})
