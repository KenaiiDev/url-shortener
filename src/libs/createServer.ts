import cors from 'cors'
import express from 'express'
import { errorHandler } from '@/middlewares/errorHandler'

import { shorterRouter } from '@/routes/shorter.routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', shorterRouter)
app.use(errorHandler)

export default app
