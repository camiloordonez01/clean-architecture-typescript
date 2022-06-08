import { ProductStorage } from '../../interfaces/storage'

class ProductRepository {
    constructor(public storage: ProductStorage) {}

    getProducts(): any {
        return this.storage.getProducts()
    }
}

export default ProductRepository
