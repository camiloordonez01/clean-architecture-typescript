import { Response } from 'express'

class ErrorHandler extends Error {
    public readonly statusCode: number

    message: string

    constructor(statusCode: number, message: string) {
        super()
        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode
        this.message = message
        Error.captureStackTrace(this)
    }
}

const handleError = (err: Error, res: Response): void => {
    if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json({
            status: 'ERROR',
            statusCode: err.statusCode,
            message: err.message,
        })
    } else {
        res.status(500).json({ ErrorMessage: err.message })
    }
}

export { ErrorHandler, handleError }
