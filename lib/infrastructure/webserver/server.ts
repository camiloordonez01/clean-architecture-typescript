import 'reflect-metadata'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? 'local'}` })

import messages from '../../../messages'

import RouterMain from './routers/index.routes'
import { handleResponse, handleError, ErrorHandler } from '../handler'

class Server {
    public app: Application

    constructor() {
        this.app = express()
        this.app.set('PORT', process.env.PORT || 3000)
        this.routes()
        this.noFound()
        this.middleware()
    }

    private middleware(): void {
        this.app.use(cors({ methods: ['GET', 'POST'] }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        this.app.use(
            (data: unknown, req: Request, res: Response, next: NextFunction) =>
                handleResponse(data, res, next)
        )
        this.app.use((err: Error, req: Request, res: Response) =>
            handleError(err, res)
        )
    }

    private routes(): void {
        this.app.use(RouterMain)
    }

    listen(): void {
        this.app.listen(this.app.get('PORT'), () =>
            console.log(
                `Listening on: http://localhost:${this.app.get('PORT')}`
            )
        )
    }

    private noFound(): void {
        // No Found
        this.app.use((req, res, next) => {
            try {
                throw new ErrorHandler(404, messages.NOT_FOUND)
            } catch (error) {
                next(error)
            }
        })
    }
}

export default Server
