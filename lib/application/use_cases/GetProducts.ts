import { logger } from '../../infrastructure/handler'

import { ProductEntity } from '../../domain/entities'

import { ProductRepository } from '../../domain/repository'

import { ProductStorage } from '../../interfaces/storage'

const repositoryProduct = new ProductRepository(new ProductStorage())

export default async (): Promise<ProductEntity[] | Error> => {
    try {
        const products = await repositoryProduct.getProducts()

        logger.info({
            level: 'info',
            file: 'GetProduct.ts',
            message: 'Producto creado',
        })
        return products
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'GetProduct.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        return Promise.reject(error)
    }
}
