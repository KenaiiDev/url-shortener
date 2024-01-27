import cors from 'cors'
import express, { type Express } from 'express'
import { errorHandler } from '@/middlewares/errorHandler'

import { shorterRouter } from '@/routes/shorter.routes'

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use('/', shorterRouter)
app.use(errorHandler)

export default app
