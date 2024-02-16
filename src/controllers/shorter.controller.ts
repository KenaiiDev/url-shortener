import { shorterService } from '@/services/shorter.services'
import { httpResponse } from '@/helpers/httpStatus'
import type { BodyUrlType, IdUrlType, ShortUrlType } from '@/types/urls'
import type { Request, Response, NextFunction } from 'express'

const shortUrl = async (
  req: Request<unknown, unknown, BodyUrlType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const url = await shorterService.create(body)
    return httpResponse.CREATED(res, url)
  } catch (error) {
    next(error)
  }
}

const getAllUrl = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const urls = await shorterService.getAll()
    return httpResponse.OK(res, urls)
  } catch (error) {
    next(error)
  }
}

const getUrlById = async (req: Request<IdUrlType>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const url = await shorterService.getOne(id)
    if (url === null) return httpResponse.NOT_FOUND(res, 'Url not found')
    return httpResponse.OK(res, url)
  } catch (error) {
    next(error)
  }
}

const getUrlByShortId = async (req: Request<ShortUrlType>, res: Response, next: NextFunction) => {
  try {
    const { shortUrl } = req.params
    const url = await shorterService.getByShortUrl(shortUrl)
    if (url === null || url === undefined) return httpResponse.NOT_FOUND(res, 'Url not found')
    httpResponse.OK(res, url)
  } catch (error) {
    next(error)
  }
}

const getUrlByShortIdAndIncrement = async (
  req: Request<ShortUrlType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortUrl } = req.params
    console.log('Requested')
    const url = await shorterService.getByShortUrlAndIncrement(shortUrl)
    if (url === null || url === undefined) return httpResponse.NOT_FOUND(res, 'Url not found')
    httpResponse.OK(res, url)
  } catch (error) {
    next(error)
  }
}

const deleteUrlById = async (req: Request<IdUrlType>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const url = await shorterService.deleteOne(id)
    if (url === null) return httpResponse.NOT_FOUND(res, 'Url not found')
    return httpResponse.OK(res, url)
  } catch (error) {
    next(error)
  }
}

export {
  shortUrl,
  getAllUrl,
  getUrlById,
  getUrlByShortId,
  deleteUrlById,
  getUrlByShortIdAndIncrement
}
