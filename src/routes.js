import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'

const uploads = multer(multerConfig)
const router = new Router()

router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)

router.use(authMiddleware) // routes below need to send the token using the header

router.post('/products', uploads.single('file'), ProductController.store)
router.get('/products', ProductController.index)

export default router
