import express from 'express'
import ProductRouter from './product.routes'

const RouterMain = express.Router()

RouterMain.use('/products', ProductRouter)

export default RouterMain
