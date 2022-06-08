import { NextFunction, Request, Response } from 'express'

import { ResponseHandler } from '../../infrastructure/handler'
import { GetProducts } from '../../application/use_cases'

const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        next(new ResponseHandler(200, await GetProducts()))
    } catch (error) {
        next(error)
    }
}

export { getProducts }
