// app.js
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/userRoutes'
import gardenRouter from './routes/gardenRoutes'
import scheduleRouter from './routes/scheduleRoutes'
import plantRouter from './routes/plantRoutes'
import soilRouter from './routes/soilRoutes'

var app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// setup API routes
app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/garden', gardenRouter)
app.use('/schedule', scheduleRouter)
app.use('/plant', plantRouter)
app.use('/soil', soilRouter)
export default app
