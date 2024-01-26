import { Router } from 'express'
import {
  // getAllUrl,
  // getUrlById,
  // deleteUrlById,
  getUrlByShortId,
  shortUrl
} from '@/controllers/shorter.controller'
import { bodyUrlSchema, shortUrlSchema } from '@/schemas/urls'
import { schemaValidator } from '@/middlewares/schemaValidators'

const shorterRouter: Router = Router()

shorterRouter.route('/:shortUrl').get(schemaValidator(shortUrlSchema), getUrlByShortId)

shorterRouter.route('/shorter').post(schemaValidator(bodyUrlSchema), shortUrl)

export { shorterRouter }


