import { Repository } from 'typeorm'
import Storage from './Storage'

import { logger } from '../../infrastructure/handler'

import { ProductEntity } from '../../domain/entities'

class ProductStorage extends Storage {
    repository: Repository<ProductEntity>
    constructor() {
        super()
        this.repository = this.database.getRepository(ProductEntity)
    }

    async getProducts(): Promise<ProductEntity[] | Error> {
        try {
            const products = await this.repository.find()

            return products
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                logger.crit({
                    level: 'crit',
                    file: 'database/index.ts',
                    message: `${error.message}`,
                    stack: error.stack,
                })
            }
            return Promise.reject(error)
        }
    }
}

export default ProductStorage
