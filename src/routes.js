import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const uploads = multer(multerConfig)
const router = new Router()

router.get('/', (request, response) => {
  return response.json({ message: 'Hello to my fist API' })
})
router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)

router.use(authMiddleware) // routes below need to send the token using the header

router.post('/products', uploads.single('file'), ProductController.store)
router.get('/products', ProductController.index)
router.put('/products/:id', uploads.single('file'), ProductController.update)

router.post('/categories', uploads.single('file'), CategoryController.store)
router.get('/categories', CategoryController.index)
router.put('/categories/:id', uploads.single('file'), CategoryController.update)

router.post('/orders', OrderController.store)
router.get('/orders', OrderController.index)
router.put('/orders/:id', OrderController.update)

export default router
