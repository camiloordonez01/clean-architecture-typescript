import express from 'express'

import { getProducts } from '../../../interfaces/controllers/ProductController'

const ProductRouter = express.Router()

ProductRouter.get('/', getProducts)

export default ProductRouter
