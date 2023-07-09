import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'path'
import favicon from 'express-favicon'
import AppRouter from './router/AppRouter.js'
import AuthRouter from './router/AuthRouter.js'
import UserRouter from './router/UserRouter.js'
import {requestTime, logger} from './middleware/middleware.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import config from './config.json' assert { type: 'json' }

const PORT = process.env.PORT ?? 3000
const app = express()
const server = http.createServer(app)
const io = new Server(server) 

app.set('view engine', 'ejs')

app.use(express.static(path.resolve(path.resolve(), 'static')))
app.use(favicon(path.join(path.resolve(), 'static','assets', 'img', 'favicon.png')))
app.use(cookieParser())
app.use(requestTime)
app.use(logger)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', AppRouter)
app.use('/api', UserRouter)
app.use('/auth', AuthRouter)

export default io

server.listen(3000, async () => {
    try {
        await mongoose.connect(config.database.url, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log(`Server started on port ${PORT}`)
    } catch(e) {
        console.log(e)
    }
})