import { Response, NextFunction } from 'express'
import { handleError } from './ErrorHandler'

class ResponseHandler {
    statusCode: number

    result: unknown

    constructor(statusCode: number, result: unknown) {
        this.statusCode = statusCode
        this.result = result
    }
}

const handleResponse = (
    info: unknown | Error,
    res: Response,
    next: NextFunction
): void => {
    if (info instanceof Error) {
        handleError(info, res)
    } else if (info instanceof ResponseHandler) {
        const { statusCode, result } = info
        res.status(statusCode).json({
            status: 'SUCCESS',
            statusCode,
            result,
        })
    } else {
        res.json(info)
    }
}

export { ResponseHandler, handleResponse }
